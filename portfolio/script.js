// ===== ScrollReveal Animations =====
ScrollReveal({
  reset: false,
  distance: "60px",
  duration: 1000,
  delay: 200
});

// Header content
ScrollReveal().reveal('header h1, header p, .btn', {
  origin: "top",
  interval: 150
});

// Sections
ScrollReveal().reveal('#about h2, #projects h2, #contact h2', {
  origin: "top",
  delay: 300
});

ScrollReveal().reveal('#about p, .project-card, #contact p', {
  origin: "bottom",
  interval: 200
});
