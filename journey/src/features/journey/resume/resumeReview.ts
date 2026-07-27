import type { ResumeDraft } from "./resumeTypes";

export type ResumeReviewCheck = {
  id:
    | "name"
    | "email"
    | "phone"
    | "professional-objective"
    | "education"
    | "experience-projects"
    | "skills";
  label: string;
  passed: boolean;
};

export type ResumeReviewResult = {
  checks: ResumeReviewCheck[];
  suggestions: string[];
  sensitiveSignals: string[];
};

const MINIMUM_OBJECTIVE_LENGTH = 50;

function getSensitiveSignals(draft: ResumeDraft): string[] {
  const content = [
    draft.name,
    draft.email,
    draft.phone,
    draft.professionalObjective,
    draft.education,
    draft.experienceProjects,
    draft.skills,
  ].join(" ");
  const signals = [
    {
      label: "possível CPF",
      pattern: /\b(?:cpf\b|\d{3}\.\d{3}\.\d{3}-\d{2})/i,
    },
    { label: "possível RG", pattern: /\brg\b/i },
    { label: "endereço completo", pattern: /\bendere[cç]o completo\b/i },
    {
      label: "data de nascimento",
      pattern: /\b(?:data de nascimento|nascimento)\b/i,
    },
  ];

  return signals
    .filter(({ pattern }) => pattern.test(content))
    .map(({ label }) => label);
}

export function reviewResumeDraft(draft: ResumeDraft): ResumeReviewResult {
  const checks: ResumeReviewCheck[] = [
    {
      id: "name",
      label: "Nome preenchido",
      passed: draft.name.trim().length > 0,
    },
    {
      id: "email",
      label: "E-mail preenchido",
      passed: draft.email.trim().length > 0,
    },
    {
      id: "phone",
      label: "Telefone preenchido",
      passed: draft.phone.trim().length > 0,
    },
    {
      id: "professional-objective",
      label: "Objetivo profissional desenvolvido",
      passed:
        draft.professionalObjective.trim().length >=
        MINIMUM_OBJECTIVE_LENGTH,
    },
    {
      id: "education",
      label: "Formação preenchida",
      passed: draft.education.trim().length > 0,
    },
    {
      id: "experience-projects",
      label: "Experiências ou projetos preenchidos",
      passed: draft.experienceProjects.trim().length > 0,
    },
    {
      id: "skills",
      label: "Habilidades preenchidas",
      passed: draft.skills.trim().length > 0,
    },
  ];
  const sensitiveSignals = getSensitiveSignals(draft);
  const suggestions: string[] = [];

  if (!checks[0].passed) {
    suggestions.push("Adicione seu nome para identificar o currículo.");
  }

  if (!checks[1].passed) {
    suggestions.push("Inclua um e-mail que você acessa e consegue conferir.");
  }

  if (!checks[2].passed) {
    suggestions.push("Inclua um telefone de contato e confira os números.");
  }

  if (!checks[3].passed) {
    suggestions.push(
      `Desenvolva o objetivo profissional em pelo menos ${MINIMUM_OBJECTIVE_LENGTH} caracteres, dizendo que oportunidade você busca.`,
    );
  }

  if (!checks[4].passed) {
    suggestions.push("Preencha sua formação, curso ou escolaridade atual.");
  }

  if (!checks[5].passed) {
    suggestions.push(
      "Adicione uma experiência, projeto, voluntariado ou atividade prática.",
    );
  }

  if (!checks[6].passed) {
    suggestions.push("Liste habilidades concretas que você consegue explicar.");
  }

  if (sensitiveSignals.length > 0) {
    suggestions.push(
      `Revise e remova dados sensíveis ou desnecessários: ${sensitiveSignals.join(", ")}.`,
    );
  }

  if (suggestions.length === 0) {
    suggestions.push(
      "O rascunho passou pelas regras locais básicas. Faça uma leitura final com calma antes de compartilhar.",
    );
  }

  return {
    checks,
    suggestions,
    sensitiveSignals,
  };
}
