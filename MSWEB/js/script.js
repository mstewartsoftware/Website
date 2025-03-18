document.addEventListener("DOMContentLoaded", function () {
    const loaderContainer = document.querySelector(".loader-container");
    const spiralLoader = document.querySelector(".spiral-loader");
    const loaderLogo = document.querySelector(".loader-logo");
    const mainContent = document.querySelector(".main-content");
    const myName = document.querySelector(".myname");
    const aboutMeBtn = document.getElementById("toggleBtn");
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

        // Set message and type
        toastNotification.textContent = message;
        toastNotification.classList.remove("success", "error"); // Remove old type
        toastNotification.classList.add(type); // Add success or error class

        // Fix display issue
        toastNotification.style.display = "block"; // Ensure it's visible
        toastNotification.classList.add("show");

        // Hide toast after 3 seconds
        setTimeout(() => {
            toastNotification.classList.remove("show");

            // Add delay before hiding display to allow fade-out
            setTimeout(() => {
                toastNotification.style.display = "none";
            }, 500);
        }, 3000);
    }

    // === ABOUT ME PANEL === //
    function hideAboutMe() {
        aboutMeLeft.style.opacity = "0";
        aboutMeRight.style.opacity = "0";
        aboutMeLeft.style.pointerEvents = "none";
        aboutMeRight.style.pointerEvents = "none";
        aboutMeLeft.classList.remove("slide-down");
        aboutMeRight.classList.remove("slide-up");
    }

    function showAboutMe() {
        aboutMeLeft.style.opacity = "1";
        aboutMeRight.style.opacity = "1";
        aboutMeLeft.style.pointerEvents = "auto";
        aboutMeRight.style.pointerEvents = "auto";
        aboutMeLeft.classList.add("slide-down");
        aboutMeRight.classList.add("slide-up");
    }

    function closeAboutMe() {
        console.log("✅ Close button clicked!");
        hideAboutMe();
    }

    closeButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener("click", closeAboutMe);
        }
    });

    hideAboutMe();

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
            // Fade out the spiral smoothly before stopping it
            spiralLoader.style.transition = "opacity 0.5s ease-out";  
            spiralLoader.style.opacity = "0";  

            setTimeout(() => {
                // Now stop the animation AFTER it's faded out
                spiralLoader.style.animation = "none"; 
                spiralLoader.style.transform = "rotate(0deg)"; 

                // Fade out the entire loader container
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
                }, 800); // Delay matches fade-out transition
            }, 500); // Wait for spiral fade-out before stopping animation
        }, 2000); // Loader stays visible for 2 seconds
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