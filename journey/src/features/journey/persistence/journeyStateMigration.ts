import type {
  CampaignId,
  InitialJourneyState,
  JourneyRuntimeDefinition,
  MissionId,
  RouteId,
} from "../domain/types";

export type JourneyStateV3MigrationPlan = {
  sourceVersion: 2;
  targetVersion: 3;
  journeyId: InitialJourneyState["recommendedJourneyId"];
  campaignId: CampaignId;
  routeIds: RouteId[];
  preservedCompletedMissionIds: MissionId[];
  unresolvedMissionIds: MissionId[];
  requiresWrite: false;
};

export function planJourneyStateV3Migration(
  state: InitialJourneyState,
  runtime: JourneyRuntimeDefinition,
): JourneyStateV3MigrationPlan {
  const knownMissionIds = new Set(runtime.missions.map(({ id }) => id));

  return {
    sourceVersion: 2,
    targetVersion: 3,
    journeyId: state.recommendedJourneyId,
    campaignId: runtime.journey.campaignId,
    routeIds: runtime.journey.routeIds,
    preservedCompletedMissionIds: state.completedMissionIds.filter(
      (missionId) => knownMissionIds.has(missionId),
    ),
    unresolvedMissionIds: state.completedMissionIds.filter(
      (missionId) => !knownMissionIds.has(missionId),
    ),
    requiresWrite: false,
  };
}
