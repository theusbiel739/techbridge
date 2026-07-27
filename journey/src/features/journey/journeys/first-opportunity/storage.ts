import type { InitialJourneyState } from "../../domain/types";
import {
  clearPersistedJourneyState,
  createInitialJourneyState,
  loadPersistedJourneyState,
  savePersistedJourneyState,
  type JourneyPersistenceContext,
} from "../../persistence/journeyStorage";
import { firstOpportunityRuntime } from "./definition";

export const firstOpportunityPersistenceContext: JourneyPersistenceContext = {
  storageKey: "techbridge:journey:initial-state",
  runtime: firstOpportunityRuntime,
};

export { createInitialJourneyState };

export function loadJourneyState(): InitialJourneyState {
  return loadPersistedJourneyState(firstOpportunityPersistenceContext);
}

export function saveJourneyState(state: InitialJourneyState): boolean {
  return savePersistedJourneyState(firstOpportunityPersistenceContext, state);
}

export function clearJourneyState(): boolean {
  return clearPersistedJourneyState(firstOpportunityPersistenceContext);
}
