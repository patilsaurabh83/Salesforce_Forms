// Form submission animation and validation
document.addEventListener("DOMContentLoaded", () => {
    // Add animation to form inputs when focused
    const formInputs = document.querySelectorAll("input, select, textarea")
  
    formInputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("input-focused")
      })
  
      input.addEventListener("blur", function () {
        this.parentElement.classList.remove("input-focused")
      })
    })
  
    // Job Preference Form submission
    const jobPreferenceForm = document.getElementById("jobPreferenceForm")
    if (jobPreferenceForm) {
      jobPreferenceForm.addEventListener("submit", function (e) {
        // You can add form validation here if needed
        const submitBtn = this.querySelector(".submit-btn")
        submitBtn.innerHTML = "Submitting..."
        submitBtn.style.backgroundColor = "#27ae60"
  
        // The form will naturally submit to Salesforce
      })
    }
  
    // Feedback Form submission
    const feedbackForm = document.getElementById("feedbackForm")
    if (feedbackForm) {
      feedbackForm.addEventListener("submit", function (e) {
        // You can add form validation here if needed
        const submitBtn = this.querySelector(".submit-btn")
        submitBtn.innerHTML = "Submitting..."
        submitBtn.style.backgroundColor = "#27ae60"
  
        // The form will naturally submit to Salesforce
      })
    }
  
    // Add subtle animation to form cards on page load
    const formCards = document.querySelectorAll(".form-card")
    formCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`
    })
  })

  document.getElementById("year").textContent = new Date().getFullYear();
  
  