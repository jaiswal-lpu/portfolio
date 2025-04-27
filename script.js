// Initialize AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    })
  
    // Initialize Typed.js
    const typed = new Typed(".typing", {
      strings: ["Aspiring AI Engineer", "Java Developer"],
      typeSpeed: 100,
      backSpeed: 60,
      backDelay: 2000,
      loop: true,
    })
  
    // Theme Toggle
    const themeToggle = document.querySelector(".theme-toggle")
    const body = document.body
  
    // Check for saved theme preference
    if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark-mode")
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    }
  
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode")
  
      if (body.classList.contains("dark-mode")) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
        localStorage.setItem("theme", "dark")
      } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
        localStorage.setItem("theme", "light")
      }
    })
  
    // Mobile Navigation
    const burger = document.querySelector(".burger")
    const nav = document.querySelector(".nav-links")
    const navLinks = document.querySelectorAll(".nav-links li")
  
    burger.addEventListener("click", () => {
      // Toggle Nav
      nav.classList.toggle("active")
  
      // Toggle Burger Animation
      burger.classList.toggle("active")
  
      // Animate Links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = ""
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
        }
      })
    })
  
    // Close mobile menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active")
        burger.classList.remove("active")
      })
    })
  
    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll("section")
    const navItems = document.querySelectorAll(".nav-links a")
  
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute("id")
        }
      })
  
      navItems.forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("href").substring(1) === current) {
          item.classList.add("active")
        }
      })
    })
  
    // Back to Top Button
    const backToTopButton = document.querySelector(".back-to-top")
  
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("active")
      } else {
        backToTopButton.classList.remove("active")
      }
    })
  
    // Project Filtering
    const filterButtons = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        button.classList.add("active")
  
        const filterValue = button.getAttribute("data-filter")
  
        projectCards.forEach((card) => {
          if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
            card.style.display = "block"
            setTimeout(() => {
              card.style.opacity = "1"
              card.style.transform = "scale(1)"
            }, 200)
          } else {
            card.style.opacity = "0"
            card.style.transform = "scale(0.8)"
            setTimeout(() => {
              card.style.display = "none"
            }, 500)
          }
        })
      })
    })
  
    // Animate Progress Bars
    const progressBars = document.querySelectorAll(".progress-bar")
  
    const animateProgressBars = () => {
      progressBars.forEach((bar) => {
        const width = bar.getAttribute("data-width")
        bar.style.width = width + "%"
      })
    }
  
    // Trigger progress bar animation when skills section is in view
    const skillsSection = document.querySelector("#skills")
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateProgressBars()
          }
        })
      },
      { threshold: 0.2 },
    )
  
    observer.observe(skillsSection)
  
    // Form Validation
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        let isValid = true
  
        // Validate Name
        const nameInput = document.getElementById("name")
        const nameError = nameInput.nextElementSibling
  
        if (nameInput.value.trim() === "") {
          nameError.textContent = "Name is required"
          nameError.style.display = "block"
          isValid = false
        } else {
          nameError.style.display = "none"
        }
  
        // Validate Email
        const emailInput = document.getElementById("email")
        const emailError = emailInput.nextElementSibling
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
        if (!emailPattern.test(emailInput.value)) {
          emailError.textContent = "Please enter a valid email address"
          emailError.style.display = "block"
          isValid = false
        } else {
          emailError.style.display = "none"
        }
  
        // Validate Subject
        const subjectInput = document.getElementById("subject")
        const subjectError = subjectInput.nextElementSibling
  
        if (subjectInput.value.trim() === "") {
          subjectError.textContent = "Subject is required"
          subjectError.style.display = "block"
          isValid = false
        } else {
          subjectError.style.display = "none"
        }
  
        // Validate Message
        const messageInput = document.getElementById("message")
        const messageError = messageInput.nextElementSibling
  
        if (messageInput.value.trim() === "") {
          messageError.textContent = "Message is required"
          messageError.style.display = "block"
          isValid = false
        } else if (messageInput.value.trim().length < 20) {
          messageError.textContent = "Message must be at least 20 characters"
          messageError.style.display = "block"
          isValid = false
        } else {
          messageError.style.display = "none"
        }
  
        // If form is valid, you can submit it
        if (isValid) {
          // Here you would typically send the form data to a server
          // For this example, we'll just show a success message
          contactForm.innerHTML = `
            <div class="success-message" style="text-align: center; padding: 50px 0;">
              <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--success-color); margin-bottom: 20px;"></i>
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for contacting me. I'll get back to you soon.</p>
            </div>
          `
  
          // You can also implement EmailJS here
          // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
          //   .then(function() {
          //     console.log('SUCCESS!');
          //   }, function(error) {
          //     console.log('FAILED...', error);
          //   });
        }
      })
    }
  
    // Download CV
    const downloadCV = document.getElementById("download-cv")
  
    if (downloadCV) {
      downloadCV.addEventListener("click", (e) => {
        e.preventDefault()
  
        // In a real scenario, this would be a link to your actual CV file
        alert("In a real implementation, this would download your CV file.")
      })
    }
  })
  