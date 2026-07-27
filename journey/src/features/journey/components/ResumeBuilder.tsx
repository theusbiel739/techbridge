import { useEffect, useRef, useState, type RefObject } from "react";
import {
  clearResumeDraft,
  createInitialResumeDraft,
  loadResumeDraft,
  saveResumeDraft,
} from "../persistence/resumeStorage";
import type { ResumeDraft, ResumeDraftField } from "../resume/resumeTypes";

type ResumeBuilderProps = {
  headingRef: RefObject<HTMLHeadingElement | null>;
  onBack: () => void;
};

const fieldLabels: Record<ResumeDraftField, string> = {
  name: "Nome",
  email: "E-mail",
  phone: "Telefone",
  professionalObjective: "Objetivo profissional",
  education: "Formação",
  experienceProjects: "Experiências ou projetos",
  skills: "Habilidades",
};

function fallbackCopy(text: string): boolean {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();

  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textArea.remove();
  }
}

function formatResume(draft: ResumeDraft): string {
  const lines = [draft.name.trim() || "CURRÍCULO"];
  const contact = [draft.email.trim(), draft.phone.trim()].filter(Boolean);

  if (contact.length > 0) {
    lines.push(contact.join(" | "));
  }

  const sections = [
    ["OBJETIVO PROFISSIONAL", draft.professionalObjective],
    ["FORMAÇÃO", draft.education],
    ["EXPERIÊNCIAS E PROJETOS", draft.experienceProjects],
    ["HABILIDADES", draft.skills],
  ];

  sections.forEach(([title, content]) => {
    const trimmedContent = content.trim();
    if (trimmedContent) {
      lines.push("", title, trimmedContent);
    }
  });

  return lines.join("\n");
}

export function ResumeBuilder({ headingRef, onBack }: ResumeBuilderProps) {
  const [draft, setDraft] = useState(loadResumeDraft);
  const [saveError, setSaveError] = useState(false);
  const [isClearConfirmationOpen, setIsClearConfirmationOpen] = useState(false);
  const [clearFeedback, setClearFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const confirmClearButtonRef = useRef<HTMLButtonElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isClearConfirmationOpen) {
      confirmClearButtonRef.current?.focus();
    }
  }, [isClearConfirmationOpen]);

  const hasContent = (
    Object.keys(fieldLabels) as ResumeDraftField[]
  ).some((field) => draft[field].trim().length > 0);
  const previewModules = [
    draft.name.trim().length > 0 &&
      (draft.email.trim().length > 0 || draft.phone.trim().length > 0),
    draft.professionalObjective.trim().length > 0,
    draft.education.trim().length > 0,
    draft.experienceProjects.trim().length > 0,
    draft.skills.trim().length > 0,
  ];
  const completedPreviewModules = previewModules.filter(Boolean).length;

  function updateField(field: ResumeDraftField, value: string) {
    const nextDraft: ResumeDraft = {
      ...draft,
      [field]: value,
      updatedAt: new Date().toISOString(),
    };

    setDraft(nextDraft);
    setSaveError(!saveResumeDraft(nextDraft));
    setClearFeedback(null);
    setCopyFeedback(null);
  }

  function requestClearDraft() {
    setClearFeedback(null);
    setIsClearConfirmationOpen(true);
  }

  function cancelClearDraft() {
    setIsClearConfirmationOpen(false);
    window.requestAnimationFrame(() => clearButtonRef.current?.focus());
  }

  function confirmClearDraft() {
    if (!clearResumeDraft()) {
      setClearFeedback({
        type: "error",
        message:
          "Não foi possível apagar o rascunho salvo. Tente novamente neste navegador.",
      });
      return;
    }

    setDraft(createInitialResumeDraft());
    setSaveError(false);
    setCopyFeedback(null);
    setIsClearConfirmationOpen(false);
    setClearFeedback({
      type: "success",
      message: "Rascunho limpo. O progresso da sua jornada foi mantido.",
    });
    window.requestAnimationFrame(() => nameInputRef.current?.focus());
  }

  async function copyResume() {
    const resumeText = formatResume(draft);

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(resumeText);
      } else if (!fallbackCopy(resumeText)) {
        throw new Error("Clipboard unavailable");
      }

      setCopyFeedback({
        type: "success",
        message: "Currículo copiado. Agora você pode colar o texto onde precisar.",
      });
    } catch {
      const copiedWithFallback = fallbackCopy(resumeText);
      setCopyFeedback(
        copiedWithFallback
          ? {
              type: "success",
              message:
                "Currículo copiado. Agora você pode colar o texto onde precisar.",
            }
          : {
              type: "error",
              message:
                "Não foi possível copiar automaticamente. Selecione o texto da prévia e copie pelo teclado.",
            },
      );
    }
  }

  return (
    <div className="resume-builder">
      <header className="resume-heading">
        <div>
          <p className="section-kicker">Ferramenta prática</p>
          <h1 id="hero-title" ref={headingRef} tabIndex={-1}>
            Currículo Guiado
          </h1>
          <p>
            Preencha com calma. A prévia acompanha suas respostas e ajuda a
            organizar um currículo simples para a primeira oportunidade.
          </p>
        </div>
        <button type="button" className="secondary-action" onClick={onBack}>
          Voltar ao dashboard
        </button>
      </header>

      <p className="resume-privacy-note">
        <strong>Privacidade:</strong> este rascunho fica salvo somente neste
        navegador. Não inclua CPF, RG, endereço completo, data de nascimento ou
        outras informações sensíveis.
      </p>

      <div className="resume-builder-grid">
        <form className="resume-form" onSubmit={(event) => event.preventDefault()}>
          <div className="resume-form-heading">
            <p className="section-kicker">Seu conteúdo</p>
            <h2>Conte sua trajetória</h2>
            <p>Você pode voltar e ajustar este rascunho quando quiser.</p>
          </div>

          <label>
            <span>{fieldLabels.name}</span>
            <input
              ref={nameInputRef}
              type="text"
              autoComplete="name"
              maxLength={100}
              value={draft.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Ex.: Ana Souza"
            />
          </label>

          <div className="resume-contact-fields">
            <label>
              <span>{fieldLabels.email}</span>
              <input
                type="email"
                autoComplete="email"
                maxLength={160}
                value={draft.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="ana.souza@email.com"
              />
            </label>
            <label>
              <span>{fieldLabels.phone}</span>
              <input
                type="tel"
                autoComplete="tel"
                maxLength={40}
                value={draft.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="(00) 00000-0000"
              />
            </label>
          </div>

          <label>
            <span>{fieldLabels.professionalObjective}</span>
            <textarea
              rows={3}
              maxLength={500}
              value={draft.professionalObjective}
              onChange={(event) =>
                updateField("professionalObjective", event.target.value)
              }
              placeholder="Ex.: Busco minha primeira oportunidade na área administrativa."
            />
          </label>

          <label>
            <span>{fieldLabels.education}</span>
            <textarea
              rows={4}
              maxLength={1500}
              value={draft.education}
              onChange={(event) => updateField("education", event.target.value)}
              placeholder="Ex.: Ensino Médio completo — Escola Exemplo, 2025."
            />
          </label>

          <label>
            <span>{fieldLabels.experienceProjects}</span>
            <textarea
              rows={5}
              maxLength={2500}
              value={draft.experienceProjects}
              onChange={(event) =>
                updateField("experienceProjects", event.target.value)
              }
              placeholder="Conte sobre trabalhos, cursos práticos, voluntariado ou projetos pessoais."
            />
          </label>

          <label>
            <span>{fieldLabels.skills}</span>
            <textarea
              rows={3}
              maxLength={1000}
              value={draft.skills}
              onChange={(event) => updateField("skills", event.target.value)}
              placeholder="Ex.: Organização, comunicação, e-mail e planilhas básicas."
            />
          </label>

          <div className="resume-clear-area">
            {isClearConfirmationOpen ? (
              <div
                className="resume-clear-confirmation"
                role="group"
                aria-labelledby="clear-confirmation-title"
                aria-describedby="clear-confirmation-description"
              >
                <div>
                  <strong id="clear-confirmation-title">Tem certeza?</strong>
                  <p id="clear-confirmation-description">
                    Os campos e o rascunho salvo serão apagados. O progresso da
                    jornada será mantido.
                  </p>
                </div>
                <div className="resume-clear-actions">
                  <button
                    ref={confirmClearButtonRef}
                    type="button"
                    className="secondary-action"
                    onClick={confirmClearDraft}
                  >
                    Sim, limpar
                  </button>
                  <button
                    type="button"
                    className="secondary-action"
                    onClick={cancelClearDraft}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                ref={clearButtonRef}
                type="button"
                className="secondary-action"
                onClick={requestClearDraft}
                disabled={!hasContent}
              >
                Limpar rascunho
              </button>
            )}

            {clearFeedback && (
              <p
                className={`copy-feedback ${clearFeedback.type}`}
                role={clearFeedback.type === "error" ? "alert" : "status"}
                aria-live={clearFeedback.type === "error" ? "assertive" : "polite"}
              >
                {clearFeedback.message}
              </p>
            )}
          </div>

          {saveError && (
            <p className="storage-error" role="alert">
              Não foi possível salvar o rascunho neste navegador. Você pode
              continuar preenchendo, mas os dados podem não permanecer depois.
            </p>
          )}
        </form>

        <section className="resume-preview" aria-labelledby="resume-preview-title">
          <div className="resume-preview-heading">
            <div>
              <p className="section-kicker">Prévia ao vivo</p>
              <h2 id="resume-preview-title">Seu currículo</h2>
            </div>
            <button
              type="button"
              className="primary-action"
              onClick={copyResume}
              disabled={!hasContent}
            >
              Copiar currículo
            </button>
          </div>

          <div
            className="resume-construction-status"
            role="progressbar"
            aria-label="Construção da estrutura do currículo"
            aria-valuemin={0}
            aria-valuemax={previewModules.length}
            aria-valuenow={completedPreviewModules}
          >
            <span>
              Estrutura construída: {completedPreviewModules} de{" "}
              {previewModules.length} módulos
            </span>
            <div aria-hidden="true">
              {previewModules.map((isComplete, index) => (
                <i className={isComplete ? "is-complete" : undefined} key={index} />
              ))}
            </div>
          </div>

          <article className="resume-paper">
            <header className={previewModules[0] ? "is-filled" : undefined}>
              <h3>{draft.name.trim() || "Seu nome"}</h3>
              <p>
                {draft.email.trim() || "seu e-mail"}
                <span aria-hidden="true"> · </span>
                {draft.phone.trim() || "seu telefone"}
              </p>
            </header>

            <section className={previewModules[1] ? "is-filled" : undefined}>
              <h4>Objetivo profissional</h4>
              <p>
                {draft.professionalObjective.trim() ||
                  "Conte em poucas palavras qual oportunidade você busca."}
              </p>
            </section>
            <section className={previewModules[2] ? "is-filled" : undefined}>
              <h4>Formação</h4>
              <p>
                {draft.education.trim() ||
                  "Adicione sua escola, curso e ano de conclusão."}
              </p>
            </section>
            <section className={previewModules[3] ? "is-filled" : undefined}>
              <h4>Experiências e projetos</h4>
              <p>
                {draft.experienceProjects.trim() ||
                  "Você pode incluir projetos, voluntariado e atividades práticas."}
              </p>
            </section>
            <section className={previewModules[4] ? "is-filled" : undefined}>
              <h4>Habilidades</h4>
              <p>
                {draft.skills.trim() ||
                  "Liste conhecimentos e qualidades úteis para o trabalho."}
              </p>
            </section>
          </article>

          {copyFeedback && (
            <p
              className={`copy-feedback ${copyFeedback.type}`}
              role={copyFeedback.type === "error" ? "alert" : "status"}
              aria-live={copyFeedback.type === "error" ? "assertive" : "polite"}
            >
              {copyFeedback.message}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
