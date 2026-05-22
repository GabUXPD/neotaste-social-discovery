'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'

/* ─── Types ──────────────────────────────────────────────────────────── */
interface DealUser { src: string; alt: string }
interface DealTag  { icon: string; label: string }
interface Deal {
  id: string; title: string; avgPrice: string; duration: string
  description: string; popularCount: number; bgColor: string
  users: DealUser[]; userNames: string; tags: DealTag[]; reviewCount: number
  restaurantId?: string; booked?: boolean
}
interface Review {
  name: string; avatar: string; isInitial: boolean; initial: string
  bgColor: string; rating: number; date: string; text: string
  photos: string[]; likes: number
}
interface SimilarRestaurant {
  id: string; name: string; photo: string; redemptions: string
  rating: number; reviewCount: number; distance: string
  categories: string; deals: { discount: string; label: string }[]
}
interface Detail {
  name: string; rating: number; reviewCount: number; categories: string
  priceLevel: string; isOpen: boolean; closeTime: string; district: string
  heroImages: [string, string, string]
  deals: Deal[]; reviews: Review[]
  address: string; hours: string; mapBbox: string
  similar: SimilarRestaurant[]
}

/* ─── Data ───────────────────────────────────────────────────────────── */
const DETAILS: Record<string, Detail> = {
  r1: {
    name: 'Brava Burger Co.', rating: 4.8, reviewCount: 312,
    categories: 'American · Burgers', priceLevel: '€€',
    isOpen: true, closeTime: '22:00', district: 'Schanzenviertel (0.3 km)',
    heroImages: ['/images/burger.jpg', '/images/buerger2.jpg', '/images/burger3.jpg'],
    deals: [
      {
        id: 'd1', title: '2for1 Burger', avgPrice: '€14', duration: 'Limited',
        description: 'Order any two smash burgers and pay only for one. Valid Monday to Thursday at our Schanzenviertel location.',
        popularCount: 31, bgColor: '#11301d',
        users: [{ src: '/images/avatarWoman.jpg', alt: 'S' }, { src: '/images/avatarManColor.jpg', alt: 'M' }],
        userNames: 'Sofia & Mateo',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 24, booked: true,
      },
      {
        id: 'd2', title: '20% OFF Beer', avgPrice: '€6', duration: '30 days',
        description: 'Get 20% off any craft beer with your meal. Choose from our rotating selection of local Hamburg drafts.',
        popularCount: 19, bgColor: '#53f293',
        users: [{ src: '/images/avatarWoman4.jpg', alt: 'A' }, { src: '/images/avatarManBw.jpg', alt: 'R' }],
        userNames: 'Ana & Raul +1',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 18,
      },
    ],
    reviews: [
      {
        name: 'Johanna', avatar: '/images/avatarWoman.jpg', isInitial: false, initial: 'J', bgColor: '',
        rating: 5, date: '3 weeks ago',
        text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.',
        photos: ['/images/burger3.jpg', '/images/burgercoke.jpg'], likes: 16,
      },
      {
        name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
        rating: 2, date: '1 week ago',
        text: 'War super lecker', photos: [], likes: 4,
      },
    ],
    address: 'Schulterblatt 58, 20357 Hamburg\nSchanzenviertel (0.3 km away)',
    hours: 'Open · Closes at 22:00',
    mapBbox: '9.955,53.558,9.975,53.573',
    similar: [
      { id: 'r5', name: 'La Brasa', photo: '/images/platoCarne.jpg', redemptions: '700+', rating: 4.9, reviewCount: 421, distance: '25 m', categories: 'Burgers, Asian', deals: [{ discount: '20% OFF', label: 'Asado' }, { discount: '1 FREE', label: 'Fries' }] },
      { id: 'r3', name: 'Pasta & Alma', photo: '/images/pastasPlato.jpg', redemptions: '200+', rating: 4.7, reviewCount: 254, distance: '80 m', categories: 'Italian, Pasta', deals: [{ discount: '2for1', label: 'Burger' }, { discount: '1 FREE', label: 'FR...' }] },
    ],
  },
  r2: {
    name: 'Café Moderno', rating: 4.6, reviewCount: 198,
    categories: 'Café · Brunch', priceLevel: '€€',
    isOpen: true, closeTime: '18:00', district: 'Eimsbüttel (0.7 km)',
    heroImages: ['/images/cafeLocal.jpg', '/images/cafe2.jpg', '/images/cafe3.jpg'],
    deals: [
      {
        id: 'd1', title: '15% OFF Brunch', avgPrice: '€18', duration: 'Limited',
        description: 'Get 15% off our full brunch set. Includes coffee, juice, eggs and seasonal sides. Weekends only.',
        popularCount: 23, bgColor: '#11301d',
        users: [{ src: '/images/avatarWomanoriente.jpg', alt: 'L' }, { src: '/images/avatarManGlasses.jpg', alt: 'T' }],
        userNames: 'Luna & Tobias',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 21,
      },
    ],
    reviews: [
      {
        name: 'Johanna', avatar: '/images/avatarWomanoriente.jpg', isInitial: false, initial: 'J', bgColor: '',
        rating: 5, date: '3 weeks ago',
        text: 'Best brunch in Hamburg! The deal makes it even more affordable. Love the atmosphere and the coffee. Absolutely coming back every weekend.',
        photos: ['/images/coffe.jpg', '/images/cafelocal2.jpg'], likes: 14,
      },
      {
        name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
        rating: 2, date: '1 week ago', text: 'War super lecker', photos: [], likes: 3,
      },
    ],
    address: 'Eppendorfer Weg 15, 20259 Hamburg\nEimsbüttel (0.7 km away)',
    hours: 'Open · Closes at 18:00',
    mapBbox: '9.955,53.568,9.975,53.583',
    similar: [
      { id: 'r6', name: "Dude's Coffee & Cake", photo: '/images/postres.jpg', redemptions: '350+', rating: 4.4, reviewCount: 97, distance: '30 m', categories: 'Café, Desserts', deals: [{ discount: '1 FREE', label: 'Cake' }] },
      { id: 'r3', name: 'Pasta & Alma', photo: '/images/pastasPlato.jpg', redemptions: '200+', rating: 4.7, reviewCount: 254, distance: '90 m', categories: 'Italian, Pasta', deals: [{ discount: '2for1', label: 'Cake' }] },
    ],
  },
  r3: {
    name: 'Pasta & Alma', rating: 4.7, reviewCount: 254,
    categories: 'Italian · Pasta', priceLevel: '€€€',
    isOpen: true, closeTime: '23:00', district: 'Harvestehude (1.1 km)',
    heroImages: ['/images/pastasPlato.jpg', '/images/pastas2.jpg', '/images/pastas7.jpg'],
    deals: [
      {
        id: 'd1', title: '2for1 Cake', avgPrice: '€16', duration: 'Limited',
        description: 'Order any two coffee and cake combos and pay only for one. Perfect for a midday break with friends.',
        popularCount: 18, bgColor: '#11301d',
        users: [{ src: '/images/avatarWoman4.jpg', alt: 'A' }, { src: '/images/avatarwoman3.jpg', alt: 'C' }],
        userNames: 'Ana & Carla',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 19,
      },
      {
        id: 'd2', title: '25% OFF Wine', avgPrice: '€28', duration: '90 days',
        description: 'Get 25% off any wine bottle with your pasta dinner. Select from our curated Italian wine list.',
        popularCount: 12, bgColor: '#53f293',
        users: [{ src: '/images/avatarManr.jpg', alt: 'P' }, { src: '/images/avatarWomanBW.jpg', alt: 'N' }],
        userNames: 'Pablo & Nina',
        tags: [{ icon: '✓', label: 'great taste' }],
        reviewCount: 14,
      },
    ],
    reviews: [
      {
        name: 'Johanna', avatar: '/images/avatarWoman4.jpg', isInitial: false, initial: 'J', bgColor: '',
        rating: 5, date: '3 weeks ago',
        text: 'Absolutely divine pasta! The deal is incredible value. Romantic atmosphere perfect for date night. Will definitely return.',
        photos: ['/images/pazzas.jpg', '/images/pastasPlato.jpg'], likes: 22,
      },
      {
        name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
        rating: 2, date: '1 week ago', text: 'War super lecker', photos: [], likes: 6,
      },
    ],
    address: 'Mittelweg 45, 20149 Hamburg\nHarvestehude (1.1 km away)',
    hours: 'Open · Closes at 23:00',
    mapBbox: '9.975,53.567,9.995,53.582',
    similar: [
      { id: 'r2', name: 'Café Moderno', photo: '/images/cafeLocal.jpg', redemptions: '500+', rating: 4.6, reviewCount: 198, distance: '25 m', categories: 'Café, Brunch', deals: [{ discount: '15% OFF', label: 'Brunch' }] },
      { id: 'r6', name: "Dude's Coffee & Cake", photo: '/images/postres.jpg', redemptions: '200+', rating: 4.4, reviewCount: 97, distance: '80 m', categories: 'Café, Desserts', deals: [{ discount: '1 FREE', label: 'Cake' }] },
    ],
  },
  r4: {
    name: 'Verde Saladbar', rating: 4.5, reviewCount: 143,
    categories: 'Healthy · Salads', priceLevel: '€',
    isOpen: true, closeTime: '20:00', district: 'Rotherbaum (0.5 km)',
    heroImages: ['/images/salads.jpg', '/images/salad3.jpg', '/images/salad4.jpg'],
    deals: [
      {
        id: 'd1', title: '10% OFF Bowl', avgPrice: '€12', duration: 'Limited',
        description: 'Get 10% off any power bowl with a drink. Mix and match your toppings from our fresh daily selection.',
        popularCount: 12, bgColor: '#11301d',
        users: [{ src: '/images/avatarwomanpeliroja.jpg', alt: 'E' }, { src: '/images/avatarManColor.jpg', alt: 'K' }],
        userNames: 'Emma & Klaus',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 15,
      },
    ],
    reviews: [
      {
        name: 'Johanna', avatar: '/images/avatarwomanpeliroja.jpg', isInitial: false, initial: 'J', bgColor: '',
        rating: 5, date: '3 weeks ago',
        text: 'Best salad bar in town! Fresh ingredients, great variety. The bowl + drink deal is perfect for a quick healthy weekday lunch.',
        photos: ['/images/saladplato.jpg', '/images/platovegetariano.jpg'], likes: 9,
      },
      {
        name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
        rating: 2, date: '1 week ago', text: 'War super lecker', photos: [], likes: 2,
      },
    ],
    address: 'Grindelallee 32, 20146 Hamburg\nRotherbaum (0.5 km away)',
    hours: 'Open · Closes at 20:00',
    mapBbox: '9.982,53.566,10.002,53.581',
    similar: [
      { id: 'r2', name: 'Café Moderno', photo: '/images/cafeLocal.jpg', redemptions: '700+', rating: 4.6, reviewCount: 198, distance: '25 m', categories: 'Café, Brunch', deals: [{ discount: '15% OFF', label: 'Brunch' }, { discount: '1 FREE', label: 'Coffee' }] },
      { id: 'r3', name: 'Pasta & Alma', photo: '/images/pastasPlato.jpg', redemptions: '200+', rating: 4.7, reviewCount: 254, distance: '80 m', categories: 'Italian, Pasta', deals: [{ discount: '2for1', label: 'Cake' }] },
    ],
  },
  r5: {
    name: 'La Brasa', rating: 4.9, reviewCount: 421,
    categories: 'Argentine · Steakhouse', priceLevel: '€€€€',
    isOpen: true, closeTime: '23:30', district: 'Bahrenfeld (1.4 km)',
    heroImages: ['/images/platoCarne.jpg', '/images/platoCarne2.jpg', '/images/carneEnsalada.jpg'],
    deals: [
      {
        id: 'd1', title: '20% OFF Asado', avgPrice: '€35', duration: 'Limited',
        description: 'Get 20% off our signature asado menu for two. Includes mixed grill platter, sides and chimichurri sauce.',
        popularCount: 9, bgColor: '#11301d',
        users: [{ src: '/images/avatarWoman.jpg', alt: 'M' }, { src: '/images/avatarman2.jpg', alt: 'J' }],
        userNames: 'María & Jorge',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 31,
      },
    ],
    reviews: [
      {
        name: 'Johanna', avatar: '/images/avatarWoman.jpg', isInitial: false, initial: 'J', bgColor: '',
        rating: 5, date: '3 weeks ago',
        text: 'The best steak I have ever had in Hamburg! The asado deal is incredible — perfectly cooked meat and outstanding service. Worth every cent.',
        photos: ['/images/BurgerCarnesPastas.jpg', '/images/carnesCafePostres.jpg'], likes: 28,
      },
      {
        name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
        rating: 2, date: '1 week ago', text: 'War super lecker', photos: [], likes: 11,
      },
    ],
    address: 'Bahrenfelder Chaussee 12, 22761 Hamburg\nBahrenfeld (1.4 km away)',
    hours: 'Open · Closes at 23:30',
    mapBbox: '9.920,53.555,9.940,53.570',
    similar: [
      { id: 'r1', name: 'Brava Burger Co.', photo: '/images/burger.jpg', redemptions: '700+', rating: 4.8, reviewCount: 312, distance: '25 m', categories: 'Burgers, Asian', deals: [{ discount: '2for1', label: 'Burger' }, { discount: '1 FREE', label: 'Fries' }] },
      { id: 'r3', name: 'Pasta & Alma', photo: '/images/pastasPlato.jpg', redemptions: '200+', rating: 4.7, reviewCount: 254, distance: '80 m', categories: 'Italian, Pasta', deals: [{ discount: '2for1', label: 'Cake' }] },
    ],
  },
  r6: {
    name: "Dude's Coffee & Cake", rating: 4.4, reviewCount: 97,
    categories: 'Café · Desserts', priceLevel: '€',
    isOpen: true, closeTime: '19:00', district: 'Eimsbüttel (0.9 km)',
    heroImages: ['/images/postres.jpg', '/images/postresCafe.jpg', '/images/Cafe7.jpg'],
    deals: [
      {
        id: 'd1', title: '1 FREE Cake', avgPrice: '€8', duration: '30 days',
        description: 'Get one free cake slice with any coffee order. Choose from our daily baked selection of cakes and tarts.',
        popularCount: 7, bgColor: '#11301d',
        users: [{ src: '/images/avatarwomensmile.jpg', alt: 'J' }, { src: '/images/avatarWomanBW.jpg', alt: 'F' }],
        userNames: 'Jana & Frieda',
        tags: [{ icon: '✓', label: 'great taste' }],
        reviewCount: 12,
      },
    ],
    reviews: [
      {
        name: 'Johanna', avatar: '/images/avatarwomensmile.jpg', isInitial: false, initial: 'J', bgColor: '',
        rating: 5, date: '3 weeks ago',
        text: 'Such a cozy café! The free cake deal is so generous. The lemon tart is absolutely divine. Will become a regular here.',
        photos: ['/images/postres.jpg', '/images/postresCafe.jpg'], likes: 8,
      },
      {
        name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
        rating: 2, date: '1 week ago', text: 'War super lecker', photos: [], likes: 3,
      },
    ],
    address: 'Sillemstr. 22, 20257 Hamburg\nEimsbüttel (0.9 km away)',
    hours: 'Open · Closes at 19:00',
    mapBbox: '9.960,53.570,9.980,53.585',
    similar: [
      { id: 'r2', name: 'Café Moderno', photo: '/images/cafeLocal.jpg', redemptions: '700+', rating: 4.6, reviewCount: 198, distance: '25 m', categories: 'Café, Brunch', deals: [{ discount: '15% OFF', label: 'Brunch' }, { discount: '1 FREE', label: 'Coffee' }] },
      { id: 'r3', name: 'Pasta & Alma', photo: '/images/pastasPlato.jpg', redemptions: '200+', rating: 4.7, reviewCount: 254, distance: '80 m', categories: 'Italian, Pasta', deals: [{ discount: '2for1', label: 'Cake' }] },
    ],
  },
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function RestaurantDetailPage() {
  const params  = useParams()
  const router  = useRouter()
  const id      = params.id as string
  const detail  = DETAILS[id]
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
  const isBooked    = detail.deals.some((d) => d.booked === true)

  return (
    <div style={{ width: '100%', minHeight: '100dvh', background: '#ffffff', overflowY: 'auto', paddingBottom: 40, fontFamily: 'Poppins, sans-serif' }}>

      {/* ── HEADER ───────────────────────────────────────────────────── */}
      <div style={{ padding: '52px 16px 0' }}>
        {/* Back + Booked badge row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12 }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          {isBooked && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#53f293" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" ry="3"/>
                <polyline points="9 11 12 14 22 4"/>
              </svg>
              <span style={{ fontSize: 10, fontWeight: 500, color: '#145b32', lineHeight: '12px' }}>Booked</span>
            </div>
          )}
        </div>

        {/* Name */}
        <div style={{ fontSize: 32, fontWeight: 700, color: '#111827', lineHeight: '38px', marginBottom: 6 }}>
          {detail.name}
        </div>

        {/* Rating · categories · price */}
        <div style={{ fontSize: 13, fontWeight: 500, color: '#6b7280', marginBottom: 3 }}>
          ⭐ {detail.rating} ({detail.reviewCount}) · {detail.categories} · {detail.priceLevel}
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
            {detail.deals.map((deal) => <DealCard key={deal.id} deal={{ ...deal, restaurantId: id }} />)}
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
            {detail.reviews.map((review, i) => <ReviewCard key={i} review={review} />)}
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
function DealCard({ deal }: { deal: Deal }) {
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
          ⚡ {deal.title}
        </div>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0, marginTop: 2 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: chipClr, borderRadius: 9999, padding: '3px 8px', border: `1px solid ${chipBdr}`, display: 'inline-flex', alignItems: 'center' }}>
            Avg. {deal.avgPrice}
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, color: chipClr, borderRadius: 9999, padding: '3px 8px', border: `1px solid ${chipBdr}`, display: 'inline-flex', alignItems: 'center' }}>
            {deal.duration}
          </span>
        </div>
      </div>

      {/* Description */}
      <div style={{ fontSize: 13, color: txtSub, lineHeight: 1.55, marginBottom: 12 }}>
        {deal.description}
      </div>

      {/* ── Recency block ─────────────────────────────────────────── */}
      <div style={{ background: '#145b32', borderRadius: 8, padding: '16px 8px', marginBottom: 12 }}>

        {/* Fires + popular count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <span style={{ fontSize: 14 }}>🔥🔥🔥</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#ffffff' }}>
            Popular this week · <span style={{ fontWeight: 800 }}>{deal.popularCount}</span> reservations
          </span>
        </div>

        {/* Avatars + names + See review */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex' }}>
              {deal.users.map((u, i) => (
                <div key={i} style={{ width: 26, height: 26, borderRadius: 9999, border: '2px solid #145b32', marginLeft: i > 0 ? -8 : 0, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                  <Image src={u.src} alt={u.alt} width={26} height={26} style={{ objectFit: 'cover', width: 26, height: 26, borderRadius: 9999 }} />
                </div>
              ))}
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#ffffff' }}>{deal.userNames}</span>
          </div>
          <button style={{ background: 'rgba(254,254,254,0.05)', border: 'none', borderRadius: 9999, padding: '5px 10px', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)', cursor: 'pointer', flexShrink: 0 }}>
            See review
          </button>
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

      {/* Based on N reviews */}
      <div style={{ fontSize: 11, fontWeight: 500, color: isLight ? '#1a5c35' : '#86efb2', marginBottom: 14 }}>
        Based on {deal.reviewCount} reviews
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
          style={{ width: '100%', padding: '13px', background: 'rgba(83,242,147,0.2)', borderRadius: 10, border: 'none', fontSize: 14, fontWeight: 700, color: '#53f293', cursor: 'pointer' }}
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
