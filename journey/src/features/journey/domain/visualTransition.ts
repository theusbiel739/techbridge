import type { ChapterId, CheckpointType, MissionId } from "./types";

export type JourneyVisualTransitionEvent =
  | { type: "mission-completed"; missionId: MissionId }
  | { type: "checkpoint-activated"; checkpointType: CheckpointType }
  | { type: "chapter-progressed"; chapterId: ChapterId; progress: number }
  | {
      type: "chapter-changed";
      fromChapterId: ChapterId | null;
      toChapterId: ChapterId;
    }
  | { type: "camera-advanced"; chapterId: ChapterId }
  | { type: "environment-revealed"; chapterId: ChapterId };

export type JourneyVisualTransitionState = {
  status: "idle" | "queued" | "running" | "settled";
  events: JourneyVisualTransitionEvent[];
};

export const initialJourneyVisualTransitionState: JourneyVisualTransitionState =
  {
    status: "idle",
    events: [],
  };
