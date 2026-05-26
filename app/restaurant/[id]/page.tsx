'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
import { RESTAURANT_MAP, type FullDeal, type Review, type SimilarRestaurant } from '@/lib/restaurants'

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function RestaurantDetailPage() {
  const params  = useParams()
  const router  = useRouter()
  const id      = params.id as string
  const detail  = RESTAURANT_MAP[id]
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'about'>('overview')

  if (!detail) {
    return (
      <div style={{ padding: 32, textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>
        <p style={{ color: '#6b7280' }}>Restaurant not found</p>
        <button onClick={() => router.back()} style={{ marginTop: 16, padding: '10px 20px', borderRadius: 9999, background: '#111827', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Go back
        </button>
      </div>
    )
  }

  const showDeals   = activeTab === 'overview'
  const showReviews = activeTab === 'overview' || activeTab === 'reviews'
  const showAbout   = activeTab === 'overview' || activeTab === 'about'
  const showSimilar = activeTab === 'overview'

  return (
    <div style={{ width: '100%', minHeight: '100dvh', background: '#ffffff', overflowY: 'auto', paddingBottom: 40, fontFamily: 'Poppins, sans-serif' }}>

      {/* ── HEADER ───────────────────────────────────────────────────── */}
      <div style={{ padding: '52px 16px 0' }}>
        {/* Back row */}
        <div style={{ display: 'flex', alignItems: 'center', paddingBottom: 12 }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
        </div>

        {/* Name */}
        <div style={{ fontSize: 32, fontWeight: 700, color: '#111827', lineHeight: '38px', marginBottom: 6 }}>
          {detail.name}
        </div>

        {/* Rating · categories · price */}
        <div style={{ fontSize: 13, fontWeight: 500, color: '#6b7280', marginBottom: 3 }}>
          ⭐ {detail.rating} ({detail.reviews}) · {detail.categories} · {'€'.repeat(detail.priceLevel)}
        </div>

        {/* Status */}
        <div style={{ fontSize: 13, fontWeight: 500, color: '#6b7280', marginBottom: 14 }}>
          <span style={{ color: '#0a0a0a', fontWeight: 700 }}>Open</span>
          {' · Closes at '}{detail.closeTime}{' · '}{detail.district}
        </div>

        {/* Action chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'nowrap', overflowX: 'auto' }} className="scrollbar-hide">
          {[
            { label: 'Menu', svg: <path d="M4 6h16M4 12h16M4 18h7"/> },
            { label: 'Location', svg: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14L21 3"/></> },
            { label: 'Save', svg: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/> },
            { label: 'Share', svg: <><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></> },
          ].map((btn) => (
            <button key={btn.label} style={{
              flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '12px 16px', borderRadius: 16,
              border: 'none', background: '#f5f5f5',
              fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {btn.svg}
              </svg>
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── HERO IMAGES ──────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 4, height: 180, paddingLeft: 16, paddingRight: 16 }}>
        <div style={{ flex: 1.5, borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
          <Image src={detail.heroImages[0]} alt={detail.name} fill style={{ objectFit: 'cover' }} sizes="55vw" priority />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
            <Image src={detail.heroImages[1]} alt="" fill style={{ objectFit: 'cover' }} sizes="30vw" />
          </div>
          <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
            <Image src={detail.heroImages[2]} alt="" fill style={{ objectFit: 'cover' }} sizes="30vw" />
          </div>
        </div>
      </div>

      {/* ── TABS ─────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', borderBottom: '1px solid #f3f4f6', marginTop: 16, paddingLeft: 16 }}>
        {(['overview', 'reviews', 'about'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 16px 10px 0',
              border: 'none', background: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: 600,
              color: activeTab === tab ? '#111827' : '#9ca3af',
              borderBottom: activeTab === tab ? '4px solid #11301d' : '4px solid transparent',
              marginBottom: -1, textTransform: 'capitalize',
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ── CONTENT ──────────────────────────────────────────────────── */}
      <div style={{ padding: '0 16px' }}>

        {/* DEALS */}
        {showDeals && (
          <>
            <SectionHeader title="Deals" showInfo />
            {detail.fullDeals.map((deal) => <DealCard key={deal.id} deal={deal} />)}
          </>
        )}

        {/* REVIEWS */}
        {showReviews && (
          <>
            <SectionHeader title="Reviews" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 40, fontWeight: 800, color: '#111827', lineHeight: 1 }}>{detail.rating}</span>
              <StarRating rating={5} size={22} />
            </div>
            {detail.reviewsList.map((review, i) => <ReviewCard key={i} review={review} />)}
            <button style={{
              width: '100%', padding: '13px', marginTop: 4, marginBottom: 8,
              border: '1px solid #e5e7eb', borderRadius: 12,
              background: '#ffffff', fontSize: 14, fontWeight: 600, color: '#374151', cursor: 'pointer',
            }}>
              See all reviews
            </button>
          </>
        )}

        {/* ABOUT */}
        {showAbout && (
          <>
            <SectionHeader title="About" />
            {/* Mini map */}
            <div style={{ height: 160, borderRadius: 12, overflow: 'hidden', marginBottom: 10 }}>
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${detail.mapBbox}&layer=mapnik`}
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                title="Location map"
              />
            </div>
            {/* Map + Call buttons */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <button style={{ flex: 1, padding: '10px', borderRadius: 10, border: '1px solid #e5e7eb', background: '#ffffff', fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <path d="M15 3h6v6M10 14L21 3"/>
                </svg>
                Open on maps
              </button>
              <button style={{ flex: 1, padding: '10px', borderRadius: 10, border: '1px solid #e5e7eb', background: '#ffffff', fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.1 12.3a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.84h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
                </svg>
                Call
              </button>
            </div>
            {/* Address */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#374151', lineHeight: 1.6, flex: 1 }}>
                {detail.address.split('\n').map((line, i) => <div key={i}>{line}</div>)}
              </div>
            </div>
            {/* Hours */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#374151', flex: 1 }}>{detail.hours}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
          </>
        )}

        {/* SIMILAR RESTAURANTS */}
        {showSimilar && (
          <>
            <SectionHeader title="Similar Restaurants" />
            <div
              style={{ display: 'flex', gap: 12, overflowX: 'auto', marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16, paddingBottom: 8 }}
              className="scrollbar-hide"
            >
              {detail.similar.map((r) => <SimilarCard key={r.id} r={r} />)}
            </div>
          </>
        )}

        {/* REPORT ISSUE */}
        <div style={{ marginTop: 32, marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: '#9ca3af' }}>
            🚩 Report issue
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Section Header ─────────────────────────────────────────────────── */
function SectionHeader({ title, showInfo }: { title: string; showInfo?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 14 }}>
      <span style={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>{title}</span>
      {showInfo && (
        <button style={{ background: '#f5f5f5', border: 'none', borderRadius: 12, cursor: 'pointer', padding: '8px 12px', fontSize: 13, fontWeight: 600, color: '#374151' }}>
          Info
        </button>
      )}
    </div>
  )
}

/* ─── Deal Card ──────────────────────────────────────────────────────── */
function DealCard({ deal }: { deal: FullDeal }) {
  const router  = useRouter()
  const isLight = deal.bgColor === '#53f293'
  const txtSub  = isLight ? '#1a5c35' : '#d1fae5'
  const chipBdr = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(83,242,147,0.2)'
  const chipClr = isLight ? '#374151' : '#86efb2'

  function tagEmoji(label: string, icon: string) {
    if (label === 'great taste') return '👌'
    if (label === 'value/quality') return '🤑'
    return icon
  }

  return (
    <div style={{ position: 'relative', background: deal.bgColor, borderRadius: 16, padding: 16, marginBottom: 12 }}>

      {/* Ticket punch circles */}
      <div style={{ position: 'absolute', left: -4, top: 96, width: 8, height: 8, borderRadius: 9999, background: '#ffffff' }} />
      <div style={{ position: 'absolute', right: -4, top: 96, width: 8, height: 8, borderRadius: 9999, background: '#ffffff' }} />

      {/* ── Header row: title + chips ─────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: isLight ? '#0a0a0a' : '#53f293', flex: 1, lineHeight: '26px' }}>
          {!isLight && '⚡ '}{deal.title}
        </div>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0, marginTop: 2 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: chipClr, borderRadius: 9999, padding: '3px 8px', border: `1px solid ${chipBdr}`, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
            </svg>
            Avg. {deal.avgPrice}
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, color: chipClr, borderRadius: 9999, padding: '3px 8px', border: `1px solid ${chipBdr}`, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            {deal.duration}
          </span>
        </div>
      </div>

      {/* Description */}
      <div style={{ fontSize: 13, color: txtSub, lineHeight: 1.55, marginBottom: 12 }}>
        {deal.description}
      </div>

      {/* ── Recency block ─────────────────────────────────────────── */}
      <div style={{ background: isLight ? 'rgba(33,151,80,0.79)' : '#145b32', borderRadius: 8, padding: '16px 8px', marginBottom: 12 }}>

        {/* Fires + popular count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            {Array.from({ length: Math.max(1, deal.fires) }).map((_, i, arr) => (
              <span key={i} style={{ fontSize: 14, lineHeight: 1, marginRight: i < arr.length - 1 ? -5 : 0 }}>🔥</span>
            ))}
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#ffffff' }}>
            Popular this week
          </span>
        </div>

        {/* Avatars + names */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ display: 'flex' }}>
            {deal.users.map((u, i) => (
              <div key={i} style={{ width: 26, height: 26, borderRadius: 9999, border: `2px solid ${isLight ? 'rgba(33,151,80,0.79)' : '#145b32'}`, marginLeft: i > 0 ? -8 : 0, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                <Image src={u.src} alt={u.alt} width={26} height={26} style={{ objectFit: 'cover', width: 26, height: 26, borderRadius: 9999 }} />
              </div>
            ))}
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#ffffff' }}>
            {deal.userNames} <span style={{ fontSize: 12, fontWeight: 400 }}>recommend it</span>
          </span>
        </div>

        {/* Tag chips */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {deal.tags.map((tag, i) => (
            <span key={i} style={{ fontSize: 11, fontWeight: 600, color: '#fff592', borderRadius: 40, padding: '4px 10px', border: '1px solid rgba(254,254,254,0.2)' }}>
              {tagEmoji(tag.label, tag.icon)} {tag.label}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      {deal.booked ? (
        <button
          onClick={() => router.push('/bookings')}
          style={{ width: '100%', padding: '13px', background: 'transparent', borderRadius: 10, border: `1.5px solid ${isLight ? '#11301d' : '#53f293'}`, fontSize: 14, fontWeight: 700, color: isLight ? '#11301d' : '#53f293', cursor: 'pointer' }}
        >
          View booking
        </button>
      ) : (
        <button
          onClick={() => router.push(`/booking-confirmation/${deal.restaurantId}/${deal.id}`)}
          style={{ width: '100%', padding: '13px', background: isLight ? '#11301d' : '#53f293', borderRadius: 10, border: 'none', fontSize: 14, fontWeight: 700, color: isLight ? '#53f293' : '#0a0a0a', cursor: 'pointer' }}
        >
          Book deal
        </button>
      )}
    </div>
  )
}

/* ─── Review Card ────────────────────────────────────────────────────── */
function ReviewCard({ review }: { review: Review }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        {/* Avatar — photo or initial */}
        {review.isInitial ? (
          <div style={{ width: 36, height: 36, borderRadius: 9999, background: review.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#ffffff' }}>{review.initial}</span>
          </div>
        ) : (
          <div style={{ width: 36, height: 36, borderRadius: 9999, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
            <Image src={review.avatar} alt={review.name} width={36} height={36} style={{ objectFit: 'cover', width: 36, height: 36, borderRadius: 9999 }} />
          </div>
        )}
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>{review.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <StarRating rating={review.rating} size={12} />
            <span style={{ fontSize: 11, color: '#9ca3af' }}>· {review.date}</span>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, marginBottom: review.photos.length ? 10 : 8 }}>
        {review.text}
      </div>

      {review.photos.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          {review.photos.map((photo, i) => (
            <div key={i} style={{ width: 120, height: 90, borderRadius: 10, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
              <Image src={photo} alt="" fill style={{ objectFit: 'cover' }} sizes="120px" />
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#f87171" stroke="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#6b7280' }}>{review.likes}</span>
      </div>
    </div>
  )
}

/* ─── Star Rating ────────────────────────────────────────────────────── */
function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: 1 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= rating ? '#fbbf24' : '#e5e7eb'} stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

/* ─── Similar Restaurant Card ────────────────────────────────────────── */
function SimilarCard({ r }: { r: SimilarRestaurant }) {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/restaurant/${r.id}`)}
      style={{ flexShrink: 0, width: 170, borderRadius: 14, overflow: 'hidden', background: '#ffffff', boxShadow: '0 1px 8px rgba(0,0,0,0.1)', cursor: 'pointer' }}
    >
      {/* Photo + badge */}
      <div style={{ position: 'relative', height: 110 }}>
        <Image src={r.photo} alt={r.name} fill style={{ objectFit: 'cover' }} sizes="170px" />
        {/* Redemptions badge */}
        <div style={{ position: 'absolute', top: 8, left: 8, background: '#16a34a', borderRadius: 9999, padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 3 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#ffffff' }}>{r.redemptions} redemptions</span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '10px 10px 12px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 3 }}>{r.name}</div>
        <div style={{ fontSize: 11, fontWeight: 500, color: '#9ca3af', marginBottom: 8 }}>
          ⭐ {r.rating} ({r.reviewCount}) · {r.distance} · {r.categories}
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {r.deals.map((deal, i) => (
            <span key={i} style={{ fontSize: 10, fontWeight: 700, color: '#ffffff', background: '#0d9488', borderRadius: 9999, padding: '3px 7px' }}>
              {deal.discount} {deal.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
