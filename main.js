/* ==================== TYPED JS ==================== */
var typed = new Typed(".text", {
    strings: ["Data Scientist", "ML Engineer", "Quant Researcher"],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 1400,
    loop: true
});

/* ==================== TOGGLE NAVBAR (MOBILE) ==================== */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    // Close navbar when clicking any nav link
    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });
}

/* ==================== SCROLL SECTIONS ACTIVE LINK & STICKY HEADER ==================== */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.header .navbar a');
const header = document.querySelector('#header');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky header
    if (header) {
        header.classList.toggle('sticky', scrollY > 50);
    }

    // Scroll spy for active link
    sections.forEach(sec => {
        const offsetTop = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollY >= offsetTop && scrollY < offsetTop + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

/* ==================== SCROLL REVEAL ANIMATIONS ==================== */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ==================== HERO TO ABOUT SCROLL TRANSITION ==================== */
const heroSection = document.querySelector('#home');
const heroContent = document.querySelector('.home-content');
const heroTerminal = document.querySelector('.hero-terminal');

if (!prefersReducedMotion && heroSection && heroContent && heroTerminal) {
    let ticking = false;

    function handleHeroScrollTransition() {
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight || window.innerHeight;

        if (scrollY <= heroHeight * 1.1) {
            // Calculate progress (0 at top, 1 as user reaches About transition zone)
            const p = Math.min(1, Math.max(0, scrollY / (heroHeight * 0.7)));

            // 1. Hero text translates upward slightly and fades from 1.0 to ~0.75
            heroContent.style.transform = `translateY(${-p * 22}px)`;
            heroContent.style.opacity = (1 - p * 0.25).toFixed(3);

            // 2. Right-side hero visual translates upward slightly and scales from 1.0 to ~0.96
            heroTerminal.style.transform = `translateY(${-p * 20}px) scale(${(1 - p * 0.04).toFixed(3)})`;

            // 3. Hero background grid gradually fades
            heroSection.style.setProperty('--hero-grid-opacity', (1 - p * 0.75).toFixed(3));
        } else {
            heroContent.style.transform = 'translateY(-22px)';
            heroContent.style.opacity = '0.75';
            heroTerminal.style.transform = 'translateY(-20px) scale(0.96)';
            heroSection.style.setProperty('--hero-grid-opacity', '0.25');
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleHeroScrollTransition);
            ticking = true;
        }
    }, { passive: true });

    // Run once on load
    handleHeroScrollTransition();
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
});

// Observe all elements with data-animate or data-animate-children
document.querySelectorAll('[data-animate], [data-animate-children]').forEach(el => {
    revealObserver.observe(el);
});

/* ==================== TECH LIST STAGGER ANIMATION ==================== */
if (!prefersReducedMotion) {
    const techListObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.tech-list li');
                items.forEach((item, i) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(8px)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 60 * i + 150);
                });
                techListObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('.tech-category').forEach(cat => {
        techListObserver.observe(cat);
    });
}

/* ==================== CERTIFICATE MODAL / LIGHTBOX ==================== */
const certModal = document.getElementById('certModal');
const certModalImg = document.getElementById('certModalImg');
const certModalTitle = document.getElementById('certModalTitle');
const certModalDownload = document.getElementById('certModalDownload');
const certModalVerify = document.getElementById('certModalVerify');

function openCertModal(imgSrc, title, pdfUrl, verifyUrl) {
    if (!certModal) return;
    if (certModalImg) {
        certModalImg.src = imgSrc;
        certModalImg.alt = title;
    }
    if (certModalTitle) {
        certModalTitle.textContent = title;
    }
    if (certModalDownload) {
        certModalDownload.href = pdfUrl;
        certModalDownload.setAttribute('download', pdfUrl.split('/').pop());
    }
    if (certModalVerify) {
        certModalVerify.href = verifyUrl;
    }
    
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    if (!certModal) return;
    certModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
        closeCertModal();
    }
});
