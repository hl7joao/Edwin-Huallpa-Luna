// js/index.js
document.addEventListener("DOMContentLoaded", () => {
  // Create or select footer, then inject current year
  let footer = document.querySelector("footer");
  if (!footer) {
    footer = document.createElement("footer");
    document.body.appendChild(footer);
  }

  const today = new Date();
  const thisYear = today.getFullYear();

  const copyright = document.createElement("p");
  // Stretch: include © via entity
  copyright.innerHTML = `&copy; Edwin Huallpa ${thisYear}`;
  footer.appendChild(copyright);

  // Populate the Skills <ul>
  const skills = [
    "JavaScript",
    "HTML",
    "CSS",
    "Git & GitHub",
    "Python",
    "React",
    "SQL"
  ];

  const skillsSection = document.querySelector("#skills");
  if (!skillsSection) return;

  const skillsList = skillsSection.querySelector("#skills-list");
  if (!skillsList) return;

  // Clear in case of hot reload
  skillsList.innerHTML = "";

  for (let i = 0; i < skills.length; i++) {
    const li = document.createElement("li");
    li.textContent = skills[i];
    skillsList.appendChild(li);
  }
});
