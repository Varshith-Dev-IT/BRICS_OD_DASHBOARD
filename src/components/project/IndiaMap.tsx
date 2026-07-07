import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/project'

const markerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface IndiaMapProps {
  project: Project
  className?: string
}

export function IndiaMap({ project, className }: IndiaMapProps) {
  const { lat, lng, district, state } = project.pilotLocation

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
      <MapContainer
        center={[lat, lng]}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[lat, lng]}
          icon={markerIcon}
          eventHandlers={{
            add: (e) => {
              setTimeout(() => e.target.openPopup(), 500)
            },
          }}
        >
          <Popup maxWidth={220} minWidth={150}>
            <div className="text-xs">
              <p className="font-bold leading-tight text-navy-800">{project.projectName}</p>
              <p className="mt-1 text-[11px] text-slate-600">
                {district}, {state}
              </p>
              <p className="mt-0.5 text-[10px] text-slate-500">{project.startupName}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </motion.div>
  )
}
