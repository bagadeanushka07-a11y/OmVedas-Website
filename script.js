// ==================== LOADER - FIXED ====================
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after 1.5 seconds
    setTimeout(function() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }, 1500);
});

// Emergency loader hide (if DOMContentLoaded already fired)
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(function() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }, 500);
}

// ==================== DARK MODE ====================
const darkToggle = document.getElementById('darkToggle');
let isDark = false;

if (darkToggle) {
    darkToggle.addEventListener('click', () => {
        isDark = !isDark;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        darkToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// ==================== NAVBAR ====================
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('open');
    }
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks')?.classList.remove('open');
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ==================== BOTTOM NAV ACTIVE ====================
document.querySelectorAll('.bottom-nav a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.bottom-nav a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ==================== BACK TO TOP ====================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (backToTop) {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== PARTICLES ====================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 25;
    const symbols = ['🕉️', '✨', '🌸', '🌺', '🪷'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 18 + 10}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.25 + 0.05};
            animation: floatParticle ${Math.random() * 15 + 10}s linear infinite;
            animation-delay: ${Math.random() * 8}s;
            pointer-events: none;
            user-select: none;
        `;
        container.appendChild(particle);
    }
}

// Add particle animation keyframes (only once)
if (!document.getElementById('particleStyles')) {
    const style = document.createElement('style');
    style.id = 'particleStyles';
    style.textContent = `
        @keyframes floatParticle {
            0% { transform: translate(0, 0) rotate(0deg) scale(1); }
            25% { transform: translate(40px, -80px) rotate(90deg) scale(1.2); }
            50% { transform: translate(-20px, -160px) rotate(180deg) scale(0.8); }
            75% { transform: translate(30px, -240px) rotate(270deg) scale(1.1); }
            100% { transform: translate(0, -320px) rotate(360deg) scale(1); }
        }
    `;
    document.head.appendChild(style);
}

createParticles();

// ==================== COUNTER ANIMATION ====================
function animateCounters() {
    const counters = document.querySelectorAll('.counter, .stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.getAttribute('data-target'));
                const duration = 2000;
                const startTime = Date.now();
                
                const updateCounter = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const value = progress * target;
                    
                    if (target >= 1) {
                        entry.target.textContent = Math.floor(value).toLocaleString();
                    } else {
                        entry.target.textContent = value.toFixed(1);
                    }
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target.toLocaleString();
                    }
                };
                
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ==================== SERVICES DATA WITH HINDI NAMES ====================
const servicesData = [
    { 
        name: 'Satyanarayan Puja (सत्यनारायण पूजा)', 
        desc: 'Worship of Lord Vishnu for prosperity and happiness.', 
        duration: '2-3 hrs', 
        ideal: 'Any Occasion', 
        image: 'satyanarayan.jpg' 
    },
    { 
        name: 'Ganesh Puja (गणेश पूजा)', 
        desc: 'Removes obstacles and blesses with wisdom and success.', 
        duration: '1.5 hrs', 
        ideal: 'New Beginnings', 
        image: 'ganesh.jpg' 
    },
    { 
        name: 'Lakshmi Puja (लक्ष्मी पूजा)', 
        desc: 'Invokes wealth, prosperity, and abundance.', 
        duration: '2 hrs', 
        ideal: 'Diwali, Friday', 
        image: 'lakshmi.jpg' 
    },
    { 
        name: 'Griha Pravesh (गृह प्रवेश)', 
        desc: 'House warming ritual for peace and positive energy.', 
        duration: '2 hrs', 
        ideal: 'New Home', 
        image: 'griha-pravesh.jpg' 
    },
    { 
        name: 'Vastu Shanti (वास्तु शांति)', 
        desc: 'Harmonizes energies of the space for prosperity.', 
        duration: '3 hrs', 
        ideal: 'Office/Home', 
        image: 'vastu.jpg' 
    },
    { 
        name: 'Navagraha Shanti (नवग्रह शांति)', 
        desc: 'Pacifies planetary influences for balance.', 
        duration: '3 hrs', 
        ideal: 'Astrological', 
        image: 'navagraha.jpg' 
    },
    { 
        name: 'Maha Mrityunjaya (महा मृत्युंजय)', 
        desc: 'Powerful mantra for health and longevity.', 
        duration: '2 hrs', 
        ideal: 'Health', 
        image: 'mrityunjaya.jpg' 
    },
    { 
        name: 'Rudrabhishek (रुद्राभिषेक)', 
        desc: 'Shiva ritual for blessings and protection.', 
        duration: '3 hrs', 
        ideal: 'Monday, Shivratri', 
        image: 'rudrabhishek.jpg' 
    },
    { 
        name: 'Wedding Ceremony (विवाह संस्कार)', 
        desc: 'Grand Vedic wedding rituals with all traditions.', 
        duration: '4-6 hrs', 
        ideal: 'Weddings', 
        image: 'wedding.jpg' 
    },
    { 
        name: 'Baby Naming (नामकरण संस्कार)', 
        desc: 'Namkaran ceremony with Vedic blessings.', 
        duration: '2 hrs', 
        ideal: 'Newborn', 
        image: 'baby-naming.jpg' 
    },
    { 
        name: 'Engagement Ceremony (सगाई / मंगनी)', 
        desc: 'Sacred engagement rituals with Vedic blessings.', 
        duration: '2 hrs', 
        ideal: 'Engagement', 
        image: 'engagement.jpg' 
    },
    { 
        name: 'Thread Ceremony (यज्ञोपवीत संस्कार)', 
        desc: 'Upanayana sacred thread ceremony for spiritual growth.', 
        duration: '3 hrs', 
        ideal: 'Brahmacharya', 
        image: 'thread.jpg' 
    },
    { 
        name: 'Pitru Dosh Puja (पितृ दोष पूजा)', 
        desc: 'Remedies for ancestor curses and peace for departed souls.', 
        duration: '2 hrs', 
        ideal: 'Pitru Paksha', 
        image: 'pitru.jpg' 
    },
    { 
        name: 'Kaal Sarp Dosh (काल सर्प दोष)', 
        desc: 'Special puja to remove Kaal Sarp Dosh from horoscope.', 
        duration: '3 hrs', 
        ideal: 'Astrology', 
        image: 'kaal-sarp.jpg' 
    },
    { 
        name: 'Navchandi Yagya (नवचंडी यज्ञ)', 
        desc: 'Nine forms of Durga worship for divine blessings.', 
        duration: '5 hrs', 
        ideal: 'Navratri', 
        image: 'navchandi.jpg' 
    },
    { 
        name: 'Durga Puja (दुर्गा पूजा)', 
        desc: 'Worship of Goddess Durga for strength and protection.', 
        duration: '3 hrs', 
        ideal: 'Navratri', 
        image: 'durga.jpg' 
    },
    { 
        name: 'Hanuman Puja (हनुमान पूजा)', 
        desc: 'Strength and protection through Lord Hanuman.', 
        duration: '1.5 hrs', 
        ideal: 'Tuesday, Saturday', 
        image: 'hanuman.jpg' 
    },
    { 
        name: 'Office Opening (कार्यालय पूजा)', 
        desc: 'Vastu & puja for new office inauguration.', 
        duration: '2 hrs', 
        ideal: 'New Business', 
        image: 'office-opening.jpg' 
    },
    { 
        name: 'Vehicle Puja (वाहन पूजा)', 
        desc: 'Blessing for new vehicle for safety and success.', 
        duration: '1 hr', 
        ideal: 'New Car/Bike', 
        image: 'vehicle.jpg' 
    },
    { 
        name: 'Bhoomi Pujan (भूमि पूजन)', 
        desc: 'Ground breaking ceremony for construction projects.', 
        duration: '2 hrs', 
        ideal: 'Construction', 
        image: 'bhoomi-pujan.jpg' 
    },
    { 
        name: 'Mundan Sanskar (मुंडन संस्कार)', 
        desc: 'First haircut ceremony for babies with Vedic rituals.', 
        duration: '2 hrs', 
        ideal: 'Babies', 
        image: 'mundan.jpg' 
    }
];

// ==================== PLACEHOLDER IMAGE (Base64) ====================
const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f0e6d8"/%3E%3Ctext x="200" y="150" font-family="Arial" font-size="18" fill="%237B1113" text-anchor="middle" dominant-baseline="middle"%3E🪷 Image Coming Soon%3C/text%3E%3C/svg%3E';

// Render Services
function renderServices(filter = '') {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    const filtered = servicesData.filter(s => 
        s.name.toLowerCase().includes(filter.toLowerCase()) ||
        s.desc.toLowerCase().includes(filter.toLowerCase())
    );
    
    filtered.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="card-content">
                <div class="service-img">
                    <img src="assets/images/services/${service.image}" 
                         alt="${service.name}" 
                         onerror="this.src='${PLACEHOLDER_IMAGE}'" />
                </div>
                <h3>${service.name}</h3>
                <p>${service.desc}</p>
                <div class="service-meta">
                    <span>⏱ ${service.duration}</span>
                    <span>🎯 ${service.ideal}</span>
                </div>
                <a href="#contact" class="service-book-btn">Book Now</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Service Search
const searchInput = document.getElementById('serviceSearch');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        renderServices(this.value);
    });
}

// ==================== TESTIMONIALS ====================
const testimonialData = [
    { name: 'Ramesh Raut', location: 'Mumbai', text: 'OmVeda made our Satyanarayan Puja truly special. Pandit ji was very knowledgeable and helpful.', rating: 5, image: 'ramesh-raut.jpg' },
    { name: 'Arun Iyer', location: 'Chennai', text: 'Professional service! We booked online puja and everything was perfect. Highly recommended.', rating: 5, image: 'arun-iyer.jpg' },
    { name: 'Priya Sharma', location: 'Delhi', text: 'The wedding ceremony was beautiful. All guests appreciated the Vedic rituals performed with perfection.', rating: 5, image: 'priya-sharma.jpg' },
];

let currentTestimonial = 0;

function renderTestimonials() {
    const track = document.getElementById('testimonialTrack');
    if (!track) return;
    track.innerHTML = '';
    
    testimonialData.forEach((t) => {
        const item = document.createElement('div');
        item.className = 'testimonial-item';
        item.innerHTML = `
            <div class="testimonial-card">
                <img src="assets/images/clients/${t.image}" 
                     alt="${t.name}" 
                     class="testimonial-avatar" 
                     onerror="this.src='${PLACEHOLDER_IMAGE}'" />
                <h4>${t.name}</h4>
                <p class="location">${t.location}</p>
                <p class="review">“${t.text}”</p>
                <div class="stars">${'⭐'.repeat(t.rating)}</div>
            </div>
        `;
        track.appendChild(item);
    });
    
    updateTestimonialDots();
    showTestimonial(0);
}

function showTestimonial(index) {
    const track = document.getElementById('testimonialTrack');
    if (!track) return;
    const items = track.children;
    if (items.length === 0) return;
    
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    
    currentTestimonial = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    document.querySelectorAll('.testimonial-dots span').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function updateTestimonialDots() {
    const container = document.getElementById('testimonialDots');
    if (!container) return;
    container.innerHTML = '';
    
    testimonialData.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = i === 0 ? 'active' : '';
        dot.addEventListener('click', () => showTestimonial(i));
        container.appendChild(dot);
    });
}

const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial - 1);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial + 1);
    });
}

// Auto slide testimonials
let testimonialInterval;

function startTestimonialAutoSlide() {
    stopTestimonialAutoSlide();
    testimonialInterval = setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 5000);
}

function stopTestimonialAutoSlide() {
    clearInterval(testimonialInterval);
}

const slider = document.querySelector('.testimonial-slider');
if (slider) {
    slider.addEventListener('mouseenter', stopTestimonialAutoSlide);
    slider.addEventListener('mouseleave', startTestimonialAutoSlide);
}

// ==================== GALLERY ====================
const galleryImages = [
    'gallery-1.jpg', 'gallery-2.jpg', 'gallery-3.jpg', 'gallery-4.jpg',
    'gallery-5.jpg', 'gallery-6.jpg', 'gallery-7.jpg', 'gallery-8.jpg'
];

function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    galleryImages.forEach(img => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="assets/images/gallery/${img}" 
                 alt="Gallery" 
                 onerror="this.src='${PLACEHOLDER_IMAGE}'" />
            <div class="gallery-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        `;
        item.addEventListener('click', () => openLightbox(`assets/images/gallery/${img}`));
        grid.appendChild(item);
    });
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');

function openLightbox(src) {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

const closeBtn = document.getElementById('closeLightbox');
if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// ==================== FAQ ====================
const faqData = {
    general: [
        { q: 'What is OmVeda?', a: 'OmVeda is a platform connecting you with authentic Vedic pandits for all religious ceremonies and rituals.' },
        { q: 'Are the pandits qualified?', a: 'Yes, all our pandits are Vedic scholars with years of experience in performing rituals.' },
        { q: 'Do you offer online puja?', a: 'Yes, we offer online puja services via video call for devotees who cannot attend in person.' },
    ],
    booking: [
        { q: 'How do I book a puja?', a: 'Simply fill out the contact form or call us directly. We\'ll confirm availability within 2 hours.' },
        { q: 'What is the cancellation policy?', a: 'You can cancel within 24 hours of booking for a full refund.' },
        { q: 'How far in advance should I book?', a: 'We recommend booking at least 7 days in advance for major ceremonies.' },
    ],
    services: [
        { q: 'What puja samagri is included?', a: 'We provide all standard puja samagri. Premium packages include premium items.' },
        { q: 'Can I customize the ritual?', a: 'Absolutely! We personalize every puja according to your family traditions.' },
        { q: 'Which cities do you serve?', a: 'We serve all major cities across India. Contact us for specific locations.' },
    ]
};

function renderFAQ(tab = 'general') {
    const container = document.getElementById('faqContainer');
    if (!container) return;
    container.innerHTML = '';
    
    faqData[tab].forEach((item) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <div class="faq-question" onclick="toggleFAQ(this)">
                <span>${item.q}</span>
                <span class="faq-icon">+</span>
            </div>
            <div class="faq-answer">${item.a}</div>
        `;
        container.appendChild(faqItem);
    });
}

function toggleFAQ(element) {
    const item = element.closest('.faq-item');
    if (!item) return;
    const isActive = item.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('active'));
    
    if (!isActive) {
        item.classList.add('active');
    }
}

// FAQ Tabs
document.querySelectorAll('.faq-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.faq-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        renderFAQ(this.getAttribute('data-tab'));
    });
});

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you! Your inquiry has been sent. We will contact you shortly. 🪷');
        this.reset();
    });
}

// ==================== NEWSLETTER ====================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing to OmVeda newsletter! 📬');
        this.reset();
    });
}

// ==================== SCROLL REVEAL ====================
function revealElements() {
    const reveals = document.querySelectorAll('.service-card, .why-card, .pricing-card, .pandit-card, .stat-item, .gallery-item, .about-grid > *');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    reveals.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ==================== HERO VIDEO FALLBACK ====================
const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
    heroVideo.addEventListener('error', function() {
        this.style.display = 'none';
        const fallback = document.createElement('img');
        fallback.src = 'assets/images/hero-bg.jpg';
        fallback.className = 'hero-video';
        fallback.alt = 'Hero Background';
        fallback.onerror = function() {
            this.src = PLACEHOLDER_IMAGE;
        };
        if (this.parentNode) {
            this.parentNode.insertBefore(fallback, this);
        }
    });
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', function() {
    renderServices();
    renderTestimonials();
    renderGallery();
    renderFAQ('general');
    
    setTimeout(() => {
        animateCounters();
        revealElements();
        startTestimonialAutoSlide();
    }, 800);
    
    console.log('🪷 OmVeda - Divine Rituals & Vedic Services');
    console.log('✨ Where Ancient Wisdom Meets Modern Grace');
});