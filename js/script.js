let btnLog = document.querySelector('.btn-log');
let btnReg = document.querySelector('.btn-reg');
let homeimg = document.querySelector('.img-home');
let divLogReg = document.querySelector('.div-log-reg');
let userNameSpan = document.querySelector('#user-name');
let logoutBtn = document.querySelector('#logout-btn');
let divInfo = document.querySelector('#user-info');

let cartCount = document.querySelector('#cart-count');
let marky = 0;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

homeimg.addEventListener('click', function() {
    window.location.href = 'home.html';
});

btnLog.addEventListener('click', function() {
    window.location.href = 'login.html';
});

btnReg.addEventListener('click', function() {
    window.location.href = 'register.html';
});

(function(){
    if (localStorage.getItem('loggedIn') === 'true') {
        divLogReg.style.display = 'none';
    }
})();

if (localStorage.getItem('firstName') && userNameSpan) {
    userNameSpan.textContent = `${localStorage.getItem('firstName')}`;
}

if (localStorage.getItem('loggedIn') && localStorage.getItem('loggedIn') === 'true') {
    if (divInfo) {
        divInfo.style.display = 'flex';
    }
} else {
    if (divInfo) {
        divInfo.style.display = 'none';
    }
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('loggedIn');
        window.location = "login.html";
    });
}


let firstName = document.querySelector('#first-name');
let lastName = document.querySelector('#last-name');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let submitBtn = document.querySelector('#register-btn');

if (submitBtn) {
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault(); 
        if (!firstName.value || !lastName.value || !email.value || !password.value) {
            alert("Please fill in all fields.");
        } else {
            localStorage.setItem('firstName', firstName.value);
            localStorage.setItem('lastName', lastName.value);
            localStorage.setItem('email', email.value);
            localStorage.setItem('password', password.value);

            setTimeout(() => {
                window.location = "login.html";
            }, 2000);
        }
    });
}


let bigg = document.querySelector('#product-list');
let prod = [
    {
        id: 1,
        img: "img/i-1.jpg",
        name: "Iphone 16",
        description1: "Latest iPhone with powerful performance",
        description2: "Color: Silver, Storage: 128GB",
        price: "1200$",
        count: 1
    },
    {
        id: 2,
        img: "img/i-2.webp",
        name: "Iphone 15 Pro",
        description1: "Elegant design and super fast performance",
        description2: "Color: Black, Storage: 256GB",
        price: "1100$",
        count: 1
    },
    {
        id: 3,
        img: "img/i-3.jpg",
        name: "Iphone 14 Pro Max",
        description1: "Large screen and excellent performance",
        description2: "Color: Gold, Storage: 128GB",
        price: "950$",
        count: 1
    },
    {
        id: 4,
        img: "img/i-4.jpg",
        name: "Samsung s24",
        description1: "Smartphone with a stunning display",
        description2: "Color: Blue, Storage: 256GB",
        price: "900$",
        count: 1
    },
    {
        id: 5,
        img: "img/i-5.jpg",
        name: "Samsung s23 Ultra",
        description1: "Powerful camera and super fast charging",
        description2: "Color: Green, Storage: 512GB",
        price: "850$",
        count: 1
    },
    {
        id: 6,
        img: "img/i-6.jpg",
        name: "Samsung s22 Ultra",
        description1: "Excellent performance and high-resolution camera",
        description2: "Color: Red, Storage: 256GB",
        price: "750$",
        count: 1
    },
    {
        id: 7,
        img: "img/p9.jpg",
        name: "P9",
        description1: "Practical phone at a great price",
        description2: "Color: Gray, Battery: 9 hours",
        price: "200$",
        count: 1
    },
    {
        id: 8,
        img: "img/huawei-freebuds-4i-pakistan-priceoye-9fhqb.jpg",
        name: "Huawei Freebuds 4i",
        description1: "Wireless earbuds with clear sound",
        description2: "Color: White, Battery: 10 hours",
        price: "80$",
        count: 1
    },
    {
        id: 9,
        img: "img/1_zmmonlm4p3o9fova.webp",
        name: "Araimo a4",
        description1: "Wireless earbuds with high quality",
        description2: "Color: Black, Battery: 8 hours",
        price: "60$",
        count: 1
    }
]

if (bigg) {
    bigg.innerHTML = prod.map(function(item) {
    return `
        <div class="darr">
            <img src="${item.img}" alt="d">
            <h3>${item.name}</h3>
            <p class="description">${item.description1}</p>
            <p class="description">${item.description2}</p>
            <button id="adddd-to-cart-but" data-id="${item.id}">add to cart</button>
            <i class="fas fa-heart heart-icon" id="heart-icon" data-id="${item.id}"></i>
        </div>
    `;
    }).join('');
}


let i_cart = document.querySelector('#i-cart');
let but_add_to_cart = document.querySelectorAll('#adddd-to-cart-but');
let cart_dropdown = document.querySelector('#cart-dropdown');

if (i_cart && cart_dropdown) {
    i_cart.addEventListener('click', function() {
    if(cart_dropdown.style.display === "none" || cart_dropdown.style.display === "") {
        cart_dropdown.style.display = "block";
    } else {
        cart_dropdown.style.display = "none";
    }
  });
}

let cartIs = JSON.parse(localStorage.getItem('cartItems')) || [];
let itemQuantities = JSON.parse(localStorage.getItem('itemQuantities')) || {};
marky = cartIs.length;
if (cartCount) cartCount.innerText = marky;

if (but_add_to_cart && but_add_to_cart.length > 0) {
    but_add_to_cart.forEach(function(button) {
        button.addEventListener('click', function() {
        if (localStorage.getItem('loggedIn') === 'true') {
        let item = prod.find(p => p.id === parseInt(button.getAttribute('data-id')));
        let itemId = parseInt(button.getAttribute('data-id'));
        if (item && !cartIs.includes(itemId)) {
            cartIs.push(itemId);
            itemQuantities[itemId] = 1;
            localStorage.setItem('cartItems', JSON.stringify(cartIs));
            localStorage.setItem('itemQuantities', JSON.stringify(itemQuantities));
            
            let oldLink = cart_dropdown.querySelector('.loc');
            if (oldLink) oldLink.remove();
            
            const minCart = document.createElement('div');
            minCart.className = 'min-cart';
            minCart.dataset.id = item.id;
            
            minCart.innerHTML = `
                <h5>${item.name}</h5>
                <p>price: ${item.price}</p>
                <button class="minus-btn">-</button>
                <p class="v-min-cart">1</p>
                <button class="plus-btn">+</button>
            `;
            
            cart_dropdown.appendChild(minCart);
            
            const locDiv = document.createElement('div');
            locDiv.className = 'loc';
            locDiv.innerHTML = '<a href="cart.html" class="arsto">GO to cart location</a>';
            cart_dropdown.appendChild(locDiv);
            
            marky++;
            cartCount.innerText = marky;
            
            
            button.textContent = "In the cart";
            button.style.backgroundColor = "gray";
            
            updateBigCart();

            const plusBtn = minCart.querySelector('.plus-btn');
            const minusBtn = minCart.querySelector('.minus-btn');
            const countDisplay = minCart.querySelector('.v-min-cart');
            
            plusBtn.addEventListener('click', function(e) {
                e.preventDefault();
                let count = parseInt(countDisplay.textContent);
                countDisplay.textContent = count + 1;
                itemQuantities[itemId] = count + 1;
                localStorage.setItem('itemQuantities', JSON.stringify(itemQuantities));
                updateTotalPrice(); 
            });

            minusBtn.addEventListener('click', function(e) {
                e.preventDefault();
                let count = parseInt(countDisplay.textContent);
                if (count > 1) {
                    countDisplay.textContent = count - 1;
                } else {
                    minCart.remove();
                    cartIs = cartIs.filter(id => id !== itemId);
                    delete itemQuantities[itemId];
                    localStorage.setItem('cartItems', JSON.stringify(cartIs));
                    localStorage.setItem('itemQuantities', JSON.stringify(itemQuantities));
                    marky--;
                    cartCount.innerText = marky;
                    
                    if (cartIs.length === 0) {
                        let cartLink = cart_dropdown.querySelector('.loc');
                        if (cartLink) cartLink.remove();
                    }
                    
                    
                    button.textContent = "add to cart";
                    button.style.backgroundColor = "";
                    updateBigCart();
                }
                updateTotalPrice(); 
            });
        }
    } else {
        var mkll = confirm("Please login first to add items to cart");
        if (mkll == true){
            window.location.href = 'login.html';
        }
    }
        });
    });
}

let searchInput = document.querySelector('#search-input');
let searchSelect = document.querySelector('#search-select');
let searchBtn = document.querySelector('#search-btn');

if (searchBtn && searchInput && searchSelect && bigg) {
    searchBtn.addEventListener('click', function() {
    let searchTerm = searchInput.value.toLowerCase();
    let searchType = searchSelect.value;
    
    let filteredProducts = prod.filter(item => {
        if (searchType === 'name') {
            return item.name.toLowerCase().includes(searchTerm);
        } else if (searchType === 'color') {
            return item.description2.toLowerCase().includes(searchTerm);
        }
        return true;
    });

    bigg.innerHTML = filteredProducts.map(function(item) {
        return `
            <div class="darr">
                <img src="${item.img}" alt="d">
                <h3>${item.name}</h3>
                <p class="description">${item.description1}</p>
                <p class="description">${item.description2}</p>
                <button id="adddd-to-cart-but" data-id="${item.id}">add to cart</button>
                <i class="fas fa-hard-hat"></i>
            </div>
        `;
    }).join('');

    but_add_to_cart = document.querySelectorAll('#adddd-to-cart-but');
    but_add_to_cart.forEach(function(button) {
        button.addEventListener('click', function() {
            if (localStorage.getItem('loggedIn') === 'true') {
            let item = prod.find(p => p.id === parseInt(button.getAttribute('data-id')));
            let itemId = parseInt(button.getAttribute('data-id'));
            if (item && !cartIs.includes(itemId)) {
                cartIs.push(itemId);
                
                let oldLink = cart_dropdown.querySelector('.loc');
                if (oldLink) oldLink.remove();
                
                const minCart = document.createElement('div');
                minCart.className = 'min-cart';
                minCart.dataset.id = item.id;
                
                minCart.innerHTML = `
                    <h5>${item.name}</h5>
                    <p>price: ${item.price}</p>
                    <button class="minus-btn">-</button>
                    <p class="v-min-cart">1</p>
                    <button class="plus-btn">+</button>
                `;
                
                cart_dropdown.appendChild(minCart);
                
                const locDiv = document.createElement('div');
                locDiv.className = 'loc';
                locDiv.innerHTML = '<a href="cart.html" class="arsto">GO to cart location</a>';
                cart_dropdown.appendChild(locDiv);
                
                marky++;
                cartCount.innerText = marky;
                
                
                button.textContent = "In the cart";
                button.style.backgroundColor = "gray";

                const plusBtn = minCart.querySelector('.plus-btn');
                const minusBtn = minCart.querySelector('.minus-btn');
                const countDisplay = minCart.querySelector('.v-min-cart');
                
                plusBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    let count = parseInt(countDisplay.textContent);
                    countDisplay.textContent = count + 1;
                });

                minusBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    let count = parseInt(countDisplay.textContent);
                    if (count > 1) {
                        countDisplay.textContent = count - 1;
                    } else {
                        minCart.remove();
                        cartIs = cartIs.filter(id => id !== itemId);
                        marky--;
                        cartCount.innerText = marky;
                        
                        if (cartIs.length === 0) {
                            let cartLink = cart_dropdown.querySelector('.loc');
                            if (cartLink) cartLink.remove();
                        }
                        
                        
                        button.textContent = "add to cart";
                        button.style.backgroundColor = "";
                    }
                });
            }
        } else {
            var mkll = confirm("Please login first to add items to cart");
            if (mkll == true){
                window.location.href = 'login.html';
            }
        }
        });
    });
  });
}


function updateBigCart() {
    const cartList = document.querySelector('#cart-of-list');
    if (!cartList) return;

    cartList.innerHTML = '';

    if (!cartIs || cartIs.length === 0) {
        cartList.innerHTML = `
            <div class="n">
                <h3>NO ITEMS IN CART</h3>
                <h4>Your cart is currently empty. <a href="home.html">Continue Shopping</a></h4>
            </div>
        `;
        updateTotalPrice();
        return;
    }
    cartIs.forEach(id => {
        const item = prod.find(p => p.id === id);
        if (item) {
            const quantity = itemQuantities[id] || 1;
            
            const itemDiv = document.createElement('div');
            itemDiv.className = 'manoo';
            itemDiv.dataset.id = id;
            
            itemDiv.innerHTML = `
                <img src="${item.img}" alt="">
                <div class="conmanoo">
                    <h5>${item.name}</h5>
                    <p>Price: ${item.price}</p>
                    <button class="minus-btn">-</button>
                    <p class="item-quantity">${quantity}</p>
                    <button class="plus-btn">+</button>
                    <button class="remove-from-cart">Remove</button>
                </div>
            `;
            
            cartList.appendChild(itemDiv);

            
            const bigCartPlusBtn = itemDiv.querySelector('.plus-btn');
            const bigCartMinusBtn = itemDiv.querySelector('.minus-btn');
            const bigCartQuantity = itemDiv.querySelector('.item-quantity');
            const removeBtn = itemDiv.querySelector('.remove-from-cart');
            
            bigCartPlusBtn.addEventListener('click', function() {
                const count = parseInt(bigCartQuantity.textContent);
                const newCount = count + 1;
                bigCartQuantity.textContent = newCount;
                updateQuantityAndPrice(id, newCount);
               
                const miniCartItem = document.querySelector(`.min-cart[data-id="${id}"] .v-min-cart`);
                if (miniCartItem) miniCartItem.textContent = newCount;
                updateTotalPrice(); 
            });

            bigCartMinusBtn.addEventListener('click', function() {
                const count = parseInt(bigCartQuantity.textContent);
                if (count > 1) {
                    const newCount = count - 1;
                    bigCartQuantity.textContent = newCount;
                    itemQuantities[id] = newCount;
                    localStorage.setItem('itemQuantities', JSON.stringify(itemQuantities));
                
                    const miniCartItem = document.querySelector(`.min-cart[data-id="${id}"] .v-min-cart`);
                    if (miniCartItem) miniCartItem.textContent = newCount;
                }
                updateTotalPrice(); 
            });

            removeBtn.addEventListener('click', function() {
                
                cartIs = cartIs.filter(itemId => itemId !== id);
                delete itemQuantities[id];
                localStorage.setItem('cartItems', JSON.stringify(cartIs));
                localStorage.setItem('itemQuantities', JSON.stringify(itemQuantities));
                
                if (cartIs.length === 0) {
                    updateBigCart(); 
                } else {
                    itemDiv.remove();
                }
                updateTotalPrice();
               
                const miniCartItem = document.querySelector(`.min-cart[data-id="${id}"]`);
                if (miniCartItem) miniCartItem.remove();
                
                marky--;
                cartCount.textContent = marky;
               
                const addButton = document.querySelector(`button[data-id="${id}"]`);
                if (addButton) {
                    addButton.textContent = "add to cart";
                    addButton.style.backgroundColor = "";
                }
               
                if (cartIs.length === 0) {
                    const cartLink = cart_dropdown.querySelector('.loc');
                    if (cartLink) cartLink.remove();
                }
                updateTotalPrice();
            });
        }
    });
}


function updateMiniCart() {
    if (!cart_dropdown) return;
    
    cart_dropdown.innerHTML = '';
    cartIs.forEach(id => {
        const item = prod.find(p => p.id === id);
        if (item) {
            const quantity = itemQuantities[id] || 1;
            
            const minCart = document.createElement('div');
            minCart.className = 'min-cart';
            minCart.dataset.id = item.id;
            
            minCart.innerHTML = `
                <h5>${item.name}</h5>
                <p>price: ${item.price}</p>
                <button class="minus-btn">-</button>
                <p class="v-min-cart">${quantity}</p>
                <button class="plus-btn">+</button>
            `;
            
            cart_dropdown.appendChild(minCart);
            
            const plusBtn = minCart.querySelector('.plus-btn');
            const minusBtn = minCart.querySelector('.minus-btn');
            const countDisplay = minCart.querySelector('.v-min-cart');
            
            plusBtn.addEventListener('click', function(e) {
                e.preventDefault();
                let count = parseInt(countDisplay.textContent);
                const newCount = count + 1;
                countDisplay.textContent = newCount;
                itemQuantities[id] = newCount;
                localStorage.setItem('itemQuantities', JSON.stringify(itemQuantities));
                updateBigCart();
                updateTotalPrice(); 
            });

            minusBtn.addEventListener('click', function(e) {
                e.preventDefault();
                let count = parseInt(countDisplay.textContent);
                if (count > 1) {
                    const newCount = count - 1;
                    countDisplay.textContent = newCount;
                    itemQuantities[id] = newCount;
                    localStorage.setItem('itemQuantities', JSON.stringify(itemQuantities));
                    updateBigCart();
                    updateTotalPrice(); 
                } else {
                    minCart.remove();
                    cartIs = cartIs.filter(itemId => itemId !== id);
                    delete itemQuantities[id];
                    localStorage.setItem('cartItems', JSON.stringify(cartIs));
                    localStorage.setItem('itemQuantities', JSON.stringify(itemQuantities));
                    marky--;
                    if (cartCount) cartCount.textContent = marky;
                    updateBigCart();
                    updateTotalPrice(); 
                }
            });
        }
    });
    
    if (cartIs.length > 0) {
        const locDiv = document.createElement('div');
        locDiv.className = 'loc';
        locDiv.innerHTML = '<a href="cart.html" class="arsto">GO to cart location</a>';
        cart_dropdown.appendChild(locDiv);
    }
}


function updateAddToCartButtons() {
    const buttons = document.querySelectorAll('#adddd-to-cart-but');
    buttons.forEach(button => {
        const itemId = parseInt(button.getAttribute('data-id'));
        if (cartIs.includes(itemId)) {
            button.textContent = "In the cart";
            button.style.backgroundColor = "gray";
        } else {
            button.textContent = "add to cart";
            button.style.backgroundColor = "";
        }
    });
}


function updateTotalPrice() {
    const totalPriceElement = document.querySelector('#total-price');
    if (!totalPriceElement) return;

    let total = 0;
    cartIs.forEach(id => {
        const item = prod.find(p => p.id === id);
        if (item) {
            const quantity = itemQuantities[id] || 1;
            const price = parseInt(item.price.replace('$', ''));
            total += price * quantity;
        }
    });
    totalPriceElement.textContent = total;
}


function updateQuantityAndPrice(id, newQuantity) {
    itemQuantities[id] = newQuantity;
    localStorage.setItem('itemQuantities', JSON.stringify(itemQuantities));
    updateTotalPrice();
}


document.addEventListener('DOMContentLoaded', function() {
    updateBigCart();
    updateMiniCart();
    updateAddToCartButtons();
    updateTotalPrice();
    updateTotalPrice();
});



document.addEventListener('click', function(e) {
    if (e.target.classList.contains('heart-icon')) {
        if (localStorage.getItem('loggedIn') === 'true') {
            const itemId = parseInt(e.target.dataset.id);
            if (favorites.includes(itemId)) {
                favorites = favorites.filter(id => id !== itemId);
                e.target.style.color = '#fff';
            } else {
                favorites.push(itemId);
                e.target.style.color = 'red';
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
            renderFavorites();
        } else {
            const mkll = confirm("Please login first to add items to favorites");
            if (mkll) {
                window.location.href = 'login.html';
            }
        }
    }
});


function renderFavorites() {
    const container = document.getElementById("favorites-list");
    if (!container) return;

    if (favorites.length === 0) {
        container.innerHTML = `
            <div class="n">
                <h3>NO ITEMS IN FAVORITES</h3>
                <h4>Your favorites list is empty. <a href="home.html">Continue Shopping</a></h4>
            </div>
        `;
        return;
    }

    container.innerHTML = favorites.map(id => {
        const item = prod.find(p => p.id === id);
        if (item) {
            return `
                <div class="rty" data-id="${item.id}">
                    <img src="${item.img}" alt="">
                    <h4>${item.name}</h4>
                    <i class="fas fa-heart heart-icon" data-id="${item.id}" style="color: red;"></i>
                </div>
            `;
        }
        return '';
    }).join('');
}


function updateHeartIcons() {
    const hearts = document.querySelectorAll('.heart-icon');
    hearts.forEach(heart => {
        const itemId = parseInt(heart.dataset.id);
        heart.style.color = favorites.includes(itemId) ? 'red' : '#fff';
    });
}


document.addEventListener('DOMContentLoaded', function() {
    updateBigCart();
    updateMiniCart();
    updateAddToCartButtons();
    updateTotalPrice();
    updateHeartIcons();
    renderFavorites();
});