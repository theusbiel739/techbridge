export type ResumeDraft = {
  version: 1;
  name: string;
  email: string;
  phone: string;
  professionalObjective: string;
  education: string;
  experienceProjects: string;
  skills: string;
  updatedAt: string;
};

export type ResumeDraftField = Exclude<
  keyof ResumeDraft,
  "version" | "updatedAt"
>;
