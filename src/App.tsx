import { MenuButton, MobileMenu, Select } from "./ui";
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Heart,
  Search,
  BedDouble,
  Bath,
  Expand,
  MapPin,
  Check,
} from "lucide-react";
import {
  DevBadge,
  Modal,
  RequestForm,
  Newsletter,
  useReveal,
  useStoredState,
  money,
} from "./common";
const properties = [
  {
    id: 1,
    name: "The Olive House",
    location: "Cascais",
    type: "Villa",
    price: 2450000,
    beds: 4,
    baths: 4,
    area: 380,
    image: "/images/villa.webp",
    tag: "EXCLUSIVE",
    description:
      "A quiet retreat above the Atlantic. Travertine, olive trees and floor-to-ceiling glass bring the landscape into every room. Spend mornings on the shaded terrace and evenings by your private pool.",
    features: [
      "Infinity pool",
      "Ocean views",
      "Landscaped garden",
      "Private garage",
    ],
  },
  {
    id: 2,
    name: "Casa da Areia",
    location: "Comporta",
    type: "Villa",
    price: 1850000,
    beds: 3,
    baths: 3,
    area: 265,
    image: "/images/coastal-house.webp",
    tag: "NEW TO THE COLLECTION",
    description:
      "Low-slung limestone architecture among wild coastal grasses. This single-storey home celebrates a slower rhythm, with open living spaces flowing around a still reflecting pool.",
    features: [
      "Single-level living",
      "Reflecting pool",
      "Natural materials",
      "Beach proximity",
    ],
  },
  {
    id: 3,
    name: "The Garden Residence",
    location: "Lisbon",
    type: "Townhouse",
    price: 1250000,
    beds: 3,
    baths: 2,
    area: 210,
    image: "/images/townhouse.webp",
    tag: "CITY & SANCTUARY",
    description:
      "A considered city home with a surprisingly private garden. Historic proportions meet contemporary interiors, with generous entertaining spaces and a leafy courtyard for slow afternoons.",
    features: [
      "Private courtyard",
      "Period facade",
      "City location",
      "Renovated interiors",
    ],
  },
];
type Property = (typeof properties)[number];
export default function App() {
  useReveal();
  const [location, setLocation] = useState("All locations");
  const [type, setType] = useState("All homes");
  const [budget, setBudget] = useState("any");
  const [saved, setSaved] = useStoredState<number[]>("aven-saved", []);
  const [onlySaved, setOnlySaved] = useState(false);
  const [detail, setDetail] = useState<Property | null>(null);
  const [gallery, setGallery] = useState(0);
  const [viewing, setViewing] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const [searched, setSearched] = useState(false);
  const filtered = properties.filter(
    (p) =>
      (location === "All locations" || p.location === location) &&
      (type === "All homes" || p.type === type) &&
      (budget === "any" || p.price <= Number(budget)) &&
      (!onlySaved || saved.includes(p.id)),
  );
  const toggleSave = (id: number) =>
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  const galleryCaptions = [
    "A sense of arrival",
    "Materials, light and landscape",
    "The details that make a home",
  ];
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="aven-nav">
        <a className="aven-logo" href="#">
          aven<span>ESTATES</span>
        </a>
        <nav className="desktop-nav">
          <a href="#homes">Find a home</a>
          <a href="#approach">Our approach</a>
          <a href="#journal">The journal</a>
        </nav>
        <div className="nav-actions">
          <button
            className="saved-button"
            aria-label={`Show saved homes (${saved.length})`}
            onClick={() => {
              setOnlySaved(!onlySaved);
              document
                .querySelector("#homes")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Heart size={18} fill={onlySaved ? "currentColor" : "none"} />
            <span>{saved.length}</span>
          </button>
          <button
            className="button desktop-nav"
            onClick={() => setViewing("A conversation with Aven")}
          >
            Let's talk <ArrowUpRight size={16} />
          </button>
          <MenuButton open={menu} onClick={() => setMenu(!menu)} />
        </div>
      </header>
      <MobileMenu open={menu} onClose={() => setMenu(false)} brand="aven estates" tagline="A place to feel at home." links={[{"label":"Find a home","href":"#homes","description":"Discover the considered collection"},{"label":"Our approach","href":"#approach","description":"Good people. Thoughtful guidance."},{"label":"The journal","href":"#journal","description":"A different way of living"}]} feature={{"image":"/images/villa.webp","eyebrow":"The current collection","title":"Your place in Portugal","href":"#homes"}} action={{label: "Let’s talk", onClick: () => setViewing("A conversation with Aven")}} />
      <main id="main">
        <section className="property-hero">
          <div className="property-hero-copy">
            <div>
              <p className="eyebrow section-label">
                Exceptional homes. Thoughtfully found.
              </p>
              <h1>
                More than a place.
                <br />
                <em>A way of living.</em>
              </h1>
            </div>
            <p>
              Homes with character. <br />
              Places with possibility. <br />
              Find where you belong.
            </p>
          </div>
          <div className="property-hero-image">
            <img
              src="/images/villa.webp"
              alt="A sunlit stone villa and pool overlooking the Portuguese coast"
              fetchPriority="high"
            />
            <a href="#homes" className="hero-property-label">
              <span>
                <small>THE CURRENT COLLECTION</small>The Olive House, Cascais
              </span>
              <span className="round-icon">
                <ArrowUpRight size={22} />
              </span>
            </a>
            <span className="photo-coordinate">38°41′ N &nbsp; 9°25′ W</span>
          </div>
          <form
            className="property-search"
            onSubmit={(e) => {
              e.preventDefault();
              setOnlySaved(false);
              setSearched(true);
              document
                .querySelector("#homes")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <label>
              <span>YOUR LOCATION</span>
              <Select
                aria-label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>All locations</option>
                <option>Cascais</option>
                <option>Comporta</option>
                <option>Lisbon</option>
              </Select>
            </label>
            <label>
              <span>YOUR KIND OF HOME</span>
              <Select
                aria-label="Property type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option>All homes</option>
                <option>Villa</option>
                <option>Townhouse</option>
              </Select>
            </label>
            <label>
              <span>YOUR BUDGET</span>
              <Select
                aria-label="Maximum budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="any">Any price</option>
                <option value="1500000">Up to €1.5 million</option>
                <option value="2000000">Up to €2 million</option>
                <option value="3000000">Up to €3 million</option>
              </Select>
            </label>
            <button className="button">
              Find your home <Search size={17} />
            </button>
          </form>
        </section>
        <section id="homes" className="homes-section">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow section-label">THE CONSIDERED COLLECTION</p>
              <h2>
                Different homes.
                <br />
                The same feeling.
              </h2>
            </div>
            <p>
              Handpicked for their character, location
              <br />
              and the life you could build inside.
            </p>
          </div>
          <div className="results-bar">
            <span aria-live="polite">
              {filtered.length} exceptional{" "}
              {filtered.length === 1 ? "home" : "homes"}
              {searched ? " found" : ""}
            </span>
            <button
              className={onlySaved ? "saved-filter active" : "saved-filter"}
              onClick={() => setOnlySaved(!onlySaved)}
            >
              <Heart size={14} fill={onlySaved ? "currentColor" : "none"} />{" "}
              Saved homes ({saved.length})
            </button>
          </div>
          <div className="property-grid">
            {filtered.map((p) => (
              <article className="property-card" key={p.id}>
                <div className="listing-image">
                  <button
                    className="image-open"
                    onClick={() => {
                      setDetail(p);
                      setGallery(0);
                    }}
                    aria-label={`View ${p.name}`}
                  >
                    <img
                      src={p.image}
                      alt={`${p.name} in ${p.location}`}
                      loading="lazy"
                    />
                  </button>
                  <span className="listing-tag">{p.tag}</span>
                  <button
                    className={`save-home ${saved.includes(p.id) ? "is-saved" : ""}`}
                    aria-label={`${saved.includes(p.id) ? "Unsave" : "Save"} ${p.name}`}
                    aria-pressed={saved.includes(p.id)}
                    onClick={() => toggleSave(p.id)}
                  >
                    <Heart
                      size={17}
                      fill={saved.includes(p.id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>
                <div className="listing-location">
                  <MapPin size={12} />
                  {p.location}, Portugal<span>{p.type}</span>
                </div>
                <button
                  className="listing-name"
                  onClick={() => {
                    setDetail(p);
                    setGallery(0);
                  }}
                >
                  <h3>{p.name}</h3>
                  <ArrowUpRight size={21} />
                </button>
                <div className="listing-specs">
                  <span>
                    <BedDouble size={14} />
                    {p.beds} beds
                  </span>
                  <span>
                    <Bath size={14} />
                    {p.baths} baths
                  </span>
                  <span>
                    <Expand size={13} />
                    {p.area} m²
                  </span>
                </div>
                <div className="listing-price">
                  {money(p.price, "EUR")}
                  <button onClick={() => setViewing(p.name)}>
                    Arrange a viewing <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty-homes">
              <h3>A little more room to explore.</h3>
              <p>
                {onlySaved
                  ? "Save a home using its heart button to see it here."
                  : "Try another location or a wider budget."}
              </p>
              <button
                className="button"
                onClick={() => {
                  setLocation("All locations");
                  setType("All homes");
                  setBudget("any");
                  setOnlySaved(false);
                }}
              >
                See all homes <ArrowRight size={16} />
              </button>
            </div>
          )}
        </section>
        <section id="journal" className="living-section">
          <div className="living-image">
            <img
              src="/images/coastal-house.webp"
              loading="lazy"
              alt="A limestone home surrounded by olive trees and coastal grasses"
            />
            <span>THE AVEN JOURNAL / 001</span>
          </div>
          <div className="living-copy" data-reveal>
            <p className="eyebrow section-label">ROOM FOR A DIFFERENT RHYTHM</p>
            <h2>
              Some places
              <br />
              just feel
              <br />
              <em>like you.</em>
            </h2>
            <p>
              A little closer to the sea. A little more space to breathe. A
              place where the everyday becomes something you look forward to.
            </p>
            <button
              className="text-link"
              onClick={() => {
                setDetail(properties[1]);
                setGallery(0);
              }}
            >
              Discover life in Comporta <ArrowUpRight size={18} />
            </button>
          </div>
        </section>
        <section id="approach" className="approach-section">
          <div data-reveal>
            <p className="eyebrow section-label">A MORE PERSONAL APPROACH</p>
            <h2>
              Good homes.
              <br />
              <em>Better company.</em>
            </h2>
            <p>
              Finding a home is personal. So are we. From the first conversation
              to the moment you get the keys, we make space for what matters to
              you.
            </p>
            <button
              className="text-link"
              onClick={() => setViewing("Meet your Aven advisor")}
            >
              Meet your next chapter <ArrowUpRight size={18} />
            </button>
          </div>
          <div className="approach-list">
            {[
              [
                "01",
                "Curated, never crowded.",
                "A thoughtful collection of homes, chosen for the way they make you feel.",
              ],
              [
                "02",
                "Local knowledge. Human advice.",
                "People who know the neighbourhood, not just the postcode.",
              ],
              [
                "03",
                "With you, all the way.",
                "Clear conversations and considered guidance at every step.",
              ],
            ].map(([n, title, body]) => (
              <article key={n} data-reveal>
                <span>{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
                <ArrowUpRight size={19} />
              </article>
            ))}
          </div>
        </section>
        <section className="aven-cta" data-reveal>
          <p className="eyebrow">
            YOUR NEXT CHAPTER STARTS WITH A CONVERSATION
          </p>
          <h2>
            Let's find your
            <br />
            <em>somewhere.</em>
          </h2>
          <button
            className="button"
            onClick={() => setViewing("Find your somewhere")}
          >
            Tell us what home means to you <ArrowUpRight size={18} />
          </button>
        </section>
      </main>
      <footer className="aven-footer">
        <div className="aven-footer-top">
          <a href="#" className="aven-logo">
            aven<span>ESTATES</span>
          </a>
          <div>
            <p>
              Exceptional homes.
              <br />
              Human connections.
            </p>
            <span>Lisbon · Cascais · Comporta</span>
          </div>
          <Newsletter label="A few good homes. Straight to your inbox." />
        </div>
        <div className="aven-footer-bottom">
          <span>© 2026 Aven Estates · Fictional portfolio concept</span>
          <a href="#homes">
            Find your place <ArrowUpRight size={13} />
          </a>
        </div>
      </footer>
      <Modal
        wide
        open={!!detail}
        onClose={() => setDetail(null)}
        title={detail ? `${detail.location} / ${detail.type}` : "Property"}
      >
        {detail && (
          <>
            <div className={`detail-photo crop-${gallery}`}>
              <img
                src={detail.image}
                alt={`${detail.name} — ${galleryCaptions[gallery]}`}
              />
              <div className="gallery-controls">
                <button
                  aria-label="Previous gallery view"
                  onClick={() => setGallery((gallery + 2) % 3)}
                >
                  <ArrowLeft size={18} />
                </button>
                <span>0{gallery + 1} / 03</span>
                <button
                  aria-label="Next gallery view"
                  onClick={() => setGallery((gallery + 1) % 3)}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
              <span>{galleryCaptions[gallery]} · editorial crop</span>
            </div>
            <div className="detail-body">
              <div>
                <p className="eyebrow">{detail.location}, Portugal</p>
                <h2>{detail.name}</h2>
                <p>{detail.description}</p>
                <ul>
                  {detail.features.map((f) => (
                    <li key={f}>
                      <Check size={14} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <aside>
                <strong>{money(detail.price, "EUR")}</strong>
                <p>
                  {detail.beds} bedrooms · {detail.baths} bathrooms
                  <br />
                  {detail.area} m² of considered living
                </p>
                <button
                  className="button"
                  onClick={() => {
                    setDetail(null);
                    setViewing(detail.name);
                  }}
                >
                  Arrange a viewing <ArrowUpRight size={16} />
                </button>
                <button
                  className="text-link"
                  onClick={() => toggleSave(detail.id)}
                >
                  <Heart
                    size={15}
                    fill={saved.includes(detail.id) ? "currentColor" : "none"}
                  />
                  {saved.includes(detail.id)
                    ? "Saved to your collection"
                    : "Save this home"}
                </button>
              </aside>
            </div>
          </>
        )}
      </Modal>
      <Modal
        open={!!viewing}
        onClose={() => setViewing(null)}
        title="Make yourself at home"
      >
        <RequestForm
          key={viewing}
          subject={viewing || ""}
          label="Request a conversation"
          onComplete={() => setViewing(null)}
        />
      </Modal>
      <DevBadge />
    </>
  );
}
