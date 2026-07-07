import type { Project, StartupType } from '@/types/project'
import detailedProjects from '@/data/projects.json'
import additionalProjects from '@/data/projects-11-22.json'
import { PROJECT_LOGOS } from '@/data/logos'
import { getProjectLinkResources } from '@/data/projectLinks'

function getStartupType(projectId: string, originalType: string): StartupType {
  const logo = PROJECT_LOGOS[projectId] || ''
  if (logo.includes('GSS_')) return 'GSS'
  if (logo.includes('ESS_') || logo.includes('Ess_')) return 'ESS'
  if (originalType === 'Research Innovation') return 'Corporate'
  if (originalType === 'MSME') return 'GSS'
  return 'ESS'
}

export const projects: Project[] = ([...detailedProjects, ...additionalProjects] as any[]).map((project) => {
  const resolvedLogo = PROJECT_LOGOS[project.id] ?? project.logoUrl
  return {
    ...project,
    logoUrl: resolvedLogo,
    startupType: getStartupType(project.id, project.startupType),
    resources: [
      ...getProjectLinkResources(project.id),
      ...project.resources.filter((r: any) => r.type !== 'website'),
    ],
  }
})

export function getUniqueStates(projectsList: Project[]): string[] {
  return [...new Set(projectsList.map((p) => p.pilotLocation.state))].sort()
}

export function getUniqueDistricts(projectsList: Project[]): string[] {
  return [...new Set(projectsList.map((p) => `${p.pilotLocation.district}, ${p.pilotLocation.state}`))].sort()
}
