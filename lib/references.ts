export type Reference = {
  slug: string;
  quote: string;
  name: string;
  role: string;
  organisation: string;
  location: string;
  sector: string;
  /** the operational result, where the customer stated one */
  outcome?: string;
};

/* Sourced from the AI Robotics reference page and the manufacturer's published
   customer statements. Quotes are reproduced as published — do not paraphrase,
   tighten or "improve" them. If wording needs to change, it changes at the
   source, with the customer's agreement. */
export const references: Reference[] = [
  {
    slug: "beacon-hill",
    quote:
      "600,000 square feet of carpet cleaned automatically. We anticipate saving tons of money.",
    name: "Jeff Heugli",
    role: "Chief Executive Officer",
    organisation: "Beacon Hill",
    location: "Detroit, Michigan",
    sector: "Facility management",
    outcome: "600,000 ft² cleaned automatically",
  },
  {
    slug: "aspirus-hospital",
    quote:
      "The bots are making a huge difference in our hospital cleanliness. Our staff now focus on deep scrubbing, stripping and waxing.",
    name: "Brindy Literski",
    role: "Manager, Environmental Services",
    organisation: "Aspirus Hospital",
    location: "Wausau, Wisconsin",
    sector: "Healthcare",
    outcome: "Third-shift technician reassigned to specialist work",
  },
  {
    slug: "inn-of-the-mountain-gods",
    quote:
      "It has revolutionized our operations and guest experience.",
    name: "Frizzell Frizzell",
    role: "Chief Operating Officer",
    organisation: "Inn of the Mountain Gods",
    location: "Albuquerque, New Mexico",
    sector: "Hospitality & resort",
  },
];
