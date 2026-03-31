// ========== DARK GOD LEVEL PRELOADER ==========
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.progress-bar');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 12;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        }
        progressBar.style.width = Math.min(progress, 100) + '%';
    }, 120);
});

// ========== DARK CUSTOM CURSOR ==========
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
        cursorFollower.style.transform = `translate(${e.clientX - 25}px, ${e.clientY - 25}px)`;
    });
    
    document.addEventListener('mousedown', () => {
        cursorFollower.classList.add('active');
        cursor.style.transform = 'scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursorFollower.classList.remove('active');
        cursor.style.transform = 'scale(1)';
    });
    
    const interactiveElements = document.querySelectorAll('button, a, .product-card, .feature-card, .motivation-card-fixed, .payment-option-card, .btn-product, .modal-close, .copy-address, .slider-prev, .slider-next, .faq-question, .stat-badge, .nav-link, .btn-discord, .btn-primary, .btn-secondary');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'scale(1.8)';
            cursorFollower.style.borderColor = '#ff0000';
            cursorFollower.style.background = 'rgba(255, 0, 0, 0.2)';
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = '#ff0000';
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.borderColor = '#ff0000';
            cursorFollower.style.background = 'rgba(255, 0, 0, 0.1)';
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--gradient-primary)';
        });
    });
}

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== MOBILE MENU ==========
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// ========== SMOOTH SCROLL FOR ALL BUTTONS ==========
const productsSection = document.querySelector('#products');
const exploreBtn = document.querySelector('.hero .btn-primary');

if (exploreBtn && productsSection) {
    exploreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        productsSection.style.transition = 'all 0.3s ease';
        productsSection.style.boxShadow = '0 0 80px rgba(255, 0, 0, 0.5)';
        setTimeout(() => {
            productsSection.style.boxShadow = 'none';
        }, 1000);
    });
}

const getStartedBtn = document.querySelector('.cta .btn-primary');
if (getStartedBtn && productsSection) {
    getStartedBtn.addEventListener('click', (e) => {
        e.preventDefault();
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (navLinks) navLinks.classList.remove('active');
        }
    });
});

// ========== STATS COUNTER ==========
const statNumbers = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateNumbers = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const targetNumber = parseFloat(target.getAttribute('data-target'));
            let currentNumber = 0;
            const increment = targetNumber / 60;
            
            const updateNumber = () => {
                currentNumber += increment;
                if (currentNumber < targetNumber) {
                    target.textContent = Math.floor(currentNumber);
                    requestAnimationFrame(updateNumber);
                } else {
                    target.textContent = targetNumber;
                }
            };
            updateNumber();
            observer.unobserve(target);
        }
    });
};

const observer = new IntersectionObserver(animateNumbers, observerOptions);
statNumbers.forEach(stat => observer.observe(stat));

// ========== FAQ ACCORDION ==========
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            item.classList.toggle('active');
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    }
});

// ========== TESTIMONIAL SLIDER ==========
let currentSlide = 0;
const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.querySelector('.slider-dots');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
let slidesToShow = 3;

function updateSlidesToShow() {
    if (window.innerWidth <= 768) {
        slidesToShow = 1;
    } else if (window.innerWidth <= 1024) {
        slidesToShow = 2;
    } else {
        slidesToShow = 3;
    }
    createDots();
    updateSlider();
}

function updateSlider() {
    if (!testimonialsTrack || !testimonialCards.length) return;
    const cardWidth = testimonialCards[0].offsetWidth + 20;
    testimonialsTrack.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    updateDots();
}

function createDots() {
    if (!dotsContainer) return;
    const totalSlides = Math.ceil(testimonialCards.length / slidesToShow);
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateSlider();
        });
        dotsContainer.appendChild(dot);
    }
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    const totalSlides = Math.ceil(testimonialCards.length / slidesToShow);
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

if (prevBtn && nextBtn && testimonialsTrack) {
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const totalSlides = Math.ceil(testimonialCards.length / slidesToShow);
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
        }
    });
}

window.addEventListener('resize', () => {
    updateSlidesToShow();
});

updateSlidesToShow();

// ========== MOTIVATION CARD INTERACTION ==========
const motivationCard = document.querySelector('.motivation-card-fixed');

if (motivationCard) {
    motivationCard.addEventListener('click', () => {
        const productsSection = document.querySelector('#products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.top = '50%';
        ripple.style.left = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'radial-gradient(circle, rgba(255,0,0,0.6), transparent)';
        ripple.style.animation = 'rippleExpand 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        motivationCard.style.position = 'relative';
        motivationCard.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
    
    motivationCard.addEventListener('mousemove', (e) => {
        const rect = motivationCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        motivationCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    motivationCard.addEventListener('mouseleave', () => {
        motivationCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
}

// ========== BUTTON RIPPLE EFFECT ==========
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-product');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = button.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 0, 0, 0.8);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes rippleExpand {
        from {
            width: 0;
            height: 0;
            opacity: 1;
        }
        to {
            width: 400px;
            height: 400px;
            opacity: 0;
        }
    }
    
    button, a, .product-card, .feature-card, .payment-option-card, .copy-address, .slider-prev, .slider-next {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// ========== DISCORD BUTTONS ==========
const discordButtons = document.querySelectorAll('.btn-discord, .btn-discord-large');
discordButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        window.open('https://discord.gg/FrTZjFDyVw', '_blank');
    });
});

// ========== WATCH DEMO BUTTON ==========
const watchDemoBtn = document.querySelector('.btn-secondary');
if (watchDemoBtn) {
    watchDemoBtn.addEventListener('click', () => {
        alert('🎮 Dark Demo coming soon! Join our Discord for exclusive dark previews.');
    });
}

// ========== CONFETTI EFFECT ==========
function showConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '10002';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 300;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 25,
            vy: (Math.random() - 0.5) * 25 - 20,
            size: Math.random() * 10 + 3,
            color: `hsl(${Math.random() * 10 + 350}, 100%, 50%)`,
            life: 1
        });
    }
    
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let allDead = true;
        particles.forEach(p => {
            if (p.life > 0) {
                allDead = false;
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.5;
                p.life -= 0.01;
                
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);
            }
        });
        
        if (allDead) {
            canvas.remove();
        } else {
            requestAnimationFrame(animateConfetti);
        }
    }
    
    animateConfetti();
    setTimeout(() => canvas.remove(), 3000);
}

// ========== SCROLL PROGRESS BAR ==========
const progressBarScroll = document.createElement('div');
progressBarScroll.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: var(--gradient-primary);
    z-index: 10001;
    transition: width 0.1s;
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
`;
document.body.appendChild(progressBarScroll);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBarScroll.style.width = scrolled + '%';
});

// ========== ACTIVE NAVIGATION LINK ==========
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('purchase-modal');
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
    }
    
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        alert('🔍 Dark Search coming soon!');
    }
});

// ========== PAYMENT FORM FUNCTIONALITY ==========

// Get modal elements
const modal = document.getElementById('purchase-modal');
const modalClose = document.querySelector('.modal-close');
const modalProductName = document.getElementById('modal-product-name');
const modalProductPrice = document.getElementById('modal-product-price');

// Product prices database
const productPrices = {
    'FREE FIRE DARK MODE': { base: 49.99 },
    'AIMBOT DARK PRO': { base: 34.99 },
    'ESP DARK MASTER': { base: 29.99 },
    'DARK ALMIGHTY BUNDLE': { base: 149.99 }
};

// Get current product name
function getCurrentProductName() {
    return modalProductName ? modalProductName.textContent : 'FREE FIRE DARK MODE';
}

// Payment Method Selection
const paymentOptions = document.querySelectorAll('.payment-option-card');
const paymentForms = {
    paypal: document.getElementById('paypal-form'),
    crypto: document.getElementById('crypto-form'),
    card: document.getElementById('card-form'),
    bank: document.getElementById('bank-form')
};

let selectedPayment = 'paypal';

paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
        paymentOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        Object.values(paymentForms).forEach(form => {
            if (form) form.style.display = 'none';
        });
        
        const paymentType = option.getAttribute('data-payment');
        selectedPayment = paymentType;
        if (paymentForms[paymentType]) {
            paymentForms[paymentType].style.display = 'block';
        }
    });
});

// TOTAL AMOUNT UPDATE
const totalAmountElement = document.getElementById('total-amount');

function updateTotalAmount(productName) {
    const price = productPrices[productName]?.base || 49.99;
    if (totalAmountElement) {
        totalAmountElement.textContent = '$' + price.toFixed(2);
    }
    return price;
}

// Copy Crypto Address
const copyButtons = document.querySelectorAll('.copy-address');
copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const address = button.getAttribute('data-address');
        try {
            await navigator.clipboard.writeText(address);
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Dark Address Copied!';
            button.style.background = 'var(--gradient-primary)';
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 2000);
        } catch (err) {
            alert('Failed to copy dark address');
        }
    });
});

// Card Number Formatting
const cardNumberInput = document.getElementById('card-number');
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '');
        if (value.length > 16) value = value.slice(0, 16);
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = value;
    });
}

// Expiry Date Formatting
const expiryInput = document.getElementById('card-expiry');
if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\//g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
}

// CVV Formatting
const cvvInput = document.getElementById('card-cvv');
if (cvvInput) {
    cvvInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
    });
}

// Generate Order ID
function generateOrderId() {
    return 'DARK-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 8).toUpperCase();
}

// PRODUCT GET NOW BUTTONS
const productGetButtons = document.querySelectorAll('.btn-product');

productGetButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const productCard = button.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        const productPrice = productCard.querySelector('.price-current').textContent;
        
        if (modalProductName) modalProductName.textContent = productTitle;
        if (modalProductPrice) modalProductPrice.textContent = productPrice;
        
        // Update total amount
        updateTotalAmount(productTitle);
        
        const productIcon = document.getElementById('modal-product-icon');
        if (productIcon) {
            const icons = {
                'FREE FIRE DARK MODE': '<i class="fas fa-fire"></i>',
                'AIMBOT DARK PRO': '<i class="fas fa-crosshairs"></i>',
                'ESP DARK MASTER': '<i class="fas fa-eye"></i>',
                'DARK ALMIGHTY BUNDLE': '<i class="fas fa-gem"></i>'
            };
            productIcon.innerHTML = icons[productTitle] || '<i class="fas fa-skull"></i>';
        }
        
        if (modal) modal.classList.add('active');
    });
});

// Modal Close
if (modalClose) {
    modalClose.addEventListener('click', () => {
        if (modal) modal.classList.remove('active');
    });
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Submit Payment
const submitButton = document.getElementById('submit-payment');
if (submitButton) {
    submitButton.addEventListener('click', () => {
        // Validate Terms
        const termsChecked = document.getElementById('terms');
        if (!termsChecked || !termsChecked.checked) {
            alert('Please agree to the Dark Terms of Service');
            return;
        }
        
        // Get Customer Details
        const customerName = document.getElementById('customer-name')?.value;
        const customerEmail = document.getElementById('customer-email')?.value;
        const customerAddress = document.getElementById('customer-address')?.value;
        
        if (!customerName || !customerEmail || !customerAddress) {
            alert('Please fill in all dark required fields');
            return;
        }
        
        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail)) {
            alert('Please enter a valid dark email address');
            return;
        }
        
        // Get Payment Details based on selected method
        let paymentDetails = {};
        let isValid = true;
        
        switch(selectedPayment) {
            case 'paypal':
                const paypalEmail = document.getElementById('paypal-email')?.value;
                const paypalName = document.getElementById('paypal-name')?.value;
                if (!paypalEmail || !paypalName) {
                    alert('Please enter dark PayPal email and name');
                    isValid = false;
                } else {
                    paymentDetails = { email: paypalEmail, name: paypalName };
                }
                break;
                
            case 'card':
                const cardName = document.getElementById('card-name')?.value;
                const cardNumber = document.getElementById('card-number')?.value;
                const cardExpiry = document.getElementById('card-expiry')?.value;
                const cardCvv = document.getElementById('card-cvv')?.value;
                if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
                    alert('Please enter all dark card details');
                    isValid = false;
                } else if (cardNumber.replace(/\s/g, '').length !== 16) {
                    alert('Please enter a valid 16-digit dark card number');
                    isValid = false;
                } else {
                    paymentDetails = { name: cardName, cardLast4: cardNumber.slice(-4) };
                }
                break;
                
            case 'crypto':
                const txid = document.getElementById('crypto-txid')?.value;
                if (!txid) {
                    alert('Please enter the dark transaction ID');
                    isValid = false;
                } else {
                    paymentDetails = { txid: txid };
                }
                break;
                
            case 'bank':
                const bankRef = document.getElementById('bank-ref')?.value;
                if (!bankRef) {
                    alert('Please enter the dark reference number');
                    isValid = false;
                } else {
                    paymentDetails = { reference: bankRef };
                }
                break;
        }
        
        if (!isValid) return;
        
        // Get product name and total amount
        const productName = modalProductName?.textContent || 'FREE FIRE DARK MODE';
        const totalAmount = totalAmountElement?.textContent || '$49.99';
        
        // Generate Order ID
        const orderId = generateOrderId();
        
        // Collect all order data
        const orderData = {
            orderId: orderId,
            product: productName,
            amount: totalAmount,
            paymentMethod: selectedPayment,
            paymentDetails: paymentDetails,
            customer: {
                name: customerName,
                email: customerEmail,
                phone: document.getElementById('customer-phone')?.value || 'Not provided',
                address: customerAddress,
                city: document.getElementById('customer-city')?.value || 'Not provided',
                zip: document.getElementById('customer-zip')?.value || 'Not provided',
                country: document.getElementById('customer-country')?.value || 'Not provided'
            },
            date: new Date().toISOString(),
            status: 'Dark Order - Awaiting Verification'
        };
        
        // Save to localStorage
        const orders = JSON.parse(localStorage.getItem('EXO_CORP_orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('EXO_CORP_orders', JSON.stringify(orders));
        
        // Show Success Message
        const modalBody = document.querySelector('.modal-body');
        if (modalBody) {
            modalBody.innerHTML = `
                <div class="payment-success">
                    <i class="fas fa-skull"></i>
                    <h3>You Have Ascended to Dark God!</h3>
                    <p>Dark blessings upon you, ${customerName}!</p>
                    <div class="order-details-summary">
                        <div class="summary-item">
                            <strong>Dark Order ID:</strong> 
                            <span>${orderId}</span>
                        </div>
                        <div class="summary-item">
                            <strong>Dark Product:</strong> 
                            <span>${productName}</span>
                        </div>
                        <div class="summary-item">
                            <strong>Dark Amount:</strong> 
                            <span style="color: #ff0000">${totalAmount}</span>
                        </div>
                        <div class="summary-item">
                            <strong>Dark Method:</strong> 
                            <span>${selectedPayment.toUpperCase()}</span>
                        </div>
                    </div>
                    <p>A dark confirmation has been sent to:<br><strong>${customerEmail}</strong></p>
                    <p>Your dark powers will be granted within 24 hours after verification.</p>
                    <button class="btn-primary" onclick="location.reload()" style="margin-top: 25px;">
                        <span>RETURN TO DARK REALM</span>
                        <i class="fas fa-skull"></i>
                    </button>
                </div>
            `;
        }
        
        // Trigger confetti
        showConfetti();
        
        // Log to console
        console.log('%c💀 DARK ORDER RECEIVED 💀', 'color: #ff0000; font-size: 16px; font-weight: bold;');
        console.log(orderData);
    });
}

// ========== CONSOLE DARK MESSAGE ==========
console.log('%c💀 EXO CORP DARK MODE - You Have Ascended to Dark God! 💀', 'color: #ff0000; font-size: 22px; font-weight: bold; text-shadow: 0 0 10px #ff0000;');
console.log('%cDark gaming tools for the chosen ones.', 'color: #8B0000; font-size: 14px;');
console.log('%cClick CLAIM DARK POWER on any product to ascend!', 'color: #660000; font-size: 12px;');