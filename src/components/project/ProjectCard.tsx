import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SDGBadges } from '@/components/project/SDGBadges'
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
      <Card className="flex h-full min-h-[320px] flex-col overflow-hidden transition-all duration-300 sm:min-h-[380px] sm:hover:-translate-y-1 sm:hover:shadow-glow">
        <CardHeader className="shrink-0 space-y-0 p-4 pb-3 sm:p-5">
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:text-xs">
                {project.startupName}
              </p>
              <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug text-slate-900 sm:min-h-[2.75rem] sm:text-base">
                {project.projectName}
              </h3>
            </div>
            <Badge variant="trl" className="shrink-0 text-[10px] sm:text-xs">
              TRL {project.trl}
            </Badge>
          </div>

          <div className="mt-3 flex min-h-[1.75rem] flex-col items-start gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
            <Badge
              variant={getSectorBadgeVariant(project.sector)}
              className="max-w-full truncate text-[10px] sm:text-xs"
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
        </CardHeader>

        <CardContent className="flex flex-1 flex-col p-4 pt-0 sm:p-5">
          <div className="mb-3 min-h-[1.75rem] sm:min-h-[2rem]">
            <SDGBadges sdgs={project.sdgs} />
          </div>

          <p className="mb-4 line-clamp-3 min-h-[3.75rem] flex-1 text-sm leading-relaxed text-slate-600 sm:line-clamp-4 sm:min-h-[5rem]">
            {project.shortDescription}
          </p>

          <Button asChild className="mt-auto h-11 w-full shrink-0 sm:h-10">
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
