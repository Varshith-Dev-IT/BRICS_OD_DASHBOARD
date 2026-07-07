import { SDG_INFO } from '@/types/project'

interface SDGBadgesProps {
  sdgs: number[]
  size?: 'sm' | 'md'
}

export function SDGBadges({ sdgs, size = 'sm' }: SDGBadgesProps) {
  const paddingClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-xs sm:text-sm'

  return (
    <div className="flex flex-wrap gap-2">
      {sdgs.map((sdg) => {
        const info = SDG_INFO[sdg]
        if (!info) return null

        return (
          <span
            key={sdg}
            className={`inline-flex items-center rounded-lg bg-slate-200/60 border border-slate-300/50 font-medium text-slate-700 shadow-sm ${paddingClasses}`}
          >
            <span className="font-bold text-slate-900 mr-1.5">SDG {sdg}:</span>
            {info.title}
          </span>
        )
      })}
    </div>
  )
}
