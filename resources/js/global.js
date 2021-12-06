// -----------------------------------------------
// loader
// -----------------------------------------------
const loader = document.querySelector('.loader');
window.addEventListener('load', function() {
  loader.classList.add('hidden');
});

// -----------------------------------------------
// NAVIGATION
// -----------------------------------------------
const firstNav = document.querySelector('.header .first-nav');
const navigation = document.querySelector('.navigation');
const navigationIcon = navigation.querySelector('.navigation__icon');
const dropdownLinks = document.querySelectorAll('.dropdown-toggle');

navigationIcon.addEventListener('click', function() {
  navigation.classList.toggle('active');
});

dropdownLinks.forEach(link => {
  link.addEventListener('click', e => e.preventDefault());
});

document.addEventListener('scroll', function() {
  if (window.scrollY >= 500) {
    firstNav.classList.add('fixed');
  } else {
    firstNav.classList.remove('fixed');
  }
});
