'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import PeekCard from '@/components/PeekCard'

/* ─── Types ──────────────────────────────────────────────────────────── */
interface Friend { src: string; alt: string }
interface Deal   { label: string }

interface WhyTrending {
  returnRate: string
  topOccasion: string
  peakTime: string
}

interface Restaurant {
  id: string
  name: string
  categories: string
  priceLevel: number        // 1–4 → solid €, rest dimmed
  rating: number
  reviews: number
  distance: string
  recencyCount: number      // 0 = hide chip
  image: string
  listImage: string
  friends: Friend[]
  deals: Deal[]
  whyTrending?: WhyTrending
  pin: { top: string; left: string; fires: number }  // 0 = no badge, 1–3 = fire count
  priority?: boolean
}

/* ─── Data ───────────────────────────────────────────────────────────── */
const RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: "Dude's Coffee & Cake",
    categories: 'Café, Desserts',
    priceLevel: 3,
    rating: 4.8,
    reviews: 143,
    distance: '4.5 km',
    recencyCount: 31,
    image: '/images/postresCafe.jpg',
    listImage: '/images/postresCafe.jpg',
    friends: [
      { src: '/images/avatarWoman.jpg',       alt: 'Sofia' },
      { src: '/images/avatarManColor.jpg',    alt: 'Mateo' },
      { src: '/images/avatarWoman4.jpg',      alt: 'Ana' },
      { src: '/images/avatarManGlasses.jpg',  alt: 'Tom' },
    ],
    deals: [{ label: '2for1 Beverage' }, { label: '2for1 Espresso' }],
    whyTrending: { returnRate: '+23%', topOccasion: 'Date night', peakTime: 'Fri–Sat 8–10pm' },
    pin: { top: '28%', left: '22%', fires: 3 },
    priority: true,
  },
  {
    id: 'r2',
    name: "Capo's Coffee Hafencity",
    categories: 'Breakfast, Coffee',
    priceLevel: 2,
    rating: 4.8,
    reviews: 143,
    distance: '4.5 km',
    recencyCount: 23,
    image: '/images/cafeLocal.jpg',
    listImage: '/images/cafe2.jpg',
    friends: [],
    deals: [{ label: '2for1 Coffee & Cake' }, { label: '2for1 Latte' }],
    whyTrending: { returnRate: '+18%', topOccasion: 'Weekend brunch', peakTime: 'Sat–Sun 10am–1pm' },
    pin: { top: '22%', left: '58%', fires: 2 },
  },
  {
    id: 'r3',
    name: "Camping Coffee im Kaufmannshaus",
    categories: 'Café, Drinks',
    priceLevel: 2,
    rating: 4.5,
    reviews: 123,
    distance: '4.0 km',
    recencyCount: 18,
    image: '/images/Cafe7.jpg',
    listImage: '/images/cafelocal2.jpg',
    friends: [
      { src: '/images/avatarWoman4.jpg', alt: 'Ana' },
      { src: '/images/avatarwomanpeliroja.jpg', alt: 'Lena' },
    ],
    deals: [{ label: '2for1 Coffee' }, { label: '15% OFF Cake' }],
    whyTrending: { returnRate: '+31%', topOccasion: 'Morning ritual', peakTime: 'Mon–Fri 8–10am' },
    pin: { top: '45%', left: '38%', fires: 1 },
  },
  {
    id: 'r4',
    name: 'Brava Burger Co.',
    categories: 'American, Burgers',
    priceLevel: 2,
    rating: 4.8,
    reviews: 312,
    distance: '0.3 km',
    recencyCount: 0,
    image: '/images/burger.jpg',
    listImage: '/images/buerger2.jpg',
    friends: [],
    deals: [{ label: '2for1 Burger' }, { label: '20% OFF Beer' }],
    pin: { top: '38%', left: '72%', fires: 0 },
  },
  {
    id: 'r5',
    name: 'Pasta & Alma',
    categories: 'Italian, Pasta',
    priceLevel: 3,
    rating: 4.7,
    reviews: 254,
    distance: '1.1 km',
    recencyCount: 0,
    image: '/images/pastasPlato.jpg',
    listImage: '/images/pastas2.jpg',
    friends: [],
    deals: [{ label: '2for1 Pasta' }, { label: '25% OFF Wine' }],
    pin: { top: '55%', left: '55%', fires: 0 },
  },
  {
    id: 'r6',
    name: 'Verde Saladbar',
    categories: 'Healthy, Salads',
    priceLevel: 2,
    rating: 4.5,
    reviews: 143,
    distance: '0.5 km',
    recencyCount: 0,
    image: '/images/salads.jpg',
    listImage: '/images/salad3.jpg',
    friends: [],
    deals: [{ label: '10% OFF Bowl' }],
    pin: { top: '62%', left: '28%', fires: 0 },
  },
  {
    id: 'r7',
    name: 'The Breakfast Club',
    categories: 'American, Brunch',
    priceLevel: 2,
    rating: 4.6,
    reviews: 198,
    distance: '1.8 km',
    recencyCount: 0,
    image: '/images/buerger2.jpg',
    listImage: '/images/buerger2.jpg',
    friends: [],
    deals: [{ label: '2for1 Pancakes' }, { label: '15% OFF Brunch' }],
    pin: { top: '18%', left: '42%', fires: 0 },
  },
  {
    id: 'r8',
    name: 'Sakura Sushi Bar',
    categories: 'Japanese, Sushi',
    priceLevel: 3,
    rating: 4.9,
    reviews: 421,
    distance: '2.3 km',
    recencyCount: 0,
    image: '/images/pastas2.jpg',
    listImage: '/images/pastas2.jpg',
    friends: [],
    deals: [{ label: '2for1 Roll' }, { label: '20% OFF Sake' }],
    pin: { top: '32%', left: '12%', fires: 0 },
  },
  {
    id: 'r9',
    name: 'El Taco Loco',
    categories: 'Mexican, Street Food',
    priceLevel: 1,
    rating: 4.7,
    reviews: 289,
    distance: '0.9 km',
    recencyCount: 21,
    image: '/images/burger.jpg',
    listImage: '/images/burger.jpg',
    friends: [{ src: '/images/avatarManColor.jpg', alt: 'Luis' }],
    deals: [{ label: '2for1 Taco' }, { label: '10% OFF Nachos' }],
    whyTrending: { returnRate: '+19%', topOccasion: 'Lunch break', peakTime: 'Mon–Fri 12–2pm' },
    pin: { top: '30%', left: '80%', fires: 2 },
  },
  {
    id: 'r10',
    name: 'The Green Bowl',
    categories: 'Vegan, Healthy',
    priceLevel: 2,
    rating: 4.4,
    reviews: 167,
    distance: '3.1 km',
    recencyCount: 0,
    image: '/images/salad3.jpg',
    listImage: '/images/salad3.jpg',
    friends: [],
    deals: [{ label: '15% OFF Bowl' }],
    pin: { top: '48%', left: '88%', fires: 0 },
  },
  {
    id: 'r11',
    name: 'Biergarten Nord',
    categories: 'German, Beer Garden',
    priceLevel: 2,
    rating: 4.6,
    reviews: 334,
    distance: '1.4 km',
    recencyCount: 14,
    image: '/images/cafeLocal.jpg',
    listImage: '/images/cafeLocal.jpg',
    friends: [{ src: '/images/avatarWoman4.jpg', alt: 'Petra' }],
    deals: [{ label: '2for1 Beer' }, { label: '10% OFF Pretzels' }],
    whyTrending: { returnRate: '+14%', topOccasion: 'After work', peakTime: 'Thu–Fri 5–8pm' },
    pin: { top: '52%', left: '15%', fires: 1 },
  },
  {
    id: 'r12',
    name: 'Pizza Roma',
    categories: 'Italian, Pizza',
    priceLevel: 2,
    rating: 4.5,
    reviews: 276,
    distance: '0.7 km',
    recencyCount: 0,
    image: '/images/pastasPlato.jpg',
    listImage: '/images/pastasPlato.jpg',
    friends: [],
    deals: [{ label: '2for1 Pizza' }, { label: '20% OFF Tiramisu' }],
    pin: { top: '42%', left: '52%', fires: 0 },
  },
  {
    id: 'r13',
    name: 'Dim Sum Palace',
    categories: 'Chinese, Dim Sum',
    priceLevel: 2,
    rating: 4.8,
    reviews: 512,
    distance: '2.7 km',
    recencyCount: 28,
    image: '/images/cafelocal2.jpg',
    listImage: '/images/cafelocal2.jpg',
    friends: [
      { src: '/images/avatarWoman.jpg', alt: 'Mei' },
      { src: '/images/avatarwomanpeliroja.jpg', alt: 'Sara' },
    ],
    deals: [{ label: '2for1 Dim Sum' }, { label: '15% OFF Tea' }],
    whyTrending: { returnRate: '+27%', topOccasion: 'Family lunch', peakTime: 'Sat–Sun 11am–2pm' },
    pin: { top: '15%', left: '68%', fires: 3 },
  },
  {
    id: 'r14',
    name: 'Curry House Hamburg',
    categories: 'Indian, Curry',
    priceLevel: 2,
    rating: 4.6,
    reviews: 203,
    distance: '1.6 km',
    recencyCount: 0,
    image: '/images/Cafe7.jpg',
    listImage: '/images/Cafe7.jpg',
    friends: [],
    deals: [{ label: '2for1 Curry' }, { label: '10% OFF Naan' }],
    pin: { top: '60%', left: '65%', fires: 0 },
  },
  {
    id: 'r15',
    name: 'Le Croissant',
    categories: 'French, Bakery',
    priceLevel: 2,
    rating: 4.7,
    reviews: 189,
    distance: '2.0 km',
    recencyCount: 0,
    image: '/images/cafe2.jpg',
    listImage: '/images/cafe2.jpg',
    friends: [],
    deals: [{ label: '2for1 Croissant' }, { label: '20% OFF Coffee' }],
    pin: { top: '65%', left: '44%', fires: 0 },
  },
  {
    id: 'r16',
    name: 'Ramen Ichiban',
    categories: 'Japanese, Ramen',
    priceLevel: 2,
    rating: 4.8,
    reviews: 347,
    distance: '1.2 km',
    recencyCount: 0,
    image: '/images/postresCafe.jpg',
    listImage: '/images/postresCafe.jpg',
    friends: [],
    deals: [{ label: '2for1 Ramen' }, { label: '15% OFF Gyoza' }],
    pin: { top: '35%', left: '32%', fires: 0 },
  },
]

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
  const [activeFilter, setActiveFilter]   = useState(-1)    // none active by default
  const [activeTab,    setActiveTab]      = useState(2)

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
        />
      )}

      {/* PEEK CARD */}
      {activeRestaurant && (
        <PeekCard
          restaurant={activeRestaurant}
          onClose={() => setSelectedPin(null)}
          onViewDetail={() => router.push(`/restaurant/${activeRestaurant.id}`)}
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
  onTap,
}: {
  restaurant: Restaurant
  isSelected: boolean
  onTap: () => void
}) {
  const fires = r.pin.fires
  // Slightly enlarge when selected for visual feedback
  const W = isSelected ? 30 : 24
  const H = isSelected ? 40 : 32

  return (
    <button
      onClick={onTap}
      style={{
        position: 'absolute', top: r.pin.top, left: r.pin.left,
        transform: 'translate(-50%, -100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        border: 'none', background: 'none', cursor: 'pointer', padding: 0,
        zIndex: isSelected ? 19 : 15,
        transition: 'transform 0.15s ease',
      }}
    >
      {/* Pin + badge container */}
      <div style={{ position: 'relative', width: W, height: H }}>

        {/* ── Teardrop pin body (24×32 from Figma) ── */}
        <svg
          width={W} height={H}
          viewBox="0 0 24 32"
          style={{ display: 'block', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.30))' }}
        >
          {/* Body */}
          <path
            d="M12 0C5.37 0 0 5.37 0 12C0 20.5 12 32 12 32C12 32 24 20.5 24 12C24 5.37 18.63 0 12 0Z"
            fill={isSelected ? '#2d9e58' : '#53f293'}
          />
          {fires === 0 ? (
            /* N logo — regular pin */
            <text
              x="12" y="13"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#1c1d28"
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
function MapPin({ top, left, fires, isSelected, onTap }: {
  top: string; left: string; fires: number; isSelected: boolean; onTap: () => void
}) {
  const W = isSelected ? 30 : 24
  const H = isSelected ? 40 : 32
  return (
    <button
      onClick={onTap}
      style={{
        position: 'absolute', top, left,
        transform: 'translate(-50%, -100%)',
        width: W, height: H, zIndex: isSelected ? 19 : 14,
        border: 'none', background: 'none', cursor: 'pointer', padding: 0,
        transition: 'transform 0.15s ease',
      }}
    >
      <svg width={W} height={H} viewBox="0 0 24 32"
        style={{ display: 'block', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.30))' }}>
        <path
          d="M12 0C5.37 0 0 5.37 0 12C0 20.5 12 32 12 32C12 32 24 20.5 24 12C24 5.37 18.63 0 12 0Z"
          fill={isSelected ? '#2d9e58' : '#53f293'}
        />
        {fires === 0 ? (
          <text x="12" y="13" textAnchor="middle" dominantBaseline="middle"
            fill="#1c1d28" fontSize={isSelected ? '11' : '9'} fontWeight="800" fontFamily="'Poppins', sans-serif">N</text>
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
}: {
  expanded: boolean
  onToggle: () => void
  onRestaurantTap: (id: string) => void
}) {
  return (
    <div
      style={{
        position: 'absolute', bottom: 85, left: 0, right: 0,
        background: '#ffffff',
        borderRadius: '20px 20px 0 0',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
        zIndex: 30,
        height: expanded ? 'calc(100dvh - 250px)' : 120,
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
      <div style={{ padding: '0 16px 80px', display: 'flex', flexDirection: 'column' }}>
        {RESTAURANTS.map((r, i) => (
          <div key={r.id}>
            <div onClick={() => onRestaurantTap(r.id)} style={{ cursor: 'pointer', paddingTop: 8, paddingBottom: 8 }}>
              <ListItem r={r} />
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
function ListItem({ r }: { r: Restaurant }) {
  const hasFriends  = r.friends.length > 0
  const hasRecency  = r.recencyCount > 0

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>

      {/* Image + heart */}
      <div style={{
        position: 'relative', flexShrink: 0,
        width: 108, height: 108, borderRadius: 16, overflow: 'hidden',
      }}>
        <Image
          src={r.listImage} alt={r.name}
          fill priority={r.priority} style={{ objectFit: 'cover' }}
        />
        <button
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute', top: 8, right: 8,
            width: 24, height: 24, borderRadius: 9999,
            background: 'none', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', padding: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, paddingTop: 10 }}>

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
