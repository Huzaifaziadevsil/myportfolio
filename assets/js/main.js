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

// ── Interactive Demo Modal ──────────────────────────────────────
window.openDemo = function(type, url, title, fallbackUrl) {
  const overlay = document.createElement('div');
  overlay.className = 'demo-modal-overlay';
  
  const modal = document.createElement('div');
  modal.className = 'demo-modal';
  
  const header = document.createElement('div');
  header.className = 'demo-modal-header';
  header.innerHTML = `<h3>${title}</h3><button class="demo-close" onclick="this.closest('.demo-modal-overlay').remove()"><i data-lucide="x"></i></button>`;
  
  const body = document.createElement('div');
  body.className = 'demo-modal-body';
  
  if (url) {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.className = 'demo-iframe';
    body.appendChild(iframe);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'demo-placeholder';
    placeholder.innerHTML = `
      <div class="demo-icon"><i data-lucide="monitor-play" style="width:48px;height:48px;"></i></div>
      <h4 style="font-size:1.5rem;margin-bottom:1rem;color:#fff;">Interactive Demo Not Available</h4>
      <p style="margin-bottom:2rem;max-width:400px;margin-left:auto;margin-right:auto;">This project requires a backend environment or local execution and cannot be embedded directly in the browser.</p>
      <a href="${fallbackUrl}" target="_blank" class="btn btn-primary"><i data-lucide="github"></i> View Source Code</a>
    `;
    body.appendChild(placeholder);
  }
  
  modal.appendChild(header);
  modal.appendChild(body);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  
  lucide.createIcons();
  
  gsap.fromTo(overlay, {opacity: 0}, {opacity: 1, duration: 0.3});
  gsap.fromTo(modal, {scale: 0.8, y: 20}, {scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)'});
};
