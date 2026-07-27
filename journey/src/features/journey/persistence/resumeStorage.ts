import type { ResumeDraft, ResumeDraftField } from "../resume/resumeTypes";

const RESUME_STORAGE_KEY = "techbridge:resume:draft";

const FIELD_LIMITS: Record<ResumeDraftField, number> = {
  name: 100,
  email: 160,
  phone: 40,
  professionalObjective: 500,
  education: 1500,
  experienceProjects: 2500,
  skills: 1000,
};

export function createInitialResumeDraft(): ResumeDraft {
  return {
    version: 1,
    name: "",
    email: "",
    phone: "",
    professionalObjective: "",
    education: "",
    experienceProjects: "",
    skills: "",
    updatedAt: new Date().toISOString(),
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

function isValidField(
  draft: Record<string, unknown>,
  field: ResumeDraftField,
): boolean {
  const value = draft[field];
  return typeof value === "string" && value.length <= FIELD_LIMITS[field];
}

export function isResumeDraft(value: unknown): value is ResumeDraft {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const draft = value as Record<string, unknown>;
  const fields = Object.keys(FIELD_LIMITS) as ResumeDraftField[];
  const allowedKeys = new Set(["version", "updatedAt", ...fields]);

  return (
    draft.version === 1 &&
    Object.keys(draft).every((key) => allowedKeys.has(key)) &&
    fields.every((field) => isValidField(draft, field)) &&
    isValidTimestamp(draft.updatedAt)
  );
}

function resetSavedDraft(safeDraft: ResumeDraft): ResumeDraft {
  try {
    window.localStorage.setItem(
      RESUME_STORAGE_KEY,
      JSON.stringify(safeDraft),
    );
  } catch {
    // The safe in-memory draft still lets the user continue without persistence.
  }

  return safeDraft;
}

export function loadResumeDraft(): ResumeDraft {
  const safeDraft = createInitialResumeDraft();

  try {
    const savedDraft = window.localStorage.getItem(RESUME_STORAGE_KEY);

    if (!savedDraft) {
      return safeDraft;
    }

    const parsedDraft: unknown = JSON.parse(savedDraft);

    if (isResumeDraft(parsedDraft)) {
      return parsedDraft;
    }

    return resetSavedDraft(safeDraft);
  } catch {
    return resetSavedDraft(safeDraft);
  }
}

export function saveResumeDraft(draft: ResumeDraft): boolean {
  if (!isResumeDraft(draft)) {
    return false;
  }

  try {
    window.localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(draft));
    return true;
  } catch {
    return false;
  }
}

export function clearResumeDraft(): boolean {
  try {
    window.localStorage.removeItem(RESUME_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
