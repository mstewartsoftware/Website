document.addEventListener("DOMContentLoaded", function () {
    const loaderContainer = document.querySelector(".loader-container");
    const spiralLoader = document.querySelector(".spiral-loader");
    const loaderLogo = document.querySelector(".loader-logo");
    const mainContent = document.querySelector(".main-content");
    const myName = document.querySelector(".myname");
    const aboutMeBtn = document.getElementById("toggleBtn");
    const aboutMeContainer = document.querySelector(".about-me-container");
    const aboutMeLeft = document.querySelector(".about-me-left");
    const aboutMeRight = document.querySelector(".about-me-right");
    const closeButtons = document.querySelectorAll(".close-btn, .return-btn-mobile");
    const contactForm = document.querySelector("form");
    const toastNotification = document.getElementById("toast-notification");
    const canvas = document.getElementById("particleCanvas");

    if (!canvas) {
        console.error("❌ particleCanvas not found!");
        return;
    }

    const ctx = canvas.getContext("2d");

    // === INIT EMAILJS === //
    emailjs.init("g7uTZnLM_Mpn088NT"); // Replace with your actual public key

    // === TOAST NOTIFICATION FUNCTION === //
    function showToast(message, type = "success") {
        if (!toastNotification) {
            console.error("❌ Toast notification element not found!");
            return;
        }

        toastNotification.textContent = message;
        toastNotification.classList.remove("success", "error");
        toastNotification.classList.add(type);
        toastNotification.style.display = "block";
        toastNotification.classList.add("show");

        setTimeout(() => {
            toastNotification.classList.remove("show");
            setTimeout(() => {
                toastNotification.style.display = "none";
            }, 500);
        }, 3000);
    }

    // === ABOUT ME PANEL === //
    function showAboutMe() {
        console.log("✅ Showing About Me Panel");
    
        aboutMeContainer.style.display = "flex"; // Make it visible
    
        setTimeout(() => {
            aboutMeContainer.classList.add("show");
        }, 50);
    }
    
    function hideAboutMe() {
        console.log("❌ Hiding About Me Panel");
    
        aboutMeContainer.classList.remove("show");
    
        setTimeout(() => {
            aboutMeContainer.style.display = "none"; // Hide after animation
        }, 800); // Wait for animation to finish
    }

    aboutMeBtn.addEventListener("click", showAboutMe);
    closeButtons.forEach(btn => btn.addEventListener("click", hideAboutMe));

    closeButtons.forEach(btn => {
        btn.addEventListener("click", hideAboutMe);
    });

    if (aboutMeBtn) {
        aboutMeBtn.addEventListener("click", showAboutMe);
    } else {
        console.warn("⚠️ toggleBtn not found!");
    }

    // === CONTACT FORM SUBMISSION (EMAILJS) === //
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const formData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value,
            };

            emailjs.send("service_vsbcxjs", "template_bmgnwe8", formData)
                .then(() => {
                    showToast("✅ Your message has been sent!", "success");
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error("❌ Error sending email:", error);
                    showToast("⚠️ Something went wrong. Please try again.", "error");
                });
        });
    } else {
        console.warn("⚠️ Contact form not found!");
    }

    // === LOADING SEQUENCE === //
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
                        document.querySelector(".logo").classList.add("show-text");
                        myName.classList.add("show-text");
                        document.querySelector(".blob-btn").classList.add("show-text");
                    }, 1000);
                }, 800);
            }, 500);
        }, 2000);
    }, 1000);

    // === PARTICLES EFFECT === //
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