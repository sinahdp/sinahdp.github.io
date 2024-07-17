const textElement = document.getElementById('Profile-detailes-text');
const texts = ["Electrical Engineering student", "Programmer", "Space Lover"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let delay = 200;

function type() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        delay = 50;
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        delay = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        delay = 1000; 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        delay = 500; 
    }

    setTimeout(type, delay);
}

function toggleColor() {
    const changeColorToggle = document.getElementById('change-color');
    const colors = ['yellow','orange' ,'red' ,'green' , 'blue','purpel', 'white'];
    let currentColorIndex = 0;

    changeColorToggle.addEventListener('click', function() {
        document.body.classList.remove(colors[currentColorIndex]);
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        document.body.classList.add(colors[currentColorIndex]);
    });
}

toggleColor();

function handleMenuToggle() {
    const toggleMenu = document.getElementById('toggle-menu');
    const sidebarLeft = document.querySelector('.sidebar.left-sidebar');
    const mainContent = document.querySelector('.main-content');
    const topBar = document.querySelector('header');

    let isMobileView = window.matchMedia("(max-width: 992px)").matches;

    toggleMenu.addEventListener('click', function() {
        sidebarLeft.classList.toggle('collapsed');
        if (!isMobileView) {
            mainContent.classList.toggle('expanded');
            topBar.classList.toggle('expanded');
        }
    });

    const mediaQuery = window.matchMedia("(max-width: 992px)");
    function handleScreenChange(e) {
        if (e.matches) {
            isMobileView = true;
            sidebarLeft.classList.add('collapsed');
            mainContent.classList.add('expanded');
            topBar.classList.add('expanded');
        } else {
            isMobileView = false;
            sidebarLeft.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
            topBar.classList.remove('expanded');
        }
    }
    mediaQuery.addEventListener('change', handleScreenChange);
    handleScreenChange(mediaQuery);

    const mobileMediaQuery = window.matchMedia("(max-width: 992px)");
    document.addEventListener('click', function(event) {
        if (mobileMediaQuery.matches && !sidebarLeft.contains(event.target) && !toggleMenu.contains(event.target)) {
            sidebarLeft.classList.add('collapsed');
        }
    });
}

function showSection(sectionId) {
    var sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));

    setTimeout(() => {
        sections.forEach(section => section.style.display = 'none');

        var activeSection = document.getElementById(sectionId);
        activeSection.style.display = 'flex';
        setTimeout(() => activeSection.classList.add('active'), 50);
    }, 500);

    var navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        if (item.innerText.includes(sectionId.charAt(0).toUpperCase() + sectionId.slice(1))) {
            document.getElementById('nav-content-indicator').style.top = `${1.25 + 2 * index}rem`;
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function showProjectCategory(category) {
    var cards = document.querySelectorAll('.project-card');
    var navItems = document.querySelectorAll('.project-menu .nav-item');
    var indicator = document.getElementById('project-menu-indicator');

    cards.forEach(card => {
        card.classList.remove('active');
        card.style.opacity = '0';
        setTimeout(() => {
            card.style.display = 'none';
        }, 300);
    });

    setTimeout(() => {
        cards.forEach(card => {
            if (card.classList.contains(category)) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.classList.add('active');
                    card.style.opacity = '1';
                }, 10);
            }
        });
    }, 300);

    navItems.forEach(item => item.classList.remove('active'));

    const activeNavItem = Array.from(navItems).find(item => item.innerText.toLowerCase() === category);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
        const index = Array.from(navItems).indexOf(activeNavItem);
        indicator.style.left = `${index * 4.5}rem`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    type();
    toggleColor();
    handleMenuToggle();
    showProjectCategory('all');
    showSection('about');
});
