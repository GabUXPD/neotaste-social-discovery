'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Friend {
  src: string
  alt: string
}

interface Deal {
  label: string
  discount: string
}

interface Restaurant {
  id: string
  name: string
  cuisine: string
  rating: number
  reviews: number
  distance: string
  recencyCount: number
  image: string
  booked?: boolean
  friends?: Friend[]
  deals: Deal[]
  whyTrending?: {
    returnRate: string
    topOccasion: string
    peakTime: string
  }
}

interface PeekCardProps {
  restaurant: Restaurant
  onClose: () => void
  onViewDetail: () => void
}

export default function PeekCard({ restaurant, onClose, onViewDetail }: PeekCardProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const hasFriends = restaurant.friends && restaurant.friends.length > 0
  const extraFriends = hasFriends ? Math.max(0, restaurant.friends!.length - 2) : 0
  const isBooked = restaurant.booked === true
  const imgSize = isBooked ? 108 : 88

  return (
    /* Compact horizontal card — no backdrop, map stays visible */
    <div
      className="animate-slide-up"
      style={{
        position: 'absolute',
        bottom: 77,
        left: 4,
        right: 4,
        background: '#ffffff',
        borderRadius: 16,
        padding: 16,
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        zIndex: 50,
        boxShadow: '0 4px 24px rgba(0,0,0,0.14)',
        border: isBooked ? '1px solid #d4d4d4' : 'none',
      }}
      onClick={onViewDetail}
    >
      {/* ── Foto + corazón + social pill ─────────────────────────────── */}
      <div style={{ position: 'relative', flexShrink: 0, width: imgSize, height: imgSize, borderRadius: 16, overflow: 'hidden' }}>
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          width={imgSize}
          height={imgSize}
          priority
          style={{ objectFit: 'cover', width: imgSize, height: imgSize, display: 'block', borderRadius: 16 }}
        />

        {/* Corazón — esquina superior derecha de la foto */}
        <button
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute', top: 6, right: 6,
            width: 24, height: 24, borderRadius: 9999,
            background: 'rgba(255,255,255,0.85)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* ── Info ──────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Nombre + Booked badge */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 2 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a', lineHeight: '18px' }}>
            {restaurant.name}
          </div>
          {/* Booked badge */}
          {isBooked && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, flexShrink: 0, marginLeft: 8 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#53f293" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" ry="3"/>
                <polyline points="9 11 12 14 22 4"/>
              </svg>
              <span style={{ fontSize: 10, fontWeight: 500, color: '#145b32', lineHeight: '12px' }}>Booked</span>
            </div>
          )}
        </div>

        {/* Categoría */}
        <div style={{ fontSize: 12, fontWeight: 500, color: '#737373', marginBottom: 3 }}>
          {restaurant.cuisine}
        </div>

        {/* Rating + distancia */}
        <div style={{ fontSize: 12, fontWeight: 500, color: '#737373', marginBottom: 8 }}>
          ⭐ {restaurant.rating} ({restaurant.reviews}) · {restaurant.distance}
        </div>

        {/* Fila: recency chip + avatars de amigos */}
        {restaurant.recencyCount >= 5 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, flexWrap: 'nowrap' }}>

            {/* Chip recency con caret-down */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowTooltip(!showTooltip)
                }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  background: isBooked ? '#fffbc2' : '#ffe645', borderRadius: 9999,
                  padding: '4px 8px', border: 'none', cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
                  <span style={{ fontSize: 12, lineHeight: 1 }}>🔥</span>
                  <span style={{ fontSize: 12, lineHeight: 1 }}>🔥</span>
                </span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#0a0a0a', whiteSpace: 'nowrap' }}>
                  {restaurant.recencyCount} booked this week
                </span>
                {/* Caret-down */}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              {/* Tooltip "Why it's trending" — diseño frame 104:4478 */}
              {showTooltip && restaurant.whyTrending && (
                <div
                  className="animate-scale-in"
                  style={{
                    position: 'absolute', top: 'calc(100% + 6px)', left: 0,
                    background: '#11301d', borderRadius: 12, padding: '12px 14px',
                    width: 240, zIndex: 60,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  }}
                >
                  {/* Flecha hacia arriba */}
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
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                    <div>
                      <span style={{ fontSize: 18, fontWeight: 700, color: '#ffffff' }}>
                        {restaurant.recencyCount}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 500, color: '#86efb2', marginLeft: 4 }}>
                        Booked this week
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: 18, fontWeight: 700, color: '#53f293' }}>
                        {restaurant.whyTrending.returnRate}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 500, color: '#86efb2', marginLeft: 4 }}>
                        Growth
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Avatars de amigos — solo si hay amigos */}
            {hasFriends && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                {/* Stack de avatares (máx 2 visibles) */}
                <div style={{ display: 'flex' }}>
                  {restaurant.friends!.slice(0, 2).map((f, i) => (
                    <div
                      key={i}
                      style={{
                        width: 22, height: 22, borderRadius: 9999,
                        border: '2px solid #ffffff',
                        marginLeft: i > 0 ? -7 : 0,
                        overflow: 'hidden', position: 'relative', flexShrink: 0,
                      }}
                    >
                      <Image src={f.src} alt={f.alt} width={22} height={22} priority style={{ objectFit: 'cover', width: 22, height: 22, borderRadius: 9999 }} />
                    </div>
                  ))}
                </div>
                {/* +N contador */}
                {extraFriends > 0 && (
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280' }}>
                    +{extraFriends}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Deal chips — teal sólido */}
        {restaurant.deals.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {restaurant.deals.map((deal, i) => (
              <div
                key={i}
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 3,
                  background: '#53f293',
                  borderRadius: 9999, padding: '4px 10px', flexShrink: 0,
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

