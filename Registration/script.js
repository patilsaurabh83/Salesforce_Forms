document.addEventListener("DOMContentLoaded", () => {
  // Initialize form sections
  const sections = document.querySelectorAll("section")
  const progressSteps = document.querySelectorAll(".progress-step")
  const progress = document.getElementById("progress")
  const prevButton = document.getElementById("prevButton")
  const nextButton = document.getElementById("nextButton")
  const errorContainer = document.getElementById('errorMessage');
  const submitButton = document.querySelector(".submit-btn");
  let currentSection = 0
  emailjs.init("IUEiA1PG261h3D_ny");
  document.getElementById("phoneVerifyButtonMark").style.display = "none";
  document.getElementById("emailVerifyButtonMark").style.display = "none";


  // // Hide mobile message if user wants to continue
  // const mobileMessage = document.getElementById("mobileMessage")
  // const continueMobileBtn = document.getElementById("continueMobile")

  // if (continueMobileBtn) {
  //   continueMobileBtn.addEventListener("click", () => {
  //     mobileMessage.style.display = "none"
  //   })
  // }

  // // Check if mobile
  // function isMobile() {
  //   return window.innerWidth < 768
  // }

  // if (isMobile()) {
  //   mobileMessage.style.display = "block"
  // }

  // window.addEventListener("resize", () => {
  //   if (isMobile()) {
  //     mobileMessage.style.display = "block"
  //   } else {
  //     mobileMessage.style.display = "none"
  //   }
  // })
  const mobileMessage = document.getElementById("mobileMessage");
  const continueMobileBtn = document.getElementById("continueMobile");
  
  // Function to handle the message display
  function handleMobileMessage(event) {
    if (event.matches) {
      mobileMessage.style.display = "block";
    } else {
      mobileMessage.style.display = "none";
    }
  }
  
  // Create a media query listener
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  
  // Run on page load
  handleMobileMessage(mediaQuery);
  
  // Listen for actual screen width changes (ignores zooming)
  mediaQuery.addEventListener("change", handleMobileMessage);
  
  // Hide mobile message when "Continue" is clicked
  if (continueMobileBtn) {
    continueMobileBtn.addEventListener("click", () => {
      mobileMessage.style.display = "none";
    });
  }

  // Initialize form
  updateFormState()

  // Navigation buttons
  prevButton.addEventListener("click", (e) => {
    e.preventDefault()
    if (currentSection > 0) {
      currentSection--
      updateFormState()
    }
  })

  nextButton.addEventListener("click", (e) => {
    e.preventDefault()

    // Check if email and phone are verified before proceeding from first section
    if (currentSection === 0) {
      const emailVerified = document.getElementById("tickMark").style.display === "block"
      const phoneVerified = document.getElementById("phoneTickMark").style.display === "block"

      if (!emailVerified || !phoneVerified) {
        document.getElementById("nextButtonErrorMessage").style.display = "block"
        return
      } else {
        document.getElementById("nextButtonErrorMessage").style.display = "none"
      }
    }

    if (currentSection < sections.length - 1) {
      currentSection++
      updateFormState()
    }
  })

  function updateFormState() {
    // Update sections
    sections.forEach((section, index) => {
      section.classList.remove("active")
      if (index === currentSection) {
        section.classList.add("active")
      }
    })

    // Update progress steps
    progressSteps.forEach((step, index) => {
      step.classList.remove("active")
      if (index <= currentSection) {
        step.classList.add("active")
      }
    })

    // Update progress bar
    const progressWidth = (currentSection / (progressSteps.length - 1)) * 100
    progress.style.width = progressWidth + "%"

    // Update buttons
    prevButton.style.display = currentSection === 0 ? "none" : "flex"
    nextButton.style.display = currentSection === sections.length - 1 ? "none" : "flex"

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Email validation
  const emailInput = document.getElementById("email")

  emailInput.addEventListener("blur", () => {
    validateEmail()
  })

  emailInput.addEventListener("input", validateEmailVerifyButton);


  function validateEmailVerifyButton() {
    const email = emailInput.value.trim(); // Remove extra spaces
    const emailTickMark = document.getElementById("tickMark");
    const verifyButton = document.getElementById("emailVerifyButtonMark");

    // Simple email validation pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Get the actual computed style (ensures accuracy)
    const emailVerified = window.getComputedStyle(emailTickMark).display === "block";

    if (emailPattern.test(email)) {
      // If the email is valid but NOT verified, show the button
      verifyButton.style.display = emailVerified ? "none" : "block";
    } else {
      // If email is invalid, hide the button
      verifyButton.style.display = "none";
    }
  }

   function validateEmail() {
    const email = emailInput.value.trim()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      return false
    } else if (!emailRegex.test(email)) {
      showError("Please enter a valid email address")
      return false
    } else {
      hideError()
      return true
    }
  }

  // Phone validation
  const phoneInput = document.getElementById("phone")

  phoneInput.addEventListener("blur", () => {
    validatePhone()
  })

  phoneInput.addEventListener("input", validatePhoneVerifyButton);

  function validatePhoneVerifyButton() {
    const phoneInput = document.getElementById("phone"); // Get the phone input field
    const phone = phoneInput.value.trim(); // Remove extra spaces
    const phoneTickMark = document.getElementById("phoneTickMark"); // Get the verification tick mark
    const verifyButton = document.getElementById("phoneVerifyButtonMark"); // Get the verify button

    // Regular expression: Allows '+' followed by country code and 10 digits
    const phonePattern = /^\+?[1-9]\d{0,2}-?\d{10,}$/;

    // Get the actual computed style (ensures accuracy)
    const phoneVerified = window.getComputedStyle(phoneTickMark).display === "block";

    if (phonePattern.test(phone)) {
      // If the phone number is valid but NOT verified, show the button
      verifyButton.style.display = phoneVerified ? "none" : "block";
    } else {
      // If phone number is invalid, hide the button
      verifyButton.style.display = "none";
    }
  }


function validatePhone() {
    const phone = phoneInput.value.trim()
    const phoneRegex = /^\+?[0-9]{10,15}$/
    const phonePattern = /^\+?[1-9]\d{0,2}-?\d{10,}$/;

    if (!phone) {
      return false
    } else if (!phoneRegex.test(phone)) {
      showError("Please enter a valid phone number")
      return false
    }
    else if (!phonePattern.test(phone)) {
      showError("Add country code to verify.")
      return false
    }
    else {
      hideError()
      return true
    }
  }

  // Date of birth validation and hidden filed updation
  const dobInput = document.getElementById("dob")
  const hiddenField = document.getElementById('00N5j00000UPatu');

  dobInput.addEventListener("change", () => {
    validateDOB()
  })

  function validateDOB() {
    const dob = new Date(dobInput.value)
    const today = new Date()
    const minAge = 21
    const maxAge = 100

    // Calculate age
    let age = today.getFullYear() - dob.getFullYear()
    const monthDiff = today.getMonth() - dob.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--
    }

    if (isNaN(dob.getTime())) {
      showError("Please enter a valid date");
      dobInput.value = "";
      return false;
    } else if (dob > today) {
      showError("Date of birth cannot be in the future");
      dobInput.value = "";
      return false;
    } else if (age < minAge) {
      showError("You must be at least " + minAge + " years old");
      dobInput.value = "";
      return false;
    } else if (age > maxAge) {
      showError("Please enter a valid date of birth");y
      dobInput.value = "";
      return false;
    } else {
      hiddenField.value = `${padZero(dob.getDate())}/${padZero(dob.getMonth() + 1)}/${dob.getFullYear()}`;
      hideError();
      return true;
    }
  }

  // Function to pad zero for single-digit days and months
  function padZero(num) {
    return (num < 10 ? '0' : '') + num;
  }

  // Experience validation and level setting
  const experienceInput = document.getElementById("00N5j00000SCZVo");
  const experienceLevel = document.getElementById("00N5j00000RpTNG");
  const gradeInput = document.getElementById("00N5j00000TYwVZ");

  experienceInput.addEventListener("input", () => {
    validateExperience()
  })

  function validateExperience() {
    const experience = Number.parseInt(experienceInput.value)

    if (isNaN(experience)) {
      showError("Please enter a valid number")
      experienceLevel.value = ""
      return false
    } else if (experience < 0 || experience > 45) {
      showError("Experience must be between 0 and 45 years")
      experienceLevel.value = ""
      return false
    } else {
      hideError()

      // Set experience level based on the defined ranges
      if (experience === 0) {
        experienceLevel.value = "Entry Level";
      } else if (experience <= 1) {
        experienceLevel.value = "Entry Level";
      } else if (experience <= 3) {
        experienceLevel.value = "Junior";
      } else if (experience <= 5) {
        experienceLevel.value = "Entry to Mid-Level";
      } else if (experience <= 8) {
        experienceLevel.value = "Mid-Level";
      } else if (experience <= 10) {
        experienceLevel.value = "Mid to Senior";
      } else if (experience <= 12) {
        experienceLevel.value = "Senior";
      } else if (experience <= 15) {
        experienceLevel.value = "Senior to Lead";
      } else if (experience <= 18) {
        experienceLevel.value = "Lead";
      } else if (experience <= 25) {
        experienceLevel.value = "Director";
      } else {
        experienceLevel.value = "Executive";
      }

      // Assign grade directly (default is 'B')
      let updatedGrade =
        experience <= 5 ? 'B' :
          experience <= 10 ? 'B+' :
            experience <= 15 ? 'A' :
              experience > 15 ? 'A+' : 'B'; // Default to 'B'

      gradeInput.value = updatedGrade;

      // Trigger a change event to update dependent fields
      var event = new Event('change');
      gradeInput.dispatchEvent(event);

      // Call function directly with updated grade
      updateCompanyDropdown(updatedGrade);


      // Toggle previous employment div
      togglePreviousEmploymentDiv(experience)

      return true
    }
  }

  // Updated function to accept grade directly
  function updateCompanyDropdown(grade) {
    const companySelect = document.getElementById("company");
    companySelect.innerHTML = "<option value=''>--Select Company--</option>"; // Clear existing options

    if (gradeCompanies[grade]) {
      gradeCompanies[grade].forEach((company) => {
        const option = document.createElement("option");
        option.value = company;
        option.textContent = company;
        companySelect.appendChild(option);
      });
    }
  }

  // Toggle previous employment div
  function togglePreviousEmploymentDiv(experience) {
    const previousEmploymentDiv = document.getElementById("previousEmploymentDiv")

    if (Number.parseInt(experience) > 0) {
      previousEmploymentDiv.classList.remove("hidden")
    } else {
      previousEmploymentDiv.classList.add("hidden")
    }
  }

  // Helper functions for error handling
  function showError(message) {
    const errorText = errorContainer.querySelector(".error-text") // Select the text inside the error container
    errorText.textContent = message // Update the error message
    errorContainer.style.display = "flex"; // Show the error container

    // Scroll to the error message smoothly
    errorContainer.scrollIntoView({ behavior: "smooth", block: "center" });
    
    // Hide error after 5 seconds
    setTimeout(() => {
      hideError()
    }, 5000)
  }

  function hideError() {
    errorContainer.style.display = "none" // Hide error message
  }


  // Populate country dropdown based on region
  const regionSelect = document.getElementById("region")
  const countrySelect = document.getElementById("country")

  const countries = {
    "South America": ["Argentina", "Chile", "Colombia", "Peru"],
    "Australia (Oceania)": ["Fiji", "New Zealand", "Papua New Guinea", "Samoa"],
    "North America": ["Mexico", "Guatemala", "Cuba", "Dominican Republic"],
    "Europe": ["Italy", "Netherlands", "Spain", "Switzerland"],
    "Asia": ["China", "India", "Malaysia", "South Korea", "Thailand"],
    "Africa": ["Egypt", "Kenya", "Morocco", "Nigeria", "Algeria"]
  }

  regionSelect.addEventListener("change", function () {
    const selectedRegion = this.value

    // Clear country dropdown
    countrySelect.innerHTML = '<option value="" selected>--Select a Country--</option>'

    // Populate countries based on selected region
    if (selectedRegion && countries[selectedRegion]) {
      countries[selectedRegion].forEach((country) => {
        const option = document.createElement("option")
        option.value = country
        option.textContent = country
        countrySelect.appendChild(option)
      })
    }
  })

  // Populate city dropdown based on country
  const citySelect = document.getElementById("city")

  const cities = {
    "Argentina": ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata"],
    "Chile": ["Santiago", "Valparaíso", "Concepción", "La Serena", "Antofagasta"],
    "Colombia": ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"],
    "Peru": ["Lima", "Arequipa", "Trujillo", "Chiclayo", "Cusco"],
    "Mexico": ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Cancún"],
    "Guatemala": ["Guatemala City", "Mixco", "Villa Nueva", "Quetzaltenango", "Escuintla"],
    "Cuba": ["Havana", "Santiago de Cuba", "Camagüey", "Holguín", "Santa Clara"],
    "Dominican Republic": ["Santo Domingo", "Santiago de los Caballeros", "Santo Domingo Este", "La Romana", "San Pedro de Macorís"],
    "Italy": ["Rome (Roma)", "Milan (Milano)", "Naples (Napoli)", "Florence (Firenze)", "Venice (Venezia)"],
    "Netherlands": ["Amsterdam", "Rotterdam", "The Hague (Den Haag)", "Utrecht", "Eindhoven"],
    "Spain": ["Madrid", "Barcelona", "Valencia", "Seville (Sevilla)", "Zaragoza"],
    "Switzerland": ["Zurich (Zürich)", "Geneva (Genève)", "Basel", "Bern", "Lausanne"],
    "China": ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu"],
    "India": ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"],
    "Malaysia": ["Kuala Lumpur", "George Town (Penang)", "Johor Bahru", "Kota Kinabalu", "Kuching"],
    "South Korea": ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon"],
    "Thailand": ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Ayutthaya"],
    "Egypt": ["Cairo", "Alexandria", "Giza", "Luxor", "Aswan"],
    "Kenya": ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
    "Morocco": ["Casablanca", "Marrakech", "Fes", "Rabat", "Tangier"],
    "Nigeria": ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt"],
    "Fiji": ["Suva", "Lautoka", "Nadi", "Labasa", "Ba"],
    "New Zealand": ["Auckland", "Wellington", "Christchurch", "Hamilton", "Dunedin"],
    "Papua New Guinea": ["Port Moresby", "Lae", "Mount Hagen", "Madang", "Goroka"],
    "Samoa": ["Apia", "Vaitele", "Faleula", "Fasito'o Uta", "Saleimoa"],
    // Add more countries and cities as needed
  }

  countrySelect.addEventListener("change", function () {
    const selectedCountry = this.value

    // Clear city dropdown
    citySelect.innerHTML = '<option value="" selected>--Select a City--</option>'

    // Populate cities based on selected country
    if (selectedCountry && cities[selectedCountry]) {
      cities[selectedCountry].forEach((city) => {
        const option = document.createElement("option")
        option.value = city
        option.textContent = city
        citySelect.appendChild(option)
      })
    }
  })

  // Populate languages dropdown
  const languageSelect = document.getElementById("00N5j00000UPauO")
  const languages = [
    "English", "Spanish", "French", "Chinese", "Arabic", "Russian", "Hindi", "Portuguese", "Bengali", "Urdu",
    "German", "Japanese", "Korean", "Italian", "Turkish", "Dutch", "Polish", "Swedish", "Indonesian", "Vietnamese",
    "Thai", "Greek", "Hebrew", "Czech", "Hungarian", "Romanian", "Swahili", "Tagalog", "Malay", "Farsi", "Turkmen",
    "Hausa", "Zulu", "Sinhala", "Burmese", "Khmer", "Nepali", "Finnish", "Norwegian", "Danish", "Afrikaans",
    "Swedish", "Fijian", "Samoan", "Tongan", "Maori", "Hawaiian", "Esperanto", "Klingon", "Dothraki", "Valyrian",
    "Other"
  ]

  languages.forEach((language) => {
    const option = document.createElement("option")
    option.value = language
    option.textContent = language
    languageSelect.appendChild(option)
  })

  // Populate nationality dropdown
  const nationalitySelect = document.getElementById("00N5j00000UPau4")
  const nationalities = [
    "Afghan",
    "Albanian",
    "Algerian",
    "American",
    "Andorran",
    "Angolan",
    "Argentine",
    "Armenian",
    "Australian",
    "Austrian",
    "Azerbaijani",
    "Bahamian",
    "Bahraini",
    "Bangladeshi",
    "Barbadian",
    "Belarusian",
    "Belgian",
    "Belizean",
    "Beninese",
    "Bhutanese",
    "Bolivian",
    "Bosnian",
    "Brazilian",
    "British",
    "Bruneian",
    "Bulgarian",
    "Burkinabe",
    "Burmese",
    "Burundian",
    "Cambodian",
    "Cameroonian",
    "Canadian",
    "Cape Verdean",
    "Central African",
    "Chadian",
    "Chilean",
    "Chinese",
    "Colombian",
    "Comoran",
    "Congolese",
    "Costa Rican",
    "Croatian",
    "Cuban",
    "Cypriot",
    "Czech",
    "Danish",
    "Djiboutian",
    "Dominican",
    "Dutch",
    "East Timorese",
    "Ecuadorean",
    "Egyptian",
    "Emirian",
    "Equatorial Guinean",
    "Eritrean",
    "Estonian",
    "Ethiopian",
    "Fijian",
    "Filipino",
    "Finnish",
    "French",
    "Gabonese",
    "Gambian",
    "Georgian",
    "German",
    "Ghanaian",
    "Greek",
    "Grenadian",
    "Guatemalan",
    "Guinea-Bissauan",
    "Guinean",
    "Guyanese",
    "Haitian",
    "Honduran",
    "Hungarian",
    "Icelander",
    "Indian",
    "Indonesian",
    "Iranian",
    "Iraqi",
    "Irish",
    "Israeli",
    "Italian",
    "Ivorian",
    "Jamaican",
    "Japanese",
    "Jordanian",
    "Kazakhstani",
    "Kenyan",
    "Kiribati",
    "Kuwaiti",
    "Kyrgyz",
    "Laotian",
    "Latvian",
    "Lebanese",
    "Liberian",
    "Libyan",
    "Liechtensteiner",
    "Lithuanian",
    "Luxembourger",
    "Macedonian",
    "Malagasy",
    "Malawian",
    "Malaysian",
    "Maldivian",
    "Malian",
    "Maltese",
    "Marshallese",
    "Mauritanian",
    "Mauritian",
    "Mexican",
    "Micronesian",
    "Moldovan",
    "Monacan",
    "Mongolian",
    "Moroccan",
    "Mosotho",
    "Motswana",
    "Mozambican",
    "Namibian",
    "Nauruan",
    "Nepalese",
    "New Zealander",
    "Nicaraguan",
    "Nigerian",
    "Nigerien",
    "North Korean",
    "Norwegian",
    "Omani",
    "Pakistani",
    "Palauan",
    "Panamanian",
    "Papua New Guinean",
    "Paraguayan",
    "Peruvian",
    "Polish",
    "Portuguese",
    "Qatari",
    "Romanian",
    "Russian",
    "Rwandan",
    "Saint Lucian",
    "Salvadoran",
    "Samoan",
    "San Marinese",
    "Sao Tomean",
    "Saudi",
    "Senegalese",
    "Serbian",
    "Seychellois",
    "Sierra Leonean",
    "Singaporean",
    "Slovakian",
    "Slovenian",
    "Solomon Islander",
    "Somali",
    "South African",
    "South Korean",
    "Spanish",
    "Sri Lankan",
    "Sudanese",
    "Surinamer",
    "Swazi",
    "Swedish",
    "Swiss",
    "Syrian",
    "Taiwanese",
    "Tajik",
    "Tanzanian",
    "Thai",
    "Togolese",
    "Tongan",
    "Trinidadian or Tobagonian",
    "Tunisian",
    "Turkish",
    "Tuvaluan",
    "Ugandan",
    "Ukrainian",
    "Uruguayan",
    "Uzbekistani",
    "Venezuelan",
    "Vietnamese",
    "Yemeni",
    "Zambian",
    "Zimbabwean",
  ]

  nationalities.forEach((nationality) => {
    const option = document.createElement("option")
    option.value = nationality
    option.textContent = nationality
    nationalitySelect.appendChild(option)
  })

  // Populate university dropdown
  const universitySelect = document.getElementById("00N5j00000UOxCM")
  const universities = [
    "University of Tokyo, Japan", "National University of Singapore, Singapore", "Tsinghua University, China", "Seoul National University, South Korea", "Hong Kong University of Science and Technology, Hong Kong",
    "Indian Institute of Science (IISc), India", "University of Hong Kong, Hong Kong", "Peking University, China", "KAIST - Korea Advanced Institute of Science & Technology, South Korea", "Nanyang Technological University (NTU), Singapore", "University of Oxford, United Kingdom", "University of Cambridge, United Kingdom", "ETH Zurich - Swiss Federal Institute of Technology, Switzerland", "Imperial College London, United Kingdom", "University College London (UCL), United Kingdom", "École Polytechnique Fédérale de Lausanne (EPFL), Switzerland", "Ludwig Maximilian University of Munich, Germany", "University of Edinburgh, United Kingdom", "University of Manchester, United Kingdom", "Karolinska Institute, Sweden", "Harvard University, United States", "Massachusetts Institute of Technology (MIT), United States", "Stanford University, United States", "California Institute of Technology (Caltech), United States", "University of Toronto, Canada", "Princeton University, United States", "Columbia University, United States", "University of Chicago, United States", "University of California, Berkeley, United States", "University of British Columbia, Canada", "University of São Paulo, Brazil", "National Autonomous University of Mexico, Mexico",
    "University of Buenos Aires, Argentina", "University of the Andes, Colombia", "Pontifical Catholic University of Chile, Chile", "University of the Republic, Uruguay", "Federal University of Rio de Janeiro, Brazil", "University of the Andes, Venezuela", "University of Concepción, Chile", "Federal University of Minas Gerais, Brazil", "University of Melbourne, Australia", "Australian National University, Australia", "University of Sydney, Australia", "University of Queensland, Australia", "University of Auckland, New Zealand", "Monash University, Australia", "University of New South Wales, Australia", "University of Western Australia, Australia", "University of Adelaide, Australia", "Victoria University of Wellington, New Zealand", "Indian Institute of Technology (IIT), Bombay", "University of Pune, Pune", "Visvesvaraya National Institute of Technology (VNIT), Nagpur", "College of Engineering, Pune", "Veermata Jijabai Technological Institute (VJTI), Mumbai", "Symbiosis Institute of Technology, Pune", "Narsee Monjee Institute of Management Studies (NMIMS), Mumbai", "Walchand College of Engineering, Sangli", "Bharati Vidyapeeth Deemed University College of Engineering, Pune", "Government College of Engineering, Aurangabad",
    "Sardar Patel Institute of Technology (SPIT), Mumbai", "Fr. Conceicao Rodrigues College of Engineering (CRCE), Mumbai", "Pillai College of Engineering (PCE), Navi Mumbai", "Thadomal Shahani Engineering College (TSEC), Mumbai", "Vivekanand Education Society's Institute of Technology (VESIT), Mumbai", "K. J. Somaiya Institute of Engineering and Information Technology, Mumbai", "Dwarkadas J. Sanghvi College of Engineering (DJ Sanghvi), Mumbai", "Rajiv Gandhi Institute of Technology (RGIT), Mumbai", "Lokmanya Tilak College of Engineering (LTCE), Navi Mumbai", "Shri Vile Parle Kelavani Mandal's Dwarkadas J. Sanghvi College of Engineering (DJSCE), Mumbai", "Sinhgad College of Engineering, Pune", "University of Lagos", "Obafemi Awolowo University", "Ahmadu Bello University", "University of Ibadan", "University of Nigeria, Nsukka", "Federal University of Technology, Akure", "University of Ilorin", "Covenant University", "Lagos State University", "University of Benin", "Federal University of Technology, Minna", "University of Port Harcourt", "University of Abuja", "Bayero University Kano", "Federal University of Technology, Owerri", "Abubakar Tafawa Balewa University", "Nnamdi Azikiwe University", "University of Jos",
    "Federal University of Agriculture, Abeokuta", "Federal University, Oye-Ekiti", "Vishwakarma Institute of Technology (VIT), Pune", "Rajarshi Shahu College of Engineering, Pune", "Marathwada Mitra Mandal's Institute of Technology, Pune", "Indira College of Engineering & Management, Pune", "AISSMS Institute of Information Technology, Pune", "Alard College of Engineering & Management, Pune", "Dr. D. Y. Patil School of Engineering & Technology, Lohegaon, Pune", "JSPM's Imperial College of Engineering and Research, Wagholi, Pune", "Dr. D. Y. Patil School of Engineering Academy, Ambi, Pune", "K. J. College of Engineering & Management Research, Pune", "Dr. D. Y. Patil School of Engineering, Charholi (Bk.), Pune", "Pimpri Chinchwad Education Trust, Pimpri Chinchwad College of Engineering, Pune", "Sinhgad Institute of Technology & Science, Narhe, Pune", "Shree Chanakya Education Society's Indira College of Engineering & Management, Pune", "Jaywant College of Engineering and Management, Sangli", "Bharat Ratna Indira Gandhi College of Engineering, Kegaon, Solapur", "KK Wagh Institute of Engineering Education & Research, Nashik", "MAEER's MIT College of Railway Engineering and Research, Pune",
    "Dr. J.J. Magdum College of Engineering, Jaysingpur", "Shri Guru Gobind Singhji Institute of Engineering and Technology, Nanded", "Government College of Engineering, Amravati", "G. H. Raisoni College of Engineering and Management, Amravati", "Savitribai Phule Pune University (SPPU)", "Shivaji University, Kolhapur", "Dr. Babasaheb Ambedkar Technological University (DBATU), Lonere", "Shree Tulja Bhavani College of Engineering, Osmanabad", "Rajiv Gandhi Institute of Technology (RGIT), Mumbai", "Lokmanya Tilak College of Engineering (LTCE), Navi Mumbai", "Shri Vile Parle Kelavani Mandal's Dwarkadas J. Sanghvi College of Engineering (DJSCE), Mumbai", "Sinhgad Institute of Technology & Science, Narhe, Pune", "Sinhgad College of Engineering, Vadgaon, Pune", "Sandip Institute of Technology and Research Centre, Nashik", "Sharad Institute of Technology College of Engineering, Yadrav, Kolhapur", "Dehli University", "Vidya Pratishthan's College of Engineering, Baramati", "All India Shri Shivaji Memorial Society's College of Engineering, Pune", "All India Shri Shivaji Memorial Society's Institute of Information Technology, Pune", "Amrutvahini College of Engineering, Sangamner",
    "Dr. Babasaheb Ambedkar Technological University, Lonere", "College of Military Engineering, Pune", "College of Engineering, Osmanabad", "Dr. DY Patil Institute of Engineering, Management & Research, Akurdi, Pune", "JSPM's Bhivarabai Sawant College of Engineering & Research, Narhe, Pune", "Nutan Maharashtra Institute of Engineering & Technology, Pune", "Rajiv Gandhi College of Engineering, At Post, Hatkanangale", "Padmabhooshan Vasantraodada Patil Institute of Technology, Budhgaon", "Pimpri Chinchwad College of Engineering & Research, Pune", "Maharashtra Institute of Medical Education and Research (MIMER), Talegaon Dabhade", "Maharashtra Academy of Engineering and Educational Research's Maharashtra Institute of Technology, Kothrud, Pune", "Maharashtra Institute of Technology, Aurangabad", "Maharashtra Institute of Technology, Pune", "Pune Vidyarthi Griha's College of Engineering and Technology, Pune", "G. H. Raisoni Institute of Engineering and Technology, Pune", "D. Y. Patil College of Engineering, Akurdi, Pune", "Indian Institute of Technology (IIT), Madras", "Birla Institute of Technology and Science (BITS), Pilani", "Delhi Technological University (DTU), Delhi", "Indian Institute of Science Education and Research (IISER), Pune", "Jadavpur University, Kolkata", "Indian Institute of Technology (IIT), Guwahati", "Indian Institute of Technology (IIT), Roorkee", "Vellore Institute of Technology (VIT), Vellore", "National Institute of Technology (NIT), Trichy", "Indian Institute of Information Technology (IIIT), Hyderabad", "Aligarh Muslim University (AMU), Aligarh", "Indian Institute of Management (IIM), Ahmedabad", "Indian Institute of Technology (IIT), Kanpur", "National Institute of Fashion Technology (NIFT), Mumbai", "Indian Statistical Institute (ISI), Kolkata", "Indian Institute of Technology (IIT), Kharagpur", "National Institute of Design (NID), Ahmedabad", "Tata Institute of Fundamental Research (TIFR), Mumbai", "Indian Institute of Science Education and Research (IISER), Kolkata",
    "Nnamdi Azikiwe University, Awka", "Obafemi Awolowo University, Ile-Ife", "University of Abuja, Gwagwalada", "University of Agriculture Makurdi", "University of Benin", "University of Calabar", "University of Ibadan", "University of Ilorin", "University of Jos", "University of Lagos", "University of Maiduguri", "University of Nigeria Nsukka", "University of Port-Harcourt", "University of Uyo", "Usumanu Danfodiyo University", "Abubakar Tafawa Balewa University, Bauchi", "Ahmadu Bello University, Zaria", "Bayero University Kano", "Federal University Birnin Kebbi", "Federal University Dutse, Jigawa State", "Federal University Dutsin-Ma, Katsina", "Federal University Gasua", "Federal University Kashere, Gombe State", "Federal University Lafia, Nasarawa State", "Federal University Lokoja, Kogi State", "Federal University Ndufu-Alike, Ebonyi State", "Federal University of Agriculture Abeokuta", "Federal University of Petroleum Resources, Effurun", "Federal University of Technology Akure", "Federal University of Technology Minna", "Federal University of Technology Owerri", "Federal University Otuoke, Bayelsa", "Federal University Oye-Ekiti, Ekiti State", "Federal University Wukari, Taraba State", "Michael Okpara University of Agriculture, Umudike", "Modibbo Adama University of Technology, Yola", "National Open University of Nigeria", "Nigerian Defence Academy,Kaduna", "Nigeria Police Academy Wudil",
    "Abia State University, Uturu", "Adamawa State University Mubi", "Adekunle Ajasin University, Akungba", "Akwa Ibom State University of Technology, Uyo", "Ambrose Alli University, Ekpoma", "Anambra State University of Science & Technology, Uli", "Bauchi State University, Gadau", "Benue State University, Makurdi", "Bukar Abba Ibrahim University, Damaturu", "Cross River State University of Science and Technology, Calabar", "Delta State University, Abraka", "Ebonyi State University, Abakaliki", "Ekiti State University, Ado-Ekiti", "Enugu State University of Science and Technology, Enugu", "Gombe State Univeristy, Gombe", "Ibrahim Badamasi Babangida University, Lapai", "Ignatius Ajuru University of Education, Rumuolumeni", "Imo State University, Owerri", "Kaduna State University, Kaduna", "Kano University of Science and Technology, Wudil", "Kebbi State University, Kebbi", "Kogi State University, Anyigba", "Kwara State University, Ilorin", "Ladoke Akintola University of Technology, Ogbomoso", "Lagos State University Ojo, Lagos", "Nasarawa State University, Keffi", "Niger Delta Unversity, Yenagoa", "Northwest University, Kano", "Olabisi Onabanjo University, Ago-Iwoye", "Ondo State University of Science and Technology, Okitipupa", "Osun State University, Osogbo", "Plateau State University, Bokkos", "Rivers State University of Science and Technology", "Sokoto State University, Sokoto", "Sule Lamido University, Jigawa", "Tai Solarin University of Education, Ijebu-Ode", "Taraba State University, Jalingo", "Technical University,Ibadan", "Umaru Musa YarAdua University, Katsina", "University of Medical Sciences Ondo, Ondo State", "Yobe State University, Damaturu",
    "Achievers University, Owo", "Adeleke University, Ede", "Afe Babalola University, Ado-Ekiti", "African University of Science & Technology, Abuja", "Ajayi Crowther University, Ibadan", "Al-Hikmah University, Ilorin", "American University of Nigeria, Yola", "Babcock University,Ilishan-Remo", "Baze University", "Bells University of Technology, Otta", "Benson Idahosa University, Benin City", "Bingham University, New Karu", "Bowen University, Iwo", "Caleb University, Lagos", "Caritas University, Enugu", "CETEP City University, Lagos", "Covenant University, Ota", "Crawford University, Igbesa", "Crescent University", "Elizade University, Ilara-Mokin", "Evangel University, Akaeze", "Fountain Unveristy, Oshogbo", "Godfrey Okoye University, Ugwuomu-Nike", "Gregory University, Uturu", "Igbinedion University, Okada", "Joseph Ayo Babalola University, Ikeji-Arakeji", "Katsina University, Katsina", "Kwararafa University, Wukari", "Landmark University, Omu-Aran", "Lead City University, Ibadan", "Madonna University, Okija", "Mcpherson University, Seriki Sotayo, Ajebo", "Nigerian-Turkish Nile University, Abuja", "Novena University, Ogume", "Obong University, Obong Ntak", "Oduduwa University, Ipetumodu", "Pan-African University, Lagos", "Paul University, Awka", "Redeemer’s University, Mowe", "Renaissance University, Enugu", "Rhema University, Obeama-Asa", "Salem University, Lokoja", "Samuel Adegboyega University, Ogwa", "Southwestern University, Oku Owa", "Tansian University, Umunya", "University of Mkar, Mkar", "Veritas University", "Wellspring University, Evbuobanosa", "Wesley University. of Science & Technology, Ondo", "Western Delta University, Oghara",
    "Akanu Ibiam Federal Polytechnic, Unwana-Afikpo, Ebonyi State", "Auchi Polytechnic, Auchi Edo State", "Federal Polytechnic Ado-Ekiti", "Federal Polytechnic Bauchi, Bauchi State", "Federal Polytechnic Bida, Niger State", "Federal Polytechnic Damaturu, Yobe State", "Federal Polytechnic Ede, Osun State", "Federal Polytechnic Idah, Kogi State", "Federal Polytechnic Ilaro, Ogun State", "Federal Polytechnic Kaura Namoda, Zamfara State", "Federal Polytechnic Mubi, Adamawa State", "Federal Polytechnic Nasarawa, Nassarawa", "Federal Polytechnic Nekede Owerri, Imo State", "Federal Polytechnic Offa, Kwara State", "Federal Polytechnic Oko, Anambra State", "Hussaini Adamu Federal Polytechnic, Kazaure, Jigawa State", "Kaduna Polytechnic, Kaduna", "Waziri Umaru Federal Polytechnic, B/Kebbi, Kebbi State", "Yaba College of Technology, Yaba, Lagos", "Federal Polytechnic Bali, Taraba State", "Federal Polytechnic Ekowe, Bayelsa State",
    "Abdu Gusau Polytechnic, Talata-Mafara, Zamfara State", "Abia State Polytechnic, Aba, Abia State", "Abubakar Tatari Ali Polytechnic, Bauchi", "Adamawa State Polytechnic, Yola", "Akwa-Ibom State College of Art and Science, Numkum", "Akwa Ibom State Polytechnic, Ikot-Osurua", "Benue State Polytechnic, Ugbokolo", "Delta State Polytechnic, Ogharra", "Delta State Polytechnic, Ozoro", "Delta State Polytechnic, Ugwashi-Uku", "Edo State Institute of Management and Technology, Usen", "Gateway ICT Institute, Itori, Ewekoro, Ogun State", "Gateway ICT Polytechnic, Igbesa, Ogun State", "Gateway ICT Polytechnic, Saapade, Ogun State", "Hassan Usman Katsina Polytechnic, Katsina", "Imo State Polytechnic, Umuagwo", "Institute of Management and Technology IMT Enugu", "Jigawa State Polytechnic, Dutse", "Kano State Polytechnic, Kano", "Kogi State Polytechnic, Lokoja.", "Kwara State Polytechnic, Ilorin", "Lagos State Polytechnic, Ikorodu", "Moshood Abiola Polytechnic, Abeokuta, Ogun State", "Nasarawa State Polytechnic, Lafia", "Niger State Polytechnic, Zungeru", "Nuhu Bamalli Polytechnic Zaria, Kaduna State", "Osun State College of Technology, Esa-Oke", "Osun State Polytechnic, Iree", "Plateau State Polytechnic, Barkin Ladi", "Ramat Polytechnic, Maiduguri, Borno State", "Rivers State Polytechnic, Bori now Ken Saro Wiwa Polytechnic", "Rivers State College of Arts and Science, Rumola, Port Harcourt", "Rufus Giwa Polytechnic Owo, Ondo State", "Sokoto State Polytechnic, Sokoto", "Taraba State Polytechnic, Jalingo", "The Polytechnic Ibadan, Oyo State", "The Polytechnic, Ijebu-Igbo", "Yobe State Polytechnic, Geidam",
    "Alvan Ikoku Federal College of Education, Owerri", "FCT College of Education, Zuba", "Federal College of Education, Akoka", "Federal College of Education, Asaba", "Federal College of education Bauchi", "Federal College of Education Bida", "Federal College of Education Eha-Amufu", "Federal College of Education, Iliorin", "Federal College of Education (Special), Oyo", "Federal College of Education (Technical) Gombe", "Federal College of Education (Technical) Gusau", "Federal College of Education, (Technical) Bichi", "Federal College of Education, Kano City", "Federal College of Education, Katsina", "Federal College of Education, Kontagora", "Federal College of Education Obudu", "Federal College of Education, Okene", "Federal College of Education, Omoku", "Federal College of Education, Ondo", "Federal College of Education Abeokuta", "Federal College of Education, pankshin", "Federal College of Education, Potiskum", "Federal College of Education Umunze", "Federal College of Education, Yola", "Federal College of Education Zaria",
    "Adeniran Ogunsanya College of Education, Ijanikin, Lagos State", "Adeyemi College of Education Ondo", "College of Education, Afaha-Nsit", "College of Education, Agbor", "College of Education, Agbor", "College of Education, Akwanga", "College of Education, Akwanga", "College of Education, Azare", "College of Education, Ekiadolor", "College of Education, Gindiri", "College of Education, Ikere Ekiti", "College of Education, Katsina Ala", "College of Education, Oro, Kwara State", "College of Education, Warri", "College of Education, Zuba", "Enugu State College of Education (Technical), Enugu State", "Isa Kaita College of Education, Katsina", "Michael Otedola College of Primary Education", "Kaduna State College of Education, Kafanchan", "Kano State College of Education, Kano", "Kwara State College of Education", "Nasarawa State College of Education", "National Teachers Institute, kaduna", "Niger State College of Education, Minna", "Nwafor Orizu College of Education", "Osun State College of Education, Ila-Orangun", "Osun State College of Education, Ilesa", "Oyo State College Of Education, Oyo", "Rivers State College of Education", "Sa’adatu Rimi College of Education, Kumbotso, Kano", "Tai Solarin University of education", "Taraba State College of Education, Zing"
    // Add more universities as needed
  ]

  universities.forEach((university) => {
    const option = document.createElement("option")
    option.value = university
    option.textContent = university
    universitySelect.appendChild(option)
  })

  // Companies categorized by grades
  const gradeCompanies = {
    "A+": ["Amazon.com, Inc.", "Apple Inc.", "Google", "Facebook", "Microsoft", "Samsung Electronics Co., Ltd.", "Toyota Motor Corporation", "Volkswagen Group", "Alphabet Inc.", "Alibaba Group", "Tencent Holdings", "Intel Corporation", "Amazon Web Services", "Sony Corporation", "NVIDIA Corporation"],
    "A": ["Berkshire Hathaway Inc.", "Accenture", "Capgemini Ltd.", "Nestlé S.A.", "Infosys", "Samsung Electronics Co., Ltd.", "Apple Inc.", "Microsoft", "Google", "Amazon.com, Inc.", "Toyota Motor Corporation", "Volkswagen Group", "IBM", "Deloitte", "TCS (Tata Consultancy Services)"],
    "B+": ["Cognizant", "Wipro", "EY Ltd.", "Shoprite Holdings Ltd", "Infosys", "Accenture", "HCL Technologies", "Tech Mahindra", "Deloitte", "IBM", "TCS (Tata Consultancy Services)"],
    "B": ["Discovery Limited", "Cognizant", "EY Ltd.", "Accenture", "Wipro", "Infosys", "HCL Technologies", "Tech Mahindra"]
  };


  // OTP Verification
  let generatedOTP = ""
  let otpType = ""
  let otpTimer
  //Email Instnace to Send the OTP


  // Send OTP for phone verification
  window.sendOTP = () => {
    const emailVerified = document.getElementById("tickMark").style.display === "block"
    if (!emailVerified) {
      showError("Please verify your email before proceeding.");
      return;
    }
    if (!validatePhone()) return

    otpType = "phone"
    generatedOTP = generateRandomOTP()


    const phoneNumber = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const toName = document.getElementById("first_name").value;

    const message = `  
    Hello ${toName},  

    Thank you for signing up! We have received a phone number verification request for ${phoneNumber}.  

    To complete your verification, please enter the OTP (One-Time Password) below:  

    📱 OTP: ${generatedOTP}  

    ⚠️ Please do not share this OTP with anyone. If you didn't request this verification, you can safely ignore this message.  
   `;


    const templateParams = {
      to_email: email,
      message: message
    };

    // Send email using EmailJS
    emailjs.send("service_qtrjv92", "template_k51xswr", templateParams)
      .then(function (response) {
        showOTPPopup();
        updateOTPMessage();
        startOTPTimer();
      }, function (error) {
        showError('Error sending OTP. Please try again later.');
      });
  }

  // Send verification email
  window.sendVerificationEmail = () => {
    if (!validateEmail()) return;

    otpType = "email";
    generatedOTP = generateRandomOTP();
    const toName = document.getElementById("first_name").value;
    const email = document.getElementById("email").value;

    const message = `
    Hello ${toName},

    Thank you for signing up! To complete your registration, please verify your email address by entering the OTP (One-Time Password) below:

    🔒 OTP: ${generatedOTP}

    If you didn't request this, you can safely ignore this email.
  `;

    const templateParams = {
      to_email: email,
      message: message
    };

    // Try-catch to handle errors properly
    emailjs.send("service_qtrjv92", "template_k51xswr", templateParams)
      .then(() => {
        showOTPPopup();
        updateOTPMessage();
        startOTPTimer();
      })
      .catch((error) => {
        showError('Error sending email. Please try again later.');
        //console.error("Email sending failed:", error);
      });
  };


  function updateOTPMessage() {
    const otpMismatchError = document.getElementById("otpMismatchError")
    otpMismatchError.textContent = "OTP sent successfully to email"
    otpMismatchError.style.color = "green"
    otpMismatchError.style.display = "block"

    setTimeout(() => {
      otpMismatchError.style.display = "none"
      otpMismatchError.style.color = "red"
      otpMismatchError.textContent = "Invalid OTP. Please try again."
    }, 3000);
  }

  // Generate random 6-digit OTP
  function generateRandomOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  // Show OTP popup
  function showOTPPopup() {
    const otpPopup = document.getElementById("otpPopup")
    otpPopup.style.display = "flex"

    // Clear previous OTP input
    document.querySelectorAll(".otp-input").forEach((input) => {
      input.value = ""
    })

    document.getElementById("otpMismatchError").style.display = "none"

    // Focus on first input
    document.querySelector('.otp-input[data-index="1"]').focus()
  }

  // Close OTP popup
  window.closePopup = () => {
    const otpPopup = document.getElementById("otpPopup")
    otpPopup.style.display = "none"
    clearInterval(otpTimer)
  }

  // Start OTP timer (2 minutes)
  function startOTPTimer() {
    let timeLeft = 120 // 2 minutes in seconds
    const timerElement = document.getElementById("timer")
    const resendButton = document.getElementById("resendOtpBtn")

    resendButton.disabled = true

    clearInterval(otpTimer)

    otpTimer = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60)
      let seconds = timeLeft % 60
      seconds = seconds < 10 ? "0" + seconds : seconds

      timerElement.textContent = minutes + ":" + seconds

      if (timeLeft <= 0) {
        clearInterval(otpTimer)
        timerElement.textContent = "0:00"
        resendButton.disabled = false
      }

      timeLeft--
    }, 1000)
  }

  // Resend OTP
  window.resendOTP = () => {
    startOTPTimer()

    // Assuming otpType is a globally available variable or fetched from the DOM
    if (otpType === "email") {
       sendVerificationEmail(); // Call email-specific OTP method
    } else if (otpType === "phone") {
       sendOTP(); // Call phone-specific OTP method
    }

    // Show message
    const otpMismatchError = document.getElementById("otpMismatchError")
    otpMismatchError.textContent = "A new OTP is on its way..."
    otpMismatchError.style.color = "green"
    otpMismatchError.style.display = "block"

    setTimeout(() => {
      otpMismatchError.style.display = "none"
    }, 3000)
  }

  // Handle OTP input
  const otpInputs = document.querySelectorAll(".otp-input")
  const otpInputHidden = document.getElementById("otpInput")

  otpInputs.forEach((input) => {
    input.addEventListener("input", function () {
      if (this.value.length === 1) {
        const nextIndex = Number.parseInt(this.dataset.index) + 1
        if (nextIndex <= 6) {
          document.querySelector(`.otp-input[data-index="${nextIndex}"]`).focus()
        }
      }

      // Update hidden input with combined OTP
      updateHiddenOTPInput()
    })

    input.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && this.value === "") {
        const prevIndex = Number.parseInt(this.dataset.index) - 1
        if (prevIndex >= 1) {
          const prevInput = document.querySelector(`.otp-input[data-index="${prevIndex}"]`)
          prevInput.focus()
          prevInput.value = ""
        }
      }
    })
  })

  function updateHiddenOTPInput() {
    let combinedOTP = ""
    otpInputs.forEach((input) => {
      combinedOTP += input.value
    })
    otpInputHidden.value = combinedOTP
  }

  // Submit OTP
  window.submitOTP = () => {
    const enteredOTP = document.getElementById("otpInput").value

    if (enteredOTP.length !== 6) {
      document.getElementById("otpMismatchError").style.display = "block"
      return
    }

    if (enteredOTP === generatedOTP) {
      // OTP is correct
      if (otpType === "phone") {
        document.getElementById("phoneVerifyButtonMark").style.display = "none"
        document.getElementById("phoneTickMark").style.display = "block"
        document.getElementById("phone").setAttribute("readonly", "true");
      } else if (otpType === "email") {
        document.getElementById("emailVerifyButtonMark").style.display = "none"
        document.getElementById("tickMark").style.display = "block"
        document.getElementById("email").setAttribute("readonly", "true");
      }

      closePopup()
    } else {
      // OTP is incorrect
      document.getElementById("otpMismatchError").style.display = "block"
    }
  }


  // Form submission validation
  window.showErrorIfRequiredFieldsEmpty = () => {
    const form = document.getElementById("myForm")
    const requiredFields = form.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "var(--error-color)"
        isValid = false
      } else {
        field.style.borderColor = "var(--border-color)"
      }
    })

    if (!isValid) {
      const validationMessage = document.getElementById("validationMessage")
      validationMessage.textContent = "Please fill in all required fields before submitting."
      validationMessage.style.display = "block"
      return false
    }

    return true
  }

  function restrictPercentageInput(input) {
    input.addEventListener("input", function () {
      let value = input.value.trim();

      // Allow only numbers and decimals
      if (!/^\d{0,3}(\.\d{0,2})?$/.test(value)) {
        input.setCustomValidity("Please enter a valid percentage (0-100).");
        input.value = ""; // Clear invalid input
        input.reportValidity(); // Show browser error message
        return;
      }

      // Convert to number for range validation
      let numValue = parseFloat(value);

      // Restrict value between 0 and 100
      if (numValue > 100 || numValue < 0) {
        input.setCustomValidity("Percentage must be between 0 and 100.");
        input.value = ""; // Clear invalid input
        input.reportValidity(); // Show browser error message
        return;
      }

      // Clear validation message when input is valid
      input.setCustomValidity("");
    });
  }

  restrictPercentageInput(document.getElementById("00N5j00000UOjbI"));
  restrictPercentageInput(document.getElementById("00N5j00000UOjbc"));
  restrictPercentageInput(document.getElementById("00N5j00000UPau9"));

  const timezoneMap = {
    "GMT-12:00": "AoE", "GMT-11:00": "NUT", "GMT-10:00": "HST", "GMT-9:30": "MIT", "GMT-9:00": "AKST", "GMT-9:00": "GAMT", "GMT-8:00": "PST",  
    "GMT-7:00": "MST", "GMT-6:00": "CST", "GMT-5:00": "EST", "GMT-4:30": "VET", "GMT-4:00": "AST", "GMT-4:00": "CLT", "GMT-3:30": "NST",  
    "GMT-3:00": "ART", "GMT-2:00": "GST", "GMT-1:00": "AZOT", "GMT+0:00": "GMT", "GMT+1:00": "CET", "GMT+2:00": "EET", "GMT+3:00": "MSK",  
    "GMT+3:30": "IRST", "GMT+4:00": "GST", "GMT+4:30": "AFT", "GMT+5:00": "PKT", "GMT+5:30": "IST", "GMT+5:45": "NPT", "GMT+6:00": "BST",  
    "GMT+6:00": "OMST", "GMT+6:30": "MMT", "GMT+7:00": "ICT", "GMT+8:00": "AWST", "GMT+8:00": "WITA", "GMT+8:45": "ACWST", "GMT+9:00": "JST",  
    "GMT+9:00": "KST", "GMT+9:30": "ACST", "GMT+10:00": "AEST", "GMT+10:30": "LHST", "GMT+11:00": "SBT", "GMT+11:00": "SRET",  
    "GMT+12:00": "NZST", "GMT+12:45": "CHAST", "GMT+13:00": "PHOT", "GMT+14:00": "LINT"
  };

  function checkFormSubmissionTime() {
    const now = new Date();

    const formStatus = document.getElementById("formStatus");
    const noticeBanner = document.getElementById("form-filling-time-Notice");
    const noticeText = document.getElementById("notice-text");

    // Get local hours (based on user's timezone)
    const hours = now.getHours();

    // Get user's GMT offset in hours and minutes  
    const gmtOffset = new Intl.DateTimeFormat('en', { timeZoneName: 'short' }).formatToParts().find(part => part.type === 'timeZoneName').value;

    // Get human-readable timezone name (fallback to GMT offset if not found)  
    const timeZone = timezoneMap[gmtOffset] || gmtOffset;


    // Check if form is open (between 10 AM - 5 PM local time)
    if (hours >= 10 && hours < 17) {
      formStatus.textContent = "✅ Form is currently open for submissions.";
      formStatus.style.color = "var(--success-color)";

      // Show notice about form availability
      noticeText.innerHTML = `Form submission is open till 5 PM ${timeZone}. Submit before the deadline.`;

      // Enable button & restore styles
      submitButton.disabled = false;
      submitButton.style.backgroundColor = "var(--success-color)";
      submitButton.style.opacity = "1";
      submitButton.style.cursor = "pointer";

      return true;
    } else {
      formStatus.textContent = `❌ Form is currently closed. Please submit between 10 AM and 5 PM ${timeZone}.`;
      formStatus.style.color = "var(--error-color)";

      // Disable button & apply fade effect
      submitButton.disabled = true;
      submitButton.style.backgroundColor = "gray";
      submitButton.style.opacity = "0.5";
      submitButton.style.cursor = "not-allowed";

      // Calculate next opening time (10 AM local time)
      let targetTime = new Date(now);
      if (hours >= 17) {
        targetTime.setDate(now.getDate() + 1); // Next day 10 AM
      }
      targetTime.setHours(10, 0, 0, 0);

      let remainingTimeInSeconds = Math.floor((targetTime - now) / 1000);

      function updateCountdown() {
        let h = Math.floor(remainingTimeInSeconds / 3600);
        let m = Math.floor((remainingTimeInSeconds % 3600) / 60);
        let s = remainingTimeInSeconds % 60;

        let remainingTimeText = `Time remaining ${h}h ${m}m ${s}s.`;

        // Update notice with countdown
        noticeText.innerHTML = `The form is only available for submissions between 10 AM to 5 PM ${timeZone}. Currently, the form is closed. ${remainingTimeText}`;

        remainingTimeInSeconds--;

        if (remainingTimeInSeconds >= 0) {
          setTimeout(updateCountdown, 1000);
        } else {
          location.reload(); // Refresh when countdown ends
        }
      }

      updateCountdown(); // Start countdown timer
      return false;
    }
  }

  // Run the function
  checkFormSubmissionTime();


  // Check form submission time every minute
  setInterval(checkFormSubmissionTime, 60000)

  // Form submission
  const form = document.getElementById("myForm")

  form.addEventListener("submit", (e) => {
    // Prevent form submission if validation fails
    if (!showErrorIfRequiredFieldsEmpty()) {
      e.preventDefault()
      return
    }

    // Prevent form submission if outside submission hours
    if (!checkFormSubmissionTime()) {
      e.preventDefault()
      alert("Form submission is only available between 10 AM and 5 PM IST. Please try again during these hours.")
      return
    }
  })
})


