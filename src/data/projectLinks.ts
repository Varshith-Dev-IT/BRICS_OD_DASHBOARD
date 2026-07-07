import type { ProjectResource } from '@/types/project'

export interface ProjectLinks {
  website?: string
  odPage?: string
}

/** Company websites and Operation Dronagiri page URLs per project */
export const PROJECT_LINKS: Record<string, ProjectLinks> = {
  'proj-001': {},
  'proj-002': {
    website: 'https://www.weathercastsolutions.com',
    odPage: 'https://www.weathercastsolutions.com/operation-dronagiri',
  },
  'proj-003': {
    website: 'https://oxbowintellect.com',
    odPage: 'https://oxbowintellect.com/oxland-agri/',
  },
  'proj-004': {
    website: 'https://sparkyai.in',
    odPage: 'https://sparky-ai-operation-dronagiri.vercel.app/',
  },
  'proj-005': {
    website: 'https://encodenature.com',
    odPage: 'https://encodenature.com/dronagiri.html',
  },
  'proj-006': {
    website: 'https://www.geoinfy.com',
    odPage: 'https://www.geoinfy.com/dronagiri.html',
  },
  'proj-007': {
    website: 'https://www.viasalus.in',
    odPage: 'https://viasalus.in/products/OperationDronagiri.html',
  },
  'proj-008': {
    website: 'https://thazhal.in',
    odPage: 'https://thazhal.in/swoad-2-2/',
  },
  'proj-009': {
    website: 'https://www.terrastack.in',
    odPage: 'https://terrastack.in/operation-dronagiri',
  },
  'proj-010': {
    website: 'https://www.terraquauav.com',
  },
  'proj-011': {
    website: 'https://srajanai.com',
    odPage: 'https://srajanai.com/operation-dronagiri',
  },
  'proj-012': {
    website: 'https://scanxt.com',
  },
  'proj-013': {
    website: 'https://www.qhills.com',
    odPage: 'https://www.qhills.com/operation',
  },
  'proj-014': {
    website: 'https://polygongeo.com',
    odPage: 'https://polygongeo.com/OperationDronagiri.html',
  },
  'proj-015': {
    website: 'https://navariti.com',
    odPage: 'https://heliot.ai/OPR_DRO.html',
  },
  'proj-016': {
    website: 'https://www.krishimandi.in',
  },
  'proj-017': {
    website: 'https://www.eelabagro.com',
    odPage: 'https://eelabcarbon.com/dronagiri.php',
  },
  'proj-018': {
    website: 'https://www.kisanrover.com',
  },
  'proj-019': {
    website: 'https://cultyvate.com',
  },
  'proj-020': {
    website: 'https://www.cropgenapp.com',
    odPage: 'https://www.cropgenapp.com/projects/operation-dronagiri',
  },
  'proj-021': {
    website: 'https://www.bhoomicam.com',
    odPage: 'https://www.bhoomicam.com/operation_dronagiri',
  },
  'proj-022': {
    website: 'https://addble.com',
    odPage: 'https://addble.com/operation-dronagiri',
  },
}

export function getProjectLinkResources(projectId: string): ProjectResource[] {
  const links = PROJECT_LINKS[projectId] ?? {}

  return [
    links.website
      ? { type: 'website', url: links.website, title: 'Company Website' }
      : { type: 'website', url: '#', title: 'Company Website', comingSoon: true },
    links.odPage
      ? { type: 'website', url: links.odPage, title: 'Operation Dronagiri Page' }
      : { type: 'website', url: '#', title: 'Operation Dronagiri Page', comingSoon: true },
  ]
}
