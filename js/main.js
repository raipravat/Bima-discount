
// Global Variables
let currentSection = 'home';
let currentTopic = 'pros-cons';
let currentResearch = 'market-share';

// Navigation Functions
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
    
    // Close mobile menu
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.remove('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Initialize section-specific features
    if (sectionId === 'research') {
        initializeCharts();
    }
}

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
    const topicBtns = document.querySelectorAll('.topic-btn');
    topicBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[onclick="showTopic('${topicId}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

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
    const researchBtns = document.querySelectorAll('.research-btn');
    researchBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[onclick="showResearch('${researchId}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Initialize charts for specific research sections
    setTimeout(() => {
        initializeCharts();
    }, 100);
}

function updateNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(currentSection)) {
            link.classList.add('active');
        }
    });
}

function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// FAQ Functions
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const isActive = element.classList.contains('active');
    
    // Close all other FAQs in the same category
    const categoryFAQs = element.closest('.faq-category').querySelectorAll('.faq-question');
    categoryFAQs.forEach(faq => {
        faq.classList.remove('active');
        faq.nextElementSibling.classList.remove('active');
    });
    
    // Toggle current FAQ
    if (!isActive) {
        element.classList.add('active');
        answer.classList.add('active');
    }
}

// Calculator Functions
function calculatePremium() {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const sumAssured = parseInt(document.getElementById('sumAssured').value);
    const policyType = document.getElementById('policyType').value;
    const policyTerm = parseInt(document.getElementById('policyTerm').value);
    const smoking = document.getElementById('smoking').value;
    
    // Validation
    if (!age || !sumAssured || age < 18 || age > 65) {
        alert('कृपया सबै विवरण सही तरिकाले भर्नुहोस्।');
        return;
    }
    
    // Base premium calculation (simplified)
    let basePremium = sumAssured * 100000; // Convert to paisa
    
    // Age factor
    if (age <= 30) basePremium *= 0.008;
    else if (age <= 40) basePremium *= 0.012;
    else if (age <= 50) basePremium *= 0.018;
    else basePremium *= 0.025;
    
    // Gender factor
    if (gender === 'female') basePremium *= 0.9;
    
    // Policy type factor
    const policyFactors = {
        'term': 1.0,
        'endowment': 3.5,
        'whole': 4.2,
        'ulip': 2.8
    };
    basePremium *= policyFactors[policyType] || 1.0;
    
    // Policy term factor
    if (policyTerm <= 15) basePremium *= 1.1;
    else if (policyTerm <= 25) basePremium *= 1.0;
    else basePremium *= 0.95;
    
    // Smoking factor
    if (smoking === 'yes') basePremium *= 1.3;
    
    // Calculate final values
    const monthlyPremium = Math.round(basePremium / 12);
    const yearlyPremium = Math.round(basePremium);
    const totalPayment = yearlyPremium * policyTerm;
    const deathBenefit = sumAssured * 100000; // Convert to paisa
    
    // Display results
    document.getElementById('monthlyPremium').textContent = 
        'रु. ' + monthlyPremium.toLocaleString('ne-NP');
    document.getElementById('yearlyPremium').textContent = 
        'रु. ' + yearlyPremium.toLocaleString('ne-NP');
    document.getElementById('totalPayment').textContent = 
        'रु. ' + totalPayment.toLocaleString('ne-NP');
    document.getElementById('deathBenefit').textContent = 
        'रु. ' + deathBenefit.toLocaleString('ne-NP');
    
    // Show premium breakdown chart
    showPremiumBreakdown(yearlyPremium);
    
    // Show results section
    document.getElementById('calculatorResults').style.display = 'block';
}

function showPremiumBreakdown(totalPremium) {
    const ctx = document.getElementById('premiumChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (window.premiumChart) {
        window.premiumChart.destroy();
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
    
    window.premiumChart = new Chart(ctx, {
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

// Chart Initialization Functions
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

function initializeMarketShareChart() {
    const ctx = document.getElementById('marketShareChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (window.marketShareChart) {
        window.marketShareChart.destroy();
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
    
    window.marketShareChart = new Chart(ctx, {
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

function initializeProvinceChart() {
    const ctx = document.getElementById('provinceChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (window.provinceChart) {
        window.provinceChart.destroy();
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
    
    window.provinceChart = new Chart(ctx, {
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

function initializeClaimsChart() {
    const ctx = document.getElementById('claimsChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (window.claimsChart) {
        window.claimsChart.destroy();
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
    
    window.claimsChart = new Chart(ctx, {
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

function initializeTrendCharts() {
    initializePremiumGrowthChart();
    initializePolicyGrowthChart();
}

function initializePremiumGrowthChart() {
    const ctx = document.getElementById('premiumGrowthChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (window.premiumGrowthChart) {
        window.premiumGrowthChart.destroy();
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
    
    window.premiumGrowthChart = new Chart(ctx, {
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

function initializePolicyGrowthChart() {
    const ctx = document.getElementById('policyGrowthChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (window.policyGrowthChart) {
        window.policyGrowthChart.destroy();
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
    
    window.policyGrowthChart = new Chart(ctx, {
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

// Contact Form Handler
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
    
    // Simulate form submission (in real implementation, this would send to a server)
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

// Search Functionality (Basic)
function initializeSearch() {
    // This is a placeholder for search functionality
    // In a real implementation, this would index all content and provide search results
    console.log('Search functionality initialized');
}

// Utility Functions
function formatNepaliNumber(number) {
    return number.toLocaleString('ne-NP');
}

function formatCurrency(amount) {
    return `रु. ${amount.toLocaleString('ne-NP')}`;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    console.log('जीवन बीमा शिक्षा वेबसाइट लोड भयो');
    
    // Set default section
    showSection('home');
    
    // Initialize search
    initializeSearch();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(event) {
        // ESC key to close mobile menu
        if (event.key === 'Escape') {
            const navMenu = document.getElementById('navMenu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Add click outside to close mobile menu
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
        anchor.addEventListener('click', function (e) {
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
    
    // Add loading animation for charts
    const chartElements = document.querySelectorAll('canvas');
    chartElements.forEach(canvas => {
        canvas.addEventListener('load', function() {
            console.log('Chart loaded:', canvas.id);
        });
    });
});

// Resize handler for responsive charts
window.addEventListener('resize', function() {
    // Resize charts when window is resized
    if (window.premiumChart) {
        window.premiumChart.resize();
    }
    if (window.marketShareChart) {
        window.marketShareChart.resize();
    }
    if (window.provinceChart) {
        window.provinceChart.resize();
    }
    if (window.claimsChart) {
        window.claimsChart.resize();
    }
    if (window.premiumGrowthChart) {
        window.premiumGrowthChart.resize();
    }
    if (window.policyGrowthChart) {
        window.policyGrowthChart.resize();
    }
});

// Print functionality
function printSection() {
    window.print();
}

// Share functionality (basic)
function shareContent() {
    if (navigator.share) {
        navigator.share({
            title: 'गैर-नाफामूलक जीवन बीमा शिक्षा',
            text: 'नेपालमा जीवन बीमाको सम्पूर्ण जानकारी',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('लिङ्क क्लिपबोर्डमा कपी भएको छ!');
        });
    }
}

// Analytics (placeholder)
function trackEvent(category, action, label) {
    // This would integrate with Google Analytics or similar service
    console.log('Event tracked:', { category, action, label });
}

// Error handling
window.addEventListener('error', function(event) {
    console.error('Application error:', event.error);
    // In production, this would send error reports to a logging service
});

// Service Worker registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would be registered here for offline functionality
        console.log('Service Worker ready for registration');
    });
}

// Accessibility enhancements
function enhanceAccessibility() {
    // Add ARIA labels where needed
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (button.textContent.trim()) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
    
    // Add skip links
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only';
    skipLink.textContent = 'मुख्य सामग्रीमा जानुहोस्';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
}

measurePerformance();
