
        // Theme Toggle
        function toggleTheme() {
            const body = document.body;
            const themeToggle = document.querySelector('.theme-toggle');
            
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                themeToggle.textContent = 'Dark';
            } else {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                themeToggle.textContent = 'Light';
            }
        }
        
        // Mobile Menu Toggle
        function toggleMobileMenu() {
            const mobileNav = document.querySelector('.mobile-nav');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            
            mobileNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        }
        
        function closeMobileMenu() {
            const mobileNav = document.querySelector('.mobile-nav');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            
            mobileNav.classList.remove('active');
            menuToggle.classList.remove('active');
        }

        // Download Resume Function
        function downloadResume(event) {
            event.preventDefault();
            
            // Create a link to the PDF file
            const link = document.createElement('a');
            link.href = '/assects/AnirudhP.pdf.pdf'; 
            link.download = '/assects/AnirudhP.pdf.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // Scroll Animation Observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe elements
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll(
                '.section-title, .experience-header, .experience-column, .skill-category, .education-card'
            );
            
            animatedElements.forEach(el => observer.observe(el));

            // Smooth scroll
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Parallax effect on hero
            let ticking = false;
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const scrolled = window.pageYOffset;
                        const hero = document.querySelector('.hero-image');
                        if (hero && window.innerWidth > 768) {
                            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                        }
                        ticking = false;
                    });
                    ticking = true;
                }
            });
            
            // Close mobile menu on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    closeMobileMenu();
                }
            });
            
            // Close mobile menu on outside click
            document.addEventListener('click', (e) => {
                const mobileNav = document.querySelector('.mobile-nav');
                const menuToggle = document.querySelector('.mobile-menu-toggle');
                
                if (mobileNav.classList.contains('active') && 
                    !mobileNav.contains(e.target) && 
                    !menuToggle.contains(e.target)) {
                    closeMobileMenu();
                }
            });
        });