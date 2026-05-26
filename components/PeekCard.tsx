'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Friend {
  src: string
  alt: string
}

interface Deal {
  label: string
}

interface WhyTrending {
  returnRate: string
  topOccasion: string
  peakTime: string
}

interface Restaurant {
  id: string
  name: string
  categories: string
  rating: number
  reviews: number
  distance: string
  recencyCount: number
  image: string
  friends: Friend[]
  deals: Deal[]
  whyTrending?: WhyTrending
  pin: { top: string; left: string; fires: number }
  priceLevel: number
}

interface PeekCardProps {
  restaurant: Restaurant
  onClose: () => void
  onViewDetail: () => void
  isBooked?: boolean
}

export default function PeekCard({ restaurant, onClose, onViewDetail, isBooked = false }: PeekCardProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isLiked,     setIsLiked]     = useState(false)
  const [heartAnim,   setHeartAnim]   = useState(false)
  const hasFriends = restaurant.friends && restaurant.friends.length > 0
  const extraFriends = hasFriends ? Math.max(0, restaurant.friends.length - 2) : 0
  const imgSize = 108

  return (
    /* Compact horizontal card — no backdrop, map stays visible */
    <div
      className="animate-slide-up press-scale"
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
        border: '1px solid #d4d4d4',
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
          onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); setHeartAnim(true) }}
          onAnimationEnd={() => setHeartAnim(false)}
          className={heartAnim ? 'animate-heart-pop' : ''}
          style={{
            position: 'absolute', top: 6, right: 6,
            width: 24, height: 24, borderRadius: 9999,
            background: 'rgba(255,255,255,0.85)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill={isLiked ? '#f43f5e' : 'none'} stroke={isLiked ? '#f43f5e' : '#6b7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* ── Info ──────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>

        {/* Booked badge — top-right corner */}
        {isBooked && (
          <div style={{
            position: 'absolute', top: -8, right: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 1, padding: 4,
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" fill="#53f293"/>
              <polyline points="6 12 10 16 18 8" stroke="#145b32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 10, fontWeight: 500, color: '#145b32', lineHeight: '12px', whiteSpace: 'nowrap' }}>
              Booked
            </span>
          </div>
        )}

        {/* Nombre */}
        <div style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a', lineHeight: '18px', marginBottom: 2 }}>
          {restaurant.name}
        </div>

        {/* Categorías + precio */}
        <div style={{ fontSize: 12, fontWeight: 500, color: '#737373', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span>{restaurant.categories}</span>
          <span style={{ width: 2, height: 2, borderRadius: 9999, background: '#737373', flexShrink: 0, display: 'inline-block' }} />
          <span style={{ fontWeight: 500, fontSize: 12, color: '#0a0a0a' }}>
            <span>{'€'.repeat(restaurant.priceLevel)}</span>
            <span style={{ color: 'rgba(0,0,0,0.5)' }}>{'€'.repeat(4 - restaurant.priceLevel)}</span>
          </span>
        </div>

        {/* Rating + distancia */}
        <div style={{ fontSize: 12, fontWeight: 500, color: '#737373', marginBottom: 8 }}>
          ⭐ {restaurant.rating} ({restaurant.reviews}) · {restaurant.distance}
        </div>

        {/* Recency chip + amigos */}
        {restaurant.recencyCount >= 5 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8, flexWrap: 'nowrap' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <button
                onClick={(e) => { e.stopPropagation(); setShowTooltip(!showTooltip) }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  background: showTooltip ? '#ffe645' : '#fffbc2', borderRadius: 9999,
                  padding: '4px 8px', border: 'none', cursor: 'pointer',
                }}
              >
                {/* Fire emojis with -5px overlap per Figma node 100-5411 */}
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {Array.from({ length: Math.max(1, restaurant.pin.fires) }).map((_, i, arr) => (
                    <span key={i} style={{ fontSize: 11, lineHeight: 1, marginRight: i < arr.length - 1 ? -5 : 0 }}>🔥</span>
                  ))}
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0a', whiteSpace: 'nowrap' }}>
                  {restaurant.recencyCount} booked this week
                </span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              {showTooltip && restaurant.whyTrending && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute', top: 'calc(100% + 6px)', left: 0,
                    background: '#11301d', borderRadius: 12, padding: '12px 14px',
                    width: 240, zIndex: 60,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: -5, left: 16,
                    width: 10, height: 10, background: '#11301d',
                    transform: 'rotate(45deg)', borderRadius: 2,
                  }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#ffe645' }}>Why it&apos;s trending</span>
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
                  <div style={{ fontSize: 11, fontWeight: 500, color: '#ffffff', marginBottom: 10 }}>
                    Popular in your neighborhood
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                    <div>
                      <span style={{ fontSize: 18, fontWeight: 700, color: '#ffffff' }}>{restaurant.recencyCount}</span>
                      <span style={{ fontSize: 10, fontWeight: 500, color: '#86efb2', marginLeft: 4 }}>Booked this</span>
                    </div>
                    <div>
                      <span style={{ fontSize: 18, fontWeight: 700, color: '#53f293' }}>{restaurant.whyTrending.returnRate}</span>
                      <span style={{ fontSize: 10, fontWeight: 500, color: '#86efb2', marginLeft: 4 }}>Growth</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {hasFriends && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
                <div style={{ display: 'flex' }}>
                  {restaurant.friends.slice(0, 2).map((f, i) => (
                    <div key={i} style={{
                      width: 24, height: 24, borderRadius: 9999,
                      border: '2px solid #ffffff',
                      marginLeft: i > 0 ? -8 : 0,
                      overflow: 'hidden', position: 'relative', flexShrink: 0,
                    }}>
                      <Image src={f.src} alt={f.alt} width={24} height={24} priority style={{ objectFit: 'cover', width: 24, height: 24, borderRadius: 9999 }} />
                    </div>
                  ))}
                </div>
                {extraFriends > 0 && (
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#08180f' }}>+{extraFriends}</span>
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
                className="press-scale"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 3,
                  background: '#53f293',
                  borderRadius: 9999, padding: '4px 10px', flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0a' }}>
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

