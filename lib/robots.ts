export type Spec = {
  label: string;
  metric: string;
  imperial?: string;
};

export type SpecGroup = {
  title: string;
  specs: Spec[];
};

export type Feature = {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  /** key into the robot's images.features map */
  imageKey?: string;
};

export type HeroStat = {
  value: string;
  unit: string;
  label: string;
};

export type Robot = {
  slug: string;
  model: string;
  kind: string;
  tagline: string;
  /** one-sentence positioning used on metadata and the contact page */
  pitch: string;
  /** short benefit phrases for the lineup cards — scannable, not prose */
  highlights: string[];
  intro: string;
  heroStats: HeroStat[];
  features: Feature[];
  specGroups: SpecGroup[];
  environments: string[];
  /** which sibling models to suggest, in order */
  compare: string[];
};

export const robots: Robot[] = [
  {
    slug: "l3",
    model: "L3",
    kind: "Autonomous floor scrubber",
    tagline: "Fits where the others can't.",
    pitch:
      "Compact AI floor scrubber that passes through 700 mm gaps — built for hospitals, schools and tight retail floors.",
    highlights: [
      "Passes through 700 mm gaps",
      "Hands-free voice control",
      "Spots cables and loose mats",
    ],
    intro:
      "The L3 carries a 100 TOPS NVIDIA AI platform and a 96-beam 3D LiDAR in a body narrow enough for a hospital corridor at visiting hours. It plans its own routes, avoids what people leave in them, and answers to plain voice commands.",
    heroStats: [
      { value: "700", unit: "mm", label: "passage width" },
      { value: "21,674", unit: "ft²/h", label: "max productivity" },
      { value: "100", unit: "TOPS", label: "NVIDIA AI compute" },
      { value: "96", unit: "beams", label: "3D LiDAR" },
    ],
    features: [
      {
        eyebrow: "Intelligence",
        title: "A supercomputer pushing a scrubber",
        body: "NVIDIA silicon rated at 100 TOPS reads a 96-beam 3D LiDAR point cloud in real time. The L3 doesn't follow a painted line — it builds a live map, plans its own routes, and re-plans the moment a pallet, bed or person appears where the map says floor.",
        bullets: [
          "Autonomous path planning with live re-routing",
          "Obstacle avoidance tuned for occupied buildings",
          "Maps update themselves when your layout changes",
        ],
      },
      {
        eyebrow: "Perception & safety",
        title: "Sees the hazards people trip on",
        body: "Ground-level perception detects the things that stop other robots and hurt staff — temporary carpets, loose cables, mats at a wet entrance. The L3 classifies them and cleans around them instead of eating them.",
        imageKey: "perception",
        bullets: [
          "Temporary carpet and cable detection",
          "Safe behaviour around doors and entrances",
          "Designed for daytime operation among people",
        ],
      },
      {
        eyebrow: "Voice control",
        title: "Tell it. Don't touch it.",
        body: "Simple voice commands start, pause and redirect the robot — no gloves off, no screen taps. For clinical environments where hands stay clean, that's not a gimmick; it's infection control.",
        imageKey: "app",
        bullets: [
          "Hands-free start, pause and dispatch",
          "Full mobile app for routes, alerts and reports",
          "Live location and completed-task notifications",
        ],
      },
      {
        eyebrow: "Serviceability",
        title: "Maintenance measured in seconds",
        body: "A large-access recovery tank, magnetic quick-swap brushes and a quick-release squeegee mean the daily service routine doesn't need a technician — or a coffee break.",
        imageKey: "maintenance",
        bullets: [
          "Magnetic brushes drop in and out by hand",
          "Quick-release squeegee, no tools",
          "Wide-mouth recovery tank for fast rinse-out",
        ],
      },
      {
        eyebrow: "Extended operations",
        title: "No plumbing? No problem.",
        body: "Pair the L3 with the WS3 workstation and WT3 mobile water tank (60 L fresh / 50 L recovery) and it runs extended cleaning cycles in buildings with no fixed water connection at all.",
        imageKey: "workstation",
        bullets: [
          "WS3 workstation for autonomous charging",
          "WT3 mobile tank: 60 L fresh, 50 L recovery",
          "Off-hours cycles without a water hookup",
        ],
      },
    ],
    specGroups: [
      {
        title: "Performance",
        specs: [
          { label: "Max productivity", metric: "2,016 m²/h", imperial: "21,674 ft²/h" },
          { label: "Cleaning width", metric: "400 mm", imperial: "15.7 in" },
          { label: "Brush pressure", metric: "18 kg", imperial: "39.7 lbs" },
          { label: "Solution tank", metric: "25 L", imperial: "6.6 gal" },
        ],
      },
      {
        title: "Intelligence",
        specs: [
          { label: "AI compute", metric: "100 TOPS (NVIDIA)" },
          { label: "LiDAR", metric: "96-beam 3D" },
          { label: "Voice control", metric: "Onboard commands" },
          { label: "Map updates", metric: "Automatic" },
        ],
      },
      {
        title: "Dimensions",
        specs: [
          { label: "Passage width", metric: "700 mm", imperial: "27.6 in" },
          { label: "Length", metric: "765 mm", imperial: "30.1 in" },
          { label: "Width", metric: "572 mm", imperial: "22.5 in" },
          { label: "Height", metric: "1,000 mm", imperial: "39.4 in" },
        ],
      },
      {
        title: "WT3 mobile tank (optional)",
        specs: [
          { label: "Fresh water", metric: "60 L", imperial: "16 gal" },
          { label: "Recovery", metric: "50 L", imperial: "13.2 gal" },
        ],
      },
    ],
    environments: ["Hospitals", "Schools", "Retail", "Offices", "Clinics"],
    compare: ["l4", "l50"],
  },
  {
    slug: "l4",
    model: "L4",
    kind: "Edge-cleaning floor scrubber",
    tagline: "Balanced size. High productivity.",
    pitch:
      "The volume workhorse for retail and hospitality — fits a standard doorway and scrubs to within 3 cm of the wall.",
    highlights: [
      "Clears a standard doorway",
      "Scrubs to 3 cm from the wall",
      "Runs 24/7 with its workstation",
    ],
    intro:
      "At 810 mm passage width the L4 goes through a standard door frame, then cleans to within 3 cm of the skirting board. Stain-perception AI adjusts water, pressure and speed to what it actually sees on the floor.",
    heroStats: [
      { value: "810", unit: "mm", label: "passage width" },
      { value: "20,925", unit: "ft²/h", label: "max productivity" },
      { value: "<3", unit: "cm", label: "edge distance" },
      { value: "150", unit: "m", label: "LiDAR range" },
    ],
    features: [
      {
        eyebrow: "Stain perception",
        title: "Cleans harder where it's dirtier",
        body: "Vision AI classifies stains in its path and adjusts brush pressure, water flow and speed on the spot — full effort on the spill, light touch on the clean run.",
        bullets: [
          "Real-time stain classification",
          "Automatic pressure, flow and speed adjustment",
          "Solution flow tracks cleaning speed to cut waste",
        ],
      },
      {
        eyebrow: "Edge cleaning",
        title: "Through the doorway, along the edge",
        body: "Most rivals in this class can't pass a standard door frame. The L4 does — then hugs walls and shelving to under 3 cm, where the dirt actually collects.",
        imageKey: "edge",
        bullets: [
          "810 mm passage width clears standard doorways",
          "Edge distance under 3 cm along walls and racking",
          "1,100 mm turning width for tight aisle ends",
        ],
      },
      {
        eyebrow: "Perception",
        title: "A 150-metre head start",
        body: "A 32-beam 3D LiDAR with 150 m of range, backed by 3D depth cameras and bumper sensors, maps the building and everything moving through it — so the L4 plans clean lines and gives people and pallet trucks a wide berth.",
        imageKey: "lidar",
        bullets: [
          "32-beam 3D LiDAR, 150 m detection range",
          "3D depth cameras and bumper sensors",
          "Re-plans live when the aisle changes",
        ],
      },
      {
        eyebrow: "Mobile app",
        title: "The whole night, reported",
        body: "Every run ends with a report: route map, coverage percentage, area cleaned, water and detergent used, minutes worked. Plan routes, get completion alerts, and prove the clean happened — without walking the floor.",
        imageKey: "app",
        bullets: [
          "Route planning and live location",
          "Coverage and consumption reports per run",
          "Completion and fault alerts to your phone",
        ],
      },
      {
        eyebrow: "24/7 operation",
        title: "The 4-in-1 workstation",
        body: "Docked at its workstation the L4 empties, refills, charges and returns to work without a human in the loop. Squeegee replacement takes 30 seconds when it's finally due.",
        imageKey: "workstation",
        bullets: [
          "Autonomous empty, refill and charge cycles",
          "Overnight cleaning with nobody on site",
          "30-second squeegee replacement",
        ],
      },
    ],
    specGroups: [
      {
        title: "Performance",
        specs: [
          { label: "Max productivity", metric: "1,944 m²/h", imperial: "20,925 ft²/h" },
          { label: "Cleaning width", metric: "450 mm", imperial: "17.7 in" },
          { label: "Brush pressure", metric: "20 kg", imperial: "44 lbs" },
          { label: "Solution tank", metric: "38 L", imperial: "10 gal" },
          { label: "Edge cleaning", metric: "<3 cm", imperial: "<1.2 in" },
        ],
      },
      {
        title: "Intelligence",
        specs: [
          { label: "AI compute", metric: "32 TOPS (NVIDIA)" },
          { label: "LiDAR", metric: "32-beam 3D, 150 m range" },
          { label: "Touchscreen", metric: "10.1 in" },
          { label: "Stain perception", metric: "Vision AI" },
        ],
      },
      {
        title: "Dimensions",
        specs: [
          { label: "Passage width", metric: "810 mm", imperial: "31.9 in" },
          { label: "Turning width", metric: "1,100 mm", imperial: "43.3 in" },
          { label: "Length", metric: "820 mm", imperial: "32.3 in" },
          { label: "Width", metric: "615 mm", imperial: "24.2 in" },
          { label: "Height", metric: "1,075 mm", imperial: "42.3 in" },
        ],
      },
    ],
    environments: ["Retail", "Hospitality", "Hospitals", "Education"],
    compare: ["l3", "l50"],
  },
  {
    slug: "l50",
    model: "L50",
    kind: "High-capacity industrial scrubber",
    tagline: "Sixty thousand square feet. One charge.",
    pitch:
      "The warehouse workhorse — 55 L tank, 6-hour runtime, and 40–60,000 ft² covered without a refill.",
    highlights: [
      "40–60,000 ft² on one charge",
      "Six-hour runtime",
      "Sees 150 m down the aisle",
    ],
    intro:
      "Built for warehouses, logistics hubs and big-box floors: a 55-litre solution tank, 25 kg of brush pressure for epoxy floors, and a battery that runs a full shift. It covers 40–60,000 square feet on a single charge without asking for anything.",
    heroStats: [
      { value: "23,713", unit: "ft²/h", label: "hourly coverage" },
      { value: "55", unit: "L", label: "solution tank" },
      { value: "6", unit: "h", label: "max runtime" },
      { value: "25", unit: "kg", label: "brush pressure" },
    ],
    features: [
      {
        eyebrow: "Capacity",
        title: "A full shift without a refill",
        body: "The 120 Ah battery and 55-litre tank are sized so one dispatch covers 40–60,000 square feet — a full night's floor in most facilities — before it needs water or power.",
        bullets: [
          "Up to 6 hours on one charge",
          "55 L solution tank, 25 kg brush pressure",
          "Built for epoxy and sealed concrete floors",
        ],
      },
      {
        eyebrow: "Detection",
        title: "Sees 150 metres down the aisle",
        body: "Long-range LiDAR plus protruding-object and glass detection keep it safe among racking, forklifts and floor-to-ceiling storefronts — the hazards that blind lesser machines.",
        imageKey: "safety",
      },
      {
        eyebrow: "Onboard console",
        title: "Mission control, on the machine",
        body: "The onboard touchscreen shows task progress, schedules and alarms, with one-touch pause, stop and dispatch. Anyone on the night crew can drive the whole operation without training.",
        imageKey: "console",
      },
      {
        eyebrow: "Fleet app",
        title: "Not a speck missed",
        body: "Plan routes, watch live location, and get completion reports with coverage and consumption per run. Over-the-air updates add capability while the robot sleeps.",
        imageKey: "app",
      },
      {
        eyebrow: "Autonomous refill",
        title: "Docks. Drains. Refills. Returns.",
        body: "The CWS workstation lets the L50 swap its own water — discharging the recovery tank and refilling solution against docking fiducials, then heading straight back to the floor.",
        imageKey: "workstation",
      },
    ],
    specGroups: [
      {
        title: "Performance",
        specs: [
          { label: "Hourly coverage", metric: "2,203 m²/h", imperial: "23,713 ft²/h" },
          { label: "Cleaning width", metric: "510 mm", imperial: "20 in" },
          { label: "Brush pressure", metric: "25 kg", imperial: "55.1 lbs" },
          { label: "Solution tank", metric: "55 L", imperial: "14.5 gal" },
          { label: "Max speed", metric: "1.2 m/s", imperial: "2.7 mph" },
          { label: "Battery", metric: "120 Ah · up to 6 h" },
          { label: "Edge cleaning", metric: "<5 cm", imperial: "<2 in" },
        ],
      },
      {
        title: "Detection",
        specs: [
          { label: "Detection range", metric: "150 m", imperial: "492 ft" },
          { label: "Protruding objects", metric: "Detected" },
          { label: "Glass", metric: "Detected" },
        ],
      },
      {
        title: "Dimensions",
        specs: [
          { label: "Length", metric: "1,055 mm", imperial: "41.5 in" },
          { label: "Width", metric: "580 mm", imperial: "22.8 in" },
          { label: "Height", metric: "1,045 mm", imperial: "41.1 in" },
          { label: "Squeegee width", metric: "740 mm", imperial: "29 in" },
        ],
      },
    ],
    environments: ["Warehouses", "Logistics", "Manufacturing", "Big-box retail"],
    compare: ["c5", "s5"],
  },
  {
    slug: "c5",
    model: "C5",
    kind: "3-in-1 cleaning machine",
    tagline: "Three jobs. One pass.",
    pitch:
      "Sweeps, scrubs and dust mops in a single pass — with a 90-litre tank and a workstation that refills and cleans itself.",
    highlights: [
      "Sweeps, scrubs and mops in one pass",
      "90 L tank — largest in the fleet",
      "Self-cleans its tank in 4 min",
    ],
    intro:
      "Most floors need three machines and three passes. The C5 needs one. It sweeps debris, scrubs the floor and dust mops behind itself in a single run, carries 90 litres of water to do it, and returns to a workstation that refills, drains and flushes its own sewage tank in four minutes.",
    heroStats: [
      { value: "1,980", unit: "m²/h", label: "max cleaning rate" },
      { value: "90", unit: "L", label: "water tank" },
      { value: "550", unit: "mm", label: "cleaning width" },
      { value: "95", unit: "%", label: "debris removal" },
    ],
    features: [
      {
        eyebrow: "Professional cleaning",
        title: "Sweep, scrub and mop — in one run",
        body: "Dual side brushes pull debris in from the edges, the roller brush and 25 kg of scrubbing pressure take the floor down to clean, and the dust mop finishes behind. Heavily soiled floors come back in a single pass instead of three.",
        bullets: [
          "Sweeping, scrubbing and dust mopping combined",
          "Over 95% debris removal",
          "Zero-distance side-brush edge cleaning",
        ],
      },
      {
        eyebrow: "Positioning",
        title: "Laser and vision, fused",
        body: "Laser-vision fusion positioning keeps the C5 located when either sensor alone would drift — through glass atriums, past mirrored shopfronts, across the wide open floors that defeat pure-LiDAR machines.",
        bullets: [
          "Laser-vision fusion positioning",
          "Visual and point-cloud fusion perception",
          "Over 90% self-diagnostic coverage",
        ],
      },
      {
        eyebrow: "Self-maintenance",
        title: "It cleans its own tank",
        body: "The dirtiest job on any scrubber is the sewage tank, and it is the one people skip. The C5 flushes its own in four minutes at the workstation — then refills, charges and goes back out.",
        bullets: [
          "Four-minute sewage tank self-clean",
          "Automatic charging and water management",
          "Closed-loop cleaning re-covers any missed area",
        ],
      },
      {
        eyebrow: "Control",
        title: "On the machine, on your phone, in the cloud",
        body: "Start a job from the robot's own screen, dispatch it from your phone, or schedule the whole week from the cloud console — with job reports waiting for you either way.",
        bullets: [
          "Triple-platform control: robot, mobile and cloud",
          "Autonomous boundary recognition and map updates",
          "Automatic scheduling and job reporting",
        ],
      },
      {
        eyebrow: "Workstation",
        title: "The dock does the dirty work",
        body: "A compact station that fills at up to 10 litres a minute, drains at up to 15, and runs the tank self-clean cycle. Where there is no plumbing, a mobile tank configuration does the same job.",
        imageKey: "workstation",
        bullets: [
          "Automatic fill, drain and sewage self-clean",
          "8 L onboard tank, 1,800 W peak draw",
          "Mobile tank option for sites without plumbing",
        ],
      },
    ],
    specGroups: [
      {
        title: "Performance",
        specs: [
          { label: "Max cleaning rate", metric: "1,980 m²/h", imperial: "21,313 ft²/h" },
          { label: "Cleaning width", metric: "550 mm", imperial: "21.7 in" },
          { label: "Scrubbing pressure", metric: "25 kg", imperial: "55.1 lbs" },
          { label: "Water tank", metric: "90 L", imperial: "23.8 gal" },
          { label: "Debris removal", metric: ">95%" },
          { label: "Scrubbing endurance", metric: "3 h" },
        ],
      },
      {
        title: "Intelligence & safety",
        specs: [
          { label: "Positioning", metric: "Laser-vision fusion" },
          { label: "Perception", metric: "Visual + point cloud" },
          { label: "Self-diagnostic coverage", metric: ">90%" },
          { label: "Boundary recognition", metric: "Autonomous" },
        ],
      },
      {
        title: "Durability & upkeep",
        specs: [
          { label: "Sewage tank self-clean", metric: "4 min" },
          { label: "Fan lifespan", metric: "10,000 h" },
          { label: "Cleaning modes", metric: "Sweep · scrub · dust mop" },
        ],
      },
      {
        title: "Workstation",
        specs: [
          { label: "Dimensions (L×W×H)", metric: "520 × 310 × 1,038 mm", imperial: "20.5 × 12.2 × 40.9 in" },
          { label: "Water tank", metric: "8 L", imperial: "2.1 gal" },
          { label: "Fill rate", metric: "7–10 L/min", imperial: "1.8–2.6 gal/min" },
          { label: "Drainage rate", metric: "10–15 L/min", imperial: "2.6–4.0 gal/min" },
          { label: "Max power", metric: "1,800 W" },
        ],
      },
    ],
    environments: [
      "Shopping malls",
      "Airports",
      "Transport hubs",
      "Factories",
      "Hospitals",
      "Supermarkets",
      "Office buildings",
      "Hotels",
    ],
    compare: ["l50", "s5"],
  },
  {
    slug: "s5",
    model: "S5",
    kind: "Industrial robotic sweeper",
    tagline: "Dry debris. Wholesale.",
    pitch:
      "AI-driven industrial sweeper for dry debris — 27,000 ft²/h, and it works in coordinated fleets.",
    highlights: [
      "Handles dust to dropped bolts",
      "Works in coordinated fleets",
      "Yields to forklifts and AGVs",
    ],
    intro:
      "From fine dust to wood chips, packaging film, bottles and screws — the S5 sweeps the dry side of industrial floors at 27,000 ft²/h. TeamClean lets several units carve up a warehouse together, and vehicle recognition keeps them clear of your forklifts.",
    heroStats: [
      { value: "27,000", unit: "ft²/h", label: "sweep rate" },
      { value: "50", unit: "L", label: "debris hopper" },
      { value: "2", unit: "h", label: "full charge" },
      { value: "100", unit: "TOPS", label: "NVIDIA AI compute" },
    ],
    features: [
      {
        eyebrow: "TeamClean",
        title: "One floor, many sweepers",
        body: "S5 units coordinate as a fleet, dividing the floor between them and adapting when one is charging. Big facilities clean in a fraction of the time.",
        imageKey: "teamclean",
      },
      {
        eyebrow: "Vehicle recognition",
        title: "Knows a forklift when it sees one",
        body: "Purpose-trained recognition for forklifts, AGVs and site vehicles means the S5 yields early and keeps working around live traffic, not just after hours.",
        imageKey: "vehicle",
      },
      {
        eyebrow: "Debris handling",
        title: "From dust to dropped bolts",
        body: "Advanced dust control plus a 50-litre hopper handles fine powder and coarse industrial waste in the same pass — film, cardboard, screws, bottle caps.",
        imageKey: "dust",
      },
      {
        eyebrow: "Serviceability",
        title: "Empty it and go",
        body: "The hopper lifts out without tools, filters shake clean in seconds, and every wear part is reachable from the outside — service fits inside a coffee break, not a maintenance window.",
        imageKey: "maintenance",
      },
      {
        eyebrow: "Continuous operation",
        title: "Charges in two hours, works around the clock",
        body: "A 2-hour fast charge and its own docking station keep the S5 in rotation — it tops up between shifts and returns to its route without being asked.",
        imageKey: "station",
      },
    ],
    specGroups: [
      {
        title: "Performance",
        specs: [
          { label: "Sweep rate", metric: "~2,500 m²/h", imperial: "27,000 ft²/h" },
          { label: "Sweeping width", metric: "820 mm", imperial: "32.3 in" },
          { label: "Debris hopper", metric: "50 L", imperial: "13.2 gal" },
          { label: "Charging time", metric: "2 h" },
        ],
      },
      {
        title: "Intelligence",
        specs: [
          { label: "AI compute", metric: "100 TOPS (NVIDIA)" },
          { label: "LiDAR", metric: "32-beam 3D, 150 m range" },
          { label: "Fleet mode", metric: "TeamClean" },
          { label: "Vehicle recognition", metric: "Forklifts, AGVs" },
        ],
      },
      {
        title: "Dimensions",
        specs: [
          { label: "Length", metric: "1,030 mm", imperial: "40.6 in" },
          { label: "Width", metric: "720 mm", imperial: "28.3 in" },
          { label: "Height", metric: "990 mm", imperial: "39 in" },
          { label: "Weight", metric: "130 kg", imperial: "287 lbs" },
        ],
      },
    ],
    environments: ["Warehouses", "Manufacturing", "Parking garages", "Logistics"],
    compare: ["l50", "c5"],
  },
];

export function getRobot(slug: string): Robot | undefined {
  return robots.find((r) => r.slug === slug);
}
