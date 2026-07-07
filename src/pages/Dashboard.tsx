import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { FilterPanel, SECTION_TITLE } from '@/components/dashboard/FilterPanel'
import { HeroSection } from '@/components/dashboard/HeroSection'
import { ProjectCard } from '@/components/project/ProjectCard'
import { projects, getUniqueDistricts } from '@/data'
import { filterProjects } from '@/lib/filters'
import type { FilterState } from '@/types/project'

const INITIAL_FILTERS: FilterState = {
  sectors: [],
  startupTypes: [],
  pilotLocation: '',
  sdgs: [],
  trlLevels: [],
  search: '',
}

export function Dashboard() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS)

  const locations = useMemo(() => getUniqueDistricts(projects), [])

  const filteredProjects = useMemo(
    () => filterProjects(projects, filters),
    [filters]
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection />

      <section className="mx-auto max-w-7xl px-3 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-6 lg:px-8">
        <div className="sticky top-0 z-50 -mx-3 mb-6 max-h-[85vh] overflow-y-auto bg-slate-50/95 px-3 pb-4 pt-2 backdrop-blur-md sm:-mx-6 sm:mb-8 sm:max-h-none sm:overflow-visible sm:px-6 sm:pb-6 lg:-mx-8 lg:px-8">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            locations={locations}
            resultCount={filteredProjects.length}
          />
        </div>

        <div>
          <div className="mb-4 sm:mb-6">
            <h2 className={SECTION_TITLE}>Innovation Projects</h2>
            <p className="mt-1 text-sm text-slate-500">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>

          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl bg-white px-4 py-12 text-center shadow-soft sm:py-16"
            >
              <p className="text-base font-medium text-slate-600 sm:text-lg">
                No projects match your filters
              </p>
              <p className="mt-1 text-sm text-slate-400">Try adjusting your filter criteria</p>
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

      <footer className="bg-white px-3 py-6 sm:py-8">
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
