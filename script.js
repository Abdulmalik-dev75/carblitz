
const cartCount = document.querySelector(".cart-ccount");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartModal = document.getElementById("cartModal");
const cartCloseBtn = document.querySelector(".cart-close");
const cartIcon = document.querySelector(".cart");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = []; 
let totalToPay = 0;


addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    const name = card.querySelector("h2").textContent;
    const price = parseFloat(card.querySelector(".prize").textContent.replace(/[$,]/g,""));
    const item = cart.find(i => i.name === name);

    if(item) item.quantity++;
    else cart.push({name, price, quantity: 1});

    updateCart();
  });
});

function updateCart() {
  let totalCount = cart.reduce((s,i)=>s+i.quantity,0);
  cartCount.textContent = totalCount;
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<span>${item.name} (x${item.quantity})</span>
                     <span>$${(item.price*item.quantity).toLocaleString()}</span>`;
    cartItemsContainer.appendChild(div);
  });

  cartTotal.innerHTML = `<strong>Total: $${total.toLocaleString()}</strong>`;
  totalToPay = total;
}


cartIcon.addEventListener("click", ()=> cartModal.style.display="flex");
cartCloseBtn.addEventListener("click", ()=> cartModal.style.display="none");
window.addEventListener("click", e=>{ if(e.target===cartModal) cartModal.style.display="none"; });

const paymentModal = document.getElementById("paymentModal");
const paymentCloseBtn = document.querySelector(".payment-close");
const paymentForm = document.getElementById("paymentForm");

checkoutBtn.addEventListener("click", () => {
  if(cart.length === 0){ alert("Your cart is empty!"); return; }
  cartModal.style.display="none";
  paymentModal.style.display="flex";
});

paymentCloseBtn.addEventListener("click", ()=> paymentModal.style.display="none");

paymentForm.addEventListener("submit", e=>{
  e.preventDefault();
  alert(`Payment of $${totalToPay.toLocaleString()} successful ✅ Thank you!`);
  cart = [];
  updateCart();
  paymentForm.reset();
  paymentModal.style.display="none";
});

const userBtn = document.querySelector(".user-btn");
const registerModal = document.getElementById("userModal");
const registerCloseBtn = registerModal.querySelector(".close-btn");
const registerForm = document.getElementById("registerForm");

userBtn.addEventListener("click", ()=> registerModal.style.display="flex");
registerCloseBtn.addEventListener("click", ()=> registerModal.style.display="none");
window.addEventListener("click", e=>{ if(e.target===registerModal) registerModal.style.display="none"; });

registerForm.addEventListener("submit", e=>{
  e.preventDefault();
  const username = document.getElementById("username").value;
  alert(`Welcome, ${username}! Registration successful.`);
  registerForm.reset();
  registerModal.style.display="none";
});
paymentForm.addEventListener("submit", e=>{
  e.preventDefault();

  paymentForm.style.display = "none";
  const loader = document.getElementById("paymentLoader");
  loader.style.display = "block";

  
  setTimeout(() => {
    alert(`Payment of $${totalToPay.toLocaleString()} successful ✅ Thank you!`);

    
    cart = [];
    updateCart();
    paymentForm.reset();
    loader.style.display = "none";
    paymentForm.style.display = "block";
    paymentModal.style.display = "none";
  }, 3000); 
});

const imageModal = document.getElementById("imageModal");
const previewImage = document.getElementById("previewImage");
const imageCloseBtn = document.querySelector(".image-close");


document.querySelectorAll(".product-card img").forEach(img => {
  img.addEventListener("click", () => {
    previewImage.src = img.src;
    imageModal.style.display = "flex";
  });
});

imageCloseBtn.addEventListener("click", () => {
  imageModal.style.display = "none";
});


window.addEventListener("click", (e) => {
  if (e.target === imageModal) {
    imageModal.style.display = "none";
  }
});
