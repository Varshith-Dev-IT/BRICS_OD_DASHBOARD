import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { Sector } from '@/types/project'
import { SECTOR_COLORS } from '@/types/project'

interface StartupLogoProps {
  startupName: string
  sector: Sector
  logoUrl?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')
}

const SIZE_CLASSES = {
  sm: 'h-10 w-10 text-sm',
  md: 'h-14 w-14 text-base',
  lg: 'h-16 max-h-full w-auto max-w-[140px] sm:h-20 sm:max-w-[160px]',
}

export function StartupLogo({
  startupName,
  sector,
  logoUrl,
  size = 'md',
  className,
}: StartupLogoProps) {
  const [imgError, setImgError] = useState(false)
  const color = SECTOR_COLORS[sector]
  const initials = getInitials(startupName)

  useEffect(() => {
    setImgError(false)
  }, [logoUrl])

  if (logoUrl && !imgError) {
    return (
      <img
        key={logoUrl}
        src={encodeURI(logoUrl)}
        alt={`${startupName} logo`}
        onError={() => setImgError(true)}
        className={cn('max-h-full max-w-full object-contain', SIZE_CLASSES[size], className)}
      />
    )
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-xl font-bold text-white shadow-sm',
        size === 'lg' ? 'h-16 w-16 sm:h-20 sm:w-20' : SIZE_CLASSES[size],
        className
      )}
      style={{ backgroundColor: color }}
      aria-label={`${startupName} logo`}
    >
      {initials}
    </div>
  )
}
