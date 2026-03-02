---
title: Aviral Chawla
toc: false
---

```js
const cvUrl = await FileAttachment("data/CV-Chawla.pdf").url();
document.getElementById("cv-link").href = cvUrl;
```

<div class="hero">
  <div class="hero-text">
    <h1>Hi, I'm Aviral Chawla <span class="wave">👋</span></h1>
    <p class="tagline">
      I study statistical methods on natural language, and how language models organize diverse world views.
    </p>
    <p class="affiliation">
      Ph.D. Candidate in Complex Systems & Data Science at the <a href="https://vermontcomplexsystems.org/">Vermont Complex Systems Institute</a>, University of Vermont. Co-advised by <a href='https://juniperlovato.com'>Juniper Lovato</a> in  <a href='https://www.compethicslab.org'>Computational Ethics Lab</a> and <a href='https://sam.zhang.fyi/main/'>Sam Zhang</a> in <a href='https://scienceandhumanitylab.github.io)'>Science & Humanity Lab</a>.
    </p>
    <div class="social-links">
      <a href="https://github.com/aviralchawla" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://scholar.google.com/citations?user=vt1Pq1IAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar</a>
      <a id="cv-link" target="_blank" rel="noopener noreferrer">CV</a>
      <span class="email">achawla1 (at) uvm (dot) edu</span>
    </div>
  </div>
  <img src="/photos/profile.png" alt="Aviral Chawla" class="profile-picture" onerror="this.onerror=null;this.src='https://placehold.co/140x140/333/FFF?text=AC';">
</div>

<h2>Research Interests</h2>
<div class="content">
  <p>
    My research sits at the intersection of machine learning, natural language processing, and computational social science. My thesis is focused on how AI models represent and coordinate multiple value systems, or world models. I approach this question from a both <a href='https://arxiv.org/pdf/2602.23164'>mechanistic</a> and statistical (coming soon) lens. My curiosity also extends to exploring questions in computational social science. More about me <a href='/about'>here</a>
  </p>
</div>

<h2>Projects</h2>
<div class="project-list">

  <a href="/projects/neighbor-hop" class="card project-item project-item--link">
    <h3>Network-Aware Influence Maximization</h3>
    <p class="project-description">
      How do you figure out who will cause the largest contagion outbreak? The problem of Influence Maximization is finding the top <i>k</i> nodes, such that when seeded with a contagion, will cause the largest outbreak. I developed an evolutionary algorithm that exploits the network structure to find candidates. The resulting algorithm consistently outperformed standard greedy baselines in both speed and solution quality across multiple network types.
    </p>
    <div class="tags">
      <span class="tag">Interactive Explainer</span>
    </div>
  </a>

</div>

<h2>Publications</h2>
<div class="content publications">
  <div class="pub-entry">
    <p><strong>A. Chawla</strong>, G. Hall, J. Lovato. "MetaOthello: A Controlled Study of Multiple World Models in Transformers." <em>arXiv:2602.23164</em> (February 2026).</p>
    <div class="tags">
      <a href="https://arxiv.org/abs/2602.23164" target="_blank" rel="noopener noreferrer" class="tag">Paper</a>
      <a href="https://github.com/aviralchawla/metaothello" target="_blank" rel="noopener noreferrer" class="tag">Code</a>
    </div>
  </div>
  <div class="pub-entry">
    <p>B. Antonczak, M. Fay, <strong>A. Chawla</strong>, G. Rowangould. "Comprehensive and spatially detailed passenger vehicle and truck traffic volume data for the United States estimated by machine learning." <em>Data in Brief</em> 64 (2026) 112451.</p>
    <div class="tags">
      <a href="https://doi.org/10.1016/j.dib.2026.112451" target="_blank" rel="noopener noreferrer" class="tag">Paper</a>
      <a href="https://doi.org/10.5061/dryad.gmsbcc2zz" target="_blank" rel="noopener noreferrer" class="tag">Dataset</a>
    </div>
  </div>
  <div class="pub-entry">
    <p><strong>A. Chawla</strong>, N. Cheney. "Neighbor-Hop Mutation for Genetic Algorithm in Influence Maximization." <em>GECCO '23 Companion</em>, Lisbon, Portugal, pp. 187–190 (July 2023).</p>
    <div class="tags">
      <a href="https://doi.org/10.1145/3583133.3590755" target="_blank" rel="noopener noreferrer" class="tag">Paper</a>
    </div>
  </div>
</div>

<h2>News</h2>
<div class="content news-list">
  <div class="news-item">
    <span class="news-date">Jan 2026</span>
    <span class="news-text">Joined the board of the US Northeast Chapter, Complex Systems Society</span>
  </div>
  <div class="news-item">
    <span class="news-date">Dec 2025</span>
    <span class="news-text">Attended Complex Networks Winter Workshop and "Towards a Data-Driven Science of Stories" in Santa Fe</span>
  </div>
  <div class="news-item">
    <span class="news-date">Jul 2025</span>
    <span class="news-text">Poster at IC2S2, Norrkoping, Sweden</span>
  </div>
  <div class="news-item">
    <span class="news-date">Jun 2025</span>
    <span class="news-text">Oral presentation and lightning talk at ICSSI 2025, Copenhagen</span>
  </div>
  <div class="news-item">
    <span class="news-date">Jun 2025</span>
    <span class="news-text">Poster at NetSci 2025, Maastricht</span>
  </div>
  <div class="news-item">
    <span class="news-date">Jun 2024</span>
    <span class="news-text">Santa Fe Institute Complex Systems Summer School</span>
  </div>
</div>

<style>

/* ===== Hero Section ===== */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem 0 1rem;
  max-width: 680px;
  margin: 0 auto 2rem;
}

.hero-text {
  flex-grow: 1;
}

.profile-picture {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--theme-foreground, #333);
  flex-shrink: 0;
}

.hero h1 {
  font-size: 2.3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--theme-foreground, #000);
}

.hero .tagline {
  font-size: 1.125rem;
  color: var(--theme-foreground-muted, #555);
  line-height: 1.4;
  margin-bottom: 0.5rem;
}

.hero .affiliation {
  font-size: 0.95rem;
  color: var(--theme-foreground-muted, #555);
  line-height: 1.4;
  margin-bottom: 0;
}

/* Waving hand animation */
.wave {
  display: inline-block;
  animation: wave-animation 2.5s infinite;
  transform-origin: 70% 70%;
  vertical-align: middle;
  animation-delay: 50ms;
}

@keyframes wave-animation {
  0%   { transform: rotate(0deg); }
  10%  { transform: rotate(14deg); }
  20%  { transform: rotate(-8deg); }
  30%  { transform: rotate(14deg); }
  40%  { transform: rotate(-4deg); }
  50%  { transform: rotate(10deg); }
  60%  { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}

/* ===== Social Links ===== */
.social-links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
  color: var(--theme-foreground-muted, #555);
  font-size: 0.95rem;
}

.social-links a {
  text-decoration: none;
  font-weight: 500;
  color: var(--theme-foreground, #000);
  transition: color 0.2s ease-in-out;
}

.social-links a:hover {
  color: var(--theme-accent-hover, #007bff);
  text-decoration: underline;
}

.social-links .email {
  color: var(--theme-foreground-muted, #555);
}

/* ===== Section Headings ===== */
h2 {
  max-width: 680px;
  margin: 2.5rem auto 0;
  border-bottom: 1px solid var(--theme-foreground-faintest, #eee);
  padding-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
}

/* ===== Content Container ===== */
.content {
  display: flex;
  flex-direction: column;
  max-width: 680px;
  margin: 0 auto;
}

.content p {
  line-height: 1.6;
  color: var(--theme-foreground-muted, #555);
}

/* ===== Project Cards ===== */
.project-list {
  display: grid;
  gap: 1rem;
  max-width: 680px;
  margin: 0.75rem auto 0;
}

.project-item.card {
  background-color: transparent;
  border: 1px solid var(--theme-foreground-faintest, #eee);
  border-radius: 8px;
  padding: 1.25rem;
  transition: border-color 0.2s ease-in-out, transform 0.2s ease-in-out;
}
a.project-item--link {
  display: block;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.project-item.card:hover {
  border-color: var(--theme-accent-hover, #007bff);
  transform: translateY(-2px);
}

.project-item h3 {
  color: var(--theme-foreground, #000);
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.project-description {
  color: var(--theme-foreground-muted, #555);
  line-height: 1.6;
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
}

/* ===== Pill Badge Tags ===== */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 999px;
  background-color: rgba(0, 123, 255, 0.08);
  color: var(--theme-accent-hover, #007bff);
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;
  line-height: 1.4;
}

a.tag:hover {
  background-color: rgba(0, 123, 255, 0.18);
  text-decoration: none;
}

.tag-muted {
  background-color: rgba(0, 0, 0, 0.05);
  color: var(--theme-foreground-muted, #555);
}

/* ===== Publications ===== */
.publications {
  gap: 0;
}

.pub-entry {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--theme-foreground-faintest, #eee);
}

.pub-entry:last-child {
  border-bottom: none;
}

.pub-entry p {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--theme-foreground-muted, #555);
}

/* ===== News Timeline ===== */
.news-list {
  gap: 0;
}

.news-item {
  display: flex;
  gap: 1rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--theme-foreground-faintest, #eee);
  font-size: 0.95rem;
  line-height: 1.5;
}

.news-item:last-child {
  border-bottom: none;
}

.news-date {
  flex-shrink: 0;
  width: 5.5rem;
  font-weight: 600;
  color: var(--theme-foreground, #000);
}

.news-text {
  color: var(--theme-foreground-muted, #555);
}

/* ===== Mobile Responsive ===== */
@media (max-width: 640px) {
  .hero {
    flex-direction: column-reverse;
    text-align: center;
    margin: 0 auto;
  }

  .hero h1 {
    font-size: 1.75rem;
  }

  .social-links {
    justify-content: center;
  }

  .news-item {
    flex-direction: column;
    gap: 0.15rem;
  }

  .news-date {
    width: auto;
    font-size: 0.85rem;
  }
}

</style>
