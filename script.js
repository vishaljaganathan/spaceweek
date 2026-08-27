document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations (Reveals)
    const revealElements = document.querySelectorAll('.reveal, .reveal-right');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(8, 8, 15, 0.9)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(8, 8, 15, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Scroll Animation Logic
    const journeySection = document.getElementById('journey');
    const rocket = document.getElementById('rocket');
    const centerTank = document.getElementById('center-tank');
    const boosterLeft = document.getElementById('booster-left');
    const boosterRight = document.getElementById('booster-right');
    const orbiter = document.getElementById('orbiter');

    window.addEventListener('scroll', () => {
        if (!journeySection || !rocket) return;
        
        const rect = journeySection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate progress from 0 (top of section hits bottom of viewport) 
        // to 1 (bottom of section hits top of viewport)
        let progress = (viewportHeight - rect.top) / (rect.height + viewportHeight);
        
        // Clamp progress between 0 and 1
        progress = Math.max(0, Math.min(1, progress));

        // 1. Assembly phase (0 to 0.2)
        if (progress <= 0.2) {
            let assemblyProgress = progress / 0.2; // 0 to 1
            
            // Fade in to prevent bleeding into other sections
            rocket.style.opacity = Math.max(0, assemblyProgress);
            
            // Tank from top
            let tankY = -150 * (1 - assemblyProgress);
            if (centerTank) centerTank.style.transform = `translate(-50%, ${tankY}px)`;
            
            // Boosters from sides
            let srbLeftX = -150 * (1 - assemblyProgress);
            if (boosterLeft) boosterLeft.style.transform = `translate(calc(-50% - 45px + ${srbLeftX}px), 0px)`;
            
            let srbRightX = 150 * (1 - assemblyProgress);
            if (boosterRight) boosterRight.style.transform = `translate(calc(-50% + 45px + ${srbRightX}px), 0px)`;
            
            // Orbiter from bottom
            let orbiterY = 150 * (1 - assemblyProgress);
            if (orbiter) orbiter.style.transform = `translate(-50%, ${orbiterY}px)`;
            
            // Container stays put
            rocket.classList.remove('flying');
            rocket.style.transform = `translateY(0px)`;
        }
        
        // 2. Attached & Following phase (0.2 to 0.85)
        if (progress > 0.2 && progress <= 0.85) {
            rocket.style.opacity = 1;
            // Lock parts in assembled position
            if (centerTank) centerTank.style.transform = `translate(-50%, 0px)`;
            if (boosterLeft) boosterLeft.style.transform = `translate(calc(-50% - 45px), 0px)`;
            if (boosterRight) boosterRight.style.transform = `translate(calc(-50% + 45px), 0px)`;
            if (orbiter) orbiter.style.transform = `translate(-50%, 0px)`;
            
            // Activate flames (flying) while staying sticky
            rocket.classList.add('flying');
            rocket.style.transform = `translateY(0px)`;
        }
        
        // 3. Flight phase (0.85 to 1.0) flies upwards
        if (progress > 0.85) {
            rocket.style.opacity = 1;
            // Lock parts in assembled position
            if (centerTank) centerTank.style.transform = `translate(-50%, 0px)`;
            if (boosterLeft) boosterLeft.style.transform = `translate(calc(-50% - 45px), 0px)`;
            if (boosterRight) boosterRight.style.transform = `translate(calc(-50% + 45px), 0px)`;
            if (orbiter) orbiter.style.transform = `translate(-50%, 0px)`;
            
            rocket.classList.add('flying');
            let flightProgress = (progress - 0.85) / 0.15;
            rocket.style.transform = `translateY(-${flightProgress * 150}vh)`;
        }
    });

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});
