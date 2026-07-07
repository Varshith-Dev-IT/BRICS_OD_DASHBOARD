export type Sector =
  | 'Agriculture'
  | 'Transportation & Infrastructure'
  | 'Livelihood & Skilling'

export type StartupType = 'Startup' | 'MSME' | 'Research Innovation'

export interface PilotLocation {
  district: string
  state: string
  lat: number
  lng: number
}

export interface KeyFeature {
  icon: string
  name: string
  description: string
}

export interface ProjectMetric {
  label: string
  value: string
  type: 'progress' | 'stat'
  progress?: number
}

export interface ProjectResource {
  type: 'website' | 'demo' | 'image' | 'document'
  url: string
  title: string
}

export interface Project {
  id: string
  startupName: string
  projectName: string
  sector: Sector
  startupType: StartupType
  pilotLocation: PilotLocation
  trl: number
  sdgs: number[]
  shortDescription: string
  logoUrl?: string
  technologies: string[]
  overview: string
  problemStatement: string
  solution: string
  targetUsers: string[]
  keyFeatures: KeyFeature[]
  valueProposition: string
  environmentalImpact: string[]
  socialImpact: string[]
  metrics: ProjectMetric[]
  resources: ProjectResource[]
  expansionPlan: string
  currentLocation: string
}

export interface FilterState {
  sectors: Sector[]
  startupTypes: StartupType[]
  pilotLocation: string
  sdgs: number[]
  trlLevels: number[]
  search: string
}

export interface KPIData {
  totalProjects: number
  startups: number
  trlAbove6: number
  pilotStates: number
  sdgsCovered: number
  sectors: number
}

export const SDG_INFO: Record<number, { title: string; color: string }> = {
  1: { title: 'No Poverty', color: '#E5243B' },
  2: { title: 'Zero Hunger', color: '#DDA63A' },
  3: { title: 'Good Health & Well-being', color: '#4C9F38' },
  5: { title: 'Gender Equality', color: '#FF3A21' },
  6: { title: 'Clean Water & Sanitation', color: '#26BDE2' },
  7: { title: 'Affordable & Clean Energy', color: '#FCC30B' },
  8: { title: 'Decent Work & Economic Growth', color: '#A21942' },
  9: { title: 'Industry, Innovation & Infrastructure', color: '#FD6925' },
  10: { title: 'Reduced Inequalities', color: '#DD1367' },
  11: { title: 'Sustainable Cities & Communities', color: '#FD9D24' },
  12: { title: 'Responsible Consumption & Production', color: '#BF8B2E' },
  13: { title: 'Climate Action', color: '#3F7E44' },
  15: { title: 'Life on Land', color: '#56C02B' },
  17: { title: 'Partnerships for the Goals', color: '#19486A' },
}

export const SECTOR_COLORS: Record<Sector, string> = {
  Agriculture: '#138808',
  'Transportation & Infrastructure': '#0B3D91',
  'Livelihood & Skilling': '#FF6B00',
}

export const KPI_DATA: KPIData = {
  totalProjects: 22,
  startups: 22,
  trlAbove6: 13,
  pilotStates: 5,
  sdgsCovered: 13,
  sectors: 3,
}
