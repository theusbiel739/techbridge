import type {
  JourneyChapter,
  JourneyDefinition,
  JourneyMission,
  JourneyRoute,
  MissionId,
} from "./types";

export class JourneyDefinitionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JourneyDefinitionError";
  }
}

export function getOrderedChapters(
  definition: JourneyDefinition,
): JourneyChapter[] {
  return [...definition.chapters].sort(
    (left, right) => left.order - right.order,
  );
}

export function getJourneyMissionIds(
  definition: JourneyDefinition,
  routeCatalog: JourneyRoute[] = [],
): MissionId[] {
  const selectedRouteIds = new Set(definition.routeIds);
  const chapterMissionIds = getOrderedChapters(definition).flatMap(
    (chapter) => {
      const selectedChapterRoutes = routeCatalog.filter(
        (route) =>
          selectedRouteIds.has(route.id) && route.chapterId === chapter.id,
      );

      return selectedChapterRoutes.length > 0
        ? selectedChapterRoutes.flatMap(({ missionIds }) => missionIds)
        : chapter.missionIds;
    },
  );

  return definition.verticalSliceCheckpointMissionId
    ? [...chapterMissionIds, definition.verticalSliceCheckpointMissionId]
    : chapterMissionIds;
}

export function validateJourneyDefinition(
  definition: JourneyDefinition,
  missionCatalog: JourneyMission[],
  routeCatalog: JourneyRoute[] = [],
): void {
  const chapterIds = definition.chapters.map(({ id }) => id);
  const chapterOrders = definition.chapters.map(({ order }) => order);

  if (new Set(chapterIds).size !== chapterIds.length) {
    throw new JourneyDefinitionError(
      `Journey "${definition.id}" has duplicate chapter ids.`,
    );
  }

  if (new Set(chapterOrders).size !== chapterOrders.length) {
    throw new JourneyDefinitionError(
      `Journey "${definition.id}" has duplicate chapter orders.`,
    );
  }

  const allMappedMissionIds = [
    ...definition.chapters.flatMap(({ missionIds }) => missionIds),
    ...(definition.verticalSliceCheckpointMissionId
      ? [definition.verticalSliceCheckpointMissionId]
      : []),
  ];

  if (new Set(allMappedMissionIds).size !== allMappedMissionIds.length) {
    throw new JourneyDefinitionError(
      `Journey "${definition.id}" references the same mission more than once.`,
    );
  }

  const routesById = new Map(routeCatalog.map((route) => [route.id, route]));

  for (const routeId of definition.routeIds) {
    const route = routesById.get(routeId);

    if (!route) {
      throw new JourneyDefinitionError(
        `Route "${routeId}" is missing from journey "${definition.id}".`,
      );
    }

    const chapter = definition.chapters.find(
      ({ id }) => id === route.chapterId,
    );

    if (
      !chapter ||
      route.missionIds.some(
        (missionId) => !chapter.missionIds.includes(missionId),
      )
    ) {
      throw new JourneyDefinitionError(
        `Route "${route.id}" references missions outside its chapter.`,
      );
    }
  }

  const missionIds = getJourneyMissionIds(definition, routeCatalog);
  const catalogMissionIds = new Set(missionCatalog.map(({ id }) => id));

  if (catalogMissionIds.size !== missionCatalog.length) {
    throw new JourneyDefinitionError(
      `Journey "${definition.id}" catalog has duplicate mission ids.`,
    );
  }

  const missingMissionId = missionIds.find(
    (missionId) => !catalogMissionIds.has(missionId),
  );

  if (missingMissionId) {
    throw new JourneyDefinitionError(
      `Mission "${missingMissionId}" is missing from journey "${definition.id}" catalog.`,
    );
  }

  if (missionIds.length !== catalogMissionIds.size) {
    throw new JourneyDefinitionError(
      `Journey "${definition.id}" must assign every catalog mission once.`,
    );
  }
}

export function getJourneyMissions(
  definition: JourneyDefinition,
  missionCatalog: JourneyMission[],
  routeCatalog: JourneyRoute[] = [],
): JourneyMission[] {
  validateJourneyDefinition(definition, missionCatalog, routeCatalog);

  const missionsById = new Map<MissionId, JourneyMission>(
    missionCatalog.map((mission) => [mission.id, mission]),
  );

  return getJourneyMissionIds(definition, routeCatalog).map((missionId) => {
    const mission = missionsById.get(missionId);

    if (!mission) {
      throw new JourneyDefinitionError(
        `Mission "${missionId}" is missing from journey "${definition.id}" catalog.`,
      );
    }

    return mission;
  });
}
