export type GoalId = "first-job";

export type DiagnosticQuestionId =
  | "uses-email"
  | "attaches-files"
  | "has-resume";

export type DiagnosticAnswer = "yes" | "not-yet";

export type JourneyId = "first-opportunity";

export type CampaignId = "techbridge-campaign";

export type RouteId = `${string}-route`;

export type ChapterId =
  | "prologue-choose-destination"
  | "chapter-1-light-the-bridge"
  | "chapter-2-find-the-path"
  | "chapter-3-create-connections"
  | "chapter-4-digital-shield"
  | "chapter-5-build-and-produce"
  | "chapter-6-intelligence-with-purpose"
  | "chapter-7-goal-in-action"
  | "chapter-8-digital-autonomy";

export type MissionId =
  | "professional-email"
  | "send-attachments"
  | "build-first-resume"
  | "review-resume"
  | "complete-first-crossing";

export type MissionStatus = "available" | "current" | "locked" | "completed";

export type MissionRequirement = "required" | "optional";

export type MissionCreditPolicy = "completion-only" | "diagnostic-eligible";

export type SkillId =
  | "digital-communication"
  | "file-sharing"
  | "resume-writing"
  | "professional-review";

export type AchievementId = "crossing-started" | "first-step-completed";

export type MentorActionId =
  | "simplify"
  | "example"
  | "goal-impact"
  | "next-step"
  | "summary";

export type JourneyGoal = {
  id: GoalId;
  title: string;
  description: string;
};

export type DiagnosticQuestion = {
  id: DiagnosticQuestionId;
  prompt: string;
  supportingText: string;
};

export type DiagnosticAnswers = Partial<
  Record<DiagnosticQuestionId, DiagnosticAnswer>
>;

export type JourneyRecommendation = {
  id: JourneyId;
  goalId: GoalId;
  title: string;
  description: string;
};

export type CheckpointType =
  | "none"
  | "prologue"
  | "chapter"
  | "route"
  | "vertical-slice"
  | "campaign-completion";

export type BridgeVisualStage =
  | "destination"
  | "bridge-off"
  | "path-visible"
  | "connections-active"
  | "shield-active"
  | "construction-active"
  | "purpose-active"
  | "goal-active"
  | "city-revealed";

export type JourneyChapter = {
  id: ChapterId;
  order: number;
  title: string;
  purpose: string;
  missionIds: MissionId[];
  checkpointType: CheckpointType;
  visualStage: BridgeVisualStage;
  required: boolean;
};

export type JourneyDefinition = JourneyRecommendation & {
  campaignId: CampaignId;
  routeIds: RouteId[];
  chapters: JourneyChapter[];
  verticalSliceCheckpointMissionId: MissionId | null;
};

export type JourneyMission = {
  id: MissionId;
  title: string;
  shortTitle: string;
  description: string;
  outcome: string;
  objective: string;
  lesson: string;
  example: string;
  challenge: string;
  completionMessage: string;
  skillIds: SkillId[];
  requirement: MissionRequirement;
  creditPolicy: MissionCreditPolicy;
};

export type JourneyRoute = {
  id: RouteId;
  chapterId: ChapterId;
  title: string;
  missionIds: MissionId[];
};

export type CampaignDefinition = {
  id: CampaignId;
  title: string;
  chapters: JourneyChapter[];
};

export type JourneySkill = {
  id: SkillId;
  label: string;
};

export type JourneyAchievement = {
  id: AchievementId;
  title: string;
  description: string;
  unlock:
    | { type: "journey-started" }
    | { type: "completed-mission-count"; count: number };
};

export type MentorAction = {
  id: MentorActionId;
  label: string;
};

export type MentorGuidance = {
  contextLabel: string;
  introduction: string;
  responses: Record<MentorActionId, string>;
};

export type JourneyProgress = {
  completedCount: number;
  totalCount: number;
  percentage: number;
};

export type DerivedJourneyProgress = {
  currentMissionId: MissionId | null;
  skillIds: SkillId[];
  achievementIds: AchievementId[];
};

export type InitialJourneyState = {
  version: 2;
  selectedGoalId: GoalId | null;
  diagnosticAnswers: DiagnosticAnswers;
  recommendedJourneyId: JourneyId | null;
  updatedAt: string;
  startedAt: string | null;
  currentMissionId: MissionId | null;
  completedMissionIds: MissionId[];
  skillIds: SkillId[];
  achievementIds: AchievementId[];
};

export type JourneyRuntimeDefinition = {
  journey: JourneyDefinition;
  missions: JourneyMission[];
  skills: JourneySkill[];
  achievements: JourneyAchievement[];
  diagnosticQuestionIds: DiagnosticQuestionId[];
};
