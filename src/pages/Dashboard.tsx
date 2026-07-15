import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { HeroSection } from '@/components/dashboard/HeroSection'
import { ProjectCard } from '@/components/project/ProjectCard'
import { projects } from '@/data'
import { SECTOR_COLORS, type Sector } from '@/types/project'

const SECTION_TITLE = 'font-display text-lg font-bold text-slate-900 sm:text-xl'

export function Dashboard() {
  const [selectedSectors, setSelectedSectors] = useState<Sector[]>([])

  const filteredProjects = useMemo(() => {
    if (selectedSectors.length === 0) return projects
    return projects.filter(p => selectedSectors.includes(p.sector))
  }, [selectedSectors])

  const toggleSector = (sector: Sector) => {
    setSelectedSectors(prev => 
      prev.includes(sector) 
        ? prev.filter(s => s !== sector) 
        : [...prev, sector]
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f4ef' }}>
      <HeroSection />


      {/* Projects Section — lighter background */}
      <section className="mx-auto max-w-7xl px-3 pb-6 pt-6 sm:px-6 sm:pb-8 sm:pt-8 lg:px-8">
        <div>
          <div className="mb-4 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className={SECTION_TITLE}>Innovation Projects</h2>
              <p className="mt-1 text-sm text-slate-500">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {(Object.keys(SECTOR_COLORS) as Sector[]).map((sector) => {
                const isSelected = selectedSectors.includes(sector)
                return (
                  <button
                    key={sector}
                    onClick={() => toggleSector(sector)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm border transition-colors ${
                      isSelected 
                        ? 'border-transparent text-white' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                    style={isSelected ? { backgroundColor: SECTOR_COLORS[sector] } : {}}
                  >
                    {!isSelected && (
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: SECTOR_COLORS[sector] }}
                      />
                    )}
                    {sector}
                  </button>
                )
              })}
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl bg-white px-4 py-12 text-center shadow-soft sm:py-16"
            >
              <p className="text-base font-medium text-slate-600 sm:text-lg">
                No projects found
              </p>
            </motion.div>
          ) : (
            <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <footer
        className="px-3 py-6 sm:py-8"
        style={{ backgroundColor: '#f7f4ef', borderTop: '1px solid #d6cfc4' }}
      >
        <div className="mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-navy-800">Operation Dronagiri</p>
          <p className="mt-1 text-xs text-slate-500">
            Innovation & Product Intelligence Dashboard • Government Innovation Mission
          </p>
        </div>
      </footer>
    </div>
  )
}
