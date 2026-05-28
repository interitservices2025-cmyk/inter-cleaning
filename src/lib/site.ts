import residentialImg from "@/assets/service-residential.jpg";
import officeImg from "@/assets/service-office.jpg";
import deepImg from "@/assets/service-deep.jpg";
import moveImg from "@/assets/service-move.jpg";
import carpetImg from "@/assets/service-carpet.jpg";
import windowImg from "@/assets/service-window.jpg";

export const SITE = {
  name: "Inter-Cleaning Services",
  tagline: "Excellence in Every Sweep",
  phone: "+1 (416) 871-9045",
  phoneHref: "tel:+14168719045",
  email: "contact@inter-cleaningservices.com",
  address: "Brampton, Ontario, L6W 3L3, Canada",
  city: "Brampton",
  region: "Greater Toronto Area",
  socials: {
    facebook: "https://web.facebook.com/intercleaningservices",
    instagram: "https://www.instagram.com/intercleaningservices01/",
    linkedin: "https://www.linkedin.com/company/inter-cleaningservices",
  },
};

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  bullets: string[];
  image: string;
  accent: "magenta" | "orange" | "yellow";
};

export const SERVICES: Service[] = [
  {
    slug: "residential",
    name: "Residential Cleaning",
    short: "Regular care for the homes you love.",
    description:
      "Weekly, bi-weekly, or monthly cleaning tailored to your home. From condo units in downtown Toronto to family homes across the GTA, we leave every room spotless and welcoming.",
    bullets: [
      "Weekly, bi-weekly or monthly visits",
      "Kitchens & bathrooms thoroughly sanitized",
      "Living areas & bedrooms refreshed",
      "Dusting, vacuuming & mopping throughout",
    ],
    image: residentialImg,
    accent: "magenta",
  },
  {
    slug: "office",
    name: "Office & Small Business Cleaning",
    short: "Workspaces that inspire performance.",
    description:
      "Scheduled or after-hours cleaning for offices, clinics and small businesses. We keep your team healthy and your space presentation-ready, every single day.",
    bullets: [
      "After-hours or scheduled visits",
      "Workstations & common areas",
      "Washroom cleaning & sanitization",
      "Garbage removal & recycling",
    ],
    image: officeImg,
    accent: "orange",
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    short: "Top-to-bottom restoration of every surface.",
    description:
      "A meticulous reset for spaces that need more than routine care. Ideal seasonally or after long periods without service.",
    bullets: [
      "Detailed kitchen & bathroom scrubbing",
      "Baseboards, doors & high-touch areas",
      "Built-in appliances (fridge, oven exterior)",
      "One-time or occasional deep cleaning",
    ],
    image: deepImg,
    accent: "yellow",
  },
  {
    slug: "move-in-out",
    name: "Move-In / Move-Out Cleaning",
    short: "Hand over the keys with confidence.",
    description:
      "Apartments and houses cleaned to inspection standard. Make your old place spotless or your new one ready to live in.",
    bullets: [
      "Apartments & houses, empty or furnished",
      "Inside cabinets, drawers & closets",
      "Inspection-ready finishing",
      "Coordination with movers & landlords",
    ],
    image: moveImg,
    accent: "magenta",
  },
  {
    slug: "carpet-upholstery",
    name: "Carpet & Upholstery Cleaning",
    short: "Bring fabrics back to life.",
    description:
      "Hot-water shampoo and extraction for carpets, sofas and chairs. Stains, odors and trapped allergens — gone.",
    bullets: [
      "Carpet shampoo & extraction",
      "Sofa & chair cleaning",
      "Stain & odor treatment",
      "Pet-friendly products available",
    ],
    image: carpetImg,
    accent: "orange",
  },
  {
    slug: "window-glass",
    name: "Window & Glass Cleaning (Interior)",
    short: "A clearer view, inside.",
    description:
      "Streak-free interior windows, glass doors and partitions. Let the GTA daylight in.",
    bullets: [
      "Interior windows",
      "Glass doors & partitions",
      "Mirrors & glass surfaces",
      "Frames & sills wiped down",
    ],
    image: windowImg,
    accent: "yellow",
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
