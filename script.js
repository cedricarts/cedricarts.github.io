function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

function toggleResume() {
  const resume = document.getElementById("resumePreview");
  resume.style.display = resume.style.display === "none" ? "block" : "none";
}

function searchProjects() {
  let input = document.getElementById("searchBar").value.toLowerCase();
  let items = document.getElementById("projectList").getElementsByTagName("li");

  for (let i = 0; i < items.length; i++) {
    let text = items[i].textContent.toLowerCase();
    items[i].style.display = text.includes(input) ? "" : "none";
  }
}

function toggleMode() {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
}

// Navigation control for one-section-at-a-time view
document.querySelectorAll(".sidebar a[href^='#']").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    document.querySelectorAll(".section").forEach(section => {
      section.classList.remove("visible");
    });
    const target = document.getElementById(targetId);
    if (target) target.classList.add("visible");

    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  });
});
