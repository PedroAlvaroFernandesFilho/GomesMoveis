/* header script */
const header = document.getElementById('header');
const menuBtn = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuBtn.querySelector('i').className = 'fas fa-bars';
    });
});

/* carrossel script */
const track = document.getElementById('track');
const dotsContainer = document.getElementById('dots-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (track && dotsContainer) {
    const slides = Array.from(track.children);
    let currentIndex = 0;
    let carouselTimer;

    // Reseta e preenche os círculos indicadores baseados nas imagens reais
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            moveToSlide(index);
            resetTimer();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    function moveToSlide(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        moveToSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        moveToSlide(currentIndex);
    }

    // Configuração estável do timer de 10 segundos (10000ms)
    function resetTimer() {
        clearInterval(carouselTimer);
        carouselTimer = setInterval(nextSlide, 10000);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });
    }

    // Sistema de arrastar e deslizar com o dedo (Mobile Touch)
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(carouselTimer);
    }, {passive: true});

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        let diffX = startX - e.changedTouches[0].clientX;

        if (diffX > 50) nextSlide();
        else if (diffX < -50) prevSlide();
        
        isDragging = false;
        resetTimer();
    }, {passive: true});

    // Inicia o contador automático
    resetTimer();
}

/* lightbox script */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-btn');

if (track && lightbox) {
    const slides = Array.from(track.children);
    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            lightboxImg.src = slide.src;
            lightbox.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) lightbox.classList.remove('active');
    });
}

/* scroll reveal animation script */
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
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));