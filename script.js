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
};

applyTheme(getInitialTheme());

themeToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const nextTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
});

const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileBackdrop = document.querySelector('[data-mobile-nav-backdrop]');
const closeButton = document.querySelector('.mobile-nav-close');
const mobileLinks = document.querySelectorAll('.mobile-nav a');

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
    mobileNav.classList.contains('open') ? closeMobileNav() : openMobileNav();
  });

  mobileBackdrop.addEventListener('click', closeMobileNav);
  closeButton?.addEventListener('click', closeMobileNav);
  mobileLinks.forEach((link) => link.addEventListener('click', closeMobileNav));
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const cursorGlow = document.querySelector('[data-cursor-glow]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (cursorGlow && !reducedMotion.matches) {
  window.addEventListener('pointermove', (event) => {
    document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
  }, { passive: true });
}

const revealTargets = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -50px 0px' });

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}

const projectDetails = {
  studx: {
    kicker: 'Live / early growth · Student marketplace',
    title: 'StudX',
    description: 'A student marketplace focused initially on TVET students, built around seller and buyer flows, listings, campus services, mobile use, StudX Eats, vendor functionality, and marketplace infrastructure.',
    points: ['Built with React, Vite, Firebase, and Yoco payment integration.', 'Exact user counts stay in metrics.json and are not hardcoded into the page.', 'Positioned as a real product while leaving room for feedback and iteration.']
  },
  forgehub: {
    kicker: 'Concept / validation · Developer community',
    title: 'ForgeHub',
    description: 'A developer-focused social and collaboration platform built around community, collaboration, projects, events, and awareness within the South African development ecosystem.',
    points: ['Designed with South African developers in mind while welcoming developers from elsewhere.', 'Potential features include profiles, collaboration, events, game jams, community, projects, and services.', 'Currently presented as concept and validation work, not as a launched platform.']
  },
  likhaia: {
    kicker: 'Concept / development · Consumer lifestyle technology',
    title: 'LIKHAIA',
    description: 'A consumer lifestyle venture creating thoughtfully designed technology, furniture, and everyday products for smarter, more sustainable living.',
    points: ['Future concepts may include a smart desk lamp, smart living-room table, and shoe washer.', 'The portfolio does not claim these concepts are commercially available.', 'The card uses a small geometric mark inspired by the LIKHAIA identity.']
  },
  vaia: {
    kicker: 'Concept / validation · Smart mobility',
    title: 'Vaia',
    description: 'A smart mobility venture concept exploring how local movement, access, routes, and digital coordination could work together.',
    points: ['Presented as validation work rather than an operational service.', 'Part of the Horizon Synergy venture set.', 'Focused on mobility systems and product discovery.']
  },
  'space-dash': {
    kicker: 'Published mobile game',
    title: 'Space Dash',
    description: 'A compact arcade game built and shipped to Google Play. The project demonstrates production follow-through: gameplay, store assets, publishing, and iteration after release.',
    points: ['Built with Unity and C# for mobile play.', 'Focused on quick-session arcade pacing.', 'Published publicly through Google Play Console.']
  },
  'death-tag': {
    kicker: 'Game prototype',
    title: 'Death Tag',
    description: 'A mobile game concept inspired by laser tag. The artifact explores player feedback, fast rounds, and multiplayer-feeling interaction patterns.',
    points: ['Unity and C# gameplay implementation.', 'Prototype focus on feedback loops and round structure.', 'Built around a clear, easy-to-understand game premise.']
  }
};

const modal = document.querySelector('[data-project-modal]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalKicker = document.querySelector('[data-modal-kicker]');
const modalDescription = document.querySelector('[data-modal-description]');
const modalList = document.querySelector('[data-modal-list]');
const modalClose = document.querySelector('[data-modal-close]');
let lastFocusedElement;

const closeModal = () => {
  if (!modal?.open) return;
  modal.close();
  document.body.classList.remove('modal-open');
  lastFocusedElement?.focus();
};

const openModal = (projectKey) => {
  const detail = projectDetails[projectKey];
  if (!modal || !detail) return;

  lastFocusedElement = document.activeElement;
  modalKicker.textContent = detail.kicker;
  modalTitle.textContent = detail.title;
  modalDescription.textContent = detail.description;
  modalList.replaceChildren(...detail.points.map((point) => {
    const item = document.createElement('li');
    item.textContent = point;
    return item;
  }));

  modal.showModal();
  document.body.classList.add('modal-open');
};

document.querySelectorAll('[data-modal-target]').forEach((button) => {
  button.addEventListener('click', () => openModal(button.dataset.modalTarget));
});

modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
modal?.addEventListener('cancel', () => {
  document.body.classList.remove('modal-open');
});

const metricsGrid = document.querySelector('[data-metrics-grid]');
const metricsStatus = document.querySelector('[data-metrics-status]');

const metricDefinitions = [
  { section: 'curated', key: 'productsBuilt', label: 'Products and ventures', suffix: '+' },
  { section: 'curated', key: 'publishedApps', label: 'Published apps', suffix: '+' },
  { section: 'dynamic', key: 'studxUsers', label: 'StudX users', suffix: '+' },
  { section: 'dynamic', key: 'youtubeSubscribers', label: 'YouTube community', suffix: '+' },
  { section: 'dynamic', key: 'githubPublicRepositories', label: 'Public repositories', suffix: '' }
];

const isDisplayableMetric = (value) => Number.isFinite(Number(value)) && Number(value) > 0;

const formatMetricValue = (value, suffix = '') => {
  const number = Number(value);
  const formatted = number >= 1000 ? Intl.NumberFormat('en', { notation: 'compact' }).format(number) : String(number).padStart(number < 10 ? 2 : 1, '0');
  return `${formatted}${suffix}`;
};

const formatMetricsDate = (dateValue) => {
  if (!dateValue) return 'Updated recently';
  const date = new Date(`${dateValue}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return 'Updated recently';
  const ageDays = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (ageDays <= 7) return 'Updated recently';
  return `Updated ${dateValue}`;
};

const renderMetrics = (metrics) => {
  if (!metricsGrid) return;
  const cards = metricDefinitions
    .map((definition) => ({ ...definition, value: metrics?.[definition.section]?.[definition.key] }))
    .filter((metric) => isDisplayableMetric(metric.value))
    .slice(0, 5);

  metricsGrid.replaceChildren(...cards.map((metric) => {
    const card = document.createElement('div');
    const value = document.createElement('strong');
    const label = document.createElement('span');
    value.textContent = formatMetricValue(metric.value, metric.suffix);
    label.textContent = metric.label;
    card.append(value, label);
    return card;
  }));

  if (metricsStatus) metricsStatus.textContent = cards.length ? formatMetricsDate(metrics.lastUpdated) : 'Portfolio signals loading quietly';
};

const loadMetrics = async () => {
  if (!metricsGrid) return;
  try {
    const response = await fetch(`data/metrics.json?v=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Metrics unavailable');
    renderMetrics(await response.json());
  } catch {
    renderMetrics({ curated: {}, dynamic: {}, lastUpdated: null });
    if (metricsStatus) metricsStatus.textContent = 'Portfolio signals unavailable';
  }
};

loadMetrics();
