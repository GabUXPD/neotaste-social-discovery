'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { RESTAURANT_MAP } from '@/lib/restaurants'

/* ─── Helpers ─────────────────────────────────────────────────────────── */
function getRedeemDate(): string {
  const d = new Date()
  const daysUntilWed = (3 - d.getDay() + 7) % 7 || 7
  d.setDate(d.getDate() + daysUntilWed)
  const label = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  return `${label} | 8:00–22:00`
}

/* ─── Page ─────────────────────────────────────────────────────────────── */
export default function BookingConfirmationPage() {
  const params       = useParams()
  const router       = useRouter()
  const restaurantId = params.restaurantId as string
  const dealId       = params.dealId as string

  const restaurant = RESTAURANT_MAP[restaurantId]
  const deal       = restaurant?.fullDeals.find((d) => d.id === dealId)
  const redeemDate = getRedeemDate()

  if (!restaurant || !deal) {
    return (
      <div style={{ background: '#0d1a12', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={() => router.push('/discover')} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>
          ← Back to discover
        </button>
      </div>
    )
  }

  return (
    <div style={{
      background: '#0d1a12',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 20px',
      fontFamily: 'Poppins, sans-serif',
    }}>

      {/* ── HEADLINE ─────────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', marginBottom: 28, paddingTop: 48 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#ffffff', lineHeight: 1.35 }}>
          Your{' '}
          <span style={{ color: '#53f293', fontStyle: 'italic', fontWeight: 700 }}>delicious</span>
          {' '}deal at
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#ffffff', lineHeight: 1.35 }}>
          {restaurant.name}
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#ffffff', lineHeight: 1.35 }}>
          awaits!
        </div>
      </div>

      {/* ── CARD ─────────────────────────────────────────────────────── */}
      <div style={{
        width: '100%',
        maxWidth: 390,
        background: '#ffffff',
        borderRadius: 20,
        overflow: 'visible',
        marginBottom: 16,
      }}>
        {/* Hero image + floating icon */}
        <div style={{ position: 'relative' }}>
          <div style={{ height: 160, borderRadius: '20px 20px 0 0', overflow: 'hidden' }}>
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="390px"
              priority
            />
          </div>

          {/* Floating calendar + check icon */}
          <div style={{
            position: 'absolute',
            bottom: -28,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 56, height: 56,
            borderRadius: 9999,
            background: '#ffe645',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            zIndex: 10,
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0a3d1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <div style={{
              position: 'absolute',
              bottom: 0, right: 0,
              width: 18, height: 18,
              borderRadius: 9999,
              background: '#53f293',
              border: '2px solid #ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0a3d1f" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Card content */}
        <div style={{ padding: '44px 18px 20px' }}>

          {/* Restaurant name + address */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#262626', marginBottom: 3 }}>
              {restaurant.name}
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#9ca3af' }}>
              {restaurant.address}
            </div>
          </div>

          {/* Deal box */}
          <div style={{ background: '#ececec', borderRadius: 12, padding: '14px 14px 0' }}>
            {/* Deal title */}
            <div style={{ fontSize: 20, fontWeight: 700, color: '#11301d', marginBottom: 8 }}>
              {deal.title}
            </div>

            {/* Chips row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: '#6b7280' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 12 20 22 4 22 4 12"/>
                  <rect x="2" y="7" width="20" height="5"/>
                  <line x1="12" y1="22" x2="12" y2="7"/>
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
                </svg>
                {deal.avgPrice} benefit
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: '#6b7280' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round">
                  <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                </svg>
                {deal.duration}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: '#6b7280' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                on site & to go
              </span>
            </div>

            {/* Description */}
            <div style={{ fontSize: 12, fontWeight: 400, color: '#6b7280', lineHeight: 1.5, marginBottom: 14 }}>
              {deal.description}
            </div>

            {/* Dashed separator */}
            <div style={{ borderTop: '1px dashed #d1d5db', marginLeft: -14, marginRight: -14 }} />

            {/* Redeem on */}
            <div style={{ padding: '12px 0 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span style={{ fontSize: 11, fontWeight: 500, color: '#9ca3af' }}>Redeem on</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>
                {redeemDate}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ACTION BUTTONS ────────────────────────────────────────────── */}
      <div style={{ width: '100%', maxWidth: 390, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Share with friends */}
        <button className="press-scale" style={{
          width: '100%', padding: '15px',
          background: '#53f293', borderRadius: 16, border: 'none',
          fontSize: 16, fontWeight: 600, color: '#0a0a0a',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          Share with friends
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        </button>

        {/* See my bookings */}
        <button
          onClick={() => router.push(`/bookings?restaurantId=${restaurantId}&dealId=${dealId}`)}
          className="press-scale"
          style={{
            width: '100%', padding: '15px',
            background: '#f5f5f5', borderRadius: 16, border: 'none',
            fontSize: 16, fontWeight: 600, color: '#0a0a0a',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          See my bookings
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>

      {/* ── CONTINUE DISCOVERING ─────────────────────────────────────── */}
      <button
        onClick={() => router.push('/discover')}
        style={{
          marginTop: 20, marginBottom: 32,
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 13, fontWeight: 500, color: '#ffffff',
          opacity: 0.8,
        }}
      >
        Continue discovering
      </button>
    </div>
  )
}
