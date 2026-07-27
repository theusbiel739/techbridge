import { describe, expect, it } from "vitest";
import { deriveJourneyProgress } from "../domain/journeyProgress";
import { firstOpportunityPersistenceContext } from "../journeys/first-opportunity/storage";
import {
  createInitialJourneyState,
  isInitialJourneyState,
  loadPersistedJourneyState,
  type JourneyStorage,
} from "./journeyStorage";
import { planJourneyStateV3Migration } from "./journeyStateMigration";

function createMemoryStorage(): JourneyStorage {
  const values = new Map<string, string>();

  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => {
      values.set(key, value);
    },
    removeItem: (key) => {
      values.delete(key);
    },
  };
}

describe("journey persistence compatibility", () => {
  it("accepts and restores the current version 2 state unchanged", () => {
    const progress = deriveJourneyProgress(
      firstOpportunityPersistenceContext.runtime,
      [],
    );
    const currentState = {
      ...createInitialJourneyState(),
      selectedGoalId: "first-job" as const,
      diagnosticAnswers: {
        "uses-email": "yes" as const,
        "attaches-files": "not-yet" as const,
        "has-resume": "not-yet" as const,
      },
      recommendedJourneyId: "first-opportunity" as const,
      updatedAt: "2026-07-27T12:00:00.000Z",
      startedAt: "2026-07-27T12:00:00.000Z",
      ...progress,
    };
    const storage = createMemoryStorage();

    storage.setItem(
      firstOpportunityPersistenceContext.storageKey,
      JSON.stringify(currentState),
    );

    expect(
      isInitialJourneyState(
        currentState,
        firstOpportunityPersistenceContext,
      ),
    ).toBe(true);
    expect(
      loadPersistedJourneyState(firstOpportunityPersistenceContext, storage),
    ).toEqual(currentState);
  });

  it("keeps the existing version 1 to version 2 migration compatible", () => {
    const storage = createMemoryStorage();
    storage.setItem(
      firstOpportunityPersistenceContext.storageKey,
      JSON.stringify({
        version: 1,
        selectedGoalId: "first-job",
        diagnosticAnswers: {},
        recommendedJourneyId: "first-opportunity",
        updatedAt: "2026-07-27T12:00:00.000Z",
        startedAt: "2026-07-27T12:00:00.000Z",
      }),
    );

    const migrated = loadPersistedJourneyState(
      firstOpportunityPersistenceContext,
      storage,
    );

    expect(migrated.version).toBe(2);
    expect(migrated.currentMissionId).toBe("professional-email");
    expect(migrated.completedMissionIds).toEqual([]);
  });

  it("prepares a version 3 migration plan without writing it", () => {
    const state = {
      ...createInitialJourneyState(),
      recommendedJourneyId: "first-opportunity" as const,
      completedMissionIds: ["professional-email" as const],
    };
    const plan = planJourneyStateV3Migration(
      state,
      firstOpportunityPersistenceContext.runtime,
    );

    expect(plan).toMatchObject({
      sourceVersion: 2,
      targetVersion: 3,
      journeyId: "first-opportunity",
      campaignId: "techbridge-campaign",
      routeIds: ["first-opportunity-route"],
      preservedCompletedMissionIds: ["professional-email"],
      unresolvedMissionIds: [],
      requiresWrite: false,
    });
  });
});
