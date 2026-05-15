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
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    e.preventDefault();
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
  mobileNav.setAttribute('inert', '');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation');
};

const openMobileNav = () => {
  if (!mobileNav || !mobileBackdrop || !navToggle) return;
  mobileNav.classList.add('open');
  mobileBackdrop.classList.add('open');
  mobileNav.setAttribute('aria-hidden', 'false');
  mobileNav.removeAttribute('inert');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Close navigation');
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

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileNav();
  });
}

// Click-to-play YouTube embeds keep heavy iframe scripts out of the initial page load.
document.querySelectorAll('[data-youtube-id]').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const videoId = button.getAttribute('data-youtube-id');
    if (!videoId) return;

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    iframe.title = button.getAttribute('aria-label')?.replace('Play ', '') || 'YouTube video player';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;

    button.replaceWith(iframe);
  });
});

// Scroll reveal animations
const revealTargets = document.querySelectorAll(
  'section .section-title, section .section-subtitle, .project-card, .skill-category, .cert-card, .video-card, .channel-stats, .contact-links, footer p'
);

revealTargets.forEach((el) => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
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
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

const loadScript = ({ src, async = true, defer = true, crossOrigin, type }) => {
  const script = document.createElement('script');
  script.src = src;
  script.async = async;
  script.defer = defer;
  if (crossOrigin) script.crossOrigin = crossOrigin;
  if (type) script.type = type;
  document.head.appendChild(script);
};

const loadThirdPartyScripts = () => {
  loadScript({
    src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6841184836474681',
    crossOrigin: 'anonymous'
  });
  loadScript({ src: 'https://apis.google.com/js/platform.js' });
  loadScript({ src: 'https://platform.linkedin.com/badges/js/profile.js', type: 'text/javascript' });
};

window.addEventListener('load', () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadThirdPartyScripts, { timeout: 3500 });
  } else {
    window.setTimeout(loadThirdPartyScripts, 1500);
  }
});
