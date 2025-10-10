document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation
  function initMobileNav() {
    const hamburger = document.querySelector(".hamburger");
    const navList = document.querySelector(".nav-list");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navList.classList.toggle("active");
      document.body.style.overflow = navList.classList.contains("active")
        ? "hidden"
        : "auto";
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navList.classList.remove("active");
        document.body.style.overflow = "auto";
      });
    });
  }

  // Typing Animation
  function initTypingAnimation() {
    const fullName = "Anirudh";
    const typingElement = document.querySelector(".typing-animation");
    if (!typingElement) return;

    // Clear and prepare the element
    typingElement.innerHTML = "";
    typingElement.style.minWidth = `${fullName.length}ch`; // Reserve space to prevent layout shift

    const cursorElement = document.createElement("span");
    cursorElement.className = "cursor";
    typingElement.appendChild(cursorElement);

    let isAnimating = false;
    let animationTimeout;

    // Animation timing parameters
    const typingSpeed = 120; // Speed for typing each character (ms)
    const pauseAtEnd = 1500; // Pause after typing complete (ms)
    const eraseSpeed = 60; // Speed for erasing each character (ms)
    const startDelay = 800; // Initial delay before animation starts (ms)
    const restartDelay = 500; // Delay before restarting (ms)

    function typeCharacter(i) {
      if (i < fullName.length) {
        // Type next character
        typingElement.textContent = fullName.substring(0, i + 1);
        typingElement.appendChild(cursorElement);

        // No delay for spaces, normal delay for other characters
        const delay = fullName[i] === " " ? 0 : typingSpeed;
        setTimeout(() => typeCharacter(i + 1), delay);
      } else {
        // Finished typing - pause before erasing
        setTimeout(startErasing, pauseAtEnd);
      }
    }

    function eraseCharacter(i) {
      if (i > 0) {
        // Erase previous character
        typingElement.textContent = fullName.substring(0, i - 1);
        typingElement.appendChild(cursorElement);
        setTimeout(() => eraseCharacter(i - 1), eraseSpeed);
      } else {
        // Finished erasing - pause before restarting
        cursorElement.style.opacity = "0";
        isAnimating = false;
        setTimeout(startTyping, restartDelay);
      }
    }

    function startErasing() {
      eraseCharacter(fullName.length);
    }

    function startTyping() {
      if (isAnimating) return;
      isAnimating = true;
      cursorElement.style.opacity = "1";
      typeCharacter(0);
    }

    function startAnimation() {
      clearTimeout(animationTimeout);
      animationTimeout = setTimeout(startTyping, startDelay);
    }

    // Start the animation
    startAnimation();

    // Clean up on page unload
    window.addEventListener("beforeunload", () => {
      clearTimeout(animationTimeout);
      isAnimating = false;
    });

    // Optional: Pause animation when tab is not visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearTimeout(animationTimeout);
        isAnimating = false;
      } else {
        startAnimation();
      }
    });
  }

  // Gallery Filter
  function initGalleryFilter() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        filterBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        const filterValue = this.getAttribute("data-filter");

        galleryItems.forEach((item) => {
          item.style.display =
            filterValue === "all" ||
            item.getAttribute("data-category") === filterValue
              ? "block"
              : "none";
        });
      });
    });
  }
  // Form Submission
  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const submitBtn = document.querySelector(".submit-btn");
  
      // Get form values
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const message = formData.get('message');
  
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening email...';
      submitBtn.disabled = true;
  
      setTimeout(() => {
        // Create email body with all details
        let emailBody = `Name: ${name}%0D%0A`;
        emailBody += `Email: ${email}%0D%0A`;
        if (phone) {
          emailBody += `Phone: ${phone}%0D%0A`;
        }
        emailBody += `%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
  
        // Create mailto link
        const subject = `Contact Form Submission from ${name}`;
        const mailtoLink = `mailto:Anirudh.dq.p@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
  
        // Open email client
        window.location.href = mailtoLink;
  
        setTimeout(() => {
          this.reset();
          submitBtn.innerHTML =
            '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
          submitBtn.disabled = false;
          alert("Your email client should open now. Please send the email to complete your message.");
        }, 1000);
      }, 500);
    });
  }
  
  // Initialize the form when the page loads
  initContactForm();

  // Back to Top Button
  function initBackToTop() {
    const backToTopBtn = document.querySelector(".back-to-top");
    if (!backToTopBtn) return;

    window.addEventListener("scroll", function () {
      backToTopBtn.classList.toggle("visible", window.pageYOffset > 300);
    });

    backToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Projects Slider
  function initProjectsSlider() {
    const slider = document.querySelector(".projects-slider");
    if (!slider) return;

    const slides = document.querySelectorAll(".project-slide");
    const prevBtn = document.querySelector(".slider-prev");
    const nextBtn = document.querySelector(".slider-next");
    const dotsContainer = document.querySelector(".slider-dots");

    let currentIndex = 0;
    let autoScrollInterval;
    const autoScrollDelay = 3000;

    function createDots() {
      dotsContainer.innerHTML = "";
      slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("slider-dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
          goToSlide(index);
          resetAutoScroll();
        });
        dotsContainer.appendChild(dot);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      slider.scrollTo({ left: slides[index].offsetLeft, behavior: "smooth" });
      updateActiveDot();
    }

    function updateActiveDot() {
      document.querySelectorAll(".slider-dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

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

    prevBtn?.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(currentIndex);
      resetAutoScroll();
    });

    nextBtn?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      goToSlide(currentIndex);
      resetAutoScroll();
    });

    slider.addEventListener("mouseenter", () =>
      clearInterval(autoScrollInterval)
    );
    slider.addEventListener("mouseleave", startAutoScroll);

    slider.addEventListener("scroll", () => {
      const slideWidth = slides[0]?.offsetWidth;
      if (slideWidth) {
        const newIndex = Math.round(slider.scrollLeft / slideWidth);
        if (newIndex !== currentIndex) {
          currentIndex = newIndex;
          updateActiveDot();
        }
      }
    });

    window.addEventListener("resize", () => goToSlide(currentIndex));

    createDots();
    startAutoScroll();
  }

  // Scroll Animations
  function initScrollAnimations() {
    const scrollElements = document.querySelectorAll("[data-scroll]");
    if (scrollElements.length === 0) return;

    const options = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animationType = entry.target.getAttribute("data-scroll");
          entry.target.classList.add("animate", animationType);

          const delay = entry.target.getAttribute("data-delay");
          if (delay) entry.target.style.transitionDelay = delay;

          observer.unobserve(entry.target);
        }
      });
    }, options);

    scrollElements.forEach((el) => {
      el.classList.add("hidden");

      // Handle delay classes
      for (let i = 1; i <= 5; i++) {
        if (el.classList.contains(`delay-${i}`)) {
          el.style.animationDelay = `${i * 0.1}s`;
        }
      }

      observer.observe(el);
    });

    // Animate skill bars
    const skillBars = document.querySelectorAll(".skill-level");
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const level = entry.target.getAttribute("data-level");
            entry.target.style.width = level;
            skillObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    skillBars.forEach((bar) => skillObserver.observe(bar));
  }

  // Active Menu Item Highlighting
  function initActiveMenuHighlight() {
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-list li a");

    window.addEventListener("scroll", function () {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
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

    document.querySelectorAll(".nav-list li a").forEach((item) => {
      item.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          document.querySelector(".hamburger")?.classList.remove("active");
          document.querySelector(".nav-list")?.classList.remove("active");
        }
      });
    });
  }

  // Initialize all functions
  initMobileNav();
  initTypingAnimation();
  initGalleryFilter();
  initContactForm();
  initBackToTop();
  initProjectsSlider();
  initScrollAnimations();
  initActiveMenuHighlight();
});
