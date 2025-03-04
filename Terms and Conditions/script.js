document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const mobileMenu = document.getElementById("mobile-menu")
    const navMenu = document.querySelector(".nav-menu")
  
    if (mobileMenu) {
      mobileMenu.addEventListener("click", () => {
        mobileMenu.classList.toggle("active")
        navMenu.classList.toggle("active")
  
        // Toggle animation for menu bars
        const bars = document.querySelectorAll(".bar")
        if (mobileMenu.classList.contains("active")) {
          bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)"
          bars[1].style.opacity = "0"
          bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)"
        } else {
          bars[0].style.transform = "rotate(0)"
          bars[1].style.opacity = "1"
          bars[2].style.transform = "rotate(0)"
        }
      })
    }
  
    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("active") &&
        !event.target.closest(".nav-menu") &&
        !event.target.closest(".menu-toggle")
      ) {
        navMenu.classList.remove("active")
        mobileMenu.classList.remove("active")
  
        const bars = document.querySelectorAll(".bar")
        bars[0].style.transform = "rotate(0)"
        bars[1].style.opacity = "1"
        bars[2].style.transform = "rotate(0)"
      }
    })
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          })
  
          // Close mobile menu if open
          if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active")
            mobileMenu.classList.remove("active")
  
            const bars = document.querySelectorAll(".bar")
            bars[0].style.transform = "rotate(0)"
            bars[1].style.opacity = "1"
            bars[2].style.transform = "rotate(0)"
          }
        }
      })
    })
  
    // Add animation to cards when they come into view
    const cards = document.querySelectorAll(".card")
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
      },
    )
  
    cards.forEach((card) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(20px)"
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease"
      observer.observe(card)
    })
  })


  document.getElementById("year").textContent = new Date().getFullYear();
  
  