---
title: Neighbor-Hop Mutation for Influence Maximization
toc: false
---

<div class="nh-intro">
<div class="nh-intro__badge">Interactive Explainer</div>
<h1>How Do Ideas Spread<br>Through Networks?</h1>
<p class="nh-intro__meta">Based on <a href="https://doi.org/10.1145/3583133.3590755" target="_blank" rel="noopener noreferrer">Neighbor-Hop Mutation for Genetic Algorithm in Influence Maximization</a><br><strong>A. Chawla</strong> &amp; N. Cheney — GECCO '23, Lisbon</p>
</div>

<div class="nh-prose">

I find dynamics on networks very interesting.  Before starting graduate school, in 2018, a library near me was giving away free books. One of which was [Social and Economic Networks](https://press.princeton.edu/books/paperback/9780691148205/social-and-economic-networks?srsltid=AfmBOopywqJT0UGnWf4dzCg2RYpgN8kYbRnaqhnJN6qFp1icRyMwDVrM) by Mathew Jackson. The book opens with the story  of Italy's Medici family in Florence. In the early 1400s, the Medici were not the most established or the wealthiest family in Florence; the **Strozzi** and **Albizzi** families were their major rivals and arguably held more traditional prestige. However, by 1434, Cosimo de' Medici had effectively consolidated power and became the de facto ruler of the city. Jackson demonstrates how Medici's high [Betweenness Centrality](https://en.wikipedia.org/wiki/Betweenness_centrality) helped the family consolidate power by controlling the flow of resources and information.

I was deeply fascinated by how your position in the network, and how this network is structured, can have a consequential impact on your life. This interest was resurfaced in 2020 during the COVID-19 pandemic. I started to read more about epidemiology, network science, and computational social science in general. I was curious to understand how our social ties determined if you get infected or not. So when I joined graduate school, I jumped at the chance to work on some problems in network science. One of which is the[ Influence Maximization problem](https://snap-stanford.github.io/cs224w-notes/network-methods/influence-maximization). Here goes-

</div>

<div>
<h2 class="intro-header">Influence Maximization (in brief)</h2>
</div>

<div class="nh-intro__scroll-hint">
<span>Scroll to explore</span>
<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4 L10 16 M5 11 L10 16 L15 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
</div>

<div class="scrolly-container">
<div class="scrolly-graphic">
<div class="scrolly-graphic__inner"></div>
</div>
<div class="scrolly-text">
<div class="step is-active" data-step="0">
<div class="step__content">
<span class="step__number">01</span>
<h3>Network</h3>
<p>Imagine a social network. Here, each person is a <code>node</code>. They are connected to another node, with an <code>edge</code> if they are friends. Here, we can see a few communities.</p>
</div>
</div>
<div class="step" data-step="1">
<div class="step__content">
<span class="step__number">02</span>
<h3>What is a Contagion?</h3>
<p>A contagion is anything that spreads on a network through edges. For example, an idea, a virus, a rumor. There are many ways this information can be spread. For example, you can infect a friend with a fixed probability, <em>p</em>. Or, you can infect your friend with a higher probability if they have also have lot of friends that are infected.</p>
<p>In this walkthrough, we will just focus on transmissions with fixed probabilities.</p>
</div>
</div>
<div class="step" data-step="2">
<div class="step__content">
<span class="step__number">03</span>
<h3>Whom to Infect?</h3>
<p>In your group, whom would you tell a rumor, such that everybody finds out? The node that is seeded in the network has a huge impact on how the outbreak size. For instance, removed from any community, and not many friends, will likely not have a huge influence. However, a node that bridges two communities (cue, the Medici family) will infect a lot more people.</p>
</div>
</div>
<div class="step" data-step="3">
<div class="step__content">
<span class="step__number">04</span>
<h3>The Influence Maximization Problem</h3>
<p>Finding the most influential person is easy. You tell your secret to everybody and figure out how many people find out. (𝒪(n)) Now, instead of one person, you can tell your secret to <strong>k</strong> people. How do you pick those people? It blows up fast. (𝒪(C(n,k))). That's the problem.</p>
</div>
</div>
<div class="step" data-step="4">
<div class="step__content">
<span class="step__number">05</span>
<h3>How Do We Solve It?</h3>
<p>Since we cannot try every combination, we need smarter strategies. Two main families of approaches exist:</p>
<p><strong>Greedy algorithms</strong> — slow but with theoretical guarantees.<br><strong>Heuristic methods</strong> — faster but approximate, like genetic algorithms that evolve solutions over generations.</p>
</div>
</div>
<div class="step" data-step="5">
<div class="step__content">
<span class="step__number">06</span>
<h3>The Greedy Approach</h3>
<p>The greedy algorithm builds its seed set one person at a time. First, we simulate spreading from <em>every</em> node and picks the best node. Next, we fix that choice and seed the infection with that node and every other node. And so on.</p>
<p>This guarantees a solution within 63% of the true optimum (a mathematical bound of 1 − 1/e). But it requires running thousands of simulations, and each round tests every remaining node. This is still expensive.</p>
</div>
</div>
<div class="step" data-step="6">
<div class="step__content">
<span class="step__number">07</span>
<h3>Our Approach: Neighbor-Hop Mutation</h3>
<p>We use a <a href="https://en.wikipedia.org/wiki/Genetic_algorithm" target="_blank" rel="noopener noreferrer"><strong>genetic algorithm</strong></a>. The algorithm start with a population of random seed nodes and evolve this population over generations through mutation and selection. Also why it is called an Evolutionary algorithm. The key innovation is in our work is <em>how</em> we mutate.</p>
</div>
</div>
<div class="step" data-step="7">
<div class="step__content">
<span class="step__number">08</span>
<h3>Standard Mutation</h3>
<p><strong>Standard mutation</strong> replaces a seed with a random node anywhere in the network. This often destroys what made a solution good. <strong>Neighbor-hop mutation</strong> instead replaces a seed with one of its network neighbors. This is a small, local adjustment that explores nearby solutions.</p>
</div>
</div>
<div class="step" data-step="8">
<div class="step__content">
<span class="step__number">09</span>
<h3>Neighbor-Hop Mutation</h3>
<p>By "walking" along edges instead of jumping randomly, the algorithm preserves structural quality while efficiently searching for improvements. In our experiments, it consistently matched or beat the greedy baseline — in a fraction of the time.</p>
</div>
</div>
</div>
</div>

<div class="nh-prose">
<h2>Key Takeaway</h2>

Network structure matters — not just for how contagions spread, but for how we design algorithms to study them. By making mutations "network-aware," we can find better solutions faster.
</div>
<div class="nh-conclusion__links">
<a href="https://doi.org/10.1145/3583133.3590755" target="_blank" rel="noopener noreferrer" class="nh-btn">Read the Paper</a>
<a href="/" class="nh-btn nh-btn--secondary">Back to Home</a>
</div>

```js
import { createNetwork } from "../components/networkRenderer.js";
import { initScrollytelling } from "../components/scrollyController.js";

const graphContainer = document.querySelector(".scrolly-graphic__inner");
const network = createNetwork(graphContainer);

const scrollyContainer = document.querySelector(".scrolly-container");
const cleanup = initScrollytelling(scrollyContainer, network);

invalidation.then(() => cleanup());
```

<style>

#observablehq-main {
  max-width: none !important;
}
#observablehq-main .observablehq {
  max-width: none;
  padding: 0;
}

/* ===== Intro ===== */
.nh-intro {
  max-width: 680px;
  margin: 0 auto;
  padding: 3rem 1.5rem 1rem;
  text-align: center;
}

.intro-header {
  max-width: 100vw;
  text-align: center;
}
.nh-intro__badge {
  display: inline-block;
  padding: 0.25rem 0.85rem;
  border-radius: 999px;
  background: rgba(59,130,246,0.08);
  color: #3b82f6;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  margin-bottom: 1.5rem;
}
.nh-intro h1 {
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.15;
  color: var(--theme-foreground, #1f2937);
  margin: 0 0 1rem;
}
.nh-intro__meta {
  font-size: 0.9rem;
  color: var(--theme-foreground-muted, #888);
  line-height: 1.6;
}
.nh-intro__meta a {
  color: #3b82f6;
  text-decoration: none;
}
.nh-intro__meta a:hover {
  text-decoration: underline;
}

/* Scroll hint */
.nh-intro__scroll-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  color: var(--theme-foreground-muted, #aaa);
  font-size: 0.8rem;
  margin: 1.5rem auto;
  animation: bounce 2s ease-in-out infinite;
}
@keyframes bounce {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(5px); }
}

/* ===== Centered prose block ===== */
.nh-prose {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: left;
}
/* ===== Markdown prose sections ===== */
#observablehq-main .observablehq > p,
#observablehq-main .observablehq > h2 {
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

/* ===== Scrollytelling ===== */
.scrolly-container {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  max-width: 1200px;
  display: flex;
  gap: 2rem;
  padding: 0 2rem;
  box-sizing: border-box;
  margin: 0 auto;
}

.scrolly-graphic {
  flex: 0 0 50%;
  max-width: 550px;
  position: sticky;
  top: 4rem;
  height: calc(100vh - 5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.scrolly-graphic__inner {
  width: 100%;
  max-width: 520px;
  background: #fafafa;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04),
              0 6px 16px rgba(0,0,0,0.03);
}
.scrolly-graphic__inner svg {
  display: block;
  width: 100%;
  height: auto;
}

.scrolly-text {
  flex: 1;
  min-width: 0;
  padding: 10vh 0;
}

/* ===== Steps ===== */
.step {
  min-height: 85vh;
  display: flex;
  align-items: center;
  padding: 2rem 0;
  opacity: 0.15;
  transition: opacity 0.5s ease;
}
.step.is-active {
  opacity: 1;
}
.step:first-child {
  padding-top: 5vh;
}
.step:last-child {
  min-height: 60vh;
}
.step__content {
  max-width: 420px;
}
.step__number {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #3b82f6;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
  font-family: "SF Mono","Fira Code",monospace;
}
.step h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--theme-foreground, #1f2937);
  margin: 0 0 0.75rem;
  line-height: 1.3;
}
.step p {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--theme-foreground-muted, #4b5563);
  margin: 0 0 0.75rem;
}
.step p:last-child { margin-bottom: 0; }
.step strong { color: var(--theme-foreground, #1f2937); font-weight: 600; }
.step em { font-style: italic; }
.step code {
  background: rgba(59,130,246,0.08);
  color: #3b82f6;
  padding: 0.15em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
}
.step a {
  color: #3b82f6;
  text-decoration: none;
}
.step a:hover { text-decoration: underline; }

/* ===== Conclusion ===== */
.nh-conclusion__links {
  max-width: 680px;
  margin: 1.5rem auto 4rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 1.5rem;
}
.nh-btn {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  background: #3b82f6;
  color: #ffffff !important;
}
.nh-btn:hover {
  background: #2563eb;
  /* color: #ffffff !important; */
  transform: translateY(-1px);
}
.nh-btn--secondary {
  background: transparent;
  color: var(--theme-foreground-muted, #555) !important;
  border: 1px solid #e5e7eb;
}
.nh-btn--secondary:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  background: rgba(59,130,246,0.04);
}

/* ===== Mobile ===== */
@media (max-width: 768px) {
  .nh-intro h1 { font-size: 2rem; }
  .scrolly-container {
    flex-direction: column;
    padding: 0 1rem;
    gap: 0;
  }
  .scrolly-graphic {
    position: sticky;
    top: 0;
    flex: none;
    width: 100%;
    max-width: 100%;
    height: auto;
    max-height: 42vh;
    z-index: 10;
    background: var(--theme-background, #fff);
    padding: 2.5rem 0 0.75rem;
    border-bottom: 1px solid #e5e7eb;
  }
  .scrolly-graphic__inner {
    max-height: 38vh;
    padding: 0.5rem;
  }
  .scrolly-text {
    position: relative;
    z-index: 0;
    padding: 2vh 0;
  }
  .step {
    min-height: 65vh;
    padding: 1.5rem 0;
  }
  .step:first-child { padding-top: 2vh; }
  .step__content { max-width: 100%; }
  .step h3 { font-size: 1.2rem; }
  .step p { font-size: 0.95rem; }
}
@media (max-width: 480px) {
  .nh-intro { padding: 2rem 1rem 1rem; }
  .nh-intro h1 { font-size: 1.65rem; }
  .scrolly-graphic { max-height: 35vh; }
  .step { min-height: 55vh; }
}

</style>
