import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import {
  Building2,
  Globe,
  Layers,
  MapPin,
  Target,
} from 'lucide-react'
import { KPI_DATA } from '@/types/project'

interface KPICardProps {
  label: string
  value: number
  icon: React.ReactNode
  delay: number
  accent?: string
}

function AnimatedCounter({ value }: { value: number }) {
  const spring = useSpring(0, { duration: 2000, bounce: 0 })
  const display = useTransform(spring, (v) => Math.round(v))

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return <motion.span>{display}</motion.span>
}

function KPICard({ label, value, icon, delay, accent = 'from-navy-600 to-navy-800' }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="glass-card rounded-xl p-4 shadow-glow sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold leading-tight text-white/90 sm:text-sm">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold leading-none text-white sm:text-3xl">
            <AnimatedCounter value={value} />
          </p>
        </div>
        <div className={`shrink-0 rounded-lg bg-gradient-to-br ${accent} p-2 shadow-md sm:p-2.5`}>
          {icon}
        </div>
      </div>
    </motion.div>
  )
}

const KPI_CONFIG = [
  { label: 'Total Projects', key: 'totalProjects' as const, icon: <Layers className="h-4.5 w-4.5 text-white sm:h-5 sm:w-5" />, accent: 'from-navy-400 to-navy-600' },
  { label: 'TRL ≥ 6', key: 'trlAbove6' as const, icon: <Target className="h-4.5 w-4.5 text-white sm:h-5 sm:w-5" />, accent: 'from-violet-400 to-violet-600' },
  { label: 'Pilot Districts', key: 'pilotDistricts' as const, icon: <MapPin className="h-4.5 w-4.5 text-white sm:h-5 sm:w-5" />, accent: 'from-emerald-400 to-emerald-600' },
  { label: 'SDGs Covered', key: 'sdgsCovered' as const, icon: <Globe className="h-4.5 w-4.5 text-white sm:h-5 sm:w-5" />, accent: 'from-cyan-400 to-cyan-600' },
  { label: 'Sectors', key: 'sectors' as const, icon: <Building2 className="h-4.5 w-4.5 text-white sm:h-5 sm:w-5" />, accent: 'from-rose-400 to-rose-600' },
]

export function HeroSection() {
  return (
    <section className="gradient-hero relative overflow-hidden px-3 pt-8 pb-4 sm:px-6 sm:pt-12 sm:pb-6 lg:px-8 lg:pt-16 lg:pb-8">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-saffron-500 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-emerald-500 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">Operation Dronagiri</span>
          </h1>


          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-white/80 sm:mt-4 sm:text-base lg:text-lg">
            Empowering India’s future with geospatial data, innovation, and collaboration.
            Operation Dronagiri is a strategic initiative under the National Geospatial Policy (NGP) introduced by the Department of Science & Technology (DST) to demonstrate the tangible benefits of geospatial technology across three key sectors: Agriculture, Transportation & Infrastructure, and Livelihoods & Skilling.
          </p>
        </motion.div>

        <div className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-3 sm:mt-8 sm:gap-4">
          {KPI_CONFIG.map((kpi, i) => (
            <div
              key={kpi.key}
              className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.67rem)] lg:w-44 xl:w-48"
            >
              <KPICard
                label={kpi.label}
                value={KPI_DATA[kpi.key]}
                icon={kpi.icon}
                delay={0.2 + i * 0.1}
                accent={kpi.accent}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
