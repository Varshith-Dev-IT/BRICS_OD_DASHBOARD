import type { Project } from '@/types/project'
import detailedProjects from '@/data/projects.json'
import additionalProjects from '@/data/projects-11-22.json'
import { PROJECT_LOGOS } from '@/data/logos'

export const projects: Project[] = ([...detailedProjects, ...additionalProjects] as Project[]).map((project) => ({
  ...project,
  logoUrl: PROJECT_LOGOS[project.id] ?? project.logoUrl,
}))

export function getUniqueStates(projectsList: Project[]): string[] {
  return [...new Set(projectsList.map((p) => p.pilotLocation.state))].sort()
}

export function getUniqueDistricts(projectsList: Project[]): string[] {
  return [...new Set(projectsList.map((p) => `${p.pilotLocation.district}, ${p.pilotLocation.state}`))].sort()
}
