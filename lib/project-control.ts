/** Project Control Board v0.1: data contracts only, no persistence or UI. */
export const PROJECT_STATUSES = ["planning", "active", "blocked", "paused", "completed", "archived"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export type EvidenceKind = "repository" | "document" | "conversation" | "external" | "other";
export type EvidenceReference = {
  id: string;
  kind: EvidenceKind;
  label: string;
  uri?: string;
  note?: string;
};
export type ProjectDecision = {
  summary: string;
  decidedAt: string; // ISO 8601 date or timestamp
  rationale?: string;
  evidenceIds: string[];
};
export type ProjectBlocker = {
  description: string;
  identifiedAt: string;
  owner?: string;
  resolutionCriteria?: string;
};
export type ProjectNextAction = {
  description: string;
  owner?: string;
  dueDate?: string; // YYYY-MM-DD
  completionCriteria: string;
};
export type ControlProject = {
  id: string;
  name: string;
  status: ProjectStatus;
  description?: string;
  createdAt: string;
  updatedAt: string;
  lastDecision: ProjectDecision | null;
  currentBlocker: ProjectBlocker | null;
  nextAction: ProjectNextAction | null;
  evidence: EvidenceReference[];
};
export type ProjectRegistry = {
  schemaVersion: 1;
  projects: ControlProject[];
};
export const emptyProjectRegistry = (): ProjectRegistry => ({ schemaVersion: 1, projects: [] });
