// DOM Elements
const header = document.querySelector('.header');
const mobileMenu = document.getElementById('mobileMenu');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const toast = document.getElementById('toast');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear();

// Handle scroll events
window.addEventListener('scroll', () => {
  // Add/remove scrolled class to header
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Show/hide scroll to top button
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('active');
  } else {
    scrollToTopBtn.classList.remove('active');
  }
  
  // Check for elements to animate on scroll
  animateOnScroll();
});

// Toggle mobile menu
function toggleMobileMenu() {
  mobileMenu.classList.toggle('active');
}

// Scroll to section
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    // Close mobile menu if open
    mobileMenu.classList.remove('active');
    
    // Calculate position with offset for header
    const headerHeight = header.offsetHeight;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
    
    // Scroll to section
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Scroll to top
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Contact form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate form
    if (validateForm()) {
      // Simulate form submission
      const formData = new FormData(contactForm);
      const formObject = {};
      
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
      
      console.log('Form Data:', formObject);
      
      // Show success toast
      showToast('success', 'Message Sent!', 'Thank you for your message. I\'ll get back to you soon.');
      
      // Reset form
      contactForm.reset();
    }
  });
}

// Form validation
function validateForm() {
  let isValid = true;
  
  // Get form fields
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const cc = document.getElementById('cc');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');
  
  // Clear previous error messages
  clearErrors();
  
  // Validate name
  if (name.value.trim() === '' || name.value.trim().length < 2) {
    showError('nameError', 'Name must be at least 2 characters');
    isValid = false;
  }
  
  // Validate email
  if (!isValidEmail(email.value)) {
    showError('emailError', 'Please enter a valid email address');
    isValid = false;
  }
  
  
  // Validate subject
  if (subject.value.trim() === '' || subject.value.trim().length < 2) {
    showError('subjectError', 'Subject must be at least 2 characters');
    isValid = false;
  }
  
  // Validate message
  if (message.value.trim() === '' || message.value.trim().length < 10) {
    showError('messageError', 'Message must be at least 10 characters');
    isValid = false;
  }
  
  return isValid;
}

// Show error message
function showError(id, message) {
  const errorElement = document.getElementById(id);
  errorElement.textContent = message;
  errorElement.classList.add('active');
}

// Clear all error messages
function clearErrors() {
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(element => {
    element.textContent = '';
    element.classList.remove('active');
  });
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show toast notification
function showToast(type, title, message) {
  const toastIcon = document.querySelector('.toast-icon');
  const toastTitle = document.querySelector('.toast-title');
  const toastMessage = document.querySelector('.toast-message');
  
  // Set toast content
  toastIcon.className = 'toast-icon';
  toastIcon.classList.add(type);
  toastIcon.innerHTML = type === 'success' ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>';
  
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  
  // Show toast
  toast.classList.add('active');
  
  // Hide toast after 5 seconds
  setTimeout(() => {
    closeToast();
  }, 5000);
}

// Close toast notification
function closeToast() {
  toast.classList.remove('active');
}

// Animate elements when they come into view
function animateOnScroll() {
  const animateItems = document.querySelectorAll('.animate-item');
  
  animateItems.forEach(item => {
    const itemPosition = item.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (itemPosition < screenPosition) {
      item.classList.add('animate-visible');
    }
  });
}

// Initialize page
window.addEventListener('DOMContentLoaded', () => {
  // Animate items initially visible on page load
  animateOnScroll();
  
  // Add event listeners for any external links
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
});