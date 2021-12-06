// -----------------------------------------------
// TABS
// -----------------------------------------------
const tabsList = document.querySelector('.tabs');
const tabsLinks = tabsList.querySelectorAll('.tabs__link');
const tabsBody = document.querySelector('.tabs-body');
const tabs = document.querySelectorAll('.tabs-body .tab');

function removeClassFromSiblings(siblings, theClass) {
  siblings.forEach(sibling => {
    sibling.classList.remove(`${theClass}`);
  });
}

function setTabBodyHeight() {
  tabsBody.style.height = `${tabsBody.querySelector('.active').clientHeight}px`;
}
setTabBodyHeight();

tabsList.addEventListener('click', e => {
  const tabId = e.target.hash;
  if (tabId) {
    e.preventDefault();
    removeClassFromSiblings(tabs, 'active');
    const targetTab = document.querySelector(`.tabs-body ${tabId}`);
    targetTab.classList.add('active');
    setTabBodyHeight();
  }
});

tabsLinks.forEach(tabLink => {
  tabLink.addEventListener('click', function() {
    removeClassFromSiblings(tabsLinks, 'active');
    this.classList.add('active');
  });
});

window.addEventListener('resize', setTabBodyHeight);
