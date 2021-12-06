const imagesContainer = document.querySelector('.product-info__images');
const mainImages = imagesContainer.querySelectorAll(
  '.product-info__images--main img'
);
const subImages = imagesContainer.querySelectorAll(
  '.product-info__images--sub img'
);

function move(index) {
  mainImages.forEach(image => {
    const imageWidth = image.clientWidth;
    image.style.transform = `translateX(${-index * imageWidth}px)`;
  });
}

subImages.forEach((image, index) => {
  image.addEventListener('click', function() {
    for (const subImage of subImages) {
      subImage.classList.remove('active');
    }
    this.classList.add('active');
    move(index);
  });
});

// -------------------------------------------
// ZOOM
// -------------------------------------------
const mainContainer = document.querySelector('.product-info__images--main');
const subContainer = document.querySelector('.product-info__images--sub');
const rect = mainContainer.querySelector('.rect');
const zoom = document.querySelector('.zoom');

const mainContainerWidth = mainContainer.offsetWidth;
const mainContainerHeight = mainContainer.offsetHeight;

const ratio = 2.22;

let rectWidth = rect.clientWidth;
let rectHeight = rect.clientHeight;

zoom.style.width = `${rectWidth * ratio}px`;
zoom.style.height = `${rectHeight * ratio}px`;

rectWidth /= 2;
rectHeight /= 2;

zoom.style.backgroundImage = `url(${
  subContainer.querySelector('img.active').src
})`;
zoom.style.backgroundSize = `${mainContainerWidth *
  ratio}px ${mainContainerHeight * ratio}px`;

let mouseFromLeft;
let mouseFromTop;
let imgZoomX;
let imgZoomY;

function moveRect(e) {
  mouseFromLeft = e.offsetX;
  mouseFromTop = e.offsetY;
  imgZoomX = mouseFromLeft - rectWidth;
  imgZoomY = mouseFromTop - rectHeight;

  if (mouseFromLeft < rectWidth) {
    mouseFromLeft = rectWidth;
    imgZoomX = 0;
  }

  if (mouseFromLeft > mainContainerWidth - rectWidth) {
    mouseFromLeft = mainContainerWidth - rectWidth;
    imgZoomX = mouseFromLeft - rectWidth;
  }

  if (mouseFromTop < rectHeight) {
    mouseFromTop = rectHeight;
    imgZoomY = 0;
  }

  if (mouseFromTop > mainContainerHeight - rectHeight) {
    mouseFromTop = mainContainerHeight - rectHeight;
    imgZoomY = mouseFromTop - rectHeight;
  }

  imgZoomX *= ratio;
  imgZoomY *= ratio;

  rect.style.opacity = '1';
  rect.style.left = `${mouseFromLeft}px`;
  rect.style.top = `${mouseFromTop}px`;

  zoom.style.backgroundImage = `url(${
    subContainer.querySelector('img.active').src
  })`;
  zoom.style.backgroundPosition = `-${imgZoomX}px -${imgZoomY}px`;

  zoom.style.display = 'block';
}

mainContainer.addEventListener('mousemove', moveRect);

mainContainer.addEventListener('mouseleave', () => {
  rect.style.opacity = '0';
  zoom.style.display = 'none';
});
