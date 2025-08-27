
        // Theme Management
        class ThemeManager {
            constructor() {
                this.theme = localStorage.getItem('theme') || 'light';
                this.init();
            }

            init() {
                this.applyTheme();
                this.bindEvents();
            }

            applyTheme() {
                if (this.theme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
                localStorage.setItem('theme', this.theme);
            }

            toggle() {
                this.theme = this.theme === 'light' ? 'dark' : 'light';
                this.applyTheme();
                this.animateToggle();
            }

            animateToggle() {
                document.body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                setTimeout(() => {
                    document.body.style.transition = '';
                }, 500);
            }

            bindEvents() {
                document.getElementById('theme-toggle').addEventListener('click', () => this.toggle());
            }
        }

        // Navigation Manager
        class NavigationManager {
            constructor() {
                this.init();
            }

            init() {
                this.bindEvents();
                this.highlightActiveSection();
                this.handleScroll();
            }

            bindEvents() {
                // Mobile menu toggle
                const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                const mobileNav = document.getElementById('mobile-nav');
                
                mobileMenuBtn.addEventListener('click', () => {
                    mobileNav.classList.toggle('hidden');
                });

                // Smooth scroll for navigation links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const target = document.querySelector(link.getAttribute('href'));
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        // Close mobile menu if open
                        mobileNav.classList.add('hidden');
                    });
                });

                // Back to top button
                const backToTopBtn = document.getElementById('back-to-top');
                backToTopBtn.addEventListener('click', () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }

            highlightActiveSection() {
                const sections = document.querySelectorAll('section');
                const navLinks = document.querySelectorAll('.nav-link');
                
                window.addEventListener('scroll', () => {
                    let current = '';
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop - 100;
                        if (window.pageYOffset >= sectionTop) {
                            current = section.getAttribute('id');
                        }
                    });

                    navLinks.forEach(link => {
                        link.classList.remove('bg-blue-100', 'dark:bg-gray-700');
                        if (link.getAttribute('href').substring(1) === current) {
                            link.classList.add('bg-blue-100', 'dark:bg-gray-700');
                        }
                    });
                });
            }

            handleScroll() {
                const backToTopBtn = document.getElementById('back-to-top');
                
                window.addEventListener('scroll', () => {
                    if (window.pageYOffset > 300) {
                        backToTopBtn.classList.remove('opacity-0', 'invisible');
                        backToTopBtn.classList.add('opacity-100', 'visible');
                    } else {
                        backToTopBtn.classList.add('opacity-0', 'invisible');
                        backToTopBtn.classList.remove('opacity-100', 'visible');
                    }
                });
            }
        }

        // Animation Manager
        class AnimationManager {
            constructor() {
                this.init();
            }

            init() {
                this.animateSkillBars();
                this.setupIntersectionObserver();
                this.startTypingAnimation();
            }

            animateSkillBars() {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const progressBars = entry.target.querySelectorAll('.skill-progress');
                            progressBars.forEach(bar => {
                                const width = bar.getAttribute('data-width');
                                setTimeout(() => {
                                    bar.style.width = width + '%';
                                }, 200);
                            });
                        }
                    });
                }, { threshold: 0.5 });

                const skillsSection = document.getElementById('Skills');
                if (skillsSection) {
                    observer.observe(skillsSection);
                }
            }

            setupIntersectionObserver() {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-fade-in');
                        }
                    });
                }, { threshold: 0.1 });

                document.querySelectorAll('.fade-in').forEach(el => {
                    observer.observe(el);
                });
            }

            startTypingAnimation() {
                const typingElement = document.getElementById('typing-text');
                const texts = [
                    'Full Stack Developer',
                    'Embedded Systems Developer', 
                    'Robotics Enthusiast',
                    'MERN Stack Student',
                    'IoT Explorer'
                ];
                let currentIndex = 0;
                let charIndex = 0;
                let isDeleting = false;

                function type() {
                    const currentText = texts[currentIndex];
                    
                    if (isDeleting) {
                        typingElement.textContent = currentText.substring(0, charIndex - 1);
                        charIndex--;
                    } else {
                        typingElement.textContent = currentText.substring(0, charIndex + 1);
                        charIndex++;
                    }

                    if (!isDeleting && charIndex === currentText.length) {
                        setTimeout(() => isDeleting = true, 2000);
                    } else if (isDeleting && charIndex === 0) {
                        isDeleting = false;
                        currentIndex = (currentIndex + 1) % texts.length;
                    }

                    const typingSpeed = isDeleting ? 50 : 100;
                    setTimeout(type, typingSpeed);
                }

                type();
            }
        }

        // Form Manager
        class FormManager {
            constructor() {
                this.init();
            }

            init() {
                this.bindEvents();
                this.setupReadMoreToggle();
            }

            bindEvents() {
                const contactForm = document.getElementById('contact-form');
                const resumeBtn = document.getElementById('resume-btn');

                contactForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleFormSubmit(e);
                });

                resumeBtn.addEventListener('click', () => {
                    this.downloadResume();
                });
            }

            handleFormSubmit(e) {
                const submitBtn = document.getElementById('submit-btn');
                const originalText = submitBtn.innerHTML;
                
                // Show loading state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                // Simulate form submission
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.classList.remove('btn-primary');
                    submitBtn.classList.add('bg-green-500', 'hover:bg-green-600');
                    
                    // Reset form
                    e.target.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.classList.add('btn-primary');
                        submitBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
                    }, 3000);
                }, 2000);
            }

            downloadResume() {
                // Simulate resume download
                const link = document.createElement('a');
                link.href = '#'; // Replace with actual resume URL
                link.download = 'Ashreek_A_R_Resume.pdf';
                link.click();
            }

            setupReadMoreToggle() {
                const readMoreBtn = document.getElementById('read-more-btn');
                const extendedContent = document.getElementById('extended-content');
                const extendedContent2 = document.getElementById('extended-content-2');
                let isExpanded = false;

                readMoreBtn.addEventListener('click', () => {
                    if (!isExpanded) {
                        extendedContent.classList.remove('hidden');
                        extendedContent2.classList.remove('hidden');
                        readMoreBtn.textContent = 'Read Less';
                        isExpanded = true;
                    } else {
                        extendedContent.classList.add('hidden');
                        extendedContent2.classList.add('hidden');
                        readMoreBtn.textContent = 'Read More';
                        isExpanded = false;
                    }
                });
            }
        }

        // Loading Manager
        class LoadingManager {
            constructor() {
                this.init();
            }

            init() {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        const loadingScreen = document.getElementById('loading-screen');
                        loadingScreen.style.opacity = '0';
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                        }, 500);
                    }, 1000);
                });
            }
        }

        // Initialize all managers
        document.addEventListener('DOMContentLoaded', () => {
            new ThemeManager();
            new NavigationManager();
            new AnimationManager();
            new FormManager();
            new LoadingManager();
        });

        // Add custom CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes animate-fade-in {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .animate-fade-in {
                animation: animate-fade-in 0.8s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
    