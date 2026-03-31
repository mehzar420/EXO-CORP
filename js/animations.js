// ========== DARK 3D TILT EFFECT ==========
const tiltCards = document.querySelectorAll('.product-card, .feature-card, .testimonial-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

// ========== DARK GLOW EFFECT ==========
const glowCards = document.querySelectorAll('.product-card, .feature-card');

glowCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 0 40px rgba(255, 0, 0, 0.4)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = 'none';
    });
});

// ========== DARK TEXT GLITCH EFFECT ==========
const glitchTexts = document.querySelectorAll('.glitch-text');

setInterval(() => {
    glitchTexts.forEach(text => {
        text.style.transform = `skew(${Math.random() * 2 - 1}deg)`;
        setTimeout(() => {
            text.style.transform = 'skew(0deg)';
        }, 100);
    });
}, 3000);

// ========== DARK PARALLAX MOUSE EFFECT ==========
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 25;
        const y = (e.clientY / window.innerHeight - 0.5) * 25;
        heroVisual.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// ========== DARK BACKGROUND GRADIENT ==========
const gradientBg = document.querySelector('.gradient-bg');
if (gradientBg) {
    let angle = 0;
    setInterval(() => {
        angle += 0.3;
        gradientBg.style.background = `
            radial-gradient(circle at ${30 + Math.sin(angle) * 15}% ${50 + Math.cos(angle) * 15}%, 
            rgba(255, 0, 0, 0.15) 0%, 
            transparent 50%),
            radial-gradient(circle at ${70 + Math.cos(angle * 1.3) * 15}% ${80 + Math.sin(angle * 1.3) * 15}%, 
            rgba(139, 0, 0, 0.15) 0%, 
            transparent 50%),
            radial-gradient(circle at ${50 + Math.sin(angle * 2) * 15}% ${30 + Math.cos(angle * 2) * 15}%, 
            rgba(102, 0, 0, 0.1) 0%, 
            transparent 50%)
        `;
    }, 50);
}

// ========== DARK PARTICLE SYSTEM ==========
const particleCanvas = document.getElementById('particle-canvas');
if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    let particles = [];
    
    function resizeParticleCanvas() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }
    
    function createParticles() {
        const particleCount = 200;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * particleCanvas.width,
                y: Math.random() * particleCanvas.height,
                radius: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.8,
                speedY: (Math.random() - 0.5) * 0.8,
                opacity: Math.random() * 0.6 + 0.2,
                color: `hsl(${Math.random() * 10 + 350}, 100%, 50%)`
            });
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0) particle.x = particleCanvas.width;
            if (particle.x > particleCanvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = particleCanvas.height;
            if (particle.y > particleCanvas.height) particle.y = 0;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    resizeParticleCanvas();
    createParticles();
    animateParticles();
    
    window.addEventListener('resize', () => {
        resizeParticleCanvas();
        particles = [];
        createParticles();
    });
}

// ========== DARK STAR FIELD ==========
const starCanvas = document.getElementById('star-canvas');
if (starCanvas) {
    const starCtx = starCanvas.getContext('2d');
    let stars = [];
    
    function resizeStarCanvas() {
        starCanvas.width = window.innerWidth;
        starCanvas.height = window.innerHeight;
    }
    
    function createStars() {
        const starCount = 400;
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * starCanvas.width,
                y: Math.random() * starCanvas.height,
                radius: Math.random() * 2,
                alpha: Math.random() * 0.7 + 0.3,
                twinkle: Math.random() * 0.05
            });
        }
    }
    
    function animateStars() {
        starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
        
        stars.forEach(star => {
            star.alpha += (Math.random() - 0.5) * star.twinkle;
            star.alpha = Math.min(Math.max(star.alpha, 0.2), 0.9);
            
            starCtx.beginPath();
            starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            starCtx.fillStyle = `rgba(255, 0, 0, ${star.alpha})`;
            starCtx.fill();
        });
        
        requestAnimationFrame(animateStars);
    }
    
    resizeStarCanvas();
    createStars();
    animateStars();
    
    window.addEventListener('resize', () => {
        resizeStarCanvas();
        stars = [];
        createStars();
    });
}

// ========== SMOOTH PARALLAX ON SCROLL ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingCubes = document.querySelectorAll('.floating-cube');
    
    floatingCubes.forEach((cube, index) => {
        const speed = 0.15 + (index * 0.08);
        cube.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.15}deg)`;
    });
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < 500) {
        heroContent.style.opacity = 1 - (scrolled / 600);
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ========== DARK TYPEWRITER EFFECT ==========
const motivationPush = document.querySelector('.motivation-push');
if (motivationPush) {
    const phrases = ['"BECOME DARK"', '"DARK GOD"', '"NO LIMITS"', '"DARK POWER"', '"DARK MODE"'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    
    function typeMotivation() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            currentText = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        motivationPush.textContent = currentText;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeMotivation, 2500);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeMotivation, 500);
            return;
        }
        
        setTimeout(typeMotivation, isDeleting ? 40 : 80);
    }
    
    setTimeout(typeMotivation, 1000);
}

// ========== SCROLL REVEAL WITH STAGGER ==========
const revealElements = document.querySelectorAll('.product-card, .feature-card, .testimonial-card, .faq-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s`;
    revealObserver.observe(el);
});

// ========== DARK HOVER SCALE ==========
const hoverElements = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-product, .product-card, .feature-card, .payment-option-card');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.03)';
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
    });
});

// ========== CONSOLE DARK MESSAGE ==========
console.log('%c💀 YOU HAVE ENTERED THE DARK REALM 💀', 'color: #ff0000; font-size: 18px; font-weight: bold; text-shadow: 0 0 15px #ff0000;');
console.log('%cMay the dark gods bless your gaming journey.', 'color: #8B0000; font-size: 14px;');
console.log('%cRemember: With great dark power comes great responsibility.', 'color: #660000; font-size: 12px;');