import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { ArrowLeft, MapPin } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProjectDetail } from '@/components/project/ProjectDetail'
import { StartupLogo } from '@/components/project/StartupLogo'
import { projects } from '@/data'
import { cn } from '@/lib/utils'

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4" style={{ backgroundColor: '#f7f4ef' }}>
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f4ef' }}>
      <header className="gradient-hero px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
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
            className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6"
          >
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white p-3 shadow-soft sm:h-28 sm:w-28 sm:p-4">
              <StartupLogo
                startupName={project.startupName}
                sector={project.sector}
                logoUrl={project.logoUrl}
                size="lg"
                className="h-full w-full max-h-20 max-w-full sm:max-h-24"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-saffron-400 sm:text-sm">
                {project.startupName}
              </p>
              <h1 className="mt-2 font-display text-xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                {project.projectName}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-4 sm:gap-3">
                <Badge
                  className={cn(
                    "text-[10px] sm:text-xs border-transparent text-white font-bold",
                    project.sector === 'Agriculture' && "bg-emerald-600 hover:bg-emerald-600",
                    project.sector === 'Transportation & Infrastructure' && "bg-blue-600 hover:bg-blue-600",
                    project.sector === 'Livelihood & Skilling' && "bg-saffron-500 hover:bg-saffron-500"
                  )}
                >
                  {project.sector}
                </Badge>
                <Badge className="bg-violet-600 hover:bg-violet-600 border-transparent text-white font-bold text-[10px] sm:text-xs">
                  TRL {project.trl}
                </Badge>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-white sm:text-xs">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-white" />
                  {project.pilotLocation.district}, {project.pilotLocation.state}
                </span>
              </div>


              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70 sm:mt-4 sm:text-base">
                {project.shortDescription}
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8">
        <ProjectDetail project={project} variant="page" />
      </div>


    </div>
  )
}
