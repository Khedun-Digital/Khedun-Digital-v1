/**
 * ==========================================
 * KHEDUN DIGITAL - MAIN JAVASCRIPT
 * Modern ES6+ Architecture
 * ==========================================
 */

class KhedunDigital {
    constructor() {
        this.closeMobileMenu = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupIntersectionObserver();
        this.setupPerformanceOptimizations();
        this.setupAccessibility();
        console.log('🚀 Khedun Digital initialized successfully!');
    }

    // Navigation functionality
    setupNavigation() {
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const body = document.body;

        if (menuBtn && mobileMenu) {
            menuBtn.setAttribute('aria-controls', 'mobile-menu');
            menuBtn.setAttribute('aria-expanded', 'false');

            const setMenuState = (isOpen) => {
                mobileMenu.classList.toggle('hidden', !isOpen);
                menuBtn.setAttribute('aria-expanded', String(isOpen));
                body.classList.toggle('no-scroll', isOpen);
            };

            const toggleMenu = () => {
                const isOpen = !mobileMenu.classList.contains('hidden');
                setMenuState(!isOpen);
            };

            const closeMenu = () => {
                if (!mobileMenu.classList.contains('hidden')) {
                    setMenuState(false);
                }
            };

            menuBtn.addEventListener('click', (event) => {
                event.preventDefault();
                toggleMenu();
            });

            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => closeMenu());
            });

            window.addEventListener('resize', this.debounce(() => {
                if (window.innerWidth >= 768) {
                    closeMenu();
                }
            }, 150));

            this.closeMobileMenu = closeMenu;
        }

        // Smooth scrolling for navigation links with offset so content isn't hidden behind the nav
        const navbar = document.querySelector('nav');
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');

                if (!href || href === '#') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navHeight = navbar ? navbar.getBoundingClientRect().height : 0;
                    const offset = navHeight + 16; // small buffer to keep section headers visible
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Navbar background on scroll
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
    }

    // Scroll-based effects
    setupScrollEffects() {
        let ticking = false;
        const heroVisual = document.querySelector('.hero-visual');
        const parallaxPreference = window.matchMedia('(pointer: fine)');
        const reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

        const subscribe = (mediaQuery, handler) => {
            if (typeof mediaQuery.addEventListener === 'function') {
                mediaQuery.addEventListener('change', handler);
            } else if (typeof mediaQuery.addListener === 'function') {
                mediaQuery.addListener(handler);
            }
        };

        let parallaxEnabled = parallaxPreference.matches && !reducedMotionPreference.matches;

        const resetParallax = () => {
            if (heroVisual) {
                heroVisual.style.transform = '';
            }
        };

        subscribe(parallaxPreference, (event) => {
            parallaxEnabled = event.matches && !reducedMotionPreference.matches;
            if (!parallaxEnabled) {
                resetParallax();
            }
        });

        subscribe(reducedMotionPreference, (event) => {
            parallaxEnabled = parallaxPreference.matches && !event.matches;
            if (!parallaxEnabled) {
                resetParallax();
            }
        });

        const updateScrollEffects = () => {
            const scrollY = window.scrollY;

            // Parallax effect for hero section
            if (heroVisual) {
                if (parallaxEnabled) {
                    const speed = scrollY * 0.35;
                    heroVisual.style.transform = `translateY(${speed}px)`;
                } else if (heroVisual.style.transform) {
                    heroVisual.style.transform = '';
                }
            }

            // Progress indicator
            const progressBar = document.querySelector('.progress-fill');
            if (progressBar) {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight - windowHeight;
                const scrolled = (scrollY / documentHeight) * 100;
                progressBar.style.width = `${Math.min(scrolled, 100)}%`;
            }

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }

    // Animation setup
    setupAnimations() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

        if (prefersReducedMotion) {
            document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
                el.classList.add('active');
            });
            return;
        }

        // Add CSS classes for animations with gentle staggering
        const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .section-header');

        animatedElements.forEach((element, index) => {
            element.style.animationDelay = `${Math.min(index * 0.08, 0.8)}s`;
        });

        // Typewriter effect for hero text
        this.setupTypewriter(isCoarsePointer ? 140 : 100);

        // Floating animation for logo
        this.setupFloatingElements(isCoarsePointer);
    }

    // Typewriter effect
    setupTypewriter(speed = 100) {
        const typewriterElements = document.querySelectorAll('.typewriter');

        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid var(--color-primary)';

            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            }, speed);
        });
    }

    // Floating elements
    setupFloatingElements(disableForCoarsePointer = false) {
        const floatingElements = document.querySelectorAll('.float');

        floatingElements.forEach((element, index) => {
            if (disableForCoarsePointer) {
                element.style.animation = 'none';
            } else {
                element.style.animationDelay = `${index * 0.5}s`;
            }
        });
    }

    // Intersection Observer for scroll animations
    setupIntersectionObserver() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => el.classList.add('active'));
            return;
        }

        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, options);

        // Observe all reveal elements
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            observer.observe(el);
        });
    }

    // Performance optimizations
    setupPerformanceOptimizations() {
        // Lazy load images
        this.setupLazyLoading();

        // Preload critical resources
        this.preloadCriticalResources();

        // Optimize animations based on user preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('no-animation');
        }
    }

    // Lazy loading for images
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    // Preload critical resources
    preloadCriticalResources() {
        const criticalImages = [
            'assets/images/khedun_digital_logo.png',
            'assets/images/khedun_digital_nav_icon.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Accessibility improvements
    setupAccessibility() {
        // Skip to main content link
        this.createSkipLink();

        // Focus management for mobile menu
        const menuBtn = document.getElementById('menu-btn');
        if (menuBtn) {
            menuBtn.setAttribute('aria-label', 'Toggle mobile menu');
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const isMenuOpen = menuBtn && menuBtn.getAttribute('aria-expanded') === 'true';
                if (isMenuOpen && typeof this.closeMobileMenu === 'function') {
                    this.closeMobileMenu();
                    if (menuBtn) {
                        menuBtn.focus();
                    }
                }
            }
        });
    }

    // Create skip to main content link
    createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-primary);
            color: var(--color-dark);
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Advanced Features
class AdvancedFeatures {
    constructor() {
        this.setupParticles();
        this.setup3DGraphics();
        this.setupVoiceAssistant();
    }

    // Particle system
    setupParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                animation-delay: ${Math.random() * 6}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    // 3D Graphics setup
    setup3DGraphics() {
        if (!window.THREE) return;

        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        // Create geometry
        const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
        const material = new THREE.MeshBasicMaterial({
            color: 0xFFD700,
            wireframe: true
        });
        const torus = new THREE.Mesh(geometry, material);

        scene.add(torus);
        camera.position.z = 50;

        const animate = () => {
            requestAnimationFrame(animate);
            torus.rotation.x += 0.01;
            torus.rotation.y += 0.005;
            renderer.render(scene, camera);
        };

        animate();
    }

    // Voice assistant setup
    setupVoiceAssistant() {
        const voiceBtn = document.querySelector('.voice-assistant');
        if (!voiceBtn) return;

        voiceBtn.addEventListener('click', () => {
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                const recognition = new SpeechRecognition();

                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'en-US';

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    this.processVoiceCommand(transcript.toLowerCase());
                };

                recognition.start();
            } else {
                alert('Speech recognition is not supported in this browser.');
            }
        });
    }

    // Process voice commands
    processVoiceCommand(command) {
        if (command.includes('services') || command.includes('what do you offer')) {
            document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
        } else if (command.includes('contact') || command.includes('get in touch')) {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        } else if (command.includes('about') || command.includes('tell me about')) {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Initialize the application
const khedunDigital = new KhedunDigital();
const advancedFeatures = new AdvancedFeatures();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KhedunDigital, AdvancedFeatures };
}
