import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

// ─── Redacted placeholder for Demo Mode ───────────────────
const R = ({ w = "8ch" }: { w?: string }) => (
  <span
    className="redacted"
    style={{ minWidth: w, display: "inline-block" }}
  >
    ████████
  </span>
);

const person: Person = {
  firstName: "Karl",
  lastName: "Grehn",
  name: "Karl Grehn",
  role: "Schüler",
  avatar: "/images/avatar.jpg",
  email: "████████@████████.███",
  location: "Europe/Berlin",
  languages: ["Deutsch", "Englisch", "Latein (rezeptiv)"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Schreib {person.firstName} eine Nachricht</>,
  description: <>In der Demo-Version sind Kontaktfunktionen deaktiviert.</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "#",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "#",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "#",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: "#",
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Hi, I´m <span className="text-gradient-karl">Karl</span></>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Aktuell</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Halbjähriger Auslandsaufenthalt
        </Text>
      </Row>
    ),
    href: "/about",
  },
  subline: (
    <>
      Schüler mit Leidenschaft für Mathematik, <br /> Informatik, Naturwissenschaft und Technik (MINT).
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "#",
  },
  intro: {
    display: true,
    title: "Persönliche Daten",
    description: (
      <>
        <strong>Geburtsdatum:</strong> <span className="redacted" style={{ minWidth: "10ch", display: "inline-block" }}>████████████</span> <br />
        <strong>Wohnort:</strong> Berlin <br />
        <strong>Kontakt:</strong> <span className="redacted" style={{ minWidth: "14ch", display: "inline-block" }}>██████████████</span> | <span className="redacted" style={{ minWidth: "18ch", display: "inline-block" }}>████████████████████</span> <br />
        <strong>Aktueller Status:</strong> Schüler (derzeit im halbjährigen Auslandsaufenthalt)
      </>
    ),
  },
  work: {
    display: true,
    title: "Auszeichnungen (letzte Jahre)",
    experiences: [
      {
        company: "Berliner Meister",
        timeframe: "Saison 2024/2025",
        role: "Handball C-Jugend",
        achievements: [],
        images: [],
      },
      {
        company: "Vizemeister Berlin",
        timeframe: "Saison 2022/2023",
        role: "Handball D-Jugend",
        achievements: [],
        images: [],
      },
      {
        company: "1. Preis Heureka-Wettbewerb",
        timeframe: "2023 & 2022",
        role: "Andreas-Gymnasium",
        achievements: [
          <span key="1">2023: 1. Preis erreicht.</span>,
          <span key="2">2022: Deutschlandweit Platz 100 von 3830 Teilnehmern belegt.</span>,
        ],
        images: [],
      },
      {
        company: "3. Rang Biber-Wettbewerb",
        timeframe: "2023",
        role: "Andreas-Gymnasium",
        achievements: [],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Schulische Laufbahn",
    institutions: [
      {
        name: "Andreas-Gymnasium (Berlin-Friedrichshain)",
        description: (
          <>
            Seit 2020. <strong>MINT-Schwerpunkt</strong> (Mathematik, Informatik, Naturwissenschaft und Technik).
            Besuch des Gymnasiums unmittelbar nach Ende der Grundschule. <br />
            <em>2026: Halbjähriger Auslandsaufenthalt (aktuell laufend).</em>
          </>
        ),
      },
      {
        name: "Grundschule (Berlin-Friedrichshain)",
        description: <>2016 – 2020.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Kompetenzen & Hobbys",
    skills: [
      {
        title: "Kompetenzen",
        description: (
          <>Umfassende Fähigkeiten, die mich in Projekten und im Team auszeichnen.</>
        ),
        tags: [
          { name: "EDV-Kenntnisse", icon: "laptop" },
          { name: "Kritisches Denken", icon: "brain" },
          { name: "Präsentationsfähigkeiten", icon: "presentation" },
          { name: "Teamfähigkeit", icon: "users" },
          { name: "Analytisches Denken", icon: "chart" },
          { name: "Ehrgeiz", icon: "target" },
          { name: "Wissbegierde", icon: "book" },
          { name: "Flexibilität", icon: "shuffle" },
          { name: "Toleranz", icon: "heart" },
        ],
        images: [],
      },
      {
        title: "Hobbys",
        description: (
          <>Aktivitäten, die meinen Alltag bereichern und für Ausgleich sorgen.</>
        ),
        tags: [
          { name: "Handball", icon: "award" },
          { name: "Klavier", icon: "music" },
          { name: "Schlagzeug", icon: "music" },
          { name: "BEGA (Begabtenförderung in Physik)", icon: "atom" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
