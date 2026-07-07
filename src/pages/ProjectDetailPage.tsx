import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { ArrowLeft, MapPin } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProjectDetail } from '@/components/project/ProjectDetail'
import { SDGBadges } from '@/components/project/SDGBadges'
import { projects } from '@/data'
import { SECTOR_COLORS } from '@/types/project'

function getSectorBadgeVariant(sector: (typeof projects)[0]['sector']) {
  switch (sector) {
    case 'Agriculture':
      return 'agriculture' as const
    case 'Transportation & Infrastructure':
      return 'transport' as const
    case 'Livelihood & Skilling':
      return 'livelihood' as const
  }
}

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Project Not Found</h1>
        <p className="mt-2 text-center text-sm text-slate-500 sm:text-base">
          The requested project does not exist.
        </p>
        <Button className="mt-6 h-11 w-full max-w-xs" onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    )
  }

  const sectorColor = SECTOR_COLORS[project.sector]

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="gradient-hero px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white sm:mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-saffron-400 sm:text-sm">
              {project.startupName}
            </p>
            <h1 className="mt-2 font-display text-xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              {project.projectName}
            </h1>

            <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant={getSectorBadgeVariant(project.sector)} className="text-[10px] sm:text-xs">
                  {project.sector}
                </Badge>
                <Badge variant="trl" className="text-[10px] sm:text-xs">
                  TRL {project.trl}
                </Badge>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-white/80 sm:text-sm">
                <MapPin className="h-4 w-4 shrink-0" style={{ color: sectorColor }} />
                {project.pilotLocation.district}, {project.pilotLocation.state}
              </span>
            </div>

            <div className="mt-3 sm:mt-4">
              <SDGBadges sdgs={project.sdgs} size="md" />
            </div>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70 sm:mt-4 sm:text-base">
              {project.shortDescription}
            </p>
          </motion.div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-xl bg-white shadow-soft"
        >
          <ProjectDetail project={project} variant="page" />
        </motion.div>
      </main>

      <footer className="bg-white px-3 py-5 sm:py-6">
        <div className="mx-auto max-w-5xl text-center sm:px-6 lg:px-8">
          <Button variant="outline" className="h-11 w-full sm:h-10 sm:w-auto" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" />
            Return to All Projects
          </Button>
        </div>
      </footer>
    </div>
  )
}
