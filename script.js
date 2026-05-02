/**
 * Yolong 亚隆 - 官网交互脚本
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initStatsAnimation();
    initSmoothScroll();
    initTabs();
    initScrollAnimations();
    initMobileMenu();
    initSearch();
    initFormSubmit();
});

/**
 * 导航栏滚动效果
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 导航链接激活状态
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * 数字滚动动画
 */
function initStatsAnimation() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateNumber(stat, target);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

function animateNumber(element, target) {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

/**
 * 平滑滚动
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 移动端关闭菜单
                const mobileMenu = document.getElementById('navMenu');
                if (mobileMenu && window.innerWidth <= 768) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
}

/**
 * 解决方案标签页切换
 */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.solution-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // 移除所有激活状态
            tabBtns.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // 激活当前标签
            btn.classList.add('active');
            const panel = document.getElementById(tabId);
            if (panel) {
                panel.classList.add('active');
            }
        });
    });
}

/**
 * 滚动动画
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.product-card, .news-card, .stat-item, .solution-card, .reveal'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

/**
 * 移动端菜单
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileMenuBtn || !navMenu) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileMenuBtn.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // 点击菜单项关闭菜单
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Mobile dropdown toggle for PRODUCTS
    const navDropdown = navMenu.querySelector('.nav-dropdown');
    if (navDropdown) {
        const dropdownLink = navDropdown.querySelector('.nav-link');
        dropdownLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                navDropdown.classList.toggle('open');
            }
        });
    }
}

/**
 * 表单提交
 */
function initFormSubmit() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            console.log('表单提交:', data);
            
            // 显示成功提示
            alert('感谢您的留言！我们的工作人员将尽快与您联系。');
            form.reset();
        });
    }
}

/**
 * 搜索功能
 */
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    const closeSearch = document.getElementById('closeSearch');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchBtn || !searchBar) return;
    
    // Open search bar
    searchBtn.addEventListener('click', () => {
        searchBar.classList.add('active');
        searchInput.focus();
    });
    
    // Close search bar
    if (closeSearch) {
        closeSearch.addEventListener('click', () => {
            searchBar.classList.remove('active');
            searchInput.value = '';
            if (searchResults) searchResults.classList.remove('active');
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchBar.classList.contains('active')) {
            searchBar.classList.remove('active');
            searchInput.value = '';
            if (searchResults) searchResults.classList.remove('active');
        }
    });
    
    // Search on input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 2) {
                if (searchResults) searchResults.classList.remove('active');
                return;
            }
            
            // Search products
            const results = searchProducts(query);
            displaySearchResults(results, searchResults);
        });
    }
}

/**
 * 产品搜索
 */
function searchProducts(query) {
    const products = [
        // DRILL series
        { name: '12V 25Nm Drill Driver', model: 'ZPT-CD-12252', path: 'products/drill/ZPT-CD-12252.html', category: 'DRILL' },
        { name: '12V 40Nm Drill Driver', model: 'ZPT-CD-12402', path: 'products/drill/ZPT-CD-12402.html', category: 'DRILL' },
        { name: '12V 50Nm Brushless Drill & Driver 2in1', model: 'ZPT-CD-12502', path: 'products/drill/ZPT-CD-12502.html', category: 'DRILL' },
        { name: '12V 50Nm Brushless Impact Drill', model: 'ZPT-ID-12502', path: 'products/drill/ZPT-ID-12502.html', category: 'DRILL' },
        { name: '12V 50Nm Brushless Drill with Multi-Head', model: 'ZPT-CD-12504', path: 'products/drill/ZPT-CD-12504.html', category: 'DRILL' },
        { name: '18V 30Nm Drill Driver', model: 'ZPT-CD-18301', path: 'products/drill/ZPT-CD-18301.html', category: 'DRILL' },
        { name: '18V 50Nm Brushless Compact Drill', model: 'ZPT-CD-1850B', path: 'products/drill/ZPT-CD-1850B.html', category: 'DRILL' },
        { name: '18V 50Nm Drill Driver', model: 'ZPT-CD-18501', path: 'products/drill/ZPT-CD-18501.html', category: 'DRILL' },
        { name: '18V 50Nm Impact Drill', model: 'ZPT-ID-18502', path: 'products/drill/ZPT-ID-18502.html', category: 'DRILL' },
        { name: '18V 60Nm Brushless Drill', model: 'ZPT-CD-18602', path: 'products/drill/ZPT-CD-18602.html', category: 'DRILL' },
        { name: '18V 60Nm Brushless Impact Drill', model: 'ZPT-ID-18602', path: 'products/drill/ZPT-ID-18602.html', category: 'DRILL' },
        { name: '18V 90Nm Brushless Drill', model: 'ZPT-CD-18902', path: 'products/drill/ZPT-CD-18902.html', category: 'DRILL' },
        { name: '18V 90Nm Brushless Impact Drill', model: 'ZPT-ID-18902', path: 'products/drill/ZPT-ID-18902.html', category: 'DRILL' },
        { name: '18V 150Nm Brushless Impact Drill', model: 'ZPT-ID-18152', path: 'products/drill/ZPT-ID-18152.html', category: 'DRILL' },
        // Other categories
        { name: 'Fastening Products', model: 'FASTENING', path: 'products/fastening/index.html', category: 'FASTENING' },
        { name: 'Grinder & Cutter Products', model: 'GRINDER', path: 'products/grinder-cutter/index.html', category: 'GRINDER & CUTTER' },
        { name: 'Hammer Products', model: 'HAMMER', path: 'products/hammer/index.html', category: 'HAMMER' },
        { name: 'Saw Products', model: 'SAW', path: 'products/saw/index.html', category: 'SAW' },
        { name: 'Sander & Polisher Products', model: 'SANDER', path: 'products/sander-polisher/index.html', category: 'SANDER & POLISHER' },
        { name: 'Cleanning Products', model: 'CLEAN', path: 'products/cleanning/index.html', category: 'CLEANNING' },
        { name: 'Lighting Products', model: 'LIGHT', path: 'products/lighting/index.html', category: 'LIGHTING' },
    ];
    
    return products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.model.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
}

/**
 * 显示搜索结果
 */
function displaySearchResults(results, container) {
    if (!container) return;
    
    if (results.length === 0) {
        container.innerHTML = '<div class="search-no-results">No products found</div>';
        container.classList.add('active');
        return;
    }
    
    const html = results.map(r => `
        <a href="${r.path}" class="search-result-item">
            <div class="result-name">${r.name}</div>
            <div class="result-model">${r.model} | ${r.category}</div>
        </a>
    `).join('');
    
    container.innerHTML = html;
    container.classList.add('active');
}

// 添加移动端菜单 CSS
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    @media (max-width: 768px) {
        #navMenu.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--white);
            padding: var(--spacing-lg);
            box-shadow: var(--shadow-md);
            animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        #navMenu.active .nav-link {
            padding: var(--spacing-md) 0;
            border-bottom: 1px solid var(--light);
        }
    }
`;
document.head.appendChild(mobileMenuStyles);

// 页面加载完成后的淡入效果
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 导出函数供外部使用
window.Yolong = {
    initStatsAnimation,
    initScrollAnimations
};
