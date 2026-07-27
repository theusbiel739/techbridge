import { deriveJourneyProgress } from "../domain/journeyProgress";
import type {
  AchievementId,
  DiagnosticAnswer,
  DiagnosticAnswers,
  GoalId,
  InitialJourneyState,
  JourneyId,
  JourneyRuntimeDefinition,
  MissionId,
  SkillId,
} from "../domain/types";

export type JourneyPersistenceContext = {
  storageKey: string;
  runtime: JourneyRuntimeDefinition;
};

export type JourneyStorage = Pick<
  Storage,
  "getItem" | "setItem" | "removeItem"
>;

export type LegacyJourneyState = {
  version: 1;
  selectedGoalId: GoalId | null;
  diagnosticAnswers: DiagnosticAnswers;
  recommendedJourneyId: JourneyId | null;
  updatedAt: string;
  startedAt: string | null;
};

export function createInitialJourneyState(): InitialJourneyState {
  return {
    version: 2,
    selectedGoalId: null,
    diagnosticAnswers: {},
    recommendedJourneyId: null,
    updatedAt: new Date().toISOString(),
    startedAt: null,
    currentMissionId: null,
    completedMissionIds: [],
    skillIds: [],
    achievementIds: [],
  };
}

function isValidTimestamp(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const parsedDate = new Date(value);
  return (
    !Number.isNaN(parsedDate.getTime()) && parsedDate.toISOString() === value
  );
}

function isDiagnosticAnswer(value: unknown): value is DiagnosticAnswer {
  return value === "yes" || value === "not-yet";
}

function isDiagnosticAnswers(
  value: unknown,
  context: JourneyPersistenceContext,
): value is DiagnosticAnswers {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return Object.entries(value).every(
    ([questionId, answer]) =>
      context.runtime.diagnosticQuestionIds.includes(
        questionId as (typeof context.runtime.diagnosticQuestionIds)[number],
      ) && isDiagnosticAnswer(answer),
  );
}

function isAllowedArray<T extends string>(
  value: unknown,
  allowedValues: T[],
): value is T[] {
  return (
    Array.isArray(value) &&
    new Set(value).size === value.length &&
    value.every(
      (item) => typeof item === "string" && allowedValues.includes(item as T),
    )
  );
}

export function isLegacyJourneyState(
  value: unknown,
  context: JourneyPersistenceContext,
): value is LegacyJourneyState {
  if (!value || typeof value !== "object") {
    return false;
  }

  const state = value as Record<string, unknown>;
  const { journey } = context.runtime;
  const hasConsistentStart =
    state.startedAt === null ||
    (state.selectedGoalId === journey.goalId &&
      state.recommendedJourneyId === journey.id);

  return (
    state.version === 1 &&
    (state.selectedGoalId === null ||
      state.selectedGoalId === journey.goalId) &&
    isDiagnosticAnswers(state.diagnosticAnswers, context) &&
    (state.recommendedJourneyId === null ||
      state.recommendedJourneyId === journey.id) &&
    isValidTimestamp(state.updatedAt) &&
    (state.startedAt === null || isValidTimestamp(state.startedAt)) &&
    hasConsistentStart
  );
}

function hasConsistentProgress(
  state: Record<string, unknown>,
  context: JourneyPersistenceContext,
): boolean {
  const completedMissionIds = state.completedMissionIds as MissionId[];
  const skillIds = state.skillIds as SkillId[];
  const achievementIds = state.achievementIds as AchievementId[];
  const missionIds = context.runtime.missions.map(({ id }) => id);
  const completedInV2Order = completedMissionIds.every(
    (missionId, index) => missionId === missionIds[index],
  );

  if (!completedInV2Order) {
    return false;
  }

  if (state.startedAt === null) {
    return (
      state.currentMissionId === null &&
      completedMissionIds.length === 0 &&
      skillIds.length === 0 &&
      achievementIds.length === 0
    );
  }

  const expectedProgress = deriveJourneyProgress(
    context.runtime,
    completedMissionIds,
  );
  const hasExpectedSkills =
    skillIds.length === expectedProgress.skillIds.length &&
    skillIds.every(
      (skillId, index) => skillId === expectedProgress.skillIds[index],
    );
  const hasExpectedAchievements =
    achievementIds.length === expectedProgress.achievementIds.length &&
    achievementIds.every(
      (achievementId, index) =>
        achievementId === expectedProgress.achievementIds[index],
    );

  return (
    state.selectedGoalId === context.runtime.journey.goalId &&
    state.recommendedJourneyId === context.runtime.journey.id &&
    state.currentMissionId === expectedProgress.currentMissionId &&
    hasExpectedSkills &&
    hasExpectedAchievements
  );
}

export function isInitialJourneyState(
  value: unknown,
  context: JourneyPersistenceContext,
): value is InitialJourneyState {
  if (!value || typeof value !== "object") {
    return false;
  }

  const state = value as Record<string, unknown>;
  const { journey, missions, skills, achievements } = context.runtime;
  const missionIds = missions.map(({ id }) => id);
  const skillIds = skills.map(({ id }) => id);
  const achievementIds = achievements.map(({ id }) => id);
  const hasValidCurrentMission =
    state.currentMissionId === null ||
    missionIds.includes(state.currentMissionId as MissionId);

  return (
    state.version === 2 &&
    (state.selectedGoalId === null ||
      state.selectedGoalId === journey.goalId) &&
    isDiagnosticAnswers(state.diagnosticAnswers, context) &&
    (state.recommendedJourneyId === null ||
      state.recommendedJourneyId === journey.id) &&
    isValidTimestamp(state.updatedAt) &&
    (state.startedAt === null || isValidTimestamp(state.startedAt)) &&
    hasValidCurrentMission &&
    isAllowedArray(state.completedMissionIds, missionIds) &&
    isAllowedArray(state.skillIds, skillIds) &&
    isAllowedArray(state.achievementIds, achievementIds) &&
    hasConsistentProgress(state, context)
  );
}

export function migrateLegacyJourneyState(
  state: LegacyJourneyState,
  context: JourneyPersistenceContext,
): InitialJourneyState {
  const journeyWasStarted = state.startedAt !== null;
  const initialProgress = journeyWasStarted
    ? deriveJourneyProgress(context.runtime, [])
    : {
        currentMissionId: null,
        skillIds: [],
        achievementIds: [],
      };

  return {
    ...state,
    version: 2,
    completedMissionIds: [],
    ...initialProgress,
  };
}

export function loadPersistedJourneyState(
  context: JourneyPersistenceContext,
  storage: JourneyStorage = window.localStorage,
): InitialJourneyState {
  try {
    const savedState = storage.getItem(context.storageKey);

    if (!savedState) {
      return createInitialJourneyState();
    }

    const parsedState: unknown = JSON.parse(savedState);

    if (isInitialJourneyState(parsedState, context)) {
      return parsedState;
    }

    if (isLegacyJourneyState(parsedState, context)) {
      const migratedState = migrateLegacyJourneyState(parsedState, context);
      savePersistedJourneyState(context, migratedState, storage);
      return migratedState;
    }

    return createInitialJourneyState();
  } catch {
    return createInitialJourneyState();
  }
}

export function savePersistedJourneyState(
  context: JourneyPersistenceContext,
  state: InitialJourneyState,
  storage: JourneyStorage = window.localStorage,
): boolean {
  try {
    storage.setItem(context.storageKey, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function clearPersistedJourneyState(
  context: JourneyPersistenceContext,
  storage: JourneyStorage = window.localStorage,
): boolean {
  try {
    storage.removeItem(context.storageKey);
    return true;
  } catch {
    return false;
  }
}
