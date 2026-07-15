import { useCallback, useState } from 'react'
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/project'

/** Demo Map ID enables Advanced Markers without a custom Cloud Console map style */
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID'

interface IndiaMapProps {
  project: Project
  className?: string
}

function PilotMarker({ project }: { project: Project }) {
  const { lat, lng, district, state } = project.pilotLocation
  const [markerRef, marker] = useAdvancedMarkerRef()
  const [infoOpen, setInfoOpen] = useState(true)

  const handleMarkerClick = useCallback(() => {
    setInfoOpen((open) => !open)
  }, [])

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat, lng }}
        onClick={handleMarkerClick}
        title={project.projectName}
      >
        <Pin background="#0B3D91" borderColor="#0a1a3d" glyphColor="#ffffff" />
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow anchor={marker} onCloseClick={() => setInfoOpen(false)}>
          <div className="max-w-[220px] text-xs">
            <p className="font-bold leading-tight text-navy-800">{project.projectName}</p>
            <p className="mt-1 text-[11px] text-slate-600">
              {district}, {state}
            </p>
            <p className="mt-0.5 text-[10px] text-slate-500">{project.startupName}</p>
          </div>
        </InfoWindow>
      )}
    </>
  )
}

export function IndiaMap({ project, className }: IndiaMapProps) {
  const { lat, lng } = project.pilotLocation
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'min-h-[300px] w-full flex-1 overflow-hidden rounded-xl shadow-soft sm:min-h-[350px] lg:min-h-[400px]',
        className
      )}
    >
      {!apiKey ? (
        <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-2 bg-slate-100 px-4 text-center">
          <MapPin className="h-8 w-8 text-navy-600" />
          <p className="text-sm font-medium text-slate-700">Google Maps API key not configured</p>
          <p className="text-xs text-slate-500">
            Set <code className="rounded bg-slate-200 px-1">VITE_GOOGLE_MAPS_API_KEY</code> in your
            .env file
          </p>
        </div>
      ) : (
        <APIProvider apiKey={apiKey}>
          <Map
            style={{ width: '100%', height: '100%', borderRadius: '0.75rem' }}
            defaultCenter={{ lat, lng }}
            defaultZoom={7}
            mapId={MAP_ID}
            gestureHandling="cooperative"
            disableDefaultUI={false}
            zoomControl
            mapTypeControl={false}
            streetViewControl={false}
            fullscreenControl
            scrollwheel={false}
          >
            <PilotMarker project={project} />
          </Map>
        </APIProvider>
      )}
    </motion.div>
  )
}
