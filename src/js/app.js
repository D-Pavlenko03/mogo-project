import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

const smoothLinks = document.querySelectorAll('a[href^="#"]');

const navBtn = document.querySelector('.header__burger');
const navBurger = document.querySelector('.burger');
const mobileNav = document.querySelector('.header__mobile-menu');
const body = document.body;

const tabs = document.querySelectorAll(".tabs__nav-item");
const contents = document.querySelectorAll(".tab__content");

let valueDisplays = document.querySelectorAll('.num');
let interval = 4000;

const faqs = document.querySelectorAll(".accordion");

const stickyElements = document.querySelectorAll('.banner__navigation-line');
const stickyTops = [];

const scrollProgressElement = document.querySelector('#scroll-progress');

smoothLinks.forEach(smoothLink => {
   smoothLink.addEventListener("click", function (e) {
      e.preventDefault();
      const id = smoothLink.getAttribute('href');

      document.querySelector(id).scrollIntoView({
         behavior: 'smooth',
         block: 'start',
      });
   });
});

navBurger.addEventListener('click', (event) => {
   event.stopPropagation();
   toggleMobileNav()
})

mobileNav.addEventListener('click', () => {
   if (body.classList.contains('no-scroll')) {
      toggleMobileNav()
   }
})

mobileNav.addEventListener('click', (event) => {
   event.stopPropagation();
})

function toggleMobileNav() {
   navBurger.classList.toggle('open');
   mobileNav.classList.toggle('header__mobile-menu_active');
   body.classList.toggle('no-scroll');
}

for (let i = 0; i < tabs.length; i++) {
   tabs[i].addEventListener("click", (event) => {

      let tabsChildren = event.target.parentElement.children;
      for (let t = 0; t < tabsChildren.length; t++) {
         tabsChildren[t].classList.remove("tabs__nav-item_active");
      }
      tabs[i].classList.add("tabs__nav-item_active");

      let tabContentChildren = event.target.parentElement.nextElementSibling.children;
      for (let c = 0; c < tabContentChildren.length; c++) {
         tabContentChildren[c].classList.remove("tab__content_active");
      }
      contents[i].classList.add("tab__content_active");
   });
}

document.addEventListener('click', (event) => {
   const isClickInsideMobileNav = mobileNav.contains(event.target);
   const isMobileNavActive = mobileNav.classList.contains('header__mobile-menu_active');
   if (!isClickInsideMobileNav && isMobileNavActive) {
      toggleMobileNav();
   }
});

valueDisplays.forEach((valueDisplay) => {
   let startValue = 0;
   let endValue = parseInt(valueDisplay.getAttribute("data-vat"));
   let duration = Math.floor(interval / endValue);
   let counter;

   function startCounter() {
      counter = setInterval(function () {
         startValue += 1;
         valueDisplay.textContent = startValue;
         if (startValue == endValue) {
            clearInterval(counter);
         }
      }, duration);
   }

   function checkVisibility() {
      let rect = valueDisplay.getBoundingClientRect();
      let isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight);
      if (isVisible) {
         startCounter();
         window.removeEventListener('scroll', checkVisibility);
      }
   }

   window.addEventListener('scroll', checkVisibility);
});

faqs.forEach(accordion => {
   accordion.addEventListener('click', () => {
      if (accordion.classList.contains("active") && document.querySelectorAll(".accordion.active").length > 1) {
         accordion.classList.remove('active')
      } else {
         faqs.forEach(otherAccordion => {
            otherAccordion.classList.remove('active');
         });
         accordion.classList.add('active');
      }
   })
})

const reviews = new Swiper('.reviews-swiper', {
   loop: true,
   speed: 600,
   spaceBetween: 5,

   navigation: {
      nextEl: '.reviews__button-next',
      prevEl: '.reviews__button-prev',
   },

   pagination: {
      el: '.reviews__pagination',
      clickable: true,
   },

   mousewheel: {
      invert: false
   },

   keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
   },
});

const feedbacks = new Swiper('.feedbacks-swiper', {
   loop: true,
   speed: 600,
   spaceBetween: 5,

   navigation: {
      nextEl: '.feedbacks__button-next',
      prevEl: '.feedbacks__button-prev',
   },

   pagination: {
      el: '.feedbacks__pagination',
      clickable: true,
   },

   mousewheel: {
      invert: false
   },

   keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
   },
});

stickyElements.forEach(element => {
   stickyTops.push(element.offsetTop);
});

function fixStickyElements() {
   stickyElements.forEach((element, index) => {
   if (window.pageYOffset >= stickyTops[index]) {
      element.classList.add('fixed');
   } else {
      element.classList.remove('fixed');
   }
   });
}

window.addEventListener('scroll', fixStickyElements);
   
function scrollProgress() { 
   const totalheightOfWebPage = document.body.scrollHeight;
   const currentDistanceFromTop = document.documentElement.scrollTop;

   const windowHeight = document .documentElement.clientHeight;

   const scrolledPercentage =
      (currentDistanceFromTop / (totalheightOfWebPage - windowHeight)) * 100;
   
   scrollProgressElement.style.width = Math.round(scrolledPercentage) + "%"
}

document.addEventListener("scroll", scrollProgress);