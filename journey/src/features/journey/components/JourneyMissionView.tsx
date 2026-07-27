import { useState } from "react";
import type { RefObject } from "react";
import { MissionPractice } from "./MissionPractice";
import type { JourneyMission } from "../domain/types";

type JourneyMissionViewProps = {
  mission: JourneyMission;
  missionNumber: number;
  totalMissions: number;
  headingRef: RefObject<HTMLHeadingElement | null>;
  storageError: boolean;
  onBack: () => void;
  onComplete: () => void;
  onOpenResume: () => void;
};

export function JourneyMissionView({
  mission,
  missionNumber,
  totalMissions,
  headingRef,
  storageError,
  onBack,
  onComplete,
  onOpenResume,
}: JourneyMissionViewProps) {
  const [practiceCompleted, setPracticeCompleted] = useState(false);

  return (
    <article className="mission-screen">
      <header className="mission-heading">
        <div>
          <p className="section-kicker">
            Missão {missionNumber} de {totalMissions}
          </p>
          <h1
            id="hero-title"
            className="mission-title"
            ref={headingRef}
            tabIndex={-1}
          >
            {mission.title}
          </h1>
          <p className="hero-copy">{mission.description}</p>
        </div>
        <span className="mission-status-badge">Em andamento</span>
      </header>

      <div className="mission-content">
        <div className="mission-learning">
          <section className="mission-section" aria-labelledby="objective-title">
            <p className="section-kicker">Objetivo</p>
            <h2 id="objective-title">O que você vai praticar</h2>
            <p>{mission.objective}</p>
          </section>

          <section className="mission-section" aria-labelledby="lesson-title">
            <p className="section-kicker">Passo a passo</p>
            <h2 id="lesson-title">Entenda antes de fazer</h2>
            <p>{mission.lesson}</p>
          </section>

          <section className="mission-example" aria-labelledby="example-title">
            <span className="example-mark" aria-hidden="true">
              Exemplo
            </span>
            <div>
              <h2 id="example-title">Veja na prática</h2>
              <p>{mission.example}</p>
            </div>
          </section>
        </div>

        <section className="mission-challenge" aria-labelledby="challenge-title">
          <div className="mission-challenge-heading">
            <p className="section-kicker">Sua atividade</p>
            <h2 id="challenge-title">Agora é sua vez</h2>
            <p>{mission.challenge}</p>
          </div>

          <MissionPractice
            missionId={mission.id}
            onOpenResume={onOpenResume}
            onReadyChange={setPracticeCompleted}
          />

          <div className="mission-screen-actions">
            <button
              type="button"
              className="primary-action"
              disabled={!practiceCompleted}
              onClick={onComplete}
            >
              Concluir missão
            </button>
            <button
              type="button"
              className="secondary-action"
              onClick={onBack}
            >
              Voltar ao dashboard
            </button>
          </div>

          {storageError && (
            <p className="storage-error" role="alert">
              Não foi possível salvar neste navegador. O progresso pode não
              estar disponível depois.
            </p>
          )}
        </section>
      </div>
    </article>
  );
}
