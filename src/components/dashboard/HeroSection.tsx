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
      className="glass-card rounded-lg p-2.5 shadow-glow sm:p-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold leading-tight text-white/90 sm:text-xs">
            {label}
          </p>
          <p className="mt-1 text-xl font-bold leading-none text-white sm:text-2xl">
            <AnimatedCounter value={value} />
          </p>
        </div>
        <div className={`shrink-0 rounded-md bg-gradient-to-br ${accent} p-1.5 shadow-md sm:p-2`}>
          {icon}
        </div>
      </div>
    </motion.div>
  )
}

const KPI_CONFIG = [
  { label: 'Total Projects', key: 'totalProjects' as const, icon: <Layers className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />, accent: 'from-navy-400 to-navy-600' },
  { label: 'TRL ≥ 6', key: 'trlAbove6' as const, icon: <Target className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />, accent: 'from-violet-400 to-violet-600' },
  { label: 'Pilot States', key: 'pilotStates' as const, icon: <MapPin className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />, accent: 'from-emerald-400 to-emerald-600' },
  { label: 'SDGs Covered', key: 'sdgsCovered' as const, icon: <Globe className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />, accent: 'from-cyan-400 to-cyan-600' },
  { label: 'Sectors', key: 'sectors' as const, icon: <Building2 className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />, accent: 'from-rose-400 to-rose-600' },
]

export function HeroSection() {
  return (
    <section className="gradient-hero relative overflow-hidden px-3 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
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
          <div className="mb-4 inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] text-white/80 backdrop-blur-sm sm:px-4 sm:text-sm">
            <span className="h-2 w-2 shrink-0 rounded-full bg-saffron-500 animate-pulse" />
            <span className="sm:inline">Government Innovation Mission</span>
          </div>

          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">Operation Dronagiri</span>
          </h1>

          <p className="mt-2 text-base font-semibold text-saffron-400 sm:mt-3 sm:text-xl">
            Innovation & Product Intelligence Dashboard
          </p>

          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-white/70 sm:mt-4 sm:text-base lg:text-lg">
            Showcase of startups, technologies, pilots, TRL maturity, SDG impact and
            innovation ecosystem under Operation Dronagiri.
          </p>
        </motion.div>

        <div className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-2 sm:mt-8 sm:gap-2.5">
          {KPI_CONFIG.map((kpi, i) => (
            <div
              key={kpi.key}
              className="w-[calc(50%-0.25rem)] sm:w-[calc(33.333%-0.45rem)] lg:w-36 xl:w-40"
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
