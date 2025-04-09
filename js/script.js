document.addEventListener("DOMContentLoaded", function () {
    const loaderContainer = document.querySelector(".loader");
    const spiralLoader = document.querySelector(".spiral-loader");
    const loaderLogo = document.querySelector(".loader-logo");
    const mainContent = document.querySelector(".main-content");
    const myName = document.querySelector(".myname");
    const logo = document.querySelector(".logo");
    const aboutMeBtn = document.getElementById("toggleBtn");
    const aboutMeContainer = document.querySelector(".about-me-container");
    const closeButtons = document.querySelectorAll(".close-btn, .return-btn-mobile");
    const canvas = document.getElementById("particleCanvas");
    const socialMenuIcon = document.getElementById("socialMenuIcon");
    const socialDropdown = document.getElementById("socialDropdown");
    const socialLinks = document.querySelector(".social-links");

    // DARK MODE //

    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const modeIcon = darkModeToggle.querySelector("img");

    // Function to toggle dark mode and update the icon
    function toggleDarkMode() {
        const backgroundLogo = document.querySelector(".background-logo img");
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");

        // Update the mode icon
        modeIcon.src = isDarkMode ? "/img/mode/dark.png" : "/img/mode/light.png";

        // Change background logo if applicable
        if (backgroundLogo) {
            backgroundLogo.src = isDarkMode ? "img/logo/hotdog.png" : "img/logo/hotdog-dm.png";
        }

        // Update social and tech icons based on dark mode
        updateIcons();
    }

    // Add event listener to toggle mode when clicking the button
    darkModeToggle.addEventListener("click", toggleDarkMode);

    // === Social & Tech Icons Update === //
    function updateIcons() {
        // Update Social Icons
        const socialIcons = document.querySelectorAll(".social-links img");

        socialIcons.forEach(icon => {
            const isDarkMode = document.body.classList.contains("dark-mode");
            if (icon.alt === "LinkedIn") {
                icon.src = isDarkMode ? "img/social/lin-dark.png" : "img/social/lin.png";
            } else if (icon.alt === "GitHub") {
                icon.src = isDarkMode ? "img/social/git-dark.png" : "img/social/git.png";
            }
        });

        // Update Tech Logos (only changing normal/dark mode, hover is handled in CSS)
        const techLogos = document.querySelectorAll(".tech-logo");

        techLogos.forEach(logo => {
            const isDarkMode = document.body.classList.contains("dark-mode");
            const logoClass = logo.classList[1]; // Get the tech stack name (html, css, js, etc.)

            // Remove inline styles (prevents JS from overriding CSS hover effects)
            logo.style.backgroundImage = "";

            // Ensure correct class is applied for dark mode
            if (isDarkMode) {
                logo.classList.add("dark-mode");
            } else {
                logo.classList.remove("dark-mode");
            }
        });
    }



    if (!canvas) {
        console.error("❌ particleCanvas not found!");
        return;
    }

    const ctx = canvas.getContext("2d");

    function adjustMyNamePosition() {
        if (window.innerWidth < 992) {
            myName.style.left = "50%";
            myName.style.transform = "translate(-50%, 0)";
            myName.style.textAlign = "center";
        } else {
            myName.style.left = "";
            myName.style.transform = "";
            myName.style.textAlign = "";
        }
    }

    window.addEventListener("resize", adjustMyNamePosition);
    adjustMyNamePosition();

    function toggleSocialMenu() {
        if (socialDropdown.style.display === "block") {
            socialDropdown.style.opacity = "0";
            setTimeout(() => {
                socialDropdown.style.display = "none";
            }, 300);
        } else {
            socialDropdown.style.display = "block";
            setTimeout(() => {
                socialDropdown.style.opacity = "1";
            }, 10);
        }
    }

    if (socialMenuIcon) {
        socialMenuIcon.addEventListener("click", toggleSocialMenu);
    }

    function checkScreenSize() {
        if (window.innerWidth < 900) {
            if (socialLinks) socialLinks.style.display = "none";
            if (socialMenuIcon) socialMenuIcon.style.display = "block";
        } else {
            if (socialLinks) socialLinks.style.display = "flex";
            if (socialMenuIcon) socialMenuIcon.style.display = "none";
            if (socialDropdown) socialDropdown.style.display = "none";
        }
    }

    window.addEventListener("resize", checkScreenSize);
    checkScreenSize();

    function showAboutMe() {
        aboutMeContainer.style.display = "flex";
        setTimeout(() => {
            aboutMeContainer.classList.add("show");
        }, 50);
    }

    function hideAboutMe() {
        aboutMeContainer.classList.remove("show");
        setTimeout(() => {
            aboutMeContainer.style.display = "none";
        }, 800);
    }

    aboutMeBtn.addEventListener("click", showAboutMe);
    closeButtons.forEach(btn => btn.addEventListener("click", hideAboutMe));

    setTimeout(() => {
        loaderLogo.style.opacity = "1";
        spiralLoader.style.opacity = "1";

        setTimeout(() => {
            spiralLoader.style.transition = "opacity 0.5s ease-out";
            spiralLoader.style.opacity = "0";

            setTimeout(() => {
                spiralLoader.style.animation = "none";
                spiralLoader.style.transform = "rotate(0deg)";
                loaderContainer.style.transition = "opacity 0.8s ease-out";
                loaderContainer.style.opacity = "0";

                setTimeout(() => {
                    loaderContainer.style.display = "none";
                    document.body.classList.add("show-black-screen");

                    setTimeout(() => {
                        mainContent.classList.add("show-content");
                        document.querySelector(".blob-btn").classList.add("show-text");
                        document.querySelector(".menu-icon").style.opacity = "1";

                        if (logo) {
                            logo.style.transition = "opacity 1s ease-in-out";
                            logo.style.opacity = "1";
                        }

                        setTimeout(() => {
                            const myNameContainer = document.querySelector(".myname-container");
                            const revealBox = document.querySelector(".reveal-box");

                            if (myNameContainer && revealBox) {
                                myNameContainer.style.opacity = "1";
                                revealBox.classList.add("start-reveal");
                            }

                            setTimeout(() => {
                                const buttonRevealBox = document.querySelector(".button-reveal-box");
                                if (buttonRevealBox) {
                                    buttonRevealBox.classList.add("start-reveal");
                                }

                                setTimeout(() => {
                                    const studentDescriptionContainer = document.querySelector(".student-description-container");

                                    if (studentDescriptionContainer) {
                                        studentDescriptionContainer.classList.add("start-reveal");
                                    }
                                },);
                            }, 200);
                        }, 1000);
                    }, 1000);
                }, 800);
            }, 500);
        }, 2000);
    }, 1000);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 1;
            this.speedY = (Math.random() - 0.5) * 1;
            this.alpha = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = `rgba(200, 200, 200, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    let particlesArray = [];
    const numParticles = 80;

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numParticles; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            particlesArray.push(new Particle(x, y));
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particlesArray.forEach((particle) => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    animateParticles();
    window.addEventListener("resize", resizeCanvas);
});