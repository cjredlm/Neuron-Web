document.addEventListener('DOMContentLoaded', () => {
    // Add js-enabled class
    document.documentElement.classList.add('js-enabled');
    
    const scrollContainer = document.querySelector('.scroll-container');
    const navbar = document.querySelector('.navbar');
    
    // Navbar background on scroll
    scrollContainer.addEventListener('scroll', () => {
        if (scrollContainer.scrollTop > 50) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.backgroundColor = 'transparent';
        }
    });

    // Intersection Observer for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.fade-up, .fade-in').forEach(el => el.classList.add('visible'));
            }
        });
    }, { root: scrollContainer, rootMargin: '0px', threshold: 0.3 });

    document.querySelectorAll('.fullscreen-section').forEach(s => observer.observe(s));

    // ── Hero Slider ───────────────────────────────────────────────────
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // =============================================
    // MOBILE MENU — SpaceX Style (minimal & robust)
    // =============================================
    const mobToggle = document.getElementById('mob-toggle');
    const mobMenu   = document.getElementById('mob-menu');

    function openMobMenu() {
        document.body.classList.add('mob-open');
        mobToggle && mobToggle.setAttribute('aria-expanded', 'true');
    }
    function closeMobMenu() {
        document.body.classList.remove('mob-open');
        mobToggle && mobToggle.setAttribute('aria-expanded', 'false');
    }

    if (mobToggle) mobToggle.addEventListener('click', () => {
        document.body.classList.contains('mob-open') ? closeMobMenu() : openMobMenu();
    });

    // Close when clicking any menu link
    document.querySelectorAll('.mob-close-link').forEach(link => {
        link.addEventListener('click', closeMobMenu);
    });

    // Close with Escape key
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobMenu(); });

    // =============================================
    // Mobile Catalog Touch Accordion
    // =============================================
    let mobileCatalogInitialized = false;

    function initMobileCatalog() {
        if (window.innerWidth > 768 || mobileCatalogInitialized) return;
        mobileCatalogInitialized = true;

        const catalogItems = document.querySelectorAll('.catalog-item');
        if (!catalogItems.length) return;

        catalogItems[0].classList.add('active-mobile'); // auto-expand first

        catalogItems.forEach(item => {
            item.addEventListener('click', () => {
                const wasActive = item.classList.contains('active-mobile');
                catalogItems.forEach(i => i.classList.remove('active-mobile'));
                if (!wasActive) item.classList.add('active-mobile');
            });
        });
    }

    initMobileCatalog();

    // ── Showcase Slider ───────────────────────────────────────────────
    window.moveShowcase = function(index) {
        const slider = document.getElementById('showcaseSlider');
        const dots   = document.querySelectorAll('.s-dot');
        if (slider) {
            slider.style.transform = `translateX(-${index * 33.3333}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        }
    };
});
