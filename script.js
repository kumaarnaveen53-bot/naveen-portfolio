/**
 * AV Naveen Kumar - Portfolio Interactive Scripts (Poster Theme Edition)
 * Handles:
 * 1. Dark / Light theme toggling with localStorage persistence
 * 2. Dynamic Typewriter effect for professional roles
 * 3. Poster Card Interactive Drawer (Poster View vs Live Code Drawer)
 * 4. Full Poster Lightbox Zoom Modal
 * 5. Skills category filtering
 * 6. Project details modal viewer
 * 7. Copy email to clipboard utility
 * 8. Contact form handling & feedback
 * 9. Active navigation link tracking & mobile hamburger menu
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================
  // 1. NIGHT / LIGHT MODE THEME TOGGLE
  // =========================================================
  const themeToggleBtn = document.getElementById('themeToggle');
  const rootElement = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  function applyTheme(theme) {
    rootElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
      );
      themeToggleBtn.setAttribute(
        'title',
        theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
      );
    }
  }

  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // =========================================================
  // 2. DYNAMIC HERO TYPEWRITER EFFECT
  // =========================================================
  const typewriterElement = document.getElementById('typewriterText');
  const roles = [
    'BE Computer Science Student',
    'Java & Python Developer',
    'Web Developer',
    'Graphic Designer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeRole() {
    if (!typewriterElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(typeRole, typingSpeed);
  }

  typeRole();

  // =========================================================
  // 3. POSTER CARD INTERACTIVE DRAWER (POSTER vs LIVE CODE)
  // =========================================================
  const btnShowPhoto = document.getElementById('btnShowPhoto');
  const btnShowCode = document.getElementById('btnShowCode');
  const posterCodeDrawer = document.getElementById('posterCodeDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');

  if (btnShowCode && posterCodeDrawer) {
    btnShowCode.addEventListener('click', () => {
      posterCodeDrawer.classList.add('active');
      btnShowCode.classList.add('active');
      if (btnShowPhoto) btnShowPhoto.classList.remove('active');
    });
  }

  if (btnShowPhoto && posterCodeDrawer) {
    btnShowPhoto.addEventListener('click', () => {
      posterCodeDrawer.classList.remove('active');
      btnShowPhoto.classList.add('active');
      if (btnShowCode) btnShowCode.classList.remove('active');
    });
  }

  if (closeDrawerBtn && posterCodeDrawer) {
    closeDrawerBtn.addEventListener('click', () => {
      posterCodeDrawer.classList.remove('active');
      if (btnShowPhoto) btnShowPhoto.classList.add('active');
      if (btnShowCode) btnShowCode.classList.remove('active');
    });
  }

  // =========================================================
  // 4. FULL POSTER LIGHTBOX ZOOM MODAL
  // =========================================================
  const posterModal = document.getElementById('posterModal');
  const posterModalBtn = document.getElementById('posterModalBtn');
  const zoomPosterBtn = document.getElementById('zoomPosterBtn');
  const closePosterModalBtn = document.getElementById('closePosterModalBtn');

  function openPosterModal() {
    if (posterModal) {
      posterModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closePosterModal() {
    if (posterModal) {
      posterModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (posterModalBtn) posterModalBtn.addEventListener('click', openPosterModal);
  if (zoomPosterBtn) zoomPosterBtn.addEventListener('click', openPosterModal);
  if (closePosterModalBtn) closePosterModalBtn.addEventListener('click', closePosterModal);

  if (posterModal) {
    posterModal.addEventListener('click', (e) => {
      if (e.target === posterModal) closePosterModal();
    });
  }

  // =========================================================
  // 5. SKILLS FILTER TABS
  // =========================================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =========================================================
  // 6. PROJECT DETAILS MODAL VIEWER
  // =========================================================
  const projectModal = document.getElementById('projectModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalProjectTitle = document.getElementById('modalProjectTitle');
  const modalProjectBody = document.getElementById('modalProjectBody');
  const projectDetailsButtons = document.querySelectorAll('.project-details-btn');

  const projectDetailsData = {
    attendance: {
      title: 'Student Attendance Management System',
      image: 'project_attendance.jpg',
      category: 'Web Application (Academic Project)',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Local Storage'],
      overview: 'A simple web-based system designed to streamline student management and attendance tracking for classroom instructors.',
      features: [
        'Interactive student roster with instant present/absent toggle switches',
        'Real-time attendance rate calculation and metrics overview',
        'Local storage persistence so attendance records are saved between browser sessions',
        'Clean, accessible, and responsive user interface for both desktop and mobile screens'
      ],
      codeSample: `// Sample Attendance Toggle Logic\nfunction toggleAttendance(studentId) {\n  const student = roster.find(s => s.id === studentId);\n  if (student) {\n    student.present = !student.present;\n    saveToLocalStorage();\n    updateSummaryStats();\n    renderRosterTable();\n  }\n}`
    },
    dsa: {
      title: 'Java & Data Structures Programs',
      image: 'project_dsa.jpg',
      category: 'Java & Algorithmic Problem Solving',
      tech: ['Java 17', 'Data Structures', 'OOP', 'Algorithms'],
      overview: 'A comprehensive collection of Java programming and Data Structures programs developed as part of academic learning and coding practice.',
      features: [
        'Linear structures: Dynamic Arrays, Stack (LIFO), Queue (FIFO), Singly & Doubly Linked Lists',
        'Hierarchical structures: Binary Trees, Binary Search Trees (BST), Tree Traversals (Inorder, Preorder, Postorder)',
        'Graph algorithms: Breadth-First Search (BFS) and Depth-First Search (DFS)',
        'Sorting & Searching: QuickSort, MergeSort, Binary Search with time/space complexity analysis'
      ],
      codeSample: `// Sample BST Insertion in Java\npublic Node insert(Node root, int val) {\n    if (root == null) return new Node(val);\n    if (val < root.val) root.left = insert(root.left, val);\n    else if (val > root.val) root.right = insert(root.right, val);\n    return root;\n}`
    },
    portfolio: {
      title: 'Personal Portfolio Website',
      image: 'project_design.jpg',
      category: 'Creative Web Design & Frontend',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Figma', 'Photoshop'],
      overview: 'A responsive personal portfolio showcasing technical skills, academic projects, and creative graphic design work inspired by modern visual branding.',
      features: [
        'Poster-inspired Electric Royal Blue and Dark Space Navy theme',
        'Interactive showcase with full poster lightbox and live Java drawer',
        'Handwritten signature script and 8 authentic skill badges',
        'Responsive layout optimized across desktop, tablet, and mobile devices'
      ],
      codeSample: `// Poster Theme Dynamic Switcher\nfunction applyTheme(theme) {\n  document.documentElement.setAttribute('data-theme', theme);\n  localStorage.setItem('theme', theme);\n}`
    }
  };

  function openProjectModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data || !projectModal) return;

    modalProjectTitle.textContent = data.title;
    modalProjectBody.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <img src="${data.image}" alt="${data.title}" style="width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 1rem;">
        <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-sky); background: rgba(56, 189, 248, 0.1); padding: 0.25rem 0.65rem; border-radius: var(--radius-full); display: inline-block; margin-bottom: 0.75rem;">${data.category}</span>
        <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">${data.overview}</p>
        
        <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.6rem; color: var(--text-primary);">Key Features:</h4>
        <ul style="padding-left: 1.25rem; list-style: disc; margin-bottom: 1.25rem; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">
          ${data.features.map(f => `<li style="margin-bottom: 0.35rem;">${f}</li>`).join('')}
        </ul>

        <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.6rem; color: var(--text-primary);">Tech Stack &amp; Concepts:</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem;">
          ${data.tech.map(t => `<span style="font-size: 0.8rem; font-family: var(--font-mono); background: var(--bg-subtle); border: 1px solid var(--border-color); padding: 0.25rem 0.6rem; border-radius: var(--radius-sm); color: var(--text-secondary);">${t}</span>`).join('')}
        </div>

        <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.6rem; color: var(--text-primary);">Code Architecture Snippet:</h4>
        <pre style="background: #060913; border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 1rem; overflow-x: auto; font-family: var(--font-mono); font-size: 0.82rem; color: #38bdf8; line-height: 1.5;"><code>${escapeHTML(data.codeSample)}</code></pre>
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  projectDetailsButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project-id');
      if (projectId) openProjectModal(projectId);
    });
  });

  if (closeModalBtn && projectModal) {
    closeModalBtn.addEventListener('click', () => {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal && projectModal.classList.contains('active')) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
      }
      if (posterModal && posterModal.classList.contains('active')) {
        closePosterModal();
      }
    }
  });

  // =========================================================
  // 7. COPY EMAIL UTILITY
  // =========================================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyText = document.getElementById('copyText');
  const emailDisplay = document.getElementById('emailDisplay');

  if (copyEmailBtn && emailDisplay) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailDisplay.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        if (copyText) copyText.textContent = 'Copied!';
        copyEmailBtn.style.color = 'var(--accent-sky)';
        copyEmailBtn.style.borderColor = 'var(--accent-sky)';

        setTimeout(() => {
          if (copyText) copyText.textContent = 'Copy';
          copyEmailBtn.style.color = '';
          copyEmailBtn.style.borderColor = '';
        }, 2200);
      }).catch(() => {
        prompt('Copy email:', email);
      });
    });
  }

  // =========================================================
  // 8. CONTACT FORM SUBMISSION
  // =========================================================
  const contactForm = document.getElementById('contactForm');
  const formStatusMsg = document.getElementById('formStatusMsg');
  const contactSubmitBtn = document.getElementById('contactSubmitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = document.getElementById('name').value.trim();
      const emailVal = document.getElementById('email').value.trim();
      const interestVal = document.getElementById('interest').value;
      const messageVal = document.getElementById('message').value.trim();

      if (!nameVal || !emailVal || !interestVal || !messageVal) {
        if (formStatusMsg) {
          formStatusMsg.textContent = 'Please fill out all fields before sending.';
          formStatusMsg.style.color = 'var(--error)';
        }
        return;
      }

      const originalBtnHTML = contactSubmitBtn ? contactSubmitBtn.innerHTML : 'Send Message';

      if (contactSubmitBtn) {
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.innerHTML = `<span>Sending...</span>`;
      }

      setTimeout(() => {
        if (contactSubmitBtn) {
          contactSubmitBtn.innerHTML = `<span>Message Sent Successfully!</span>`;
          contactSubmitBtn.style.background = 'var(--success)';
        }

        if (formStatusMsg) {
          formStatusMsg.textContent = `Thank you, ${nameVal}! Your message regarding "${interestVal}" has been sent. Naveen will get back to you soon.`;
          formStatusMsg.style.color = 'var(--success)';
        }

        contactForm.reset();

        setTimeout(() => {
          if (contactSubmitBtn) {
            contactSubmitBtn.disabled = false;
            contactSubmitBtn.innerHTML = originalBtnHTML;
            contactSubmitBtn.style.background = '';
          }
          if (formStatusMsg) {
            formStatusMsg.textContent = '';
          }
        }, 5000);
      }, 900);
    });
  }

  // =========================================================
  // 9. MOBILE NAVIGATION & ACTIVE SCROLL TRACKING
  // =========================================================
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const primaryNav = document.getElementById('primaryNav');

  if (mobileMenuToggle && primaryNav) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('nav-open');
      mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    const navLinks = primaryNav.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('nav-open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 130;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
});
