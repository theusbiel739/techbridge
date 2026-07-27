import { describe, expect, it } from "vitest";
import {
  getJourneyMissions,
  getOrderedChapters,
  validateJourneyDefinition,
} from "./journeyDefinition";
import {
  firstOpportunityJourney,
  firstOpportunityMissions,
  firstOpportunityRoute,
} from "../journeys/first-opportunity/definition";

describe("journey definition", () => {
  it("validates the canonical vertical slice", () => {
    expect(() =>
      validateJourneyDefinition(
        firstOpportunityJourney,
        firstOpportunityMissions,
        [firstOpportunityRoute],
      ),
    ).not.toThrow();
  });

  it("orders all canonical chapters and keeps empty chapters", () => {
    const chapters = getOrderedChapters(firstOpportunityJourney);

    expect(chapters.map(({ order }) => order)).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8,
    ]);
    expect(
      chapters.filter(({ missionIds }) => missionIds.length === 0),
    ).toHaveLength(7);
    expect(
      chapters.map(({ id, title }) => ({ id, title })),
    ).toEqual([
      {
        id: "prologue-choose-destination",
        title: "Prólogo — Escolher o Destino",
      },
      {
        id: "chapter-1-light-the-bridge",
        title: "Capítulo 1 — Acender a Ponte",
      },
      {
        id: "chapter-2-find-the-path",
        title: "Capítulo 2 — Encontrar o Caminho",
      },
      {
        id: "chapter-3-create-connections",
        title: "Capítulo 3 — Criar Conexões",
      },
      {
        id: "chapter-4-digital-shield",
        title: "Capítulo 4 — Escudo Digital",
      },
      {
        id: "chapter-5-build-and-produce",
        title: "Capítulo 5 — Construir e Produzir",
      },
      {
        id: "chapter-6-intelligence-with-purpose",
        title: "Capítulo 6 — Inteligência com Propósito",
      },
      {
        id: "chapter-7-goal-in-action",
        title: "Capítulo 7 — Objetivo em Ação",
      },
      {
        id: "chapter-8-digital-autonomy",
        title: "Capítulo 8 — Autonomia Digital",
      },
    ]);
  });

  it("orders missions by chapter and appends the vertical slice checkpoint", () => {
    expect(
      getJourneyMissions(
        firstOpportunityJourney,
        firstOpportunityMissions,
        [firstOpportunityRoute],
      ).map(({ id }) => id),
    ).toEqual([
      "professional-email",
      "send-attachments",
      "build-first-resume",
      "review-resume",
      "complete-first-crossing",
    ]);
  });

  it("selects only the missions from the active route inside a chapter", () => {
    const alternativeRoute = {
      id: "alternative-route" as const,
      chapterId: "chapter-7-goal-in-action" as const,
      title: "Alternative",
      missionIds: ["review-resume" as const],
    };
    const alternativeJourney = {
      ...firstOpportunityJourney,
      routeIds: [alternativeRoute.id],
    };
    const alternativeCatalog = firstOpportunityMissions.filter(
      ({ id }) => id !== "build-first-resume",
    );

    expect(
      getJourneyMissions(
        alternativeJourney,
        alternativeCatalog,
        [alternativeRoute],
      ).map(({ id }) => id),
    ).toEqual([
      "professional-email",
      "send-attachments",
      "review-resume",
      "complete-first-crossing",
    ]);
  });

  it("rejects a mission mapped more than once", () => {
    const duplicateDefinition = {
      ...firstOpportunityJourney,
      chapters: firstOpportunityJourney.chapters.map((chapter) =>
        chapter.id === "chapter-7-goal-in-action"
          ? {
              ...chapter,
              missionIds: [...chapter.missionIds, "professional-email" as const],
            }
          : chapter,
      ),
    };

    expect(() =>
      validateJourneyDefinition(
        duplicateDefinition,
        firstOpportunityMissions,
        [firstOpportunityRoute],
      ),
    ).toThrow(/same mission more than once/);
  });

  it("rejects a mission referenced outside the catalog", () => {
    const incompleteCatalog = firstOpportunityMissions.filter(
      ({ id }) => id !== "send-attachments",
    );

    expect(() =>
      validateJourneyDefinition(
        firstOpportunityJourney,
        incompleteCatalog,
        [firstOpportunityRoute],
      ),
    ).toThrow(/send-attachments.*missing/);
  });
});
