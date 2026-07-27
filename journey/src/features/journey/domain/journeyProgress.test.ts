import { describe, expect, it } from "vitest";
import { deriveJourneyProgress } from "./journeyProgress";
import { firstOpportunityRuntime } from "../journeys/first-opportunity/definition";

describe("generic journey progress", () => {
  it("derives the first current mission without importing a journey", () => {
    expect(deriveJourneyProgress(firstOpportunityRuntime, [])).toEqual({
      currentMissionId: "professional-email",
      skillIds: ["digital-communication"],
      achievementIds: ["crossing-started"],
    });
  });

  it("derives progress from stable completed mission ids", () => {
    expect(
      deriveJourneyProgress(firstOpportunityRuntime, ["professional-email"]),
    ).toEqual({
      currentMissionId: "send-attachments",
      skillIds: ["digital-communication", "file-sharing"],
      achievementIds: ["crossing-started", "first-step-completed"],
    });
  });

  it("accepts future credits and optional skips as transient input", () => {
    const extensibleRuntime = {
      ...firstOpportunityRuntime,
      missions: firstOpportunityRuntime.missions.map((mission) =>
        mission.id === "professional-email"
          ? {
              ...mission,
              requirement: "optional" as const,
              creditPolicy: "diagnostic-eligible" as const,
            }
          : mission,
      ),
    };

    expect(
      deriveJourneyProgress(extensibleRuntime, [], {
        creditedMissionIds: ["professional-email"],
      }).currentMissionId,
    ).toBe("send-attachments");

    expect(
      deriveJourneyProgress(extensibleRuntime, [], {
        skippedOptionalMissionIds: ["professional-email"],
      }).currentMissionId,
    ).toBe("send-attachments");
  });
});
