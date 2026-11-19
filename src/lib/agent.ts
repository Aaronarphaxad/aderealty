export const SITE_URL = "https://aderealty.ca";

// Static site: point this at a real endpoint (Netlify Forms, Formspree, ...) before launch.
export const FORM_ACTION = "#";

// Google Search Console: paste the content value of the HTML tag verification method here.
export const GOOGLE_SITE_VERIFICATION = "";

// Search result title and description for the home page.
// Keep the title under 60 characters and the description under 155 so Google shows them in full.
export const seo = {
  title: "Surrey REALTOR® & Real Estate Agent | Adebiyi Aderinto",
  description:
    "Your next address starts here. Adebiyi Aderinto is a Surrey REALTOR® with Katrina & The Team, helping buyers and investors across Metro Vancouver.",
};

export const agent = {
  name: "Adebiyi Aderinto",
  shortName: "Ade",
  brand: "AdeRealty",
  title: "REALTOR®",
  team: "Katrina & The Team",
  brokerage: "eXp Realty",
  brokerageLegal: "eXp Realty of Canada Inc.",
  tagline: "Your next address starts here",
  // Licensed since 2023 (from intake). Used in About.
  licensedSince: 2023,
  cell: { label: "(604) 332-0365", href: "tel:+16043320365" },
  email: {
    label: "adebiyi.aderinto@katrinaandtheteam.com",
    href: "mailto:adebiyi.aderinto@katrinaandtheteam.com",
  },
  address: {
    street: "401-15350 Croydon Drive",
    city: "Surrey",
    region: "BC",
    postalCode: "V3Z 1H4",
    country: "CA",
  },
  // 15350 Croydon Drive, from OpenStreetMap. Used in the structured data for local search.
  geo: { latitude: 49.05943, longitude: -122.79732 },
  officeHours: "Mon to Sun, 9:00 to 19:00",
  languages: ["English"],
  listingsUrl: "https://www.katrinaandtheteam.com/featured-listings/",
  searchUrl: "https://www.katrinaandtheteam.com/property-search/search-form/",
  agentPageUrl: "https://www.katrinaandtheteam.com/agents/adebiyi-aderinto/",
  bookingUrl: "https://calendly.com/adebiyi-aderinto-katrinaandtheteam/30min",
  // Public BCFSA licence lookup (trust signal from intake). No licence number shown on the page.
  licenceLookupUrl:
    "https://www.bcfsa.ca/public-resources/real-estate/find-professional/find-professional-by-name?search=adebiyi%20aderinto&page=0#search-results",
  socials: [{ name: "Instagram", href: "https://www.instagram.com/aderealty" }],
};

export const paths = [
  {
    id: "first-home",
    label: "First home",
    title: "Buying your first home",
    lead: "Your first purchase is exciting and a lot to take in. We turn mortgage pre-approval, first-time buyer programs and strata documents into a clear plan, so the only question left is whether it feels like home.",
    points: [
      { title: "A real budget, not a guess", description: "Pre-approval with a trusted broker and a monthly cost breakdown, including strata fees and property tax." },
      { title: "Programs you may qualify for", description: "Property Transfer Tax exemption, the First Home Savings Account and the RRSP Home Buyers' Plan." },
      { title: "What the photos do not show", description: "Strata minutes, depreciation reports, inspections and resale value, reviewed before you write an offer." },
    ],
    cta: { label: "Plan my first purchase", interest: "first-home" },
    imageAlt: "Bright open-plan living room",
  },
  {
    id: "upsizing",
    label: "Upsizing",
    title: "Upsizing for a growing family",
    lead: "A growing family means balancing today's needs with the next ten years. We find the space, the neighbourhood and the school catchment you want, and line up the sale of your current home so the timing works.",
    points: [
      { title: "Buy and sell in one plan", description: "Pricing, subject removal and completion dates sequenced so you are never carrying two homes for long." },
      { title: "Neighbourhoods compared on facts", description: "Catchments, commute times, parks and recent sales for each area on your shortlist." },
      { title: "Room to grow", description: "Suites, lot size and layouts that adapt as children grow or parents move in." },
    ],
    cta: { label: "Talk about upsizing", interest: "upsizing" },
    imageAlt: "Family discussing plans around a table",
  },
  {
    id: "downsizing",
    label: "Downsizing",
    title: "Downsizing to a simpler life",
    lead: "Leaving a home full of memories takes heart and careful planning. We handle the sale with patience, help you choose a next home that is easier to live in, and keep the equity you have built working for you.",
    points: [
      { title: "A calm, well-priced sale", description: "Honest pricing, staging help and showings arranged around your routine." },
      { title: "The right next home", description: "Single-level living, low-maintenance condos and townhomes close to family and amenities." },
      { title: "Trusted referrals", description: "Movers, organizers, lawyers and financial planners we have worked with before." },
    ],
    cta: { label: "Plan my next chapter", interest: "downsizing" },
    imageAlt: "Calm residential street lined with homes",
  },
  {
    id: "investing",
    label: "Investing",
    title: "Investing in real estate",
    lead: "From resale suites to new construction and off-plan, Ade underwrites every opportunity on cash flow, financing and exit before you commit, including work with foreign and diaspora buyers.",
    points: [
      { title: "Underwritten like a business case", description: "Rent comparables, carrying costs, vacancy and return scenarios for every property." },
      { title: "New construction, presale and off-plan", description: "Developer track records, deposit structures and assignment clauses reviewed in plain language." },
      { title: "Portfolio thinking", description: "Suites, duplexes and multi-family options matched to your timeline and risk." },
    ],
    cta: { label: "Discuss an investment", interest: "investing" },
    imageAlt: "Investors reviewing numbers at a meeting",
  },
];

// Intent-first header links (same pattern as Sam & Kent / Rose Manno).
// Deep-links open the matching journey card; Selling goes straight to contact.
export const navLinks = [
  { label: "Buying", href: "#first-home" },
  { label: "Selling", href: "#contact" },
  { label: "Upsizing", href: "#upsizing" },
  { label: "Downsizing", href: "#downsizing" },
];

// Remaining sections, shown under the main links in the mobile menu
export const secondaryLinks = [
  { label: "Investing", href: "#investing" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#how-it-works" },
  { label: "Listings", href: "#listings" },
  { label: "International investors", href: "#foreign-investors" },
  { label: "Reviews", href: "#reviews" },
  { label: "Areas served", href: "#areas" },
  { label: "Questions", href: "#faq" },
];

// Katrina & The Team results, from the team's LinkedIn updates and katrinaandtheteam.com/about.
export const teamRecord = {
  // Year to date, published by the team on August 13, 2026. Update when a new total is posted.
  yearToDate: { year: 2026, homesSold: 201, asOf: "July 31" },
  // Last full year
  lastYear: { year: 2025, homesSold: 352, salesVolumeMillions: 274, homesPerWeek: 6.77 },
  familiesHelped: "4,800+",
  // Fraser Valley Real Estate Board Medallion Gala, February 28, 2026
  awards: {
    year: 2026,
    titles: ["Top listing team", "Top selling team", "Top volume team", "Team of 20+ members"],
  },
  yearsAtNumberOne: 7,
  presidentsClubYears: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
};

// Service areas from the client intake form.
export const areas = ["Surrey", "Vancouver", "Langley", "Burnaby", "Coquitlam", "Chilliwack"];

// Real client reviews from the intake form. Initials only, as provided.
export const reviews = [
  {
    quote:
      "I had an excellent experience working with Ade and Katrina & The Team throughout my home-buying journey. From the very beginning, Ade was professional, organized, knowledgeable, and genuinely committed to helping us secure the home we wanted at the best possible deal. His negotiation skills, attention to detail, and dedication made a significant difference throughout the entire process. He handled everything exceptionally well, from communicating and negotiating with the developer to coordinating documentation, inspections, and all the necessary steps along the way. Everything was well organized, nothing was overlooked, and we were always kept informed. What impressed me most was the level of care and commitment. Ade made what could have been a stressful experience feel smooth and well managed. He consistently looked out for our interests and ensured that every detail was properly addressed. I couldn't be happier with the outcome. We secured the home we truly wanted at a great price, and I genuinely appreciate all the hard work that went into making it happen. I highly recommend Ade and Katrina & The Team to anyone looking to buy a home. Outstanding service from start to finish.",
    name: "E.A.K.",
    detail: "Home buyer",
  },
  {
    quote:
      "Very much a pleasant experience purchasing my first home with the help of Adebiyi and the team of support for every role required. I appreciate the professionalism, the patience and attention to detail throughout the process, the team was well prepared and answered every single question I asked. Kept me aware and engaged the whole journey. Super grateful to have achieved this milestone with your contributions.",
    name: "F.O.",
    detail: "First-time buyer",
  },
];

export const faqs = [
  {
    question: "How much do I need for a down payment in BC?",
    answer:
      "In Canada the minimum is 5% on the first $500,000 and 10% on the portion above that, up to $1.5M. Homes over $1.5M need 20%. We connect you with a mortgage broker early so you know your real budget before you view.",
  },
  {
    question: "Are there programs for first-time buyers?",
    answer:
      "Yes. First-time buyers in BC may qualify for the Property Transfer Tax exemption, the First Home Savings Account and the RRSP Home Buyers' Plan. We walk through which ones apply to you on the discovery call.",
  },
  {
    question: "What does it cost to work with you as a buyer?",
    answer:
      "In most purchases the buyer's agent is paid from the seller's side of the transaction. We explain the agreement in writing before you sign anything.",
  },
  {
    question: "Which areas do you cover?",
    answer:
      "Surrey, Vancouver, Langley, Burnaby, Coquitlam and Chilliwack, with help across the wider Lower Mainland when your search takes you there.",
  },
  {
    question: "Can buyers from outside Canada purchase through you?",
    answer:
      "Yes. Ade works with foreign and diaspora investors on new construction, presale and off-plan opportunities, plus resale. Rules for non-Canadian buyers change, so book a call for current guidance and legal and tax referrals.",
  },
];
