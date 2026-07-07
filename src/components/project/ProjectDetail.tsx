import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  ExternalLink,
  FileText,
  Globe,
  Image,
  Leaf,
  Play,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { IndiaMap } from '@/components/project/IndiaMap'
import { SDGBadges } from '@/components/project/SDGBadges'
import { TRLIndicator } from '@/components/project/TRLIndicator'
import { getFeatureIcon } from '@/components/project/iconMap'
import type { Project } from '@/types/project'
import { SECTOR_COLORS } from '@/types/project'

interface ProjectDetailProps {
  project: Project
  variant?: 'accordion' | 'page'
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-navy-700">
      {children}
    </h4>
  )
}

function ResourceCard({ type, url, title }: { type: string; url: string; title: string }) {
  const icons = {
    website: Globe,
    demo: Play,
    image: Image,
    document: FileText,
  }
  const Icon = icons[type as keyof typeof icons] || Globe

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 shadow-sm transition-all hover:bg-slate-100 hover:shadow-soft"
    >
      <div className="rounded-lg bg-navy-50 p-2">
        <Icon className="h-4 w-4 text-navy-700" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-800">{title}</p>
        <p className="text-xs capitalize text-slate-500">{type}</p>
      </div>
      <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
    </a>
  )
}

export function ProjectDetail({ project, variant = 'accordion' }: ProjectDetailProps) {
  const sectorColor = SECTOR_COLORS[project.sector]

  const content = (
    <div className={`space-y-5 p-4 sm:space-y-6 sm:p-5 lg:p-6 ${variant === 'accordion' ? 'border-t border-slate-100 bg-slate-50/50' : ''}`}>
        {/* Project Overview */}
        <section>
          <SectionTitle>Project Overview</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Startup', value: project.startupName },
              { label: 'Project', value: project.projectName },
              { label: 'Sector', value: project.sector },
              { label: 'Pilot District', value: `${project.pilotLocation.district}, ${project.pilotLocation.state}` },
              { label: 'TRL', value: `TRL ${project.trl}` },
              { label: 'Current Location', value: project.currentLocation },
              { label: 'Expansion Plan', value: project.expansionPlan, fullWidth: true },
            ].map((item) => (
              <div
                key={item.label}
                className={cn(
                  'rounded-lg bg-white p-3 shadow-sm',
                  item.fullWidth && 'sm:col-span-2 lg:col-span-3'
                )}
              >
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="mt-0.5 text-sm font-medium text-slate-800">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{project.overview}</p>
        </section>

        <Separator />

        {/* Problem Statement */}
        <section>
          <SectionTitle>Problem Statement</SectionTitle>
          <div className="rounded-xl border-l-4 border-saffron-500 bg-saffron-50/50 p-4">
            <p className="text-sm leading-relaxed text-slate-700">{project.problemStatement}</p>
          </div>
        </section>

        {/* Solution */}
        <section>
          <SectionTitle>Solution</SectionTitle>
          <p className="text-sm leading-relaxed text-slate-700">{project.solution}</p>
        </section>

        {/* Technologies */}
        <section>
          <SectionTitle>Technologies Used</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        {/* Target Users */}
        <section>
          <SectionTitle>Target Users</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {project.targetUsers.map((user) => (
              <span
                key={user}
                className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1.5 text-xs font-medium text-navy-800"
              >
                <Users className="h-3 w-3" />
                {user}
              </span>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section>
          <SectionTitle>Key Features</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {project.keyFeatures.map((feature) => {
              const Icon = getFeatureIcon(feature.icon)
              return (
                <div
                  key={feature.name}
                  className="flex gap-3 rounded-xl bg-slate-50 p-3 shadow-sm transition-shadow sm:p-4 sm:hover:shadow-soft"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${sectorColor}15` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: sectorColor }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{feature.name}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Value Proposition */}
        <section>
          <SectionTitle>Value Proposition</SectionTitle>
          <p className="rounded-lg bg-navy-50 p-4 text-sm leading-relaxed text-navy-900">
            {project.valueProposition}
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side: Map */}
          <div className="flex h-full flex-col">
            {/* India Map */}
            <section className="flex flex-1 flex-col">
              <SectionTitle>India Map — Pilot Deployment</SectionTitle>
              <IndiaMap project={project} />
            </section>
          </div>

          {/* Right Side: TRL, Impact, SDGs, and Resources */}
          <div className="space-y-6">
            {/* TRL Visualization */}
            <section>
              <TRLIndicator trl={project.trl} />
            </section>

            {/* Impact */}
            <section>
              <SectionTitle>Impact</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-emerald-50/80 p-3 sm:p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-emerald-600" />
                    <h5 className="font-semibold text-emerald-800">Environmental Impact</h5>
                  </div>
                  <ul className="space-y-1.5">
                    {project.environmentalImpact.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-blue-50/80 p-3 sm:p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <h5 className="font-semibold text-blue-800">Social Impact</h5>
                  </div>
                  <ul className="space-y-1.5">
                    {project.socialImpact.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-blue-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* SDGs */}
            <section>
              <SectionTitle>SDGs</SectionTitle>
              <SDGBadges sdgs={project.sdgs} size="md" />
            </section>

            {/* Resources */}
            <section>
              <SectionTitle>Resources</SectionTitle>
              <div className="grid gap-3 sm:grid-cols-2">
                {project.resources
                  .filter((r) => r.type === 'website')
                  .map((resource) => (
                    <ResourceCard key={resource.title} {...resource} />
                  ))}
                <ResourceCard
                  type="website"
                  url="https://dronagiri.gov.in"
                  title="Operation Dronagiri Page"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
  )

  if (variant === 'page') {
    return content
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="overflow-hidden"
    >
      {content}
    </motion.div>
  )
}
