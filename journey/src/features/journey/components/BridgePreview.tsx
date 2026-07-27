import type { CSSProperties } from "react";
import type {
  JourneyMission,
  JourneyProgress,
  MissionId,
  MissionStatus,
} from "../domain/types";

type BridgePreviewProps = {
  missions: JourneyMission[];
  currentMissionId: MissionId | null;
  completedMissionIds: MissionId[];
  progress: JourneyProgress;
  teaser?: boolean;
};

const statusLabels: Record<MissionStatus, string> = {
  available: "Disponível",
  current: "Missão atual",
  locked: "Bloqueada",
  completed: "Concluída",
};

function getMissionStatus(
  missionId: MissionId,
  index: number,
  currentMissionId: MissionId | null,
  completedMissionIds: MissionId[],
): MissionStatus {
  if (completedMissionIds.includes(missionId)) {
    return "completed";
  }

  if (missionId === currentMissionId) {
    return "current";
  }

  if (currentMissionId === null && index === 0) {
    return "available";
  }

  return "locked";
}

export function BridgePreview({
  missions,
  currentMissionId,
  completedMissionIds,
  progress,
  teaser = false,
}: BridgePreviewProps) {
  if (teaser) {
    return (
      <section
        className="bridge-preview is-teaser"
        id="bridge"
        aria-labelledby="bridge-title"
      >
        <div className="bridge-header">
          <h2 className="section-kicker" id="bridge-title">
            Prévia da travessia
          </h2>
          <span className="progress-pill">Rota em preparação</span>
        </div>

        <div className="bridge-visual teaser-bridge-visual" aria-hidden="true">
          <div className="bridge-line" />
          {[0, 1, 2, 3, 4].map((index) => (
            <span
              className="bridge-node is-hidden-route"
              key={index}
              style={{ "--node-index": index } as CSSProperties}
            />
          ))}
        </div>

        <div className="bridge-teaser-copy">
          <span aria-hidden="true">⌁</span>
          <div>
            <strong>Sua rota será desenhada depois do diagnóstico.</strong>
            <p>
              Responda às perguntas para revelar os marcos e entender por onde
              começar.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bridge-preview" id="bridge" aria-labelledby="bridge-title">
      <div className="bridge-header">
        <h2 className="section-kicker" id="bridge-title">
          Mapa da ponte
        </h2>
        <span className="progress-pill">
          {progress.completedCount} de {progress.totalCount} missões
        </span>
      </div>

      <div
        className="bridge-visual"
        aria-hidden="true"
        style={
          { "--bridge-progress": `${progress.percentage}%` } as CSSProperties
        }
      >
        <div className="bridge-line" />
        <div className="bridge-progress-line" />
        {missions.map((mission, index) => {
          const status = getMissionStatus(
            mission.id,
            index,
            currentMissionId,
            completedMissionIds,
          );

          return (
            <span
              className={`bridge-node is-${status}`}
              key={mission.id}
              style={{ "--node-index": index } as CSSProperties}
            />
          );
        })}
      </div>

      <ol className="marker-list">
        {missions.map((mission, index) => {
          const status = getMissionStatus(
            mission.id,
            index,
            currentMissionId,
            completedMissionIds,
          );

          return (
            <li
              key={mission.id}
              className={`is-${status}`}
              aria-current={status === "current" ? "step" : undefined}
            >
              <span className="marker-number" aria-hidden="true">
                {status === "completed" ? "✓" : index + 1}
              </span>
              <div>
                <p>{mission.shortTitle}</p>
                <small>{statusLabels[status]}</small>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
