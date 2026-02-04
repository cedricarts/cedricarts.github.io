// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (!nav) {
    return;
  }
  nav.classList.toggle('nav-scrolled', window.scrollY > 100);
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileBackdrop = document.querySelector('[data-mobile-nav-backdrop]');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

const closeMobileNav = () => {
  if (!mobileNav || !mobileBackdrop || !navToggle) {
    return;
  }
  mobileNav.classList.remove('open');
  mobileBackdrop.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
  navToggle.setAttribute('aria-expanded', 'false');
};

const openMobileNav = () => {
  if (!mobileNav || !mobileBackdrop || !navToggle) {
    return;
  }
  mobileNav.classList.add('open');
  mobileBackdrop.classList.add('open');
  mobileNav.setAttribute('aria-hidden', 'false');
  navToggle.setAttribute('aria-expanded', 'true');
};

if (navToggle && mobileNav && mobileBackdrop) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  mobileBackdrop.addEventListener('click', closeMobileNav);
  const closeButton = document.querySelector('.mobile-nav-close');
  if (closeButton) {
    closeButton.addEventListener('click', closeMobileNav);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
}
