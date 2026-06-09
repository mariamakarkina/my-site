// Мобильное меню
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileBtn) {
  mobileBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
  });
}

// Закрываем меню при клике на ссылку
const mobileLinks = document.querySelectorAll('.mobile-nav-link');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('show');
  });
});

// ========== СЛАЙДЕР ДЛЯ ТИТУЛЬНОГО ЛИСТА ==========
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

if (slides.length > 0) {
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
}

// ========== ПЛАВНАЯ ПРОКРУТКА ДЛЯ ВСЕХ ЯКОРНЫХ ССЫЛОК ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if(targetId === "#" || targetId === "") return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  });
});

// ========== АНИМАЦИЯ ПОДЪЁМА КАРТОЧЕК ПРИ ПОЯВЛЕНИИ (СКРОЛЛ) ==========
function initScrollAnimation() {
  const animatedElements = [
    ...document.querySelectorAll('.card-rio'),
    ...document.querySelectorAll('.stat-card'),
    ...document.querySelectorAll('.gallery-item'),
    ...document.querySelectorAll('.brazil-grid'),
    ...document.querySelectorAll('.rio-cultural')
  ];
  
  animatedElements.forEach(el => {
    if (!el.style.opacity && !el.hasAttribute('data-animated')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      el.setAttribute('data-animated', 'false');
    }
  });
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -20px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.getAttribute('data-animated') === 'false') {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.setAttribute('data-animated', 'true');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// ========== ЭФФЕКТ ПРИ НАВЕДЕНИИ НА КАРТОЧКИ (ПОДЪЁМ ВВЕРХ) ==========
function initHoverAnimation() {
  const cards = document.querySelectorAll('.card-rio');
  
  cards.forEach(card => {
    // При наведении мыши - карточка поднимается вверх
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
      card.style.transition = 'transform 0.25s ease, box-shadow 0.25s ease';
      card.style.boxShadow = '0 18px 30px rgba(0,0,0,0.1)';
    });
    
    // Когда мышь уходит - карточка возвращается на место
    card.addEventListener('mouseleave', () => {
      // Если анимация появления уже завершена, возвращаем на место
      if (card.getAttribute('data-animated') === 'true') {
        card.style.transform = 'translateY(0)';
      } else {
        card.style.transform = 'translateY(50px)';
      }
      card.style.boxShadow = 'none';
    });
  });
}

// ========== АНИМАЦИЯ ЗАГОЛОВКОВ СЕКЦИЙ ==========
function animateSectionHeaders() {
  const headers = document.querySelectorAll('.section-header');
  
  headers.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';
    header.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(header);
  });
}

// ========== АНИМАЦИЯ ФАКТ-БЛОКА ==========
function animateFactBlock() {
  const factBlock = document.querySelector('.fact-block');
  if (factBlock) {
    factBlock.style.opacity = '0';
    factBlock.style.transform = 'translateY(30px)';
    factBlock.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(factBlock);
  }
}

// ========== АНИМАЦИЯ ТЕКСТОВОГО БЛОКА РИО ==========
function animateRioIntro() {
  const rioIntro = document.querySelector('.rio-intro');
  if (rioIntro) {
    rioIntro.style.opacity = '0';
    rioIntro.style.transform = 'translateY(25px)';
    rioIntro.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(rioIntro);
  }
}

// ========== АНИМАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ==========
document.addEventListener('DOMContentLoaded', () => {
  console.log("Brasil&Rio | Сайт с анимацией ПОДЪЁМА карточек загружен!");
  
  // Анимация hero-контента
  const heroContent = document.querySelector('.hero-content');
  if(heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(-30px)';
    heroContent.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    
    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 300);
  }
  
  // Запускаем все анимации
  initScrollAnimation();
  initHoverAnimation();  // ← ДОБАВЛЕН ЭФФЕКТ ПРИ НАВЕДЕНИИ
  animateSectionHeaders();
  animateFactBlock();
  animateRioIntro();
});

// ========== ОБРАБОТКА КЛИКОВ НА КНОПКУ "ПОГРУЗИТЬСЯ" ==========
const heroBtn = document.querySelector('.btn-hero');
if(heroBtn) {
  heroBtn.addEventListener('click', (e) => {
    heroBtn.style.transform = 'scale(0.98)';
    setTimeout(() => {
      heroBtn.style.transform = 'scale(1)';
    }, 150);
  });
}