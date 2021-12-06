/* eslint-disable class-methods-use-this */
const cartBtn = document.querySelector('.header__icons--cart');
const cartItemsNumber = cartBtn.querySelector('i span');
const cartDom = document.querySelector('.cart');
const closeCartBtn = cartDom.querySelector('.cart-close');
const cartContent = cartDom.querySelector('.cart__body');
const cartTotal = cartDom.querySelector('.cart-total');

// CART
let cart = [];
// Buttons
let buttonsDOM = [];

const womenProductsDom = document.querySelector('.women--js');
const menProductsDom = document.querySelector('.men--js');
const girlsProductsDom = document.querySelector('.girls--js');
const boysProductsDom = document.querySelector('.boys--js');

// local storage
class Storage {
  static saveProductsToStorage(productsData) {
    localStorage.setItem('productsData', JSON.stringify(productsData));
  }

  static getProductFromStorage(btnId) {
    const products = JSON.parse(localStorage.getItem('productsData'));

    let found;
    Object.values(products).forEach(product => {
      if (product.find(inner => inner.id === btnId) === undefined) return '';
      found = product.find(inner => inner.id === btnId);
    });
    return found;
  }

  static saveCart(cartData) {
    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  static getCart() {
    const cartFromStorage = JSON.parse(localStorage.getItem('cart'));
    return cartFromStorage || [];
  }
}

// display products
class UI {
  renderProducts(products, whereToAppend, pageLink) {
    let result = '';
    for (let i = 0; i <= 2; i += 1) {
      const { id, name, currentPrice, prevPrice, image, link } = products[i];
      result += `
        <div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
          <div class="product">
            <div class="product__image">
              <div class="overlay"><a href="${link}" class="overlay-btn">Quick View</a></div>
              <img src="${image}" alt="product">
            </div>
            <div class="product__text">
              <h6 class="product__title">${name}</h6>
              <div class="product__price d-flex justify-content-between">
                <span>&dollar;${currentPrice}</span>
                <span>&dollar;${prevPrice}</span>
              </div>
              <div class="product__cart">
                <p class="product__cart--added">Added to the cart</p>
                <button class="add-to-cart" data-id="${id}">
                  <i class="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    result += `
      <div class="col-md-6 col-lg-3 d-flex justify-content-center align-items-center">
        <a href="${pageLink}" class="view-more-btn">View more</a>
      </div>
    `;
    whereToAppend.innerHTML += result;
  }

  // render all products to the dom
  renderProductsTDom(productsData) {
    // eslint-disable-next-line prettier/prettier
    const { womenProducts, girlsProducts, menProducts, boysProducts } = productsData;
    this.renderProducts(womenProducts, womenProductsDom, `women.html`);
    this.renderProducts(girlsProducts, girlsProductsDom, `girls.html`);
    this.renderProducts(menProducts, menProductsDom, `men.html`);
    this.renderProducts(boysProducts, boysProductsDom, `boys.html`);
  }

  setCartValues(cartData) {
    let totalPrice = 0;
    let productsTotal = 0;
    cartData.forEach(product => {
      totalPrice += product.currentPrice * product.amount;
      productsTotal += product.amount;
    });
    cartTotal.textContent = +totalPrice.toFixed(2);
    cartItemsNumber.textContent = productsTotal;
  }

  displayCartContent(cartItems) {
    const { name, id, currentPrice, amount } = cartItems;
    cartContent.innerHTML += `
      <div class="cart__product">
        <div class="cart__product--info">
          <h4 class="cart__product--info--name">${name}</h4>
          <p class="cart__product--info--price">$${currentPrice}</p>
          <span class="remove-item" data-id="${id}">Remove</span>
        </div>
        <div class="cart__product--control-amount">
          <i class="fas fa-chevron-up" data-id="${id}"></i>
          <p class="item-amount">${amount}</p>
          <i class="fas fa-chevron-down" data-id="${id}"></i>
        </div>
      </div>
    `;
  }

  showCart() {
    cartDom.style.display = 'block';
  }

  hideCart() {
    cartDom.style.display = 'none';
  }

  getCartButtons() {
    const addToCartButtons = [...document.querySelectorAll(` .add-to-cart`)];
    buttonsDOM = addToCartButtons;
    for (const btn of addToCartButtons) {
      const btnID = btn.dataset.id;
      const inCart = cart.find(item => item.id === btnID);
      // console.log(btn);
      if (inCart) {
        btn.previousElementSibling.style.opacity = 1;
        btn.style.visibility = 'hidden';
        btn.disabled = true;
      }
      // eslint-disable-next-line no-loop-func
      btn.addEventListener('click', () => {
        btn.previousElementSibling.style.opacity = 1;
        btn.style.visibility = 'hidden';
        btn.disabled = true;

        // get product from productsData
        const cartItems = {
          ...Storage.getProductFromStorage(btnID),
          amount: 1,
        };
        // add product to cart
        cart.push(cartItems);
        // save product in local storage
        Storage.saveCart(cart);
        // set cart values
        this.setCartValues(cart);
        // display cart item
        this.displayCartContent(cartItems);
        // show the cart
        this.showCart();
      });
    }
  }

  populateCart(cartData) {
    cartData.forEach(item => this.displayCartContent(item));
  }

  setupApp() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartBtn.addEventListener('click', this.showCart);
    closeCartBtn.addEventListener('click', this.hideCart);
  }

  getSingleButton(id) {
    return buttonsDOM.find(btn => btn.dataset.id === id);
  }

  removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    const btn = this.getSingleButton(id);
    btn.disabled = false;
    btn.previousElementSibling.style.opacity = 0;
    btn.style.visibility = 'visible';
  }

  // cart functionality
  cartLogic() {
    cartContent.addEventListener('click', e => {
      if (e.target.classList.contains('remove-item')) {
        const removeBnt = e.target;
        const removeBtnId = removeBnt.dataset.id;
        cartContent.removeChild(removeBnt.parentElement.parentElement);
        this.removeItem(removeBtnId);
      }
      if (e.target.classList.contains('fa-chevron-up')) {
        const addAmount = e.target;
        const addAmountId = addAmount.dataset.id;
        const tempItem = cart.find(product => product.id === addAmountId);
        tempItem.amount += 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.textContent = tempItem.amount;
      }
      if (e.target.classList.contains('fa-chevron-down')) {
        const lowerAmount = e.target;
        const lowerAmountId = lowerAmount.dataset.id;
        const tempItem = cart.find(product => product.id === lowerAmountId);
        tempItem.amount -= 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        lowerAmount.previousElementSibling.textContent = tempItem.amount;
        if (tempItem.amount <= 0) {
          cartContent.removeChild(lowerAmount.parentElement.parentElement);
          this.removeItem(lowerAmountId);
        }
      }
    });
  }
}

// getting the products
class Products {
  async getProducts() {
    const res = await (await fetch('../../vendors/js/products.json')).json();
    const { womenProducts, girlsProducts, menProducts, boysProducts } = res;
    // eslint-disable-next-line prettier/prettier
    const productsData = { womenProducts, girlsProducts, menProducts, boysProducts }
    return productsData;
  }
}

window.addEventListener('DOMContentLoaded', function() {
  const products = new Products();
  const ui = new UI();

  // setup app from localStorage
  ui.setupApp();

  products
    .getProducts()
    .then(productsData => {
      ui.renderProductsTDom(productsData);
      Storage.saveProductsToStorage(productsData);
    })
    .then(() => {
      ui.getCartButtons();
      ui.cartLogic();
    })
    .catch(err => console.log(err));
});
