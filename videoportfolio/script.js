// ===== VIDEO PORTFOLIO SCRIPT =====

let videosData = null;

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Initialize app
    initApp();
});

async function initApp() {
    await loadVideosData();
    initNavigation();
    initFilterTabs();
    initFloatingCTA();
    initSmoothScroll();
}

// ===== LOAD VIDEOS DATA =====
async function loadVideosData() {
    try {
        const response = await fetch('videos.json');
        if (!response.ok) throw new Error('Failed to load videos');

        videosData = await response.json();

        // Render grids
        renderPortfolioGrid(videosData.mixed);
        renderLongformGrid(videosData.longform);
        renderShortsGrid(videosData.shorts);

    } catch (error) {
        console.error('Error loading videos:', error);
        showErrorState();
    }
}

// ===== ASPECT RATIO HELPER =====
function getAspectClass(aspectRatio) {
    const map = {
        '16:9': 'ar-16-9',
        '9:16': 'ar-9-16',
        '1:1': 'ar-1-1',
        '4:5': 'ar-4-5'
    };
    return map[aspectRatio] || 'ar-16-9';
}

// ===== CREATE VIDEO CARD =====
function createVideoCard(video, index) {
    const aspectClass = getAspectClass(video.aspectRatio);
    const delay = (index % 5) * 100;

    return `
        <div class="video-card" data-aos="fade-up" data-aos-delay="${delay}" data-aspect="${video.aspectRatio}">
            <div class="video-card-inner">
                <div class="video-wrapper ${aspectClass}">
                    <wistia-player media-id="${video.id}" aspect="auto"></wistia-player>
                    <div class="video-overlay">
                        <p class="video-title">${video.title || 'Untitled'}</p>
                        <p class="video-aspect">${video.aspectRatio}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===== RENDER PORTFOLIO GRID =====
function renderPortfolioGrid(videos) {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    // Shuffle for variety
    const shuffled = [...videos].sort(() => Math.random() - 0.5);

    grid.innerHTML = shuffled.map((video, index) => createVideoCard(video, index)).join('');

    // Refresh AOS
    AOS.refresh();
}

// ===== RENDER LONGFORM GRID =====
function renderLongformGrid(videos) {
    const grid = document.getElementById('longformGrid');
    if (!grid) return;

    grid.innerHTML = videos.map((video, index) => {
        const delay = (index % 3) * 100;
        return `
            <div class="video-card" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="video-card-inner">
                    <div class="video-wrapper ar-16-9">
                        <wistia-player media-id="${video.id}" aspect="auto"></wistia-player>
                        <div class="video-overlay">
                            <p class="video-title">${video.title || 'Untitled'}</p>
                            <p class="video-aspect">${video.aspectRatio}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    AOS.refresh();
}

// ===== RENDER SHORTS GRID =====
function renderShortsGrid(videos) {
    const grid = document.getElementById('shortsGrid');
    if (!grid) return;

    grid.innerHTML = videos.map((video, index) => {
        const delay = (index % 5) * 100;
        return `
            <div class="video-card" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="video-card-inner">
                    <div class="video-wrapper ar-9-16">
                        <wistia-player media-id="${video.id}" aspect="auto"></wistia-player>
                        <div class="video-overlay">
                            <p class="video-title">${video.title || 'Untitled'}</p>
                            <p class="video-aspect">${video.aspectRatio}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    AOS.refresh();
}

// ===== ERROR STATE =====
function showErrorState() {
    const grids = ['portfolioGrid', 'longformGrid', 'shortsGrid'];

    grids.forEach(id => {
        const grid = document.getElementById(id);
        if (grid) {
            grid.innerHTML = `
                <div class="col-span-full error-state">
                    <p>Failed to load videos. Please refresh the page.</p>
                </div>
            `;
        }
    });
}

// ===== FILTER TABS =====
function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active state
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Filter videos
            const filter = tab.dataset.filter;
            filterVideos(filter);
        });
    });
}

function filterVideos(filter) {
    const grid = document.getElementById('portfolioGrid');
    if (!grid || !videosData) return;

    let filtered;

    if (filter === 'all') {
        filtered = [...videosData.mixed].sort(() => Math.random() - 0.5);
    } else {
        filtered = videosData.mixed.filter(video => video.aspectRatio === filter);
    }

    // Add fade out effect
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(10px)';

    setTimeout(() => {
        grid.innerHTML = filtered.map((video, index) => createVideoCard(video, index)).join('');

        // Fade in
        grid.style.transition = 'all 0.4s ease';
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';

        AOS.refresh();
    }, 300);
}

// ===== NAVIGATION =====
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');

    if (!menuToggle || !mobileMenu) return;

    function toggleMenu() {
        const isOpen = mobileMenu.classList.toggle('open');

        if (isOpen) {
            bar1.style.transform = 'translateY(4px) rotate(45deg)';
            bar2.style.transform = 'translateY(-4px) rotate(-45deg)';
            bar2.style.width = '1.5rem';
        } else {
            bar1.style.transform = 'none';
            bar2.style.transform = 'none';
            bar2.style.width = '1rem';
        }
    }

    menuToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });
}

// ===== FLOATING CTA =====
function initFloatingCTA() {
    const floatingCTA = document.getElementById('floatingCTA');
    const portfolio = document.getElementById('portfolio');

    if (!floatingCTA || !portfolio) return;

    function checkScroll() {
        const portfolioTop = portfolio.getBoundingClientRect().top;
        const threshold = window.innerHeight * 0.6;

        if (portfolioTop < threshold) {
            floatingCTA.classList.add('visible');
        } else {
            floatingCTA.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const offset = 100;
                const targetPosition = target.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}