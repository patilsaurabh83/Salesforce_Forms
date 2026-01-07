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


        
    // Function to get URL parameters
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            candidateNumber: params.get("CNo"),
            candidateId: params.get("Cid"),
            email: params.get("Email"),
            jobNo: params.get("JobNo")
        };
    }

    // Populate form fields with URL parameters and make them readonly
    const urlParams = getUrlParams();

    // Save params to sessionStorage if present
    if (urlParams.candidateNumber) sessionStorage.setItem("candidateNumber", urlParams.candidateNumber);
    if (urlParams.candidateId) sessionStorage.setItem("candidateId", urlParams.candidateId);
    if (urlParams.email) sessionStorage.setItem("email", urlParams.email);
    if (urlParams.jobNo) sessionStorage.setItem("jobNo", urlParams.jobNo);

    // Retrieve from sessionStorage if not in URL (for refresh)
    const candidateNumber = urlParams.candidateNumber || sessionStorage.getItem("candidateNumber");
    const candidateId = urlParams.candidateId || sessionStorage.getItem("candidateId");
    const email = urlParams.email || sessionStorage.getItem("email");
    const jobNo = urlParams.jobNo || sessionStorage.getItem("jobNo");

    // Populate Candidate Number
    if (candidateNumber) {
        const candidateNumberField = document.getElementById("00N5j00000UPc6a");
        if (candidateNumberField) {
            candidateNumberField.value = candidateNumber;
            candidateNumberField.readOnly = true;
        }
    }

    // Populate Candidate ID
    if (candidateId) {
        const candidateIdField = document.getElementById("00N5j00000UPc6V");
        if (candidateIdField) {
            candidateIdField.value = candidateId;
            candidateIdField.readOnly = true;
        }
    }

    // Populate Email
    if (email) {
        const emailField = document.getElementById("job-email");
        if (emailField) {
            emailField.value = email;
            emailField.readOnly = true;
        }
    }

    // Interested In Job - FILL BUT DO NOT MAKE READONLY
    if (jobNo) {
        const jobField = document.getElementById("00N5j00000SCZQn");
        if (jobField) {
            jobField.value = jobNo; 
            // Notice: readOnly is NOT set to true here
            console.log("Job Number pre-filled: " + jobNo);
        }
    }

    // Normalize the URL (remove query params without reloading)
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, "", cleanUrl);
  
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
  

  

