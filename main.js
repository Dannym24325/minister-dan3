// ===== SMOOTH SCROLL & ACTIVE LINK =====
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ===== MOBILE MENU =====
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menuBtn) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('show'));
}

// Close menu when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('show'));
});

// ===== BOOKING MODAL =====
const bookingBtns = document.querySelectorAll('#bookingBtn, #bookingBtn2, #eventBookBtn');
const bookingModal = document.getElementById('bookingModal');
const closeBooking = document.getElementById('closeBooking');

bookingBtns.forEach(btn => {
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      bookingModal.classList.add('active');
    });
  }
});

if (closeBooking) {
  closeBooking.addEventListener('click', () => {
    bookingModal.classList.remove('active');
  });
}

if (bookingModal) {
  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      bookingModal.classList.remove('active');
    }
  });
  
  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      bookingModal.classList.remove('active');
    }
  });
}

// ===== BOOKING FORM AJAX =====
const bookingForm = document.getElementById('bookingForm');
const bookingSuccess = document.getElementById('bookingSuccess');

if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    fetch(bookingForm.action, {
      method: 'POST',
      body: new FormData(bookingForm),
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        bookingSuccess.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! We\'ll contact you soon.';
        bookingForm.reset();
        setTimeout(() => {
          bookingModal.classList.remove('active');
          bookingSuccess.innerHTML = '';
        }, 3000);
      } else {
        bookingSuccess.textContent = 'Error! Please try again.';
      }
    })
    .catch(err => {
      bookingSuccess.textContent = 'Error! Please try again.';
    });
  });
}

// ===== MAILING LIST =====
const mailingForm = document.getElementById('mailingForm');
const mailingSuccess = document.getElementById('mailingSuccess');

if (mailingForm) {
  mailingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    mailingSuccess.innerHTML = '<i class="fas fa-check"></i> Welcome! Check your email.';
    mailingForm.reset();
    setTimeout(() => {
      mailingSuccess.innerHTML = '';
    }, 4000);
  });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slideInUp 0.8s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.music-card, .event-card, .blog-card').forEach(el => {
  observer.observe(el);
});