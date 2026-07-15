import { ChevronDown, Filter, RotateCcw, Search, X } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MultiSelectDropdown } from '@/components/ui/multi-select'
import { cn } from '@/lib/utils'
import type { FilterState, Sector } from '@/types/project'

const SECTORS: Sector[] = [
  'Agriculture',
  'Transportation & Infrastructure',
  'Livelihood & Skilling',
]


const SECTION_TITLE = 'font-display text-lg font-bold text-slate-900 sm:text-xl'

interface FilterPanelProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  resultCount: number
}

export function FilterPanel({ filters, onChange, resultCount }: FilterPanelProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const resetFilters = () => {
    onChange({
      sectors: [],
      startupTypes: [],
      pilotLocation: '',
      sdgs: [],
      trlLevels: [],
      search: '',
    })
  }

  const hasActiveFilters = filters.sectors.length > 0 || filters.search

  const activeFilterCount = [
    filters.sectors.length,
    filters.search ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-5">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <Filter className="h-5 w-5 shrink-0 text-navy-700" />
          <h2 className={SECTION_TITLE}>Filters</h2>
          <Badge variant="secondary">{resultCount} results</Badge>
          {activeFilterCount > 0 && (
            <Badge variant="default" className="md:hidden">
              {activeFilterCount} active
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset All</span>
              <span className="sm:hidden">Reset</span>
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? 'Hide' : 'Show'} Filters
            <ChevronDown className={cn('h-4 w-4 transition-transform', mobileOpen && 'rotate-180')} />
          </Button>
        </div>
      </div>

      {/* Search always visible on mobile */}
      <div className="mb-4 md:hidden">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-900">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search projects..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="pl-9"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div
        className={cn(
          'grid gap-4 grid-cols-1 sm:grid-cols-2',
          !mobileOpen && 'hidden md:grid'
        )}
      >
        <MultiSelectDropdown<Sector>
          label="Sector"
          placeholder="All Sectors"
          options={SECTORS.map((s) => ({ value: s, label: s }))}
          selected={filters.sectors}
          onChange={(sectors) => onChange({ ...filters, sectors })}
        />

        <div className="hidden md:block">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-900">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search projects..."
              value={filters.search}
              onChange={(e) => onChange({ ...filters, search: e.target.value })}
              className="pl-9"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => onChange({ ...filters, search: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export { SECTION_TITLE }
