/* ─── Shared restaurant data — single source of truth ───────────────────────
   Discover page uses: id, name, categories, priceLevel, rating, reviews,
     distance, recencyCount, image, listImage, friends, deals, whyTrending, pin
   Detail page uses:  name, categories, priceLevel, rating, reviews, isOpen,
     closeTime, district, heroImages, fullDeals, reviewsList, address, hours,
     mapBbox, similar
────────────────────────────────────────────────────────────────────────────── */

export interface Friend       { src: string; alt: string }
export interface DealChip     { label: string }
export interface WhyTrending  { returnRate: string; topOccasion: string; peakTime: string }
export interface DealUser     { src: string; alt: string }
export interface DealTag      { icon: string; label: string }
export interface FullDeal {
  id: string; title: string; avgPrice: string; duration: string
  description: string; popularCount: number; bgColor: string
  users: DealUser[]; userNames: string; tags: DealTag[]; reviewCount: number
  restaurantId: string; booked?: boolean
  avgRating: number; trustedPartner: boolean; fires: number
}
export interface Review {
  name: string; avatar: string; isInitial: boolean; initial: string
  bgColor: string; rating: number; date: string; text: string
  photos: string[]; likes: number
  tags?: { icon: string; label: string }[]
}
export interface SimilarRestaurant {
  id: string; name: string; photo: string; redemptions: string
  rating: number; reviewCount: number; distance: string
  categories: string; deals: { discount: string; label: string }[]
}
export interface Restaurant {
  // ── Discover ──────────────────────────────────────────────────────────────
  id: string
  name: string
  categories: string
  priceLevel: number          // 1–4 → '€'.repeat(n)
  rating: number
  reviews: number
  distance: string
  recencyCount: number
  image: string               // PeekCard / pin hero
  listImage: string           // map list row
  friends: Friend[]
  deals: DealChip[]           // chip labels (discover)
  whyTrending?: WhyTrending
  pin: { top: string; left: string; fires: number }
  priority?: boolean
  // ── Detail ────────────────────────────────────────────────────────────────
  isOpen: boolean
  closeTime: string
  district: string
  heroImages: [string, string, string]
  fullDeals: FullDeal[]
  reviewsList: Review[]
  address: string
  hours: string
  mapBbox: string
  similar: SimilarRestaurant[]
}

/* ─── Per-restaurant second reviews (Tung Anh — unique, English, rating ≥ 4) */
const tungAnhR1: Review = {
  name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
  rating: 4, date: '1 week ago',
  text: 'Great spot for afternoon coffee. The cake selection changes weekly and it\'s always fresh. Will come back.',
  photos: [], likes: 4, tags: [{ icon: '👌', label: 'great taste' }],
}
const tungAnhR2: Review = {
  name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
  rating: 4, date: '1 week ago',
  text: 'Love the harbour views and relaxed atmosphere. Coffee is consistently good every visit.',
  photos: [], likes: 5, tags: [{ icon: '👌', label: 'great taste' }],
}
const tungAnhR3: Review = {
  name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
  rating: 4, date: '2 weeks ago',
  text: 'Unique spot inside a historic building. The 2for1 deal makes it even better. Atmosphere is one of a kind.',
  photos: [], likes: 6, tags: [{ icon: '👌', label: 'great taste' }],
}
const tungAnhR4: Review = {
  name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
  rating: 5, date: '3 days ago',
  text: 'The smash burgers are addictive — crispy edges, juicy centre. The beer deal pairs perfectly with any order.',
  photos: [], likes: 9, tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
}
const tungAnhR5: Review = {
  name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
  rating: 4, date: '1 week ago',
  text: 'Really solid Italian food in Hamburg. Fresh handmade pasta makes a noticeable difference. Perfect for a weeknight dinner.',
  photos: [], likes: 7, tags: [{ icon: '👌', label: 'great taste' }],
}
const tungAnhR6: Review = {
  name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
  rating: 4, date: '5 days ago',
  text: 'Best quick lunch option nearby. Bowls are filling and fresh, staff is always friendly.',
  photos: [], likes: 3, tags: [{ icon: '👌', label: 'great taste' }],
}
const tungAnhR7: Review = {
  name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
  rating: 4, date: '4 days ago',
  text: 'Cosy brunch atmosphere and fluffy pancakes. The 2for1 deal makes weekend mornings much better.',
  photos: [], likes: 5, tags: [{ icon: '👌', label: 'great taste' }],
}
const tungAnhR8: Review = {
  name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
  rating: 5, date: '2 weeks ago',
  text: 'Impressive sushi quality for Hamburg. The chef\'s selection never disappoints — fresh fish, perfect rice temperature.',
  photos: [], likes: 11, tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
}
const tungAnhR9: Review = {
  name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
  rating: 4, date: '1 week ago',
  text: 'Solid tacos and great value. The house-made salsa verde is fresh and the portions are generous.',
  photos: [], likes: 6, tags: [{ icon: '👌', label: 'great taste' }],
}
const tungAnhR10: Review = {
  name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
  rating: 4, date: '3 weeks ago',
  text: 'Good plant-based options with fresh, local ingredients. Portion sizes are generous for the price.',
  photos: [], likes: 4, tags: [{ icon: '👌', label: 'great taste' }],
}
const tungAnhR11: Review = {
  name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
  rating: 4, date: '6 days ago',
  text: 'Perfect after-work spot. Big outdoor space, solid beer selection, and the 2for1 deal is a great bonus.',
  photos: [], likes: 8, tags: [{ icon: '👌', label: 'great taste' }],
}
const tungAnhR12: Review = {
  name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
  rating: 4, date: '2 weeks ago',
  text: 'The sourdough crust is excellent — proper Neapolitan style, not easy to find in Hamburg. Toppings are generous.',
  photos: [], likes: 7, tags: [{ icon: '👌', label: 'great taste' }],
}
const tungAnhR13: Review = {
  name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
  rating: 5, date: '1 week ago',
  text: 'Exceptional dim sum. Har gow wrappers are paper thin and the filling is generous. Best in the city by far.',
  photos: [], likes: 14, tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
}
const tungAnhR14: Review = {
  name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
  rating: 4, date: '2 weeks ago',
  text: 'Authentic spice blends and generous portions. The naan is baked fresh to order — warm and perfectly soft.',
  photos: [], likes: 6, tags: [{ icon: '👌', label: 'great taste' }],
}
const tungAnhR15: Review = {
  name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
  rating: 5, date: '3 days ago',
  text: 'Finally proper laminated pastry in Hamburg. Comes out warm and perfectly flaky. Worth every detour.',
  photos: [], likes: 8, tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
}
const tungAnhR16: Review = {
  name: 'Tung Anh', avatar: '', isInitial: true, initial: 'T', bgColor: '#0d9488',
  rating: 4, date: '5 days ago',
  text: 'Rich, deeply flavoured broth. The 18-hour tonkotsu is worth the wait — layers of flavour in every spoonful.',
  photos: [], likes: 10, tags: [{ icon: '👌', label: 'great taste' }],
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
export const RESTAURANTS: Restaurant[] = [
  /* ── r1 · Dude's Coffee & Cake ──────────────────────────────────────── */
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
      { src: '/images/avatarWoman.jpg',      alt: 'Sofia' },
      { src: '/images/avatarManColor.jpg',   alt: 'Mateo' },
      { src: '/images/avatarWoman4.jpg',     alt: 'Ana' },
      { src: '/images/avatarManGlasses.jpg', alt: 'Tom' },
    ],
    deals: [{ label: '2for1 Beverage' }, { label: '2for1 Espresso' }],
    whyTrending: { returnRate: '+23%', topOccasion: 'Date night', peakTime: 'Fri–Sat 8–10pm' },
    pin: { top: '28%', left: '22%', fires: 3 },
    priority: true,
    isOpen: true, closeTime: '19:00', district: 'Eimsbüttel (4.5 km)',
    heroImages: ['/images/postresCafe.jpg', '/images/postres.jpg', '/images/Cafe7.jpg'],
    fullDeals: [
      {
        id: 'd1', title: '2for1 Beverage', avgPrice: '€9', duration: '30 days',
        description: 'Order any two beverages and pay only for one. Valid all day Monday to Friday at our Eimsbüttel location.',
        popularCount: 31, bgColor: '#11301d', restaurantId: 'r1',
        users: [{ src: '/images/avatarWoman.jpg', alt: 'S' }, { src: '/images/avatarManColor.jpg', alt: 'M' }],
        userNames: 'Sofia & Mateo',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 24, avgRating: 4.9, trustedPartner: true, fires: 3,
      },
      {
        id: 'd2', title: '2for1 Espresso', avgPrice: '€5', duration: 'Limited',
        description: 'Get two espressos for the price of one. Perfect for a morning boost with your favourite pastry.',
        popularCount: 18, bgColor: '#53f293', restaurantId: 'r1',
        users: [{ src: '/images/avatarWoman4.jpg', alt: 'A' }, { src: '/images/avatarManGlasses.jpg', alt: 'T' }],
        userNames: 'Ana & Tom',
        tags: [{ icon: '✓', label: 'great taste' }],
        reviewCount: 12, avgRating: 4.8, trustedPartner: true, fires: 2,
      },
    ],
    reviewsList: [
      {
        name: 'Johanna', avatar: '/images/avatarwomensmile.jpg', isInitial: false, initial: 'J', bgColor: '',
        rating: 5, date: '3 weeks ago',
        text: 'Such a cozy café! The free cake deal is so generous. The lemon tart is absolutely divine. Will become a regular here.',
        photos: ['/images/postres.jpg', '/images/postresCafe.jpg'], likes: 8,
        tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
      },
      tungAnhR1,
    ],
    address: 'Sillemstr. 22, 20257 Hamburg\nEimsbüttel (4.5 km away)',
    hours: 'Open · Closes at 19:00',
    mapBbox: '9.960,53.570,9.980,53.585',
    similar: [
      { id: 'r2', name: "Capo's Coffee Hafencity", photo: '/images/cafeLocal.jpg', redemptions: '350+', rating: 4.8, reviewCount: 143, distance: '30 m', categories: 'Breakfast, Coffee', deals: [{ discount: '2for1', label: 'Coffee & Cake' }] },
      { id: 'r3', name: 'Camping Coffee im Kaufmannshaus', photo: '/images/Cafe7.jpg', redemptions: '200+', rating: 4.5, reviewCount: 123, distance: '80 m', categories: 'Café, Drinks', deals: [{ discount: '2for1', label: 'Coffee' }] },
    ],
  },

  /* ── r2 · Capo's Coffee Hafencity ───────────────────────────────────── */
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
    isOpen: true, closeTime: '18:00', district: 'HafenCity (4.5 km)',
    heroImages: ['/images/cafeLocal.jpg', '/images/cafe2.jpg', '/images/cafe3.jpg'],
    fullDeals: [
      {
        id: 'd1', title: '2for1 Coffee & Cake', avgPrice: '€12', duration: 'Limited',
        description: 'Get two coffee and cake combos for the price of one. Choose from our daily baked selection and specialty coffee menu.',
        popularCount: 23, bgColor: '#11301d', restaurantId: 'r2',
        users: [{ src: '/images/avatarWomanoriente.jpg', alt: 'L' }, { src: '/images/avatarManGlasses.jpg', alt: 'T' }],
        userNames: 'Luna & Tobias',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 21, avgRating: 4.8, trustedPartner: true, fires: 2,
      },
      {
        id: 'd2', title: '2for1 Latte', avgPrice: '€7', duration: '30 days',
        description: 'Order two lattes and pay only for one. Available with oat, almond or regular milk. Best enjoyed with our homemade pastries.',
        popularCount: 14, bgColor: '#53f293', restaurantId: 'r2',
        users: [{ src: '/images/avatarWoman4.jpg', alt: 'A' }, { src: '/images/avatarwomanpeliroja.jpg', alt: 'E' }],
        userNames: 'Ana & Emma',
        tags: [{ icon: '✓', label: 'great taste' }],
        reviewCount: 11, avgRating: 4.7, trustedPartner: true, fires: 1,
      },
    ],
    reviewsList: [
      {
        name: 'Johanna', avatar: '/images/avatarWomanoriente.jpg', isInitial: false, initial: 'J', bgColor: '',
        rating: 5, date: '3 weeks ago',
        text: 'Best coffee in HafenCity! The deal makes it even more affordable. Love the harbour view and the vibe. Absolutely coming back every weekend.',
        photos: ['/images/coffe.jpg', '/images/cafelocal2.jpg'], likes: 14,
        tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
      },
      tungAnhR2,
    ],
    address: 'Am Kaiserkai 10, 20457 Hamburg\nHafenCity (4.5 km away)',
    hours: 'Open · Closes at 18:00',
    mapBbox: '9.998,53.540,10.018,53.555',
    similar: [
      { id: 'r1', name: "Dude's Coffee & Cake", photo: '/images/postresCafe.jpg', redemptions: '250+', rating: 4.8, reviewCount: 143, distance: '40 m', categories: 'Café, Desserts', deals: [{ discount: '2for1', label: 'Beverage' }] },
      { id: 'r3', name: 'Camping Coffee im Kaufmannshaus', photo: '/images/Cafe7.jpg', redemptions: '180+', rating: 4.5, reviewCount: 123, distance: '70 m', categories: 'Café, Drinks', deals: [{ discount: '2for1', label: 'Coffee' }] },
    ],
  },

  /* ── r3 · Camping Coffee im Kaufmannshaus ───────────────────────────── */
  {
    id: 'r3',
    name: 'Camping Coffee im Kaufmannshaus',
    categories: 'Café, Drinks',
    priceLevel: 2,
    rating: 4.5,
    reviews: 123,
    distance: '4.0 km',
    recencyCount: 18,
    image: '/images/Cafe7.jpg',
    listImage: '/images/cafelocal2.jpg',
    friends: [
      { src: '/images/avatarWoman4.jpg',        alt: 'Ana' },
      { src: '/images/avatarwomanpeliroja.jpg',  alt: 'Lena' },
    ],
    deals: [{ label: '2for1 Coffee' }, { label: '15% OFF Cake' }],
    whyTrending: { returnRate: '+31%', topOccasion: 'Morning ritual', peakTime: 'Mon–Fri 8–10am' },
    pin: { top: '45%', left: '38%', fires: 1 },
    isOpen: true, closeTime: '17:00', district: 'Altstadt (4.0 km)',
    heroImages: ['/images/Cafe7.jpg', '/images/cafelocal2.jpg', '/images/cafeLocal.jpg'],
    fullDeals: [
      {
        id: 'd1', title: '2for1 Coffee', avgPrice: '€6', duration: 'Limited',
        description: 'Two coffees for the price of one in our unique historic building location. Any size, any blend, all day long.',
        popularCount: 18, bgColor: '#11301d', restaurantId: 'r3',
        users: [{ src: '/images/avatarWoman4.jpg', alt: 'A' }, { src: '/images/avatarwomanpeliroja.jpg', alt: 'L' }],
        userNames: 'Ana & Lena',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 19, avgRating: 4.6, trustedPartner: true, fires: 1,
      },
      {
        id: 'd2', title: '15% OFF Cake', avgPrice: '€5', duration: '14 days',
        description: 'Get 15% off any cake or pastry with your drink order. Freshly baked daily in our open kitchen.',
        popularCount: 9, bgColor: '#53f293', restaurantId: 'r3',
        users: [{ src: '/images/avatarWomanoriente.jpg', alt: 'M' }, { src: '/images/avatarManColor.jpg', alt: 'K' }],
        userNames: 'Maria & Klaus',
        tags: [{ icon: '✓', label: 'great taste' }],
        reviewCount: 8, avgRating: 4.4, trustedPartner: false, fires: 1,
      },
    ],
    reviewsList: [
      {
        name: 'Ana', avatar: '/images/avatarWoman4.jpg', isInitial: false, initial: 'A', bgColor: '',
        rating: 5, date: '2 weeks ago',
        text: 'Love the unique camping atmosphere inside a historic building. The coffee is excellent and the 2for1 deal makes it a must-visit every morning!',
        photos: ['/images/Cafe7.jpg', '/images/cafelocal2.jpg'], likes: 11,
        tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
      },
      tungAnhR3,
    ],
    address: 'Adolphsplatz 1, 20457 Hamburg\nAltstadt (4.0 km away)',
    hours: 'Open · Closes at 17:00',
    mapBbox: '9.993,53.548,10.013,53.563',
    similar: [
      { id: 'r1', name: "Dude's Coffee & Cake", photo: '/images/postresCafe.jpg', redemptions: '300+', rating: 4.8, reviewCount: 143, distance: '50 m', categories: 'Café, Desserts', deals: [{ discount: '2for1', label: 'Beverage' }] },
      { id: 'r2', name: "Capo's Coffee Hafencity", photo: '/images/cafeLocal.jpg', redemptions: '200+', rating: 4.8, reviewCount: 143, distance: '90 m', categories: 'Breakfast, Coffee', deals: [{ discount: '2for1', label: 'Latte' }] },
    ],
  },

  /* ── r4 · Brava Burger Co. ───────────────────────────────────────────── */
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
    isOpen: true, closeTime: '22:00', district: 'Schanzenviertel (0.3 km)',
    heroImages: ['/images/burger.jpg', '/images/buerger2.jpg', '/images/burger3.jpg'],
    fullDeals: [
      {
        id: 'd1', title: '2for1 Burger', avgPrice: '€14', duration: 'Limited',
        description: 'Order any two smash burgers and pay only for one. Valid Monday to Thursday at our Schanzenviertel location.',
        popularCount: 31, bgColor: '#11301d', restaurantId: 'r4',
        users: [{ src: '/images/avatarWoman.jpg', alt: 'S' }, { src: '/images/avatarManColor.jpg', alt: 'M' }],
        userNames: 'Sofia & Mateo',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 24, avgRating: 4.9, trustedPartner: true, fires: 2,
      },
      {
        id: 'd2', title: '20% OFF Beer', avgPrice: '€6', duration: '30 days',
        description: 'Get 20% off any craft beer with your meal. Choose from our rotating selection of local Hamburg drafts.',
        popularCount: 19, bgColor: '#53f293', restaurantId: 'r4',
        users: [{ src: '/images/avatarWoman4.jpg', alt: 'A' }, { src: '/images/avatarManBw.jpg', alt: 'R' }],
        userNames: 'Ana & Raul +1',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 18, avgRating: 4.7, trustedPartner: true, fires: 3,
      },
    ],
    reviewsList: [
      {
        name: 'Johanna', avatar: '/images/avatarWoman.jpg', isInitial: false, initial: 'J', bgColor: '',
        rating: 5, date: '3 weeks ago',
        text: 'Best smash burger in Hamburg! The 2for1 deal is incredible value. Crispy edges, juicy patty, perfectly toasted bun. Will definitely return.',
        photos: ['/images/burger3.jpg', '/images/burgercoke.jpg'], likes: 16,
        tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
      },
      tungAnhR4,
    ],
    address: 'Schulterblatt 58, 20357 Hamburg\nSchanzenviertel (0.3 km away)',
    hours: 'Open · Closes at 22:00',
    mapBbox: '9.955,53.558,9.975,53.573',
    similar: [
      { id: 'r9', name: 'El Taco Loco', photo: '/images/burger.jpg', redemptions: '400+', rating: 4.7, reviewCount: 289, distance: '25 m', categories: 'Mexican, Street Food', deals: [{ discount: '2for1', label: 'Taco' }] },
      { id: 'r7', name: 'The Breakfast Club', photo: '/images/buerger2.jpg', redemptions: '300+', rating: 4.6, reviewCount: 198, distance: '80 m', categories: 'American, Brunch', deals: [{ discount: '2for1', label: 'Pancakes' }] },
    ],
  },

  /* ── r5 · Pasta & Alma ───────────────────────────────────────────────── */
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
    isOpen: true, closeTime: '23:00', district: 'Harvestehude (1.1 km)',
    heroImages: ['/images/pastasPlato.jpg', '/images/pastas2.jpg', '/images/pastas7.jpg'],
    fullDeals: [
      {
        id: 'd1', title: '2for1 Pasta', avgPrice: '€16', duration: 'Limited',
        description: 'Order any two pasta dishes and pay only for one. Fresh handmade pasta, cooked to order. Perfect for a romantic dinner.',
        popularCount: 18, bgColor: '#11301d', restaurantId: 'r5',
        users: [{ src: '/images/avatarWoman4.jpg', alt: 'A' }, { src: '/images/avatarwoman3.jpg', alt: 'C' }],
        userNames: 'Ana & Carla',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 19, avgRating: 4.7, trustedPartner: true, fires: 2,
      },
      {
        id: 'd2', title: '25% OFF Wine', avgPrice: '€28', duration: '90 days',
        description: 'Get 25% off any wine bottle with your pasta dinner. Select from our curated Italian wine list.',
        popularCount: 12, bgColor: '#53f293', restaurantId: 'r5',
        users: [{ src: '/images/avatarManr.jpg', alt: 'P' }, { src: '/images/avatarWomanBW.jpg', alt: 'N' }],
        userNames: 'Pablo & Nina',
        tags: [{ icon: '✓', label: 'great taste' }],
        reviewCount: 14, avgRating: 4.6, trustedPartner: false, fires: 1,
      },
    ],
    reviewsList: [
      {
        name: 'Johanna', avatar: '/images/avatarWoman4.jpg', isInitial: false, initial: 'J', bgColor: '',
        rating: 5, date: '3 weeks ago',
        text: 'Absolutely divine pasta! The deal is incredible value. Romantic atmosphere perfect for date night. Will definitely return.',
        photos: ['/images/pazzas.jpg', '/images/pastasPlato.jpg'], likes: 22,
        tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
      },
      tungAnhR5,
    ],
    address: 'Mittelweg 45, 20149 Hamburg\nHarvestehude (1.1 km away)',
    hours: 'Open · Closes at 23:00',
    mapBbox: '9.975,53.567,9.995,53.582',
    similar: [
      { id: 'r12', name: 'Pizza Roma', photo: '/images/pastasPlato.jpg', redemptions: '400+', rating: 4.5, reviewCount: 276, distance: '25 m', categories: 'Italian, Pizza', deals: [{ discount: '2for1', label: 'Pizza' }] },
      { id: 'r8', name: 'Sakura Sushi Bar', photo: '/images/pastas2.jpg', redemptions: '300+', rating: 4.9, reviewCount: 421, distance: '80 m', categories: 'Japanese, Sushi', deals: [{ discount: '2for1', label: 'Roll' }] },
    ],
  },

  /* ── r6 · Verde Saladbar ─────────────────────────────────────────────── */
  {
    id: 'r6',
    name: 'Verde Saladbar',
    categories: 'Healthy, Salads',
    priceLevel: 1,
    rating: 4.5,
    reviews: 143,
    distance: '0.5 km',
    recencyCount: 0,
    image: '/images/salads.jpg',
    listImage: '/images/salad3.jpg',
    friends: [],
    deals: [{ label: '10% OFF Bowl' }],
    pin: { top: '62%', left: '28%', fires: 0 },
    isOpen: true, closeTime: '20:00', district: 'Rotherbaum (0.5 km)',
    heroImages: ['/images/salads.jpg', '/images/salad3.jpg', '/images/salad4.jpg'],
    fullDeals: [
      {
        id: 'd1', title: '10% OFF Bowl', avgPrice: '€12', duration: 'Limited',
        description: 'Get 10% off any power bowl with a drink. Mix and match your toppings from our fresh daily selection.',
        popularCount: 12, bgColor: '#11301d', restaurantId: 'r6',
        users: [{ src: '/images/avatarwomanpeliroja.jpg', alt: 'E' }, { src: '/images/avatarManColor.jpg', alt: 'K' }],
        userNames: 'Emma & Klaus',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 15, avgRating: 4.5, trustedPartner: true, fires: 1,
      },
    ],
    reviewsList: [
      {
        name: 'Johanna', avatar: '/images/avatarwomanpeliroja.jpg', isInitial: false, initial: 'J', bgColor: '',
        rating: 5, date: '3 weeks ago',
        text: 'Best salad bar in town! Fresh ingredients, great variety. The bowl + drink deal is perfect for a quick healthy weekday lunch.',
        photos: ['/images/saladplato.jpg', '/images/platovegetariano.jpg'], likes: 9,
        tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
      },
      tungAnhR6,
    ],
    address: 'Grindelallee 32, 20146 Hamburg\nRotherbaum (0.5 km away)',
    hours: 'Open · Closes at 20:00',
    mapBbox: '9.982,53.566,10.002,53.581',
    similar: [
      { id: 'r10', name: 'The Green Bowl', photo: '/images/salad3.jpg', redemptions: '250+', rating: 4.4, reviewCount: 167, distance: '30 m', categories: 'Vegan, Healthy', deals: [{ discount: '15% OFF', label: 'Bowl' }] },
      { id: 'r5', name: 'Pasta & Alma', photo: '/images/pastasPlato.jpg', redemptions: '200+', rating: 4.7, reviewCount: 254, distance: '80 m', categories: 'Italian, Pasta', deals: [{ discount: '2for1', label: 'Pasta' }] },
    ],
  },

  /* ── r7 · The Breakfast Club ─────────────────────────────────────────── */
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
    isOpen: true, closeTime: '15:00', district: 'Eppendorf (1.8 km)',
    heroImages: ['/images/buerger2.jpg', '/images/burger.jpg', '/images/burgercoke.jpg'],
    fullDeals: [
      {
        id: 'd1', title: '2for1 Pancakes', avgPrice: '€11', duration: 'Limited',
        description: 'Two stacks of fluffy American pancakes for the price of one. Served with maple syrup, fresh berries and whipped cream.',
        popularCount: 16, bgColor: '#11301d', restaurantId: 'r7',
        users: [{ src: '/images/avatarWomanoriente.jpg', alt: 'L' }, { src: '/images/avatarManr.jpg', alt: 'P' }],
        userNames: 'Luna & Pablo',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 17, avgRating: 4.6, trustedPartner: true, fires: 1,
      },
      {
        id: 'd2', title: '15% OFF Brunch', avgPrice: '€18', duration: '30 days',
        description: 'Get 15% off our full weekend brunch set. Includes eggs your way, toast, juice and bottomless coffee.',
        popularCount: 11, bgColor: '#53f293', restaurantId: 'r7',
        users: [{ src: '/images/avatarWoman.jpg', alt: 'S' }, { src: '/images/avatarWoman4.jpg', alt: 'A' }],
        userNames: 'Sofia & Ana',
        tags: [{ icon: '✓', label: 'great taste' }],
        reviewCount: 9, avgRating: 4.5, trustedPartner: false, fires: 1,
      },
    ],
    reviewsList: [
      {
        name: 'Lena', avatar: '/images/avatarwomanpeliroja.jpg', isInitial: false, initial: 'L', bgColor: '',
        rating: 5, date: '2 weeks ago',
        text: 'The best brunch spot in Eppendorf! Pancakes are fluffy and generous, coffee is great. The 2for1 deal is a steal.',
        photos: ['/images/buerger2.jpg', '/images/burgercoke.jpg'], likes: 13,
        tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
      },
      tungAnhR7,
    ],
    address: 'Eppendorfer Baum 23, 20249 Hamburg\nEppendorf (1.8 km away)',
    hours: 'Open · Closes at 15:00',
    mapBbox: '9.978,53.585,9.998,53.600',
    similar: [
      { id: 'r4', name: 'Brava Burger Co.', photo: '/images/burger.jpg', redemptions: '500+', rating: 4.8, reviewCount: 312, distance: '40 m', categories: 'American, Burgers', deals: [{ discount: '2for1', label: 'Burger' }] },
      { id: 'r2', name: "Capo's Coffee Hafencity", photo: '/images/cafeLocal.jpg', redemptions: '300+', rating: 4.8, reviewCount: 143, distance: '80 m', categories: 'Breakfast, Coffee', deals: [{ discount: '2for1', label: 'Coffee & Cake' }] },
    ],
  },

  /* ── r8 · Sakura Sushi Bar ───────────────────────────────────────────── */
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
    isOpen: true, closeTime: '22:30', district: 'Winterhude (2.3 km)',
    heroImages: ['/images/pastas2.jpg', '/images/pastasPlato.jpg', '/images/pastas7.jpg'],
    fullDeals: [
      {
        id: 'd1', title: '2for1 Roll', avgPrice: '€18', duration: 'Limited',
        description: 'Order any two signature rolls and pay only for one. Choose from our 20-item roll menu crafted by our head sushi chef.',
        popularCount: 14, bgColor: '#11301d', restaurantId: 'r8',
        users: [{ src: '/images/avatarWoman.jpg', alt: 'M' }, { src: '/images/avatarManColor.jpg', alt: 'K' }],
        userNames: 'Mei & Klaus',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 22, avgRating: 4.9, trustedPartner: true, fires: 2,
      },
      {
        id: 'd2', title: '20% OFF Sake', avgPrice: '€9', duration: '60 days',
        description: 'Get 20% off any sake bottle or glass with your meal. Premium Japanese rice wine selection curated for food pairing.',
        popularCount: 8, bgColor: '#53f293', restaurantId: 'r8',
        users: [{ src: '/images/avatarWomanoriente.jpg', alt: 'Y' }, { src: '/images/avatarManBw.jpg', alt: 'H' }],
        userNames: 'Yuki & Hans',
        tags: [{ icon: '✓', label: 'great taste' }],
        reviewCount: 10, avgRating: 4.7, trustedPartner: true, fires: 1,
      },
    ],
    reviewsList: [
      {
        name: 'Mei', avatar: '/images/avatarWomanoriente.jpg', isInitial: false, initial: 'M', bgColor: '',
        rating: 5, date: '1 week ago',
        text: 'Authentic sushi experience in Hamburg. The salmon and tuna rolls are exceptional. 2for1 deal makes it very accessible for a special night out.',
        photos: ['/images/pastas2.jpg', '/images/pastasPlato.jpg'], likes: 19,
        tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
      },
      tungAnhR8,
    ],
    address: 'Mühlenkamp 14, 22303 Hamburg\nWinterhude (2.3 km away)',
    hours: 'Open · Closes at 22:30',
    mapBbox: '10.008,53.587,10.028,53.602',
    similar: [
      { id: 'r5', name: 'Pasta & Alma', photo: '/images/pastasPlato.jpg', redemptions: '300+', rating: 4.7, reviewCount: 254, distance: '35 m', categories: 'Italian, Pasta', deals: [{ discount: '2for1', label: 'Pasta' }] },
      { id: 'r13', name: 'Dim Sum Palace', photo: '/images/cafelocal2.jpg', redemptions: '450+', rating: 4.8, reviewCount: 512, distance: '70 m', categories: 'Chinese, Dim Sum', deals: [{ discount: '2for1', label: 'Dim Sum' }] },
    ],
  },

  /* ── r9 · El Taco Loco ───────────────────────────────────────────────── */
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
    isOpen: true, closeTime: '23:00', district: 'Altona (0.9 km)',
    heroImages: ['/images/burger.jpg', '/images/buerger2.jpg', '/images/burgercoke.jpg'],
    fullDeals: [
      {
        id: 'd1', title: '2for1 Taco', avgPrice: '€8', duration: 'Limited',
        description: 'Two authentic street tacos for the price of one. Slow-cooked carnitas, fresh salsa and avocado. A Hamburg street food favourite.',
        popularCount: 21, bgColor: '#11301d', restaurantId: 'r9',
        users: [{ src: '/images/avatarManColor.jpg', alt: 'L' }, { src: '/images/avatarWoman4.jpg', alt: 'R' }],
        userNames: 'Luis & Rosa',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 18, avgRating: 4.8, trustedPartner: true, fires: 2,
      },
      {
        id: 'd2', title: '10% OFF Nachos', avgPrice: '€9', duration: '30 days',
        description: 'Get 10% off our loaded nacho sharing platter. Topped with three kinds of cheese, jalapeños and house-made guacamole.',
        popularCount: 13, bgColor: '#53f293', restaurantId: 'r9',
        users: [{ src: '/images/avatarWoman.jpg', alt: 'S' }, { src: '/images/avatarManBw.jpg', alt: 'D' }],
        userNames: 'Sofia & Diego',
        tags: [{ icon: '✓', label: 'value/quality' }],
        reviewCount: 9, avgRating: 4.6, trustedPartner: false, fires: 1,
      },
    ],
    reviewsList: [
      {
        name: 'Luis', avatar: '/images/avatarManColor.jpg', isInitial: false, initial: 'L', bgColor: '',
        rating: 5, date: '4 days ago',
        text: 'Closest thing to real Mexican street food in Hamburg. The carnitas taco deal is insane value. Goes perfectly with their horchata.',
        photos: ['/images/burger.jpg', '/images/burgercoke.jpg'], likes: 17,
        tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
      },
      tungAnhR9,
    ],
    address: 'Altona Bahnhof Str. 5, 22765 Hamburg\nAltona (0.9 km away)',
    hours: 'Open · Closes at 23:00',
    mapBbox: '9.935,53.548,9.955,53.563',
    similar: [
      { id: 'r4', name: 'Brava Burger Co.', photo: '/images/burger.jpg', redemptions: '600+', rating: 4.8, reviewCount: 312, distance: '25 m', categories: 'American, Burgers', deals: [{ discount: '2for1', label: 'Burger' }] },
      { id: 'r7', name: 'The Breakfast Club', photo: '/images/buerger2.jpg', redemptions: '280+', rating: 4.6, reviewCount: 198, distance: '60 m', categories: 'American, Brunch', deals: [{ discount: '15% OFF', label: 'Brunch' }] },
    ],
  },

  /* ── r10 · The Green Bowl ────────────────────────────────────────────── */
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
    isOpen: true, closeTime: '20:00', district: 'Barmbek (3.1 km)',
    heroImages: ['/images/salad3.jpg', '/images/salads.jpg', '/images/salad4.jpg'],
    fullDeals: [
      {
        id: 'd1', title: '15% OFF Bowl', avgPrice: '€13', duration: '21 days',
        description: 'Get 15% off any vegan power bowl. 100% plant-based ingredients, locally sourced and zero waste packaging.',
        popularCount: 9, bgColor: '#11301d', restaurantId: 'r10',
        users: [{ src: '/images/avatarWoman4.jpg', alt: 'P' }, { src: '/images/avatarwomanpeliroja.jpg', alt: 'E' }],
        userNames: 'Paula & Emma',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 11, avgRating: 4.4, trustedPartner: true, fires: 1,
      },
    ],
    reviewsList: [
      {
        name: 'Emma', avatar: '/images/avatarwomanpeliroja.jpg', isInitial: false, initial: 'E', bgColor: '',
        rating: 4, date: '2 weeks ago',
        text: 'Great plant-based option in Barmbek. The bowls are filling and flavourful. 15% deal makes it my go-to weekday lunch.',
        photos: ['/images/salads.jpg', '/images/platovegetariano.jpg'], likes: 7,
        tags: [{ icon: '👌', label: 'great taste' }],
      },
      tungAnhR10,
    ],
    address: 'Fuhlsbüttler Str. 102, 22305 Hamburg\nBarmbek (3.1 km away)',
    hours: 'Open · Closes at 20:00',
    mapBbox: '10.038,53.587,10.058,53.602',
    similar: [
      { id: 'r6', name: 'Verde Saladbar', photo: '/images/salads.jpg', redemptions: '200+', rating: 4.5, reviewCount: 143, distance: '30 m', categories: 'Healthy, Salads', deals: [{ discount: '10% OFF', label: 'Bowl' }] },
      { id: 'r5', name: 'Pasta & Alma', photo: '/images/pastasPlato.jpg', redemptions: '350+', rating: 4.7, reviewCount: 254, distance: '90 m', categories: 'Italian, Pasta', deals: [{ discount: '2for1', label: 'Pasta' }] },
    ],
  },

  /* ── r11 · Biergarten Nord ───────────────────────────────────────────── */
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
    isOpen: true, closeTime: '23:00', district: 'Altona (1.4 km)',
    heroImages: ['/images/cafeLocal.jpg', '/images/cafe2.jpg', '/images/cafelocal2.jpg'],
    fullDeals: [
      {
        id: 'd1', title: '2for1 Beer', avgPrice: '€6', duration: 'Limited',
        description: 'Two cold draft beers for the price of one. Choose from our 12 rotating taps featuring local Hamburg and international craft beers.',
        popularCount: 14, bgColor: '#11301d', restaurantId: 'r11',
        users: [{ src: '/images/avatarWoman4.jpg', alt: 'P' }, { src: '/images/avatarManBw.jpg', alt: 'H' }],
        userNames: 'Petra & Hans',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 16, avgRating: 4.6, trustedPartner: true, fires: 1,
      },
      {
        id: 'd2', title: '10% OFF Pretzels', avgPrice: '€5', duration: '30 days',
        description: 'Get 10% off our freshly baked pretzel sharing board. Served warm with mustard, butter and cheese dips.',
        popularCount: 8, bgColor: '#53f293', restaurantId: 'r11',
        users: [{ src: '/images/avatarWoman.jpg', alt: 'K' }, { src: '/images/avatarManColor.jpg', alt: 'F' }],
        userNames: 'Karin & Fritz',
        tags: [{ icon: '✓', label: 'great taste' }],
        reviewCount: 7, avgRating: 4.4, trustedPartner: false, fires: 1,
      },
    ],
    reviewsList: [
      {
        name: 'Petra', avatar: '/images/avatarWoman4.jpg', isInitial: false, initial: 'P', bgColor: '',
        rating: 5, date: '5 days ago',
        text: 'The best after-work spot in Altona. Big outdoor garden, great beer selection and the 2for1 deal is perfect to share with colleagues.',
        photos: ['/images/cafeLocal.jpg', '/images/cafelocal2.jpg'], likes: 21,
        tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
      },
      tungAnhR11,
    ],
    address: 'Große Bergstr. 40, 22767 Hamburg\nAltona (1.4 km away)',
    hours: 'Open · Closes at 23:00',
    mapBbox: '9.930,53.550,9.950,53.565',
    similar: [
      { id: 'r4', name: 'Brava Burger Co.', photo: '/images/burger.jpg', redemptions: '500+', rating: 4.8, reviewCount: 312, distance: '30 m', categories: 'American, Burgers', deals: [{ discount: '20% OFF', label: 'Beer' }] },
      { id: 'r9', name: 'El Taco Loco', photo: '/images/burger.jpg', redemptions: '350+', rating: 4.7, reviewCount: 289, distance: '60 m', categories: 'Mexican, Street Food', deals: [{ discount: '2for1', label: 'Taco' }] },
    ],
  },

  /* ── r12 · Pizza Roma ────────────────────────────────────────────────── */
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
    isOpen: true, closeTime: '22:00', district: 'Eimsbüttel (0.7 km)',
    heroImages: ['/images/pastasPlato.jpg', '/images/pastas2.jpg', '/images/pazzas.jpg'],
    fullDeals: [
      {
        id: 'd1', title: '2for1 Pizza', avgPrice: '€14', duration: 'Limited',
        description: 'Two wood-fired pizzas for the price of one. Choose from our 18 classic and seasonal toppings. Dough fermented 48 hours for perfect crust.',
        popularCount: 17, bgColor: '#11301d', restaurantId: 'r12',
        users: [{ src: '/images/avatarWoman.jpg', alt: 'G' }, { src: '/images/avatarManr.jpg', alt: 'M' }],
        userNames: 'Giulia & Marco',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 20, avgRating: 4.5, trustedPartner: true, fires: 1,
      },
      {
        id: 'd2', title: '20% OFF Tiramisu', avgPrice: '€7', duration: '45 days',
        description: 'Get 20% off our classic tiramisu made fresh daily with mascarpone, espresso and ladyfingers. The perfect finish.',
        popularCount: 10, bgColor: '#53f293', restaurantId: 'r12',
        users: [{ src: '/images/avatarWomanBW.jpg', alt: 'L' }, { src: '/images/avatarManGlasses.jpg', alt: 'T' }],
        userNames: 'Laura & Tom',
        tags: [{ icon: '✓', label: 'great taste' }],
        reviewCount: 8, avgRating: 4.4, trustedPartner: false, fires: 1,
      },
    ],
    reviewsList: [
      {
        name: 'Marco', avatar: '/images/avatarManr.jpg', isInitial: false, initial: 'M', bgColor: '',
        rating: 5, date: '1 week ago',
        text: 'Authentic Neapolitan pizza in Hamburg. The dough is incredible and the 2for1 deal means I can try two styles every visit. Love it.',
        photos: ['/images/pastasPlato.jpg', '/images/pazzas.jpg'], likes: 15,
        tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
      },
      tungAnhR12,
    ],
    address: 'Hoheluftchaussee 55, 20253 Hamburg\nEimsbüttel (0.7 km away)',
    hours: 'Open · Closes at 22:00',
    mapBbox: '9.968,53.575,9.988,53.590',
    similar: [
      { id: 'r5', name: 'Pasta & Alma', photo: '/images/pastasPlato.jpg', redemptions: '400+', rating: 4.7, reviewCount: 254, distance: '25 m', categories: 'Italian, Pasta', deals: [{ discount: '2for1', label: 'Pasta' }] },
      { id: 'r3', name: 'Camping Coffee im Kaufmannshaus', photo: '/images/Cafe7.jpg', redemptions: '200+', rating: 4.5, reviewCount: 123, distance: '80 m', categories: 'Café, Drinks', deals: [{ discount: '2for1', label: 'Coffee' }] },
    ],
  },

  /* ── r13 · Dim Sum Palace ────────────────────────────────────────────── */
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
      { src: '/images/avatarWoman.jpg',        alt: 'Mei' },
      { src: '/images/avatarwomanpeliroja.jpg', alt: 'Sara' },
    ],
    deals: [{ label: '2for1 Dim Sum' }, { label: '15% OFF Tea' }],
    whyTrending: { returnRate: '+27%', topOccasion: 'Family lunch', peakTime: 'Sat–Sun 11am–2pm' },
    pin: { top: '15%', left: '68%', fires: 3 },
    isOpen: true, closeTime: '22:00', district: 'Wandsbek (2.7 km)',
    heroImages: ['/images/cafelocal2.jpg', '/images/cafeLocal.jpg', '/images/cafe2.jpg'],
    fullDeals: [
      {
        id: 'd1', title: '2for1 Dim Sum', avgPrice: '€16', duration: 'Limited',
        description: 'Two baskets of handmade dim sum for the price of one. Choose from steamed, fried or baked. Over 30 varieties including har gow and char siu bao.',
        popularCount: 28, bgColor: '#11301d', restaurantId: 'r13',
        users: [{ src: '/images/avatarWoman.jpg', alt: 'M' }, { src: '/images/avatarwomanpeliroja.jpg', alt: 'S' }],
        userNames: 'Mei & Sara',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 27, avgRating: 4.8, trustedPartner: true, fires: 3,
      },
      {
        id: 'd2', title: '15% OFF Tea', avgPrice: '€8', duration: '60 days',
        description: 'Get 15% off our premium Chinese tea selection. Jasmine, pu-erh, oolong and rare white tea — all served in traditional teapots.',
        popularCount: 15, bgColor: '#53f293', restaurantId: 'r13',
        users: [{ src: '/images/avatarWomanoriente.jpg', alt: 'L' }, { src: '/images/avatarWoman4.jpg', alt: 'A' }],
        userNames: 'Lily & Amy',
        tags: [{ icon: '✓', label: 'great taste' }],
        reviewCount: 12, avgRating: 4.7, trustedPartner: true, fires: 2,
      },
    ],
    reviewsList: [
      {
        name: 'Mei', avatar: '/images/avatarWoman.jpg', isInitial: false, initial: 'M', bgColor: '',
        rating: 5, date: '3 days ago',
        text: 'The best dim sum outside of Hong Kong! The har gow wrappers are perfectly thin and the filling is generous. 2for1 deal on weekends is unmissable.',
        photos: ['/images/cafelocal2.jpg', '/images/cafeLocal.jpg'], likes: 31,
        tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
      },
      tungAnhR13,
    ],
    address: 'Wandsbeker Marktstr. 8, 22041 Hamburg\nWandsbek (2.7 km away)',
    hours: 'Open · Closes at 22:00',
    mapBbox: '10.065,53.570,10.085,53.585',
    similar: [
      { id: 'r8', name: 'Sakura Sushi Bar', photo: '/images/pastas2.jpg', redemptions: '600+', rating: 4.9, reviewCount: 421, distance: '35 m', categories: 'Japanese, Sushi', deals: [{ discount: '2for1', label: 'Roll' }] },
      { id: 'r16', name: 'Ramen Ichiban', photo: '/images/postresCafe.jpg', redemptions: '400+', rating: 4.8, reviewCount: 347, distance: '70 m', categories: 'Japanese, Ramen', deals: [{ discount: '2for1', label: 'Ramen' }] },
    ],
  },

  /* ── r14 · Curry House Hamburg ───────────────────────────────────────── */
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
    isOpen: true, closeTime: '22:30', district: 'Hammerbrook (1.6 km)',
    heroImages: ['/images/Cafe7.jpg', '/images/cafeLocal.jpg', '/images/cafelocal2.jpg'],
    fullDeals: [
      {
        id: 'd1', title: '2for1 Curry', avgPrice: '€15', duration: 'Limited',
        description: 'Two authentic Indian curry dishes for the price of one. From mild korma to fiery vindaloo — all made with freshly ground spices.',
        popularCount: 13, bgColor: '#11301d', restaurantId: 'r14',
        users: [{ src: '/images/avatarWoman4.jpg', alt: 'P' }, { src: '/images/avatarManr.jpg', alt: 'R' }],
        userNames: 'Priya & Raj',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 14, avgRating: 4.6, trustedPartner: true, fires: 1,
      },
      {
        id: 'd2', title: '10% OFF Naan', avgPrice: '€4', duration: '30 days',
        description: 'Get 10% off our freshly baked naan bread selection. Garlic, peshwari, plain or cheese — baked to order in our tandoor oven.',
        popularCount: 8, bgColor: '#53f293', restaurantId: 'r14',
        users: [{ src: '/images/avatarWoman.jpg', alt: 'A' }, { src: '/images/avatarManColor.jpg', alt: 'V' }],
        userNames: 'Aisha & Vikram',
        tags: [{ icon: '✓', label: 'great taste' }],
        reviewCount: 7, avgRating: 4.4, trustedPartner: false, fires: 1,
      },
    ],
    reviewsList: [
      {
        name: 'Raj', avatar: '/images/avatarManr.jpg', isInitial: false, initial: 'R', bgColor: '',
        rating: 5, date: '10 days ago',
        text: 'Most authentic Indian food in Hamburg. The spice blends are spot on and the 2for1 curry deal is exceptional value. Butter chicken is a must.',
        photos: ['/images/Cafe7.jpg', '/images/cafelocal2.jpg'], likes: 18,
        tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
      },
      tungAnhR14,
    ],
    address: 'Süderstr. 77, 20537 Hamburg\nHammerbrook (1.6 km away)',
    hours: 'Open · Closes at 22:30',
    mapBbox: '10.018,53.545,10.038,53.560',
    similar: [
      { id: 'r13', name: 'Dim Sum Palace', photo: '/images/cafelocal2.jpg', redemptions: '500+', rating: 4.8, reviewCount: 512, distance: '40 m', categories: 'Chinese, Dim Sum', deals: [{ discount: '2for1', label: 'Dim Sum' }] },
      { id: 'r9', name: 'El Taco Loco', photo: '/images/burger.jpg', redemptions: '350+', rating: 4.7, reviewCount: 289, distance: '75 m', categories: 'Mexican, Street Food', deals: [{ discount: '2for1', label: 'Taco' }] },
    ],
  },

  /* ── r15 · Le Croissant ──────────────────────────────────────────────── */
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
    isOpen: true, closeTime: '18:00', district: 'Lokstedt (2.0 km)',
    heroImages: ['/images/cafe2.jpg', '/images/cafeLocal.jpg', '/images/cafe3.jpg'],
    fullDeals: [
      {
        id: 'd1', title: '2for1 Croissant', avgPrice: '€5', duration: 'Limited',
        description: 'Two buttery all-butter croissants for the price of one. Baked fresh every morning using traditional French laminated dough technique.',
        popularCount: 11, bgColor: '#11301d', restaurantId: 'r15',
        users: [{ src: '/images/avatarWomanBW.jpg', alt: 'C' }, { src: '/images/avatarManGlasses.jpg', alt: 'P' }],
        userNames: 'Claire & Pierre',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 13, avgRating: 4.7, trustedPartner: true, fires: 1,
      },
      {
        id: 'd2', title: '20% OFF Coffee', avgPrice: '€4', duration: '30 days',
        description: 'Get 20% off any coffee drink. Single origin beans, expertly roasted. Perfect alongside our freshly baked viennoiseries.',
        popularCount: 7, bgColor: '#53f293', restaurantId: 'r15',
        users: [{ src: '/images/avatarWoman4.jpg', alt: 'I' }, { src: '/images/avatarWoman.jpg', alt: 'M' }],
        userNames: 'Isabelle & Marie',
        tags: [{ icon: '✓', label: 'great taste' }],
        reviewCount: 6, avgRating: 4.5, trustedPartner: false, fires: 1,
      },
    ],
    reviewsList: [
      {
        name: 'Claire', avatar: '/images/avatarWomanBW.jpg', isInitial: false, initial: 'C', bgColor: '',
        rating: 5, date: '1 week ago',
        text: 'Finally a proper French bakery in Hamburg! The croissants are perfectly laminated, flaky outside and buttery soft inside. 2for1 is a dream.',
        photos: ['/images/cafe2.jpg', '/images/cafeLocal.jpg'], likes: 12,
        tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
      },
      tungAnhR15,
    ],
    address: 'Lokstedter Weg 68, 22529 Hamburg\nLokstedt (2.0 km away)',
    hours: 'Open · Closes at 18:00',
    mapBbox: '9.960,53.595,9.980,53.610',
    similar: [
      { id: 'r1', name: "Dude's Coffee & Cake", photo: '/images/postresCafe.jpg', redemptions: '300+', rating: 4.8, reviewCount: 143, distance: '30 m', categories: 'Café, Desserts', deals: [{ discount: '2for1', label: 'Beverage' }] },
      { id: 'r2', name: "Capo's Coffee Hafencity", photo: '/images/cafeLocal.jpg', redemptions: '250+', rating: 4.8, reviewCount: 143, distance: '70 m', categories: 'Breakfast, Coffee', deals: [{ discount: '2for1', label: 'Coffee & Cake' }] },
    ],
  },

  /* ── r16 · Ramen Ichiban ─────────────────────────────────────────────── */
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
    isOpen: true, closeTime: '22:30', district: 'Eimsbüttel (1.2 km)',
    heroImages: ['/images/postresCafe.jpg', '/images/pastasPlato.jpg', '/images/pastas2.jpg'],
    fullDeals: [
      {
        id: 'd1', title: '2for1 Ramen', avgPrice: '€14', duration: 'Limited',
        description: 'Two bowls of rich tonkotsu or miso ramen for the price of one. 18-hour slow-cooked broth, fresh noodles, chashu pork and soft-boiled egg.',
        popularCount: 19, bgColor: '#11301d', restaurantId: 'r16',
        users: [{ src: '/images/avatarWomanoriente.jpg', alt: 'Y' }, { src: '/images/avatarManBw.jpg', alt: 'K' }],
        userNames: 'Yuki & Kenji',
        tags: [{ icon: '✓', label: 'great taste' }, { icon: '✓', label: 'value/quality' }],
        reviewCount: 21, avgRating: 4.8, trustedPartner: true, fires: 2,
      },
      {
        id: 'd2', title: '15% OFF Gyoza', avgPrice: '€8', duration: '30 days',
        description: 'Get 15% off our pan-fried gyoza dumplings. Pork and cabbage or vegetable filling, served with ponzu dipping sauce.',
        popularCount: 12, bgColor: '#53f293', restaurantId: 'r16',
        users: [{ src: '/images/avatarWoman.jpg', alt: 'S' }, { src: '/images/avatarManColor.jpg', alt: 'H' }],
        userNames: 'Sofia & Hiroshi',
        tags: [{ icon: '✓', label: 'great taste' }],
        reviewCount: 10, avgRating: 4.6, trustedPartner: true, fires: 1,
      },
    ],
    reviewsList: [
      {
        name: 'Kenji', avatar: '/images/avatarManBw.jpg', isInitial: false, initial: 'K', bgColor: '',
        rating: 5, date: '2 days ago',
        text: 'The tonkotsu broth here is extraordinary — 18 hours of slow cooking really shows. The 2for1 deal means I come twice a week. Best ramen in Hamburg.',
        photos: ['/images/pastasPlato.jpg', '/images/pastas2.jpg'], likes: 24,
        tags: [{ icon: '👌', label: 'great taste' }, { icon: '💯', label: 'value/quality' }],
      },
      tungAnhR16,
    ],
    address: 'Stellinger Weg 14, 20255 Hamburg\nEimsbüttel (1.2 km away)',
    hours: 'Open · Closes at 22:30',
    mapBbox: '9.955,53.575,9.975,53.590',
    similar: [
      { id: 'r8', name: 'Sakura Sushi Bar', photo: '/images/pastas2.jpg', redemptions: '550+', rating: 4.9, reviewCount: 421, distance: '40 m', categories: 'Japanese, Sushi', deals: [{ discount: '2for1', label: 'Roll' }] },
      { id: 'r13', name: 'Dim Sum Palace', photo: '/images/cafelocal2.jpg', redemptions: '450+', rating: 4.8, reviewCount: 512, distance: '80 m', categories: 'Chinese, Dim Sum', deals: [{ discount: '2for1', label: 'Dim Sum' }] },
    ],
  },
]

/* ─── O(1) lookup by ID ──────────────────────────────────────────────────── */
export const RESTAURANT_MAP: Record<string, Restaurant> =
  Object.fromEntries(RESTAURANTS.map((r) => [r.id, r]))
