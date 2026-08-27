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

// --- Session Details Modal Logic ---
const sessionData = {
    "1": {
        title: "Session 1",
        subtitle: "Our Home: Earth & the Solar System",
        img: "assets/session1_earth_1787848213769.jpg",
        body: `
            <div class="qa-section">
                <h5 class="question">Q: How did the Solar System form, and what makes Earth so special?</h5>
                <p class="answer"><strong>A:</strong> Over 4.5 billion years ago, a giant cloud of gas and dust collapsed to form our Sun, with the leftover material clumping together to form the planets. Earth is uniquely special because it sits right in the "Goldilocks Zone"—an orbit that is not too hot and not too cold. This perfect distance allows liquid water to exist on the surface, which is the essential ingredient for life!</p>
            </div>
            <h5>Activity Deep Dive: Scale Model of the Solar System</h5>
            <p>In this hands-on activity, teams will step outside to construct a physical, to-scale model of the Solar System. Using a basketball to represent the Sun, participants will measure out the relative distances to each planet using beads and peppercorns. This exercise provides a mind-blowing perspective on just how vast and empty space truly is, and exactly how far away our destination, Mars, sits from Earth.</p>
            <h5>Learning Objectives:</h5>
            <ul>
                <li>Understand the scale and structure of the Solar System.</li>
                <li>Identify key differences between planetary compositions.</li>
                <li>Grasp the immense distances between celestial bodies.</li>
            </ul>
        `
    },
    "2": {
        title: "Session 2",
        subtitle: "How Do We See Space?",
        img: "assets/session2_telescope_1787848226694.jpg",
        body: `
            <div class="qa-section">
                <h5 class="question">Q: How do we know what a star is made of if we've never been there?</h5>
                <p class="answer"><strong>A:</strong> The answer is hidden entirely in light! By using powerful telescopes to collect ancient light and a technique called <em>spectroscopy</em>, scientists can split that light into a rainbow. Every chemical element in the universe leaves a unique barcode or "fingerprint" in this rainbow, allowing us to read the chemical makeup of galaxies millions of lightyears away.</p>
            </div>
            <h5>Activity Deep Dive: Spectroscopy & Telescopes</h5>
            <p>Participants will get hands-on experience using professional-grade telescopes to focus on distant landscape targets, learning how optics bend and magnify light. Then, using simple diffraction grating slides, teams will look at different gas-discharge lamps (like Neon and Hydrogen) to see their unique emission spectra—essentially learning how to read the "fingerprints" of the stars!</p>
            <h5>Learning Objectives:</h5>
            <ul>
                <li>Understand the basic physics of optics and light collection.</li>
                <li>Learn how to use a real telescope to observe distant objects.</li>
                <li>Use diffraction gratings to identify different gases based on their unique emission spectra.</li>
            </ul>
        `
    },
    "3": {
        title: "Session 3",
        subtitle: "Choosing Our Destination: Why Mars over other planets and satellites?",
        img: "assets/session3.jpg",
        body: `
            <div class="qa-section">
                <h5 class="question">Q: With an entire Solar System to explore, why are we so obsessed with Mars?</h5>
                <p class="answer"><strong>A:</strong> While Venus is a toxic inferno capable of melting lead, and the Moon lacks a protective atmosphere entirely, Mars is the most Earth-like body we can reach. It has a day almost the same length as ours, frozen water at its poles, and geological evidence that rivers once flowed across its surface. It is our best candidate for finding past microbial life and testing our ability to explore another world.</p>
            </div>
            <h5>Activity Deep Dive: Mars Landing Site Selection</h5>
            <p>Teams will be provided with sample maps of the Martian surface sourced online. Working as a group, you must debate and select the optimal landing site for a robotic exploration mission. You'll need to balance the need for flat, safe terrain for the lander with the scientific desire to explore near ancient riverbeds and interesting geological formations.</p>
            <h5>Learning Objectives:</h5>
            <ul>
                <li>Analyze planetary environments to determine habitability.</li>
                <li>Understand the engineering challenges of interplanetary travel.</li>
                <li>Evaluate topological maps to make data-driven mission decisions.</li>
            </ul>
        `
    },
    "4": {
        title: "Session 4",
        subtitle: "Building Our Spacecraft: The Rocket",
        img: "assets/session4_rocket_1787848241595.jpg",
        body: `
            <div class="qa-section">
                <h5 class="question">Q: How do we build a machine powerful enough to escape Earth's gravity?</h5>
                <p class="answer"><strong>A:</strong> We rely on Sir Isaac Newton's Third Law: for every action, there is an equal and opposite reaction! By blasting high-speed exhaust out the bottom, a rocket pushes itself up. Because space is a vacuum with no air, rockets must carry both their fuel and their own oxygen (oxidizer) in massive stages that detach and fall away once they run dry to save weight.</p>
            </div>
            <h5>Activity Deep Dive: Rocket Engineering & Launch</h5>
            <p>It's rocket science time! Teams will design, build, and launch their own paper rockets. You will experiment with different nose cone weights and fin shapes to optimize aerodynamics and stability. Through test flights, teams will learn firsthand the science of how rockets fly, how to control a flight path, and how trajectory works to achieve the best distance and straightest flight.</p>
            <h5>Learning Objectives:</h5>
            <ul>
                <li>Understand the principles of thrust, gravity, and air resistance.</li>
                <li>Learn why staging is necessary to reach orbit.</li>
                <li>Apply engineering design principles to optimize aerodynamic stability.</li>
            </ul>
        `
    },
    "5": {
        title: "Session 5",
        subtitle: "Surviving the Landing: Mars Lander",
        img: "assets/session5_capsule_1787848270483.jpg",
        body: `
            <div class="qa-section">
                <h5 class="question">Q: How do you safely land a multi-million dollar payload on Mars?</h5>
                <p class="answer"><strong>A:</strong> It's an engineering nightmare famously known as the "Seven Minutes of Terror." The Martian atmosphere is thick enough to generate incredible heat and burn up a speeding spacecraft, but it's too thin to slow it down easily with parachutes alone. We have to use a perfectly timed combination of heat shields, supersonic parachutes, and retro-rockets to touch down safely.</p>
            </div>
            <h5>Activity Deep Dive: The Lander Drop Challenge</h5>
            <p>Teams are tasked with designing a landing capsule capable of protecting a highly delicate payload (an egg) from a high-altitude drop onto a hard, rocky surface. Using limited materials like straws, balloons, and foam, teams must engineer shock-absorption and drag mechanisms to ensure their payload survives the brutal impact of a Mars landing.</p>
            <h5>Learning Objectives:</h5>
            <ul>
                <li>Understand atmospheric friction and kinetic energy dissipation.</li>
                <li>Learn the stages of an Entry, Descent, and Landing (EDL) sequence.</li>
                <li>Design and test physical shock-absorbing structures.</li>
            </ul>
        `
    },
    "6": {
        title: "Session 6",
        subtitle: "Exploring Mars with a Rover",
        img: "assets/session6_rover_1787848286403.jpg",
        body: `
            <div class="qa-section">
                <h5 class="question">Q: How do we navigate a rover across an alien landscape filled with boulders and craters?</h5>
                <p class="answer"><strong>A:</strong> We use a special "rocker-bogie" suspension system that allows the rover's wheels to climb over large rocks without tipping the main body. Because Mars is so far away, we can't drive it in real-time with a joystick; instead, the rover uses built-in cameras and autonomous hazard-avoidance software to make its own safe driving decisions!</p>
            </div>
            <h5>Activity Deep Dive: Robotic Rover Navigation</h5>
            <p>Teams will get to interact with a working robotic rover prototype! We will set up a simulated Martian terrain complete with craters and boulders. Teams must write a sequence of commands to navigate the rover through the obstacle course without getting stuck or tipping over, learning firsthand about automated decision making.</p>
            <h5>Learning Objectives:</h5>
            <ul>
                <li>Understand the mechanics of planetary rover mobility.</li>
                <li>Learn how sensors and cameras are used for autonomous navigation.</li>
                <li>Write basic command sequences to navigate physical obstacles.</li>
            </ul>
        `
    },
    "7": {
        title: "Session 7",
        subtitle: "Communicating with Earth",
        img: "assets/session7_satellite_1787848302962.jpg",
        body: `
            <div class="qa-section">
                <h5 class="question">Q: How long does it take for a message to travel from Earth to Mars?</h5>
                <p class="answer"><strong>A:</strong> Even though radio waves travel at the blazing speed of light (300,000 kilometers per second), Mars is so incredibly far away that it takes between 4 and 24 minutes for a single message to arrive, depending on where the planets are in their orbits! This massive time delay completely changes how mission control must communicate with the spacecraft.</p>
            </div>
            <h5>Activity Deep Dive: Mission Control Telemetry Game</h5>
            <p>Experience the frustration and triumph of real mission control! Teams are split into two groups: 'Earth' and 'Mars Rover', placed in separate rooms. They must communicate vital discovery data using only encoded messages, and every message they send is subject to a strict 3-minute enforced time delay. Patience, clarity, and precision are the only way to succeed.</p>
            <h5>Learning Objectives:</h5>
            <ul>
                <li>Understand the electromagnetic spectrum and radio communication.</li>
                <li>Grasp the concept and implications of light-speed time delay.</li>
                <li>Practice clear, encoded communication under strict constraints.</li>
            </ul>
        `
    },
    "8": {
        title: "Final Mission",
        subtitle: "Mission Complete: Martian Base Established",
        img: "assets/session3_mars_1787850688797.jpg",
        body: `
            <div class="qa-section">
                <h5 class="question">Q: What happens immediately after a spacecraft successfully lands on another planet?</h5>
                <p class="answer"><strong>A:</strong> The most critical phase of the mission begins! Before the landing systems power down or the orbital communication satellite passes over the horizon, the automated outpost must rapidly deploy its solar arrays for power, boot up its vital life-support systems, and transmit the historic first pictures back to Earth to confirm success.</p>
            </div>
            <h5>Activity Deep Dive: Integrated Simulation Finale</h5>
            <p>All your training comes down to this! The rover has landed safely, but the mission is just beginning. In this grand finale, all teams must work together in a high-pressure, integrated simulation. Your collaborative objective is to deploy the automated outpost's critical systems before the orbital communication satellite passes over the horizon.</p>
            <h5>Mission Goals:</h5>
            <ul>
                <li>Apply all knowledge gained from previous sessions.</li>
                <li>Demonstrate exceptional teamwork and cross-team communication.</li>
                <li>Successfully complete the sequence of engineering challenges under a strict time limit.</li>
            </ul>
        `
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('session-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalImg = document.getElementById('modal-img');
    const modalBody = document.getElementById('modal-body');

    // Add click event to all explore buttons
    document.querySelectorAll('.explore-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const sessionId = btn.getAttribute('data-session');
            const data = sessionData[sessionId];
            
            if (data) {
                modalTitle.textContent = data.title;
                modalSubtitle.textContent = data.subtitle;
                modalImg.src = data.img;
                modalBody.innerHTML = data.body;
                
                // Show modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close modal logic
    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore background scrolling
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close when clicking outside the modal content
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
