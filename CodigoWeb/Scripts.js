// header flutuante script
const header = document.getElementById('header');
const menuBtn = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

// Efeito de rolagem para o menu flutuante
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Menu Mobile
menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if(window.innerWidth < 768) {
            navMenu.classList.remove('active');
            menuBtn.querySelector('i').className = 'fas fa-bars';
        }
    });
});

// Carrossel script
const track = document.getElementById('track');
const dotsContainer = document.getElementById('dots-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (track && dotsContainer) {
    const slides = Array.from(track.children);
    let currentIndex = 0;
    let carouselTimer;

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

    resetTimer();
}

// Lightbox script
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

// Scroll reveal animation
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