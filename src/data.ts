import { TourTypeId, TourTypeDynamicConfig, TourDetail, RelatedListing } from './types';

export const tourTypeConfigs: Record<TourTypeId, TourTypeDynamicConfig> = {
  adventure: {
    id: 'adventure',
    label: 'Adventure (4x4 & Zipline)',
    fear: 'Is it safe? What if I get hurt?',
    trustSignals: [
      'Safety Certified Operators',
      'Double-redundant harnesses included',
      'No previous experience needed',
      'Full passenger medical insurance',
      'On-site standby emergency medical technicians'
    ],
    cta: 'Check Availability & Safety Info →',
    urgency: 'Limited spots — max 8 thrill-seekers per group',
    formStep1Label: 'When are you going & how many thrill-seekers?',
    bestForChips: ['Adventure Seekers', 'Groups', 'Active Day', 'Couples'],
    cognitivePrinciple: 'Risk Minimization & Reassurance (System 2 Safeguard)'
  },
  water: {
    id: 'water',
    label: 'Water/Marine (Snorkel & Wildlife)',
    fear: 'Will I actually see wildlife? Is it safe for young children?',
    trustSignals: [
      'Certified marine biologist guides',
      'USCG-approved life vests for all ages',
      '100% kid-friendly pace & shallow water options',
      'Eco-sanctuary compliant & licensed vessels',
      'Inclement weather rescheduling guarantee'
    ],
    cta: 'Check Season Availability →',
    urgency: 'Peak wildlife season ends soon — slots fill fast',
    formStep1Label: 'When are you visiting & how many in your group?',
    bestForChips: ['Families', 'Nature Lovers', 'Wildlife Lovers', 'First-Time Visitors'],
    cognitivePrinciple: 'Outcome Certainty & Authority (System 1 Trust Keys)'
  },
  sunset: {
    id: 'sunset',
    label: 'Sunset/Social (Booze Cruise)',
    fear: 'Is there really an open bar? Is it too crowded to hear or sit?',
    trustSignals: [
      'Premium labels open bar included',
      'Live dynamic DJ & acoustic guitarist onboard',
      'Decongested deck structure with guaranteed seating',
      'Instantly refundable sunset visibility guarantee',
      'Voted #1 Sunset Cruise in Cabo (2024-2025)'
    ],
    cta: "See Tonight's Availability →",
    urgency: "Tonight's cruise is 94% full — only 4 spots left",
    formStep1Label: 'What night & how many in your crew?',
    bestForChips: ['Bachelorette', 'Couples', 'Groups', 'Special Occasion'],
    cognitivePrinciple: 'Social Proof & Scarcity (Cialdini Consensus + Urgency)'
  },
  cultural: {
    id: 'cultural',
    label: 'Cultural/Culinary (Cooking)',
    fear: 'Is this an authentic local recipe? Do I need chef experience?',
    trustSignals: [
      'Led by Michelin-trained native Mexican chefs',
      '100% organic, handpicked farm-to-table ingredients',
      'Intimate, high-engagement micro-group (max 8 spots)',
      'Substitutions available for vegan/gluten-free',
      'Take-home digital recipe book & master certificate'
    ],
    cta: 'Reserve Your Cooking Spot →',
    urgency: 'Classes are capped strictly at 8 food lovers to ensure quality',
    formStep1Label: 'Which date & how many food lovers?',
    bestForChips: ['Foodies', 'Couples', 'Culture Lovers', 'Unique Experience'],
    cognitivePrinciple: 'Reciprocal Value & Expertise (Cialdini Authority)'
  },
  fishing: {
    id: 'fishing',
    label: 'Fishing (Deep Sea Charter)',
    fear: 'Will we catch actual sport fish? What happens if we strike out?',
    trustSignals: [
      'USCG certified licensed multi-generation Captains',
      'State-of-the-art heavy Shimano gear included',
      'Professional filleting, storage & custom packing services',
      'Marlin Capital priority routes & fish finder radar',
      'Flexible charter lengths (4hr, 6hr, 8hr options)'
    ],
    cta: 'Book Your Charter →',
    urgency: 'Prime Marlin season is active. Captain schedules booked weeks out.',
    formStep1Label: 'What date & how many anglers?',
    bestForChips: ['Fishing Enthusiasts', 'Groups', 'Special Occasion', 'Active Day'],
    cognitivePrinciple: 'Loss Aversion & Premium Guarantees (Cialdini Scarcity)'
  },
  whakesharks: {
    id: 'whakesharks',
    label: 'Whale Sharks (Swim Experience)',
    fear: 'Is it completely safe? Is nature code compliant? Is the season active?',
    trustSignals: [
      'Certified marine biologist safety escort',
      'Strict conservation-first, zero-touch regulatory badges',
      'Safety briefing & premium thermal wet suits provided',
      'Very small eco-groups (strictly capped at 6 swimmers)',
      '10x higher sightings rating in La Paz Bay (1-hr flight/ride included)'
    ],
    cta: 'Check Season Availability →',
    urgency: 'Highly regulated season ends April — only 6 spots per trip allowed',
    formStep1Label: 'What date? This exclusive season fills up fast.',
    bestForChips: ['Bucket List', 'Adventure Seekers', 'Nature Lovers', 'Wildlife Lovers'],
    cognitivePrinciple: 'Exclusivity & Conservation Integrity (System 2 Logic)'
  },
  finedining: {
    id: 'finedining',
    label: 'Fine Dining (El Farallon Cliffs)',
    fear: 'Is the cliffside table actually secure? Is the seafood guaranteed fresh?',
    trustSignals: [
      'Michelin-Guide featured sea-cliff architecture',
      'Day-boat seafood sourced fresh every morning',
      'Wave-protecting protective reinforced safety shields',
      'Complimentary multi-item chef tasting bites',
      'Easy 24hr free dining slot reschedule window'
    ],
    cta: 'Reserve Oceanfront Table →',
    urgency: 'Sunset cliffside tables are 95% booked for this week',
    formStep1Label: 'Which dining night & how many epicureans?',
    bestForChips: ['Romantic Evening', 'Gourmet Lovers', 'Ocean Views', 'Special Anniversaries'],
    cognitivePrinciple: 'Premium Experiential Quality & Authority (System 1)'
  },
  beachside: {
    id: 'beachside',
    label: 'Beachside Club (Sur Beach Lounge)',
    fear: 'Will it be too crowded or noisy? Are daybeds guaranteed?',
    trustSignals: [
      'Guaranteed private beach club access pass',
      'Spacious double-sized canvas luxury daybeds',
      'Voted best ocean lounge in Cabo (2024)',
      '100% glass-free safety sand zones',
      'Full resort-level sanitation standards'
    ],
    cta: 'Reserve beachfront Table/Daybed →',
    urgency: 'Weekend ocean Cabanas are down to last 2 openings',
    formStep1Label: 'What date & how many beach lovers?',
    bestForChips: ['Day Vibe', 'Groups', 'Direct Ocean Access', 'Families'],
    cognitivePrinciple: 'Consensus & Loss Aversion (Cialdini Scarcity)'
  },
  organicfarm: {
    id: 'organicfarm',
    label: 'Farm-to-Table (Flora Farms Kitchen)',
    fear: 'Is it truly organically farmed? How do we reach the foothills?',
    trustSignals: [
      '100% certified pesticide-free private culinary fields',
      'Guided farm architecture tour included',
      'Recommended by top international food reviews',
      'Gated private security and safe valleys shuttle access',
      'Fresh botanical cocktail upon greeting'
    ],
    cta: 'Reserve Farmhouse Table →',
    urgency: 'Shaded garden tables strict capacity – max 8 per group',
    formStep1Label: 'Pick dining date & how many garden guests?',
    bestForChips: ['Eco Foodies', 'Organic Lovers', 'Families', 'Lush Gardens'],
    cognitivePrinciple: 'Reciprocal Authenticity & Expert Mastery'
  },
  beachresort: {
    id: 'beachresort',
    label: 'Beachfront Resort (The Cape Luxury Suite)',
    fear: 'Will my hotel room actually face the Arch? Is it private?',
    trustSignals: [
      '100% oceanfront guaranteed suites with full Arch views',
      'Private suspended plunge pool on your balcony deck',
      'Voted Top 5 Resorts in Western Mexico',
      'State-of-the-art secure gated resort perimeter',
      'Flexible 24-hr no-penalty check-in modification policy'
    ],
    cta: 'Reserve Ocean View Suite →',
    urgency: 'Only 3 suites featuring private hot-tubs left for these months',
    formStep1Label: 'What check-in date & how many luxury seekers?',
    bestForChips: ['Luxury Seekers', 'Couples', 'Unbeatable Arch Views', 'Spa Retreat'],
    cognitivePrinciple: 'Outcome Certainty & Risk-Reduction (System 2)'
  },
  luxuryvilla: {
    id: 'luxuryvilla',
    label: 'Gated Luxury Villa (Villas Del Mar)',
    fear: 'Is it completely secure? What private staff service is included?',
    trustSignals: [
      'Triple-gated biometric & patrol estate neighborhood safety',
      'Dedicated 24/7 in-villa butler and culinary chef',
      'Direct private infinity pool to sand private beach crossover',
      'Luxury private SUV and driver included in your villa package',
      'Fully vetted staff with rigorous security background clearance'
    ],
    cta: 'Book Private Luxury Estate →',
    urgency: 'Extremely scarce inventory — only 1 seaside estate open this month',
    formStep1Label: 'Select requested weeks & how many in your VIP group?',
    bestForChips: ['VIP Elite', 'Families', 'Complete Retreat', 'Corporate Retreats'],
    cognitivePrinciple: 'Social Power, Safety & Ultimate Exclusivity'
  },
  boutiqueart: {
    id: 'boutiqueart',
    label: 'Boutique Art Hotel (El Ganzo)',
    fear: 'Is the location central? What is the rooftop atmosphere like?',
    trustSignals: [
      'Private marina-front panoramic adults-only rooftop pools',
      'In-house underwater recording studio & active art galleries',
      'Voted trendiest boutique concept hotel in BCS',
      'Complimentary private shuttle & ferry to beach club sanctuary',
      'Transparent local rates with no hidden resort fees'
    ],
    cta: 'Reserve Artist Suite →',
    urgency: 'Vibrant concert week approaching — rooms are 88% booked',
    formStep1Label: 'Choose arrival dates & how many creative minds?',
    bestForChips: ['Art & Music Lovers', 'Adults Only', 'Trendsetters', 'Couples'],
    cognitivePrinciple: 'Novelty Seeking & Unique Identity Proof'
  }
};

export const tourDetails: Record<TourTypeId, TourDetail> = {
  adventure: {
    id: 'adventure',
    title: 'Canyon Safari: Outdoor 4x4 Ride, Zip lines & Desert Rappelling',
    price: 199,
    discountedPrice: 169,
    duration: '3.5 Hours',
    groupSize: 'Max 8 thrill-seekers',
    operatorName: 'Cabo Adventures Co.',
    operatorRating: 4.9,
    operatorReviewsCount: 1420,
    operatorBadge: 'Certified Safe - Rank #1',
    aboutText: 'Conquer the rugged beauty of the Baja California Sur desert. This multi-sport expedition combines extreme outdoor driving, high-speed suspension ziplines, and vertical rock rappelling inside a private ecological reserve. Expertly calibrated for active travelers returning with standard physical abilities.',
    highlights: [
      'Drive powerful fully-automatic 4x4 Polaris UTVs across scenic canyons',
      'Soar on 7 tandem ziplines high above the river canopy',
      'Enjoy a standard fully-supervised vertical rock wall rappel descent',
      'Explore off-road desert trails under towering geological structures',
      'Refreshing tequila tasting session and traditional Mexican lunch'
    ],
    included: [
      'Professional bilingual safety guides',
      'Full equipment (helmets, goggles, safety harness)',
      'Unlimited bottled mineral water',
      'Traditional Mexican lunch and soft drinks',
      'Tequila tasting and safety overview'
    ],
    excluded: [
      'UTV collision insurance ($35 optional cover)',
      'Gratuities for your dedicated guides (optional)',
      'Canyon conservation reserve fee ($25 USD)'
    ],
    itinerary: [
      { time: '09:00 AM', title: 'Roundtrip Resort Pickup', description: 'Air-conditioned luxury transit departs directly from your Cabo hotel lobby.', iconName: 'Bus' },
      { time: '09:40 AM', title: 'Gear Up & Safety Briefing', description: 'Professionally fit custom dual-carabiner harness, premium helmet, and protective goggles.', iconName: 'ShieldAlert' },
      { time: '10:00 AM', title: 'Tandem Ziplines & Rappel', description: 'Traverse 7 ziplines including Cabo\'s longest line, followed by a supported 100ft vertical rappel.', iconName: 'Cable' },
      { time: '11:15 AM', title: 'Extreme 4x4 Off-Road Driving', description: 'Drive a state-of-the-art UTV through deep sandy river beds and rocky canyon paths.', iconName: 'Car' },
      { time: '12:15 PM', title: 'Lunch & Tequila Crafting', description: 'Feast on freshly handmade standard corn tortillas, carne asada, and regional cheeses.', iconName: 'Utensils' }
    ],
    faqs: [
      { question: 'Do I need driver license for the UTV?', answer: 'Yes! To drive you must present a valid driver license. Guests under 18 or without a license can ride as co-pilots with an adult.' },
      { question: 'What is the absolute weight limit for ziplines?', answer: 'For harness specifications, the maximum weight limit is 260 lbs (118 kg), and the minimum weight is 55 lbs (25 kg).' },
      { question: 'What is the canyon conservation fee?', answer: 'It is a local municipal environmental reserve fee of $25 USD per person, which directly funds park preserve cleanups.' }
    ],
    locationCoords: { lat: 22.9213, lng: -109.7042 },
    locationAddress: 'Cabo Desert Reserve, Km 25 Highway, San Jose del Cabo, BCS 23405, Mexico',
    languagesSpoken: ['English', 'Spanish'],
    images: [
      { url: 'https://picsum.photos/seed/cabo-adventure-1/1200/800', alt: 'Thrill-seeker flying across canyon zipline suspension' },
      { url: 'https://picsum.photos/seed/cabo-adventure-2/1200/800', alt: 'Two passengers testing out high-speed 4x4 offroad UTV buggies' },
      { url: 'https://picsum.photos/seed/cabo-adventure-3/1200/800', alt: 'Vertical rock rappelling overlooking majestic granite canyons' },
      { url: 'https://picsum.photos/seed/cabo-adventure-4/1200/800', alt: 'Tour group posing under beautiful Cabo desert flora and cacti' },
      { url: 'https://picsum.photos/seed/cabo-adventure-5/1200/800', alt: 'Breathtaking high-altitude panoramic view of the Baja canyon line' }
    ],
    activityTypes: ['RZR Tour', 'UTV Trail Ride', 'Zipline Canopy', 'Desert Trail'],
    mustKnow: [
      'No experience needed - all training done on site',
      'Wear sturdy closed-toed shoes (no flip flops)',
      'Bring extra change of clothes as paths are extremely dusty',
      'Not recommended for pregnant women or back injury sufferers',
      'Passenger medical insurance included in slot booking fee'
    ]
  },
  water: {
    id: 'water',
    title: 'Cabo Pulmo National Marine Park Snorkeling & Boat Expedition',
    price: 159,
    discountedPrice: 135,
    duration: '5 Hours',
    groupSize: 'Max 10 guests',
    operatorName: 'Baja Marine Escapes',
    operatorRating: 4.85,
    operatorReviewsCount: 940,
    operatorBadge: 'Eco-Certified Marine Agency',
    aboutText: 'Snorkel in what Jacques Cousteau famously named the "World\'s Aquarium". Cabo Pulmo is home to the only living hard coral reef in the Gulf of California. Witness thousands of shimmering jack fish, harmless reef sharks, playful sea lions, and dynamic sea turtles in their pristine natural reservation.',
    highlights: [
      'Snorkel across 3 protected coral reef stations teeming with exotic fish',
      'Swim safely side-by-side with wild sea lions at the colony reefs',
      'Observe standard giant migrations of schooling jack fish formations',
      'Learn about local conservation directly from a resident marine biologist',
      'Feast on beachside lunch with freshly prepared local fish tacos'
    ],
    included: [
      'Professional certified Marine Biologist guide',
      'High-end snorkel gear (mask, snorkel, fins, life vest)',
      'National Park access permit and reef conservation fees',
      'Freshly prepared standard lunch on Cabo Pulmo beach',
      'Chilled energy drinks, mineral water, and sliced fruit'
    ],
    excluded: [
      'Wetsuit rentals ($15 optional fee)',
      'Underwater camera footage (available for purchase)',
      'Crew gratuities'
    ],
    itinerary: [
      { time: '08:00 AM', title: 'Pickup from Marina Gate 4', description: 'Transit via custom AC Mercedes Sprinter along the rugged East Cape road.', iconName: 'Bus' },
      { time: '09:30 AM', title: 'Arrive at Marine Reserve', description: 'Brief interactive presentation on hard coral reef guidelines and gear fitting.', iconName: 'BookOpen' },
      { time: '10:00 AM', title: 'Reef and Seal Colony Snorkeling', description: 'Engage in three distinct swim drops ranging from jack fish clusters to sea lion areas.', iconName: 'Waves' },
      { time: '12:35 PM', title: 'Authentic Beachside Lunch', description: 'Enjoy hand-made coastal fish/veggie tacos at a rustic eco-restaurant.', iconName: 'Milk' },
      { time: '01:30 PM', title: 'Baja Coast Return', description: 'Relax on the scenic overland return drive with panoramic mountain views.', iconName: 'Compass' }
    ],
    faqs: [
      { question: 'Will I see sharks during the dive?', answer: 'Yes! It is highly common to see docile white-tip reef sharks sleeping on the sandy bottom. Our biologists ensure a safe 10-foot safety parameter.' },
      { question: 'Is this tour safe for standard non-swimmers?', answer: 'We require a baseline comfort Level in deep water. High-buoyancy life vests are mandatory, and our primary guides pull visual safety rings at all times.' },
      { question: 'What is the best month to swim?', answer: 'While visibility is high year-round, September through November features summer water temps (80F+) and maximum look distance exceeding 80 feet.' }
    ],
    locationCoords: { lat: 22.8805, lng: -109.9126 },
    locationAddress: 'Marina Gate Dock 4, San Lucas Boulevard, Cabo San Lucas, BCS 23400, Mexico',
    languagesSpoken: ['English', 'Spanish', 'French'],
    images: [
      { url: 'https://picsum.photos/seed/cabo-snorkel-1/1200/800', alt: 'Bright tropical fish swimming over hard coral reef formations' },
      { url: 'https://picsum.photos/seed/cabo-snorkel-2/1200/800', alt: 'Curious sea lion swimming fast in turquoise coastal water' },
      { url: 'https://picsum.photos/seed/cabo-snorkel-3/1200/800', alt: 'School of thousands of silver jack fish swirling in a vertical cyclone' },
      { url: 'https://picsum.photos/seed/cabo-snorkel-4/1200/800', alt: 'Eco-certified speed vessel anchored next to secluded sandy beaches' },
      { url: 'https://picsum.photos/seed/cabo-snorkel-5/1200/800', alt: 'Happy snorkelers floating at the water surface with bright life vests' }
    ],
    activityTypes: ['Snorkeling', 'Marine Biology Tour', 'Boat Cruise', 'Eco Tourism'],
    mustKnow: [
      'Eco-Rules: Strictly mineral reef-safe sunscreen only',
      'Life vests are mandatory for all participants on water',
      'Marine sanctuary compliant - look but never touch marine wildlife',
      'Weather-guaranteed: full refund if Cabo Port closes due to wind',
      'Kid-friendly design: standard minimum age is 4 years old'
    ]
  },
  sunset: {
    id: 'sunset',
    title: 'Pacific Breeze: Premium Open Bar Sunset Cruise & Taco Buffet',
    price: 99,
    discountedPrice: 85,
    duration: '2.5 Hours',
    groupSize: 'Max 35 guests on luxury catamaran',
    operatorName: 'Baja Sailing Charters',
    operatorRating: 4.95,
    operatorReviewsCount: 2110,
    operatorBadge: 'Voted #1 Cruise Operator',
    aboutText: 'Watch Cabo\'s famous golden sunset melt directly into the Pacific Ocean. Sail past Land\'s End, the iconic stone Arch, and Lover\'s Beach on our double-decker, ultra-stable sailing catamaran. Includes an open bar serving premium spirits, live music, and a warm Mexican street taco buffet prepared fresh on deck.',
    highlights: [
      'Toast to the sunset past Cabo\'s iconic Land\'s End Arch (El Arco)',
      'Open bar serving unlimited craft margaritas, rum, gin & cold beer',
      'Fresh tacos from our onboard chef (marinated steak, chicken, pastor)',
      'Live dynamic acoustic guitar covering world hits and chill beats',
      'Guaranteed individual lounge cushion seating - never overstuffed'
    ],
    included: [
      'Open bar with reliable brand liquors (Jose Cuervo, Bacardi, Smirnoff)',
      'Onboard Mexican buffet chef preparation',
      'State-of-the-art catamaran sailing layout with dual restrooms',
      'Stellar sound system and live acoustic performance',
      'Full passenger port logistics insurances'
    ],
    excluded: [
      'Marina access platform tax ($5 USD local fee)',
      'Souvenir digital photos (optional)',
      'Direct land transportation (optional $15 add-on)'
    ],
    itinerary: [
      { time: '05:00 PM', title: 'Easy Marina Check-In', description: 'Board the Pacific Breeze catamaran at Marina Dock C. Sip your first cold tequila cocktail.', iconName: 'Compass' },
      { time: '05:30 PM', title: 'El Arco Sunset Photo Shoot', description: 'Boat anchors at the Arch for perfect lighting portrait photographs taken by professionals.', iconName: 'Camera' },
      { time: '06:15 PM', title: 'Taco Buffet & Active Sailing', description: 'Tacos are served warm as the yacht sails into the deep sapphire waters of the Pacific.', iconName: 'ChefHat' },
      { time: '07:00 PM', title: 'The Golden Hour Toast', description: 'Unlimited champagne is served as the sun sinks below the horizon in an explosion of red and orange.', iconName: 'Waves' },
      { time: '07:30 PM', title: 'Party Rhythm Cruise Back', description: 'Dance to high-vibe music and sail back to the bright lights of Cabo Marina.', iconName: 'Music' }
    ],
    faqs: [
      { question: 'Is this a wild booze cruise or family-friendly?', answer: 'We balance dynamic social fun and luxury. It is high-energy with great music and open bar, but still spacious and comfortable for couples, families, and bachelor parties alike.' },
      { question: 'What is the sunset guarantee?', answer: 'If we experience absolute cloud cover preventing any gold light display, we issue a 50% discount voucher for a subsequent booking.' },
      { question: 'Can I request vegetarian/vegan food?', answer: 'Absolutely. Our chef prepares premium organic roasted bell peppers, beans, rice, and fresh guacamole for our vegan and gluten-free guests.' }
    ],
    locationCoords: { lat: 22.8831, lng: -109.9079 },
    locationAddress: 'Dock Slip C-18, Cabo Marina, behind Wyndham Hotel, Cabo San Lucas, BCS 23400, Mexico',
    languagesSpoken: ['English', 'Spanish'],
    images: [
      { url: 'https://picsum.photos/seed/cabo-sunset-1/1200/800', alt: 'Luxury sailing catamaran gliding silently toward giant glowing orange sunset' },
      { url: 'https://picsum.photos/seed/cabo-sunset-2/1200/800', alt: 'Couples clinking dynamic visual cocktail glasses next to El Arco Arch' },
      { url: 'https://picsum.photos/seed/cabo-sunset-3/1200/800', alt: 'Freshly sizzling taco table bar set up with lime and spicy salsas' },
      { url: 'https://picsum.photos/seed/cabo-sunset-4/1200/800', alt: 'Wide spacious decks of catamaran with plush blue seating and cushions' },
      { url: 'https://picsum.photos/seed/cabo-sunset-5/1200/800', alt: 'Group of laughing bachelorette friends celebrating on a boat bow' }
    ],
    activityTypes: ['Sunset Sail', 'Booze Cruise', 'Catamaran Snorkel', 'Dinner Tour'],
    mustKnow: [
      'Open bar included - premium labels serviced',
      'Sunset guaranteed - 50% scenic voucher if fully cloud blocked',
      'Shared and private seating zones clearly defined onboard',
      'Port authority rules strictly forbid outside alcohol',
      'Guaranteed uncrowded: Cap set to 50% of official vessel allowance'
    ]
  },
  cultural: {
    id: 'cultural',
    title: 'The Organic Kitchen: Farm-To-Table Traditional Mexican Cooking Class',
    price: 139,
    discountedPrice: 119,
    duration: '4 Hours',
    groupSize: 'Max 8 culinary lovers',
    operatorName: 'Baja Farms Culinary',
    operatorRating: 4.98,
    operatorReviewsCount: 620,
    operatorBadge: 'Michelin-Trained Chefs',
    aboutText: 'Immerse into the vibrant aromas of true Mexican heritage cooking. Tour our private pesticide-free herb and veggie gardens outside San Jose, pluck organic ingredients by hand, and cook ancestral dishes yourself. Learn the complex architecture of smoke chilies, slow-roasted marinades, and fresh handmade tortillas.',
    highlights: [
      'Guided farm walk to pick organic heirloom tomatoes, chilies, and herbs',
      'Hand-grind perfect salsa in traditional volcanic basalt molcajetes',
      'Craft handmade heirloom corn tortillas from dry kernel nixtamalization',
      'Cook standard regional masterpieces (Pollo en Mole, Seafood Aquachile)',
      'Eat your multi-course masterwork under shaded stone arbors with wine pairings'
    ],
    included: [
      'Michelin-trained native Mexican Chef guide',
      'All ingredients, cooking utensils, and chef aprons',
      '4-course gourmet dinner and craft cocktail pairings',
      'Artisanal tequila and mezcal tasting flight',
      'Take-home high-quality recipe catalog and chef diploma'
    ],
    excluded: [
      'Imported luxury wines (available for extra buy)',
      'Roundtrip chef transport ($10 extra per person)',
      'Special take-home premium granite molcajete bowls'
    ],
    itinerary: [
      { time: '10:00 AM', title: 'Farm Gathering & Hibiscus Sip', description: 'Meet at our farm estate gardens. Enjoy organic chilled Jamaica flower water.', iconName: 'Compass' },
      { time: '10:30 AM', title: 'Botanical Harvesting Tour', description: 'Wander rows of basil, cilantro, and rare local serrano chiles. Pluck what you will cook.', iconName: 'Leaf' },
      { time: '11:15 AM', title: 'The Molcajete Masterclass', description: 'Learn standard stone crushing mechanics to emulsify wild salsa dips.', iconName: 'ChefHat' },
      { time: '12:00 PM', title: 'Main Feast Crafting', description: 'Set up at individual wood-fired stoves. Sear and braise traditional Baja fish dishes.', iconName: 'Flame' },
      { time: '01:15 PM', title: 'Al Fresco Banquet & Mezcal Toast', description: 'Dine at our shared wood harvest tables paired with artisan Mezcal and boutique Valle de Guadalupe wines.', iconName: 'Utensils' }
    ],
    faqs: [
      { question: 'What if I have severe food allergies or a gluten allergy?', answer: 'We are fully prepared! Our organic farm allows modular swap-outs. We can tailor the entire lesson to be 100% gluten-free, vegan, or nut-free with advance notice on step 2.' },
      { question: 'Do I need any prior cooking skill?', answer: 'Not at all. Chef Carlos guides each basic physical cut, flame safety parameter, and spice dash step-by-step. Beginner-friendly and extremely fun.' },
      { question: 'Do kids enjoy this?', answer: 'Yes! Children aged 8 and up love pressing custom visual tortillas and washing organic vegetables.' }
    ],
    locationCoords: { lat: 23.0612, lng: -109.6895 },
    locationAddress: 'Km 3.5 Camino Real, Historic Farm District, San Jose del Cabo, BCS 23400, Mexico',
    languagesSpoken: ['English', 'Spanish'],
    images: [
      { url: 'https://picsum.photos/seed/cabo-cooking-1/1200/800', alt: 'Rustic farm table surrounded by red tomatoes and green chili peppers' },
      { url: 'https://picsum.photos/seed/cabo-cooking-2/1200/800', alt: 'Chef crushing volcanic molcajete salsa with rich mortar tool' },
      { url: 'https://picsum.photos/seed/cabo-cooking-3/1200/800', alt: 'Gourmet plate of mole chicken with gold toasted sesame seeds' },
      { url: 'https://picsum.photos/seed/cabo-cooking-4/1200/800', alt: 'Happy cooking students standing in beautiful wooden garden pavilion' },
      { url: 'https://picsum.photos/seed/cabo-cooking-5/1200/800', alt: 'Chilled mezcal glasses lined up with red sal de gusano orange circles' }
    ],
    activityTypes: ['Cooking Classes', 'Food Tours', 'Wine Tastings', 'Organic Farming'],
    mustKnow: [
      'Local chef-led authentic historical recipes',
      'Dietary restrictions easily supported (notify us)',
      'Intimate scale - maximum 8 guests for deep interaction',
      'Recipes to take home in beautiful digital format',
      'Open-air farm setting - comfortable shoes recommended'
    ]
  },
  fishing: {
    id: 'fishing',
    title: 'El Patrón: 33ft Private Custom Deep-Sea Sportfishing Charter',
    price: 650,
    duration: '6 Hours',
    groupSize: 'Up to 6 anglers',
    operatorName: 'Cabo Sportfishing Fleet',
    operatorRating: 4.92,
    operatorReviewsCount: 810,
    operatorBadge: 'USCG Captain & Rig Licence',
    aboutText: 'Los Cabos is known as the "Marlin Capital of the World". Set sail on our luxury 33ft custom tournament sportfisher, optimized with advanced sonar, tournament outriggers, and dual fight-chairs. Hunt for majestic Blue Marlin, fast Mahi-Mahi, Yellowfin Tuna, and athletic Wahoo with Cabo\'s top-producing tournament crew.',
    highlights: [
      'Private yacht charter - entire boat exclusively for your group of up to 6',
      'Full tournament gear (Penn & Shimano 50w & 80w rods and reels)',
      'Live bait well fully stocked with clean gogglegaye/caballitos',
      'Professional cleaning, icing, and filleting of your catch on return',
      'High-resolution fish-finder GPS sonar targeting active deep currents'
    ],
    included: [
      'Fully USCG licensed Captain & bilingual deckhand crew',
      'All premium rods, tackle, live bait, and artificial lures',
      'Mexican federal individual fishing licenses',
      'Cooler packed with 24 ice-cold Mexican beers, water, and sodas',
      'Ice chests and safety gear'
    ],
    excluded: [
      'Catch vacuum sealing and dry-ice export shipping (available on dock)',
      'Dock departure taxes ($10 USD flat per charter)',
      'Staff gratuity (generally 15-20% of charter fee standard)'
    ],
    itinerary: [
      { time: '06:30 AM', title: 'Early Marina Dock Departure', description: 'Board El Patrón at Dock Slip M-2. Meet Captain Ramirez. Fuel up with fresh breakfast burritos.', iconName: 'Compass' },
      { time: '07:00 AM', title: 'Rigging and Outrigger Deployment', description: 'As we hit deep ocean drop-offs, our deckhands rig real baits and deploy dual outriggers.', iconName: 'Anchor' },
      { time: '08:30 AM', title: 'Active Hookup & Fighter Chair Duals', description: 'Hear the scream of the reel! Strap into the fighting chair for epic battles against heavy pelagic fish.', iconName: 'Skull' },
      { time: '11:30 AM', title: 'Tuna & Mahi Mahi Drift Hunts', description: 'Target underwater seamounts for schoolie yellowfin tuna and high-flying dorado.', iconName: 'Activity' },
      { time: '12:30 PM', title: 'Return and Catch Filleting', description: 'Cruise back as the deckhand details and cleans the fish. Standard dockside packers wrap and freeze your catch.', iconName: 'Scissors' }
    ],
    faqs: [
      { question: 'Do you guarantee we will catch a fish?', answer: 'Sportfishing is dependent on oceanic conditions, but Cabo has the highest bite ratios in North America. Our Captains boast an 85%+ hookups rate. If you catch nothing, we credit 15% toward any future charter.' },
      { question: 'What can we do with the fish we catch?', answer: 'We fillet and bag it for you. Many local Marina restaurants will cook your fresh catch ("You Catch It, We Cook It") for about $15 USD per person including side dishes!' },
      { question: 'Is the boat equipped with stabilizers?', answer: 'Yes, our 33ft Bertram hull is world-famous for its heavy deep-v ballast which cuts cleanly through chop to minimize rolling.' }
    ],
    locationCoords: { lat: 22.8845, lng: -109.9112 },
    locationAddress: 'Dock Slip M-2, Cabo Marina Gateway, Cabo San Lucas, BCS 23400, Mexico',
    languagesSpoken: ['English', 'Spanish'],
    images: [
      { url: 'https://picsum.photos/seed/cabo-fish-1/1200/800', alt: 'Sport fishing boat sliding fast across deep ocean throwing wake' },
      { url: 'https://picsum.photos/seed/cabo-fish-2/1200/800', alt: 'Smiling angler holding up colossal brilliant yellow Mahi Mahi fish' },
      { url: 'https://picsum.photos/seed/cabo-fish-3/1200/800', alt: 'Captain steering yacht from high open flybridge tower' },
      { url: 'https://picsum.photos/seed/cabo-fish-4/1200/800', alt: 'Row of gold Shimano Tiagra reels ready in boat rod holders' },
      { url: 'https://picsum.photos/seed/cabo-fish-5/1200/800', alt: 'Stellar leap of massive blue marlin far on the ocean horizon line' }
    ],
    activityTypes: ['Fishing Charter', 'Deep Sea Fishing', 'Yacht Cruise', 'Ocean Sport'],
    mustKnow: [
      'USCG licensed captain with over 20 years experience',
      'All gears and licenses included - no hidden fees',
      'Marlins capital routes - we hunt the richest thermal lines',
      'Max 6 passengers on board - private exclusive boat charter',
      'Bring polarized sunglasses and sunscreen'
    ]
  },
  whakesharks: {
    id: 'whakesharks',
    title: 'The Giants: Swim with Wild Whale Sharks in La Paz Sanctuary',
    price: 249,
    discountedPrice: 219,
    duration: '8 Hours',
    groupSize: 'Max 6 participants',
    operatorName: 'Baja Eco-Adventures',
    operatorRating: 4.96,
    operatorReviewsCount: 470,
    operatorBadge: 'Eco-Permit holder #004',
    aboutText: 'Fulfill your ultimate bucket-list dream. Snorkel beside the largest fish in the world in the calm, rich nursery waters of La Paz Bay. These gentle filter-feeders grow up to 40 feet long and move with stunning grace. Strictly regulated under Mexican conservation guidelines to ensure a beautiful, non-intrusive environment.',
    highlights: [
      'Bespoke expedition to swim near giant 20ft to 40ft Whale Sharks',
      'Very quiet, high-intimacy groups - max 6 guests per boat permit',
      'All inclusive road transit in clean Mercedes sprinter vans from Cabo',
      'Detailed marine guide explaining oceanic biology and safe swimming habits',
      'Stellar seaside seafood lunch at the historic Malecón of La Paz'
    ],
    included: [
      'Certified Master Marine Biologist and safety guide',
      'Federal SEMARNAT authorized whale shark swim permits',
      'Premium thermal wetsuits and dry-chamber snorkel gear',
      'Air-conditioned private transport with hotel pick-up/drop-off',
      'Multi-course oceanfront lunch and fruit snacks'
    ],
    excluded: [
      'GoPro waterproof rental accessory ($30 split fee)',
      'Gratuities for driver and mariners',
      'La Paz port entry tax ($3 USD per person)'
    ],
    itinerary: [
      { time: '06:30 AM', title: 'Hotel Espresso & Sprinter Boarding', description: 'Climb into our premium transit van. Enjoy morning croissants and organic coffee.', iconName: 'Bus' },
      { time: '08:30 AM', title: 'Arrival at La Paz Port Sanctuary', description: 'Briefing by SEMARNAT officials on safety guidelines (maintain 10ft tail distance).', iconName: 'Layers' },
      { time: '09:00 AM', title: 'Sanctuary Boat Drop & Swim', description: 'Board customized panga hull. Slide into water next to these colossal spots-and-stripes gentle giants as they glide near the surface feed.', iconName: 'Waves' },
      { time: '12:00 PM', title: 'Baja Seaside Lunch', description: 'Stroll the historic Malecón of La Paz. Feast on fresh chocolate clams, fish tacos, and iced cold fruit waters.', iconName: 'Utensils' },
      { time: '01:30 PM', title: 'Scenic Todos Santos Cafe Stop', description: 'Break the return ride with organic coffee and gallery shopping at a beautiful magic desert oasis town.', iconName: 'Sparkles' }
    ],
    faqs: [
      { question: 'Is it completely safe or do they bite?', answer: 'They are filter feeders with microscopic teeth. They strictly eat plankton and ignores humans. They are extremely slow-moving and passive, offering a highly tranquil swim.' },
      { question: 'How long do we get in the water?', answer: 'By environmental law, a maximum of 1 boat can hover per whale shark. Swimmers drop in pairs with our biologist for 15-20 min blocks, completing up to 4 drops.' },
      { question: 'Can kids participate?', answer: 'Children must be at least 8 years old, confident swimmers in deep open-ocean swells, and able to strictly follow speed directions.' }
    ],
    locationCoords: { lat: 24.1426, lng: -110.3126 },
    locationAddress: 'La Paz Marina Boulevard, Malecón eco-dock, La Paz, BCS 23000, Mexico (Includes overland Cabo shuttles)',
    languagesSpoken: ['English', 'Spanish'],
    images: [
      { url: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=1200', alt: 'Vast whale shark feeding near bright sunny ocean surface' },
      { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1200', alt: 'Snorkeler swimming with open arms parallel to giant spots-and-stripes whale shark' },
      { url: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&q=80&w=1200', alt: 'Tourists peering over boat rails at glowing patterns in deep clear water' },
      { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200', alt: 'La Paz Malecón boardwalk lined with palm trees and ocean views' },
      { url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&q=80&w=1200', alt: 'Todos Santos historic church and colorful flags in warm desert sun' }
    ],
    activityTypes: ['Whale Shark Swim', 'Eco Tour', 'La Paz Day Trip', 'Wildlife Safari'],
    mustKnow: [
      'Certified biologist guides - safety focused',
      'Season restricted: November to April only',
      'Strict conservation rules: absolutely no wild touch',
      'Max 6 swimmers per boat - highly selective tour',
      'Full day trip duration (approx 8-9 hours total)'
    ]
  },
  finedining: {
    id: 'finedining',
    title: 'Oceanfront Gastronomy: Cliffside 5-Course Sea-To-Table Dining & Cocktail Pairing',
    price: 160,
    discountedPrice: 135,
    duration: '3 Hours',
    groupSize: 'Max 8 per table',
    operatorName: 'El Farallon Gastronomy',
    operatorRating: 4.96,
    operatorReviewsCount: 1850,
    operatorBadge: 'Michelin-Featured Sea-cliffs',
    aboutText: 'Dine suspended between dramatic cliffs and crashing waves. Located on the rocky shores of Land’s End, El Farallon offers a dramatic open-air culinary theater. Hear the roar of the Pacific and breathe salt-sea air as our master chefs present local ocean catches paired with organic vegetables cooked over lava embers.',
    highlights: [
      'Guaranteed frontline cliffside seating directly above the ocean surf',
      'Immersive custom sea-to-table daily market: select your catch by weight',
      'Complimentary champagne flight and organic amuse-bouche on arrival',
      'Expertly crafted herb and citrus side plates from local pesticide-free farms',
      'Voted most romantic and spectacular dining location in North America'
    ],
    included: [
      'Signature herbal Mezcal welcome cocktail',
      'Full 5-Course ocean tasting feast (locally hooked snapper, red crab, sea bass)',
      'Direct ocean wave protection and outdoor cliffside warming lamps',
      'Chef-guided seasoning demonstration and organic farm garnish pairing',
      'Valet parking at our oceanfront secure gate'
    ],
    excluded: [
      'Subsequent vintage wines by the glass',
      'Wagyu beef upgrade option ($45 USD optional add-on)',
      'Staff gratuities (15-20% standard recommended)'
    ],
    itinerary: [
      { time: '05:45 PM', title: 'Cliffside Ascent & Greeting', description: 'Be ushered down a stone tunnel carved directly into granite mountain over-cliffs.', iconName: 'Compass' },
      { time: '06:15 PM', title: 'Champagne Toast at the Sunset Bar', description: 'Begin your evening at our volcanic rock terrace with complimentary fine bubbles.', iconName: 'Wine' },
      { time: '06:45 PM', title: 'Interactive Caught-Daily Selection', description: 'Review the dayboat catch iced on our market tables. Customize your prep by weight.', iconName: 'ChefHat' },
      { time: '07:15 PM', title: 'The Main Sea-To-Table Feast', description: 'Dine above breaking waves. Feast on your coal-grilled fish and organic side plates.', iconName: 'Utensils' },
      { time: '08:45 PM', title: 'Lava-Baked Dessert & Spiced Carajillo', description: 'End your culinary tour with a Mexican spiced artisanal coffee and house-churned sweets.', iconName: 'Flame' }
    ],
    faqs: [
      { question: 'Is there a strict dress code for the cliffside decks?', answer: 'We recommend smart casual. Collared shirts or elegant resort attire is ideal. Due to real coastal breezes, bringing a light jacket or pashmina is highly advised.' },
      { question: 'Do you offer options for vegan, gluten-free, or shellfish allergies?', answer: 'Yes! Our executive chef customizes individual courses. Your waiter will ask for precise dietary concerns prior to the selection of your main catches. We offer amazing vegan options.' },
      { question: 'What is the waves splash warning?', answer: 'Our tables are protected by elevated glass breakers, ensuring panoramic sea sights without the hazard of direct wave splash. Safe, thrilling, and dry!' }
    ],
    locationCoords: { lat: 22.8752, lng: -109.9123 },
    locationAddress: 'Solmar Boulevard Km 1.5, Sea Cliff District, Cabo San Lucas, BCS 23400, Mexico',
    languagesSpoken: ['English', 'Spanish', 'German'],
    images: [
      { url: 'https://picsum.photos/seed/cabo-dine-1/1200/800', alt: 'Dramatic sunset dining tables set on volcanic rocks next to crushing waves' },
      { url: 'https://picsum.photos/seed/cabo-dine-2/1200/800', alt: 'Chef grilling freshly caught sea bass on open coal flames with sparks' },
      { url: 'https://picsum.photos/seed/cabo-dine-3/1200/800', alt: 'A glass of sparkling white champagne with beautiful cliffside background landscape' },
      { url: 'https://picsum.photos/seed/cabo-dine-4/1200/800', alt: 'Gourmet plate of seared red snapper on herb cream with microgreens' },
      { url: 'https://picsum.photos/seed/cabo-dine-5/1200/800', alt: 'Happy couples laughing during sunset next to warm fires on rock deck' }
    ],
    activityTypes: ['Fine Dining', 'Seafood Gastronomy', 'Romantic Table', 'Wine Pairings'],
    mustKnow: [
      'Dress Code: Smart casual - collared shirts & elegant beach resort wear',
      'Outdoor breeze warning: bring light layers for sunset draft',
      'Prior reservation required - sunset slots fill weeks in advance',
      'Dietary-friendly: fully adapted for vegan and shellfish allergies',
      'Refund-safe: cancel or edit booking up to 24-hours for full return'
    ],
    pdfMenuUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    bestDishes: [
      {
        name: 'Caballa Imperial al Fuego de Lava',
        photoUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600',
        description: 'Seared imperial mackerel with micro herb reduction, hand-harvested sea salt, and coal ember foam.',
        price: '$48'
      },
      {
        name: 'Langosta Roja de Ensenada',
        photoUrl: 'https://images.unsplash.com/photo-1553618551-fba689030290?auto=format&fit=crop&q=80&w=600',
        description: 'Sustainably caught grilled red lobster, served with local sea-salted botanical butter and sunset garden flowers.',
        price: '$65'
      },
      {
        name: 'Pescado Huachinango Entero',
        photoUrl: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&q=80&w=600',
        description: 'Whole hook-and-line golden red snapper, slow smoked over burning local mesquite wood embers.',
        price: '$52'
      }
    ]
  },
  beachside: {
    id: 'beachside',
    title: 'Sur Beach Lounge: Vibrant Waterfront Cabana Dining & Cocktail Lounge',
    price: 80,
    discountedPrice: 65,
    duration: '4 Hours',
    groupSize: 'Max 12 guests',
    operatorName: 'Sur Beach Club',
    operatorRating: 4.88,
    operatorReviewsCount: 1450,
    operatorBadge: 'Voted Best Beach Lounge Vibe',
    aboutText: 'Bask in the upscale, breezy energy of Medano Beach. Sur Beach Lounge redefines waterfront dining with sleek double-width canvas daybeds, toes-in-the-sand dining setups, and a high-vibration soundtrack. Savor Asian-Mexican fusion, cold-pressed mocktails, and fresh ceviches directly on Cabo’s most active sandy shoreline.',
    highlights: [
      'Guaranteed oceanfront double daybed reservation with umbrella shade',
      'High-vibe atmosphere with live acoustic or resident sunset beach DJ',
      'Toes-in-the-sand beachfront tables steps from swimmable waters',
      'Sumptuous local seafood ceviches and signature cold-shaked Margaritas',
      'Full resort-caliber beach lockers, showers, and towel service standard'
    ],
    included: [
      'Reserved private canvas beachfront daybed or luxury dining table',
      'Welcome tropical cold-pressed juice or craft draft beer',
      'Full security and glass-free sanitized soft-sand environment',
      'Exclusive beach club pool and private lockers/showers access',
      'Priority shuttle pickup from Cabo Marina Gate 1'
    ],
    excluded: [
      'Subsequent visual cocktail or spirits buckets',
      'Premium umbrella canopy extensions ($20 flat)',
      'Ocean paddleboard & jet-ski rentals (available next door)'
    ],
    itinerary: [
      { time: '11:30 AM', title: 'Beach Club Welcoming', description: 'Check-in at our lounge desk. Sip your signature ice-chilled welcome drink and choose your daybed.', iconName: 'Compass' },
      { time: '12:30 PM', title: 'Seaside Ceviches & Cold Shells', description: 'A culinary tray is brought to your beach canopy: fresh octopus tiradito and cold-shaked lime mocktails.', iconName: 'Utensils' },
      { time: '02:00 PM', title: 'Swim Station & Paddle Sports', description: 'Cool off in the safe, fully swimmable waters of Medano Beach or use complimentary towels for a sun bath.', iconName: 'Waves' },
      { time: '03:30 PM', title: 'Sunset Cocktails & Live DJ Beat', description: 'As the light turns gold, our resident DJ blends ambient lounge tunes on the beach deck terrace.', iconName: 'Music' }
    ],
    faqs: [
      { question: 'Is the water safe for swimming in front of Sur Beach Club?', answer: 'Yes! Medano Beach is the only 100% safe, swimmable beach in Cabo San Lucas, protected from harsh Pacific undertows by the Land’s End reserve.' },
      { question: 'What is the minimum spend for daybeds?', answer: 'Your booking reservation includes a $65 USD credit that goes 100% towards your food and drink orders during your stay. No double hidden fees!' },
      { question: 'Are children allowed at the beach club?', answer: 'Absolutely! We are highly family-friendly, offering custom children’s menus, shallow shoreline setups, and strict glass-free safety protocols.' }
    ],
    locationCoords: { lat: 22.8912, lng: -109.9073 },
    locationAddress: 'Medano Beach, Cabo San Lucas, BCS 23400, Mexico',
    languagesSpoken: ['English', 'Spanish'],
    images: [
      { url: 'https://picsum.photos/seed/beachside-1/1200/800', alt: 'Chic resort daybeds with blue-and-white canvas pillows on pristine swimmable beach' },
      { url: 'https://picsum.photos/seed/beachside-2/1200/800', alt: 'Brilliant turquoise cocktail glass with fresh mint and limes sitting on white beach sand' },
      { url: 'https://picsum.photos/seed/beachside-4/1200/800', alt: 'A group of bachelorette travelers drinking cold rose on ocean deck' }
    ],
    activityTypes: ['Beach Club', 'Waterfront Dining', 'Seafood ceviche', 'Cocktails'],
    mustKnow: [
      'Medano Beach front - 100% safe swimmable waters',
      'No external coolers or glassware allowed on beach paths',
      'Included $65 USD reservation fee goes fully to food/beverages order',
      'Towel service and lockers access included with daybed booking',
      'Rescheduling is free if rain alerts occur'
    ],
    pdfMenuUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    bestDishes: [
      {
        name: 'Tiradito de Pulpo y Jalapeño',
        photoUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
        description: 'Thin-sliced cold octopus in a signature chilled lime emulsion, topped with jalapeño slivers and coriander petals.',
        price: '$22'
      },
      {
        name: 'Tacos de Camarón Tempura',
        photoUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600',
        description: 'Incredibly crispy hand-battered shrimp atop avocado silk and local blue corn tortillas.',
        price: '$18'
      },
      {
        name: 'Ceviche de Robalo al Coco',
        photoUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600',
        description: 'Wild sea bass cured in cold-pressed organic coconut water, baby ginger, sliced purple onion, and crisp cucumbers.',
        price: '$24'
      }
    ]
  },
  organicfarm: {
    id: 'organicfarm',
    title: 'The Farmhouse: Gourmet Organic Garden Dinner & Herb Harvest Tour',
    price: 110,
    discountedPrice: 95,
    duration: '3.5 Hours',
    groupSize: 'Max 10 guests per table',
    operatorName: 'Flora Farms Culinary',
    operatorRating: 4.98,
    operatorReviewsCount: 2940,
    operatorBadge: 'Michelin Recommended Estate',
    aboutText: 'Re-establish your connection to earth. Tucked away in the peaceful foothills of San Jose del Cabo, Flora Farms is a 25-acre organic working oasis. Dine adjacent to the very fields where your dinner was grew. Feast on handcrafted wood-fired pizzas, artisanal field-raised dynamics, and crisp field-to-glass botanical cocktails.',
    highlights: [
      'Al fresco dining surrounded by lush organic heirloom crops and herb rows',
      'Guided pre-dinner harvesting walk with an estate horticulturist expert',
      'World-famous wood-fired farm pizzas and field-raised cured meats',
      'Signature "Farmarita" botanical cocktail or local organic wine upon arrival',
      'Stroll beautiful stone courtyard shops and historic farm buildings'
    ],
    included: [
      'Guided historical botanical garden harvesting walk',
      'Reserved shaded garden view table or dynamic courtyard pavilion seat',
      'Complete farm-to-table banquet (hand-stretched pizza, farm sausages, micro greens)',
      'Welcome botanical cocktail or award-winning herbal tea',
      'Safe air-conditioned valley estate shuttle drop-off access'
    ],
    excluded: [
      'Artisanal farm-shop honey and homecraft soap purchases',
      'Extra reserve wine pairings by the bottle',
      'Specialist cooking workshops (available for advance booking)'
    ],
    itinerary: [
      { time: '04:30 PM', title: 'Estate Arrival & Herb Flight', description: 'Enter our gated valley oasis. Receive an organic cold refreshment and meet your horticulturist host.', iconName: 'Compass' },
      { time: '05:00 PM', title: 'Botanical Fields Crop Walk', description: 'Wander rows of blossoming flowers, pluck heirloom tomatoes, and feed our rescue farm animals.', iconName: 'Leaf' },
      { time: '06:00 PM', title: 'Farmhouse Al Fresco Banquet', description: 'Be seated under string lights in the gardens. Savor wood-fired treats and organic field cuts.', iconName: 'ChefHat' },
      { time: '07:30 PM', title: 'Pecan Pie & Live Acoustic Chord', description: 'Enjoy warm desserts around cozy fire pits under the stars, accompanied by dynamic acoustic music.', iconName: 'Utensils' }
    ],
    faqs: [
      { question: 'Where is Flora Farms located and is transport available?', answer: 'Flora Farms is nestled in the peaceful Animas Valleys just 10 minutes outside historic San Jose del Cabo. Our concierge can secure resort shuttles for a slight fee.' },
      { question: 'Is the food 100% organic?', answer: 'Yes! All crops are 100% pesticide-free, organic, and hand-harvested daily. Our meats are humanely field-raised on our sister ranch in the hills.' },
      { question: 'Can we buy farm-fresh crops and goods?', answer: 'Certainly! Our historic estate hosts a beautiful organic farm shop where you can purchase hand-harvested herbs, honey, clean soaps, and raw veggies.' }
    ],
    locationCoords: { lat: 23.0801, lng: -109.6845 },
    locationAddress: 'Animas Valleys Highway Km 2, Organic Farm District, San Jose del Cabo, BCS 23407, Mexico',
    languagesSpoken: ['English', 'Spanish'],
    images: [
      { url: 'https://picsum.photos/seed/farm-1/1200/800', alt: 'Beautiful family-style wooden table set in middle of green cabbage crops under string lights' },
      { url: 'https://picsum.photos/seed/farm-2/1200/800', alt: 'Bright yellow lemon cocktail decorated with a lavender sprig' },
      { url: 'https://picsum.photos/seed/farm-3/1200/800', alt: 'Crisp woodfired pizza loaded with fresh rocket and balsamic oil' },
      { url: 'https://picsum.photos/seed/farm-4/1200/800', alt: 'Old rustic stone building with beautiful colorful flower trellises' }
    ],
    activityTypes: ['Farm to Table', 'Organic Dinners', 'Garden Walks', 'Botanical drinks'],
    mustKnow: [
      'Genuinely organic, pesticide-free valley working farm estate',
      'Comfortable flat shoes highly recommended for agricultural fields crawl',
      'Advanced reservations are highly required - limited tables',
      'Fully wheelchair and family stroller accessible paths',
      'Tasting menus include amazing vegan, nut-free and dairy-free options'
    ],
    pdfMenuUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    bestDishes: [
      {
        name: 'Pizza de Hinojo y Salchicha Casera',
        photoUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
        description: 'Crisp wood-fired sourdough base with estate-made organic fennel pork sausage, hand-pulled mozzarella, and garden rockets.',
        price: '$28'
      },
      {
        name: 'Puerco de la Granja en Cocción Lenta',
        photoUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
        description: '12-hour slow braised heritage pork chop, fire-roasted sweet corn mash, and homecrafted honey wildflower glaze.',
        price: '$38'
      },
      {
        name: 'Ensalada de Heirloom cosechada a mano',
        photoUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600',
        description: 'Sunset-harvested heirloom tomatoes, farm burrata, fresh basil flowers, and organic local citrus balsamic spray.',
        price: '$21'
      }
    ]
  },
  beachresort: {
    id: 'beachresort',
    title: 'The Cape Sanctuary: Oceanfront Luxury Suite & Private Plunge Pool Lounge',
    price: 850,
    discountedPrice: 720,
    duration: 'Per Night Stayed',
    groupSize: 'Max 4 guests per suite',
    operatorName: 'The Cape Luxury Resorts',
    operatorRating: 4.97,
    operatorReviewsCount: 2410,
    operatorBadge: 'Voted #1 Luxury Resort',
    aboutText: 'Immerse into a modern architectural masterpiece. Hanging dramatically on Cabo’s premier surfing shores, The Cape blends mid-century retro design with luxury oceanfront views. Wake up to direct panoramic view of the Land’s End Arch, relax in your private copper soaking tub, and enjoy custom butler attention.',
    highlights: [
      'Guaranteed oceanfront deluxe suite with panoramic views of the Arch (El Arco)',
      'Balcony terrace featuring suspended plunge pool and plush hanging daybeds',
      'Direct private access to Monuments surfing beach and safe tide-pools',
      'Complimentary welcome craft tequila decanter designed by local master artisans',
      'Ranked in Top 5 Resorts in Western Mexico with private 24/7 dedicated butler'
    ],
    included: [
      'Luxurious 1,200 sq.ft. Oceanfront Studio Suite with private pool deck',
      'Daily gourmet breakfast buffet at our cliffside signature restaurant',
      '24/7 private dedicated butler service and in-room checkout',
      'Full access to our famous rooftop sunset sound lounge and infinity pools',
      'Resort security patrol with secure gated digital entryway checkpoint'
    ],
    excluded: [
      'Private yacht charter bookings (available via concierge)',
      'Signature ocean-mud massage treatments at Current Spa',
      'Valet airport luxury Tesla transfers ($90 USD optional cover)'
    ],
    itinerary: [
      { time: '03:00 PM', title: 'Tesla Welcome & In-Room Check', description: 'Arrive via our private airport cruiser. Sip fresh tequila sours as your butler completes your in-suite check-in.', iconName: 'Compass' },
      { time: '04:30 PM', title: 'Sunset Balcony Daybed Lounge', description: 'Relax on your balcony’s suspended couch. Watch the surfers at Monuments Beach.', iconName: 'Waves' },
      { time: '06:00 PM', title: 'Rooftop Lounge DJ Beats', description: 'Ascend to Cabo’s premier rooftop bar. Enjoy sunset views of the Arch while listening to ambient beats.', iconName: 'Music' },
      { time: '08:00 AM', title: 'Al Fresco Buffet Breakfast', description: 'Savor organic eggs, cured bacon, and local pastries on our cliffhanging dining courtyard.', iconName: 'Utensils' }
    ],
    faqs: [
      { question: 'Are all rooms guaranteed to face the Arch?', answer: 'Yes! Every single suite at The Cape is strategically aligned to offer an unobstructed, beautiful panoramic view of the ocean and the famous Land’s End Arch.' },
      { question: 'Is the beach directly in front of the resort safe for swimming?', answer: 'The beach (Monuments Beach) is an active world-renowned surfing shore. While it features safe, shallow rocky tide pools for wading, we recommend swimming in our pristine infinity-edge pools.' },
      { question: 'What butler services are included in our stay?', answer: 'Your dedicated butler handles check-in, unpacks bags, schedules dinner tables, reserves beach daybeds, and delivers fresh afternoon espresso to your private deck.' }
    ],
    locationCoords: { lat: 22.8801, lng: -109.8745 },
    locationAddress: 'Federal Highway Km 5, Mision District, Cabo San Lucas, BCS 23455, Mexico',
    languagesSpoken: ['English', 'Spanish', 'Portuguese'],
    images: [
      { url: 'https://picsum.photos/seed/cape-1/1200/800', alt: 'Stunning resort infinity pool looking directly at the iconic granite Arch' },
      { url: 'https://picsum.photos/seed/cape-2/1200/800', alt: 'Modern luxury bedroom suite with dark-wood walls and sea-view glass windows' },
      { url: 'https://picsum.photos/seed/cape-3/1200/800', alt: 'Stellar round copper tub filled with water next to oceanfront view panels' },
      { url: 'https://picsum.photos/seed/cape-4/1200/800', alt: 'Rooftop cocktail lounge under beautiful warm orange starry night sky' }
    ],
    activityTypes: ['Resort Stay', 'Luxury Lodging', 'Arch Views', 'Infinity Pools'],
    mustKnow: [
      '100% oceanfront views from all suites - Arch-aligned layouts',
      'Monuments beach is surfing-active - swimmable tide-pools only',
      'Butler service available 24/7 via simple text or room phone button',
      'Check-in is 3:00 PM; checkout is 12:00 PM with free luggage holding',
      'Resort features gated vehicle security and guest verification logs'
    ],
    roomTypes: [
      {
        name: 'Deluxe Oceanfront Junior Suite',
        photoUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=600',
        pricePerNight: '$720',
        features: ['Full King-size organic bed', 'Balcony plunge pool', 'Bespoke copper soaking tub'],
        size: '1200 sq.ft.'
      },
      {
        name: 'Thompson Oceanfront Vista Suite',
        photoUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600',
        pricePerNight: '$890',
        features: ['Hanging daybed on private terrace', 'Custom cocktail wetbar', 'In-room digital soundbar'],
        size: '1450 sq.ft.'
      },
      {
        name: 'Panoramic Arch-View Rooftop Penthouse',
        photoUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600',
        pricePerNight: '$1,400',
        features: ['Expansive rooftop terrace', 'Double private plunge pools', 'Elite butler attention 24/7'],
        size: '2800 sq.ft.'
      }
    ],
    amenities: [
      {
        name: 'Arch-Facing Sunset Infinity Pools',
        description: 'Double-level heated infinity swimming pools aligning beautifully with the Land’s End Arch.',
        iconName: 'Waves'
      },
      {
        name: 'Current Wellness Stone & Mud Spa',
        description: 'Exclusive volcanic cave treatment suites featuring local herbal wraps and marine-mud clay body therapy.',
        iconName: 'Sparkles'
      },
      {
        name: 'Acoustic Sound Rooftop Lounge',
        description: 'Cabo’s premier rooftop bar featuring sunset fire pits, high-end cocktail mixologists, and regular boutique DJ programs.',
        iconName: 'Music'
      }
    ]
  },
  luxuryvilla: {
    id: 'luxuryvilla',
    title: 'Villas Del Mar: Ultra-Luxury Gated Oceanfront Estate with Private Staff',
    price: 3200,
    duration: 'Per Night Package',
    groupSize: 'Up to 12 guests',
    operatorName: 'Villas Del Mar Estates',
    operatorRating: 4.99,
    operatorReviewsCount: 340,
    operatorBadge: 'Certified Ultra-Elite Gated Estate',
    aboutText: 'Step into the playground of presidents and celebrities. Villas Del Mar offers a portfolio of hand-detailed cliffside and beach estates inside the legendary gated gates of Palmilla. Experience ultimate security, an infinity-edge pool that blends into the sea, a private golf cart fleet, and dedicated professional staff including an in-villa butler and chef.',
    highlights: [
      'Gargantuan 6,500 sq.ft. private oceanfront estate with absolute privacy',
      'Dedicated 24/7 white-glove butler and Master Mexican Culinary Chef staff',
      'Double-gated elite resort community with continuous guard and ocean patrols',
      'Private infinity pool, beachside fire pits, and direct sandy beach crossover',
      'Complimentary golf cart fleet and premium luxury SUV with private chauffeur'
    ],
    included: [
      'Entire private 5-Bedroom Oceanfront Estate with heating infinity pool',
      'Private Chef culinary service (ingredients charged at local cost only)',
      '24/7 dedicated personal butler and laundry/maid service',
      'Full access to the private exclusive Palmilla Beach Club and Golf Course',
      'Complimentary luxury SUV and driver for local Cabo excursions'
    ],
    excluded: [
      'Cost of food ingredients and imported fine wines',
      'Tee times green fees at the Jack Nicklaus Signature golf course',
      'Yacht charters or deep-sea fishing bookings ( butler handles)'
    ],
    itinerary: [
      { time: '02:00 PM', title: 'Chauffeur Pick & Gated Welcomes', description: 'Be greeted at Cabo airport by your local private driver. Enter through our triple-gated neighborhood.', iconName: 'Compass' },
      { time: '03:00 PM', title: 'Villa Tour & Chef Appetizers', description: 'Your butler conducts a walkthrough of your massive estate. Savor freshly prepared lobster tostadas.', iconName: 'ChefHat' },
      { time: '05:30 PM', title: 'Infinity Pool Swim & Sunset Fire', description: 'Unwind in your private pool that reaches to the sand. Your butler lights the beachside wood fire pit.', iconName: 'Waves' },
      { time: '07:30 PM', title: 'Formal Courtyard Grand Feast', description: 'Savor a custom-designed candlelit meal cooked on-property by your private chef.', iconName: 'Utensils' }
    ],
    faqs: [
      { question: 'What security protocols are active at Villas Del Mar?', answer: 'We feature Cabo’s most secure community. Protocols include biometric gated checkpoints, roaming vehicular guards, oceanfront water watches, and fully vetted, background-cleared staff.' },
      { question: 'Is the private chef included in the price listed?', answer: 'Yes! The chef’s cooking, preparation, and cleaning is entirely complimentary. You only pay the exact grocery receipt cost of the food ingredients.' },
      { question: 'Can we access the resort golf course?', answer: 'Absolutely! Our guests receive priority access and tee-time bookings for the championship 27-hole Jack Nicklaus Palmilla Golf Course.' }
    ],
    locationCoords: { lat: 23.0125, lng: -109.7185 },
    locationAddress: ' Palmilla Boulevard Km 27.5, Gated Estates, San Jose del Cabo, BCS 23400, Mexico',
    languagesSpoken: ['English', 'Spanish'],
    images: [
      { url: 'https://picsum.photos/seed/villa-1/1200/800', alt: 'Vast white stone villa estate looking over sprawling blue swimming pools' },
      { url: 'https://picsum.photos/seed/villa-2/1200/800', alt: 'Private chef preparing miniature seafood bites on clean white cutting wood' },
      { url: 'https://picsum.photos/seed/villa-3/1200/800', alt: 'Plush beige luxury living room with wide open sliding glass walls' },
      { url: 'https://picsum.photos/seed/villa-4/1200/800', alt: 'Romantic beach bonfire lit at night on sand next to luxury outdoor couches' }
    ],
    activityTypes: ['Private Villa', 'Luxury Estates', 'Private Staff', 'Palmilla Golf'],
    mustKnow: [
      'Gated elite community - maximum security credentials required',
      'Chef services included; food grocery cost charged on real receipt',
      'Complimentary golf carts and luxury SUV with driver provided',
      'Accommodates up to 12 guests strictly in 5-bedroom suites',
      'Free cancellation up to 30 days before requested check-in'
    ],
    roomTypes: [
      {
        name: 'La Casita Gated Ocean Estate',
        photoUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=600',
        pricePerNight: '$3,200',
        features: ['5 Individual King Bedrooms', 'Attached white-glove staff quarters', 'Heated salt-water infinity pool'],
        size: '6500 sq.ft.'
      },
      {
        name: 'Villa Sunrise Frontline Beach Mansion',
        photoUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
        pricePerNight: '$4,800',
        features: ['Direct soft-sand shoreline crossover', 'Indoor waterfall spa', 'Outdoor stone chef grill station'],
        size: '8200 sq.ft.'
      },
      {
        name: 'El Acantilado Clifftop Master Estate',
        photoUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600',
        pricePerNight: '$5,550',
        features: ['Breathtaking 360-degree ocean view panels', 'Gated private helicopter pad access', '6 Deluxe oceanfront suites'],
        size: '9500 sq.ft.'
      }
    ],
    amenities: [
      {
        name: 'White-Glove Butler & Executive Chef Staffs',
        description: 'Your private team coordinates all custom dining preparations and estate bookings without extra hourly rates.',
        iconName: 'ChefHat'
      },
      {
        name: 'Biometric Double-Gate Security Protection',
        description: 'Cabo’s most premium gated enclave, protected by background-cleared staff and roaming patrol vehicles.',
        iconName: 'ShieldCheck'
      },
      {
        name: 'Chauffeured Luxury SUV & Electric Cart Fleet',
        description: 'A fleet of private electric golf buggies and an executive SUV with a certified guide chauffeur is always at hand.',
        iconName: 'Compass'
      }
    ]
  },
  boutiqueart: {
    id: 'boutiqueart',
    title: 'Hotel El Ganzo: Artistic Design, Recording Studio & Panoramic Rooftop Pool',
    price: 320,
    discountedPrice: 280,
    duration: 'Per Night Stayed',
    groupSize: 'Max 2 guests per suite',
    operatorName: 'Hotel El Ganzo Brand',
    operatorRating: 4.86,
    operatorReviewsCount: 1120,
    operatorBadge: 'Voted Coolest Boutique Hotel',
    aboutText: 'Unleash your creative spirit. Nestled in San José’s Puerto Los Cabos marina, El Ganzo is a boundary-pushing, adults-only playground. We blend artistic expression with beachside relaxation, featuring active artist residencies, beautiful hand-drawn wall installations, and an underwater recording studio that hosts world-class musical acts.',
    highlights: [
      'Adults-only artistic concept hotel facing the Puerto Los Cabos Marina',
      'Stunning 360-degree panoramic glass rooftop pool and sushi cocktail lounge',
      'Live music and art events including underground studio concerts and sessions',
      'Complimentary private shuttle and ferry boat to our private beach club',
      'In-room organic cotton robes and custom artistic handcrafted visual features'
    ],
    included: [
      'Deluxe Marina-View Creator Suite with custom artistic woodwork',
      'Daily curated wellness items and hot fitness classes',
      'Private ferry boat access to the beach club sanctuary',
      'Curated bicycles fleet to ride to local historic art walks',
      'High-speed Wi-Fi and parking with zero hidden resort fees'
    ],
    excluded: [
      'Private studio recording session packages ($120/hr)',
      'Sushi and signature cocktails ordered on the rooftop bar',
      'Airport car transfers (available upon marina dispatch)'
    ],
    itinerary: [
      { time: '03:00 PM', title: 'Art-Infused Check-In', description: 'Be welcomed at our lobby. Hand-drawn art murals line every corridor. Enjoy our artisan craft craft beer.', iconName: 'Compass' },
      { time: '04:30 PM', title: 'Rooftop Infinity Splash', description: 'Swim in our transparent glass walls pool facing yachts in the Puerto Los Cabos marina.', iconName: 'Waves' },
      { time: '06:00 PM', title: 'Sunset Ferry & Private Beach Club', description: 'A short wooden boat ferry ride whisks you to our quiet sandy oceanfront beach deck.', iconName: 'Compass' },
      { time: '09:00 PM', title: 'Live Studio Sound Session', description: 'Descend to the underground recording room. Savor cocktails over acoustic sets from active residencies.', iconName: 'Music' }
    ],
    faqs: [
      { question: 'Is Hotel El Ganzo strictly for adults only?', answer: 'Yes! To maintain our unique, quiet creative environment and lively rooftop nightlife, El Ganzo is reserved exclusively for guests aged 18 and older.' },
      { question: 'How close is the private beach club?', answer: 'The beach club is a short 2-minute ride away, accessible by a fun, scenic wooden ferry boat that departs continuously from the marina docks behind our lobby.' },
      { question: 'What is the active artist residency program?', answer: 'We invite painters, sculptors, and musicians from across the globe to live and create at our property. Guests can watch live murals being painted or listen to recording sessions!' }
    ],
    locationCoords: { lat: 23.0615, lng: -109.6712 },
    locationAddress: 'Tiburon Boulevard Km 1.5, Marina District, San Jose del Cabo, BCS 23403, Mexico',
    languagesSpoken: ['English', 'Spanish', 'Italian'],
    images: [
      { url: 'https://picsum.photos/seed/ganzo-1/1200/800', alt: 'Fabulous glass infinity pool with panoramic views of yachts in tropical marina' },
      { url: 'https://picsum.photos/seed/ganzo-2/1200/800', alt: 'A musician playing acoustic guitar next to sound boards in high-tech recording cave' },
      { url: 'https://picsum.photos/seed/ganzo-3/1200/800', alt: 'A bedroom wall covered in detailed custom line drawings and patterns' },
      { url: 'https://picsum.photos/seed/ganzo-4/1200/800', alt: 'Rooftop sushi bar with white stools under beautiful yellow sun cover sails' }
    ],
    activityTypes: ['Boutique Stay', 'Adults Only', 'Art & Music', 'Rooftop Pool'],
    mustKnow: [
      'Adults-only concept hotel - guest must be age 18 and up',
      'Ferry service to private beach club is fully complementary for guests',
      'Artistic community format: live music sessions and open art walls',
      'Marina location is peaceful; Cabo San Lucas is 30 mins drive',
      'Transparent billing: absolutely no added hidden resort fees'
    ],
    roomTypes: [
      {
        name: 'Marina View Creator Studio Suite',
        photoUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600',
        pricePerNight: '$280',
        features: ['Individual custom woodcraft carvings', 'Sliding glass balcony facing yachts', 'Artisan beer and fresh juice welcome'],
        size: '680 sq.ft.'
      },
      {
        name: 'The Very Large Artist suite',
        photoUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=600',
        pricePerNight: '$410',
        features: ['Authentic freestanding bronze clawfoot bath', 'Sizable custom cedar drawing table', 'Bespoke vintage vinyl record player'],
        size: '1100 sq.ft.'
      },
      {
        name: 'Underwater Rec-Room Villa Suite',
        photoUrl: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=600',
        pricePerNight: '$680',
        features: ['Direct acoustic line to recording chambers', 'Unique wall murals signature', 'Premium spirits selection cabinet'],
        size: '1800 sq.ft.'
      }
    ],
    amenities: [
      {
        name: 'Active Artist-In-Residence Galleries',
        description: 'Vibrant hallways and canvas stations where visiting international painters draw and sculpt original installations.',
        iconName: 'Sparkles'
      },
      {
        name: 'Underground Professional Sound Recording Cave',
        description: 'A fully isolated state-of-the-art recording room where musicians hold exclusive acoustic sets.',
        iconName: 'Music'
      },
      {
        name: 'Glass-Wall Marina Sunset Rooftop',
        description: 'A stellar transparent window-paned swimming pool with 360-degree vistas over yachts and harbor channels.',
        iconName: 'Waves'
      }
    ]
  }
};

export const relatedRestaurantsList: RelatedListing[] = [
  {
    name: 'El Squid Roe',
    category: 'Restaurant & Social Club',
    cuisineOrTag: 'Mexican · Burgers · Cocktail Bar',
    imageUrl: 'https://picsum.photos/seed/elsquid/800/600',
    rating: 4.6,
    reviewsCount: 3820
  },
  {
    name: 'Flora Farms',
    category: 'Organic Farm-to-Table',
    cuisineOrTag: 'Heirloom Pizzas · Garden Dining · Cocktails',
    imageUrl: 'https://picsum.photos/seed/florafarms/800/600',
    rating: 4.9,
    reviewsCount: 2940
  },
  {
    name: 'Los Tres Gallos',
    category: 'Traditional Mexican',
    cuisineOrTag: 'Authentic Mole · Handmade Tortillas · Tequila',
    imageUrl: 'https://picsum.photos/seed/tresgallos/800/600',
    rating: 4.8,
    reviewsCount: 1980
  }
];
