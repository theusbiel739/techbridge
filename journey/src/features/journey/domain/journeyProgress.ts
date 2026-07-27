import type {
  DerivedJourneyProgress,
  JourneyRuntimeDefinition,
  MissionId,
} from "./types";

export type JourneyProgressOptions = {
  started?: boolean;
  creditedMissionIds?: MissionId[];
  skippedOptionalMissionIds?: MissionId[];
};

export function deriveJourneyProgress(
  runtime: JourneyRuntimeDefinition,
  completedMissionIds: MissionId[],
  options: JourneyProgressOptions = {},
): DerivedJourneyProgress {
  const {
    started = true,
    creditedMissionIds = [],
    skippedOptionalMissionIds = [],
  } = options;
  const diagnosticEligibleMissionIds = new Set(
    runtime.missions
      .filter(({ creditPolicy }) => creditPolicy === "diagnostic-eligible")
      .map(({ id }) => id),
  );
  const optionalMissionIds = new Set(
    runtime.missions
      .filter(({ requirement }) => requirement === "optional")
      .map(({ id }) => id),
  );
  const resolvedMissionIds = new Set([
    ...completedMissionIds,
    ...creditedMissionIds.filter((missionId) =>
      diagnosticEligibleMissionIds.has(missionId),
    ),
    ...skippedOptionalMissionIds.filter((missionId) =>
      optionalMissionIds.has(missionId),
    ),
  ]);
  const currentMissionId =
    runtime.missions.find(({ id }) => !resolvedMissionIds.has(id))?.id ?? null;
  const activeMissionIds = new Set([
    ...completedMissionIds,
    ...creditedMissionIds.filter((missionId) =>
      diagnosticEligibleMissionIds.has(missionId),
    ),
    ...(currentMissionId ? [currentMissionId] : []),
  ]);
  const skillIds = runtime.skills
    .filter((skill) =>
      runtime.missions.some(
        (mission) =>
          activeMissionIds.has(mission.id) &&
          mission.skillIds.includes(skill.id),
      ),
    )
    .map(({ id }) => id);
  const achievementIds = runtime.achievements
    .filter(({ unlock }) => {
      if (unlock.type === "journey-started") {
        return started;
      }

      return completedMissionIds.length >= unlock.count;
    })
    .map(({ id }) => id);

  return {
    currentMissionId,
    skillIds,
    achievementIds,
  };
}
