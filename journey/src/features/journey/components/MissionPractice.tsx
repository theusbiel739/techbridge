import { useEffect, useState, type KeyboardEvent } from "react";
import { reviewResumeDraft } from "../resume/resumeReview";
import { loadResumeDraft } from "../persistence/resumeStorage";
import type { MissionId } from "../domain/types";

type MissionPracticeProps = {
  missionId: MissionId;
  onOpenResume: () => void;
  onReadyChange: (isReady: boolean) => void;
};

type SelectedFileDetails = {
  name: string;
  type: string;
};

function EmailPractice({
  onReadyChange,
}: Pick<MissionPracticeProps, "onReadyChange">) {
  const [email, setEmail] = useState("");
  const hasAt = email.includes("@");
  const hasNoSpaces = email.length > 0 && !/\s/.test(email);
  const atIndex = email.indexOf("@");
  const hasTextAroundAt = atIndex > 0 && atIndex < email.length - 1;
  const isReady = hasAt && hasNoSpaces && hasTextAroundAt;

  useEffect(() => {
    onReadyChange(isReady);
  }, [isReady, onReadyChange]);

  const rules = [
    { label: "Contém @", passed: hasAt },
    { label: "Não contém espaços", passed: hasNoSpaces },
    { label: "Tem texto antes e depois do @", passed: hasTextAroundAt },
  ];

  return (
    <div className="practice-block">
      <label className="practice-field" htmlFor="practice-email">
        <span>Digite um endereço que você considera adequado</span>
        <input
          id="practice-email"
          type="text"
          inputMode="email"
          autoComplete="off"
          spellCheck={false}
          maxLength={160}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="nome.sobrenome@email.com"
          aria-describedby="email-privacy-note email-checklist"
        />
      </label>

      <p className="practice-privacy-note" id="email-privacy-note">
        Este endereço serve apenas para a prática desta tela e não será salvo.
      </p>

      <ul className="practice-checklist" id="email-checklist">
        {rules.map((rule) => (
          <li className={rule.passed ? "is-complete" : undefined} key={rule.label}>
            <span aria-hidden="true">{rule.passed ? "✓" : "○"}</span>
            {rule.label}
          </li>
        ))}
      </ul>

      <p className="challenge-status" role="status" aria-live="polite">
        {isReady
          ? "As três regras simples foram atendidas. Você pode concluir a missão."
          : "Ajuste o endereço até completar os três pontos do checklist."}
      </p>
    </div>
  );
}

function AttachmentPractice({
  onReadyChange,
}: Pick<MissionPracticeProps, "onReadyChange">) {
  const [selectedFile, setSelectedFile] =
    useState<SelectedFileDetails | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const isReady = selectedFile !== null && confirmed;

  useEffect(() => {
    onReadyChange(isReady);
  }, [isReady, onReadyChange]);

  function selectFile(file: File | undefined) {
    setSelectedFile(
      file
        ? {
            name: file.name,
            type: file.type || "Tipo não informado pelo dispositivo",
          }
        : null,
    );
    setConfirmed(false);
  }

  return (
    <div className="practice-block">
      <label className="practice-field" htmlFor="practice-file">
        <span>Escolha um arquivo de teste no seu dispositivo</span>
        <input
          id="practice-file"
          type="file"
          onChange={(event) => selectFile(event.target.files?.[0])}
          aria-describedby="file-privacy-note"
        />
      </label>

      <p className="practice-privacy-note" id="file-privacy-note">
        O arquivo não será enviado, aberto ou salvo. A tela mostra somente nome
        e tipo para você praticar a conferência.
      </p>

      {selectedFile ? (
        <div className="selected-file-card" role="status" aria-live="polite">
          <span className="selected-file-icon" aria-hidden="true">
            ↗
          </span>
          <div>
            <strong>{selectedFile.name}</strong>
            <small>{selectedFile.type}</small>
          </div>
        </div>
      ) : (
        <p className="practice-empty-state">Nenhum arquivo selecionado.</p>
      )}

      <label className="challenge-confirmation">
        <input
          type="checkbox"
          checked={confirmed}
          disabled={!selectedFile}
          onChange={(event) => setConfirmed(event.target.checked)}
        />
        <span>
          <strong>Conferi o nome e o tipo do arquivo</strong>
          <small>Esta confirmação não envia nem armazena o arquivo.</small>
        </span>
      </label>

      <p className="challenge-status" role="status" aria-live="polite">
        {isReady
          ? "Arquivo selecionado e conferido. Você pode concluir a missão."
          : "Selecione um arquivo e confirme que conferiu os dados exibidos."}
      </p>
    </div>
  );
}

function ResumePractice({
  onOpenResume,
  onReadyChange,
}: Pick<TransitionProps, "onOpenResume" | "onReadyChange">) {
  const [draft] = useState(loadResumeDraft);
  const modules = [
    {
      label: "Identificação e contato",
      complete:
        draft.name.trim().length > 0 &&
        (draft.email.trim().length > 0 || draft.phone.trim().length > 0),
    },
    {
      label: "Objetivo profissional",
      complete: draft.professionalObjective.trim().length > 0,
    },
    {
      label: "Formação",
      complete: draft.education.trim().length > 0,
    },
    {
      label: "Experiências ou projetos",
      complete: draft.experienceProjects.trim().length > 0,
    },
    {
      label: "Habilidades",
      complete: draft.skills.trim().length > 0,
    },
  ];
  const completedModules = modules.filter(({ complete }) => complete).length;
  const isReady = completedModules >= 3;

  useEffect(() => {
    onReadyChange(isReady);
  }, [isReady, onReadyChange]);

  return (
    <div className="practice-block">
      <div
        className="practice-progress"
        role="progressbar"
        aria-label="Estrutura preenchida do currículo"
        aria-valuemin={0}
        aria-valuemax={modules.length}
        aria-valuenow={completedModules}
      >
        <div>
          <strong>{completedModules} de 5 módulos construídos</strong>
          <span>Preencha pelo menos três para praticar a estrutura.</span>
        </div>
        <div className="practice-progress-track" aria-hidden="true">
          <span style={{ width: `${(completedModules / modules.length) * 100}%` }} />
        </div>
      </div>

      <ul className="practice-checklist">
        {modules.map((module) => (
          <li
            className={module.complete ? "is-complete" : undefined}
            key={module.label}
          >
            <span aria-hidden="true">{module.complete ? "✓" : "○"}</span>
            {module.label}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="secondary-action practice-tool-action"
        onClick={onOpenResume}
      >
        Abrir Currículo Guiado
      </button>

      <p className="challenge-status" role="status" aria-live="polite">
        {isReady
          ? "A estrutura inicial está construída. Você pode concluir a missão."
          : "Abra o Currículo Guiado, preencha três módulos e volte para conferir."}
      </p>
    </div>
  );
}

type TransitionProps = Pick<
  MissionPracticeProps,
  "onOpenResume" | "onReadyChange"
>;

function ReviewPractice({
  onOpenResume,
  onReadyChange,
}: TransitionProps) {
  const [draft] = useState(loadResumeDraft);
  const [localReview] = useState(() => reviewResumeDraft(draft));
  const [clearAndOrganized, setClearAndOrganized] = useState(false);
  const [sensitiveDataRemoved, setSensitiveDataRemoved] = useState(false);
  const essentialChecks = localReview.checks;
  const essentialsPresent = essentialChecks.every(({ passed }) => passed);
  const hasSensitiveSignals = localReview.sensitiveSignals.length > 0;
  const isReady =
    essentialsPresent &&
    clearAndOrganized &&
    sensitiveDataRemoved &&
    !hasSensitiveSignals;

  useEffect(() => {
    onReadyChange(isReady);
  }, [isReady, onReadyChange]);

  return (
    <div className="practice-block review-method">
      <div className="review-method-heading">
        <span aria-hidden="true">XYZ</span>
        <div>
          <strong>Método fixo de revisão do mentor</strong>
          <p>
            O mentor não usa IA: ele sempre orienta estes mesmos três passos.
          </p>
        </div>
      </div>

      <section className="local-review-summary" aria-labelledby="local-review-title">
        <strong id="local-review-title">Revisão local do mentor</strong>
        <p>
          Sugestões geradas por regras simples neste MVP. Nenhum dado foi
          enviado para uma IA ou servidor.
        </p>
        <ul>
          {localReview.suggestions.map((suggestion) => (
            <li key={suggestion}>{suggestion}</li>
          ))}
        </ul>
      </section>

      <section className={essentialsPresent ? "review-step is-complete" : "review-step"}>
        <div className="review-step-label">
          <span aria-hidden="true">X</span>
          <div>
            <strong>Informações essenciais presentes</strong>
            <small>Conferência automática do rascunho local.</small>
          </div>
        </div>
        <ul className="practice-checklist compact">
          {essentialChecks.map((item) => (
            <li className={item.passed ? "is-complete" : undefined} key={item.label}>
              <span aria-hidden="true">{item.passed ? "✓" : "○"}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </section>

      <label className="review-step review-step-check">
        <input
          type="checkbox"
          checked={clearAndOrganized}
          onChange={(event) => setClearAndOrganized(event.target.checked)}
        />
        <span className="review-step-label">
          <span aria-hidden="true">Y</span>
          <span>
            <strong>Texto claro e organizado</strong>
            <small>Li o currículo e conferi clareza, títulos e consistência.</small>
          </span>
        </span>
      </label>

      <label className="review-step review-step-check">
        <input
          type="checkbox"
          checked={sensitiveDataRemoved}
          disabled={hasSensitiveSignals}
          onChange={(event) => setSensitiveDataRemoved(event.target.checked)}
        />
        <span className="review-step-label">
          <span aria-hidden="true">Z</span>
          <span>
            <strong>Dados sensíveis ou desnecessários removidos</strong>
            <small>
              {hasSensitiveSignals
                ? "A revisão encontrou um possível dado sensível. Ajuste o currículo e volte."
                : "Conferi CPF, RG, endereço completo, nascimento e outros excessos."}
            </small>
          </span>
        </span>
      </label>

      <button
        type="button"
        className="secondary-action practice-tool-action"
        onClick={onOpenResume}
      >
        Abrir currículo para ajustar
      </button>

      <p className="challenge-status" role="status" aria-live="polite">
        {isReady
          ? "Revisão XYZ completa. Você pode concluir a missão."
          : hasSensitiveSignals
            ? "Remova os possíveis dados sensíveis e reabra a missão para recalcular."
            : "Complete X, Y e Z para liberar a conclusão."}
      </p>
    </div>
  );
}

function FinalCrossingPractice({
  onReadyChange,
}: Pick<MissionPracticeProps, "onReadyChange">) {
  const [crossingStep, setCrossingStep] = useState(0);
  const totalSteps = 3;
  const isReady = crossingStep === totalSteps;
  const messages = [
    "Você está no último marco. Avance para revisar sua travessia.",
    "E-mail preparado: primeiro trecho conectado.",
    "Arquivo e currículo preparados: a outra margem está próxima.",
    "Travessia prática completa. O último marco está pronto para ser aceso.",
  ];

  useEffect(() => {
    onReadyChange(isReady);
  }, [isReady, onReadyChange]);

  function advanceCrossing() {
    setCrossingStep((current) => Math.min(current + 1, totalSteps));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight" && !isReady) {
      event.preventDefault();
      advanceCrossing();
    }
  }

  return (
    <div
      className="final-crossing"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Travessia final. Use o botão ou pressione a seta para a direita."
    >
      <div className="crossing-track" aria-hidden="true">
        <span style={{ width: `${(crossingStep / totalSteps) * 100}%` }} />
        {[0, 1, 2, 3].map((step) => (
          <i className={step <= crossingStep ? "is-active" : undefined} key={step} />
        ))}
      </div>

      <div
        className="crossing-progress-accessible"
        role="progressbar"
        aria-label="Progresso da travessia final"
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-valuenow={crossingStep}
      />

      <p role="status" aria-live="polite">
        {messages[crossingStep]}
      </p>

      <button
        type="button"
        className="primary-action"
        disabled={isReady}
        onClick={advanceCrossing}
      >
        {isReady ? "Travessia preparada" : "Avançar na ponte →"}
      </button>
      <small>Também funciona com a tecla de seta para a direita.</small>
    </div>
  );
}

export function MissionPractice({
  missionId,
  onOpenResume,
  onReadyChange,
}: MissionPracticeProps) {
  switch (missionId) {
    case "professional-email":
      return <EmailPractice onReadyChange={onReadyChange} />;
    case "send-attachments":
      return <AttachmentPractice onReadyChange={onReadyChange} />;
    case "build-first-resume":
      return (
        <ResumePractice
          onOpenResume={onOpenResume}
          onReadyChange={onReadyChange}
        />
      );
    case "review-resume":
      return (
        <ReviewPractice
          onOpenResume={onOpenResume}
          onReadyChange={onReadyChange}
        />
      );
    case "complete-first-crossing":
      return <FinalCrossingPractice onReadyChange={onReadyChange} />;
  }
}
