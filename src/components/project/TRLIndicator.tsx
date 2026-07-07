import { motion } from 'framer-motion'

interface TRLIndicatorProps {
  trl: number
}

export function TRLIndicator({ trl }: TRLIndicatorProps) {
  return (
    <div className="w-full">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">
          Technology Readiness Level
        </span>
        <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-bold text-violet-800">
          TRL {trl}
        </span>
      </div>

      <div className="overflow-x-auto pb-1 -mx-1 px-1">
        <div className="relative flex min-w-[280px] items-center justify-between px-1 sm:min-w-0">
          <div className="absolute left-3 right-3 top-1/2 h-0.5 -translate-y-1/2 bg-slate-200 sm:left-4 sm:right-4" />
          <motion.div
            className="absolute left-3 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-violet-400 to-violet-600 sm:left-4"
            initial={{ width: 0 }}
            animate={{ width: `${((trl - 1) / 8) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            style={{ maxWidth: 'calc(100% - 1.5rem)' }}
          />

          {Array.from({ length: 9 }, (_, i) => i + 1).map((level) => {
            const isActive = level === trl
            const isPassed = level < trl

            return (
              <div key={level} className="relative z-10 flex shrink-0 flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * level, type: 'spring', stiffness: 300 }}
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all sm:h-7 sm:w-7 sm:text-xs ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-lg ring-2 ring-violet-200 sm:ring-4'
                      : isPassed
                        ? 'bg-violet-300 text-violet-800'
                        : 'bg-white text-slate-400 ring-1 ring-slate-200 sm:ring-2'
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      ●
                    </motion.span>
                  ) : (
                    level
                  )}
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-1 flex justify-between text-[9px] text-slate-400 sm:text-[10px]">
        <span>Basic Research</span>
        <span>Market Ready</span>
      </div>
    </div>
  )
}
