// Main application script for HARI PRASATH V portfolio

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');
  const downloadBtn = document.getElementById('btn-download-resume');
  const resumeModal = document.getElementById('resume-modal');
  const modalClose = document.getElementById('modal-close');
  const modalCancel = document.getElementById('modal-cancel-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  // Sticky navbar shadow and scroll spy
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

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

  // Mobile drawer menu toggle
  function closeMobileMenu() {
    navMenu?.classList.remove('active');
    navOverlay?.classList.remove('active');
    document.body.classList.remove('no-scroll');
    const icon = mobileToggle?.querySelector('i');
    if (icon) icon.className = 'fa-solid fa-bars';
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      navOverlay?.classList.toggle('active', isActive);
      document.body.classList.toggle('no-scroll', isActive);

      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = isActive ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    navOverlay?.addEventListener('click', closeMobileMenu);
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Skill category filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Resume Modal & Download Management
  const heroPreviewBtn = document.getElementById('hero-preview-btn');
  const atsModalBtn = document.getElementById('btn-view-ats-modal');
  const allDownloadLinks = document.querySelectorAll('a[download]');

  function openResumeModal() {
    resumeModal?.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeResumeModal() {
    resumeModal?.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  heroPreviewBtn?.addEventListener('click', openResumeModal);
  atsModalBtn?.addEventListener('click', openResumeModal);
  modalClose?.addEventListener('click', closeResumeModal);
  modalCancel?.addEventListener('click', closeResumeModal);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResumeModal();
    });
  }

  // Notify user when a resume download starts
  allDownloadLinks.forEach(link => {
    link.addEventListener('click', () => {
      showToast("Downloading HARI PRASATH V's Official Resume PDF...");
    });
  });

  // Toast notifications
  function showToast(message) {
    if (toast && toastMsg) {
      toastMsg.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }
  }

  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('name');
      const name = nameInput ? nameInput.value.trim() : 'there';
      showToast(`Thank you ${name}! Your message has been sent successfully.`);
      contactForm.reset();
    });
  }
});
