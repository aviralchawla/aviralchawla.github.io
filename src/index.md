---
title: Aviral Chawla's Portfolio
toc: false
---

<div class="hero">
  <img src="/profile.png" alt="Aviral Chawla's Profile Picture" class="profile-picture">
  <h1>Hi, I'm Aviral Chawla <span class="wave">👋</span></h1>
  <p class="tagline">
    I am a Ph.D. Candidate at the <a href='https://vermontcomplexsystems.org/'>Vermont Complex Systems Institute</a>  My research broadly focuses on statistical methods applied to natural language. 
  </p>
  <div class="social-links">
    <a href="https://github.com/aviralchawla" target="_blank" rel="noopener noreferrer">GitHub</a>
    achawla1 (at) uvm (dot) edu
  </div>
</div>

<h2>Research Interests</h2>
<div class="content">
    <p>bayesian statistics, network analysis, machine learning, mechanistic interpretability</p>
</div>

<style>

/* Hero Section */
.hero {
  padding: 2rem 0;
  text-align: left;
  max-width: 680px; 
  margin: 0 auto 2rem; /* Centers the hero section in the main column */
}

.profile-picture {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--theme-foreground);
    margin-bottom: 1.3rem;
    flex-shrink: 0;
}


.hero h1 {
  font-size: 2.3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--theme-foreground);
}

.hero .tagline {
  font-size: 1.125rem;
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

.content {
    display: flex;
    flex-direction: column;
    max-width: 680px;
    margin: 0 auto;
    gap: 1rem;
    }

@media (max-width: 640px) {
    .hero {
        flex-direction: column;
        }

    .hero-text {
        text-align: center;
        }


</style>
