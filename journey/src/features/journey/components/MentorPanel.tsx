import { useEffect, useRef, useState } from "react";
import {
  getMentorGuidance,
  mentorActions,
} from "../journeys/first-opportunity/mentorData";
import {
  reviewResumeDraft,
  type ResumeReviewResult,
} from "../resume/resumeReview";
import { loadResumeDraft } from "../persistence/resumeStorage";
import type {
  InitialJourneyState,
  MentorActionId,
} from "../domain/types";

type MentorPanelProps = {
  journeyState: InitialJourneyState;
};

export function MentorPanel({ journeyState }: MentorPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAction, setSelectedAction] =
    useState<MentorActionId | null>(null);
  const [resumeReview, setResumeReview] =
    useState<ResumeReviewResult | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const wasOpenRef = useRef(false);
  const guidance = getMentorGuidance(journeyState);
  const currentResponse = selectedAction
    ? guidance.responses[selectedAction]
    : guidance.introduction;
  const canReviewResume =
    journeyState.currentMissionId === "build-first-resume" ||
    journeyState.currentMissionId === "review-resume";

  useEffect(() => {
    setSelectedAction(null);
    setResumeReview(null);
  }, [journeyState.currentMissionId, journeyState.startedAt]);

  useEffect(() => {
    if (isOpen) {
      titleRef.current?.focus();
    } else if (wasOpenRef.current) {
      launcherRef.current?.focus();
    }

    wasOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <div className="mentor-access" id="mentor">
      <aside
        id="mentor-panel"
        className="mentor-panel"
        aria-labelledby="mentor-title"
        aria-describedby="mentor-description"
        hidden={!isOpen}
      >
        <header className="mentor-panel-header">
          <div>
            <span>Apoio guiado</span>
            <h2 id="mentor-title" ref={titleRef} tabIndex={-1}>
              Mentor da Jornada
            </h2>
          </div>
          <button
            type="button"
            className="mentor-close"
            aria-label="Fechar mentor"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </header>

        <p className="mentor-context">{guidance.contextLabel}</p>
        <p id="mentor-description" className="mentor-description">
          Escolha uma orientação curta para continuar no seu ritmo.
        </p>

        <div
          className="mentor-response"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span>Orientação</span>
          <p>{currentResponse}</p>
        </div>

        <div
          className="mentor-actions"
          role="group"
          aria-label="Orientações do mentor"
        >
          {mentorActions.map((action) => (
            <button
              type="button"
              className="mentor-action"
              key={action.id}
              aria-pressed={selectedAction === action.id}
              onClick={() => setSelectedAction(action.id)}
            >
              {action.label}
            </button>
          ))}
        </div>

        {canReviewResume && (
          <section
            className="mentor-resume-review"
            aria-labelledby="mentor-resume-review-title"
          >
            <p className="section-kicker">Currículo Guiado</p>
            <h3 id="mentor-resume-review-title">Revisão local do mentor</h3>
            <p>
              Sugestões geradas por regras simples neste MVP. O conteúdo não é
              enviado para uma IA ou servidor.
            </p>
            <button
              type="button"
              className="secondary-action"
              onClick={() =>
                setResumeReview(reviewResumeDraft(loadResumeDraft()))
              }
            >
              {resumeReview ? "Recalcular revisão" : "Revisar meu currículo"}
            </button>

            {resumeReview && (
              <div className="mentor-review-result" role="status" aria-live="polite">
                <strong>
                  {resumeReview.suggestions.length}{" "}
                  {resumeReview.suggestions.length === 1
                    ? "orientação encontrada"
                    : "orientações encontradas"}
                </strong>
                <ul>
                  {resumeReview.suggestions.map((suggestion) => (
                    <li key={suggestion}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        <p className="mentor-privacy-note">
          Este apoio usa respostas fixas e revisão local por regras. Nenhum dado
          é enviado para fora deste navegador.
        </p>
      </aside>

      <button
        type="button"
        className="mentor-button"
        ref={launcherRef}
        aria-label={isOpen ? "Fechar mentor da jornada" : "Abrir mentor da jornada"}
        aria-expanded={isOpen}
        aria-controls="mentor-panel"
        onClick={() => setIsOpen((open) => !open)}
      >
        Mentor
      </button>
    </div>
  );
}
