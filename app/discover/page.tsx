'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import PeekCard from '@/components/PeekCard'
import { RESTAURANTS, type Restaurant } from '@/lib/restaurants'

/* ─── Types re-exported for local components ─────────────────────────── */
type Friend       = Restaurant['friends'][number]
type Deal         = Restaurant['deals'][number]
type WhyTrending  = NonNullable<Restaurant['whyTrending']>

/* ─── Data (imported from @/lib/restaurants) ────────────────────────────── */

/* ─── Extra map pins (no list entry) ────────────────────────────────── */
const MAP_ONLY_PINS: { id: string; top: string; left: string; fires: number; restaurantId: string }[] = [
  { id: 'm1',  top: '18%', left: '42%', fires: 0, restaurantId: 'r7'  },
  { id: 'm2',  top: '32%', left: '12%', fires: 0, restaurantId: 'r8'  },
  { id: 'm3',  top: '30%', left: '80%', fires: 2, restaurantId: 'r9'  },
  { id: 'm4',  top: '48%', left: '88%', fires: 0, restaurantId: 'r10' },
  { id: 'm5',  top: '52%', left: '15%', fires: 1, restaurantId: 'r11' },
  { id: 'm6',  top: '42%', left: '52%', fires: 0, restaurantId: 'r12' },
  { id: 'm7',  top: '15%', left: '68%', fires: 3, restaurantId: 'r13' },
  { id: 'm8',  top: '60%', left: '65%', fires: 0, restaurantId: 'r14' },
  { id: 'm9',  top: '65%', left: '44%', fires: 0, restaurantId: 'r15' },
  { id: 'm10', top: '35%', left: '32%', fires: 0, restaurantId: 'r16' },
]

/* ─── Filter chips ───────────────────────────────────────────────────── */
const FILTER_CHIPS = [
  { label: 'Filters',     icon: 'sliders',   hasArrow: true  },
  { label: 'Now',         icon: 'clock',     hasArrow: false },
  { label: 'Flash Deals', icon: 'bolt',      hasArrow: false },
  { label: 'Loyalty',     icon: 'trophy',    hasArrow: false },
  { label: 'Cuisine',     icon: 'utensils',  hasArrow: true  },
  { label: 'Sort',        icon: 'sort',      hasArrow: true  },
]

/* ─── Tab bar ────────────────────────────────────────────────────────── */
const TABS = [
  { label: 'Home',     svgPath: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { label: 'Feed',     svgPath: 'M22 12h-4l-3 9L9 3l-3 9H2' },
  { label: 'Discover', svgPath: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' },
  { label: 'Bookings', svgPath: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01' },
  { label: 'Profile',  svgPath: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
]

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function DiscoverPage() {
  const router        = useRouter()
  const [selectedPin, setSelectedPin]     = useState<string | null>(null)
  const [sheetExpanded, setSheetExpanded] = useState(false)
  const [activeFilter, setActiveFilter]   = useState(-1)
  const [activeTab,    setActiveTab]      = useState(2)
  const [bookedIds,    setBookedIds]      = useState<Set<string>>(new Set())

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('neotaste_booked') ?? '[]') as string[]
    setBookedIds(new Set(stored))
  }, [])

  const activeRestaurant = RESTAURANTS.find((r) => r.id === selectedPin) ?? null

  const handlePinTap = (id: string) => {
    setSelectedPin(selectedPin === id ? null : id)
    setSheetExpanded(false)
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden', background: '#e8e0d8' }}>

      {/* MAP */}
      <MapBackground />

      {/* PINS — restaurant pins */}
      {RESTAURANTS.map((r) => (
        <RestaurantPin
          key={r.id}
          restaurant={r}
          isSelected={selectedPin === r.id}
          isBooked={bookedIds.has(r.id)}
          onTap={() => handlePinTap(r.id)}
        />
      ))}

      {/* PINS — map-only (tappable, linked to a restaurant) */}
      {MAP_ONLY_PINS.map((p) => (
        <MapPin
          key={p.id}
          top={p.top}
          left={p.left}
          fires={p.fires}
          isSelected={selectedPin === p.restaurantId}
          isBooked={bookedIds.has(p.restaurantId)}
          onTap={() => handlePinTap(p.restaurantId)}
        />
      ))}

      {/* TOP SECTION: search + filter chips */}
      <TopSection activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* LOCATION FAB */}
      <button style={{
        position: 'absolute', right: 16,
        bottom: sheetExpanded ? 340 : 190,
        width: 48, height: 48, borderRadius: 9999,
        background: '#ffffff', border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', zIndex: 25,
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        transition: 'bottom 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 11 22 2 13 21 11 13 3 11"/>
        </svg>
      </button>

      {/* BOTTOM SHEET */}
      {!selectedPin && (
        <BottomSheet
          expanded={sheetExpanded}
          onToggle={() => setSheetExpanded(!sheetExpanded)}
          onRestaurantTap={(id) => router.push(`/restaurant/${id}`)}
          bookedIds={bookedIds}
        />
      )}

      {/* PEEK CARD */}
      {activeRestaurant && (
        <PeekCard
          restaurant={activeRestaurant}
          onClose={() => setSelectedPin(null)}
          onViewDetail={() => router.push(`/restaurant/${activeRestaurant.id}`)}
          isBooked={bookedIds.has(activeRestaurant.id)}
        />
      )}

      {/* MAP BUTTON — visible only when list is expanded, per Figma 75-6082 */}
      {sheetExpanded && (
        <button
          onClick={() => setSheetExpanded(false)}
          style={{
            position: 'absolute',
            bottom: 101,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            background: '#11301d',
            border: 'none',
            borderRadius: 16,
            width: 93,
            height: 52,
            padding: 16,
            cursor: 'pointer',
            zIndex: 35,
            boxShadow: '0 4px 16px rgba(0,0,0,0.30)',
          }}
        >
          {/* chunk/map icon — Figma node 75-6083 */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fefefe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z"/>
            <path d="M9 3v15M15 6v15"/>
          </svg>
          <span style={{ fontSize: 16, fontWeight: 600, color: '#fefefe', whiteSpace: 'nowrap' }}>Map</span>
        </button>
      )}

      {/* TAB BAR */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

/* ─── MapBackground ──────────────────────────────────────────────────── */
function MapBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=9.950%2C53.538%2C10.010%2C53.575&layer=mapnik"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        loading="eager"
        title="NeoTaste Map"
        allowFullScreen
      />
      {/* top fade so search bar reads cleanly */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 180,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.92) 50%, transparent)',
        pointerEvents: 'none', zIndex: 1,
      }} />
    </div>
  )
}

/* ─── RestaurantPin ──────────────────────────────────────────────────── */
function RestaurantPin({
  restaurant: r,
  isSelected,
  isBooked,
  onTap,
}: {
  restaurant: Restaurant
  isSelected: boolean
  isBooked: boolean
  onTap: () => void
}) {
  const fires = r.pin.fires
  const [isPressed, setIsPressed] = useState(false)

  // Size: pressed-booked → 32×42.667 | selected → 30×40 | default → 24×32
  const W = (isPressed && isBooked) ? 32 : isSelected ? 30 : 24
  const H = (isPressed && isBooked) ? 42.667 : isSelected ? 40 : 32

  return (
    <button
      onClick={onTap}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      style={{
        position: 'absolute', top: r.pin.top, left: r.pin.left,
        transform: 'translate(-50%, -100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        border: 'none', background: 'none', cursor: 'pointer', padding: 0,
        zIndex: isSelected ? 19 : 15,
        transition: 'width 0.1s ease, height 0.1s ease',
      }}
    >
      {/* Pin + badge container */}
      <div style={{ position: 'relative', width: W, height: H }}>

        {/* ── Teardrop pin body ── */}
        <svg
          width={W} height={H}
          viewBox="0 0 24 32"
          style={{ display: 'block', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.30))' }}
        >
          {/* Body */}
          <path
            d="M12 0C5.37 0 0 5.37 0 12C0 20.5 12 32 12 32C12 32 24 20.5 24 12C24 5.37 18.63 0 12 0Z"
            fill={isBooked ? '#145b32' : isSelected ? '#11301d' : '#53f293'}
          stroke={isSelected && !isBooked ? '#ffffff' : 'none'}
          strokeWidth={isSelected && !isBooked ? '1.5' : '0'}
          />
          {isBooked ? (
            /* Checkmark — booked state */
            <>
              <circle cx="12" cy="12" r="8" fill="#ffffff" opacity="0.9"/>
              <polyline points="8 12 11 15 16.5 9" stroke="#145b32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </>
          ) : fires === 0 ? (
            /* N logo — regular pin */
            <text
              x="12" y="13"
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isSelected ? '#ffffff' : '#1c1d28'}
              fontSize={isSelected ? '11' : '9'}
              fontWeight="800"
              fontFamily="'Poppins', sans-serif"
            >N</text>
          ) : (
            /* Fire circle — 18×18px per Figma */
            <>
              <circle cx="12" cy="12" r="9" fill="#fefde8" />
              {fires === 3 ? (
                /* 3 emojis overlapping at -4px per Figma node 35-420 */
                <>
                  <text x="4"  y="15" textAnchor="start" fontSize="8" fontFamily="'Segoe UI Emoji','Apple Color Emoji',sans-serif">🔥</text>
                  <text x="8"  y="15" textAnchor="start" fontSize="8" fontFamily="'Segoe UI Emoji','Apple Color Emoji',sans-serif">🔥</text>
                  <text x="12" y="15" textAnchor="start" fontSize="8" fontFamily="'Segoe UI Emoji','Apple Color Emoji',sans-serif">🔥</text>
                </>
              ) : fires === 2 ? (
                /* 2 emojis overlapping at -4px per Figma node 75-11414 */
                <>
                  <text x="6"  y="15" textAnchor="start" fontSize="8" fontFamily="'Segoe UI Emoji','Apple Color Emoji',sans-serif">🔥</text>
                  <text x="10" y="15" textAnchor="start" fontSize="8" fontFamily="'Segoe UI Emoji','Apple Color Emoji',sans-serif">🔥</text>
                </>
              ) : (
                <text x="12" y="15" textAnchor="middle" fontSize="10"
                  fontFamily="'Segoe UI Emoji','Apple Color Emoji',sans-serif">🔥</text>
              )}
            </>
          )}
        </svg>
      </div>

    </button>
  )
}

/* ─── MapPin (interactive, linked to a restaurant) ──────────────────── */
function MapPin({ top, left, fires, isSelected, isBooked, onTap }: {
  top: string; left: string; fires: number; isSelected: boolean; isBooked: boolean; onTap: () => void
}) {
  const [isPressed, setIsPressed] = useState(false)

  const W = (isPressed && isBooked) ? 32 : isSelected ? 30 : 24
  const H = (isPressed && isBooked) ? 42.667 : isSelected ? 40 : 32

  return (
    <button
      onClick={onTap}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      style={{
        position: 'absolute', top, left,
        transform: 'translate(-50%, -100%)',
        width: W, height: H, zIndex: isSelected ? 19 : 14,
        border: 'none', background: 'none', cursor: 'pointer', padding: 0,
        transition: 'width 0.1s ease, height 0.1s ease',
      }}
    >
      <svg width={W} height={H} viewBox="0 0 24 32"
        style={{ display: 'block', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.30))' }}>
        <path
          d="M12 0C5.37 0 0 5.37 0 12C0 20.5 12 32 12 32C12 32 24 20.5 24 12C24 5.37 18.63 0 12 0Z"
          fill={isBooked ? '#145b32' : isSelected ? '#11301d' : '#53f293'}
          stroke={isSelected && !isBooked ? '#ffffff' : 'none'}
          strokeWidth={isSelected && !isBooked ? '1.5' : '0'}
        />
        {isBooked ? (
          <>
            <circle cx="12" cy="12" r="8" fill="#ffffff" opacity="0.9"/>
            <polyline points="8 12 11 15 16.5 9" stroke="#145b32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </>
        ) : fires === 0 ? (
          <text x="12" y="13" textAnchor="middle" dominantBaseline="middle"
            fill={isSelected ? '#ffffff' : '#1c1d28'} fontSize={isSelected ? '11' : '9'} fontWeight="800" fontFamily="'Poppins', sans-serif">N</text>
        ) : (
          <>
            <circle cx="12" cy="12" r="9" fill="#fefde8" />
            {fires === 3 ? (
              <>
                <text x="4"  y="15" textAnchor="start" fontSize="8" fontFamily="'Segoe UI Emoji','Apple Color Emoji',sans-serif">🔥</text>
                <text x="8"  y="15" textAnchor="start" fontSize="8" fontFamily="'Segoe UI Emoji','Apple Color Emoji',sans-serif">🔥</text>
                <text x="12" y="15" textAnchor="start" fontSize="8" fontFamily="'Segoe UI Emoji','Apple Color Emoji',sans-serif">🔥</text>
              </>
            ) : fires === 2 ? (
              <>
                <text x="6"  y="15" textAnchor="start" fontSize="8" fontFamily="'Segoe UI Emoji','Apple Color Emoji',sans-serif">🔥</text>
                <text x="10" y="15" textAnchor="start" fontSize="8" fontFamily="'Segoe UI Emoji','Apple Color Emoji',sans-serif">🔥</text>
              </>
            ) : (
              <text x="12" y="15" textAnchor="middle" fontSize="10"
                fontFamily="'Segoe UI Emoji','Apple Color Emoji',sans-serif">🔥</text>
            )}
          </>
        )}
      </svg>
    </button>
  )
}

/* ─── TopSection ─────────────────────────────────────────────────────── */
function TopSection({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: number
  onFilterChange: (i: number) => void
}) {
  const chipShadow = '0 2px 7px rgba(67,67,67,0.25)'

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      padding: '48px 16px 0', zIndex: 35,
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      {/* Search pill */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#fefefe', borderRadius: 32,
        padding: '12px 16px', boxShadow: chipShadow,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span style={{ fontSize: 16, fontWeight: 500, color: 'rgba(0,0,0,0.5)', flex: 1, lineHeight: '24px' }}>
          Search deals &amp; more
        </span>
      </div>

      {/* Filter chips */}
      <div
        style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 4 }}
        className="scrollbar-hide"
      >
        {FILTER_CHIPS.map((chip, i) => {
          const isActive = activeFilter === i
          const iconColor = isActive ? '#ffffff' : '#0a0a0a'
          return (
            <button
              key={i}
              onClick={() => onFilterChange(activeFilter === i ? -1 : i)}
              className="press-scale"
              style={{
                flexShrink: 0,
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 12px', borderRadius: 16, border: 'none',
                background: isActive ? '#1a1a1a' : '#fefefe',
                color: isActive ? '#ffffff' : '#0a0a0a',
                fontSize: 14, fontWeight: 600, cursor: 'pointer',
                boxShadow: chipShadow, whiteSpace: 'nowrap',
              }}
            >
              <ChipIcon name={chip.icon} color={iconColor} />
              {chip.label}
              {chip.hasArrow && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ChipIcon({ name, color }: { name: string; color: string }) {
  const props = { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (name === 'sliders') return (
    <svg {...props}>
      <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
      <circle cx="8" cy="6" r="2" fill={color} stroke="none"/><circle cx="16" cy="12" r="2" fill={color} stroke="none"/><circle cx="10" cy="18" r="2" fill={color} stroke="none"/>
    </svg>
  )
  if (name === 'clock') return (
    <svg {...props}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
  )
  if (name === 'utensils') return (
    <svg {...props}>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/>
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
    </svg>
  )
  if (name === 'sort') return (
    <svg {...props}>
      <path d="M8 6l4-4 4 4"/><path d="M16 18l-4 4-4-4"/><path d="M12 2v20"/>
    </svg>
  )
  if (name === 'bolt') return (
    <svg {...props}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
  )
  if (name === 'trophy') return (
    <svg {...props}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
    </svg>
  )
  return null
}

/* ─── BottomSheet ────────────────────────────────────────────────────── */
function BottomSheet({
  expanded,
  onToggle,
  onRestaurantTap,
  bookedIds,
}: {
  expanded: boolean
  onToggle: () => void
  onRestaurantTap: (id: string) => void
  bookedIds: Set<string>
}) {
  return (
    <div
      style={{
        position: 'absolute', bottom: 65, left: 0, right: 0,
        background: '#ffffff',
        borderRadius: '20px 20px 0 0',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
        zIndex: 30,
        height: expanded ? 'calc(100dvh - 65px)' : 120,
        transition: 'height 0.4s cubic-bezier(0.16,1,0.3,1)',
        overflowY: expanded ? 'scroll' : 'hidden',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
      }}
      className="scrollbar-hide"
    >
      {/* Drag handle + header */}
      <div
        onClick={onToggle}
        style={{ padding: '8px 16px 0', cursor: 'pointer' }}
      >
        <div style={{
          width: 43, height: 4, borderRadius: 9999,
          background: 'rgba(0,0,0,0.15)', margin: '0 auto 8px',
        }} />
        <p style={{ fontSize: 20, fontWeight: 700, color: '#0a0a0a', lineHeight: '26px', marginBottom: 8 }}>
          Browse all deals
        </p>
      </div>

      {/* List */}
      <div style={{ padding: `${expanded ? 185 : 0}px 16px 80px`, display: 'flex', flexDirection: 'column' }}>
        {RESTAURANTS.map((r, i) => (
          <div key={r.id}>
            <div onClick={() => onRestaurantTap(r.id)} className="press-scale" style={{ cursor: 'pointer', paddingTop: 8, paddingBottom: 8 }}>
              <ListItem r={r} isBooked={bookedIds.has(r.id)} />
            </div>
            {i < RESTAURANTS.length - 1 && (
              <div style={{ height: 1, background: 'rgba(0,0,0,0.07)' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── ListItem — matches Figma list-item frame ───────────────────────── */
function ListItem({ r, isBooked = false }: { r: Restaurant; isBooked?: boolean }) {
  const hasFriends  = r.friends.length > 0
  const hasRecency  = r.recencyCount > 0
  const [isLiked,   setIsLiked]   = useState(false)
  const [heartAnim, setHeartAnim] = useState(false)

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>

      {/* Image + heart */}
      <div style={{ position: 'relative', flexShrink: 0, width: 108, height: 108 }}>
        {/* Image — overflow:hidden sólo aquí para no clipar el botón */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: 16, overflow: 'hidden' }}>
          <Image
            src={r.listImage} alt={r.name}
            fill priority={r.priority} style={{ objectFit: 'cover' }}
          />
        </div>
        {/* Corazón — fuera del overflow:hidden para que la animación no se corte */}
        <button
          onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); setHeartAnim(true) }}
          onAnimationEnd={() => setHeartAnim(false)}
          className={heartAnim ? 'animate-heart-pop' : ''}
          style={{
            position: 'absolute', top: 8, right: 8,
            width: 24, height: 24, borderRadius: 9999,
            background: 'none', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', padding: 0, zIndex: 1,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={isLiked ? '#f43f5e' : 'none'} stroke={isLiked ? '#f43f5e' : 'rgba(255,255,255,0.9)'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, paddingTop: 10, position: 'relative' }}>

        {/* Booked badge — top-right */}
        {isBooked && (
          <div style={{
            position: 'absolute', top: -2, right: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 1,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" fill="#53f293"/>
              <polyline points="6 12 10 16 18 8" stroke="#145b32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 10, fontWeight: 500, color: '#145b32', lineHeight: '12px', whiteSpace: 'nowrap' }}>
              Booked
            </span>
          </div>
        )}

        {/* Name */}
        <p style={{
          fontSize: 14, fontWeight: 600, color: '#0a0a0a',
          lineHeight: '18px', marginBottom: 4,
        }}>
          {r.name}
        </p>

        {/* Categories · Price */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 12, fontWeight: 500, color: '#737373', lineHeight: '18px',
          marginBottom: 2,
        }}>
          <span>{r.categories}</span>
          <DotSeparator />
          <PriceIndicator level={r.priceLevel} />
        </div>

        {/* Rating · Reviews · Distance */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 12, fontWeight: 500, color: '#737373', lineHeight: '18px',
          marginBottom: 8,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#737373" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span>{r.rating}</span>
          <span>({r.reviews})</span>
          <DotSeparator />
          <span>{r.distance}</span>
        </div>

        {/* Recency chip + Social pill */}
        {(hasRecency || hasFriends) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, flexWrap: 'nowrap' }}>
            {hasRecency && <RecencyChip count={r.recencyCount} fires={r.pin.fires} whyTrending={r.whyTrending} />}
            {hasFriends && <SocialPill friends={r.friends} />}
          </div>
        )}

        {/* Deal chips — horizontal scroll */}
        {r.deals.length > 0 && (
          <div
            style={{ display: 'flex', gap: 4, overflowX: 'auto' }}
            className="scrollbar-hide"
          >
            {r.deals.map((deal, i) => (
              <div
                key={i}
                className="press-scale"
                style={{
                  flexShrink: 0,
                  background: '#53f293', borderRadius: 24,
                  padding: '4px 8px',
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0a', whiteSpace: 'nowrap' }}>
                  {deal.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Sub-components ─────────────────────────────────────────────────── */
function DotSeparator() {
  return (
    <span style={{
      display: 'inline-block', width: 2, height: 2, borderRadius: 9999,
      background: '#737373', flexShrink: 0, verticalAlign: 'middle',
    }} />
  )
}

function PriceIndicator({ level }: { level: number }) {
  return (
    <span style={{ fontWeight: 500, fontSize: 12, lineHeight: '20px' }}>
      <span style={{ color: '#0a0a0a' }}>{'€'.repeat(level)}</span>
      <span style={{ color: 'rgba(0,0,0,0.35)' }}>{'€'.repeat(4 - level)}</span>
    </span>
  )
}

function RecencyChip({ count, fires, whyTrending }: { count: number; fires: number; whyTrending?: WhyTrending }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open) }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          background: open ? '#ffe645' : '#fffbc2', borderRadius: 9999,
          padding: '4px 8px', border: 'none', cursor: 'pointer',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          {Array.from({ length: Math.max(1, fires) }).map((_, i, arr) => (
            <span key={i} style={{ fontSize: 11, lineHeight: 1, marginRight: i < arr.length - 1 ? -5 : 0 }}>🔥</span>
          ))}
        </span>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#0a0a0a', whiteSpace: 'nowrap' }}>
          {count} booked this week
        </span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {open && whyTrending && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute', top: 'calc(100% + 6px)', left: 0,
            background: '#11301d', borderRadius: 12, padding: '12px 14px',
            width: 240, zIndex: 60,
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          }}
        >
          {/* Arrow */}
          <div style={{
            position: 'absolute', top: -5, left: 16,
            width: 10, height: 10, background: '#11301d',
            transform: 'rotate(45deg)', borderRadius: 2,
          }} />
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#ffe645' }}>Why it&apos;s trending</span>
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(false) }}
              style={{
                width: 20, height: 20, borderRadius: 9999,
                background: '#53f29333', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', padding: 0, flexShrink: 0,
              }}
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#53f293" strokeWidth="3" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div style={{ fontSize: 11, fontWeight: 500, color: '#ffffff', marginBottom: 10 }}>
            Popular in your neighborhood
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <div>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#ffffff' }}>{count}</span>
              <span style={{ fontSize: 10, fontWeight: 500, color: '#86efb2', marginLeft: 4, whiteSpace: 'nowrap' }}>Booked this week</span>
            </div>
            <div>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#53f293' }}>{whyTrending.returnRate}</span>
              <span style={{ fontSize: 10, fontWeight: 500, color: '#86efb2', marginLeft: 4 }}>Growth</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SocialPill({ friends }: { friends: Friend[] }) {
  const extraFriends = Math.max(0, friends.length - 2)
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 2,
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex' }}>
        {friends.slice(0, 2).map((f, i) => (
          <div
            key={i}
            style={{
              width: 24, height: 24, borderRadius: 9999,
              border: '2px solid #ffffff', overflow: 'hidden',
              marginLeft: i > 0 ? -8 : 0, flexShrink: 0, position: 'relative',
            }}
          >
            <Image src={f.src} alt={f.alt} fill style={{ objectFit: 'cover' }} />
          </div>
        ))}
      </div>
      {extraFriends > 0 && (
        <span style={{ fontSize: 12, fontWeight: 600, color: '#08180f', whiteSpace: 'nowrap' }}>
          +{extraFriends}
        </span>
      )}
    </div>
  )
}

/* ─── TabBar ─────────────────────────────────────────────────────────── */
function TabBar({ activeTab, onTabChange }: { activeTab: number; onTabChange: (i: number) => void }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 65, background: '#ffffff',
      borderTop: '1px solid #f3f4f6',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      zIndex: 40,
    }}>
      {TABS.map((tab, i) => {
        const isActive = activeTab === i
        return (
          <button
            key={i}
            onClick={() => onTabChange(i)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              border: 'none', background: 'none', cursor: 'pointer', padding: '6px 12px', flex: 1,
            }}
          >
            <svg
              width="22" height="22" viewBox="0 0 24 24"
              fill="none"
              stroke={isActive ? '#111827' : '#9ca3af'}
              strokeWidth={isActive ? 2.5 : 2}
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d={tab.svgPath}/>
            </svg>
            <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? '#111827' : '#9ca3af' }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
