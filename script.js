const THEME_STORAGE_KEY = 'cedric-theme';
const themeToggles = document.querySelectorAll('[data-theme-toggle]');

const getInitialTheme = () => {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const applyTheme = (theme) => {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  themeToggles.forEach((toggle) => {
    toggle.textContent = theme === 'dark' ? 'Dark' : 'Light';
  });

  document.querySelectorAll('.g-ytsubscribe').forEach((widget) => {
    widget.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'default');
  });
};

applyTheme(getInitialTheme());

themeToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const nextTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    const offsetTop = target.offsetTop - 72;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  });
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileBackdrop = document.querySelector('[data-mobile-nav-backdrop]');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

const closeMobileNav = () => {
  if (!mobileNav || !mobileBackdrop || !navToggle) return;
  mobileNav.classList.remove('open');
  mobileBackdrop.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
  navToggle.setAttribute('aria-expanded', 'false');
};

const openMobileNav = () => {
  if (!mobileNav || !mobileBackdrop || !navToggle) return;
  mobileNav.classList.add('open');
  mobileBackdrop.classList.add('open');
  mobileNav.setAttribute('aria-hidden', 'false');
  navToggle.setAttribute('aria-expanded', 'true');
};

if (navToggle && mobileNav && mobileBackdrop) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    isOpen ? closeMobileNav() : openMobileNav();
  });

  mobileBackdrop.addEventListener('click', closeMobileNav);

  const closeButton = document.querySelector('.mobile-nav-close');
  if (closeButton) closeButton.addEventListener('click', closeMobileNav);

  mobileNavLinks.forEach((link) => link.addEventListener('click', closeMobileNav));
}


// Scroll reveal animations
const revealTargets = document.querySelectorAll(
  '.hero-copy, .hero-panel, .metrics-strip, .section-heading, .project-card, .experiment-card, .case-study-card, .ecosystem-card, .video-card, .channel-stats, .build-log-card, .about-grid, .skill-category, .cert-card, .contact-card, footer p'
);

revealTargets.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: '0px 0px -40px 0px' }
);

revealTargets.forEach((el) => revealObserver.observe(el));
