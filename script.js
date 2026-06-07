document.addEventListener('DOMContentLoaded', function() {

    const user = 'info';
    const domain = 'tecnesta.co.jp';

    const emailLink = document.getElementById('email-link');
    if (emailLink) {
        const subject = encodeURIComponent('【お問い合わせ】ホームページより');
        const body = encodeURIComponent('■ 会社名：\n\n■ お名前：\n\n■ ご連絡先メールアドレス：\n\n■ お問い合わせ内容：\n\n');

        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const mailtoLink = 'mail' + 'to:' + user + '@' + domain + '?subject=' + subject + '&body=' + body;
            window.location.href = mailtoLink;
        });
    }

    const header = document.querySelector('.header');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.values, .about-grid, .service-card, .contact-grid, .section-header, .value-item').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    const footerEmailLink = document.getElementById('footer-email');
    if (footerEmailLink) {
        footerEmailLink.textContent = user + '@' + domain;
        footerEmailLink.href = 'mail' + 'to:' + user + '@' + domain;
    }

    const companyEmail = document.getElementById('company-email');
    if (companyEmail) {
        companyEmail.textContent = user + '@' + domain;
    }

    const heroContent = document.querySelector('.hero-content');
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;

        if (scrolled < heroHeight) {
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.8;
            }

            shapes.forEach((shape, index) => {
                const speed = 0.1 + (index * 0.05);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    });

    const cards = document.querySelectorAll('.service-card, .about-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
