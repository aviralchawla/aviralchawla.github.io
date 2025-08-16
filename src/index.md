---
# Page settings
title: Aviral Chawla's Portfolio
toc: false
---

<div class="hero">
  <h1>Hi, I'm Aviral Chawla <span class="wave">👋</span></h1>
  <p class="tagline">
    I am a Ph.D. Candidate at the <a href='https://vermontcomplexsystems.org/'>Vermont Complex Systems Institute</a>  My research broadly focuses on statistical methods applied to natural language. 
  </p>
  <div class="social-links">
    <a href="https://github.com/aviralchawla" target="_blank" rel="noopener noreferrer">GitHub</a>
    achawla1 (at) uvm (dot) edu
  </div>
</div>

<h2>Featured Projects</h2>

<div class="post-list">
  <div class="card post-item">
    <a href="/projects/project-one">
      <h3>Analysis of Global Climate Trends</h3>
      <p class="date">Aug 12, 2025</p>
      <p>An interactive data visualization exploring decades of climate data using Observable Plot and DuckDB.</p>
    </a>
  </div>
  <div class="card post-item">
    <a href="/projects/project-two">
      <h3>Real-time Stock Market Dashboard</h3>
      <p class="date">Jul 28, 2025</p>
      <p>A live dashboard built with Framework's data loaders to track and visualize stock market fluctuations.</p>
    </a>
  </div>
  <div class="card post-item">
    <a href="/projects/project-three">
      <h3>Predictive Modeling for Customer Churn</h3>
      <p class="date">Jun 15, 2025</p>
      <p>A detailed walkthrough of a machine learning project, from data cleaning to model deployment, with explanatory charts.</p>
    </a>
  </div>
</div>

<div class="see-all">
  <a href="/projects">See all projects →</a>
</div>


<style>
/* Global Styles */
footer {
    display: none;
}

/* Hero Section */
.hero {
  padding: 4rem 0;
  text-align: left;
  max-width: 680px; /* Limits width for better readability on large screens */
  margin: 0 auto 2rem; /* Centers the hero section in the main column */
}

.hero h1 {
  font-size: 2.5rem; /* 40px */
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--theme-foreground);
}

.hero .tagline {
  font-size: 1.125rem; /* 18px */
  color: var(--theme-foreground-muted);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

/* Waving hand animation */
.wave {
  display: inline-block;
  animation: wave-animation 2.5s infinite;
  transform-origin: 70% 70%;
}

@keyframes wave-animation {
    0% { transform: rotate( 0.0deg) }
   10% { transform: rotate(14.0deg) }
   20% { transform: rotate(-8.0deg) }
   30% { transform: rotate(14.0deg) }
   40% { transform: rotate(-4.0deg) }
   50% { transform: rotate(10.0deg) }
   60% { transform: rotate( 0.0deg) }
  100% { transform: rotate( 0.0deg) }
}

/* Social Links */
.social-links {
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
}

.social-links a {
  text-decoration: none;
  font-weight: 500;
  color: var(--theme-foreground);
  transition: color 0.2s ease-in-out;
}

.social-links a:hover {
  color: var(--theme-accent-hover);
  text-decoration: underline;
}

/* Section Heading for Projects */
h2 {
  max-width: 680px;
  margin: 4rem auto 1rem;
  border-bottom: 1px solid var(--theme-foreground-faintest);
  padding-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
}

/* Project List Container */
.post-list {
  display: grid;
  gap: 1rem;
  max-width: 680px;
  margin: 0 auto;
}

/* Individual Project Card Styling */
.post-item.card {
  background-color: transparent; /* Remove default card background */
  border: 1px solid var(--theme-foreground-faintest);
  border-radius: 8px;
  padding: 1.5rem;
  transition: border-color 0.2s ease-in-out, transform 0.2s ease-in-out;
  box-shadow: none; /* Remove default card shadow */
}

.post-item.card:hover {
  border-color: var(--theme-accent-hover);
  transform: translateY(-2px); /* Subtle lift effect on hover */
}

.post-item a {
  text-decoration: none;
  color: inherit;
  display: block; /* Make the entire card clickable */
}

.post-item h3 {
  margin: 0 0 0.5rem;
  color: var(--theme-foreground);
  font-size: 1.25rem;
  font-weight: 600;
}

.post-item p {
  margin: 0;
  color: var(--theme-foreground-muted);
  line-height: 1.6;
}

.post-item .date {
  font-size: 0.875rem; /* 14px */
  color: var(--theme-foreground-muted);
  margin-bottom: 0.75rem;
}

/* "See All" Link */
.see-all {
  max-width: 680px;
  margin: 1.5rem auto;
  text-align: right;
}

.see-all a {
  font-weight: 500;
  text-decoration: none;
  color: var(--theme-accent);
}

.see-all a:hover {
  text-decoration: underline;
}

</style>
