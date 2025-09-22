const footerPart = document.getElementById("footer-part");
const footerParagraph = document.getElementById("footer-p");
const svgWave = document.querySelector(".wave-background svg");
const liBox = document.querySelector(".language-list li");
const proSlider = document.getElementById('pro-slider');

proSlider.value = 2;

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  footerPart.classList.toggle('light-mode');
  footerParagraph.classList.toggle('light-mode');
  svgWave.classList.toggle('light-mode');
  liBox.classList.toggle('light-mode');

    // Optional: persist choice
  if (document.body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

function showSection(id) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(section => {
    section.style.display = "none";
    section.classList.remove("fade-in");
  });

  const active = document.getElementById(id);
  if (active) {
    active.style.display = "block";
    setTimeout(() => {
      active.classList.add("fade-in");
    }, 10);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showSection("about");

  document.querySelectorAll("nav a[href^='#']").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const id = this.getAttribute("href").substring(1);
      showSection(id);
      document.getElementById('sidebar').classList.remove('show');
    });
  });
});

function toggleMobileMenu() {
  const nav = document.getElementById('sidebar');
  nav.classList.toggle('show');
}

document.addEventListener('click', (event) => {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.querySelector('.mobile-menu-toggle');

  if (
    sidebar.classList.contains('show') &&
    !sidebar.contains(event.target) &&
    !toggle.contains(event.target)
  ) {
    sidebar.classList.remove('show');
  }
});


// Load saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }
});
