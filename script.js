document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#6c5ce7"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#6c5ce7",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Initialize syntax highlighting
    hljs.highlightAll();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            navActions.classList.toggle('show');
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.script-card, .feature-card, .community-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    document.querySelectorAll('.script-card, .feature-card, .community-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});
document.addEventListener('DOMContentLoaded', function() {

    // Script Browser Modal Functionality
    const modal = document.querySelector('.script-modal');
    const btns = document.querySelectorAll('.btn-script');
    const closeBtn = document.querySelector('.close-btn');
    const fileTree = document.getElementById('fileTree');
    const fileContent = document.getElementById('fileContent');
    const emptyState = document.querySelector('.empty-state');
    const modalTitle = document.querySelector('.modal-content h2');
    
    // Base GitHub API URL
    const repoUrl = 'https://api.github.com/repos/wfrw/isabelle.cfg/contents/Scripts';
    
    // Handle script button clicks
    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            const folderName = this.getAttribute('data-folder');
            modal.style.display = 'block';
            modalTitle.textContent = `${folderName} Scripts`;
            modalTitle.setAttribute('data-folder', folderName);
            fetchScripts(folderName);
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Fetch scripts for specific folder
    async function fetchScripts(folderName) {
        // Helper function to clean folder names
        function cleanFolderName(name) {
            // Remove invisible Unicode characters (including left-to-right marks) and trim whitespace
            return name.replace(/[\u200E\u200F\u202A-\u202E]/g, '').trim();
        }
    
        try {
            fileTree.innerHTML = '<div class="loading">Loading scripts...</div>';
            emptyState.style.display = 'none';
            fileContent.style.display = 'none';
            
            // First fetch the root contents to find the exact folder name
            const repoResponse = await fetch(repoUrl);
            if (!repoResponse.ok) throw new Error('Failed to fetch repository structure');
            
            const repoData = await repoResponse.json();
            const folders = repoData.filter(item => item.type === 'dir');
            
            // Find the folder with matching cleaned name
            const targetFolder = folders.find(folder => 
                cleanFolderName(folder.name) === cleanFolderName(folderName)
            );
            
            if (!targetFolder) {
                throw new Error(`Folder "${cleanFolderName(folderName)}" not found`);
            }
            
            // Now fetch the folder contents using the original name (with invisible chars if present)
            const response = await fetch(targetFolder.url);
            if (!response.ok) throw new Error(`Failed to load ${cleanFolderName(folderName)} scripts`);
            
            const data = await response.json();
            fileTree.innerHTML = '';
            
            // Filter for Lua files
            const luaFiles = data.filter(item => 
                item.type === 'file' && item.name.endsWith('.lua')
            );
            
            if (luaFiles.length === 0) {
                fileTree.innerHTML = '<div class="no-files">No scripts found in this folder</div>';
                return;
            }
            
            // Display files
            luaFiles.forEach(file => {
                const fileElement = document.createElement('div');
                fileElement.className = 'file-item';
                fileElement.innerHTML = `<i class="fas fa-file-code"></i> ${file.name}`;
                fileElement.addEventListener('click', () => loadFileContent(file));
                fileTree.appendChild(fileElement);
            });
            
        } catch (error) {
            fileTree.innerHTML = `<div class="error">Error: ${error.message}</div>`;
            console.error(error);
        }
    }
    

    // Then modify your loadFileContent function:
    async function loadFileContent(file) {
        // Clear active state from all files
        document.querySelectorAll('.file-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Set active state on clicked file
        event.target.classList.add('active');
        
        try {
            const response = await fetch(file.download_url);
            if (!response.ok) throw new Error('Failed to fetch file');
            const content = await response.text();
            
            emptyState.style.display = 'none';
            fileContent.style.display = 'block';
            
            // Apply syntax highlighting
            fileContent.innerHTML = `<code class="language-lua">${content}</code>`;
            
            // If using highlight.js (recommended), replace above with:
            // fileContent.innerHTML = `<pre><code class="language-lua">${content}</code></pre>`;
            // hljs.highlightElement(fileContent.querySelector('code'));
            
        } catch (error) {
            fileContent.innerHTML = `Error loading file: ${error.message}`;
        }
    }
});
