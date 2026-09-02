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
            <div class="full-content-section" style="text-align: left;">
                <h4 style="margin-bottom: 1rem; color: var(--accent-color);">1. Detailed Lesson & Storytelling Guide</h4>
                
                <h5 style="color: white;">Segment 1: The Hook — "You Are Here" (5 mins)</h5>
                <p><strong>The Dome Visual &amp; Pale Blue Dot:</strong> Starting focused on Earth, smoothly zooming backward past the Moon, out of the Solar System, to Voyager 1's famous photograph 6 billion km away. Every person who ever lived and every city that ever existed happened on that single blue pixel.</p>
                <div style="background: rgba(255,255,255,0.08); padding: 10px; margin: 10px 0; border-left: 3px solid #60a5fa; border-radius: 4px;">
                    <em style="color: #60a5fa;">"If an alien looked at this tiny pixel from deep space, what would tell them that someone lives here?"</em>
                </div>

                <h5 style="color: white; margin-top: 1.5rem;">Segment 2: How the Solar System Was Born (10 mins)</h5>
                <p><strong>The Collapsing Cloud &amp; Pizza Dough Story:</strong> 4.6 billion years ago, a massive cloud of gas and dust collapsed and flattened into a spinning pancake disc—just like a pizza baker tossing dough into the air. Over 99% of material ignited into the Sun at the center.</p>
                <p><strong>Accretion:</strong> Leftover dust collided and stuck together:</p>
                <div style="background: rgba(0,0,0,0.3); padding: 8px; font-family: monospace; text-align: center; margin: 8px 0; border-radius: 4px; color: #4ade80; font-size: 0.88rem;">
                    Dust Grains &rarr; Sand Pebbles &rarr; Boulders &rarr; City-Sized Asteroids &rarr; Full Planets
                </div>

                <hr style="border: 0; height: 1px; background: rgba(255,255,255,0.1); margin: 2rem 0;">

                <h4 style="margin-bottom: 1rem; color: var(--accent-color);">2. Hands-on Activity: The "Pocket Solar System" Scale Fold (10 mins)</h4>
                <p>Textbook diagrams show planets evenly spaced side-by-side. This tactile folding exercise shatters that myth without requiring a single math formula.</p>
                
                <h6 style="color: #ccc; margin-top: 1rem; margin-bottom: 0.5rem;">Step-by-Step Folding Guide:</h6>
                <ol style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                    <li>Take a 1-meter paper ribbon. Mark <strong>SUN</strong> on the left edge and <strong>PLUTO / EDGE OF SPACE</strong> on the right edge.</li>
                    <li><em>The Prediction:</em> Mark where you think Earth and Mars sit (most predict 25–40 cm across!).</li>
                    <li><strong>Fold 1 (Halfway, 50 cm):</strong> Fold strip in half &rarr; Crease open &rarr; Reveals <strong>URANUS</strong>.</li>
                    <li><strong>Fold 2 (Quarters):</strong> Fold Pluto to Uranus &rarr; <strong>NEPTUNE</strong>. Fold Sun to Uranus &rarr; <strong>SATURN</strong>.</li>
                    <li><strong>Fold 3:</strong> Fold Sun to Saturn &rarr; <strong>JUPITER</strong>.</li>
                    <li><strong>Fold 4:</strong> Fold Sun to Jupiter &rarr; <strong>ASTEROID BELT</strong>.</li>
                    <li><strong>Fold 5:</strong> Fold Sun to Asteroid Belt &rarr; <strong>MARS</strong>.</li>
                    <li><strong>The Final Squeeze:</strong> Fold tiny space between Sun and Mars in half &rarr; <strong>EARTH &amp; VENUS</strong>, with <strong>MERCURY</strong> right next to the Sun!</li>
                </ol>
                
                <div style="background: rgba(249, 115, 22, 0.12); border-left: 4px solid #f97316; padding: 12px; margin: 15px 0; border-radius: 4px;">
                    <strong style="color: #f97316;">The Shock Reveal:</strong> Hold your paper ribbons across the room! All 4 rocky worlds (Mercury, Venus, Earth, Mars) are squeezed into the first <strong>4 centimeters</strong>! The remaining 96 cm is freezing, empty void dominated by gas giants.
                </div>

                <hr style="border: 0; height: 1px; background: rgba(255,255,255,0.1); margin: 2rem 0;">

                <h4 style="margin-bottom: 1rem; color: var(--accent-color);">3. Planetary Science &amp; Bridge to Mars</h4>
                
                <h5 style="color: white;">Segment 3: The Frost Line — The Invisible Fence (8 mins)</h5>
                <p><strong>The Campfire Story:</strong> Near a blazing campfire, ice melts instantly; only heavy rocks and iron can sit near the flames (Inner Solar System). 50 paces back in the cold dark woods, snow never melts (Frost Line). Beyond it, water, methane, and ammonia froze into giant ice snowballs, growing huge gravity wells that swallowed gas to become Gas Giants.</p>

                <h5 style="color: white; margin-top: 1.5rem;">Segment 4: Why Earth Won &amp; Why Mars Dried Up (8 mins)</h5>
                <p><strong>Hot Heartbeat vs. Cold Cup of Tea:</strong> Earth is large, so its core is still boiling molten iron, swirling like a dynamo to wrap a magnetic shield around us. Mars was half our size—like a small cup of tea, its core cooled down and froze billions of years ago. Without a magnetic shield, solar winds stripped Mars' atmosphere into space, freezing its surface and hiding its water underground.</p>

                <h5 style="color: white; margin-top: 1.5rem;">Segment 5: Bridge to "Next Stop: Mars" (4 mins)</h5>
                <div style="background: rgba(96,165,250,0.1); border-left: 4px solid #60a5fa; padding: 12px; margin-top: 10px; border-radius: 4px;">
                    <strong style="color: #60a5fa;">Closing Inquiry:</strong> 
                    <em style="color: #f8fafc; display: block; margin-top: 4px;">"If Mars lost its air and water billions of years ago... why is humanity so obsessed with going there instead of staying safe on Earth?"</em>
                </div>
            </div>
        `
    },
    "2": {
        title: "Session 2",
        subtitle: "Next Stop: Mars",
        img: "assets/session2_telescope_1787848226694.jpg",
        body: `
            <div class="full-content-section" style="text-align: left;">
                <h4 style="margin-bottom: 1rem; color: var(--accent-color);">Part 1: Concept & Exploration Guide</h4>
                
                <h5 style="color: white;">1. Observing the Cosmos: How We See Space</h5>
                <p><strong>What is a Telescope?</strong> An instrument that collects radiation, especially light, from distant objects and brings that information into a form we can study. <em>Bucket Analogy:</em> A small bucket catches a little rain; a huge bucket catches much more. Aperture is the bucket size for collecting light.</p>
                <ul style="margin-bottom: 1.5rem;">
                    <li><strong>Lenses (Refraction):</strong> Bends/refracts light. Used in refracting telescopes. Disadvantages: large lenses are heavy, sag under their own weight.</li>
                    <li><strong>Mirrors (Reflection):</strong> Curved primary mirrors reflect and focus light. Scalable for large observatories and space telescopes.</li>
                </ul>
                
                <h6 style="color: #ccc; margin-bottom: 0.5rem;">Eight Telescope Types Across the Spectrum:</h6>
                <ol style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                    <li><strong>Refracting:</strong> Uses lenses. Simple, low maintenance, sharp for lunar/planetary viewing.</li>
                    <li><strong>Reflecting:</strong> Uses curved mirrors. Scalable to large apertures.</li>
                    <li><strong>Catadioptric:</strong> Uses lenses and mirrors for long focal length in a compact tube.</li>
                    <li><strong>Radio:</strong> Parabolic metal dishes detecting radio waves from cold gas clouds and pulsars.</li>
                    <li><strong>Infrared:</strong> Detects infrared heat radiation; James Webb primarily operates here.</li>
                    <li><strong>Ultraviolet:</strong> Studies hot stars and energetic processes (requires space deployment).</li>
                    <li><strong>X-ray:</strong> Detects high-energy emissions from black holes, neutron stars (e.g., Chandra).</li>
                    <li><strong>Gamma-ray:</strong> Captures the universe's most energetic, violent phenomena.</li>
                </ol>
                
                <h6 style="color: #ccc; margin-bottom: 0.5rem;">Hubble vs. James Webb Space Telescope (JWST)</h6>
                <p>Not an "Old vs. New" replacement, but complementary observatories:</p>
                <ul style="margin-bottom: 2rem;">
                    <li><strong>Hubble:</strong> Observes primarily in visible and ultraviolet wavelengths. Captures sharp optical views of stars and galaxies.</li>
                    <li><strong>JWST:</strong> Primarily observes in the infrared spectrum. Can peer inside star-forming regions and observe the most distant, ancient red-shifted galaxies.</li>
                </ul>

                <h5 style="color: white;">2. Choosing Our Destination: Why Mars?</h5>
                <p><strong>Exploration Criteria:</strong> Liquid water, temperature, atmosphere, solid surface, potential habitability, accessibility, and potential to support human presence.</p>
                <h6 style="color: #ccc; margin-bottom: 0.5rem;">Why Not the Others?</h6>
                <ul style="margin-bottom: 1.5rem;">
                    <li><strong>Mercury:</strong> Extreme solar proximity, thin exosphere, severe temperature extremes.</li>
                    <li><strong>Venus:</strong> Runaway greenhouse effect, crushing atmospheric pressure, lead-melting surface temperatures.</li>
                    <li><strong>Jupiter & Saturn:</strong> Gas giants lacking accessible solid surfaces; intense lethal radiation belts.</li>
                    <li><strong>The Moon:</strong> Close proximity, but has no atmosphere, severe 14-day night freezes, and lacks volatile resources.</li>
                </ul>
                
                <h6 style="color: #ccc; margin-bottom: 0.5rem;">Earth vs. Mars Comparison:</h6>
                <ul style="margin-bottom: 1.5rem;">
                    <li><strong>Liquid Water:</strong> Earth has abundant surface oceans; Mars has subsurface ice and ancient dry riverbeds.</li>
                    <li><strong>Atmosphere:</strong> Earth is thick (Nitrogen/Oxygen rich); Mars is very thin (>95% CO2).</li>
                    <li><strong>Surface Temperature:</strong> Earth has moderate global average; Mars is an extreme cold desert (average -60°C).</li>
                    <li><strong>Surface Gravity:</strong> Earth is 1.00 g; Mars is ≈ 0.38 g (38% of Earth's gravity).</li>
                    <li><strong>Global Magnetic Field:</strong> Earth has a strong field; Mars has no present-day global magnetic field.</li>
                </ul>
                
                <p style="margin-bottom: 2rem;"><strong>Exploration Sequence:</strong> Telescopes observe &rarr; Orbiters map &rarr; Landers touch down &rarr; Rovers explore &rarr; Humans arrive.</p>

                <hr style="border: 0; height: 1px; background: rgba(255,255,255,0.1); margin: 2rem 0;">
                
                <h4 style="margin-bottom: 1rem; color: var(--accent-color);">Part 2: Practical Session Activities</h4>
                
                <h5 style="color: white;">Activity 1: Solar Telescope Observation (15 Mins)</h5>
                <div style="background: rgba(255,50,50,0.1); border-left: 4px solid #ff3232; padding: 15px; margin-bottom: 15px; border-radius: 4px;">
                    <strong style="color: #ff3232;">CRITICAL SOLAR SAFETY WARNING:</strong> Never look directly at the Sun through an unfiltered telescope, finder scope, or with the naked eye. Permanent eye damage or blindness will occur instantly. Only use a certified, undamaged front-aperture solar filter securely attached to the telescope.
                </div>
                <p><strong>Activity Goal:</strong> Students directly operate and view through an optical telescope equipped with a certified front solar filter to safely observe the Sun.</p>
                <h6 style="color: #ccc; margin-bottom: 0.5rem;">Safety & Alignment Protocol:</h6>
                <ol style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                    <li>Inspect the solar filter for pinholes, scratches, or loose fittings before aiming.</li>
                    <li>Securely mount the solar filter over the telescope's main aperture <em>before</em> pointing toward the Sun.</li>
                    <li>Cover or remove the optical finder scope to eliminate secondary eye exposure.</li>
                    <li>Align the telescope using the shadow-casting method.</li>
                </ol>
                <h6 style="color: #ccc; margin-bottom: 0.5rem;">Student Observation Tasks:</h6>
                <ul style="margin-bottom: 2rem;">
                    <li>Observe the solar disk, limb darkening, and active sunspot groups.</li>
                    <li>Identify physical telescope parts: Aperture, tube, focuser, eyepiece, mount, and tripod.</li>
                    <li>Discuss why the filter appears orange/neutral and how it blocks 99.999% of incoming solar irradiance.</li>
                </ul>

                <h5 style="color: white;">Activity 2: Mars Rocket Landing Site Selection (15 Mins)</h5>
                <p><strong>Activity Goal:</strong> Using a high-resolution, labeled Martian topographic map, student engineering teams evaluate geological terrain and select the safest, scientifically highest-value rocket landing site.</p>
                <h6 style="color: #ccc; margin-bottom: 0.5rem;">Engineering Criteria for Rocket Landing:</h6>
                <ol style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                    <li><strong>Elevation & Air Density:</strong> Low-elevation plains offer thicker atmosphere for parachute deceleration; high volcanic plateaus offer too little air to brake safely.</li>
                    <li><strong>Terrain Flatness:</strong> Avoid severe boulder fields, steep crater rims, and deep canyon chasms that cause lander tip-overs.</li>
                    <li><strong>Science & Water Value:</strong> Ancient river deltas (Jezero Crater), lake beds (Gale Crater), and volcanic margins maximize the potential for uncovering past water evidence.</li>
                </ol>
                <h6 style="color: #ccc; margin-bottom: 0.5rem;">Team Execution Workflow:</h6>
                <ul>
                    <li>Groups receive labeled Mars maps showing major features.</li>
                    <li>Teams spend 7 minutes scoring candidate sites on Safety (elevation/slope) vs. Science (water evidence).</li>
                    <li>Each team places a "Rocket Landing Marker" on their chosen site and delivers a 1-minute pitch defending their choice to Mission Control.</li>
                </ul>
            </div>
        `
    },
    "3": {
        title: "Session 3",
        subtitle: "Building the Rocket & Surviving the Landing",
        img: "assets/session4_rocket_1787848241595.jpg",
        body: `
            <div class="full-content-section" style="text-align: left;">
                <h4 style="margin-bottom: 1rem; color: var(--accent-color);">1. Workshop Executive Overview</h4>
                <p>This integrated session combines theoretical mechanics and hands-on rocketry with planetary Entry, Descent, and Landing (EDL) physics. Starting outdoors with a live pneumatic rocket demonstration, the workshop uses an "unsolved launchpad anomaly" to transition students inside to study momentum, aerodynamic streamlining, hypersonic drag, and impulse absorption.</p>
                
                <h4 style="margin-top: 1.5rem; margin-bottom: 1rem; color: var(--accent-color);">2. Complete Pedagogy & Activities</h4>
                
                <h5 style="color: white;">Phase 1: The Outdoor Liftoff (15 mins)</h5>
                <p><strong>The Anomaly:</strong> A dry plastic bottle pressurized to 40 PSI flies only a few meters. But the same bottle filled one-third with water and pressurized to 40 PSI flies 10 times higher!</p>
                
                <h5 style="color: white; margin-top: 1.5rem;">Phase 2: Debrief & Ascent Mechanics (10 mins)</h5>
                <p><strong>The Physics:</strong> Rockets do not push against the ground or air; they accelerate strictly through internal momentum exchange. The compressed air acts as a mechanical spring, violently ejecting the heavy water downward—shoving the rocket skyward (Newton's Third Law).</p>
                <div style="background: rgba(255,255,255,0.1); padding: 10px; font-family: monospace; text-align: center; margin: 10px 0; border-radius: 4px; color: #60a5fa;">
                    F_action = -F_reaction | m &middot; &Delta;v = -v_e &middot; &Delta;m
                </div>
                <p><strong>Stability:</strong> The <em>Center of Mass</em> must always be in front of the <em>Center of Pressure</em>. The fins act like a weather vane, keeping the rocket straight.</p>
                
                <h5 style="color: white; margin-top: 1.5rem;">Phase 3: Activity 1 — Paper Rocket Engineering (15 mins)</h5>
                <p><strong>Demonstration:</strong> We will first showcase real rocket models featuring different nose cone shapes (Flat, Round, Conical, and Parabolic) to discuss aerodynamic resistance and drag.</p>
                <p><strong>Student Challenge:</strong> Students are provided with paper and asked to design and build their own paper rockets based on their own ideas. After construction, we will hold a flight test!</p>
                <p style="margin-bottom: 1.5rem;"><strong>Analysis:</strong> We will take the rocket that flies the longest distance and analyze it as a group. We'll discuss <em>why</em> it flew so far, focusing on the key design points—such as its center of mass, fin stability, and nose cone aerodynamics—that allowed it to fly so efficiently.</p>

                <h5 style="color: white; margin-top: 1.5rem;">Phase 4: The Mars Pivot — Surviving EDL (15 mins)</h5>
                <p>Re-entering Mars' atmosphere flips the rules of aerodynamics. It's known as the <em>Seven Minutes of Terror</em>.</p>
                <ul style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                    <li><strong>Autonomy:</strong> Radio signals take 5-20 mins. The lander must fly and land 100% autonomously.</li>
                    <li><strong>Why We Flip the Shape:</strong> Entering at 20,000 km/h, we <em>want</em> massive drag to brake. We use a wide, <strong>blunt heat shield</strong> to shed 90% of kinetic energy as heat.</li>
                    <li><strong>The Martian Air Deficit:</strong> Mars' atmosphere is less than 2% as dense as Earth's. A parachute alone will not save you.</li>
                    <li><strong>Managing Impulse:</strong> When touching down, you must manage impact force. <code style="color: #60a5fa; background: rgba(255,255,255,0.1); padding: 2px 5px; border-radius: 3px;">Impact Force = &Delta;p / &Delta;t</code>. You must increase stopping time (&Delta;t) using crushable legs or airbags.</li>
                </ul>

                <h5 style="color: white; margin-top: 1.5rem;">Phase 5: Activity 2 — The Mars Lander Drop Test (13 mins)</h5>
                <p>Using a simulated Martian terrain box, test three pre-built lander designs carrying a raw egg:</p>
                <ul style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                    <li><strong>Model A (Rigid Frame):</strong> Narrow stance, stiff legs. <em>Expected: High impact shock; egg breaks.</em></li>
                    <li><strong>Model B (Parachute-Dependent):</strong> Parachute only. <em>Expected: Rapid descent in thin-air; severe damage.</em></li>
                    <li><strong>Model C (Energy Dissipation):</strong> Wide stance, crumple zones, spring pads. <em>Expected: Structure crumples, extending &Delta;t; egg survives.</em></li>
                </ul>

            </div>
        `
    },
    "4": {
        title: "Session 4",
        subtitle: "Exploring Mars & Communicating with Earth",
        img: "assets/session6_rover_1787848286403.jpg",
        body: `
            <div class="full-content-section" style="text-align: left;">
                <h4 style="margin-bottom: 1rem; color: var(--accent-color);">1. Project Overview & Objectives</h4>
                <p>An interactive simulation of a Mars exploration mission where an Arduino-based rover operates on Mars while a laptop acts as Mission Control on Earth. This session demonstrates two major pillars of space exploration: <strong>Exploring Mars with a Rover</strong> and <strong>Communicating with Earth</strong>.</p>
                
                <h6 style="color: #ccc; margin-top: 1rem; margin-bottom: 0.5rem;">Key Learning Objectives:</h6>
                <ul style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                    <li>Understand how robotic rovers explore planetary surfaces and gather environmental data.</li>
                    <li>Learn how commands are transmitted from Earth to Mars through a simulated communication pipeline.</li>
                    <li>Understand why planetary communication involves long light-speed time delays and why autonomous decision-making is necessary.</li>
                    <li>Discover how sensors (ultrasonic) capture obstacle telemetry and return data back to Earth.</li>
                </ul>

                <h4 style="margin-top: 1.5rem; margin-bottom: 1rem; color: var(--accent-color);">2. Communication Pipeline & Demonstration</h4>
                <p>The software models the realistic long-distance delay experienced during Earth-Mars communications:</p>
                <div style="background: rgba(255,255,255,0.08); padding: 12px; font-family: monospace; text-align: center; margin: 12px 0; border-radius: 6px; color: #60a5fa; line-height: 1.6; font-size: 0.88rem;">
                    EARTH &rarr; Laptop &rarr; Command &rarr; 3s Delay &rarr; MARS &rarr; Arduino Rover &rarr; Motors + Ultrasonic Sensor &rarr; Telemetry &rarr; 3s Delay &rarr; Mission Control
                </div>
                
                <h6 style="color: #ccc; margin-top: 1rem; margin-bottom: 0.5rem;">Simulated Mission Workflow (Phases 1–7):</h6>
                <ol style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                    <li><strong>Phase 1 — Introduce Rover:</strong> Overview of 2WD chassis, DC motors, and ultrasonic sensors.</li>
                    <li><strong>Phase 2 — Mission Control Setup:</strong> Setting up Python control GUI on Earth laptop.</li>
                    <li><strong>Phase 3 — Send Commands:</strong> Transmitting <code>FORWARD</code>, <code>BACKWARD</code>, <code>LEFT</code>, <code>RIGHT</code>, <code>STOP</code>, <code>SCAN</code>.</li>
                    <li><strong>Phase 4 — Communication Delay:</strong> Demonstrating enforced delay before rover executes movement.</li>
                    <li><strong>Phase 5 — Explore Mars:</strong> Navigating simulated Martian boulder terrain.</li>
                    <li><strong>Phase 6 — Sensor Integration:</strong> Ultrasonic sensor measuring obstacle distance.</li>
                    <li><strong>Phase 7 — Telemetry Return:</strong> Sending sensor data back to Earth with delay. <em>(Optional: Simulated "Mission Failure" from unhandled delay!)</em></li>
                </ol>

                <hr style="border: 0; height: 1px; background: rgba(255,255,255,0.1); margin: 2rem 0;">

                <h4 style="margin-bottom: 1rem; color: var(--accent-color);">3. Activity: Decoding the Rover's Message (Binary to ASCII)</h4>
                <p>When the rover collects scientific data on Mars, it sends the information back as digital binary data (0s and 1s). Students learn how computers convert binary signals into readable characters using ASCII encoding.</p>
                
                <div style="background: rgba(96,165,250,0.1); border-left: 4px solid #60a5fa; padding: 12px; margin: 15px 0; border-radius: 4px;">
                    <strong>Binary &amp; ASCII Concept:</strong> Binary uses two digits (0 and 1). ASCII maps numbers to letters. <br>
                    <em>Example:</em> Binary <code>01001000</code> &rarr; Decimal <code>72</code> &rarr; Character <strong>'H'</strong>
                </div>

                <h6 style="color: #ccc; margin-top: 1rem; margin-bottom: 0.5rem;">Interactive Challenge — Decode Mission Telemetry:</h6>
                <p>Mission Control receives an incoming binary message from Mars:</p>
                <div style="background: rgba(0,0,0,0.3); padding: 10px; font-family: monospace; text-align: center; margin: 10px 0; border-radius: 4px; color: #4ade80;">
                    01001000 &nbsp; 01000101 &nbsp; 01001100 &nbsp; 01001100 &nbsp; 01001111
                </div>
                
                <p>Decoding character by character:</p>
                <ul style="margin-bottom: 1.5rem; color: var(--text-secondary); list-style-type: none; padding-left: 0;">
                    <li><code>01001000</code> &rarr; Decimal 72 &rarr; <strong>H</strong></li>
                    <li><code>01000101</code> &rarr; Decimal 69 &rarr; <strong>E</strong></li>
                    <li><code>01001100</code> &rarr; Decimal 76 &rarr; <strong>L</strong></li>
                    <li><code>01001100</code> &rarr; Decimal 76 &rarr; <strong>L</strong></li>
                    <li><code>01001111</code> &rarr; Decimal 79 &rarr; <strong>O</strong></li>
                    <li style="margin-top: 8px; color: white;"><strong>Decoded Message: HELLO</strong></li>
                </ul>

                <h6 style="color: #ccc; margin-top: 1rem; margin-bottom: 0.5rem;">Student Practice Challenge:</h6>
                <p>Students decode incoming signal <code>01000001</code> &rarr; Decimal 65 &rarr; <strong>A</strong></p>

                <p style="margin-top: 1.5rem; color: var(--text-secondary);"><strong>Key Takeaway:</strong> Data collected on Mars travels across space as digital binary pulses. Converting Binary &rarr; Decimal &rarr; ASCII allows Mission Control to read telemetry as human-readable messages!</p>
            </div>
        `
    },
    "5": {
        title: "Final Question",
        subtitle: "The Mars Dilemma",
        img: "assets/session3_mars_1787850688797.jpg",
        body: `
            <div style="background: rgba(249, 115, 22, 0.15); border-left: 4px solid #f97316; padding: 20px; margin-top: 10px; border-radius: 6px; text-align: center;">
                <h4 style="color: #f97316; margin-top: 0; margin-bottom: 12px; font-size: 1.2rem;">Final Question to End the Workshop</h4>
                <p style="margin: 0; font-style: italic; color: #f8fafc; font-size: 1.25rem; line-height: 1.6;">"Now that you know how hard it is to get there and survive, would you still go to Mars?"</p>
            </div>
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
