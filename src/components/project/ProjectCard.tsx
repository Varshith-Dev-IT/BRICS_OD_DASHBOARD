import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { StartupLogo } from '@/components/project/StartupLogo'
import type { Project } from '@/types/project'
import { SECTOR_COLORS } from '@/types/project'

interface ProjectCardProps {
  project: Project
  index: number
}

function getSectorBadgeVariant(sector: Project['sector']) {
  switch (sector) {
    case 'Agriculture':
      return 'agriculture' as const
    case 'Transportation & Infrastructure':
      return 'transport' as const
    case 'Livelihood & Skilling':
      return 'livelihood' as const
  }
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const sectorColor = SECTOR_COLORS[project.sector]

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300">
        {/* Logo area */}
        <div className="flex h-24 shrink-0 items-center justify-center border-b border-slate-100 bg-white px-4 sm:h-28">
          <StartupLogo
            startupName={project.startupName}
            sector={project.sector}
            logoUrl={project.logoUrl}
            size="lg"
          />
        </div>

        <CardContent className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="mb-2 flex items-start justify-between gap-2">
            <p className="line-clamp-2 min-w-0 flex-1 break-words text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:text-xs">
              {project.startupName}
            </p>
            <Badge variant="trl" className="shrink-0 text-[10px] sm:text-xs">
              TRL {project.trl}
            </Badge>
          </div>

          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug text-slate-900 sm:min-h-[3rem] sm:text-base">
            {project.projectName}
          </h3>

          <div className="mt-2 flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
            <Badge
              variant={getSectorBadgeVariant(project.sector)}
              className="w-fit max-w-full truncate text-[10px] sm:text-xs"
            >
              {project.sector}
            </Badge>
            <span className="inline-flex max-w-full items-center gap-1 text-[11px] text-slate-500 sm:text-xs">
              <MapPin className="h-3 w-3 shrink-0" style={{ color: sectorColor }} />
              <span className="truncate">
                {project.pilotLocation.district}, {project.pilotLocation.state}
              </span>
            </span>
          </div>

          <div className="flex-1">
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
              {project.shortDescription}
            </p>
          </div>

          <Button asChild className="mt-4 h-11 w-full shrink-0 sm:mt-5 sm:h-10">
            <Link to={`/project/${project.id}`}>
              View Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
