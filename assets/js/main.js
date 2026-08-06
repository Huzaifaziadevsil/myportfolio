document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // 1. Page Transition (Fade in on load)
  gsap.from('body', {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut'
  });

  // 2. Hero Section Animations (Only runs on Home)
  if (document.querySelector('.hero')) {
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
  }

  // 3. Scroll Reveal Animations
  const fadeElements = document.querySelectorAll('.gsap-fade');
  if (fadeElements.length > 0) {
    fadeElements.forEach((el) => {
      gsap.fromTo(el, 
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        }
      );
    });
  }

  // 4. Navbar scroll effect (Glassmorphism transition)
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(8, 8, 11, 0.9)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        navbar.style.padding = '0';
      } else {
        navbar.style.background = 'rgba(8, 8, 11, 0.6)';
        navbar.style.boxShadow = 'none';
      }
    });
  }

  // 5. Active Navigation Indicator
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  // 6. Smooth Page Transition on Link Click
  document.querySelectorAll('a').forEach(anchor => {
    // Only apply to internal html links, ignore external or empty hashes
    if (anchor.hostname === window.location.hostname && 
        anchor.getAttribute('href') && 
        !anchor.getAttribute('href').startsWith('#') &&
        !anchor.getAttribute('target')) {
      
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetUrl = this.getAttribute('href');
        
        // Fade out body before navigating
        gsap.to('body', {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => {
            window.location.href = targetUrl;
          }
        });
      });
    }
  });
});
