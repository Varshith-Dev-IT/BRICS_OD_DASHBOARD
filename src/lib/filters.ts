import type { FilterState, Project } from '@/types/project'

export function filterProjects(projects: Project[], filters: FilterState): Project[] {
  return projects.filter((project) => {
    if (filters.sectors.length > 0 && !filters.sectors.includes(project.sector)) {
      return false
    }

    if (filters.startupTypes.length > 0 && !filters.startupTypes.includes(project.startupType)) {
      return false
    }

    if (filters.pilotLocation) {
      const locationStr = `${project.pilotLocation.district}, ${project.pilotLocation.state}`
      if (!locationStr.toLowerCase().includes(filters.pilotLocation.toLowerCase())) {
        return false
      }
    }

    if (filters.sdgs.length > 0 && !filters.sdgs.some((sdg) => project.sdgs.includes(sdg))) {
      return false
    }

    if (filters.trlLevels.length > 0 && !filters.trlLevels.includes(project.trl)) {
      return false
    }

    if (filters.search) {
      const query = filters.search.toLowerCase()
      const searchable = [
        project.startupName,
        project.projectName,
        project.sector,
        project.shortDescription,
        project.pilotLocation.district,
        project.pilotLocation.state,
        ...project.technologies,
      ]
        .join(' ')
        .toLowerCase()

      if (!searchable.includes(query)) {
        return false
      }
    }

    return true
  })
}

export function getSectorCounts(projects: Project[]) {
  const counts: Record<string, number> = {}
  projects.forEach((p) => {
    counts[p.sector] = (counts[p.sector] || 0) + 1
  })
  return Object.entries(counts).map(([name, value]) => ({ name, value }))
}

export function getTRLCounts(projects: Project[]) {
  const counts: Record<number, number> = {}
  for (let i = 1; i <= 9; i++) counts[i] = 0
  projects.forEach((p) => {
    counts[p.trl] = (counts[p.trl] || 0) + 1
  })
  return Object.entries(counts).map(([trl, count]) => ({
    trl: `TRL ${trl}`,
    count,
  }))
}

export function getSDGCoverage(projects: Project[]) {
  const counts: Record<number, number> = {}
  projects.forEach((p) => {
    p.sdgs.forEach((sdg) => {
      counts[sdg] = (counts[sdg] || 0) + 1
    })
  })
  return Object.entries(counts)
    .map(([sdg, count]) => ({ sdg: `SDG ${sdg}`, count }))
    .sort((a, b) => b.count - a.count)
}

export function getStateDeployment(projects: Project[]) {
  const counts: Record<string, number> = {}
  projects.forEach((p) => {
    counts[p.pilotLocation.state] = (counts[p.pilotLocation.state] || 0) + 1
  })
  return Object.entries(counts)
    .map(([state, count]) => ({ state, count }))
    .sort((a, b) => b.count - a.count)
}

export function getTechnologyDistribution(projects: Project[]) {
  const counts: Record<string, number> = {}
  projects.forEach((p) => {
    p.technologies.forEach((tech) => {
      counts[tech] = (counts[tech] || 0) + 1
    })
  })
  return Object.entries(counts)
    .map(([name, size]) => ({ name, size }))
    .sort((a, b) => b.size - a.size)
}
