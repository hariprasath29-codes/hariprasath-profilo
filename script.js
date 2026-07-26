/* ==========================================================================
   Hariprasath V - Portfolio Interactive Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar & Scroll Spy
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy active links
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // 2. Mobile Drawer Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-links');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when link clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // 3. Skill Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Resume Download Modal Logic & PDF/TXT Resume Generator
  const downloadBtn = document.getElementById('btn-download-resume');
  const resumeModal = document.getElementById('resume-modal');
  const modalClose = document.getElementById('modal-close');
  const modalCancel = document.getElementById('modal-cancel-btn');
  const modalDownload = document.getElementById('modal-download-btn');

  function openModal() {
    if (resumeModal) resumeModal.classList.add('active');
  }

  function closeModal() {
    if (resumeModal) resumeModal.classList.remove('active');
  }

  if (downloadBtn) downloadBtn.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalCancel) modalCancel.addEventListener('click', closeModal);

  // Close modal clicking outside card
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeModal();
    });
  }

  // Generate Resume Text / Download File
  if (modalDownload) {
    modalDownload.addEventListener('click', () => {
      const resumeContent = `===========================================================
HARIPRASATH V - RESUME
AI & Data Science Undergraduate
===========================================================

Contact Details:
Email: hariprasath.xplorer@gmail.com
Phone: +91 9360766509
Location: Chennai, Tamil Nadu
LinkedIn: https://linkedin.com/in/hariprasath5086

-----------------------------------------------------------
SUMMARY
-----------------------------------------------------------
Motivated Artificial Intelligence & Data Science undergraduate with hands-on experience in data analytics and web development. Proficient in Python, SQL, Excel, and Power BI, with practical exposure to data visualization, dashboard creation, and business insights generation. Strong analytical mindset, problem-solving abilities, and a passion for transforming data into actionable solutions.

-----------------------------------------------------------
EDUCATION
-----------------------------------------------------------
B.Tech in Artificial Intelligence & Data Science
Prathyusha Engineering College (2022 - 2026)
Location: Chennai, Tamil Nadu
CGPA: 7.96 / 10.0

-----------------------------------------------------------
SKILLS
-----------------------------------------------------------
- Programming: Python (Pandas, NumPy, EDA)
- Data Analytics: Power BI, Microsoft Excel, SQL
- Web Technologies: HTML5, CSS3, JavaScript
- Soft Skills: Analytical Thinking, Problem Solving, Communication, Teamwork, Adaptability, Time Management

-----------------------------------------------------------
INTERNSHIP EXPERIENCE
-----------------------------------------------------------
1. Data Science Intern | Unified Mentor Pvt. Ltd. (Jul 2024 – Aug 2024)
   - Cleaned, transformed, and analyzed datasets using Python and SQL.
   - Performed exploratory data analysis (EDA) to identify trends and patterns.
   - Created visual reports and dashboards to communicate insights.
   - Worked with Pandas and NumPy for data processing.
   - Delivered actionable insights from real-world datasets for decision-making.

2. Web Development Intern | TechnoHacks Solutions Pvt. Ltd. (Mar 2025 – Apr 2025)
   - Developed responsive web pages using HTML, CSS, and JavaScript.
   - Implemented user-friendly layouts and website components.
   - Performed testing and debugging to improve website functionality.
   - Delivered functional web interfaces meeting project requirements.

-----------------------------------------------------------
ACHIEVEMENTS
-----------------------------------------------------------
- Completed Data Science Internship at Unified Mentor Pvt. Ltd.
- Completed Web Development Internship at TechnoHacks Solutions Pvt. Ltd.
- Continuously upskilling in Data Analytics, Business Intelligence, and AI technologies.
===========================================================`;

      const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Hariprasath_V_Resume.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      closeModal();
      showToast('Resume downloaded successfully!');
    });
  }

  // 5. Contact Form Submission & Toast Notification
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  function showToast(message) {
    if (toast && toastMsg) {
      toastMsg.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;

      showToast(`Thank you ${name}! Your message has been sent successfully.`);
      contactForm.reset();
    });
  }
});
