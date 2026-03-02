---
title: About
toc: false
---

<div class="about-hero">
  <img src="/photos/solo_in_copenhagen.jpeg" alt="Aviral Chawla in Nyhavn, Copenhagen" class="about-image">
</div>

<div class="about-content">

<h1>About</h1>

<p>
  I am a Ph.D. candidate at the <a href="https://vermontcomplexsystems.org/">Vermont Complex Systems Institute</a>, University of Vermont. My research uses machine learning and natural language processing to study how AI systems organize diverse world models.
</p>
<p>
  Before Grad school, I studied the Western Classics at <a href="https://www.sjc.edu/">St. John's College</a> in Santa Fe, New Mexico. I wrote my senior essay on Adam Smith's moral and economic philosophy. A portion of it was published <a href='https://www.adamsmithworks.org/documents/social-cohesion-economic-prosperity'>here</a>.
</p>
<p>
In my free time, I love to read, swing dance, and sail (weather permitting). I am also easily distracted by dashboards and live music.
</p>

<h2>Education</h2>
<div class="edu-list">
  <div class="edu-item">
    <div class="edu-main">
      <span class="edu-degree">Ph.D. in Complex Systems & Data Science</span>
      <span class="edu-dates">2022 – Present</span>
    </div>
    <div class="edu-school">University of Vermont, Burlington, VT</div>
  </div>
  <div class="edu-item">
    <div class="edu-main">
      <span class="edu-degree">B.A. in Liberal Arts</span>
      <span class="edu-dates">2017 – 2022</span>
    </div>
    <div class="edu-school">St. John's College, Santa Fe, NM</div>
  </div>
</div>

<h2>Teaching</h2>
<div class="teaching-list">
  <div class="teaching-item">
    <div class="teaching-main">
      <span class="teaching-role">Guest Lecturer, Introduction to Database Systems</span>
      <span class="teaching-dates">Fall 2023 – Present</span>
    </div>
    <div class="teaching-detail">University of Vermont — Deliver a recurring guest lecture on Fundamentals of Data Visualization each semester.</div>
  </div>
  <div class="teaching-item">
    <div class="teaching-main">
      <span class="teaching-role">Guest Lecturer, SoCKS Summer Internship Program</span>
      <span class="teaching-dates">Summer 2024, 2025</span>
    </div>
    <div class="teaching-detail">Vermont Complex Systems Institute — Guest lectures on the History of NLP and Large Language Models.</div>
  </div>
</div>

<h2>Service</h2>
<div class="service-list">
  <div class="service-item">
    <div class="service-main">
      <span class="service-role">Board Member, US Northeast Chapter</span>
      <span class="service-dates">Jan 2026 – Present</span>
    </div>
    <div class="service-detail">Complex Systems Society — Regional event planning and academic community coordination.</div>
  </div>
  <div class="service-item">
    <div class="service-main">
      <span class="service-role">Lead Organizer, SCRaPS</span>
      <span class="service-dates">Aug 2023 – Present</span>
    </div>
    <div class="service-detail">Vermont Complex Systems Institute — A weekly student-run seminar for presenting research and receiving peer feedback.</div>
  </div>
</div>

</div>

<style>

/* ===== About Hero Image ===== */
.about-hero {
  max-width: 680px;
  margin: 1.5rem auto 0;
}

.about-image {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

/* ===== About Content ===== */
.about-content {
  max-width: 680px;
  margin: 0 auto;
}

.about-content h1 {
  font-size: 2rem;
  font-weight: 800;
  margin: 1.5rem 0 1rem;
  color: var(--theme-foreground, #000);
}

.about-content > p {
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--theme-foreground-muted, #555);
  margin-bottom: 0.75rem;
}

.about-content h2 {
  font-size: 1.35rem;
  font-weight: 700;
  margin: 2rem 0 0.75rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--theme-foreground-faintest, #eee);
  color: var(--theme-foreground, #000);
}

/* ===== Education, Teaching, Service Lists ===== */
.edu-list,
.teaching-list,
.service-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.edu-item,
.teaching-item,
.service-item {
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--theme-foreground-faintest, #eee);
}

.edu-item:last-child,
.teaching-item:last-child,
.service-item:last-child {
  border-bottom: none;
}

.edu-main,
.teaching-main,
.service-main {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
}

.edu-degree,
.teaching-role,
.service-role {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--theme-foreground, #000);
}

.edu-dates,
.teaching-dates,
.service-dates {
  flex-shrink: 0;
  font-size: 0.85rem;
  color: var(--theme-foreground-muted, #555);
}

.edu-school,
.teaching-detail,
.service-detail {
  font-size: 0.9rem;
  color: var(--theme-foreground-muted, #555);
  margin-top: 0.15rem;
  line-height: 1.5;
}

/* ===== Mobile Responsive ===== */
@media (max-width: 640px) {
  .edu-main,
  .teaching-main,
  .service-main {
    flex-direction: column;
    gap: 0.1rem;
  }

  .edu-dates,
  .teaching-dates,
  .service-dates {
    font-size: 0.8rem;
  }
}

</style>
