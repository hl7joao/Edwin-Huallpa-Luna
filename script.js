// script.js — robust boot, safe initializers, fallbacks, and GitHub repos

(function () {
  // Helper to check if a global function exists
  // (unused fn helper removed)

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
  initializeSkills();
  initializePillToggle();
  initializeNavCarousel();

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
        "A full-featured cyber range platform for deploying and managing security training environments.",
      longDescription:
        "This cyber range platform allows deploying and managing security training environments on demand. Built with React and Node.js, it features automated lab provisioning, realistic attack scenarios, progress tracking, and instructor dashboards for managing student cohorts and exercises.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Terraform"],
      githubUrl: "https://github.com/hl7joao/Edwin-Huallpa-Luna",
      demoUrl: "https://yourdemo.com/cyber-range",
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
    
    // Open email client
    window.location.href = mailtoLink;
    
    alert(`Thanks ${usersName}! Your email client should open with the message pre-filled.`);
    
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

      const exclude = ["Edwin-Huallpa-Luna", "edwin-open-api", "intro-to-programming-debugging"];
      repositories
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .filter((repo) => !exclude.includes(repo.name))
        .slice(0, 9)
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

// ---------- Pill Toggle (scroll reveal on mobile / hover+click on desktop) ----------
function initializePillToggle() {
  const pills = document.querySelectorAll('.about-pill');
  if (!pills.length) return;

  const isMobile = window.matchMedia('(max-width: 900px)');
  let observer = null;
  let clickHandlers = new Map(); // Store handlers for cleanup

  function cleanupPills() {
    // Remove all expanded classes
    pills.forEach(pill => {
      pill.classList.remove('expanded');
      pill.removeAttribute('aria-expanded');
      pill.removeAttribute('tabindex');
      pill.removeAttribute('role');

      // Remove old event listeners
      const handlers = clickHandlers.get(pill);
      if (handlers) {
        pill.removeEventListener('click', handlers.click);
        pill.removeEventListener('keydown', handlers.keydown);
      }
    });
    clickHandlers.clear();

    // Disconnect observer if it exists
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  function setupPillBehavior() {
    cleanupPills();

    if (isMobile.matches) {
      // Mobile: Auto-expand on scroll with stagger
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Coming into view - expand with stagger
            if (!entry.target.classList.contains('expanded')) {
              const pillIndex = Array.from(pills).indexOf(entry.target);
              setTimeout(() => {
                entry.target.classList.add('expanded');
                entry.target.setAttribute('aria-expanded', 'true');
              }, pillIndex * 180); // 180ms - smooth cascade that matches scroll pace
            }
          } else {
            // Leaving view - collapse immediately
            entry.target.classList.remove('expanded');
            entry.target.setAttribute('aria-expanded', 'false');
          }
        });
      }, observerOptions);

      pills.forEach(pill => {
        observer.observe(pill);
      });
    } else {
      // Desktop: Click to toggle (hover handled by CSS)
      pills.forEach(pill => {
        // Make pills keyboard accessible
        pill.setAttribute('tabindex', '0');
        pill.setAttribute('role', 'button');
        pill.setAttribute('aria-expanded', 'false');

        const clickHandler = function() {
          this.classList.toggle('expanded');
          this.setAttribute('aria-expanded', this.classList.contains('expanded'));
        };

        const keydownHandler = function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.classList.toggle('expanded');
            this.setAttribute('aria-expanded', this.classList.contains('expanded'));
          }
        };

        pill.addEventListener('click', clickHandler);
        pill.addEventListener('keydown', keydownHandler);

        // Store handlers for cleanup
        clickHandlers.set(pill, { click: clickHandler, keydown: keydownHandler });
      });
    }
  }

  // Initial setup
  setupPillBehavior();

  // Re-setup on resize (if switching between mobile/desktop)
  isMobile.addEventListener('change', setupPillBehavior);
}

// ---------- Mobile Navigation Carousel ----------
function initializeNavCarousel() {
  const navItems = document.querySelectorAll('.nav-list li');
  const navDots = document.querySelectorAll('.nav-dot');
  const navList = document.querySelector('.nav-list');

  if (!navItems.length) return;

  let currentIndex = 0;

  function updateCarousel() {
    // Remove active class from all items
    navItems.forEach(item => item.classList.remove('active'));
    navDots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current item
    navItems[currentIndex].classList.add('active');
    if (navDots[currentIndex]) {
      navDots[currentIndex].classList.add('active');
    }
  }

  function goToNext() {
    if (currentIndex < navItems.length - 1) {
      currentIndex++;
      updateCarousel();
      scrollToSection();
    }
  }

  function goToPrevious() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
      scrollToSection();
    }
  }

  function scrollToSection() {
    const activeLink = navItems[currentIndex].querySelector('.nav-link');
    const targetId = activeLink.getAttribute('href');

    if (targetId && targetId.startsWith('#')) {
      const targetSection = document.querySelector(targetId);
      const header = document.querySelector('.sticky-header');

      if (targetSection) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetSection.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    }
  }

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;

  if (navList) {
    navList.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    navList.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 40;
    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);

    // Only trigger if horizontal swipe is dominant
    if (Math.abs(diffX) > swipeThreshold && diffY < Math.abs(diffX)) {
      if (diffX > 0) {
        // Swiped left - go to next
        goToNext();
      } else {
        // Swiped right - go to previous
        goToPrevious();
      }
    }
  }

  // Dot click handlers
  navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
      scrollToSection();
    });
  });

  // Initialize
  updateCarousel();
}
})();
