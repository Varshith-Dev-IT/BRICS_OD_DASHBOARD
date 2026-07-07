import type { Project, Sector, StartupType } from '@/types/project'
import detailedProjects from '@/data/projects.json'

const STARTUP_TYPES: StartupType[] = ['Startup', 'MSME', 'Research Innovation']

const EXTRA_LOCATIONS = [
  { district: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  { district: 'Bengaluru Urban', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
  { district: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
  { district: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
  { district: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
  { district: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lng: 77.4126 },
  { district: 'Patna', state: 'Bihar', lat: 25.5941, lng: 85.1376 },
  { district: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462 },
  { district: 'Thiruvananthapuram', state: 'Kerala', lat: 8.5241, lng: 76.9366 },
  { district: 'Ranchi', state: 'Jharkhand', lat: 23.3441, lng: 85.3096 },
  { district: 'Dehradun', state: 'Uttarakhand', lat: 30.3165, lng: 78.0322 },
  { district: 'Shimla', state: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734 },
  { district: 'Guwahati', state: 'Assam', lat: 26.1445, lng: 91.7362 },
  { district: 'Raipur', state: 'Chhattisgarh', lat: 21.2514, lng: 81.6296 },
]

const STARTUP_NAMES = [
  'AgriNova Tech', 'GreenPulse Systems', 'RuralConnect AI', 'InfraSense Labs',
  'CropVision Analytics', 'MobilityFirst India', 'SkillBridge Tech', 'EcoHarvest Solutions',
  'DataFarm Intelligence', 'TransitAI India', 'VillageNet Systems', 'AquaSense Tech',
  'TerraScan Solutions', 'PowerGrid Innovations', 'HarvestLink Platform', 'RoadSense Analytics',
  'AgriChain Systems', 'WorkForce Geo', 'ClimateFarm Tech', 'SmartIrrigate Labs',
  'LogiTrack India', 'RuralSkill Hub', 'SatYield Analytics', 'GreenTransit Co',
  'Farm2Market AI', 'InfraBuild Tech', 'SkillMap India', 'AgroDrone Systems',
  'WaterWise Analytics', 'EVCharge Network', 'CropGuard AI', 'GeoSkill Platform',
  'PulseAgri Systems', 'CleanMove Labs', 'RuralJobs Connect', 'SoilSense Tech',
]

const PROJECT_TEMPLATES = [
  { name: 'Precision Agriculture Platform', sector: 'Agriculture' as Sector, tech: ['AI', 'ML', 'IoT', 'GIS'] },
  { name: 'Smart Irrigation Management System', sector: 'Agriculture' as Sector, tech: ['IoT', 'ML', 'Satellite Imagery'] },
  { name: 'EV Fleet Management Solution', sector: 'Transportation & Infrastructure' as Sector, tech: ['AI', 'IoT', 'Predictive Analytics'] },
  { name: 'Rural Skill Mapping Platform', sector: 'Livelihood & Skilling' as Sector, tech: ['GIS', 'GeoAI', 'Mobile GIS'] },
  { name: 'Crop Disease Detection System', sector: 'Agriculture' as Sector, tech: ['AI', 'Satellite Imagery', 'Drone Data'] },
  { name: 'Smart Charging Infrastructure', sector: 'Transportation & Infrastructure' as Sector, tech: ['IoT', 'AI', 'NAVIC'] },
  { name: 'Geo-tagged Employment Portal', sector: 'Livelihood & Skilling' as Sector, tech: ['GIS', 'PostGIS', 'React'] },
  { name: 'Soil Health Monitoring Platform', sector: 'Agriculture' as Sector, tech: ['IoT', 'ML', 'GIS'] },
]

function generateAdditionalProjects(count: number): Project[] {
  const projects: Project[] = []

  for (let i = 0; i < count; i++) {
    const template = PROJECT_TEMPLATES[i % PROJECT_TEMPLATES.length]
    const location = EXTRA_LOCATIONS[i % EXTRA_LOCATIONS.length]
    const startupType = STARTUP_TYPES[i % STARTUP_TYPES.length]
    const trl = (i % 9) + 1
    const sdgPool = [1, 2, 6, 7, 8, 9, 10, 11, 12, 13, 15, 17]
    const sdgs = sdgPool.filter((_, idx) => idx % 3 === i % 3 || idx === i % 12).slice(0, 4)

    projects.push({
      id: `proj-gen-${String(i + 7).padStart(3, '0')}`,
      startupName: STARTUP_NAMES[i % STARTUP_NAMES.length],
      projectName: template.name,
      sector: template.sector,
      startupType,
      pilotLocation: location,
      trl,
      sdgs: sdgs.length ? sdgs : [9],
      shortDescription: `Innovative ${template.sector.toLowerCase()} solution leveraging ${template.tech.slice(0, 2).join(' and ')} for rural and semi-urban India.`,
      technologies: template.tech,
      overview: `A ${template.sector} innovation project deploying ${template.tech.join(', ')} to address critical challenges in ${location.district}, ${location.state}.`,
      problemStatement: `Local communities in ${location.district} face systemic challenges in ${template.sector.toLowerCase()} that require technology-driven interventions.`,
      solution: `Deploying an integrated platform using ${template.tech.join(', ')} to deliver measurable outcomes for stakeholders.`,
      targetUsers: ['Local Communities', 'Government Agencies', 'Industry Partners'],
      keyFeatures: [
        { icon: 'Zap', name: 'Core Platform', description: 'Primary technology platform for the pilot deployment.' },
        { icon: 'BarChart3', name: 'Analytics Dashboard', description: 'Real-time monitoring and reporting capabilities.' },
        { icon: 'Users', name: 'User Management', description: 'Multi-stakeholder access and role-based controls.' },
      ],
      valueProposition: `Delivering scalable ${template.sector.toLowerCase()} solutions for India's innovation ecosystem.`,
      environmentalImpact: ['Sustainable Development', 'Resource Optimization'],
      socialImpact: ['Community Empowerment', 'Digital Inclusion'],
      metrics: [
        { label: 'Pilot Coverage', value: `${(i + 1) * 500} users`, type: 'stat' },
        { label: 'Efficiency Gain', value: `${10 + (i % 20)}%`, type: 'progress', progress: 10 + (i % 20) },
      ],
      resources: [
        { type: 'website', url: '#', title: 'Project Website' },
        { type: 'document', url: '#', title: 'Project Brief' },
      ],
      expansionPlan: `Expand to adjacent districts in ${location.state} and neighboring states.`,
      currentLocation: `${location.district}, ${location.state}`,
    })
  }

  return projects
}

export const projects: Project[] = [
  ...(detailedProjects as Project[]),
  ...generateAdditionalProjects(36),
]

export function getUniqueStates(projectsList: Project[]): string[] {
  return [...new Set(projectsList.map((p) => p.pilotLocation.state))].sort()
}

export function getUniqueDistricts(projectsList: Project[]): string[] {
  return [...new Set(projectsList.map((p) => `${p.pilotLocation.district}, ${p.pilotLocation.state}`))].sort()
}
