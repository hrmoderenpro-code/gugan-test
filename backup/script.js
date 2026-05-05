const canvas = document.getElementById('hero-canvas');
const context = canvas.getContext('2d');

const frameCount = 240;
const currentFrame = index => (
  `./sequence/Gugan Webp/frame_${index.toString().padStart(3, '0')}_delay-0.033s.png`
);

const images = [];
const hero = {
  frame: 0
};

// Preload images
let imagesLoaded = 0;
const loaderBar = document.getElementById('loader-bar');
const loaderPercentage = document.getElementById('loader-percentage');
const loader = document.getElementById('loader');

function preloadImages() {
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            imagesLoaded++;
            const progress = (imagesLoaded / frameCount) * 100;
            loaderBar.style.width = `${progress}%`;
            loaderPercentage.innerText = `${Math.round(progress)}%`;
            
            if (imagesLoaded === frameCount) {
                initCanvas();
                hideLoader();
            }
        };
        images[i] = img;
    }
}

function hideLoader() {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }, 500);
}

// Canvas initialization and scaling
function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const img = images[hero.frame];
    if (!img) return;

    // Calculate scaling to cover the canvas (like object-fit: cover)
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, drawX, drawY;

    if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        drawX = 0;
        drawY = (canvas.height - drawHeight) / 2;
    } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        drawX = (canvas.width - drawWidth) / 2;
        drawY = 0;
    }

    context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
}

// Scroll interaction
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScroll;
    
    // Calculate current frame index based on scroll
    // We only map the scroll within the hero section (which is 400vh)
    const heroSection = document.getElementById('hero');
    const heroHeight = heroSection.offsetHeight - window.innerHeight;
    const heroScrollFraction = Math.min(Math.max(scrollTop / heroHeight, 0), 1);
    
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(heroScrollFraction * frameCount)
    );

    if (hero.frame !== frameIndex) {
        hero.frame = frameIndex;
        requestAnimationFrame(render);
    }

    // Parallax content effect
    const content = document.querySelector('[data-parallax-content]');
    if (content) {
        const yOffset = scrollTop * 0.5;
        const opacity = 1 - (scrollTop / 800);
        content.style.transform = `translateY(${yOffset}px)`;
        content.style.opacity = Math.max(opacity, 0);
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
});

// Feature Navigation Logic
const features = [
    { name: "Attendance System", desc: "Face recognition, geofencing, and automated shift management." },
    { name: "Payroll Engine", desc: "Automated salary calculation, taxes, and instant payslip generation." },
    { name: "AI HR Assistant", desc: "Intelligent analytics, draft generation, and scoring." },
    { name: "KPI & OKR", desc: "Performance tracking with real-time analytics and goal alignment." },
    { name: "Analytics Dashboard", desc: "Comprehensive workforce insights and prediction modeling." }
];

let activeFeatureIndex = 0;
const featureName = document.getElementById('feature-name');
const featureDesc = document.getElementById('feature-desc');
const currentIndexEl = document.getElementById('current-index');
const featureDisplay = document.getElementById('feature-display');

function updateFeature(index) {
    featureDisplay.style.opacity = '0';
    featureDisplay.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        activeFeatureIndex = index;
        featureName.innerText = features[index].name;
        featureDesc.innerText = features[index].desc;
        currentIndexEl.innerText = (index + 1).toString().padStart(2, '0');
        
        featureDisplay.style.opacity = '1';
        featureDisplay.style.transform = 'translateX(0)';
    }, 300);
}

document.getElementById('next-feature').addEventListener('click', () => {
    const nextIndex = (activeFeatureIndex + 1) % features.length;
    updateFeature(nextIndex);
});

document.getElementById('prev-feature').addEventListener('click', () => {
    const prevIndex = (activeFeatureIndex - 1 + features.length) % features.length;
    updateFeature(prevIndex);
});

// Mouse Move Parallax (Subtle)
window.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    const canvasContainer = document.querySelector('.canvas-container');
    canvasContainer.style.transform = `scale(1.02) translate(${moveX}px, ${moveY}px)`;
});

// FAQ Accordion
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        const isOpen = answer.style.display === 'block';
        
        // Close all others
        document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
        document.querySelectorAll('.faq-toggle').forEach(tog => tog.innerText = '+');
        
        if (!isOpen) {
            answer.style.display = 'block';
            toggle.innerText = '-';
        }
    });
});

// Start preloading
preloadImages();
render();
