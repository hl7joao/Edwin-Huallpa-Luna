// script.js

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the splash screen
    initializeSplashScreen();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize project modals
    initializeProjectModals();
    
    // Initialize scroll animations
    initializeScrollAnimations();

    // Build footer (from previous assignment)
    buildFooter();

    // Setup message form behavior (this assignment)
    initMessageForm();
});

// Splash screen functionality
function initializeSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    
    // Hide splash screen and show main content after delay
    setTimeout(() => {
        splashScreen.style.opacity = '0';
        splashScreen.style.visibility = 'hidden';
        
        mainContent.classList.remove('hidden');
        
        // Remove splash screen from DOM after transition
        setTimeout(() => {
            splashScreen.remove();
        }, 500);
    }, 6000); // 6 seconds total (5 lines with delays + 1 second buffer)
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .btn-primary');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const isHash = targetId.startsWith('#');
            if (isHash) e.preventDefault();

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.sticky-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                if (isHash) {
                    // Update URL hash without jumping
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}

// Project modal functionality
function initializeProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Project data (in a real scenario, this might come from an API)
    const projects = [
        {
            title: "Cyber Range Lab Deployment & Training Platform",
            description: "A full-featured online shopping platform with payment processing and inventory management.",
            longDescription: "This e-commerce platform was built with a React frontend and Node.js backend. It features user authentication, product catalog, shopping cart, payment processing with Stripe integration, and an admin dashboard for inventory management. The application is fully responsive and optimized for performance.",
            technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
            githubUrl: "https://github.com/yourusername/ecommerce-platform",
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
    
    // Add click event to each project card
    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            openModal(projects[index]);
        });
    });
    
    // Close modal when clicking the X
    closeModal.addEventListener('click', () => {
        closeModalWindow();
    });
    
    // Close modal when clicking outside the content
    const handleBackdropClick = (e) => {
        if (e.target === modal) closeModalWindow();
    };
    modal.addEventListener('click', handleBackdropClick);
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModalWindow();
        }
    });
    
    function openModal(project) {
        const modalBody = document.getElementById('modal-body');
        
        // Populate modal with project details
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
        
        // Show modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    function closeModalWindow() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
}

// Scroll animations with Intersection Observer
function initializeScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    // Set initial state for animations
    sections.forEach((section, index) => {
        if (index === 0) return; // Skip hero section
        
        if (section.id === 'about' || section.id === 'skills') {
            section.classList.add('hidden-left');
        } else if (section.id === 'projects') {
            section.classList.add('hidden-right');
        } else {
            section.classList.add('hidden-section');
        }
    });
    
    // Create Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 100);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        if (section.id !== 'hero') {
            observer.observe(section);
        }
    });
    
    // Observe experience items with staggered animation
    const experienceItems = document.querySelectorAll('.job-item');
    experienceItems.forEach((item) => {
        item.classList.add('hidden-section');
        observer.observe(item);
    });
    
    // Observe project cards with staggered animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        card.classList.add('hidden-section');
        observer.observe(card);
    });
}

// ----- From prior assignment: footer & skills list helpers -----
function buildFooter() {
    let footer = document.querySelector('footer');
    if (!footer) {
        footer = document.createElement('footer');
        document.body.appendChild(footer);
    }

    const today = new Date();
    const thisYear = today.getFullYear();
    footer.innerHTML = `<p>&copy; Edwin Huallpa ${thisYear}</p>`;
}

// ===== New: Message form behavior =====
function initMessageForm() {
    // Select the form by name attribute
    const messageForm = document.querySelector('form[name="leave_message"]');
    if (!messageForm) return;

    // Optional stretch: hide messages section when empty
    const messageSection = document.getElementById('messages');
    const messageList = messageSection ? messageSection.querySelector('ul') : null;

    const toggleMessagesVisibility = () => {
        if (!messageSection || !messageList) return;
        const hasItems = messageList.children.length > 0;
        messageSection.style.display = hasItems ? '' : 'none';
    };

    // Hide initially if empty
    toggleMessagesVisibility();

    messageForm.addEventListener('submit', function (event) {
        // Prevent page refresh
        event.preventDefault();

        // Grab values from the form
        const usersName = event.target.usersName.value.trim();
        const usersEmail = event.target.usersEmail.value.trim();
        const usersMessage = event.target.usersMessage.value.trim();

        // Log values for the assignment step
        console.log({ usersName, usersEmail, usersMessage });

        // Display in the messages list
        if (messageSection && messageList) {
            const newMessage = document.createElement('li');

            newMessage.innerHTML = `
                <a href="mailto:${usersEmail}">${usersName}</a>
                <span> — ${usersMessage}</span>
            `;

            // Remove button
            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.textContent = 'remove';
            removeButton.addEventListener('click', function () {
                const entry = this.parentNode; // li
                entry.remove();
                toggleMessagesVisibility();
            });

            newMessage.appendChild(removeButton);
            messageList.appendChild(newMessage);
            toggleMessagesVisibility();
        }

        // Clear the form
        event.target.reset();
    });
}
