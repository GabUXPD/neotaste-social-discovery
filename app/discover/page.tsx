'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import PeekCard from '@/components/PeekCard'

/* ─── Data ───────────────────────────────────────────────────────────── */
const RESTAURANTS = [
  {
    id: 'r1',
    name: 'Brava Burger Co.',
    cuisine: 'American · Burgers',
    rating: 4.8,
    reviews: 312,
    distance: '0.3 km',
    recencyCount: 31,
    image: '/images/burger.jpg',
    listImage: '/images/buerger2.jpg',
    booked: true,
    friends: [
      { src: '/images/avatarWoman.jpg', alt: 'Sofia' },
      { src: '/images/avatarManColor.jpg', alt: 'Mateo' },
      { src: '/images/avatarwoman5.jpg', alt: 'Lucía' },
    ],
    deals: [
      { discount: '2for1', label: 'Burger' },
      { discount: '20% OFF', label: 'Beer' },
    ],
    whyTrending: {
      returnRate: '+23%',
      topOccasion: 'Date night',
      peakTime: 'Fri–Sat 8–10pm',
    },
    pin: { top: '28%', left: '22%', fire: 3 },
  },
  {
    id: 'r2',
    name: 'Café Moderno',
    cuisine: 'Café · Brunch',
    rating: 4.6,
    reviews: 198,
    distance: '0.7 km',
    recencyCount: 23,
    image: '/images/cafeLocal.jpg',
    listImage: '/images/cafe2.jpg',
    friends: [],
    deals: [
      { discount: '15% OFF', label: 'Brunch' },
    ],
    whyTrending: {
      returnRate: '+18%',
      topOccasion: 'Weekend brunch',
      peakTime: 'Sat–Sun 10am–1pm',
    },
    pin: { top: '22%', left: '58%', fire: 2 },
  },
  {
    id: 'r3',
    name: 'Pasta & Alma',
    cuisine: 'Italian · Pasta',
    rating: 4.7,
    reviews: 254,
    distance: '1.1 km',
    recencyCount: 18,
    image: '/images/pastasPlato.jpg',
    listImage: '/images/pastas2.jpg',
    friends: [
      { src: '/images/avatarWoman4.jpg', alt: 'Ana' },
    ],
    deals: [
      { discount: '2for1', label: 'Cake' },
      { discount: '25% OFF', label: 'Wine' },
    ],
    whyTrending: {
      returnRate: '+31%',
      topOccasion: 'Romantic dinner',
      peakTime: 'Thu–Sat 7–9pm',
    },
    pin: { top: '45%', left: '38%', fire: 2 },
  },
  {
    id: 'r4',
    name: 'Verde Saladbar',
    cuisine: 'Healthy · Salads',
    rating: 4.5,
    reviews: 143,
    distance: '0.5 km',
    recencyCount: 12,
    image: '/images/salads.jpg',
    listImage: '/images/salad3.jpg',
    friends: [],
    deals: [
      { discount: '10% OFF', label: 'Bowl' },
    ],
    whyTrending: {
      returnRate: '+12%',
      topOccasion: 'Weekday lunch',
      peakTime: 'Mon–Fri 12–2pm',
    },
    pin: { top: '38%', left: '72%', fire: 1 },
  },
  {
    id: 'r5',
    name: 'La Brasa',
    cuisine: 'Argentine · Steakhouse',
    rating: 4.9,
    reviews: 421,
    distance: '1.4 km',
    recencyCount: 9,
    image: '/images/platoCarne.jpg',
    listImage: '/images/platoCarne2.jpg',
    friends: [],
    deals: [
      { discount: '20% OFF', label: 'Asado' },
    ],
    whyTrending: undefined,
    pin: { top: '55%', left: '55%', fire: 1 },
  },
  {
    id: 'r6',
    name: "Dude's Coffee & Cake",
    cuisine: 'Café · Desserts',
    rating: 4.4,
    reviews: 97,
    distance: '0.9 km',
    recencyCount: 7,
    image: '/images/postres.jpg',
    listImage: '/images/postresCafe.jpg',
    friends: [],
    deals: [
      { discount: '1 FREE', label: 'Cake' },
    ],
    whyTrending: undefined,
    pin: { top: '60%', left: '28%', fire: 0 },
  },
]

/* ─── Map view filter chips ──────────────────────────────────────────── */
const FILTER_CHIPS = [
  { label: 'Filters',     icon: 'sliders',  hasArrow: true  },
  { label: 'Now',         icon: 'clock',    hasArrow: false },
  { label: 'Cuisine',     icon: 'utensils', hasArrow: true  },
  { label: 'Sort',        icon: 'sort',     hasArrow: true  },
  { label: 'Flash Deals', icon: 'bolt',     hasArrow: false },
  { label: 'Loyalty',     icon: 'trophy',   hasArrow: false },
]

/* ─── List view filter chips — matches Figma 75:5760 ────────────────── */
const LIST_FILTER_CHIPS = [
  { label: 'Filters', icon: 'filter', hasArrow: true },
  { label: 'Now',     icon: 'clock',  hasArrow: false },
  { label: 'Flash Deals', icon: 'flash', hasArrow: false },
  { label: 'Loyalty', icon: 'trophy', hasArrow: false },
]

/* ─── Tab bar items ──────────────────────────────────────────────────── */
const TABS = [
  { label: 'Home',     svgPath: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { label: 'Feed',     svgPath: 'M22 12h-4l-3 9L9 3l-3 9H2' },
  { label: 'Discover', svgPath: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' },
  { label: 'Bookings', svgPath: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01' },
  { label: 'Profile',  svgPath: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
]

/* ─── Component ──────────────────────────────────────────────────────── */
export default function DiscoverPage() {
  const router = useRouter()
  const [selectedPin, setSelectedPin] = useState<string | null>(null)
  const [sheetExpanded, setSheetExpanded] = useState(false)
  const [activeFilter, setActiveFilter] = useState(0)
  const [activeTab, setActiveTab] = useState(2)
  const [view, setView] = useState<'map' | 'list'>('map')

  const activeRestaurant = RESTAURANTS.find((r) => r.id === selectedPin) || null

  const handlePinTap = (id: string) => {
    if (selectedPin === id) {
      setSelectedPin(null)
    } else {
      setSelectedPin(id)
      setSheetExpanded(false)
    }
  }

  /* ── List view ────────────────────────────────────────────────────── */
  if (view === 'list') {
    return (
      <ListView
        onSwitchToMap={() => setView('map')}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    )
  }

  /* ── Map view ─────────────────────────────────────────────────────── */
  return (
    <div style={{ position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden', background: '#e8e0d8' }}>

      {/* ── MAP BACKGROUND ─────────────────────────────────────────────── */}
      <MapBackground />

      {/* ── RESTAURANT PINS ────────────────────────────────────────────── */}
      {RESTAURANTS.map((r) => (
        <RestaurantPin
          key={r.id}
          restaurant={r}
          isSelected={selectedPin === r.id}
          onTap={() => handlePinTap(r.id)}
        />
      ))}

      {/* ── SEARCH BAR + FILTERS ───────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '48px 16px 0',
        zIndex: 20,
      }}>
        {/* Search pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#ffffff', borderRadius: 9999,
          padding: '12px 16px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#9ca3af', flex: 1 }}>
            Search deals &amp; more
          </span>
        </div>

        {/* Filter chips */}
        <div
          style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingTop: 10, paddingBottom: 4 }}
          className="scrollbar-hide"
        >
          {FILTER_CHIPS.map((chip, i) => {
            const isActive = activeFilter === i
            const stroke = isActive ? '#ffffff' : '#0a0a0a'
            return (
              <button
                key={i}
                onClick={() => setActiveFilter(i)}
                style={{
                  flexShrink: 0,
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '8px 12px',
                  borderRadius: 16, border: 'none',
                  background: isActive ? '#1a1a1a' : '#fefefe',
                  color: isActive ? '#ffffff' : '#0a0a0a',
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  boxShadow: '0 2px 7px rgba(67,67,67,0.25)',
                  whiteSpace: 'nowrap',
                }}
              >
                {/* Icon */}
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {chip.icon === 'sliders' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
                      <circle cx="8" cy="6" r="2" fill={stroke} stroke="none"/><circle cx="16" cy="12" r="2" fill={stroke} stroke="none"/><circle cx="10" cy="18" r="2" fill={stroke} stroke="none"/>
                    </svg>
                  )}
                  {chip.icon === 'clock' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                  )}
                  {chip.icon === 'utensils' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
                    </svg>
                  )}
                  {chip.icon === 'sort' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 6l4-4 4 4"/><path d="M16 18l-4 4-4-4"/><path d="M12 2v20"/>
                    </svg>
                  )}
                  {chip.icon === 'bolt' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                  )}
                  {chip.icon === 'trophy' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                      <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
                    </svg>
                  )}
                </span>
                {chip.label}
                {chip.hasArrow && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── LOCATION FAB ───────────────────────────────────────────────── */}
      <button style={{
        position: 'absolute', right: 16,
        bottom: sheetExpanded ? 340 : 175,
        width: 40, height: 40, borderRadius: 9999,
        background: '#ffffff', border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', zIndex: 25,
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        transition: 'bottom 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 11 22 2 13 21 11 13 3 11"/>
        </svg>
      </button>

      {/* ── BOTTOM SHEET ───────────────────────────────────────────────── */}
      {!selectedPin && (
        <BottomSheet
          expanded={sheetExpanded}
          onToggle={() => setSheetExpanded(!sheetExpanded)}
          onBrowseAll={() => setView('list')}
        />
      )}

      {/* ── PEEK CARD ──────────────────────────────────────────────────── */}
      {activeRestaurant && (
        <PeekCard
          restaurant={activeRestaurant}
          onClose={() => setSelectedPin(null)}
          onViewDetail={() => router.push(`/restaurant/${activeRestaurant.id}`)}
        />
      )}

      {/* ── TAB BAR ────────────────────────────────────────────────────── */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

/* ─── Map Background ─────────────────────────────────────────────────── */
function MapBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: '#e8e0d8' }}>
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=9.950%2C53.538%2C10.010%2C53.575&layer=mapnik"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        loading="eager"
        title="NeoTaste Map"
        allowFullScreen
      />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 160,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.9) 45%, transparent)',
        pointerEvents: 'none', zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 32,
        background: 'rgba(255,255,255,0.95)',
        pointerEvents: 'none', zIndex: 1,
      }} />
    </div>
  )
}

/* ─── Restaurant Pin ─────────────────────────────────────────────────── */
interface PinProps {
  restaurant: typeof RESTAURANTS[0]
  isSelected: boolean
  onTap: () => void
}

function RestaurantPin({ restaurant: r, isSelected, onTap }: PinProps) {
  const hasRecency = r.pin.fire >= 1
  const isBooked = r.booked === true

  /* ── Pin colours ────────────────────────────────────────────────────── */
  const pinColor  = isBooked
    ? (isSelected ? '#0a0a0a' : '#11301d')
    : (isSelected ? '#2d9e58' : '#53f293')
  const pinStroke = isBooked
    ? (isSelected ? '#000000' : '#0a3d1f')
    : (isSelected ? '#1a6b3a' : '#2d9e58')
  const textColor = isBooked ? '#ffffff' : (isSelected ? '#ffffff' : '#0a3d1f')
  const pinW = isSelected ? 38 : 32
  const pinH = isSelected ? 48 : 40

  return (
    <button
      onClick={onTap}
      style={{
        position: 'absolute',
        top: r.pin.top, left: r.pin.left,
        transform: 'translate(-50%, -100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        border: 'none', background: 'none', cursor: 'pointer', padding: 0,
        zIndex: isSelected ? 19 : 15,
        transition: 'transform 0.2s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div style={{ position: 'relative', width: pinW, height: pinH }}>
        <svg
          viewBox="0 0 32 42"
          width={pinW} height={pinH}
          style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))', transition: 'all 0.2s' }}
        >
          <path
            d="M16,1 C9.37,1 4,6.37 4,13 C4,22 16,41 16,41 C16,41 28,22 28,13 C28,6.37 22.63,1 16,1 Z"
            fill={pinColor}
            stroke={isSelected ? pinStroke : pinStroke}
            strokeWidth={isSelected ? '2.5' : '1.5'}
          />
          <text
            x="16" y="17"
            textAnchor="middle" dominantBaseline="middle"
            fill={textColor}
            fontSize="11" fontWeight="800" fontFamily="'Poppins', sans-serif"
          >N</text>
        </svg>

        {/* Booked badge — checkmark circle */}
        {isBooked && (
          <div style={{
            position: 'absolute', top: -4, right: -7,
            width: 18, height: 18, borderRadius: 9999,
            background: '#53f293', border: '2px solid #ffffff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
          }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0a3d1f" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        )}

        {/* Fire badge — only for non-booked restaurants */}
        {hasRecency && !isBooked && (
          <div style={{
            position: 'absolute', top: -4, right: -6,
            background: '#ffe645', borderRadius: 9999, padding: '1px 5px',
            fontSize: 9, fontWeight: 700, color: '#0a0a0a',
            border: '1.5px solid #ffffff', whiteSpace: 'nowrap',
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)', lineHeight: 1.4,
          }}>
            🔥{r.pin.fire === 3 ? '🔥🔥' : r.pin.fire === 2 ? '🔥' : ''}
          </div>
        )}
      </div>

      {isSelected && (
        <div style={{
          marginTop: 4,
          background: '#1a1a1a', borderRadius: 8, padding: '4px 10px',
          fontSize: 11, fontWeight: 700, color: '#ffffff',
          whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}>
          {r.name}
        </div>
      )}
    </button>
  )
}

/* ─── Bottom Sheet ───────────────────────────────────────────────────── */
function BottomSheet({
  expanded,
  onToggle,
  onBrowseAll,
}: {
  expanded: boolean
  onToggle: () => void
  onBrowseAll: () => void
}) {
  return (
    <div
      style={{
        position: 'absolute', bottom: 65, left: 0, right: 0,
        background: '#ffffff',
        borderRadius: '20px 20px 0 0',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
        zIndex: 30,
        height: expanded ? 'calc(100dvh - 120px)' : 115,
        transition: 'height 0.4s cubic-bezier(0.16,1,0.3,1)',
        overflowY: expanded ? 'auto' : 'hidden',
      }}
      className="scrollbar-hide"
    >
      {/* Drag handle */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 16px 0' }}>
        <div style={{ width: 36, height: 4, borderRadius: 9999, background: '#d1d5db', marginBottom: 10 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          {/* "Browse all deals" → navigates to list view */}
          <span
            onClick={onBrowseAll}
            style={{ fontSize: 20, fontWeight: 700, color: '#0a0a0a', cursor: 'pointer' }}
          >
            Browse all deals
          </span>
          {/* Arrow → expands/collapses sheet */}
          <button
            onClick={onToggle}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round">
              <path d={expanded ? 'M6 15l6-6 6 6' : 'M6 9l6 6 6-6'}/>
            </svg>
          </button>
        </div>
      </div>

      {/* Restaurant list */}
      <div style={{ padding: '12px 16px 80px', display: 'flex', flexDirection: 'column' }}>
        {RESTAURANTS.map((r, i) => (
          <div key={r.id}>
            <SheetRestaurantRow r={r} />
            {i < RESTAURANTS.length - 1 && (
              <div style={{ height: 1, background: 'rgba(0,0,0,0.05)', margin: '12px 0' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function SheetRestaurantRow({ r }: { r: typeof RESTAURANTS[0] }) {
  return (
    <div style={{
      display: 'flex', gap: 12, alignItems: 'center',
    }}>
      {/* Foto + heart */}
      <div style={{ position: 'relative', flexShrink: 0, width: 108, height: 108, borderRadius: 16, overflow: 'hidden' }}>
        <Image src={r.listImage} alt={r.name} width={108} height={108} style={{ objectFit: 'cover', width: 108, height: 108, display: 'block', borderRadius: 16 }} />
        <button
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute', top: 8, right: 8,
            width: 24, height: 24, borderRadius: 9999,
            background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a', marginBottom: 2, lineHeight: '18px' }}>{r.name}</div>
        <div style={{ fontSize: 12, fontWeight: 500, color: '#737373', marginBottom: 2, lineHeight: '18px' }}>{r.cuisine}</div>
        <div style={{ fontSize: 12, fontWeight: 500, color: '#737373', marginBottom: 8, lineHeight: '18px' }}>
          ⭐ {r.rating} ({r.reviews}) · {r.distance}
        </div>
        {r.deals.length > 0 && (
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {r.deals.map((deal, i) => (
              <div
                key={i}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: '#53f293', borderRadius: 9999,
                  padding: '4px 8px', flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0a', whiteSpace: 'nowrap' }}>
                  {deal.discount} {deal.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── List View — Figma frame 75:5760 ───────────────────────────────── */
function ListView({
  onSwitchToMap,
  activeTab,
  onTabChange,
}: {
  onSwitchToMap: () => void
  activeTab: number
  onTabChange: (i: number) => void
}) {
  const [activeFilter, setActiveFilter] = useState(0)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden', background: '#ffffff' }}>

      {/* ── SEARCH BAR + FILTER CHIPS ──────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '48px 16px 0',
        background: '#ffffff',
        zIndex: 20,
      }}>
        {/* Search pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#f3f4f6', borderRadius: 9999,
          padding: '12px 16px',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#9ca3af', flex: 1 }}>
            Search deals &amp; more
          </span>
        </div>

        {/* Filter chips */}
        <div
          style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingTop: 10, paddingBottom: 8 }}
          className="scrollbar-hide"
        >
          {LIST_FILTER_CHIPS.map((chip, i) => {
            const isActive = activeFilter === i
            const iconColor = isActive ? '#ffffff' : '#1a1a1a'
            return (
              <button
                key={i}
                onClick={() => setActiveFilter(i)}
                style={{
                  flexShrink: 0,
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '7px 14px',
                  borderRadius: 9999, border: 'none',
                  background: isActive ? '#1a1a1a' : '#f3f4f6',
                  color: isActive ? '#ffffff' : '#1a1a1a',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {/* Icon per chip type */}
                {chip.icon === 'filter' && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>
                  </svg>
                )}
                {chip.icon === 'clock' && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                )}
                {chip.icon === 'flash' && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                )}
                {chip.icon === 'trophy' && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                    <path d="M4 22h16"/>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
                  </svg>
                )}

                {chip.label}

                {chip.hasArrow && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── SCROLLABLE RESTAURANT LIST ─────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 148,   /* status(48) + search(44) + gap(10) + chips(38) + pb(8) */
          bottom: 65, /* above tab bar */
          left: 0, right: 0,
          overflowY: 'auto',
          padding: '8px 16px 90px',
        }}
        className="scrollbar-hide"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {RESTAURANTS.map((r) => (
            <ListRestaurantRow key={r.id} r={r} />
          ))}
        </div>
      </div>

      {/* ── MAP FAB — dark green pill, centered above tab bar ──────────── */}
      <button
        onClick={onSwitchToMap}
        style={{
          position: 'absolute',
          bottom: 77,
          left: '50%', transform: 'translateX(-50%)',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#11301d', borderRadius: 9999,
          padding: '12px 24px',
          border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          zIndex: 30, whiteSpace: 'nowrap',
        }}
      >
        {/* Map icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#53f293" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"/>
          <path d="M8 2v16M16 6v16"/>
        </svg>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#ffffff' }}>Map</span>
      </button>

      {/* ── TAB BAR ────────────────────────────────────────────────────── */}
      <TabBar activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}

/* ─── List View — Restaurant Row ─────────────────────────────────────── */
function ListRestaurantRow({ r }: { r: typeof RESTAURANTS[0] }) {
  const router = useRouter()
  const [showTooltip, setShowTooltip] = useState(false)
  const hasFriends = r.friends && r.friends.length > 0
  const extraFriends = hasFriends ? Math.max(0, r.friends!.length - 2) : 0

  return (
    <div
      onClick={() => router.push(`/restaurant/${r.id}`)}
      style={{
        display: 'flex', gap: 12, alignItems: 'flex-start',
        padding: 12, borderRadius: 16,
        background: '#ffffff',
        boxShadow: '0 1px 8px rgba(0,0,0,0.08)',
        cursor: 'pointer',
      }}
    >
      {/* Photo + heart */}
      <div style={{ position: 'relative', flexShrink: 0, width: 80, height: 80, borderRadius: 12, overflow: 'hidden' }}>
        <Image
          src={r.listImage}
          alt={r.name}
          width={80} height={80}
          priority
          style={{ objectFit: 'cover', width: 80, height: 80, display: 'block', borderRadius: 12 }}
        />
        <button
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute', top: 6, right: 6,
            width: 26, height: 26, borderRadius: 9999,
            background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* Info column */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 2 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>{r.name}</div>
          {r.booked === true && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, flexShrink: 0, marginLeft: 8 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#53f293" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" ry="3"/>
                <polyline points="9 11 12 14 22 4"/>
              </svg>
              <span style={{ fontSize: 10, fontWeight: 500, color: '#145b32', lineHeight: '12px' }}>Booked</span>
            </div>
          )}
        </div>
        <div style={{ fontSize: 12, fontWeight: 500, color: '#9ca3af', marginBottom: 3 }}>{r.cuisine}</div>
        <div style={{ fontSize: 12, fontWeight: 500, color: '#9ca3af', marginBottom: 8 }}>
          ⭐ {r.rating} ({r.reviews}) · {r.distance}
        </div>

        {/* Recency chip + friend avatars */}
        {r.recencyCount >= 5 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, flexWrap: 'nowrap' }}>

            {/* Chip + tooltip wrapper */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={(e) => { e.stopPropagation(); setShowTooltip(!showTooltip) }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  background: '#ffe645', borderRadius: 9999,
                  padding: '4px 8px', border: 'none', cursor: 'pointer', flexShrink: 0,
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
                  {r.recencyCount >= 20 && <span style={{ fontSize: 12, lineHeight: 1 }}>🔥</span>}
                  <span style={{ fontSize: 12, lineHeight: 1 }}>🔥</span>
                </span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#0a0a0a', whiteSpace: 'nowrap' }}>
                  {r.recencyCount} booked this week
                </span>
                {/* Caret-down */}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              {/* Tooltip — Figma frame 75:6086 */}
              {showTooltip && r.whyTrending && (
                <div
                  className="animate-scale-in"
                  style={{
                    position: 'absolute', top: 'calc(100% + 6px)', left: 0,
                    background: '#11301d', borderRadius: 12, padding: '12px 14px',
                    width: 240, zIndex: 60,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  }}
                >
                  {/* Arrow hacia arriba */}
                  <div style={{
                    position: 'absolute', top: -5, left: 16,
                    width: 10, height: 10, background: '#11301d',
                    transform: 'rotate(45deg)', borderRadius: 2,
                  }} />

                  {/* Fila 1: título + botón cerrar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#53f293' }}>
                      Why it&apos;s trending
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowTooltip(false) }}
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

                  {/* Fila 2: subtítulo */}
                  <div style={{ fontSize: 11, fontWeight: 500, color: '#ffffff', marginBottom: 10 }}>
                    Popular in your neighborhood
                  </div>

                  {/* Fila 3: métricas */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    <div style={{ flexShrink: 0 }}>
                      <span style={{ fontSize: 18, fontWeight: 700, color: '#ffffff' }}>
                        {r.recencyCount}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 500, color: '#86efb2', marginLeft: 4, whiteSpace: 'nowrap' }}>
                        Booked this week
                      </span>
                    </div>
                    <div style={{ flexShrink: 0 }}>
                      <span style={{ fontSize: 18, fontWeight: 700, color: '#53f293' }}>
                        {r.whyTrending.returnRate}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 500, color: '#86efb2', marginLeft: 4, whiteSpace: 'nowrap' }}>
                        Growth
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Friend avatars */}
            {hasFriends && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                <div style={{ display: 'flex' }}>
                  {r.friends!.slice(0, 2).map((f, i) => (
                    <div
                      key={i}
                      style={{
                        width: 22, height: 22, borderRadius: 9999,
                        border: '2px solid #ffffff',
                        marginLeft: i > 0 ? -7 : 0,
                        overflow: 'hidden', position: 'relative', flexShrink: 0,
                      }}
                    >
                      <Image
                        src={f.src} alt={f.alt}
                        width={22} height={22}
                        priority
                        style={{ objectFit: 'cover', width: 22, height: 22, borderRadius: 9999 }}
                      />
                    </div>
                  ))}
                </div>
                {extraFriends > 0 && (
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280' }}>+{extraFriends}</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Deal chips */}
        {r.deals.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {r.deals.map((deal, i) => (
              <div
                key={i}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 3,
                  background: '#53f293', borderRadius: 9999,
                  padding: '4px 10px', flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, color: '#0a0a0a' }}>
                  {deal.discount} {deal.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Tab Bar ────────────────────────────────────────────────────────── */
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
              border: 'none', background: 'none', cursor: 'pointer', padding: '6px 12px',
              flex: 1,
            }}
          >
            <svg
              width="22" height="22" viewBox="0 0 24 24"
              fill="none"
              stroke={isActive ? '#111827' : '#9ca3af'}
              strokeWidth={isActive ? 2.5 : 2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={tab.svgPath}/>
              {tab.label === 'Discover' && isActive && (
                <circle cx="16" cy="10" r="3" fill="#111827"/>
              )}
            </svg>
            <span style={{
              fontSize: 10, fontWeight: isActive ? 700 : 500,
              color: isActive ? '#111827' : '#9ca3af',
            }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
