const perfumesCards = document.querySelector('.perfumes')
const cartMenu = document.querySelector('cart')

console.log(products)

function showProducts (filterA) {
    perfumesCards.innerHTML = '';
    filterA.forEach((producto) => {
      const div = document.createElement('div')
       div.classList.add('producto')
       div.innerHTML = `
       <div class="azzaro">
               <img src="${producto.productImg}" alt="">
               <h2>${producto.brand+" "+producto.name} ${producto.ml} </h2>
               <p>$${producto.price}</p>
               <a  class="BuyBtn" id="${producto.id}">Comprar</a>
       </div>`
       perfumesCards.appendChild(div)
       const btn = document.getElementById (`${producto.id}`)
       btn.addEventListener('click', () =>addItemCart(producto.id))
   });
   }
  

  sortedProductsZA ();
  
  const filterA = document.querySelector("#filterA");
  filterA.addEventListener("click", function () {
    sortedProductsAZ();
  });
  
  function sortedProductsAZ (){
    const sortedProducts = products.sort(function (a,b){
      if (a.brand < b.brand){
        return -1;
      }
      if (a.brand > b.brand){
        return 1;
      }
      return 0;
    }
    );
    showProducts (sortedProducts);
  }
  
  const filterZ = document.querySelector("#filterZ");
  filterZ.addEventListener("click", function () {
    sortedProductsZA();
  });
  
  function sortedProductsZA (){
    const sortedProducts = products.sort(function (a,b){
      if (a.brand > b.brand){
        return -1;
      }
      if (a.brand < b.brand){
        return 1;
      }
      return 0;
    }
    );
    showProducts (sortedProducts);
  }
  
  const filterP = document.querySelector("#filterP");
  filterP.addEventListener("click", function () {
    sortedProductsP();
  });
  
  function sortedProductsP (){
    const sortedProducts = products.sort(function (a,b){
      if (a.price > b.price){
        return -1;
      }
      if (a.price < b.price){
        return 1;
      }
      return 0;
    }
    );
    showProducts (sortedProducts);
  }
  
  const filterPMinus = document.querySelector("#filterPMinus");
  filterPMinus.addEventListener("click", function () {
    sortedProductsPMinus();
  });
  
  function sortedProductsPMinus (){
    const sortedProducts = products.sort(function (a,b){
      if (a.price < b.price){
        return -1;
      }
      if (a.price > b.price){
        return 1;
      }
      return 0;
    }
    );
    showProducts (sortedProducts);
  }

 let cart = [

 ]

const qMinus = (id) =>{
    var index = cart.findIndex(product => product.id === id); 
    if (cart[index].cant>1){
        cart[index].cant = cart[index].cant - 1;
        console.log('qMinus');
        cartBox();
    }
    if (cart[index].cant==1){
        cart.splice(index, 1);
        cartBox();
    }
}

const qPlus = (id) =>{
    var index = cart.findIndex(product => product.id === id); 
    cart[index].cant = cart[index].cant + 1;
    console.log('qPlus');
    cartBox();
}

function contentDlt(){
    cart = [];
    cartBox();
}

function cartBox (){
   let itemBuy = '<h2>Tus perfumes!</h2>';
   let total = 0;
   cart.forEach(product => {
    itemBuy += `
    <div class="cart-item">
                     <img src="${product.productImg}" alt="le beau">
                     <div class="item-info">
                         <h2 class="product-title">${product.name}</h2>
                         <h3 class="product-brand">${product.brand}</h3>
                         <p class="price">$${product.price}</p>
                     </div>
                     <div class="quantity-handler">
                         <span class="quantity-minus" onClick="qMinus(${product.id})">-</span>
                         <span class="quantity-total">${product.cant}</span>
                         <span class="quantity-plus" onClick="qPlus(${product.id})">+</span>
                     </div>
                 </div>
    `;     
    total += parseInt(product.price) * product.cant;
   });
   itemBuy += `
        <span class="end-cart-list"></span>
        <div class="total-cart">
            <p>Total:$</p>
            <span>${total}</span>
        </div>
        <button class="btn-buy">Comprar</button>
        <button class="cartDlt" onClick="contentDlt()">Vaciar</button>
   `
   document.getElementById ('cartBox').innerHTML = itemBuy;
   localStorage.setItem ('CartItem', JSON.stringify(cart));
}

const addItemCart = (prodId) => {
    var index = cart.findIndex(product => product.id === prodId); 
    if (index > -1) {
        cart[index].cant = cart[index].cant + 1;
    }
    else{
        const item = products.find((prod) => prod.id === prodId)
        cart.push({...item, cant:1});
        console.log(cart, 'Cart')
    }
    
    cartBox ();
}

const load = () =>{
    if (localStorage.getItem('CartItem')!==null){
        cart=JSON.parse(localStorage.getItem('CartItem'))
    }
    cartBox()
}

window.onload = load;

