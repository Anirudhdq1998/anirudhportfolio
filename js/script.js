document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navList.classList.toggle("active");

    // Toggle body scroll when menu is open
    if (navList.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  // Close menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navList.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Change header background on scroll
});
// Add this to your existing JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const fullName = "Anirudh"; // REPLACE WITH YOUR NAME
  const typingElement = document.querySelector(".typing-animation");
  const cursorElement = document.createElement("span");
  cursorElement.className = "cursor";
  typingElement.appendChild(cursorElement);

  // Count only letters (ignore spaces, punctuation)
  function countLetters(str) {
    return str.replace(/[^a-zA-Z]/g, "").length;
  }

  const letterCount = countLetters(fullName);
  const typingSpeed = 120; // ms per LETTER (spaces are instant)
  const pauseAtEnd = 1500; // ms to pause after typing
  const eraseSpeed = 60; // ms per character during erase

  function startTyping() {
    let i = 0;
    cursorElement.style.opacity = "1";

    function typeCharacter() {
      if (i < fullName.length) {
        typingElement.textContent = fullName.substring(0, i + 1);
        typingElement.appendChild(cursorElement);
        i++;

        // Instant display for spaces, normal speed for letters
        const delay = fullName[i - 1] === " " ? 0 : typingSpeed;
        setTimeout(typeCharacter, delay);
      } else {
        setTimeout(startErasing, pauseAtEnd);
      }
    }

    typeCharacter();
  }

  function startErasing() {
    let i = fullName.length;

    function eraseCharacter() {
      if (i > 0) {
        typingElement.textContent = fullName.substring(0, i - 1);
        typingElement.appendChild(cursorElement);
        i--;
        setTimeout(eraseCharacter, eraseSpeed);
      } else {
        cursorElement.style.opacity = "0";
        setTimeout(startTyping, 500); // Delay before restart
      }
    }

    eraseCharacter();
  }

  // Initial delay before first animation
  setTimeout(startTyping, 800);
});

// Add this to your script.js
document.addEventListener("DOMContentLoaded", function () {
  // Get all filter buttons and gallery items
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  // Add click event listener to each filter button
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      // Get the filter value from data-filter attribute
      const filterValue = this.getAttribute("data-filter");

      // Show/hide gallery items based on filter
      galleryItems.forEach((item) => {
        if (filterValue === "all") {
          item.style.display = "block";
        } else {
          if (item.getAttribute("data-category") === filterValue) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        }
      });
    });
  });
});
// Form Submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const submitBtn = document.querySelector(".submit-btn");

  // Change button state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  // Simulate form submission (replace with actual AJAX call)
  setTimeout(() => {
    // This would be your fetch/AJAX call to a server
    console.log("Form data:", Object.fromEntries(formData));

    // Show success message
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';

    // Reset form after 2 seconds
    setTimeout(() => {
      this.reset();
      submitBtn.innerHTML =
        '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
      submitBtn.disabled = false;

      // Show thank you message (optional)
      alert("Thank you for your message! I will get back to you soon.");
    }, 2000);
  }, 1500);
});

// Back to Top Button
document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
// Projects Slider Functionality
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".projects-slider");
  const slides = document.querySelectorAll(".project-slide");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");
  const dotsContainer = document.querySelector(".slider-dots");

  let currentIndex = 0;
  let autoScrollInterval;
  const autoScrollDelay = 3000; // 3 seconds between slides

  // Create dots
  function createDots() {
    dotsContainer.innerHTML = ""; // Clear existing dots
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("slider-dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        goToSlide(index);
        resetAutoScroll(); // Reset timer on manual navigation
      });
      dotsContainer.appendChild(dot);
    });
  }

  // Navigation functions
  function goToSlide(index) {
    currentIndex = index;
    slider.scrollTo({
      left: slides[index].offsetLeft,
      behavior: "smooth",
    });
    updateActiveDot();
  }

  function updateActiveDot() {
    document.querySelectorAll(".slider-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Auto-scroll functionality
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      goToSlide(currentIndex);
    }, autoScrollDelay);
  }

  function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    startAutoScroll();
  }

  // Button events
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(currentIndex);
    resetAutoScroll();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
    resetAutoScroll();
  });

  // Initialize
  createDots();
  startAutoScroll();

  // Pause auto-scroll on hover
  slider.addEventListener("mouseenter", () => {
    clearInterval(autoScrollInterval);
  });

  slider.addEventListener("mouseleave", () => {
    startAutoScroll();
  });

  // Update dots on scroll
  slider.addEventListener("scroll", () => {
    const slideWidth = slides[0].offsetWidth;
    const newIndex = Math.round(slider.scrollLeft / slideWidth);
    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      updateActiveDot();
    }
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    goToSlide(currentIndex); // Re-center current slide
  });
});
