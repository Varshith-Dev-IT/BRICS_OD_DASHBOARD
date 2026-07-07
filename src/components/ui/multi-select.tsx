import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

export interface MultiSelectOption<T extends string | number = string> {
  value: T
  label: string
}

interface MultiSelectDropdownProps<T extends string | number = string> {
  label: string
  placeholder?: string
  options: MultiSelectOption<T>[]
  selected: T[]
  onChange: (selected: T[]) => void
  className?: string
}

export function MultiSelectDropdown<T extends string | number = string>({
  label,
  placeholder = 'Select options',
  options,
  selected,
  onChange,
  className,
}: MultiSelectDropdownProps<T>) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggle = (value: T) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const displayText =
    selected.length === 0
      ? placeholder
      : selected.length === 1
        ? options.find((o) => o.value === selected[0])?.label ?? placeholder
        : `${selected.length} selected`

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-lg border-0 bg-slate-100/70 px-3 text-sm transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-navy-500/20',
          selected.length > 0 && 'bg-navy-50/80'
        )}
      >
        <span className={cn('truncate', selected.length === 0 && 'text-slate-400')}>
          {displayText}
        </span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-slate-400 transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-slate-100">
          {options.map((option) => (
            <label
              key={String(option.value)}
              className="flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm hover:bg-slate-50"
            >
              <Checkbox
                checked={selected.includes(option.value)}
                onCheckedChange={() => toggle(option.value)}
              />
              <span className="text-slate-700">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
