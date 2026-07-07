import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { SDG_INFO } from '@/types/project'

interface SDGBadgesProps {
  sdgs: number[]
  size?: 'sm' | 'md'
}

export function SDGBadges({ sdgs, size = 'sm' }: SDGBadgesProps) {
  const sizeClasses = size === 'sm' ? 'h-7 w-7 text-[10px]' : 'h-9 w-9 text-xs'

  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex flex-wrap gap-1.5">
        {sdgs.map((sdg) => {
          const info = SDG_INFO[sdg]
          if (!info) return null

          return (
            <Tooltip key={sdg}>
              <TooltipTrigger asChild>
                <span
                  className={`inline-flex ${sizeClasses} cursor-default items-center justify-center rounded-md font-bold text-white shadow-sm transition-transform hover:scale-110`}
                  style={{ backgroundColor: info.color }}
                >
                  {sdg}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>SDG {sdg}: {info.title}</p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
