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
      .from('.animated-skills-wrapper', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
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

  // ── Back to Top Button ────────────────────────────────────
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// ── Interactive Demo Modal ──────────────────────────────────────
window.openDemo = function(type, url, title, fallbackUrl) {
  const overlay = document.createElement('div');
  overlay.className = 'demo-modal-overlay';
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  const modal = document.createElement('div');
  modal.className = 'demo-modal';

  const header = document.createElement('div');
  header.className = 'demo-modal-header';
  header.innerHTML = `<h3>${title}</h3><button class="demo-close" onclick="this.closest('.demo-modal-overlay').remove()">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  </button>`;

  const body = document.createElement('div');
  body.className = 'demo-modal-body';

  if (url && url !== '' && url !== '#') {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.className = 'demo-iframe';
    iframe.setAttribute('allowfullscreen', '');
    body.appendChild(iframe);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'demo-placeholder';
    placeholder.innerHTML = `
      <div class="demo-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="M12 17v5"/><path d="M8 22h8"/></svg>
      </div>
      <h4 style="font-size:1.5rem;margin-bottom:1rem;color:#fff;">Run This Project Locally</h4>
      <p style="margin-bottom:0.75rem;max-width:450px;margin-left:auto;margin-right:auto;color:#8892b0;">This is a Python application that runs locally. Clone the repository and follow the setup instructions to launch it.</p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:1.5rem;">
        <a href="${fallbackUrl}" target="_blank" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.75rem 1.5rem;background:#f0f4ff;color:#07070a;border-radius:10px;font-weight:700;text-decoration:none;">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          View Source Code
        </a>
      </div>
    `;
    body.appendChild(placeholder);
  }

  modal.appendChild(header);
  modal.appendChild(body);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  gsap.fromTo(overlay, {opacity: 0}, {opacity: 1, duration: 0.3});
  gsap.fromTo(modal, {scale: 0.8, y: 20}, {scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)'});
};

// ── Typewriter Effect for Hero ────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const words = [
    "Data Analyst",
    "Aspiring Data Scientist",
    "Python Developer",
    "Data Visualizer"
  ];
  let i = 0;
  let timer;
  const el = document.getElementById('typewriter');

  if (el) {
    function typingEffect() {
      let word = words[i].split('');
      var loopTyping = function() {
        if (word.length > 0) {
          el.innerHTML += word.shift();
        } else {
          setTimeout(deletingEffect, 2200);
          return false;
        }
        timer = setTimeout(loopTyping, 90);
      };
      loopTyping();
    }

    function deletingEffect() {
      let word = words[i].split('');
      var loopDeleting = function() {
        if (word.length > 0) {
          word.pop();
          el.innerHTML = word.join('');
        } else {
          i = (i + 1) % words.length;
          setTimeout(typingEffect, 400);
          return false;
        }
        timer = setTimeout(loopDeleting, 45);
      };
      loopDeleting();
    }
    typingEffect();
  }
});

// ── GitHub Repositories Fetcher ──────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('github-repos-container');
  if (!container) return;

  const username = 'Huzaifaziadevsil';
  fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`)
    .then(response => response.json())
    .then(repos => {
      container.innerHTML = '';
      
      const filteredRepos = repos.filter(repo => !repo.fork && repo.name !== 'myportfolio');

      if (filteredRepos.length === 0) {
        container.innerHTML = '<p style="text-align: center; width: 100%; color: #8892b0;">No repositories found.</p>';
        return;
      }

      filteredRepos.forEach((repo, index) => {
        const card = document.createElement('div');
        card.className = 'proj-card gsap-reveal';
        // Initialize GSAP styles manually since elements are injected late
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';

        const description = repo.description || 'No description available for this repository.';
        const repoName = repo.name.replace(/-/g, ' ');
        
        card.innerHTML = `
          <div class="proj-body" style="padding: 2rem; display: flex; flex-direction: column; height: 100%;">
            <div class="proj-tags" style="margin-bottom: 1rem;">
              ${repo.language ? \`<span class="proj-tag">\${repo.language}</span>\` : ''}
              <span class="proj-tag">★ \${repo.stargazers_count}</span>
            </div>
            <h3 class="proj-title" style="margin-bottom: 1rem; font-size: 1.25rem; text-transform: capitalize;">\${repoName}</h3>
            <p class="proj-desc" style="flex-grow: 1;">\${description}</p>
            <div class="proj-footer" style="margin-top: 1.5rem;">
              <a href="\${repo.html_url}" target="_blank" class="btn-github" style="width: 100%; justify-content: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                View Repository
              </a>
            </div>
          </div>
        `;
        container.appendChild(card);
      });

      // Re-trigger GSAP for the dynamically loaded elements
      if (typeof gsap !== 'undefined') {
        document.querySelectorAll('#github-repos-container .gsap-reveal').forEach((el, i) => {
          gsap.to(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%'
            },
            y: 0, 
            opacity: 1, 
            duration: 0.7, 
            ease: 'power2.out',
            delay: (i % 3) * 0.15 // stagger effect per row
          });
        });
      }
    })
    .catch(error => {
      console.error('Error fetching GitHub repos:', error);
      container.innerHTML = '<p style="text-align: center; width: 100%; color: #ef4444;">Failed to load repositories. Please try again later.</p>';
    });
});
