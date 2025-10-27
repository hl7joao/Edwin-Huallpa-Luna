// script.js — robust boot, safe initializers, fallbacks, and GitHub repos

(function () {
  // Helper to check if a global function exists
  const fn = (name) => (typeof window[name] === "function" ? window[name] : null);

// Replace broken <img> with a single custom fallback image
document.addEventListener(
  "error",
  (e) => {
    const img = e.target;
    if (img && img.tagName === "IMG" && !img.dataset._fallbackApplied) {
      img.dataset._fallbackApplied = "1";

      // Use your single fallback image
      img.src = "./images/1.jpeg";
      img.alt = img.alt || "Fallback image";
      img.style.objectFit = "cover";
      img.style.borderRadius = "8px"; // optional for a clean card look
    }
  },
  true
);

document.addEventListener("DOMContentLoaded", () => {
  // Call your local functions directly (they're defined below in this file)
  initializeSmoothScrolling();
  initializeProjectModals();
  initializeScrollAnimations();
  initMessageForm();
  initGithubRepos();
  initializeSkills(); // Make sure this is here
});

// ---------- Smooth scrolling for navigation links ----------
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-link, .btn-primary");
  if (!navLinks.length) return;

  const header = document.querySelector(".sticky-header");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const isHash = targetId.startsWith("#");
      if (isHash) e.preventDefault();

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetSection.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
        if (isHash) history.pushState(null, null, targetId);
      }
    });
  });
}

// ---------- Project modal functionality ----------
function initializeProjectModals() {
  const projectCards = document.querySelectorAll(".project-card");
  const modal = document.getElementById("project-modal");
  const closeModal = document.querySelector(".close-modal");

  if (!modal || !projectCards.length) return;

  const projects = [
    {
      title: "Cyber Range Lab Deployment & Training Platform",
      description:
        "A full-featured online shopping platform with payment processing and inventory management.",
      longDescription:
        "This e-commerce platform was built with a React frontend and Node.js backend. It features user authentication, product catalog, shopping cart, payment processing with Stripe integration, and an admin dashboard for inventory management. The application is fully responsive and optimized for performance.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
      githubUrl: "https://github.com/hl7joao/Edwin-Huallpa-Luna",
      demoUrl: "https://yourdemo.com/ecommerce-platform",
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team features.",
      longDescription:
        "This task management application allows teams to collaborate on projects in real-time. It features drag-and-drop task organization, user assignments, due dates, notifications, and team channels. Built with Vue.js and Firebase, it offers real-time synchronization across all devices.",
      technologies: ["Vue.js", "Firebase", "CSS", "Vuex"],
      githubUrl: "https://github.com/yourusername/task-manager",
      demoUrl: "https://yourdemo.com/task-manager",
    },
    {
      title: "Dashboard",
      description: "An interactive weather application with forecasting and location-based services.",
      longDescription:
        "The Weather Dashboard provides detailed current weather conditions and 7-day forecasts for any location. It uses the OpenWeatherMap API to fetch data and includes features like location search, temperature unit toggle, and interactive charts showing precipitation, humidity, and wind speed. The UI is built with a clean, minimalist design for optimal user experience.",
      technologies: ["JavaScript", "API Integration", "Chart.js", "HTML/CSS"],
      githubUrl: "https://github.com/yourusername/weather-dashboard",
      demoUrl: "https://yourdemo.com/weather-dashboard",
    },
    {
      title: "Fitness Tracker",
      description: "A mobile-friendly fitness application with workout planning and progress tracking.",
      longDescription:
        "This fitness tracking application helps users plan workouts, track progress, and achieve fitness goals. It includes features like exercise library, custom workout creation, progress charts, and social sharing. The mobile-first design ensures a great experience on all devices, and the PWA capabilities allow for offline usage.",
      technologies: ["React Native", "GraphQL", "MySQL", "Node.js"],
      githubUrl: "https://github.com/yourusername/fitness-tracker",
      demoUrl: "https://yourdemo.com/fitness-tracker",
    },
  ];

  projectCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      const project = projects[index] || projects[0];
      openModal(project);
    });
  });

  if (closeModal) closeModal.addEventListener("click", () => closeModalWindow());

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModalWindow();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) closeModalWindow();
  });

  function openModal(project) {
    const modalBody = document.getElementById("modal-body");
    if (!modalBody) return;

    modalBody.innerHTML = `
      <h2>${project.title}</h2>
      <p class="modal-description">${project.longDescription}</p>
      <div class="modal-technologies">
        <h3>Technologies Used</h3>
        <div class="modal-tags">
          ${project.technologies.map((tech) => `<span class="modal-tag">${tech}</span>`).join("")}
        </div>
      </div>
      <div class="modal-links">
        <a href="${project.githubUrl}" target="_blank" class="btn btn-primary" rel="noopener">View on GitHub</a>
        <a href="${project.demoUrl}" target="_blank" class="btn btn-secondary" rel="noopener">Live Demo</a>
      </div>
    `;
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeModalWindow() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }
}

// ---------- Scroll animations ----------
function initializeScrollAnimations() {
  const sections = document.querySelectorAll(".section");
  if (!sections.length) return;

  sections.forEach((section, index) => {
    if (index === 0) return;
    if (section.id === "about" || section.id === "skills") {
      section.classList.add("hidden-left");
    } else if (section.id === "projects") {
      section.classList.add("hidden-right");
    } else {
      section.classList.add("hidden-section");
    }
  });

  const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setTimeout(() => entry.target.classList.add("visible"), 100);
    });
  }, observerOptions);

  sections.forEach((section) => {
    if (section.id !== "hero") observer.observe(section);
  });

  const experienceItems = document.querySelectorAll(".job-item");
  experienceItems.forEach((item) => {
    item.classList.add("hidden-section");
    observer.observe(item);
  });

  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    card.classList.add("hidden-section");
    observer.observe(card);
  });
}

// ---------- Email Contact Form ----------
function initMessageForm() {
  const messageForm = document.querySelector(".contact-form");
  if (!messageForm) return;

  messageForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const usersName = messageForm.querySelector("#name")?.value.trim();
    const usersEmail = messageForm.querySelector("#email")?.value.trim();
    const usersMessage = messageForm.querySelector("#message")?.value.trim();

    // Validate all fields are filled
    if (!usersName || !usersEmail || !usersMessage) {
      alert("Please fill in all fields before sending.");
      return;
    }

    // Create email content
    const subject = `Portfolio Contact from ${usersName}`;
    const body = `Name: ${usersName}%0D%0AEmail: ${usersEmail}%0D%0A%0D%0AMessage:%0D%0A${usersMessage}`;
    
    // Open user's email client
    const mailtoLink = `mailto:hl7joao@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client in new tab
    window.open(mailtoLink, '_blank');
    
    // Show success message
    alert(`Thank you ${usersName}! Your email client will open with the message pre-filled. Just click send!`);
    
    // Optional: Clear form after submission
    messageForm.reset();
  });
}

// ---------- Dynamic Skills Population ----------
function initializeSkills() {
  const skillsContainer = document.getElementById('skills-container');
  if (!skillsContainer) return;

  const skillsData = [
    {
      category: "Programming & Development",
      skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "HTML/CSS"]
    },
    {
      category: "Tools & Technologies", 
      skills: ["Git", "Docker", "AWS", "MongoDB", "PostgreSQL", "Webpack"]
    },
    {
      category: "Professional Skills",
      skills: ["Agile Methodology", "UI/UX Design", "Project Management", "Technical Writing", "Team Leadership", "Problem Solving"]
    }
  ];

  skillsContainer.innerHTML = '';

  skillsData.forEach(category => {
    const column = document.createElement('div');
    column.className = 'skills-column';

    const categoryTitle = document.createElement('h3');
    categoryTitle.className = 'skills-category';
    categoryTitle.textContent = category.category;

    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'skills-tags';

    category.skills.forEach(skill => {
      const skillTag = document.createElement('span');
      skillTag.className = 'skill-tag';
      skillTag.textContent = skill;
      tagsContainer.appendChild(skillTag);
    });

    column.appendChild(categoryTitle);
    column.appendChild(tagsContainer);
    skillsContainer.appendChild(column);
  });
}

// ---------- GitHub repos - Name Only ----------
function initGithubRepos() {
  const projectSection = document.getElementById("projects");
  if (!projectSection) return;

  const GITHUB_USERNAME = "hl7joao";
  const githubApiUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

  fetch(githubApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((repositories) => {
      console.log("GitHub Repos:", repositories);

      let projectList = document.getElementById("repo-list");
      if (!projectList) {
        projectList = document.createElement("ul");
        projectList.id = "repo-list";
        projectSection.appendChild(projectList);
      }

      projectList.innerHTML = "";

      repositories
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 9) // Show more repos since we're only showing names
        .forEach((repo) => {
          const li = document.createElement("li");
          
          // Repo name with link only
          const link = document.createElement("a");
          link.href = repo.html_url;
          link.target = "_blank";
          link.rel = "noopener";
          link.textContent = repo.name;
          li.appendChild(link);

          projectList.appendChild(li);
        });
    })
    .catch((err) => {
      console.error("Failed to load GitHub repositories:", err);
      let errorMsg = projectSection.querySelector(".repo-error");
      if (!errorMsg) {
        errorMsg = document.createElement("p");
        errorMsg.className = "repo-error";
        projectSection.appendChild(errorMsg);
      }
      errorMsg.textContent = "Sorry, we couldn't load GitHub projects right now.";
    });
}
})();