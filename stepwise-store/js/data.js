// ===========================
// STEPWISE — PRODUCT DATA
// ===========================

const products = [
  {
    id: 1,
    name: "Air Luxe Pro",
    category: "pria",
    categoryLabel: "Pria",
    emoji: "👟",
    price: 1850000,
    oldPrice: 2200000,
    badge: "sale",
    badgeLabel: "SALE",
    rating: 4.9,
    reviewCount: 234,
    bg: "linear-gradient(135deg,#1a1a2e,#2d2d4e)",
    sizes: [39,40,41,42,43,44],
    desc: "Sepatu lari premium dengan teknologi bantalan udara canggih. Desain modern minimalis cocok untuk olahraga dan aktivitas sehari-hari.",
    color: "#6464bd"
  },
  {
    id: 2,
    name: "Oxford Elite",
    category: "pria",
    categoryLabel: "Pria",
    emoji: "👞",
    price: 2200000,
    badge: "new",
    badgeLabel: "NEW",
    rating: 4.8,
    reviewCount: 167,
    bg: "linear-gradient(135deg,#2d1b00,#4a3000)",
    sizes: [39,40,41,42,43,44],
    desc: "Sepatu pantofel kulit asli dengan finishing premium. Pilihan sempurna untuk acara formal dan business meeting.",
    color: "#c9a96e"
  },
  {
    id: 3,
    name: "Sport Luxe X",
    category: "sport",
    categoryLabel: "Sport",
    emoji: "🥿",
    price: 1650000,
    rating: 4.7,
    reviewCount: 312,
    bg: "linear-gradient(135deg,#0d1b2a,#1a3050)",
    sizes: [38,39,40,41,42,43],
    desc: "Sepatu sport multifungsi dengan material breathable berkualitas tinggi. Performa optimal untuk berbagai jenis olahraga.",
    color: "#6495ed"
  },
  {
    id: 4,
    name: "Lady Grace",
    category: "wanita",
    categoryLabel: "Wanita",
    emoji: "👠",
    price: 1950000,
    badge: "new",
    badgeLabel: "NEW",
    rating: 4.9,
    reviewCount: 198,
    bg: "linear-gradient(135deg,#2d0a2d,#4a1450)",
    sizes: [36,37,38,39,40],
    desc: "High heels elegan dengan desain kontemporer. Nyaman dipakai sepanjang hari dengan insole khusus ergonomis.",
    color: "#c87aba"
  },
  {
    id: 5,
    name: "Urban Walker",
    category: "pria",
    categoryLabel: "Pria",
    emoji: "👟",
    price: 1450000,
    oldPrice: 1800000,
    badge: "sale",
    badgeLabel: "SALE",
    rating: 4.6,
    reviewCount: 445,
    bg: "linear-gradient(135deg,#0a1a0a,#1a3020)",
    sizes: [40,41,42,43,44,45],
    desc: "Sneakers urban dengan gaya streetwear kekinian. Sole karet tebal anti-slip untuk kenyamanan berjalan seharian.",
    color: "#5aaa6e"
  },
  {
    id: 6,
    name: "Velvet Bloom",
    category: "wanita",
    categoryLabel: "Wanita",
    emoji: "👡",
    price: 1750000,
    rating: 4.8,
    reviewCount: 223,
    bg: "linear-gradient(135deg,#2d1a00,#4a2d0a)",
    sizes: [36,37,38,39,40],
    desc: "Flat shoes berbahan beludru premium dengan detail bordir halus. Elegan dan nyaman untuk berbagai kesempatan.",
    color: "#d4a56a"
  },
  {
    id: 7,
    name: "Kids Sprinter",
    category: "anak",
    categoryLabel: "Anak",
    emoji: "👟",
    price: 850000,
    badge: "new",
    badgeLabel: "NEW",
    rating: 4.7,
    reviewCount: 156,
    bg: "linear-gradient(135deg,#001a2d,#002d4a)",
    sizes: [28,29,30,31,32,33,34,35],
    desc: "Sepatu olahraga anak dengan material ringan dan breathable. Velcro closure untuk kemudahan pemakaian mandiri.",
    color: "#4a9fe0"
  },
  {
    id: 8,
    name: "Trail Blazer",
    category: "sport",
    categoryLabel: "Sport",
    emoji: "🥾",
    price: 2100000,
    rating: 4.9,
    reviewCount: 89,
    bg: "linear-gradient(135deg,#1a0a00,#2d1800)",
    sizes: [39,40,41,42,43,44],
    desc: "Sepatu hiking premium dengan teknologi waterproof dan sol vibram. Ideal untuk trekking di medan berat.",
    color: "#c9a96e"
  }
];

function formatPrice(num) {
  return 'Rp ' + num.toLocaleString('id-ID');
}