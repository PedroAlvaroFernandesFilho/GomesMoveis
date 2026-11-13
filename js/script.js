// =========================================
// HEADER FLUTUANTE + MENU MOBILE
// =========================================
const header = document.getElementById('header');
const menuBtn = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('#nav-menu a');

// Efeito de rolagem do header ({passive: true} deixa a rolagem mais leve)
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

function setMenu(open) {
    navMenu.classList.toggle('active', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    const icon = menuBtn.querySelector('i');
    icon.className = open ? 'fas fa-times' : 'fas fa-bars';
}

menuBtn.addEventListener('click', () => {
    setMenu(!navMenu.classList.contains('active'));
});

// Fecha o menu ao clicar em um link (no celular)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) setMenu(false);
    });
});

// Destaca no menu a seção que está na tela
const sections = document.querySelectorAll('main section[id]');
const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
    });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(section => spyObserver.observe(section));

// =========================================
// CARROSSEL
// =========================================
const carousel = document.getElementById('carousel');
const track = document.getElementById('track');
const dotsContainer = document.getElementById('dots-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slides = track ? Array.from(track.children) : [];
const AUTOPLAY_MS = 10000;

if (track && dotsContainer && slides.length) {
    let currentIndex = 0;
    let carouselTimer;

    // Cria um botão (acessível pelo teclado) para cada foto
    dotsContainer.innerHTML = '';
    const dots = slides.map((slide, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot';
        dot.setAttribute('aria-label', `Ver foto ${index + 1} de ${slides.length}`);
        dot.addEventListener('click', () => {
            moveToSlide(index);
            resetTimer();
        });
        dotsContainer.appendChild(dot);
        return dot;
    });

    function moveToSlide(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
            dot.setAttribute('aria-current', i === index ? 'true' : 'false');
        });
        currentIndex = index;
    }

    const nextSlide = () => moveToSlide((currentIndex + 1) % slides.length);
    const prevSlide = () => moveToSlide((currentIndex - 1 + slides.length) % slides.length);

    function stopTimer() { clearInterval(carouselTimer); }
    function resetTimer() {
        stopTimer();
        carouselTimer = setInterval(nextSlide, AUTOPLAY_MS);
    }

    prevBtn?.addEventListener('click', () => { prevSlide(); resetTimer(); });
    nextBtn?.addEventListener('click', () => { nextSlide(); resetTimer(); });

    // Pausa enquanto o mouse ou o foco do teclado está no carrossel
    carousel.addEventListener('mouseenter', stopTimer);
    carousel.addEventListener('mouseleave', resetTimer);
    carousel.addEventListener('focusin', stopTimer);
    carousel.addEventListener('focusout', resetTimer);

    // Setas do teclado
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { nextSlide(); resetTimer(); }
        if (e.key === 'ArrowLeft')  { prevSlide(); resetTimer(); }
    });

    // Arrastar no celular
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopTimer();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const diffX = startX - e.changedTouches[0].clientX;
        if (diffX > 50) nextSlide();
        else if (diffX < -50) prevSlide();
        isDragging = false;
        resetTimer();
    }, { passive: true });

    moveToSlide(0);
    resetTimer();
}

// =========================================
// LIGHTBOX (foto ampliada)
// =========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-btn');
let lastFocused = null;

function openLightbox(img) {
    lastFocused = document.activeElement;
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden'; // trava a rolagem do fundo
    closeBtn.focus();
}

function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
    lastFocused?.focus();
}

if (lightbox && slides.length) {
    slides.forEach(slide => slide.addEventListener('click', () => openLightbox(slide)));

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
}

// =========================================
// ANIMAÇÃO AO ROLAR (scroll reveal)
// =========================================
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// =========================================
// ANO AUTOMÁTICO NO RODAPÉ
// =========================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
