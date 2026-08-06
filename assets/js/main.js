document.addEventListener('DOMContentLoaded', () => {
  // ── GSAP setup ───────────────────────────────────────────
  gsap.registerPlugin(ScrollTrigger);

  // ── Page fade-in ─────────────────────────────────────────
  gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });

  // ── Navbar scroll class ───────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ── Active nav link (matches current page filename) ───────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Smooth page transitions on internal links ─────────────
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const isInternal = !href.startsWith('http') && !href.startsWith('#')
      && !href.startsWith('mailto') && !href.startsWith('tel')
      && !href.startsWith('wa.') && !href.endsWith('.pdf')
      && !a.hasAttribute('target');
    if (isInternal) {
      a.addEventListener('click', e => {
        e.preventDefault();
        const dest = href;
        gsap.to('body', {
          opacity: 0, duration: 0.35, ease: 'power2.inOut',
          onComplete: () => { window.location.href = dest; }
        });
      });
    }
  });

  // ── Mobile hamburger toggle ───────────────────────────────
  const toggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    // Close on link click
    mobileNav.querySelectorAll('.nav-link').forEach(l => {
      l.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  // ── Hero animations (only on home) ───────────────────────
  if (document.querySelector('.hero')) {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from('.hero-label', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' })
      .from('.hero h1', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .from('.hero-role', { y: 25, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from('.hero-desc', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from('.hero-actions', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from('.profile-ring', { scale: 0.85, opacity: 0, duration: 1, ease: 'back.out(1.4)' }, '-=0.6')
      .from('.float-badge', { opacity: 0, y: 20, stagger: 0.15, duration: 0.6, ease: 'power2.out' }, '-=0.5');
  }

  // ── Scroll reveal for .gsap-reveal elements ──────────────
  document.querySelectorAll('.gsap-reveal').forEach(el => {
    gsap.fromTo(el,
      { y: 40, opacity: 0 },
      {
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        y: 0, opacity: 1, duration: 0.75, ease: 'power2.out'
      }
    );
  });

  // ── Stagger for .gsap-stagger children ───────────────────
  document.querySelectorAll('.gsap-stagger').forEach(container => {
    const children = container.children;
    gsap.fromTo(children,
      { y: 35, opacity: 0 },
      {
        scrollTrigger: { trigger: container, start: 'top 85%', toggleActions: 'play none none none' },
        y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.1
      }
    );
  });
});
