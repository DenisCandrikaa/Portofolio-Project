/* ============================================
   PORTFOLIO WEBSITE — SCRIPT.JS
   Simple & easy-to-understand JavaScript
   ============================================ */

// ===== 1. NAVBAR: Scroll Effect & Active Link =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Tambahkan class "scrolled" saat user menggulir ke bawah
window.addEventListener('scroll', () => {
    // Navbar background muncul setelah scroll 50px
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update link aktif sesuai section yang sedang terlihat
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});


// ===== 2. MOBILE MENU: Toggle Buka/Tutup =====
const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
});

// Tutup menu saat klik link (mobile)
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksContainer.classList.remove('open');
    });
});


// ===== 3. SCROLL REVEAL: Animasi saat elemen muncul =====
function setupRevealAnimations() {
    // Tambah class "reveal" ke elemen-elemen yang ingin dianimasikan
    const elementsToReveal = document.querySelectorAll(
        '.about-grid, .skill-card, .project-card, .contact-grid, .about-stats'
    );

    elementsToReveal.forEach(el => el.classList.add('reveal'));

    // Gunakan Intersection Observer untuk deteksi saat elemen terlihat
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,   // Elemen 10% terlihat = trigger
        rootMargin: '0px 0px -50px 0px'
    });

    elementsToReveal.forEach(el => observer.observe(el));
}

setupRevealAnimations();


// ===== 4. ANGKA COUNTER: Animasi angka naik di About =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 1500; // 1.5 detik
                const startTime = Date.now();

                function updateCounter() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing: mulai lambat, cepat, lalu lambat lagi
                    const easedProgress = 1 - Math.pow(1 - progress, 3);
                    counter.textContent = Math.round(target * easedProgress);

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }

                updateCounter();
                counterObserver.unobserve(counter); // Stop observing setelah selesai
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

animateCounters();


// ===== 5. SKILL BARS: Animasi bar keahlian =====
function animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillFills.forEach(bar => skillObserver.observe(bar));
}

animateSkillBars();


// ===== 6. PARTICLES: Efek partikel di hero =====
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Posisi horizontal acak
        particle.style.left = Math.random() * 100 + '%';

        // Ukuran acak (2px - 5px)
        const size = Math.random() * 3 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Durasi animasi acak (8 - 20 detik)
        particle.style.animationDuration = (Math.random() * 12 + 8) + 's';

        // Delay acak agar tidak muncul bersamaan
        particle.style.animationDelay = (Math.random() * 10) + 's';

        container.appendChild(particle);
    }
}

createParticles();


// ===== 7. FORM: Handling submit form kontak =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Mencegah halaman refresh

    // Ambil nilai dari form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Tampilkan pesan sukses (bisa diganti dengan API call)
    alert(`Terima kasih ${name}! Pesan Anda sudah diterima. Saya akan segera menghubungi Anda di ${email}.`);

    // Reset form
    contactForm.reset();
});


// ===== 8. SMOOTH SCROLL: Scroll halus untuk semua anchor link =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetEl = document.querySelector(targetId);

        if (targetEl) {
            targetEl.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
