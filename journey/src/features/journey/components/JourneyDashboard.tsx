import { useEffect, useRef, useState, type RefObject } from "react";
import { BridgePreview } from "./BridgePreview";
import {
  firstJobGoal,
  firstOpportunityJourney,
  firstOpportunityMissions,
  journeyAchievements,
  journeySkills,
} from "../journeys/first-opportunity/definition";
import type { InitialJourneyState, JourneyProgress } from "../domain/types";

type JourneyDashboardProps = {
  journeyState: InitialJourneyState;
  headingRef: RefObject<HTMLHeadingElement | null>;
  storageError: boolean;
  completionNotice: string | null;
  onOpenMission: () => void;
  onOpenResume: () => void;
  onRestartJourney: () => void;
};

function getProgress(state: InitialJourneyState): JourneyProgress {
  const completedCount = state.completedMissionIds.length;
  const totalCount = firstOpportunityMissions.length;

  return {
    completedCount,
    totalCount,
    percentage: Math.round((completedCount / totalCount) * 100),
  };
}

export function JourneyDashboard({
  journeyState,
  headingRef,
  storageError,
  completionNotice,
  onOpenMission,
  onOpenResume,
  onRestartJourney,
}: JourneyDashboardProps) {
  const [isRestartConfirmationOpen, setIsRestartConfirmationOpen] =
    useState(false);
  const confirmRestartButtonRef = useRef<HTMLButtonElement>(null);
  const progress = getProgress(journeyState);
  const currentMission =
    firstOpportunityMissions.find(
      ({ id }) => id === journeyState.currentMissionId,
    ) ?? null;
  const activeSkills = journeySkills.filter(({ id }) =>
    journeyState.skillIds.includes(id),
  );
  const unlockedAchievements = journeyAchievements.filter(({ id }) =>
    journeyState.achievementIds.includes(id),
  );
  const resumeMissionIndex = firstOpportunityMissions.findIndex(
    ({ id }) => id === "build-first-resume",
  );
  const currentMissionIndex = currentMission
    ? firstOpportunityMissions.indexOf(currentMission)
    : firstOpportunityMissions.length;
  const resumeUnlocked = currentMissionIndex >= resumeMissionIndex;

  useEffect(() => {
    if (isRestartConfirmationOpen) {
      confirmRestartButtonRef.current?.focus();
    }
  }, [isRestartConfirmationOpen]);

  return (
    <div className="journey-dashboard">
      <header className="dashboard-heading">
        <div>
          <p className="section-kicker">Jornada ativa</p>
          <h1
            id="hero-title"
            className="dashboard-title"
            ref={headingRef}
            tabIndex={-1}
          >
            {firstOpportunityJourney.title}
          </h1>
          <p className="dashboard-objective">
            <strong>Seu objetivo:</strong> {firstJobGoal.title}
          </p>
        </div>

        <div
          className="dashboard-progress"
          role="status"
          aria-label={`${progress.completedCount} de ${progress.totalCount} missões concluídas, ${progress.percentage}% da travessia`}
        >
          <strong>{progress.percentage}%</strong>
          <span>
            {progress.completedCount} de {progress.totalCount} missões
          </span>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${progress.percentage}%` }} />
          </div>
        </div>
      </header>

      {completionNotice && (
        <p
          className="mission-completion-notice"
          role="status"
          aria-live="polite"
        >
          <span aria-hidden="true">✓</span>
          {completionNotice}
        </p>
      )}

      <div className="dashboard-grid">
        <div className="dashboard-main">
          {currentMission ? (
            <section
              className="current-mission-card"
              aria-labelledby="current-mission-title"
            >
              <div className="current-mission-copy">
                <p className="section-kicker">Sua missão atual</p>
                <h2 id="current-mission-title">{currentMission.title}</h2>
                <p>{currentMission.description}</p>
                <dl>
                  <div>
                    <dt>Por que este passo importa</dt>
                    <dd>{currentMission.outcome}</dd>
                  </div>
                  <div>
                    <dt>Próxima etapa</dt>
                    <dd>Abrir a missão e realizar a atividade prática.</dd>
                  </div>
                </dl>
              </div>

              <div className="mission-action">
                <span className="mission-status-badge">Missão atual</span>
                <button
                  type="button"
                  className="primary-action"
                  onClick={onOpenMission}
                >
                  Continuar missão
                </button>
                <p>Leia o conteúdo curto e conclua uma atividade simples.</p>
              </div>
            </section>
          ) : (
            <section
              className="journey-complete-card"
              aria-labelledby="journey-complete-title"
            >
              <span aria-hidden="true">✓</span>
              <div>
                <p className="section-kicker">Ponte atravessada</p>
                <h2 id="journey-complete-title">
                  Sua primeira travessia está concluída
                </h2>
                <p>
                  Você completou as cinco missões e construiu uma base prática
                  para seguir em busca da primeira oportunidade.
                </p>
              </div>
            </section>
          )}

          <BridgePreview
            missions={firstOpportunityMissions}
            currentMissionId={journeyState.currentMissionId}
            completedMissionIds={journeyState.completedMissionIds}
            progress={progress}
          />
        </div>

        <aside className="dashboard-summary" aria-label="Resumo da jornada">
          <section aria-labelledby="skills-title">
            <p className="section-kicker">Em desenvolvimento</p>
            <h2 id="skills-title">Habilidades</h2>
            <ul className="summary-list">
              {activeSkills.map((skill) => (
                <li key={skill.id}>
                  <span aria-hidden="true">•</span>
                  {skill.label}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="achievements-title">
            <p className="section-kicker">Conquistas</p>
            <h2 id="achievements-title">Marcos acesos</h2>
            <div className="achievement-list">
              {unlockedAchievements.map((achievement) => (
                <article key={achievement.id}>
                  <span aria-hidden="true">✓</span>
                  <div>
                    <strong>{achievement.title}</strong>
                    <p>{achievement.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="resume-tool-title">
            <p className="section-kicker">Ferramenta prática</p>
            <h2 id="resume-tool-title">Currículo Guiado</h2>
            <p className="resume-tool-description">
              {resumeUnlocked
                ? "Monte um currículo simples, acompanhe a prévia e copie o resultado."
                : "Esta ferramenta será liberada quando você chegar à missão de montar seu primeiro currículo."}
            </p>
            <button
              type="button"
              className="secondary-action resume-tool-action"
              onClick={onOpenResume}
              disabled={!resumeUnlocked}
            >
              {resumeUnlocked ? "Abrir Currículo Guiado" : "Ainda não disponível"}
            </button>
          </section>

          <p className="local-progress-note">
            <strong>Progresso local</strong>
            Objetivo, diagnóstico e avanço ficam salvos somente neste
            navegador.
          </p>

          <section
            className="restart-journey-area"
            aria-labelledby="restart-journey-title"
          >
            {isRestartConfirmationOpen ? (
              <div
                className="restart-journey-confirmation"
                role="group"
                aria-labelledby="restart-journey-title"
                aria-describedby="restart-journey-description"
              >
                <div>
                  <h2 id="restart-journey-title">Reiniciar jornada?</h2>
                  <p id="restart-journey-description">
                    Isso apaga objetivo, diagnóstico e progresso da jornada
                    neste navegador. O rascunho do currículo será mantido.
                  </p>
                </div>
                <div className="restart-journey-actions">
                  <button
                    ref={confirmRestartButtonRef}
                    type="button"
                    className="secondary-action"
                    onClick={onRestartJourney}
                  >
                    Sim, reiniciar
                  </button>
                  <button
                    type="button"
                    className="secondary-action"
                    onClick={() => setIsRestartConfirmationOpen(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 id="restart-journey-title">Testar desde o começo</h2>
                <p>
                  Use esta opção quando quiser refazer as missões e ver as
                  interações novas desde a primeira etapa.
                </p>
                <button
                  type="button"
                  className="secondary-action restart-journey-button"
                  onClick={() => setIsRestartConfirmationOpen(true)}
                >
                  Reiniciar jornada
                </button>
              </>
            )}
          </section>

          {storageError && (
            <p className="storage-error" role="alert">
              Não foi possível salvar neste navegador. O progresso pode não
              estar disponível depois.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
