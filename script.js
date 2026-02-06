// ============================================
// STICKY HEADER
// ============================================

const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Zamknij menu po kliknięciu w link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Zamknij menu po kliknięciu poza nim
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL-BASED ANIMATIONS (IntersectionObserver)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Opcjonalnie: przestań obserwować po pierwszym pojawieniu się
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Obserwuj wszystkie elementy z klasą scroll-fade
document.querySelectorAll('.scroll-fade').forEach(el => {
    observer.observe(el);
});

// ============================================
// GALLERY MODAL
// ============================================

const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');

// Otwórz modal po kliknięciu w element galerii
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('.gallery-img');
        const title = item.querySelector('.gallery-title');
        
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalTitle.textContent = title.textContent;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Zablokuj scroll strony
    });
});

// Zamknij modal
modalClose.addEventListener('click', () => {
    closeModal();
});

modal.addEventListener('click', (e) => {
    // Zamknij modal po kliknięciu poza obrazem
    if (e.target === modal) {
        closeModal();
    }
});

// Zamknij modal klawiszem ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Przywróć scroll strony
}

// ============================================
// FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Pobierz wartości z formularza
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Tutaj można dodać logikę wysyłania formularza (np. przez API)
    console.log('Formularz wysłany:', formData);
    
    // Wyświetl komunikat sukcesu (można zastąpić bardziej zaawansowanym rozwiązaniem)
    alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
    
    // Wyczyść formularz
    contactForm.reset();
});

// ============================================
// PARALLAX EFFECT (opcjonalny, subtelny)
// ============================================

const heroImage = document.querySelector('.hero-img');

if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            const heroTop = heroSection.offsetTop;
            const heroHeight = heroSection.offsetHeight;
            
            if (scrolled < heroTop + heroHeight) {
                const parallaxValue = scrolled * 0.3;
                heroImage.style.transform = `translateY(${parallaxValue}px) scale(1.05)`;
            }
        }
    });
}

// ============================================
// LAZY LOADING IMAGES (opcjonalne ulepszenie)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Obserwuj obrazy z atrybutem data-src (jeśli będą dodane w przyszłości)
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// PERFORMANCE: Throttle dla scroll events
// ============================================

function throttle(func, wait) {
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

// Zastosuj throttle do scroll events (jeśli potrzeba)
// const throttledScroll = throttle(() => {
//     // kod scroll
// }, 16);

// ============================================
// INITIALIZATION
// ============================================

// Upewnij się, że wszystko jest załadowane
document.addEventListener('DOMContentLoaded', () => {
    console.log('Strona załadowana pomyślnie');
    
    // Dodatkowe inicjalizacje można dodać tutaj
});
