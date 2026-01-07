document.addEventListener('DOMContentLoaded', () => {
    
    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.scroll-reveal, .split-text, .split-image');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Hero Parallax Tilt Effect ---
    const heroVisual = document.querySelector('.hero-visual');
    const heroSection = document.querySelector('.hero');
    const widgets = document.querySelectorAll('.floating-widget');

    if (heroSection && heroVisual) {
        heroSection.addEventListener('mousemove', (e) => {
            const { offsetWidth: width, offsetHeight: height } = heroSection;
            const { clientX: x, clientY: y } = e;

            const moveX = (x / width - 0.5) * 30; // Reduced sensitivity
            const moveY = (y / height - 0.5) * 30;

            // Rotate the main browser mockup
            heroVisual.style.transform = `rotateY(${-moveX}deg) rotateX(${moveY}deg)`;

            // Move widgets with diff speeds for parallax depth
            widgets.forEach((widget, index) => {
                const speed = (index + 1) * 2;
                widget.style.transform = `translateZ(60px) translateX(${moveX * speed * -0.5}px) translateY(${moveY * speed * -0.5}px)`;
            });
        });

        // Reset on mouse leave
        heroSection.addEventListener('mouseleave', () => {
             heroVisual.style.transform = `rotateY(-5deg) rotateX(5deg)`;
             widgets.forEach(widget => {
                 widget.style.transform = `translateZ(60px) translateX(0) translateY(0)`;
             });
        });
    }

    // --- FAQ Accordion ---
    document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            const toggle = item.querySelector('.toggle');
            
            // Close others (optional - can remove if you want multiple open)
            document.querySelectorAll('.faq-answer').forEach(a => {
                if (a !== answer) {
                    a.classList.remove('open');
                    a.previousElementSibling.querySelector('.toggle').classList.remove('rotate');
                }
            });

            answer.classList.toggle('open');
            toggle.classList.toggle('rotate');
        });
    });

    // --- Lightbox / Zoom ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg && closeBtn) {
        // Open Lightbox
        document.querySelectorAll('.zoomable').forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });

        // Close Lightbox
        const closeLightbox = () => lightbox.classList.remove('active');
        
        closeBtn.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

});
