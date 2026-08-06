document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // 1. Hero Section Animations
  const heroTimeline = gsap.timeline();
  
  heroTimeline
    .from('.gsap-hero', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.2
    })
    .from('.gsap-hero-img', {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      ease: 'back.out(1.7)'
    }, '-=0.8');

  // 2. Scroll Reveal Animations
  const fadeElements = document.querySelectorAll('.gsap-fade');
  
  fadeElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  // 3. Navbar scroll effect (Glassmorphism transition)
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 10, 12, 0.9)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
      navbar.style.padding = '0';
    } else {
      navbar.style.background = 'rgba(10, 10, 12, 0.7)';
      navbar.style.boxShadow = 'none';
    }
  });

  // 4. Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed navbar
          behavior: 'smooth'
        });
      }
    });
  });
});
