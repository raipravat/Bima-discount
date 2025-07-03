// =============================================
// Global Variables
// =============================================
let currentSection = 'home';
let currentTopic = 'pros-cons';
let currentResearch = 'market-share';
let premiumChart, marketShareChart, provinceChart, claimsChart, premiumGrowthChart, policyGrowthChart;

// =============================================
// Navigation Functions
// =============================================

/**
 * Shows the selected section and hides others
 * @param {string} sectionId - ID of the section to show
 */
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
    }
    
    // Update navigation active state
    updateNavigation();
    
    // Close mobile menu if open
    closeMobileMenu();
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Initialize section-specific features
    if (sectionId === 'research') {
        initializeCharts();
    } else if (sectionId === 'calculator') {
        initializeCalculator();
    }
}

/**
 * Updates the active state in navigation
 */
function updateNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(currentSection)) {
            link.classList.add('active');
        }
    });
}

/**
 * Toggles mobile menu visibility
 */
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

/**
 * Closes mobile menu if open
 */
function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
}

/**
 * Shows the selected topic in Basics section
 * @param {string} topicId - ID of the topic to show
 */
function showTopic(topicId) {
    // Hide all topic contents
    const topics = document.querySelectorAll('.topic-content');
    topics.forEach(topic => {
        topic.classList.remove('active');
    });
    
    // Show selected topic
    const targetTopic = document.getElementById(topicId);
    if (targetTopic) {
        targetTopic.classList.add('active');
        currentTopic = topicId;
    }
    
    // Update topic navigation
    updateTopicNavigation(topicId);
}

/**
 * Updates active state in topic navigation
 * @param {string} topicId - ID of the active topic
 */
function updateTopicNavigation(topicId) {
    const topicBtns = document.querySelectorAll('.topic-btn');
    topicBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[onclick="showTopic('${topicId}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

/**
 * Shows the selected research topic
 * @param {string} researchId - ID of the research topic to show
 */
function showResearch(researchId) {
    // Hide all research contents
    const researches = document.querySelectorAll('.research-content');
    researches.forEach(research => {
        research.classList.remove('active');
    });
    
    // Show selected research
    const targetResearch = document.getElementById(researchId);
    if (targetResearch) {
        targetResearch.classList.add('active');
        currentResearch = researchId;
    }
    
    // Update research navigation
    updateResearchNavigation(researchId);
    
    // Initialize charts for specific research sections
    setTimeout(() => {
        initializeCharts();
    }, 100);
}

/**
 * Updates active state in research navigation
 * @param {string} researchId - ID of the active research topic
 */
function updateResearchNavigation(researchId) {
    const researchBtns = document.querySelectorAll('.research-btn');
    researchBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[onclick="showResearch('${researchId}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// =============================================
// FAQ Functions
// =============================================

/**
 * Toggles FAQ answer visibility
 * @param {HTMLElement} element - The clicked FAQ question element
 */
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const isActive = element.classList.contains('active');
    
    // Close all other FAQs in the same category
    const categoryFAQs = element.closest('.faq-category').querySelectorAll('.faq-question');
    categoryFAQs.forEach(faq => {
        faq.classList.remove('active');
        faq.nextElementSibling.classList.remove('active');
    });
    
    // Toggle current FAQ if it wasn't active
    if (!isActive) {
        element.classList.add('active');
        answer.classList.add('active');
    }
}

// =============================================
// Calculator Functions
// =============================================

/**
 * Initializes calculator section
 */
function initializeCalculator() {
    // Set default values
    document.getElementById('age').value = 35;
    document.getElementById('sumAssured').value = 20;
    
    // Add event listeners for real-time calculation if needed
    // document.getElementById('age').addEventListener('input', calculatePremium);
    // document.getElementById('sumAssured').addEventListener('input', calculatePremium);
}

/**
 * Calculates insurance premium based on user inputs
 */
function calculatePremium() {
    // Get input values
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const sumAssured = parseInt(document.getElementById('sumAssured').value);
    const policyType = document.getElementById('policyType').value;
    const policyTerm = parseInt(document.getElementById('policyTerm').value);
    const smoking = document.getElementById('smoking').value;
    
    // Validate inputs
    if (!age || !sumAssured || age < 18 || age > 65) {
        showAlert('कृपया सबै विवरण सही तरिकाले भर्नुहोस्।', 'error');
        return;
    }
    
    // Base premium calculation (simplified)
    let basePremium = sumAssured * 100000; // Convert to paisa
    
    // Apply factors
    basePremium = applyAgeFactor(basePremium, age);
    basePremium = applyGenderFactor(basePremium, gender);
    basePremium = applyPolicyTypeFactor(basePremium, policyType);
    basePremium = applyPolicyTermFactor(basePremium, policyTerm);
    basePremium = applySmokingFactor(basePremium, smoking);
    
    // Calculate final values
    const monthlyPremium = Math.round(basePremium / 12);
    const yearlyPremium = Math.round(basePremium);
    const totalPayment = yearlyPremium * policyTerm;
    const deathBenefit = sumAssured * 100000; // Convert to paisa
    
    // Display results
    displayResults(monthlyPremium, yearlyPremium, totalPayment, deathBenefit);
    
    // Show premium breakdown chart
    showPremiumBreakdown(yearlyPremium);
}

/**
 * Applies age factor to premium calculation
 */
function applyAgeFactor(premium, age) {
    if (age <= 30) return premium * 0.008;
    if (age <= 40) return premium * 0.012;
    if (age <= 50) return premium * 0.018;
    return premium * 0.025;
}

/**
 * Applies gender factor to premium calculation
 */
function applyGenderFactor(premium, gender) {
    return gender === 'female' ? premium * 0.9 : premium;
}

/**
 * Applies policy type factor to premium calculation
 */
function applyPolicyTypeFactor(premium, policyType) {
    const factors = {
        'term': 1.0,
        'endowment': 3.5,
        'whole': 4.2,
        'ulip': 2.8
    };
    return premium * (factors[policyType] || 1.0);
}

/**
 * Applies policy term factor to premium calculation
 */
function applyPolicyTermFactor(premium, policyTerm) {
    if (policyTerm <= 15) return premium * 1.1;
    if (policyTerm <= 25) return premium;
    return premium * 0.95;
}

/**
 * Applies smoking factor to premium calculation
 */
function applySmokingFactor(premium, smoking) {
    return smoking === 'yes' ? premium * 1.3 : premium;
}

/**
 * Displays calculation results
 */
function displayResults(monthly, yearly, total, benefit) {
    document.getElementById('monthlyPremium').textContent = 
        'रु. ' + monthly.toLocaleString('ne-NP');
    document.getElementById('yearlyPremium').textContent = 
        'रु. ' + yearly.toLocaleString('ne-NP');
    document.getElementById('totalPayment').textContent = 
        'रु. ' + total.toLocaleString('ne-NP');
    document.getElementById('deathBenefit').textContent = 
        'रु. ' + benefit.toLocaleString('ne-NP');
    
    // Show results section
    document.getElementById('calculatorResults').style.display = 'block';
}

/**
 * Shows premium breakdown chart
 */
function showPremiumBreakdown(totalPremium) {
    const ctx = document.getElementById('premiumChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (premiumChart) {
        premiumChart.destroy();
    }
    
    const data = {
        labels: ['मृत्यु जोखिम', 'प्रशासनिक खर्च', 'कमिसन', 'नाफा', 'बचत भाग'],
        datasets: [{
            data: [40, 25, 15, 10, 10],
            backgroundColor: [
                '#e74c3c',
                '#f39c12',
                '#9b59b6',
                '#2ecc71',
                '#3498db'
            ],
            borderWidth: 2,
            borderColor: '#fff'
        }]
    };
    
    premiumChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const amount = Math.round(totalPremium * value / 100);
                            return `${label}: ${value}% (रु. ${amount.toLocaleString('ne-NP')})`;
                        }
                    }
                }
            }
        }
    });
}

// =============================================
// Chart Functions
// =============================================

/**
 * Initializes charts for the current section
 */
function initializeCharts() {
    if (currentResearch === 'market-share') {
        initializeMarketShareChart();
    } else if (currentResearch === 'penetration') {
        initializeProvinceChart();
    } else if (currentResearch === 'claims-data') {
        initializeClaimsChart();
    } else if (currentResearch === 'trends') {
        initializeTrendCharts();
    }
}

/**
 * Initializes market share chart
 */
function initializeMarketShareChart() {
    const ctx = document.getElementById('marketShareChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (marketShareChart) {
        marketShareChart.destroy();
    }
    
    const data = {
        labels: [
            'Nepal Life Insurance',
            'Asian Life Insurance', 
            'National Life Insurance',
            'Prime Life Insurance',
            'Mahalaxmi Life Insurance',
            'अन्य कम्पनीहरू'
        ],
        datasets: [{
            data: [18.5, 15.2, 12.8, 10.3, 9.7, 33.5],
            backgroundColor: [
                '#3498db',
                '#e74c3c',
                '#f39c12',
                '#2ecc71',
                '#9b59b6',
                '#95a5a6'
            ],
            borderWidth: 2,
            borderColor: '#fff'
        }]
    };
    
    marketShareChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            return `${label}: ${value}%`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initializes province penetration chart
 */
function initializeProvinceChart() {
    const ctx = document.getElementById('provinceChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (provinceChart) {
        provinceChart.destroy();
    }
    
    const data = {
        labels: [
            'बागमती प्रदेश',
            'गण्डकी प्रदेश', 
            'प्रदेश १',
            'लुम्बिनी प्रदेश',
            'मधेश प्रदेश',
            'सुदूरपश्चिम प्रदेश',
            'कर्णाली प्रदेश'
        ],
        datasets: [{
            label: 'बीमा पहुँच (%)',
            data: [8.5, 4.2, 3.8, 2.1, 1.9, 0.8, 0.6],
            backgroundColor: '#3498db',
            borderColor: '#2980b9',
            borderWidth: 2
        }]
    };
    
    provinceChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'पहुँच दर (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'प्रदेश'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `पहुँच दर: ${context.parsed.y}%`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initializes claims data chart
 */
function initializeClaimsChart() {
    const ctx = document.getElementById('claimsChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (claimsChart) {
        claimsChart.destroy();
    }
    
    const data = {
        labels: [
            'अपूर्ण कागजात',
            'पूर्व-अवस्थित रोग',
            'आत्महत्या',
            'प्रिमियम बकाया',
            'अन्य कारण'
        ],
        datasets: [{
            data: [28, 22, 18, 15, 17],
            backgroundColor: [
                '#e74c3c',
                '#f39c12',
                '#9b59b6',
                '#e67e22',
                '#95a5a6'
            ],
            borderWidth: 2,
            borderColor: '#fff'
        }]
    };
    
    claimsChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            return `${label}: ${value}%`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initializes trend charts
 */
function initializeTrendCharts() {
    initializePremiumGrowthChart();
    initializePolicyGrowthChart();
}

/**
 * Initializes premium growth chart
 */
function initializePremiumGrowthChart() {
    const ctx = document.getElementById('premiumGrowthChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (premiumGrowthChart) {
        premiumGrowthChart.destroy();
    }
    
    const data = {
        labels: ['२०१९/२०', '२०२०/२१', '२०२१/२२', '२०२२/२३', '२०२३/२४'],
        datasets: [{
            label: 'प्रिमियम सङ्कलन (अर्ब रुपैयाँ)',
            data: [28, 32, 37, 41, 45],
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
        }]
    };
    
    premiumGrowthChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'रकम (अर्ब रुपैयाँ)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'आर्थिक वर्ष'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `प्रिमियम: ${context.parsed.y} अर्ब रुपैयाँ`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initializes policy growth chart
 */
function initializePolicyGrowthChart() {
    const ctx = document.getElementById('policyGrowthChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (policyGrowthChart) {
        policyGrowthChart.destroy();
    }
    
    const data = {
        labels: ['२०१९/२०', '२०२०/२१', '२०२१/२२', '२०२२/२३', '२०२३/२४'],
        datasets: [{
            label: 'नयाँ पोलिसी (हजार)',
            data: [125, 145, 168, 192, 218],
            borderColor: '#2ecc71',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
        }]
    };
    
    policyGrowthChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'पोलिसी संख्या (हजार)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'आर्थिक वर्ष'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `नयाँ पोलिसी: ${context.parsed.y} हजार`;
                        }
                    }
                }
            }
        }
    });
}

// =============================================
// Contact Form Functions
// =============================================

/**
 * Handles contact form submission
 * @param {Event} event - Form submission event
 */
function handleContact(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const messageDiv = document.getElementById('contactMessage');
    
    // Get form data
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const category = formData.get('category');
    const message = formData.get('message');
    
    // Validate form
    if (!name || !email || !category || !message) {
        showContactMessage('कृपया सबै फिल्डहरू भर्नुहोस्।', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showContactMessage('कृपया सही इमेल ठेगाना प्रविष्ट गर्नुहोस्।', 'error');
        return;
    }
    
    // Simulate form submission
    showContactMessage('तपाईंको सन्देश सफलतापूर्वक पठाइएको छ। हामी चाँडै सम्पर्क गर्नेछौं।', 'success');
    
    // Clear form
    form.reset();
    
    // Log to console (for development)
    console.log('Contact form submitted:', {
        name,
        email,
        category,
        message,
        timestamp: new Date().toISOString()
    });
}

/**
 * Shows contact form message
 * @param {string} message - Message to display
 * @param {string} type - Type of message ('success' or 'error')
 */
function showContactMessage(message, type) {
    const messageDiv = document.getElementById('contactMessage');
    if (!messageDiv) return;
    
    messageDiv.textContent = message;
    messageDiv.className = `contact-message ${type}`;
    messageDiv.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// =============================================
// Utility Functions
// =============================================

/**
 * Shows alert message
 * @param {string} message - Message to display
 * @param {string} type - Type of alert ('success' or 'error')
 */
function showAlert(message, type) {
    alert(message); // In production, replace with a custom modal
}

/**
 * Formats number to Nepali locale
 * @param {number} number - Number to format
 * @returns {string} Formatted number string
 */
function formatNepaliNumber(number) {
    return number.toLocaleString('ne-NP');
}

/**
 * Formats currency amount
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return `रु. ${amount.toLocaleString('ne-NP')}`;
}

// =============================================
// Event Listeners and Initialization
// =============================================

/**
 * Initializes the application
 */
function initializeApp() {
    // Set default section
    showSection('home');
    
    // Initialize calculator
    initializeCalculator();
    
    // Add event listeners
    setupEventListeners();
    
    // Initialize accessibility features
    enhanceAccessibility();
}

/**
 * Sets up event listeners
 */
function setupEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        // ESC key to close mobile menu
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Click outside to close mobile menu
    document.addEventListener('click', function(event) {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active') && 
            !navMenu.contains(event.target) && 
            !navToggle.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Resize handler for responsive charts
    window.addEventListener('resize', function() {
        if (premiumChart) premiumChart.resize();
        if (marketShareChart) marketShareChart.resize();
        if (provinceChart) provinceChart.resize();
        if (claimsChart) claimsChart.resize();
        if (premiumGrowthChart) premiumGrowthChart.resize();
        if (policyGrowthChart) policyGrowthChart.resize();
    });
}

/**
 * Enhances accessibility features
 */
function enhanceAccessibility() {
    // Add ARIA labels where needed
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (button.textContent.trim()) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only';
    skipLink.textContent = 'मुख्य सामग्रीमा जानुहोस्';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Error handling
window.addEventListener('error', function(event) {
    console.error('Application error:', event.error);
    // In production, send error reports to a logging service
});

// Service Worker registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would be registered here for offline functionality
        console.log('Service Worker ready for registration');
    });
}