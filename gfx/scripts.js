window.onload = function() {
    var loader = document.getElementById('loader');
    loader.style.display = 'none';  // Hides the loader
};


setTimeout(() => {
    document.getElementById("lets_work_btn_wrapper").style.opacity = "0.8";
}, 20000);

const menuToggle = document.getElementById('menuToggle');
const menuList = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    menuList.classList.toggle('show');
    menuToggle.classList.toggle('active');
});

const toggles = document.querySelectorAll('#menuToggle .toggle');

toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggles.forEach(t => t.classList.toggle('hover'));
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const showBeforeAfter = document.getElementById('showBeforeAfter');
    const thumbnailButton = document.getElementById('thumbnail');
    const subButtons = document.getElementById('sub-buttons');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const subButtonsList = document.querySelectorAll('.sub-button');
    const gallery = document.querySelector('.gallery');
    const loading = document.getElementById('loading'); // Get the loading element

    let page = 1;
    const limit = 15;
    let noMoreImages = false; // Flag to indicate if there are no more images

    document.getElementById('SocliaMedia').addEventListener('click', function() {
        window.open('../smd', '_self');
    });
    document.getElementById('Others').addEventListener('click', function() {
    });
    // Apply filter to gallery items
    const applyFilters = () => {
        const filter = Array.from(filterButtons).find(btn => btn.classList.contains('active'))?.id || 'all';
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (filter === 'all') {
                item.style.display = 'block';
            } else if (item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    };

    // Apply filter for sub-buttons
    const applySubFilter = (filter) => {
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    };

    // Handle filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            applyFilters();
        });
    });

    // Handle sub-button clicks
    subButtonsList.forEach(button => {
        button.addEventListener('click', () => {
            applySubFilter(button.id);
        });
    });

    // Create an image element with onLoad event
    const createImageElement = (src, alt, className) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.className = className;
        img.style.opacity = '0'; // Initially hide the image
        img.onload = () => {
            img.style.opacity = '1'; // Show the image once it is fully loaded
        };
        return img;
    };

    // Fetch images and update gallery
    const fetchImages = () => {
        if (noMoreImages) return; // Skip fetching if no more images to load

        loading.style.display = 'block';

        fetch('images.json')
            .then(response => response.json())
            .then(data => {
                const images = data.images.slice((page - 1) * limit, page * limit);
                if (images.length === 0) {
                    loading.style.display = 'none';
                    noMoreImages = true; // Set flag to indicate no more images
                    return;
                }
                images.forEach(image => {
                    const galleryItem = document.createElement('div');
                    galleryItem.className = `gallery-item thumbnail ${image.category}`;

                    const sliderContainer = document.createElement('div');
                    sliderContainer.className = 'slider-container';

                    const afterImg = createImageElement(image.src_after, image.alt_after, 'after');
                    const beforeImg = createImageElement(image.src_before, image.alt_before, 'before');

                    const slider = document.createElement('input');
                    slider.type = 'range';
                    slider.min = '0';
                    slider.max = '100';
                    slider.value = '0'; // Default position of the slider (0 to 100)
                    slider.className = 'slider';

                    sliderContainer.appendChild(afterImg);
                    sliderContainer.appendChild(beforeImg);
                    sliderContainer.appendChild(slider);

                    galleryItem.appendChild(sliderContainer);
                    gallery.appendChild(galleryItem);

                    // Initialize slider functionality
                    initializeSlider(slider, beforeImg);
                });

                loading.style.display = 'none';
                page++;
            })
            .catch(error => {
                console.error('Error loading images:', error);
                loading.innerText = 'Failed to load images';
                loading.style.display = 'none';
            });
    };

    // Initial load of images
    fetchImages();

    // Handle scrolling to load more images
    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            if (loading.style.display === 'none') {
                fetchImages();
            }
        }
    };

    // Initialize slider functionality
    function initializeSlider(slider, beforeImg) {
        // Function to update the clip-path based on slider value
        const updateClipPath = (value) => {
            beforeImg.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
        };

        // Update clip-path when the slider is moved
        slider.addEventListener('input', () => {
            updateClipPath(slider.value);
        });

        // Update clip-path based on mouse movement over the container
        slider.parentElement.addEventListener('mousemove', (event) => {
            const containerWidth = slider.parentElement.offsetWidth;
            const offsetX = event.clientX - slider.parentElement.getBoundingClientRect().left;
            const percentage = Math.max(0, Math.min(100, (offsetX / containerWidth) * 100));
            updateClipPath(percentage);
            slider.value = percentage; // Sync slider value with mouse position
        });

        // Optionally, reset slider to its default position on mouse leave
        slider.parentElement.addEventListener('mouseleave', () => {
            updateClipPath(0);
            slider.value = 0;
        });
    }

    window.addEventListener('scroll', handleScroll);

    
    
});


