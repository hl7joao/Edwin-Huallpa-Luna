// script.js

document.addEventListener('DOMContentLoaded', function() {
  initializeSmoothScrolling();
  initializeProjectModals();
  initializeScrollAnimations();
  buildFooter();
  initMessageForm(); // fixed to select your .contact-form
});

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link, .btn-primary');
  const header = document.querySelector('.sticky-header');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const isHash = targetId.startsWith('#');
      if (isHash) e.preventDefault();

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({ top: targetPosition, behavior: 'smooth' });

        if (isHash) history.pushState(null, null, targetId);
      }
    });
  });
}

// Project modal functionality
function initializeProjectModals() {
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');
  const closeModal = document.querySelector('.close-modal');

  const projects = [
    {
      title: "Cyber Range Lab Deployment & Training Platform",
      description: "A full-featured online shopping platform with payment processing and inventory management.",
      longDescription: "This e-commerce platform was built with a React frontend and Node.js backend. It features user authentication, product catalog, shopping cart, payment processing with Stripe integration, and an admin dashboard for inventory management. The application is fully responsive and optimized for performance.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
      githubUrl: "https://github.com/hl7joao/Edwin-Huallpa-Luna",
      demoUrl: "https://yourdemo.com/ecommerce-platform"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team features.",
      longDescription: "This task management application allows teams to collaborate on projects in real-time. It features drag-and-drop task organization, user assignments, due dates, notifications, and team channels. Built with Vue.js and Firebase, it offers real-time synchronization across all devices.",
      technologies: ["Vue.js", "Firebase", "CSS", "Vuex"],
      githubUrl: "https://github.com/yourusername/task-manager",
      demoUrl: "https://yourdemo.com/task-manager"
    },
    {
      title: "Dashboard",
      description: "An interactive weather application with forecasting and location-based services.",
      longDescription: "The Weather Dashboard provides detailed current weather conditions and 7-day forecasts for any location. It uses the OpenWeatherMap API to fetch data and includes features like location search, temperature unit toggle, and interactive charts showing precipitation, humidity, and wind speed. The UI is built with a clean, minimalist design for optimal user experience.",
      technologies: ["JavaScript", "API Integration", "Chart.js", "HTML/CSS"],
      githubUrl: "https://github.com/yourusername/weather-dashboard",
      demoUrl: "https://yourdemo.com/weather-dashboard"
    },
    {
      title: "Fitness Tracker",
      description: "A mobile-friendly fitness application with workout planning and progress tracking.",
      longDescription: "This fitness tracking application helps users plan workouts, track progress, and achieve fitness goals. It includes features like exercise library, custom workout creation, progress charts, and social sharing. The mobile-first design ensures a great experience on all devices, and the PWA capabilities allow for offline usage.",
      technologies: ["React Native", "GraphQL", "MySQL", "Node.js"],
      githubUrl: "https://github.com/yourusername/fitness-tracker",
      demoUrl: "https://yourdemo.com/fitness-tracker"
    }
  ];

  projectCards.forEach((card, index) => {
    card.addEventListener('click', () => openModal(projects[index]));
  });

  closeModal.addEventListener('click', () => closeModalWindow());

  const handleBackdropClick = (e) => { if (e.target === modal) closeModalWindow(); };
  modal.addEventListener('click', handleBackdropClick);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) closeModalWindow();
  });

  function openModal(project) {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
      <h2>${project.title}</h2>
      <p class="modal-description">${project.longDescription}</p>
      <div class="modal-technologies">
        <h3>Technologies Used</h3>
        <div class="modal-tags">
          ${project.technologies.map(tech => `<span class="modal-tag">${tech}</span>`).join('')}
        </div>
      </div>
      <div class="modal-links">
        <a href="${project.githubUrl}" target="_blank" class="btn btn-primary">View on GitHub</a>
        <a href="${project.demoUrl}" target="_blank" class="btn btn-secondary">Live Demo</a>
      </div>
    `;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModalWindow() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Scroll animations
function initializeScrollAnimations() {
  const sections = document.querySelectorAll('.section');

  sections.forEach((section, index) => {
    if (index === 0) return;
    if (section.id === 'about' || section.id === 'skills') {
      section.classList.add('hidden-left');
    } else if (section.id === 'projects') {
      section.classList.add('hidden-right');
    } else {
      section.classList.add('hidden-section');
    }
  });

  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('visible'), 100);
    });
  }, observerOptions);

  sections.forEach(section => { if (section.id !== 'hero') observer.observe(section); });

  const experienceItems = document.querySelectorAll('.job-item');
  experienceItems.forEach(item => {
    item.classList.add('hidden-section');
    observer.observe(item);
  });

  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    card.classList.add('hidden-section');
    observer.observe(card);
  });
}

// Message form behavior (selector aligned to your markup)
function initMessageForm() {
  const messageForm = document.querySelector('.contact-form');
  if (!messageForm) return;

  // Optional: section to show submitted messages if you add one later
  const messageSection = document.getElementById('messages');
  const messageList = messageSection ? messageSection.querySelector('ul') : null;

  const toggleMessagesVisibility = () => {
    if (!messageSection || !messageList) return;
    const hasItems = messageList.children.length > 0;
    messageSection.style.display = hasItems ? '' : 'none';
  };

  toggleMessagesVisibility();

  messageForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const usersName = messageForm.querySelector('#name')?.value.trim();
    const usersEmail = messageForm.querySelector('#email')?.value.trim();
    const usersMessage = messageForm.querySelector('#message')?.value.trim();

    console.log({ usersName, usersEmail, usersMessage });

    if (messageSection && messageList && usersName && usersEmail && usersMessage) {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="mailto:${usersEmail}">${usersName}</a>
        <span> — ${usersMessage}</span>
      `;
      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.textContent = 'remove';
      removeButton.addEventListener('click', function () {
        li.remove();
        toggleMessagesVisibility();
      });
      li.appendChild(removeButton);
      messageList.appendChild(li);
      toggleMessagesVisibility();
    }

    messageForm.reset();
  });
}
/* ---------- Lesson 13: Fetch GitHub Repos ---------- */

// 1) Build the URL and fetch (GET is default)
const GITHUB_USERNAME = "hl7joao";
const githubApiUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// 2) Fetch → .then(response.json()) → .then(repositories => ...) → .catch(...)
fetch(githubApiUrl)
  .then((response) => {
    if (!response.ok) {
      // turn HTTP errors into thrown errors so .catch handles them
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    return response.json(); // returns a Promise of parsed JSON
  })
  .then((repositories) => {
    // 3) Store in a variable named repositories (done) & console.log it
    console.log("GitHub Repos (repositories):", repositories);

    // 4) Display Repositories in List
    // Select the Projects section by id
    const projectSection = document.getElementById("projects");

    // Prefer to select a UL inside the section; if it doesn't exist, create it
    let projectList = projectSection.querySelector("#repo-list");
    if (!projectList) {
      projectList = document.createElement("ul");
      projectList.id = "repo-list";
      projectSection.appendChild(projectList);
    }

    // Clear any previous items
    projectList.innerHTML = "";

    // Loop over the repositories array and build <li> items
    for (let i = 0; i < repositories.length; i++) {
      const repo = repositories[i];

      const li = document.createElement("li");
      // Make the name clickable to the repo
      const link = document.createElement("a");
      link.href = repo.html_url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = repo.name;

      li.appendChild(link);
      projectList.appendChild(li);
    }
  })
  .catch((err) => {
    // 5) Handle errors (and show a friendly message on the page)
    console.error("Failed to load GitHub repositories:", err);

    const projectSection = document.getElementById("projects");
    let errorMsg = projectSection.querySelector(".repo-error");
    if (!errorMsg) {
      errorMsg = document.createElement("p");
      errorMsg.className = "repo-error";
      projectSection.appendChild(errorMsg);
    }
    errorMsg.textContent = "Sorry, we couldn’t load GitHub projects right now.";
  });
