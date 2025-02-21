
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
  }, 2000);
});


const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('[data-lucide]');

function setTheme(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  lucide.createIcons();
}


const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme === 'dark');

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  setTheme(!isDark);
});

const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const toggleIcon = sidebarToggle.querySelector('[data-lucide]');

function toggleSidebar(isOpen) {
  sidebar.classList.toggle('open', isOpen);
  toggleIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
  lucide.createIcons();
}

sidebarToggle.addEventListener('click', () => {
  const isOpen = sidebar.classList.contains('open');
  toggleSidebar(!isOpen);
});

document.addEventListener('click', (e) => {
  const isClickInside = sidebar.contains(e.target) || sidebarToggle.contains(e.target);
  if (!isClickInside && window.innerWidth < 1024) {
    toggleSidebar(false);
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
    toggleSidebar(true);
  } else {
    toggleSidebar(false);
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      if (window.innerWidth < 1024) {
        toggleSidebar(false);
      }
    }
  });
});