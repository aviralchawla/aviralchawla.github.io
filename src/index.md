---
title: Aviral Chawla's Portfolio
toc: false
---

<div class="hero">
  <div class="hero-text">
    <h1>Hi, I'm Aviral Chawla <span class="wave">👋</span></h1>
    <p class="tagline">
      I am a Ph.D. Candidate at the <a href='https://vermontcomplexsystems.org/'>Vermont Complex Systems Institute</a>. My research broadly focuses on statistical methods applied to natural language. 
    </p>
    <div class="social-links">
      <a href="https://github.com/aviralchawla" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="/data/CV-Chawla.pdf" target="_blank" rel="noopener noreferrer">CV</a>
      achawla1 (at) uvm (dot) edu
    </div>
  </div>
  <img src="/photos/profile.png" alt="Aviral Chawla's Profile Picture" class="profile-picture" onerror="this.onerror=null;this.src='https://placehold.co/140x140/333/FFF?text=AC';">
</div>

<h2>Research Interests</h2>
<div class="content">
    <p>natural language processing, computational ethics, bayesian statistics, network analysis, machine learning, mechanistic interpretability</p>
</div>

<style>

/* Hero Section */
.hero {
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  gap: 2rem; 
  padding: 2rem 0rem 1rem 0rem;
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
    flex-shrink: 0; /* Prevents the image from shrinking */
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
  line-height: 1.3;
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
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  color: var(--theme-foreground-muted, #555);
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

/* Section Heading */
h2 {
  max-width: 680px;
  margin: 2rem auto 0rem;
  border-bottom: 1px solid var(--theme-foreground-faintest, #eee);
  padding-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
}

.content {
    display: flex;
    flex-direction: column;
    max-width: 680px;
    margin: 0 auto;
}

@media (max-width: 640px) {
    .hero {
        flex-direction: column-reverse; 
        text-align: center;
    }
    
    .social-links {
      justify-content: center; /* Center social links on mobile */
    }

    .profile-picture {
      margin-bottom: 1.5rem; /* Add some space below the picture on mobile */
    }
}

</style>
