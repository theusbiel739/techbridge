import { useEffect, useRef, useState } from "react";
import { BridgePreview } from "./components/BridgePreview";
import { MentorPanel } from "./components/MentorPanel";
import {
  diagnosticQuestions,
  firstJobGoal,
  firstOpportunityMissions,
  firstOpportunityJourney,
  firstOpportunityRuntime,
} from "./journeys/first-opportunity/definition";
import { JourneyDashboard } from "./components/JourneyDashboard";
import { JourneyMissionView } from "./components/JourneyMissionView";
import { ResumeBuilder } from "./components/ResumeBuilder";
import { deriveJourneyProgress } from "./domain/journeyProgress";
import {
  clearJourneyState,
  createInitialJourneyState,
  loadJourneyState,
  saveJourneyState,
} from "./journeys/first-opportunity/storage";
import type {
  DiagnosticAnswer,
  DiagnosticAnswers,
  DiagnosticQuestionId,
  InitialJourneyState,
} from "./domain/types";

type EntryStep =
  | "goal"
  | "diagnostic"
  | "result"
  | "dashboard"
  | "mission"
  | "resume";

const answerLabels: Record<DiagnosticAnswer, string> = {
  yes: "Sim",
  "not-yet": "Ainda não",
};

function getInitialStep(state: InitialJourneyState): EntryStep {
  if (state.startedAt) {
    return "dashboard";
  }

  if (state.recommendedJourneyId) {
    return "result";
  }

  if (state.selectedGoalId) {
    return "diagnostic";
  }

  return "goal";
}

function withUpdatedAt(
  state: InitialJourneyState,
  changes: Partial<InitialJourneyState>,
): InitialJourneyState {
  return {
    ...state,
    ...changes,
    updatedAt: new Date().toISOString(),
  };
}

export function JourneyEntry() {
  const [journeyState, setJourneyState] = useState(loadJourneyState);
  const [step, setStep] = useState<EntryStep>(() =>
    getInitialStep(journeyState),
  );
  const [storageError, setStorageError] = useState(false);
  const [completionNotice, setCompletionNotice] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousStepRef = useRef(step);
  const resumeReturnStepRef = useRef<"dashboard" | "mission">("dashboard");

  useEffect(() => {
    if (previousStepRef.current !== step) {
      headingRef.current?.focus();
      previousStepRef.current = step;
    }
  }, [step]);

  function persist(nextState: InitialJourneyState) {
    setJourneyState(nextState);
    setStorageError(!saveJourneyState(nextState));
  }

  function selectGoal() {
    const nextState = withUpdatedAt(journeyState, {
      selectedGoalId: firstJobGoal.id,
    });
    persist(nextState);
    setStep("diagnostic");
  }

  function updateAnswer(
    questionId: DiagnosticQuestionId,
    answer: DiagnosticAnswer,
  ) {
    const nextAnswers: DiagnosticAnswers = {
      ...journeyState.diagnosticAnswers,
      [questionId]: answer,
    };
    persist(
      withUpdatedAt(journeyState, { diagnosticAnswers: nextAnswers }),
    );
  }

  function showRecommendation() {
    const nextState = withUpdatedAt(journeyState, {
      recommendedJourneyId: firstOpportunityJourney.id,
    });
    persist(nextState);
    setStep("result");
  }

  function returnToGoal() {
    persist(
      withUpdatedAt(journeyState, {
        selectedGoalId: null,
        diagnosticAnswers: {},
        recommendedJourneyId: null,
        startedAt: null,
        currentMissionId: null,
        completedMissionIds: [],
        skillIds: [],
        achievementIds: [],
      }),
    );
    setStep("goal");
  }

  function redoDiagnostic() {
    persist(
      withUpdatedAt(journeyState, {
        diagnosticAnswers: {},
        recommendedJourneyId: null,
        startedAt: null,
        currentMissionId: null,
        completedMissionIds: [],
        skillIds: [],
        achievementIds: [],
      }),
    );
    setStep("diagnostic");
  }

  function startJourney() {
    const completedMissionIds: InitialJourneyState["completedMissionIds"] = [];
    const initialProgress = deriveJourneyProgress(
      firstOpportunityRuntime,
      completedMissionIds,
    );

    persist(
      withUpdatedAt(journeyState, {
        startedAt: journeyState.startedAt ?? new Date().toISOString(),
        completedMissionIds,
        ...initialProgress,
      }),
    );
    setCompletionNotice(null);
    setStep("dashboard");
  }

  function openCurrentMission() {
    if (!journeyState.currentMissionId) {
      return;
    }

    setCompletionNotice(null);
    setStep("mission");
  }

  function returnToDashboard() {
    setCompletionNotice(null);
    setStep("dashboard");
  }

  function openResumeBuilder(returnStep: "dashboard" | "mission") {
    const resumeMissionIndex = firstOpportunityMissions.findIndex(
      ({ id }) => id === "build-first-resume",
    );
    const currentMissionIndex = journeyState.currentMissionId
      ? firstOpportunityMissions.findIndex(
          ({ id }) => id === journeyState.currentMissionId,
        )
      : firstOpportunityMissions.length;

    if (currentMissionIndex >= resumeMissionIndex) {
      setCompletionNotice(null);
      resumeReturnStepRef.current = returnStep;
      setStep("resume");
    }
  }

  function returnFromResume() {
    setStep(resumeReturnStepRef.current);
  }

  function completeCurrentMission() {
    const currentMission = firstOpportunityMissions.find(
      ({ id }) => id === journeyState.currentMissionId,
    );

    if (!currentMission) {
      return;
    }

    const completedMissionIds = [
      ...journeyState.completedMissionIds,
      currentMission.id,
    ];
    const nextProgress = deriveJourneyProgress(
      firstOpportunityRuntime,
      completedMissionIds,
    );

    persist(
      withUpdatedAt(journeyState, {
        completedMissionIds,
        ...nextProgress,
      }),
    );
    setCompletionNotice(currentMission.completionMessage);
    setStep("dashboard");
  }

  function restartJourney() {
    const initialState = createInitialJourneyState();

    setJourneyState(initialState);
    setStorageError(!clearJourneyState());
    setCompletionNotice(null);
    resumeReturnStepRef.current = "dashboard";
    setStep("goal");
  }

  const hasAllAnswers = diagnosticQuestions.every(
    ({ id }) => journeyState.diagnosticAnswers[id],
  );
  const attentionPoints = diagnosticQuestions.filter(
    ({ id }) => journeyState.diagnosticAnswers[id] === "not-yet",
  );
  const routeFocusAreas = attentionPoints.map(({ id }) => {
    const focusByQuestion: Record<DiagnosticQuestionId, string> = {
      "uses-email": "comunicação digital",
      "attaches-files": "organização e conferência de arquivos",
      "has-resume": "construção do primeiro currículo",
    };

    return focusByQuestion[id];
  });
  const currentMission = firstOpportunityMissions.find(
    ({ id }) => id === journeyState.currentMissionId,
  );

  if (step === "mission" && currentMission) {
    return (
      <>
        <JourneyMissionView
          mission={currentMission}
          missionNumber={firstOpportunityMissions.indexOf(currentMission) + 1}
          totalMissions={firstOpportunityMissions.length}
          headingRef={headingRef}
          storageError={storageError}
          onBack={returnToDashboard}
          onComplete={completeCurrentMission}
          onOpenResume={() => openResumeBuilder("mission")}
        />
        <MentorPanel journeyState={journeyState} />
      </>
    );
  }

  if (step === "resume") {
    return (
      <>
        <ResumeBuilder headingRef={headingRef} onBack={returnFromResume} />
        <MentorPanel journeyState={journeyState} />
      </>
    );
  }

  if (step === "dashboard" || step === "mission") {
    return (
      <>
        <JourneyDashboard
          journeyState={journeyState}
          headingRef={headingRef}
          storageError={storageError}
          completionNotice={completionNotice}
          onOpenMission={openCurrentMission}
          onOpenResume={() => openResumeBuilder("dashboard")}
          onRestartJourney={restartJourney}
        />
        <MentorPanel journeyState={journeyState} />
      </>
    );
  }

  return (
    <>
      <div className="hero-grid">
        <article className="journey-entry">
      {step === "goal" && (
        <>
          <p className="section-kicker">Primeira Oportunidade</p>
          <h1 id="hero-title" ref={headingRef} tabIndex={-1}>
            Qual ponte você quer atravessar hoje?
          </h1>
          <p className="hero-copy">
            Escolha seu objetivo para receber um caminho curto e prático. Neste
            MVP, começamos pela preparação para o primeiro emprego.
          </p>

          <button
            type="button"
            className="journey-card goal-option"
            onClick={selectGoal}
            aria-describedby="goal-description"
          >
            <span className="status-dot" aria-hidden="true" />
            <span>
              <strong>{firstJobGoal.title}</strong>
              <small id="goal-description">{firstJobGoal.description}</small>
            </span>
            <span className="goal-option-action" aria-hidden="true">
              Escolher
            </span>
          </button>
        </>
      )}

      {step === "diagnostic" && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            showRecommendation();
          }}
        >
          <p className="section-kicker">Diagnóstico rápido</p>
          <h1
            id="hero-title"
            className="flow-title"
            ref={headingRef}
            tabIndex={-1}
          >
            Vamos entender seu ponto de partida
          </h1>
          <p className="hero-copy">
            São três perguntas simples. Não existe resposta certa ou errada —
            elas só ajudam a orientar sua travessia.
          </p>

          <div className="diagnostic-questions">
            {diagnosticQuestions.map((question, index) => (
              <fieldset
                className="diagnostic-question"
                key={question.id}
                aria-describedby={`${question.id}-help`}
              >
                <legend>
                  <span>{index + 1}</span>
                  {question.prompt}
                </legend>
                <p id={`${question.id}-help`}>{question.supportingText}</p>
                <div className="answer-options">
                  {(
                    Object.entries(answerLabels) as [
                      DiagnosticAnswer,
                      string,
                    ][]
                  ).map(([value, label]) => (
                    <label className="answer-option" key={value}>
                      <input
                        type="radio"
                        name={question.id}
                        value={value}
                        checked={
                          journeyState.diagnosticAnswers[question.id] === value
                        }
                        onChange={() => updateAnswer(question.id, value)}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="hero-actions diagnostic-actions">
            <button
              type="button"
              className="secondary-action"
              onClick={returnToGoal}
            >
              Voltar
            </button>
            <button
              type="submit"
              className="primary-action"
              disabled={!hasAllAnswers}
            >
              Ver minha jornada
            </button>
          </div>
        </form>
      )}

      {step === "result" && (
        <div className="recommendation-result">
          <p className="section-kicker">Sua ponte recomendada</p>
          <h1
            id="hero-title"
            className="flow-title"
            ref={headingRef}
            tabIndex={-1}
          >
            {firstOpportunityJourney.title}
          </h1>
          <p className="hero-copy">{firstOpportunityJourney.description}</p>

          <section
            className="recommendation-card"
            aria-labelledby="recommendation-title"
          >
            <span className="recommendation-icon" aria-hidden="true">
              ✓
            </span>
            <div>
              <h2 id="recommendation-title">Seu caminho está definido</h2>
              {attentionPoints.length > 0 ? (
                <>
                  <p>
                    Pelo que você respondeu, vamos começar reforçando{" "}
                    {routeFocusAreas.join(", ")} para sua primeira oportunidade.
                  </p>
                  <ul>
                    {attentionPoints.map((question) => (
                      <li key={question.id}>{question.prompt}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>
                  Pelo que você respondeu, sua rota vai organizar comunicação
                  digital, arquivos e currículo para transformar conhecimento em
                  prática.
                </p>
              )}
            </div>
          </section>

          {journeyState.startedAt ? (
            <p className="journey-started" role="status">
              Travessia iniciada e salva neste navegador. O mapa completo será
              a próxima etapa da experiência.
            </p>
          ) : (
            <p className="local-save-note">
              Seu objetivo e suas respostas ficam salvos somente neste
              navegador.
            </p>
          )}

          <div className="hero-actions">
            <button
              type="button"
              className="primary-action"
              onClick={startJourney}
              disabled={Boolean(journeyState.startedAt)}
            >
              {journeyState.startedAt ? "Jornada iniciada" : "Iniciar jornada"}
            </button>
            <button
              type="button"
              className="secondary-action"
              onClick={redoDiagnostic}
            >
              Refazer diagnóstico
            </button>
          </div>
        </div>
      )}

      {storageError && (
        <p className="storage-error" role="alert">
          Não foi possível salvar neste navegador. Você pode continuar, mas as
          respostas podem não estar disponíveis depois.
        </p>
      )}
        </article>

        <BridgePreview
          missions={firstOpportunityMissions}
          currentMissionId={null}
          completedMissionIds={[]}
          teaser
          progress={{
            completedCount: 0,
            totalCount: firstOpportunityMissions.length,
            percentage: 0,
          }}
        />
      </div>
      <MentorPanel journeyState={journeyState} />
    </>
  );
}
