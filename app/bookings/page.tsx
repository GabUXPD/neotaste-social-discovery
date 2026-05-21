'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function BookingsPage() {
  const router = useRouter()

  return (
    <div style={{
      background: '#fefefe',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Poppins, sans-serif',
      paddingBottom: 88,
    }}>

      {/* Status bar spacing */}
      <div style={{ height: 54 }} />

      {/* ── TITLE ──────────────────────────────────────────────────────── */}
      <h1 style={{
        fontSize: 32,
        fontWeight: 700,
        color: '#0a0a0a',
        margin: 0,
        padding: '0 16px',
        lineHeight: '38px',
      }}>
        Bookings
      </h1>

      {/* ── CONTENT TABS ───────────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginTop: 12,
        paddingLeft: 16,
      }}>
        {/* Upcoming — active */}
        <div style={{
          padding: '16px 0',
          marginRight: 16,
          borderBottom: '3px solid #11301d',
          fontSize: 14,
          fontWeight: 600,
          color: '#0a0a0a',
          lineHeight: '18px',
          cursor: 'pointer',
        }}>
          Upcoming
        </div>
        {/* History — inactive */}
        <div style={{
          padding: '16px 0',
          fontSize: 14,
          fontWeight: 600,
          color: '#737373',
          lineHeight: '18px',
          cursor: 'pointer',
        }}>
          History
        </div>
      </div>

      {/* ── BOOKING CARD ───────────────────────────────────────────────── */}
      <div style={{
        margin: '16px 16px 0',
        background: '#ffffff',
        borderRadius: 24,
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}>

        {/* Hero image */}
        <div style={{ position: 'relative', height: 164, borderRadius: 24, overflow: 'hidden', flexShrink: 0 }}>
          <Image
            src="/images/postres.jpg"
            alt="Capo's Coffee Hafencity"
            fill
            style={{ objectFit: 'cover' }}
            sizes="390px"
            priority
          />
        </div>

        {/* Card content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Name + subtitle row */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#0a0a0a', lineHeight: '30px' }}>
              Capo&apos;s Coffee Hafencity
            </div>

            {/* Deal · dot · Time + chevron */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.7)', whiteSpace: 'nowrap' }}>
                2for1 Coffee-Dessert...
              </span>
              <div style={{ width: 2, height: 2, borderRadius: 9999, background: 'rgba(0,0,0,0.4)', flexShrink: 0 }} />
              <span style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.7)', whiteSpace: 'nowrap' }}>
                Today, 16:00 – 20:00
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </div>

          {/* Separator */}
          <div style={{ height: 1, background: 'rgba(0,0,0,0.05)' }} />

          {/* ── 4 Action buttons ─────────────────────────────────────── */}
          <div style={{ display: 'flex', gap: 4 }}>

            {/* Location */}
            <button style={{
              flex: '1 0 0', minWidth: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 4,
              background: '#f5f5f5', border: 'none', borderRadius: 12,
              padding: '8px 4px', cursor: 'pointer',
            }}>
              {/* Signpost icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h13l4 4-4 4H3V6z"/>
                <path d="M21 18H8l-4-4 4-4"/>
                <line x1="12" y1="2" x2="12" y2="6"/>
                <line x1="12" y1="14" x2="12" y2="22"/>
              </svg>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0a', lineHeight: '16px' }}>Location</span>
            </button>

            {/* Share */}
            <button style={{
              flex: '1 0 0', minWidth: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 4,
              background: '#f5f5f5', border: 'none', borderRadius: 12,
              padding: '8px 4px', cursor: 'pointer',
            }}>
              {/* Arrow up from bracket */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0a', lineHeight: '16px' }}>Share</span>
            </button>

            {/* Cancel */}
            <button style={{
              flex: '1 0 0', minWidth: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 4,
              background: '#f5f5f5', border: 'none', borderRadius: 12,
              padding: '8px 4px', cursor: 'pointer',
              opacity: 0.8,
            }}>
              {/* Ban / circle with slash */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
              </svg>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0a', lineHeight: '16px' }}>Cancel</span>
            </button>

            {/* Support */}
            <button style={{
              flex: '1 0 0', minWidth: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 4,
              background: '#f5f5f5', border: 'none', borderRadius: 12,
              padding: '8px 4px', cursor: 'pointer',
            }}>
              {/* Service bell */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0a', lineHeight: '16px' }}>Support</span>
            </button>
          </div>

          {/* ── Redeem deal ────────────────────────────────────────────── */}
          <button style={{
            width: '100%', padding: 16,
            background: '#53f293', borderRadius: 16, border: 'none',
            fontSize: 16, fontWeight: 600, color: '#0a0a0a',
            cursor: 'pointer', lineHeight: '20px',
          }}>
            Redeem deal
          </button>
        </div>

        {/* ── Share with friends ──────────────────────────────────────── */}
        <button style={{
          width: '100%', padding: 16,
          background: '#f5f5f5', borderRadius: 16, border: 'none',
          fontSize: 16, fontWeight: 600, color: '#0a0a0a',
          cursor: 'pointer', lineHeight: '20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          Share with friends
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        </button>
      </div>

      {/* ── BOTTOM TAB BAR ─────────────────────────────────────────────── */}
      <div style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        padding: '6px 25px 25px',
        zIndex: 40,
      }}>

        {/* Home */}
        <button onClick={() => router.push('/')} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
          background: 'none', border: 'none', borderRadius: 100,
          paddingTop: 6, paddingBottom: 7, paddingLeft: 8, paddingRight: 8,
          cursor: 'pointer', opacity: 0.5,
        }}>
          <div style={{ height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <span style={{ fontSize: 10, fontWeight: 500, color: '#0a0a0a', lineHeight: '12px' }}>Home</span>
        </button>

        {/* Feed */}
        <button onClick={() => router.push('/')} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
          background: 'none', border: 'none', borderRadius: 100,
          paddingTop: 6, paddingBottom: 7, paddingLeft: 8, paddingRight: 8,
          cursor: 'pointer', opacity: 0.5,
        }}>
          <div style={{ height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="10 8 16 12 10 16 10 8"/>
            </svg>
          </div>
          <span style={{ fontSize: 10, fontWeight: 500, color: '#0a0a0a', lineHeight: '12px' }}>Feed</span>
        </button>

        {/* Discover */}
        <button onClick={() => router.push('/discover')} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
          background: 'none', border: 'none', borderRadius: 100,
          paddingTop: 6, paddingBottom: 7, paddingLeft: 8, paddingRight: 8,
          cursor: 'pointer', opacity: 0.5,
        }}>
          <div style={{ height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <span style={{ fontSize: 10, fontWeight: 500, color: '#0a0a0a', lineHeight: '12px' }}>Discover</span>
        </button>

        {/* Bookings — active */}
        <button onClick={() => router.push('/bookings')} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
          background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: 100,
          paddingTop: 6, paddingBottom: 7, paddingLeft: 8, paddingRight: 8,
          cursor: 'pointer', opacity: 1,
        }}>
          <div style={{ height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" ry="3"/>
              <polyline points="9 11 12 14 22 4"/>
            </svg>
          </div>
          <span style={{ fontSize: 10, fontWeight: 500, color: '#0a0a0a', lineHeight: '12px' }}>Bookings</span>
        </button>

        {/* Profile */}
        <button onClick={() => router.push('/')} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
          background: 'none', border: 'none', borderRadius: 100,
          paddingTop: 6, paddingBottom: 7, paddingLeft: 8, paddingRight: 8,
          cursor: 'pointer', opacity: 0.5,
        }}>
          <div style={{ height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <span style={{ fontSize: 10, fontWeight: 500, color: '#0a0a0a', lineHeight: '12px' }}>Profile</span>
        </button>

      </div>
    </div>
  )
}
