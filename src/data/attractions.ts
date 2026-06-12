export interface AttractionReview {
  rating: number;
  author: string;
  text: string;
  date: string;
}

export interface AttractionData {
  slug: string;
  name: string;
  zone: string;
  zoneLabel: string;
  coordinate: string;
  description: string;
  imageUrl: string;
  trustMetrics: string[];
  reviews: AttractionReview[];
  lat: number;
  lng: number;
}

export const ATTRACTIONS_DATA: Record<string, AttractionData> = {
  'balandra-beach': {
    slug: 'balandra-beach',
    name: 'Playa Balandra (Balandra Beach)',
    zone: 'la-paz',
    zoneLabel: 'La Paz',
    coordinate: '24.3216° N, 110.3242° W',
    description: "Mexico's most beautiful beach: a shallow, crystal-clear lagoon surrounded by dramatic desert mountains. Famous for its pristine turquoise waters, fine white sand, and the iconic 'Hongo' mushroom rock formation.",
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    trustMetrics: ['Eco-authorized charters only', 'Protected natural reserve', 'Strict water slot entry controls'],
    reviews: [
      { rating: 5, author: 'Ariadne S.', text: 'Unbelievable. The water is only waist-deep for hundreds of yards. It feels like a giant swimming pool. Go early as entry is restricted to slots to preserve it!', date: 'March 2026' },
      { rating: 5, author: 'Daniel K.', text: 'Stunning colors! Rent a kayak to explore the mangroves and outer coves. Worth the drive from Cabo, absolutely spectacular place.', date: 'January 2026' },
      { rating: 5, author: 'Sonia G.', text: 'The peace and beauty of Balandra are unmatched. There are no hotels or buildings here—just pure, untouched nature.', date: 'February 2026' }
    ],
    lat: 34,
    lng: 78
  },
  'the-arch-of-cabo-san-lucas': {
    slug: 'the-arch-of-cabo-san-lucas',
    name: 'The Arch of Cabo San Lucas (El Arco)',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    coordinate: '22.8756° N, 109.8944° W',
    description: 'The iconic rugged natural limestone arch marking Lands End, where the Pacific Ocean meets the Sea of Cortez. Visited by sea turtles, sea lions, and thousands of coastal boat cruises.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200',
    trustMetrics: ['Vetted captains only', 'Strict marine park safety rules', 'Guaranteed photo-stop navigation'],
    reviews: [
      { rating: 5, author: 'Michael P.', text: 'Took a glass-bottom boat tour at sunset. Seeing the sea lions sunbathing next to the arch was incredible. A must-do!', date: 'February 2026' },
      { rating: 5, author: 'Elena R.', text: 'Breathtaking natural landmark. Very close to the marina, easily accessible on any boat cruise. Make sure to get a photo right under the arch!', date: 'April 2026' },
      { rating: 5, author: 'Thomas B.', text: 'Lands End is spectacular. The swell is powerful, so hire a licensed water taxi to get there and back safely.', date: 'January 2026' }
    ],
    lat: 48,
    lng: 15
  },
  'medano-beach': {
    slug: 'medano-beach',
    name: 'Medano Beach (Playa El Médano)',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    coordinate: '22.8903° N, 109.8992° W',
    description: "Cabo San Lucas' main safe swimmable beach, bustling with upscale beach clubs, energetic dining, jet ski rentals, and picturesque views of Lands End.",
    imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1200',
    trustMetrics: ['Guarded safe-swimming zones', 'Licensed visual water patrols', 'Vetted beach clubs & loungers'],
    reviews: [
      { rating: 5, author: 'Clara M.', text: 'Perfect for swimming! Gentle waves, warm sand, and plenty of beach clubs. The view of El Arco from here is incredible.', date: 'March 2026' },
      { rating: 5, author: 'Josh T.', text: 'Super lively, clean, with great restaurants. We rented lounge chairs and spent the entire afternoon swimming and watching the boats.', date: 'February 2026' },
      { rating: 4, author: 'Sarah L.', text: 'The main swimmable beach in Cabo San Lucas. Quite popular, so there are active vendors, but the water is gorgeous and calm.', date: 'April 2026' }
    ],
    lat: 42,
    lng: 18
  },
  'chileno-beach': {
    slug: 'chileno-beach',
    name: 'Chileno Beach (Playa Chileno)',
    zone: 'tourist-corridor',
    zoneLabel: 'Tourist Corridor',
    coordinate: '22.9511° N, 109.8083° W',
    description: 'A Blue Flag certified paradise known for its calm, shallow tidepools and exceptionally clear water. Widely considered Cabo\'s premier destination for snorkeling with tropical reef fish.',
    imageUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=1200',
    trustMetrics: ['Blue Flag certified cleanliness', 'Professional lifeguard tower', 'Wheelchair accessible ramps'],
    reviews: [
      { rating: 5, author: 'Nico W.', text: 'Amazing snorkeling. Saw a school of blue neon damselfish and two small manta rays just 30 yards from the shore. Best snorkeling in Cabo!', date: 'May 2026' },
      { rating: 5, author: 'Rachel H.', text: 'Very clean public facilities, well-managed, and incredibly calm waters. Excellent for families with young children.', date: 'February 2026' },
      { rating: 5, author: 'Carlos D.', text: 'A pristine Blue Flag beach. The water is pristine, clear, and perfectly safe for a long morning of swimming and snorkeling.', date: 'March 2026' }
    ],
    lat: 60,
    lng: 45
  },
  'lovers-beach-cabo': {
    slug: 'lovers-beach-cabo',
    name: 'Lovers Beach (Playa del Amor)',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    coordinate: '22.8763° N, 109.8949° W',
    description: 'A hidden sandy beach tucked between massive granite cliffs at Lands End. Accessible only by water taxi, it faces the peaceful Sea of Cortez, while its wild counterpart, Divorce Beach, faces the roaring Pacific.',
    imageUrl: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&q=80&w=1200',
    trustMetrics: ['Licensed taxi captains only', 'Zero vendor zone restrictions', 'Strict no-swim Pacific warnings'],
    reviews: [
      { rating: 5, author: 'Julian E.', text: 'Hidden gem! The walk through the towering rocks from the Sea of Cortez side to the Pacific side is gorgeous. Don\'t swim on the Pacific side though!', date: 'February 2026' },
      { rating: 5, author: 'Valerie P.', text: 'Accessible only by boat. We took a water taxi, spent 2 hours swimming and sunbathing among these huge monolithic rock structures. Epic scenery.', date: 'March 2026' },
      { rating: 4, author: 'Kevin F.', text: 'Super iconic and gorgeous. There are no facilities or shade, so bring water and sunscreen. Well worth the boat taxi!', date: 'April 2026' }
    ],
    lat: 49,
    lng: 14
  },
  'playa-santa-maria': {
    slug: 'playa-santa-maria',
    name: 'Santa Maria Beach (Playa Santa María)',
    zone: 'tourist-corridor',
    zoneLabel: 'Tourist Corridor',
    coordinate: '22.9378° N, 109.8164° W',
    description: 'A breathtaking horseshoe-shaped cove flanked by red granite cliffs. Rich in marine life and protected from swells, it is a key stop for premium catamaran tours and morning snorkeling safaris.',
    imageUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1200',
    trustMetrics: ['Blue Flag certified', 'Protected ecological marine reserve', 'Life-vest mandatory snorkeling tours'],
    reviews: [
      { rating: 5, author: 'Diana M.', text: 'Absolutely stunning shape! Flanked by high red cliffs on both sides, which blocks the wind. The snorkeling is rich and beautifully clear.', date: 'March 2026' },
      { rating: 5, author: 'Steve V.', text: 'We came on a luxury catamaran snorkel cruise. Swimming with yellowtail surgeonfish in this secluded horse-shoe bay was unforgettable.', date: 'May 2026' },
      { rating: 5, author: 'Lucia S.', text: 'Incredibly pristine and calm. Free parking, clean bathrooms, and clean sand. Classic Mexican beach beauty at its finest.', date: 'January 2026' }
    ],
    lat: 68,
    lng: 52
  },
  'cabo-pulmo': {
    slug: 'cabo-pulmo',
    name: 'Cabo Pulmo National Marine Park',
    zone: 'east-cape',
    zoneLabel: 'East Cape',
    coordinate: '23.4411° N, 109.4314° W',
    description: 'A world-renowned National Marine Park hosting one of only three living coral reefs in North America. Known as the "Aquarium of the World," it is a sanctuary for bull sharks, sea turtles, and massive jacks schools.',
    imageUrl: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=1200',
    trustMetrics: ['Vetted eco-conscious park guides', 'Rigid marine protection controls', 'Enforced reef-safe sunscreen policies'],
    reviews: [
      { rating: 5, author: 'Oliver J.', text: 'The dive of a lifetime! We swam inside a giant tornado of thousands of schooling jacks. It was surreal. A true testament to ocean conservation.', date: 'April 2026' },
      { rating: 5, author: 'Marta G.', text: 'Pure wilderness. The reef is bursting with life—corals, tropical fish, turtles, and friendly sea lions. Worth the off-road trip from East Cape.', date: 'March 2026' },
      { rating: 5, author: 'Brandon T.', text: 'Incredible underwater visibility. Swimming alongside bull sharks and massive coral columns was breathtaking. Best marine park in Mexico.', date: 'May 2026' }
    ],
    lat: 92,
    lng: 78
  }
};
