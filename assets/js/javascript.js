// Open Cart
const openCart = document.querySelector('.js-openCart');
const closeCart = document.querySelector('.cart__header-close');
const modalCart = document.querySelector('.modal__cart');
const modalProduct = document.querySelector('.modal__cart-container');
openCart.addEventListener('click',() => {
  modalCart.classList.add('active-cover');
})
closeCart.addEventListener('click',() => {
  modalCart.classList.remove('active-cover')
})
modalCart.addEventListener('click',() => {
  modalCart.classList.remove('active-cover')
})
modalProduct.addEventListener('click', (event) => {
  event.stopPropagation();
})
//Open menu
const burgerMenu = document.querySelector('.header__action-burgerMenu');
burgerMenu.addEventListener('click',() => {
  document.querySelector('.nav__menu-outer').style.display = 'block'
})
const closeModal = document.querySelector('.nav__menu-outer');
closeModal.addEventListener('click', () => {
  closeModal.style.display = 'none'
})
const menuModal = document.querySelector('.nav__menu-sidebar');
menuModal.addEventListener('click',(event) => {
  event.stopPropagation();
})
//SideBarBlog
const sideBar = document.querySelector('.item__sidebar span');
const closeBlog = document.querySelector('.item__sidebar span i:nth-child(2)');

sideBar.addEventListener('click', (event) => {
  if(event.target !== closeBlog) {
    document.querySelector('.item__sidebar span i:nth-child(1)').style.display = 'none';
    document.querySelector('.item__sidebar span i:nth-child(2)').style.display = 'inline';
    document.querySelector('.item__sidebar span').style = 'background-color: #b63d44';
    let blogSidebar = document.querySelector('.blog__list-sidebar');
    blogSidebar.classList.add('active-sidebar'); 
  }
})

closeBlog.addEventListener('click', (event) => {
  let blogSidebar = document.querySelector('.blog__list-sidebar');
  blogSidebar.classList.remove('active-sidebar'); 
  document.querySelector('.item__sidebar span i:nth-child(1)').style.display = 'inline';
  document.querySelector('.item__sidebar span i:nth-child(2)').style.display = 'none';
  document.querySelector('.item__sidebar span').style = 'none';
  event.stopPropagation();
})

//Slider
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slider");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

//Cart
let btnCart = document.querySelectorAll('.product__cart-btn');
btnCart.forEach((btn) => {
  btn.addEventListener('click',(event) => {
    let btnItem = event.target;
    let productCart = btnItem.parentNode;
    let productBanner = productCart.parentNode;
    let productItem = productBanner.parentNode;
    let productImg = productItem.querySelector('.product-img.default').src;
    let productName = productItem.querySelector('.name__product').innerText;
    let productPrice = productItem.querySelector('.product__newPrice').innerText;
    addToCart(productName,productImg,productPrice);
  })
})
function addToCart(productName,productImg,productPrice){
  let products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
  let id = productName;
  let checkProduct = products.some(value => value.id === id);
  if(!checkProduct){
    products.push({
      id:id,
      name:productName,
      img:productImg,
      price:productPrice,
      quantity:1
    })
    localStorage.setItem('products', JSON.stringify(products));
    renderCart();
    calculatorTotal();
    totalMoney();
  }
  else {
    let product = products.find(value => value.id === id);
    let getIndex = products.findIndex(value => value.id === id);
    products[getIndex] = {
      ...product,
      quantity:++product.quantity
    };
    localStorage.setItem('products', JSON.stringify(products));
    renderCart();
    totalMoney();
  }
}
function renderCart(){
  let products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
  if(products.length <1){
    document.querySelector('.cartTail.cart__body').innerHTML = ''
    document.querySelector('.cart__body').innerHTML = `
    <div class="cart__body-notification">
    <span>
      <i class="fi fi-rs-cart-minus"></i>
    </span>
    <span>
      Chưa có sản phẩm trong giỏ hàng
    </span>
  </div>
    `
  }
  else {
    document.querySelector('.cartTail.cart__body').innerHTML = `
    <div class="showCart__subtotal">
    <span class="showCart__total-title">
      TỔNG SỐ PHỤ
    </span>
    <span>
      <span class="showCart__total-price">
        0
      </span>
      <sup>₫</sup>
    </span>
  </div>
  <a href="/cart.html" class="showCart__open-cart" onclick=" renderDetail()">
    XEM GIỎ HÀNG
  </a>
  <a href="#" class="showCart__payment">
    THANH TOÁN
  </a>
    `
    let showCart = '';
    products.map((value,index) => {
    showCart+=`
    <div class="showCart">
      <span class="showCart__img">
        <img src="${value.img}" alt="">
      </span>
      <span class="showCart__content">
        <p class="showCart__desc">
          ${value.name} 
        </p>
        <span class="showCart__total">
          <span class="showCart__quantity">
            <span class="showCart__quantity-count">${value.quantity}</span>
          </span>
          <span> 
            x
          </span>
          <span class="showCart__unitPrice">${value.price}</span>
          <sup>₫</sup>
        </span>
      </span>
      <span class="showCart__close"> 
        <i onclick="deleteCart(${index})" class="fi fi-rs-cross-small"></i>
      </span>
    </div>
    `
  })
  document.querySelector('.cart__render').innerHTML = showCart;
  }
}
function renderDetail(){
  let products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
  let showCart = '';
  products.map((value,index) => {
    showCart+=`
    <tr class="displayProd">
    <td class="product__remove">
      <i onclick="deleteCart(${index})" class = "fi fi-rs-circle-cross" style ="cursor: pointer;"></i>          
    <td class="product__thumbnail">
      <img src="${value.img}" alt="">
    </td>
    <td class="product__Item">
      ${value.name}
    </td>
    <td class="product__price">
      <span class="product__price-money">
        ${value.price}
      </span>
      <sup>₫</sup>
    </td>
    <td class="product__count">
      <div class="calculate">
        <span class="calMinus" onclick="minusQuantity(${index},${value.quantity})">
          -
        </span>
        <span class="calCount">${value.quantity}</span>
        <span class="calPlus" onclick="plusQuantity(${index})">
          +
        </span>
      </div>
    </td>
    <td class="product__tempPrice">
      <span class="product__tempPrice-money">
        ${(value.quantity * value.price.replace(/\./g, '')).toLocaleString()}
      </span>
      <sup>₫</sup>
    </td>
  </tr>
    `
  })
  document.getElementById('products-cart').innerHTML = showCart;
}

function deleteCart(index){
  let products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
  products.splice(index,1);
  localStorage.setItem('products', JSON.stringify(products));
  renderCart();
  calculatorTotal();
  totalMoney();
  renderDetail()
}
function calculatorTotal() {
  let products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
  document.querySelector('.cart__subtotal-count').innerText = products.length;
}

function totalMoney() {
  let products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
  if (products != []) {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      total += products[i].quantity * products[i].price.replace(/\./g, '');
    }
    document.getElementById("total").innerText = total.toLocaleString()
    document.querySelector('.showCart__total-price').innerText = total.toLocaleString();
    document.getElementById('tempValue').innerHTML = total.toLocaleString();
    document.getElementById('subValue').innerHTML = total.toLocaleString();
  }
}

function plusQuantity(index){
  let products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
  products[index] = {
    ...products[index],
    quantity:++products[index].quantity
  }
  localStorage.setItem('products', JSON.stringify(products));
  renderDetail();
  totalMoney();
}
function minusQuantity(index,quantity){
  let products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
  if(quantity > 1 ){
    products[index] = {
      ...products[index],
      quantity:--products[index].quantity
    }
  }
  else {
    alert('Quantity min is 1')
  }
  localStorage.setItem('products', JSON.stringify(products));
  renderDetail();
  totalMoney();
}

function loadPage(){
  renderCart();
  calculatorTotal();
  totalMoney();
}
function CartloadPage(){
  renderCart();
  renderDetail();
  calculatorTotal();
  totalMoney();
}
//Product tab
// const tabs = document.querySelectorAll('[data-target]'),
//  tabContents = document.querySelectorAll('[content]');
// tabs.forEach((tab) => {
//   tab.addEventListener('click', () => {
//     const target = document.querySelector(tab.dataset.target);
//     tabContents.forEach((tabContent) => {
//       tabContent.classList.remove('active-tab');
//     })
//     target.classList.add('active-tab');

//     tabs.forEach((tab) => {
//       tab.classList.remove('active-tab');
//     })
//     tab.classList.add('active-tab');
//   })
// })