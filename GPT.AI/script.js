// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize particles.js
  initParticles()

  // Initialize theme toggle
  initThemeToggle()

  // Initialize mobile menu
  initMobileMenu()

  // Initialize typewriter effect
  initTypewriter()

  // Initialize scroll animations
  initScrollAnimations()

  // Initialize testimonial carousel
  initTestimonialCarousel()

  // Initialize accordion
  initAccordion()

  // Initialize contact form
  initContactForm()

  // Initialize interactive background
  initInteractiveBackground()

  // Initialize video player
  initVideoPlayer()

  // Initialize credential copy functionality
  initCredentialCopy()

  const subscribeButton = document.getElementById("subscribe-button");
  const emailInput = document.getElementById("subscribe-email");

  // ✅ Add event listener to the button
  if (subscribeButton) {
    subscribeButton.addEventListener("click", handleSubscribe);
  }

  document.getElementById('current-year').textContent = new Date().getFullYear();
})

// Initialize particles.js
function initParticles() {
  // Check if particlesJS is available (e.g., through a CDN or script tag)
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#4f46e5",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#4f46e5",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    })
  } else {
    console.warn("particlesJS not loaded! Make sure to include it in your HTML.")
  }
}

// Initialize theme toggle
function initThemeToggle() {
  const themeButtons = document.querySelectorAll(".theme-button")
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

  // Function to set theme
  function setTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else if (theme === "light") {
      document.body.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else if (theme === "system") {
      // Use system preference
      if (prefersDarkScheme.matches) {
        document.body.classList.add("dark")
      } else {
        document.body.classList.remove("dark")
      }
      localStorage.setItem("theme", "system")
    }

    // Update active button
    themeButtons.forEach((button) => {
      if (button.dataset.theme === theme) {
        button.classList.add("active")
      } else {
        button.classList.remove("active")
      }
    })
  }

  // Check for saved theme preference or use system
  const savedTheme = localStorage.getItem("theme") || "system"

  // Apply the saved theme
  setTheme(savedTheme)

  // Add event listeners to theme buttons
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setTheme(button.dataset.theme)
    })
  })

  // Listen for system preference changes when in system mode
  prefersDarkScheme.addEventListener("change", () => {
    if (localStorage.getItem("theme") === "system") {
      setTheme("system")
    }
  })
}

// Initialize mobile menu
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navLinks = document.querySelector(".nav-links")
  const hamburgerMenu = document.querySelector(".hamburger-menu")

  mobileMenuBtn.addEventListener("click", function () {
    this.classList.toggle("active")

    if (navLinks.style.display === "flex") {
      navLinks.style.display = "none"
    } else {
      navLinks.style.display = "flex"
      navLinks.style.flexDirection = "column"
      navLinks.style.position = "absolute"
      navLinks.style.top = "80px"
      navLinks.style.left = "0"
      navLinks.style.width = "100%"
      navLinks.style.backgroundColor = "var(--background-light)"
      navLinks.style.padding = "1rem"
      navLinks.style.boxShadow = "var(--shadow)"
      navLinks.style.zIndex = "1000"

      // If dark mode is active, apply dark mode styles
      if (document.body.classList.contains("dark")) {
        navLinks.style.backgroundColor = "var(--background-dark)"
      }
    }
  })

  // Close mobile menu when window is resized
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.style = ""
      mobileMenuBtn.classList.remove("active")
    }
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target) && !hamburgerMenu.contains(e.target)) {
      mobileMenuBtn.classList.remove("active")
      navLinks.style.display = ""
    }
  })
}

// Initialize typewriter effect
function initTypewriter() {
  const typewriterElement = document.getElementById("typewriter")
  if (!typewriterElement) return

  const text = typewriterElement.textContent
  typewriterElement.textContent = ""

  let i = 0
  const speed = 50 // typing speed in milliseconds

  function typeWriter() {
    if (i < text.length) {
      typewriterElement.textContent += text.charAt(i)
      i++
      setTimeout(typeWriter, speed)
    }
  }

  // Start the typewriter effect after a short delay
  setTimeout(typeWriter, 1000)
}

// Initialize scroll animations
function initScrollAnimations() {
  // Feature cards animation
  const featureCards = document.querySelectorAll(".feature-card")

  // Steps animation
  const steps = document.querySelectorAll(".step")
  const stepConnectors = document.querySelectorAll(".step-connector")

  // Benefits animation
  const benefitCards = document.querySelectorAll(".benefit-card")

  // Test Page section animation
  const testPageSection = document.querySelector(".test-page")

  // Experience section animation
  const experienceSection = document.querySelector(".experience")
  const videoContainer = document.querySelector(".video-container")

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  // Function to check if element is partially in viewport
  function isPartiallyInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom > 0 &&
      rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
      rect.right > 0
    )
  }

  // Function to handle scroll animations
  function handleScrollAnimations() {
    // Animate feature cards
    featureCards.forEach((card, index) => {
      if (isPartiallyInViewport(card)) {
        // Add delay based on index for staggered animation
        setTimeout(() => {
          card.classList.add("visible")
        }, 150 * index)
      }
    })

    // Animate steps
    steps.forEach((step, index) => {
      if (isPartiallyInViewport(step)) {
        setTimeout(() => {
          step.classList.add("visible")
        }, 200 * index)
      }
    })

    // Animate step connectors
    stepConnectors.forEach((connector, index) => {
      if (isPartiallyInViewport(connector)) {
        setTimeout(() => {
          connector.classList.add("visible")
        }, 300 * index)
      }
    })

    // Animate benefit cards
    benefitCards.forEach((card, index) => {
      if (isPartiallyInViewport(card)) {
        setTimeout(() => {
          card.classList.add("visible")
        }, 150 * index)
      }
    })

    // Animate test page section
    if (testPageSection && isPartiallyInViewport(testPageSection)) {
      testPageSection.classList.add("visible")
    }

    // Animate experience section
    if (experienceSection && isPartiallyInViewport(experienceSection)) {
      if (videoContainer) {
        videoContainer.classList.add("visible")
      }
    }
  }

  // Initial check for elements in viewport
  handleScrollAnimations()

  // Add scroll event listener
  window.addEventListener("scroll", handleScrollAnimations)
}

// Initialize testimonial carousel
function initTestimonialCarousel() {
  const track = document.querySelector(".testimonial-track")
  if (!track) return

  const slides = document.querySelectorAll(".testimonial-card")
  const dots = document.querySelectorAll(".dot")
  const prevButton = document.querySelector(".carousel-prev")
  const nextButton = document.querySelector(".carousel-next")

  let currentIndex = 0
  const slideWidth = 100 // 100%

  // Set initial position
  updateCarousel()

  // Add event listeners to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index
      updateCarousel()
    })
  })

  // Add event listeners to buttons
  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length
    updateCarousel()
  })

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length
    updateCarousel()
  })

  // Auto slide every 5 seconds
  let autoSlideInterval = setInterval(autoSlide, 5000)

  // Pause auto slide on hover
  track.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval)
  })

  track.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(autoSlide, 5000)
  })

  function autoSlide() {
    currentIndex = (currentIndex + 1) % slides.length
    updateCarousel()
  }

  function updateCarousel() {
    // Update track position
    track.style.transform = `translateX(-${currentIndex * slideWidth}%)`

    // Update active dot
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active")
      } else {
        dot.classList.remove("active")
      }
    })
  }
}

// Initialize accordion
function initAccordion() {
  const accordionItems = document.querySelectorAll(".accordion-item")

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header")

    header.addEventListener("click", () => {
      // Toggle active class on the clicked item
      item.classList.toggle("active")

      // Close other accordion items
      accordionItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active")
        }
      })
    })
  })
}

// Initialize contact form
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Simple validation
      if (!name || !email || !subject || !message) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all fields!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000
        });
        return;
      }



      // Create the mailto link
      const mailtoLink = `mailto:gpt.aisearch@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Hello GPT.AI Support,\n\nHope you are doing well.\nThis is regarding:\n\n${message}\n\nThank you,\n${name}\n\nEmail: ${email}`
      )}`;


      // Show Swal info message before opening email
      Swal.fire({
        icon: 'info',
        title: 'Opening Email App...',
        text: 'Please wait while we open your email app.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        // Open email app after Swal closes
        setTimeout(() => {
          window.location.href = mailtoLink;
        }, 100);
      });

      // Reset form
      contactForm.reset();
    });
  }
}


// Initialize interactive background
function initInteractiveBackground() {
  const interactiveBg = document.getElementById("interactive-bg")
  const testPageSection = document.querySelector(".test-page")

  if (interactiveBg) {
    // More subtle and professional mouse tracking
    document.addEventListener("mousemove", (e) => {
      // Calculate mouse position as percentage of window
      const mouseX = (e.clientX / window.innerWidth) * 100
      const mouseY = (e.clientY / window.innerHeight) * 100

      // Update CSS variables with smoother transition
      interactiveBg.style.transition = "background-position 0.3s ease"
      interactiveBg.style.setProperty("--mouse-x", `${mouseX}%`)
      interactiveBg.style.setProperty("--mouse-y", `${mouseY}%`)
    })

    // Add subtle parallax effect to the background
    if (testPageSection) {
      window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY
        const offset = scrollPosition * 0.05 // Adjust the parallax intensity
        testPageSection.style.backgroundPositionY = `-${offset}px`
      })
    }
  }

  // Add click event to login button with improved feedback
  const loginButton = document.querySelector(".login-button")

  if (loginButton) {
    loginButton.addEventListener("click", () => {
      // Add click effect
      loginButton.classList.add("clicked")
      setTimeout(() => {
        loginButton.classList.remove("clicked")
      }, 300)

      window.open("https://innovativeminds-dev-ed.develop.my.site.com/s/login/", "_blank");

    })
  }
}

// Initialize video player
function initVideoPlayer() {
  const video = document.getElementById("demo-video")
  const playButton = document.querySelector(".play-button")

  if (video && playButton) {
    // Auto-play when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((e) => {
              // Auto-play was prevented, show play button
              playButton.style.display = "flex"
            })
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(video)

    // Play/pause on button click
    playButton.addEventListener("click", () => {
      if (video.paused) {
        video.play()
        playButton.style.opacity = "0"
        setTimeout(() => {
          playButton.style.display = "none"
        }, 300)
      } else {
        video.pause()
        playButton.style.display = "flex"
        playButton.style.opacity = "1"
      }
    })

    // Show play button when video is paused
    video.addEventListener("pause", () => {
      playButton.style.display = "flex"
      setTimeout(() => {
        playButton.style.opacity = "1"
      }, 10)
    })

    // Hide play button when video is playing
    video.addEventListener("play", () => {
      playButton.style.opacity = "0"
      setTimeout(() => {
        playButton.style.display = "none"
      }, 300)
    })
  }
}

// Initialize credential copy functionality
function initCredentialCopy() {
  const username = document.getElementById("username")
  const password = document.getElementById("password")

  if (username && password) {
    username.addEventListener("click", function () {
      copyToClipboard(this.textContent)
      this.classList.add("copied")

      setTimeout(() => {
        this.classList.remove("copied")
      }, 2000)
    })

    password.addEventListener("click", function () {
      copyToClipboard(this.textContent)
      this.classList.add("copied")

      setTimeout(() => {
        this.classList.remove("copied")
      }, 2000)
    })
  }

  function copyToClipboard(text) {
    const textarea = document.createElement("textarea")
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    document.body.removeChild(textarea)
  }
}

function handleSubscribe(event) {
  event.preventDefault(); // Prevent form from submitting

  const email = document.getElementById('subscribe-email').value;

  if (!email) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter a valid email address!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    return;
  }
  localStorage.setItem('subscribedEmail', email);

  // ✅ Success Toast
  Swal.fire({
    icon: 'success',
    title: 'Subscribed Successfully!',
    text: `Thank you for subscribing`,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  // ✅ Reset the form after submission
  document.getElementById('subscribe-form').reset();
}

