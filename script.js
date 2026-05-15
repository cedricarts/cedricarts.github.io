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
  'space-dash': {
    kicker: 'Shipped mobile game',
    title: 'Space Dash',
    description: 'A compact arcade game built and shipped to Google Play. The project demonstrates production follow-through: gameplay, store assets, publishing, and iteration after release.',
    points: ['Built with Unity and C# for mobile play.', 'Focused on quick-session arcade pacing.', 'Published publicly through Google Play Console.']
  },
  openplate: {
    kicker: 'Product research',
    title: 'OpenPlate',
    description: 'A practical food-product experiment: part research board, part content pipeline, part workflow prototype for testing recipes and usefulness.',
    points: ['Organizes ideas into repeatable experiments.', 'Prioritizes utility and clear documentation.', 'Designed as a small product system that can grow through use.']
  },
  'death-tag': {
    kicker: 'Game prototype',
    title: 'Death Tag',
    description: 'A mobile game concept inspired by laser tag. The artifact explores player feedback, fast rounds, and multiplayer-feeling interaction patterns.',
    points: ['Unity and C# gameplay implementation.', 'Prototype focus on feedback loops and round structure.', 'Built around a clear, easy-to-understand game premise.']
  },
  mytelkom: {
    kicker: 'Hackathon artifact',
    title: 'MyTelkom App Enhancement',
    description: 'A Telkom 10X Hackathon build produced under time pressure, including a Unity-to-React pivot and experiments with speech interfaces.',
    points: ['React interface built during a rapid sprint.', 'Explored text-to-speech and speech-to-text service flows.', 'Team delivery under hackathon constraints.']
  },
  'client-web': {
    kicker: 'Client interfaces',
    title: 'Web build practice',
    description: 'A set of practical web builds focused on clean presentation, responsive structure, and direct communication for clients and collaborators.',
    points: ['Semantic HTML, CSS, and JavaScript implementation.', 'Responsive layouts tuned for mobile first.', 'Delivery mindset: clear pages, accessible links, and maintainable structure.']
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
