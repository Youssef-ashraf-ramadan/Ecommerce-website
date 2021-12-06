// -----------------------------------------------
// BANNER SLIDER
// -----------------------------------------------
const banners = document.querySelectorAll('.banner');
const bannerControls = document.querySelectorAll('.banner-control__item');

function removeClassFromSiblings(siblings, theClass) {
  siblings.forEach(sibling => {
    sibling.classList.remove(`${theClass}`);
  });
}

function changeSlider(data) {
  removeClassFromSiblings(bannerControls, 'active');
  // eslint-disable-next-line prettier/prettier
  const selectedControls = document.querySelectorAll(`.banner-control__item[data-control="${data}"]`);
  for (const selectedControl of selectedControls) {
    selectedControl.classList.add('active');
  }
  for (const banner of banners) {
    banner.classList.remove('show');
  }
  // eslint-disable-next-line prettier/prettier
  const selectedBanner = document.querySelector(`.banner[data-banner="${data}"]`);
  selectedBanner.classList.add('show');
}

let controlPlus = 0;
function autoSlider() {
  setInterval(() => {
    controlPlus += 1;
    if (controlPlus >= banners.length) {
      controlPlus = 0;
    }
    changeSlider(controlPlus);
  }, 5000);
}

bannerControls.forEach(bannerControl => {
  bannerControl.addEventListener('click', function() {
    const dataId = this.dataset.control;
    controlPlus = +dataId;
    changeSlider(dataId);
  });
});

autoSlider();

// -----------------------------------------------
// TABS
// -----------------------------------------------
const tabsList = document.querySelector('.tabs');
const tabsLinks = tabsList.querySelectorAll('.tabs__link');
const tabsBody = document.querySelector('.tabs-body');
const tabs = document.querySelectorAll('.tabs-body .tab');

function setTabBodyHeight() {
  tabsBody.style.height = `${tabsBody.querySelector('.active').clientHeight}px`;
}

tabsList.addEventListener('click', e => {
  const tabId = e.target.hash;
  if (tabId) {
    e.preventDefault();
    removeClassFromSiblings(tabs, 'active');
    const targetTab = document.querySelector(`.tabs-body ${tabId}`);
    targetTab.classList.add('active');
  }
});

tabsLinks.forEach(tabLink => {
  tabLink.addEventListener('click', function() {
    removeClassFromSiblings(tabsLinks, 'active');
    this.classList.add('active');
  });
});

window.addEventListener('resize', setTabBodyHeight);

// // -----------------------------------------------
// // PRODUCTS SLIDER
// // -----------------------------------------------
// const sliders = document.querySelectorAll('.slider .product--js');
// let isDragging = false;
// let startX;
// let sliderScroll;

// sliders.forEach(slider => {
//   const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
//   function moveForward() {
//     if (slider.scrollLeft < maxScrollLeft - 1) {
//       slider.scrollLeft += 1;
//     } else {
//       slider.scrollLeft = 1;
//     }
//   }

//   let play = setInterval(moveForward, 20);

//   function getPositionX(e) {
//     return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
//   }

//   function touchStart(e) {
//     isDragging = true;
//     slider.classList.add('active');
//     startX = getPositionX(e);
//     sliderScroll = slider.scrollLeft;
//     clearInterval(play);
//   }

//   function touchMove(e) {
//     if (!isDragging) return;
//     const x = getPositionX(e);
//     const walk = x - startX;
//     slider.scrollLeft = sliderScroll - walk;
//   }

//   function touchEnd(e) {
//     isDragging = false;
//     slider.classList.remove('active');
//     if (e.type.includes('touch')) {
//       play = setInterval(moveForward, 20);
//     }
//   }

//   slider.addEventListener('mousedown', touchStart);
//   slider.addEventListener('mouseleave', touchEnd);
//   slider.addEventListener('mouseup', touchEnd);
//   slider.addEventListener('mousemove', touchMove);

//   slider.addEventListener('touchstart', touchStart);
//   slider.addEventListener('touchend', touchEnd);
//   slider.addEventListener('touchmove', touchMove);

//   slider.addEventListener('mouseover', () => {
//     clearInterval(play);
//   });
//   slider.addEventListener(
//     'mouseout',
//     () => (play = setInterval(moveForward, 20))
//   );

//   tabsLinks.forEach(link => {
//     link.addEventListener('click', () => {
//       slider.scrollLeft = 1;
//     });
//   });
// });

// -----------------------------------------------
// IMAGE POPUP
// -----------------------------------------------

const galleryItems = document.querySelectorAll('.gallery__item');
const galleryPopup = document.querySelector('.gallery__popup');
const galleryPopupImage = galleryPopup.querySelector('img');
const galleryRightArrow = galleryPopup.querySelector('.fa-arrow-right');
const galleryLeftArrow = galleryPopup.querySelector('.fa-arrow-left');
let galleryImage;
galleryItems[0].id = 'first';
galleryItems[galleryItems.length - 1].id = 'last';

function checkIdForArrow(galleryItem, itemId, hideArrow, showArrow) {
  if (galleryItem.id === `${itemId}`) {
    hideArrow.style.display = 'none';
  } else {
    showArrow.style.display = 'block';
  }
}

galleryItems.forEach(galleryItem => {
  galleryItem.addEventListener('click', function() {
    [galleryImage] = this.children;
    // galleryImage = this.children[0];
    galleryPopupImage.src = galleryImage.src;
    galleryPopup.style.display = 'block';
    checkIdForArrow(galleryItem, 'first', galleryLeftArrow, galleryLeftArrow);
    checkIdForArrow(galleryItem, 'last', galleryRightArrow, galleryRightArrow);
  });
});

galleryRightArrow.addEventListener('click', e => {
  e.stopPropagation();
  const galleryItem = galleryImage.parentElement.nextElementSibling;
  checkIdForArrow(galleryItem, 'last', galleryRightArrow, galleryLeftArrow);
  galleryImage.parentElement.nextElementSibling.click();
});
galleryLeftArrow.addEventListener('click', e => {
  e.stopPropagation();
  const galleryItem = galleryImage.parentElement.previousElementSibling;
  checkIdForArrow(galleryItem, 'first', galleryLeftArrow, galleryRightArrow);
  galleryImage.parentElement.previousElementSibling.click();
});

galleryPopup.addEventListener('click', () => {
  galleryPopup.style.display = 'none';
});

galleryPopupImage.addEventListener('click', e => {
  e.stopPropagation();
});
