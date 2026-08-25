"use client";

import { useMemo, useState } from "react";

type EvidenceRecord = {
  id: string;
  factor: string;
  factorType: "Topical" | "Diet" | "Habit" | "Supplement" | "Guideline";
  concern: string;
  design: string;
  year: number;
  sample: string;
  direction: "Supportive" | "Mixed" | "Context dependent";
  confidence: "Higher" | "Moderate" | "Early";
  finding: string;
  limitation: string;
  source: string;
  citation: string;
  funding: string;
};

const records: EvidenceRecord[] = [
  {
    id: "33984185",
    factor: "Ceramide-dominant moisturizer",
    factorType: "Topical",
    concern: "Barrier dysfunction",
    design: "Randomized trial",
    year: 2021,
    sample: "Adults with moderate eczema",
    direction: "Supportive",
    confidence: "Moderate",
    finding: "TEWL and hydration improved versus placebo over 28 days, while eczema severity did not differ between groups at day 28.",
    limitation: "Short follow-up; product regimen rather than ceramide alone; sponsor employees were study authors.",
    source: "https://pubmed.ncbi.nlm.nih.gov/33984185/",
    citation: "Spada F, et al. Dermatol Ther. 2021;34(4):e14970.",
    funding: "Manufacturer-sponsored; disclosed employment conflicts",
  },
  {
    id: "31585489",
    factor: "Ceramide moisturizer",
    factorType: "Topical",
    concern: "Dryness",
    design: "Split-site randomized trial",
    year: 2019,
    sample: "24 participants with xerosis",
    direction: "Supportive",
    confidence: "Early",
    finding: "The ceramide-containing side showed improved hydration, TEWL, and skin pH relative to hydrophilic cream.",
    limitation: "Small sample, narrow population, and product-level evidence cannot isolate one ingredient.",
    source: "https://pubmed.ncbi.nlm.nih.gov/31585489/",
    citation: "Lueangarun S, et al. Dermatol Ther. 2019;32(6):e13090.",
    funding: "Verify full-text funding statement before formal synthesis",
  },
  {
    id: "23732711",
    factor: "Daily sunscreen",
    factorType: "Habit",
    concern: "Photoaging",
    design: "Community randomized trial",
    year: 2013,
    sample: "903 adults younger than 55",
    direction: "Supportive",
    confidence: "Higher",
    finding: "After 4.5 years, skin aging was 24% lower by relative odds in the daily-use group versus discretionary use.",
    limitation: "Some outcome data were missing and power for moderate effects was limited.",
    source: "https://pubmed.ncbi.nlm.nih.gov/23732711/",
    citation: "Hughes MCB, et al. Ann Intern Med. 2013;158(11):781–790.",
    funding: "National Health and Medical Research Council of Australia",
  },
  {
    id: "22678562",
    factor: "Low-glycemic-load diet",
    factorType: "Diet",
    concern: "Acne",
    design: "Randomized controlled trial",
    year: 2012,
    sample: "32 participants",
    direction: "Supportive",
    confidence: "Early",
    finding: "A 10-week intervention reduced inflammatory and non-inflammatory lesions and changed several histologic markers.",
    limitation: "Small, short study in one population; dietary adherence and generalizability need consideration.",
    source: "https://pubmed.ncbi.nlm.nih.gov/22678562/",
    citation: "Kwon HH, et al. Acta Derm Venereol. 2012;92(3):241–246.",
    funding: "Non-U.S. government research support listed by PubMed",
  },
  {
    id: "17448569",
    factor: "Low-glycemic-load diet",
    factorType: "Diet",
    concern: "Acne",
    design: "Investigator-masked randomized trial",
    year: 2007,
    sample: "43 male participants",
    direction: "Supportive",
    confidence: "Early",
    finding: "Total lesion counts decreased more with the low-glycemic-load diet over 12 weeks than with the control diet.",
    limitation: "Weight loss may have contributed; small all-male sample limits generalizability.",
    source: "https://pubmed.ncbi.nlm.nih.gov/17448569/",
    citation: "Smith RN, et al. J Am Acad Dermatol. 2007;57(2):247–256.",
    funding: "Review the full paper for complete funding and conflict details",
  },
  {
    id: "21822427",
    factor: "Niacinamide 4%",
    factorType: "Topical",
    concern: "Melasma",
    design: "Split-face randomized trial",
    year: 2011,
    sample: "27 participants",
    direction: "Context dependent",
    confidence: "Early",
    finding: "Both niacinamide and hydroquinone sides improved; colorimetry did not find a significant difference between sides.",
    limitation: "Small sample, eight-week duration, and melasma should not be generalized to every form of hyperpigmentation.",
    source: "https://pubmed.ncbi.nlm.nih.gov/21822427/",
    citation: "Navarrete-Solís J, et al. Dermatol Res Pract. 2011:379173.",
    funding: "Verify full-text funding statement before formal synthesis",
  },
  {
    id: "34804354",
    factor: "Niacinamide + benzoyl peroxide",
    factorType: "Topical",
    concern: "Acne",
    design: "Split-face randomized trial",
    year: 2021,
    sample: "21 adults; split-face design",
    direction: "Context dependent",
    confidence: "Early",
    finding: "Adding 5% niacinamide improved non-inflammatory lesion counts and sebum measures, but not all outcomes differed between sides.",
    limitation: "Small sample and combination treatment prevent attributing outcomes to niacinamide alone.",
    source: "https://pubmed.ncbi.nlm.nih.gov/34804354/",
    citation: "Kaewsanit T, et al. J Clin Aesthet Dermatol. 2021;14(6):35–41.",
    funding: "Verify full-text funding and conflicts before formal synthesis",
  },
  {
    id: "37550898",
    factor: "Azelaic acid",
    factorType: "Topical",
    concern: "Acne / rosacea / melasma",
    design: "Systematic review",
    year: 2023,
    sample: "43 randomized trials",
    direction: "Supportive",
    confidence: "Higher",
    finding: "The review found azelaic acid more effective than vehicle across acne, rosacea, and melasma outcomes, with many active-comparator results equivalent.",
    limitation: "Conditions, strengths, comparators, and outcomes varied; authors were affiliated with a dermatology company.",
    source: "https://pubmed.ncbi.nlm.nih.gov/37550898/",
    citation: "King S, et al. J Cosmet Dermatol. 2023;22(10):2650–2662.",
    funding: "Industry affiliation disclosed on PubMed",
  },
  {
    id: "40324552",
    factor: "Oral collagen supplements",
    factorType: "Supplement",
    concern: "Skin aging",
    design: "Systematic review & meta-analysis",
    year: 2025,
    sample: "23 RCTs; 1,474 participants",
    direction: "Mixed",
    confidence: "Higher",
    finding: "Pooled results favored collagen, but high-quality and non-industry-funded subgroups did not show benefit.",
    limitation: "Funding source and study quality changed the conclusion, illustrating why pooled averages need subgroup analysis.",
    source: "https://pubmed.ncbi.nlm.nih.gov/40324552/",
    citation: "Myung S-K, Park Y. Am J Med. 2025;138(9):1264–1277.",
    funding: "Funding-source subgroup analysis reported",
  },
  {
    id: "AAD-ACNE-2024",
    factor: "Evidence-based acne therapies",
    factorType: "Guideline",
    concern: "Acne",
    design: "Clinical practice guideline",
    year: 2024,
    sample: "Multidisciplinary evidence synthesis",
    direction: "Supportive",
    confidence: "Higher",
    finding: "AAD recommendations favor benzoyl peroxide, topical retinoids, salicylic acid, azelaic acid, and other therapies in appropriate clinical contexts.",
    limitation: "A guideline supports clinical decision-making; it does not predict which option is best for a specific individual.",
    source: "https://www.aad.org/member/clinical-quality/guidelines/acne",
    citation: "American Academy of Dermatology. Acne clinical guideline. Updated 2024.",
    funding: "Professional-society guideline; consult the full guideline disclosures",
  },
];

const typeColors: Record<EvidenceRecord["factorType"], string> = {
  Topical: "var(--teal)",
  Diet: "var(--gold)",
  Habit: "var(--blue)",
  Supplement: "var(--rose)",
  Guideline: "var(--ink)",
};

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function EvidenceCard({ record }: { record: EvidenceRecord }) {
  return (
    <article className="evidence-card">
      <div className="card-topline">
        <span className="type-pill" style={{ "--pill": typeColors[record.factorType] } as React.CSSProperties}>
          {record.factorType}
        </span>
        <span className={`confidence confidence-${record.confidence.toLowerCase()}`}>{record.confidence} confidence</span>
      </div>
      <h3>{record.factor}</h3>
      <p className="concern-label">{record.concern} · {record.year}</p>
      <p className="finding">{record.finding}</p>
      <div className="record-grid">
        <div><span>Design</span><strong>{record.design}</strong></div>
        <div><span>Evidence base</span><strong>{record.sample}</strong></div>
      </div>
      <details>
        <summary>Read research context</summary>
        <div className="details-body">
          <p><strong>Limitation:</strong> {record.limitation}</p>
          <p><strong>Funding / conflicts:</strong> {record.funding}</p>
          <p className="citation">{record.citation}</p>
        </div>
      </details>
      <a className="source-link" href={record.source} target="_blank" rel="noreferrer">
        Open source record <ArrowIcon />
      </a>
    </article>
  );
}

export default function Home() {
  const [concern, setConcern] = useState("All concerns");
  const [factorType, setFactorType] = useState("All types");
  const [query, setQuery] = useState("");

  const concerns = ["All concerns", ...Array.from(new Set(records.map((record) => record.concern))).sort()];
  const types = ["All types", ...Array.from(new Set(records.map((record) => record.factorType))).sort()];

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return records.filter((record) => {
      const concernMatches = concern === "All concerns" || record.concern === concern;
      const typeMatches = factorType === "All types" || record.factorType === factorType;
      const textMatches = !normalized || [record.factor, record.concern, record.design, record.finding]
        .join(" ").toLowerCase().includes(normalized);
      return concernMatches && typeMatches && textMatches;
    });
  }, [concern, factorType, query]);

  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Skin Science Research Lab home">
          <span className="brand-mark">S</span>
          <span><strong>Skin Science</strong><small>Research Lab</small></span>
        </a>
        <div className="nav-links">
          <a href="#evidence">Evidence</a>
          <a href="#case-study">Case study</a>
          <a href="#methods">Methods</a>
          <a href="#about">About</a>
        </div>
        <a className="nav-cta" href="#evidence">Explore dataset</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Student-led research · curated seed release 01</p>
          <h1>Making skin science <em>legible.</em></h1>
          <p className="hero-lede">
            An evidence-mapping project that turns dermatology research into a transparent,
            explorable dataset—without flattening uncertainty into a beauty claim.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#evidence">Explore verified records <span>↓</span></a>
            <a className="text-link" href="#methods">Read the methodology <ArrowIcon /></a>
          </div>
          <div className="integrity-note">
            <span className="integrity-dot" />
            <p><strong>Research integrity first.</strong> Source-backed does not mean expert-reviewed. This release is educational, non-clinical, and independently verifiable.</p>
          </div>
        </div>

        <div className="hero-visual" aria-label="Visual summary of the evidence dataset">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="skin-core">
            <span>RESEARCH<br />QUESTION</span>
            <strong>How strong is<br />the evidence?</strong>
          </div>
          <div className="floating-card fc-one"><span>Study design</span><strong>RCT · Review · Guideline</strong></div>
          <div className="floating-card fc-two"><span>Every claim includes</span><strong>Source + limitation</strong></div>
          <div className="floating-card fc-three"><span>Data pipeline</span><strong>Collect → code → compare</strong></div>
        </div>
      </section>

      <section className="metric-strip" aria-label="Project metrics">
        <div><strong>{records.length}</strong><span>verified source records</span></div>
        <div><strong>{new Set(records.map((r) => r.factor)).size}</strong><span>factors mapped</span></div>
        <div><strong>{new Set(records.map((r) => r.concern)).size}</strong><span>research outcomes</span></div>
        <div><strong>100%</strong><span>records linked to source</span></div>
      </section>

      <section className="section evidence-section" id="evidence">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Evidence library</p>
            <h2>Interrogate the record,<br />not the headline.</h2>
          </div>
          <p>
            Each card is a structured research record. Ratings describe confidence in this
            small curated set—not universal clinical effectiveness.
          </p>
        </div>

        <div className="filters" role="search">
          <label>
            <span>Search records</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try ceramides, acne, randomized…" />
          </label>
          <label>
            <span>Concern</span>
            <select value={concern} onChange={(event) => setConcern(event.target.value)}>
              {concerns.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Factor type</span>
            <select value={factorType} onChange={(event) => setFactorType(event.target.value)}>
              {types.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <div className="results-count" aria-live="polite"><strong>{filtered.length}</strong><span>records shown</span></div>
        </div>

        <div className="evidence-grid">
          {filtered.map((record) => <EvidenceCard key={record.id} record={record} />)}
        </div>
        {filtered.length === 0 && <p className="empty-state">No records match those filters. Try a broader search.</p>}
      </section>

      <section className="section case-study" id="case-study">
        <div className="case-copy">
          <p className="eyebrow">Case study 01 · Ceramides</p>
          <h2>From barrier biology to a testable claim.</h2>
          <p className="large-copy">
            Ceramides are lipids in the stratum corneum matrix. A credible question is not
            “Do ceramides work?” but “Which formulation, in which population, against which
            comparator, measured with which outcome?”
          </p>
          <div className="research-question">
            <span>Focused question</span>
            <p>In adults with dry or eczema-prone skin, do ceramide-containing moisturizers improve TEWL or hydration compared with a vehicle or basic moisturizer?</p>
          </div>
        </div>
        <div className="barrier-model">
          <div className="model-label">Conceptual pathway</div>
          {[
            ["01", "Topical application", "A complete formulation reaches the outer skin"],
            ["02", "Lipid organization", "Ceramide-containing systems may support matrix structure"],
            ["03", "Barrier measures", "Trials assess TEWL, hydration, symptoms, and tolerability"],
            ["04", "Cautious inference", "Product evidence does not prove an isolated ingredient effect"],
          ].map(([n, title, copy]) => (
            <div className="model-step" key={n}>
              <span>{n}</span><div><strong>{title}</strong><p>{copy}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section methods" id="methods">
        <div className="section-heading method-heading">
          <div>
            <p className="eyebrow">Research + data science</p>
            <h2>A reproducible workflow,<br />not a mystery score.</h2>
          </div>
          <p>Built from the original Python/pandas prototype, redesigned around study-level provenance and honest uncertainty.</p>
        </div>

        <div className="pipeline">
          {[
            ["01", "Frame", "Define population, factor, comparator, and outcome before searching."],
            ["02", "Collect", "Search scholarly databases; record DOI/PMID and exact citation."],
            ["03", "Extract", "Code design, sample, outcome, limitation, and funding context."],
            ["04", "Validate", "Check required fields, controlled terms, duplicates, and source links."],
            ["05", "Explore", "Filter, group, compare distributions, and map evidence gaps."],
            ["06", "Interpret", "Separate observed results from inference and clinical advice."],
          ].map(([n, title, copy]) => (
            <article className="pipeline-step" key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>

        <div className="method-panels">
          <div className="rubric-panel">
            <h3>Confidence rubric</h3>
            <div className="rubric-row"><span className="rubric-dot high" /><strong>Higher</strong><p>Systematic synthesis or larger randomized evidence; limitations still apply.</p></div>
            <div className="rubric-row"><span className="rubric-dot medium" /><strong>Moderate</strong><p>Controlled human evidence with important scope, duration, or conflict considerations.</p></div>
            <div className="rubric-row"><span className="rubric-dot early" /><strong>Early</strong><p>Small, short, or narrowly sampled study that warrants replication.</p></div>
          </div>
          <div className="limitations-panel">
            <p className="eyebrow">What this release cannot establish</p>
            <ul>
              <li>A ranking is not a treatment recommendation.</li>
              <li>Product trials do not isolate every ingredient.</li>
              <li>Statistical significance is not the same as clinical importance.</li>
              <li>A curated seed set is not a systematic review.</li>
              <li>Individual tolerability cannot be predicted here.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section about" id="about">
        <div className="about-card">
          <p className="eyebrow">Student researcher statement</p>
          <h2>I built this to learn how evidence becomes data—and how data can mislead when context disappears.</h2>
          <p>
            This project began as a Streamlit dashboard using Python, pandas, and Plotly. The
            research-platform edition adds a study-level schema, direct provenance, conflict and
            limitation fields, a documented confidence rubric, and a public interface designed
            for independent checking. My next milestones are dual-reviewer extraction, a published
            search protocol, risk-of-bias assessment, and versioned dataset releases.
          </p>
          <div className="about-tags"><span>Python</span><span>pandas</span><span>Evidence synthesis</span><span>Data visualization</span><span>Research ethics</span></div>
        </div>
        <aside className="release-card">
          <span className="release-label">Release notes</span>
          <strong>Seed 01</strong>
          <dl>
            <div><dt>Literature checked</dt><dd>22 Aug 2026</dd></div>
            <div><dt>Record status</dt><dd>Source-linked</dd></div>
            <div><dt>Expert review</dt><dd>Not yet completed</dd></div>
            <div><dt>Medical use</dt><dd>Not appropriate</dd></div>
          </dl>
          <a href="/skin-science-evidence-seed.csv" download>Download research data ↓</a>
        </aside>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark">S</span><span><strong>Skin Science</strong><small>Research Lab</small></span></a>
        <p>Educational research platform · not medical advice · verify sources before reuse</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
