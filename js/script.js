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
  const fullName = "Anirudh";
  const typingElement = document.querySelector(".typing-animation");

  // Clear any existing content and cursor
  typingElement.innerHTML = "";

  // Create cursor element only once
  const cursorElement = document.createElement("span");
  cursorElement.className = "cursor";
  typingElement.appendChild(cursorElement);

  // Track if animation is running to prevent duplicates
  let isAnimating = false;

  function countLetters(str) {
    return str.replace(/[^a-zA-Z]/g, "").length;
  }

  const letterCount = countLetters(fullName);
  const typingSpeed = 120;
  const pauseAtEnd = 1500;
  const eraseSpeed = 60;

  function startTyping() {
    if (isAnimating) return;
    isAnimating = true;

    let i = 0;
    cursorElement.style.opacity = "1";

    function typeCharacter() {
      if (i < fullName.length) {
        typingElement.textContent = fullName.substring(0, i + 1);
        typingElement.appendChild(cursorElement);
        i++;

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
        isAnimating = false;
        setTimeout(startTyping, 500);
      }
    }

    eraseCharacter();
  }

  // Clear any timeouts on page reload
  let animationTimeout;
  const startAnimation = () => {
    clearTimeout(animationTimeout);
    animationTimeout = setTimeout(startTyping, 800);
  };

  startAnimation();

  // Clean up on page unload to prevent memory leaks
  window.addEventListener("beforeunload", () => {
    clearTimeout(animationTimeout);
    isAnimating = false;
  });
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
// Parallax Effect for Hero Section
function initParallax() {
  const parallaxBg = document.querySelector(".hero-parallax-bg");
  const heroImage = document.querySelector(".hero-image");

  if (parallaxBg && heroImage) {
    window.addEventListener("scroll", function () {
      const scrollPosition = window.pageYOffset;
      parallaxBg.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      heroImage.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    });
  }
}

// Call this in your DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
  initParallax();
  // Your other initialization code...
});
// In your script.js
document.addEventListener("DOMContentLoaded", function () {
  // Scroll Animations
  const scrollElements = document.querySelectorAll("[data-scroll]");

  const elementInView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= window.innerHeight * 0.8;
  };

  const displayScrollElement = (element) => {
    element.classList.add("is-visible");
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el)) {
        displayScrollElement(el);
      }
    });
  };

  // Initialize
  window.addEventListener("load", handleScrollAnimation);
  window.addEventListener("scroll", handleScrollAnimation);

  // Typing Animation
  const typingElement = document.querySelector(".typing-animation");
  if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = "";
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 120);
      }
    }
    setTimeout(typeWriter, 800);
  }

  // Your other existing code...
});
// Animate skill bars when section comes into view
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-level");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const level = entry.target.getAttribute("data-level");
          entry.target.style.width = level;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => observer.observe(bar));
}

// Call this in your DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
  animateSkillBars();
  // Your other existing JavaScript...
});
// Highlight active menu item based on scroll position
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-list li a");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 300) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });
});

document.querySelectorAll(".nav-list li a").forEach((item) => {
  item.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      // Match your mobile breakpoint
      document.querySelector(".hamburger").classList.remove("active");
      document.querySelector(".nav-list").classList.remove("active");
    }
  });
});
// Scroll Animation System
document.addEventListener("DOMContentLoaded", function () {
  // Select all elements with data-scroll attribute
  const scrollElements = document.querySelectorAll("[data-scroll]");

  // Define animation options
  const options = {
    threshold: 0.2, // 20% of the element must be visible
    rootMargin: "0px 0px -50px 0px", // Adjusts the trigger point (negative means earlier trigger)
  };

  // Create the intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Get the animation type from data-scroll attribute
        const animationType = entry.target.getAttribute("data-scroll");

        // Add the animation class
        entry.target.classList.add("animate", animationType);

        // Stop observing after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Add all elements to the observer
  scrollElements.forEach((el) => {
    observer.observe(el);

    // Set initial state - hidden
    el.classList.add("hidden");

    // Handle delay if specified
    if (el.classList.contains("delay-1")) el.style.animationDelay = "0.1s";
    if (el.classList.contains("delay-2")) el.style.animationDelay = "0.2s";
    if (el.classList.contains("delay-3")) el.style.animationDelay = "0.3s";
    if (el.classList.contains("delay-4")) el.style.animationDelay = "0.4s";
    if (el.classList.contains("delay-5")) el.style.animationDelay = "0.5s";
  });

  // Add scroll animations to sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section, index) => {
    // Skip sections that already have animations
    if (section.hasAttribute("data-scroll")) return;

    // Alternate between fade-left and fade-right for sections
    const animation = index % 2 === 0 ? "fade-right" : "fade-left";
    section.setAttribute("data-scroll", animation);
    observer.observe(section);
    section.classList.add("hidden");
  });
});
// Update the observer to handle data-delay attributes
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Get the animation type from data-scroll attribute
      const animationType = entry.target.getAttribute("data-scroll");

      // Add the animation class
      entry.target.classList.add("animate", animationType);

      // Apply custom delay if specified
      const delay = entry.target.getAttribute("data-delay");
      if (delay) {
        entry.target.style.transitionDelay = delay;
      }

      // Stop observing after animation is triggered
      observer.unobserve(entry.target);
    }
  });
}, options);

// style.css end
// Add this script for scroll-triggered animations
// document.addEventListener("DOMContentLoaded", function () {
//   const skillCards = document.querySelectorAll(".skill-card");

//   function checkScroll() {
//     skillCards.forEach((card) => {
//       const cardTop = card.getBoundingClientRect().top;
//       const windowHeight = window.innerHeight;

//       if (cardTop < windowHeight - 100) {
//         card.classList.add("animate");
//       }
//     });
//   }

//   // Initial check
//   checkScroll();

//   // Check on scroll
//   window.addEventListener("scroll", checkScroll);
// });
