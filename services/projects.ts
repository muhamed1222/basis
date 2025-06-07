import { fetchJson } from './api';
import { z } from 'zod';

export interface Project {
  id: string;
  title: string;
  lastUpdated: string;
  archived?: boolean;
}

const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  lastUpdated: z.string(),
  archived: z.boolean().optional(),
});

const ProjectListSchema = z.array(ProjectSchema);

export async function getProjects(): Promise<Project[]> {
  return fetchJson('/api/projects', ProjectListSchema);
}

export async function deleteProject(id: string): Promise<void> {
  await fetchJson(`/api/projects/${id}`, z.any(), { method: 'DELETE' });
}

export async function archiveProject(id: string): Promise<void> {
  await fetchJson(`/api/projects/${id}/archive`, z.any(), { method: 'POST' });
}

export async function cloneProject(id: string): Promise<Project> {
  return fetchJson(`/api/projects/${id}/clone`, ProjectSchema, { method: 'POST' });
}
