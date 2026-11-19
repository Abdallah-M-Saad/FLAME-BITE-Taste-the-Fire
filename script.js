
/* ==========================================
   FLAME BITE - RESTAURANT WEBSITE
   HTML + CSS + JavaScript
========================================== */

const $ = (id) => document.getElementById(id);

const USERS_KEY = "flamebite_users";
const SESSION_KEY = "flamebite_session";
const REVIEWS_KEY = "flamebite_reviews";
const CART_KEY = "flamebite_cart";
const THEME_KEY = "flamebite_theme";
const ORDERS_KEY = "flamebite_orders";
const LANGUAGE_KEY = "flamebite_language";

let currentUser = null;
let authMode = "login";
let currentLanguage = localStorage.getItem(LANGUAGE_KEY) || "ar";
let selectedRating = 5;
let activeCategory = "all";

let cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

/* ==========================================
   MENU DATA
========================================== */

const menuItems = [
  {
    id: 1,
    category: "burger",
    name: "Flame Classic",
    en: "Flame Classic",
    desc: "برجر لحم، جبنة شيدر، خس، وصوص فليم.",
    enDesc: "Beef patty, cheddar, lettuce and flame sauce.",
    price: 145,
    tag: "الأكثر طلبًا",
    enTag: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 2,
    category: "burger",
    name: "Double Fire",
    en: "Double Fire",
    desc: "قطعتين لحم، جبنة دوبل، وصوص مدخن.",
    enDesc: "Double beef, double cheese and smoky sauce.",
    price: 195,
    tag: "دبل",
    enTag: "Double",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 3,
    category: "burger",
    name: "Mushroom Burger",
    en: "Mushroom Burger",
    desc: "برجر لحم مع مشروم وجبنة وصوص كريمي.",
    enDesc: "Beef burger with mushrooms and creamy cheese.",
    price: 175,
    tag: "",
    enTag: "",
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 4,
    category: "burger",
    name: "Crispy Chicken Burger",
    en: "Crispy Chicken Burger",
    desc: "فراخ كرسبي، خس، ومايونيز.",
    enDesc: "Crispy chicken, lettuce and mayo.",
    price: 135,
    tag: "",
    enTag: "",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 5,
    category: "chicken",
    name: "Crispy Strips",
    en: "Crispy Strips",
    desc: "شرائح فراخ مقرمشة مع صوص مميز.",
    enDesc: "Crunchy chicken strips with dipping sauce.",
    price: 150,
    tag: "مقرمش",
    enTag: "Crispy",
    image:
      "https://images.unsplash.com/photo-1562967916-eb82221dfb36?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 6,
    category: "chicken",
    name: "Fire Wings",
    en: "Fire Wings",
    desc: "أجنحة دجاج بصوص حار.",
    enDesc: "Chicken wings coated in spicy sauce.",
    price: 165,
    tag: "حار",
    enTag: "Spicy",
    image:
      "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 7,
    category: "chicken",
    name: "Chicken Box",
    en: "Chicken Box",
    desc: "فراخ كرسبي، بطاطس، وصوص.",
    enDesc: "Crispy chicken, fries and sauce.",
    price: 210,
    tag: "وجبة",
    enTag: "Combo",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 8,
    category: "sides",
    name: "Loaded Fries",
    en: "Loaded Fries",
    desc: "بطاطس، جبنة، وصوص فليم.",
    enDesc: "Fries loaded with cheese and flame sauce.",
    price: 90,
    tag: "",
    enTag: "",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 9,
    category: "sides",
    name: "Mozzarella Sticks",
    en: "Mozzarella Sticks",
    desc: "أصابع موتزاريلا مقرمشة.",
    enDesc: "Golden crispy mozzarella sticks.",
    price: 110,
    tag: "",
    enTag: "",
    image:
      "https://images.unsplash.com/photo-1548340748-6d6b7d7b7c1d?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 10,
    category: "sides",
    name: "Onion Rings",
    en: "Onion Rings",
    desc: "حلقات بصل مقرمشة.",
    enDesc: "Crunchy golden onion rings.",
    price: 75,
    tag: "",
    enTag: "",
    image:
      "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 11,
    category: "drinks",
    name: "Fresh Lemon",
    en: "Fresh Lemon",
    desc: "ليمون منعش.",
    enDesc: "Freshly prepared lemonade.",
    price: 45,
    tag: "",
    enTag: "",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdad6e3c5c3c?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 12,
    category: "drinks",
    name: "Cola",
    en: "Cola",
    desc: "مشروب غازي بارد.",
    enDesc: "Chilled soft drink.",
    price: 35,
    tag: "",
    enTag: "",
    image:
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=800&q=85"
  }
];

/* ==========================================
   TRANSLATIONS
========================================== */

const translations = {
  en: {
    home: "Home",
    menu: "Menu",
    offers: "Offers",
    reviews: "Reviews",
    about: "About",
    login: "Login",
    signup: "Sign up",
    heroTag: "A taste beyond ordinary",
    heroTitle: 'Not just food...<br><span>It’s an experience!</span>',
    heroDesc:
      "Enjoy the ultimate burgers and crispy chicken. Fresh ingredients, unique recipes, and a taste you won't forget.",
    orderNow: "Order Now 🔥",
    discover: "Discover Us",
    rating: "Customer rating",
    customers: "Happy customers",
    deliveryTime: "Average delivery",
    fresh: "Fresh daily",
    fastDelivery: "Fast delivery",
    fastDesc: "Right to your door",
    freshQuality: "Premium quality",
    qualityDesc: "Fresh ingredients daily",
    chef: "Expert chefs",
    chefDesc: "Recipes with a twist",
    payment: "Easy payments",
    paymentDesc: "Choose your payment",
    menuKicker: "OUR MENU",
    menuTitle: 'Choose your <span>craving</span>',
    menuDesc: "Made with love... and flavor worth remembering",
    all: "All",
    burgers: "Burgers",
    chicken: "Chicken",
    sides: "Sides",
    drinks: "Drinks",
    limitedOffer: "Limited time offer",
    offerTitle: "Hunger can't wait!",
    offerDesc: "Double Burger + Fries + Drink",
    grabOffer: "Grab this offer",
    deliveryKicker: "WE DELIVER",
    deliveryTitle: 'Your favorite food<br><span>at your door!</span>',
    deliveryDesc:
      "Order from wherever you are and enjoy your meal without moving. Fast delivery in available areas.",
    startOrder: "Start your order 🛵",
    reviewsKicker: "CUSTOMER LOVE",
    reviewsTitle: 'What do they <span>say?</span>',
    reviewsDesc: "Experiences shared by our customers",
    writeReview: "⭐ Write a review",
    aboutTitle: 'We don’t just serve food...<br><span>We serve an experience!</span>',
    aboutDesc:
      "FLAME BITE started with a dream to make every meal special. Strong flavor, quality ingredients, and an experience you'll remember.",
    aboutPoint1: "Carefully selected ingredients",
    aboutPoint2: "Freshly prepared",
    aboutPoint3: "Unique flavor every time",
    footerDesc: "Taste the Fire. Feel the Flavor.",
    cartTitle: "🛒 Your Cart",
    total: "Total",
    checkout: "Checkout",
    checkoutTitle: "Delivery details 🛵",
    customerName: "Full name",
    phone: "Phone number",
    address: "Detailed address",
    paymentMethod: "Payment method",
    confirmOrder: "Confirm order",
    reviewModalTitle: "Share your experience ❤️",
    reviewName: "Your name",
    yourRating: "Your rating",
    yourOpinion: "Your review",
    sendReview: "Publish review",
    add: "Add",
    noReviews: "No reviews yet. Be the first!",
    emptyCart: "Your cart is empty",
    added: "Added to cart!",
    loginFirst: "Please login first",
    orderSuccess: "Order received! This is a demo order.",
    reviewSuccess: "Thank you for your review!",
    invalidLogin: "Incorrect email or password.",
    exists: "This email is already registered.",
    accountCreated: "Account created successfully!",
    loginSuccess: "Welcome back!",
    currency: "EGP",
    cash: "Cash on delivery",
    card: "Card (demo)",
    reviewVerified: "Customer",
    remove: "Remove",
    offerItem: "Double Burger Offer",
    offerItemDesc: "Double burger, fries and drink combo",
    checkoutEmpty: "Your cart is empty.",
    selectRating: "Please select a rating.",
    itemAdded: "Added successfully",
    deliveryFee: "Delivery fee",
    freeDelivery: "Free",
    subtotal: "Subtotal",
    menuTag: "Popular",
    menuAdd: "Add to cart",
    reviewPlaceholder: "Tell us about your experience...",
    loginSubtitle: "Login to continue your experience",
    registerSubtitle: "Create an account and join FLAME BITE",
    namePlaceholder: "Your name",
    emailPlaceholder: "example@email.com",
    passwordPlaceholder: "Password",
    loginTab: "Login",
    registerTab: "Create account",
    haveAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    switchLogin: "Login",
    switchRegister: "Create account",
    choosePayment: "Choose payment method",
    cardDemo: "Card (demo only)",
    cashOption: "Cash on delivery",
    customerReviews: "Customer reviews"
  },

  ar: {
    home: "الرئيسية",
    menu: "المنيو",
    offers: "العروض",
    reviews: "آراء العملاء",
    about: "عن المطعم",
    login: "دخول",
    signup: "إنشاء حساب",
    heroTag: "طعم خارج عن المألوف",
    heroTitle: 'مش مجرد أكل...<br><span>دي تجربة نار!</span>',
    heroDesc:
      "استمتع بأقوى طعم للبرجر والفرايد تشيكن. مكونات طازجة، وصفات مميزة، وطعم مش هتنساه.",
    orderNow: "اطلب دلوقتي 🔥",
    discover: "اكتشف المطعم",
    rating: "تقييم العملاء",
    customers: "عميل سعيد",
    deliveryTime: "متوسط التوصيل",
    fresh: "طازج يوميًا",
    fastDelivery: "دليفري سريع",
    fastDesc: "لحد باب بيتك",
    freshQuality: "جودة عالية",
    qualityDesc: "مكونات طازجة يوميًا",
    chef: "شيف محترف",
    chefDesc: "وصفات بطعم مختلف",
    payment: "طرق دفع سهلة",
    paymentDesc: "اختار طريقة الدفع المناسبة",
    menuKicker: "قائمة الطعام",
    menuTitle: 'اختار مزاجك <span>النهارده</span>',
    menuDesc: "كل لقمة معمولة بحب... وبنكهة تستاهل",
    all: "الكل",
    burgers: "برجر",
    chicken: "فرايد تشيكن",
    sides: "جانبيات",
    drinks: "مشروبات",
    limitedOffer: "عرض لفترة محدودة",
    offerTitle: "الجوع ملوش انتظار!",
    offerDesc: "دبل برجر + بطاطس + مشروب",
    grabOffer: "اطلب العرض",
    deliveryKicker: "خدمة التوصيل",
    deliveryTitle: 'أكلك المفضل<br><span>لحد عندك!</span>',
    deliveryDesc:
      "اطلب من مكانك واستمتع بوجبتك من غير ما تتحرك. خدمة توصيل سريعة للمناطق المتاحة.",
    startOrder: "ابدأ الطلب 🛵",
    reviewsKicker: "آراء عملائنا",
    reviewsTitle: 'قالوا إيه <span>عننا؟</span>',
    reviewsDesc: "آراء وتجارب عملائنا",
    writeReview: "⭐ اكتب تقييمك",
    aboutTitle: 'إحنا مش بنقدم أكل...<br><span>إحنا بنقدم تجربة!</span>',
    aboutDesc:
      "FLAME BITE بدأ بحلم إن كل وجبة تكون مختلفة. طعم قوي، جودة نهتم بيها، وتجربة تفضل في بالك بعد آخر لقمة.",
    aboutPoint1: "مكونات مختارة بعناية",
    aboutPoint2: "تحضير طازج",
    aboutPoint3: "طعم مميز في كل مرة",
    footerDesc: "Taste the Fire. Feel the Flavor.",
    cartTitle: "🛒 سلة طلباتك",
    total: "الإجمالي",
    checkout: "إتمام الطلب",
    checkoutTitle: "بيانات التوصيل 🛵",
    customerName: "الاسم بالكامل",
    phone: "رقم الهاتف",
    address: "العنوان بالتفصيل",
    paymentMethod: "طريقة الدفع",
    confirmOrder: "تأكيد الطلب",
    reviewModalTitle: "شاركنا تجربتك ❤️",
    reviewName: "اسمك",
    yourRating: "تقييمك",
    yourOpinion: "رأيك في الأكل",
    sendReview: "نشر التقييم",
    add: "إضافة",
    noReviews: "لا توجد تقييمات حتى الآن، كن أول من يقيّم!",
    emptyCart: "السلة فارغة",
    added: "تمت الإضافة للسلة!",
    loginFirst: "سجل الدخول أولًا",
    orderSuccess: "تم استلام طلبك! (طلب تجريبي)",
    reviewSuccess: "شكرًا على تقييمك!",
    invalidLogin: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    exists: "البريد الإلكتروني مسجل بالفعل.",
    accountCreated: "تم إنشاء الحساب بنجاح!",
    loginSuccess: "أهلًا بعودتك!",
    currency: "جنيه",
    cash: "الدفع عند الاستلام",
    card: "بطاقة (تجريبي)",
    reviewVerified: "عميل",
    remove: "حذف",
    offerItem: "عرض دبل برجر",
    offerItemDesc: "دبل برجر وبطاطس ومشروب",
    checkoutEmpty: "السلة فارغة.",
    selectRating: "من فضلك اختر تقييمًا.",
    itemAdded: "تمت الإضافة بنجاح",
    deliveryFee: "رسوم التوصيل",
    freeDelivery: "مجاني",
    subtotal: "المجموع",
    menuTag: "الأكثر طلبًا",
    menuAdd: "أضف للسلة",
    reviewPlaceholder: "احكيلنا عن تجربتك...",
    loginSubtitle: "سجل دخولك عشان تكمل تجربتك",
    registerSubtitle: "أنشئ حسابك وانضم إلى FLAME BITE",
    namePlaceholder: "اسمك",
    emailPlaceholder: "example@email.com",
    passwordPlaceholder: "كلمة المرور",
    loginTab: "تسجيل الدخول",
    registerTab: "إنشاء حساب",
    haveAccount: "عندك حساب بالفعل؟",
    noAccount: "ليس لديك حساب؟",
    switchLogin: "دخول",
    switchRegister: "إنشاء حساب",
    choosePayment: "اختر طريقة الدفع",
    cardDemo: "بطاقة (تجريبي فقط)",
    cashOption: "كاش عند الاستلام",
    customerReviews: "آراء العملاء"
  }
};

/* ==========================================
   HELPERS
========================================== */

function t(key) {
  return translations[currentLanguage]?.[key] ?? translations.en[key] ?? key;
}

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function escapeHTML(text) {
  return String(text ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function money(value) {
  return Number(value).toLocaleString(
    currentLanguage === "ar" ? "ar-EG" : "en-US"
  ) + " " + t("currency");
}

function showToast(message) {
  const toast = $("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function openModal(id) {
  const modal = $(id);
  if (modal) modal.classList.add("show");
}

function closeModal(id) {
  const modal = $(id);
  if (modal) modal.classList.remove("show");
}

/* Close modal when clicking outside */
document.querySelectorAll(".modal-overlay").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.classList.remove("show");
  });
});

/* ==========================================
   MENU RENDERING
========================================== */

function renderMenu() {
  const menuGrid = $("menuGrid");
  if (!menuGrid) return;

  const items = menuItems.filter((item) =>
    activeCategory === "all" || item.category === activeCategory
  );

  menuGrid.innerHTML = items.map((item) => `
    <article class="food-card">
      <div class="food-image">
        <img
          src="${item.image}"
          alt="${escapeHTML(currentLanguage === "ar" ? item.name : item.en)}"
          loading="lazy"
        >
        ${
          item.tag
            ? `<span class="food-tag">${escapeHTML(currentLanguage === "ar" ? item.tag : item.enTag)}</span>`
            : ""
        }
      </div>

      <div class="food-details">
        <h3>${escapeHTML(currentLanguage === "ar" ? item.name : item.en)}</h3>

        <p>${escapeHTML(currentLanguage === "ar" ? item.desc : item.enDesc)}</p>

        <div class="food-bottom">
          <span class="food-price">${money(item.price)}</span>

          <button
            class="add-cart"
            onclick="addToCart(${item.id})"
            title="${t("menuAdd")}"
          >+</button>
        </div>
      </div>
    </article>
  `).join("");
}

if ($("menuFilters")) {
  $("menuFilters").addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;

    activeCategory = button.dataset.category || "all";

    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    renderMenu();
  });
}

/* ==========================================
   CART
========================================== */

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(id, qty = 1) {
  const item = menuItems.find((item) => item.id === id);
  if (!item) return;

  const existing = cart.find((entry) => entry.id === id);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }

  saveCart();
  renderCart();
  showToast(t("added"));
}

function changeQty(id, amount) {
  const entry = cart.find((item) => item.id === id);
  if (!entry) return;

  entry.qty += amount;

  if (entry.qty <= 0) {
    cart = cart.filter((item) => item.id !== id);
  }

  saveCart();
  renderCart();
}

function cartSubtotal() {
  return cart.reduce((sum, entry) => {
    const item = menuItems.find((item) => item.id === entry.id);
    return sum + (item ? item.price * entry.qty : 0);
  }, 0);
}

function renderCart() {
  const cartItems = $("cartItems");
  const cartCount = $("cartCount");
  const cartTotal = $("cartTotal");

  if (!cartItems || !cartCount || !cartTotal) return;

  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);

  if (!cart.length) {
    cartItems.innerHTML = `<div class="empty-cart">${t("emptyCart")}</div>`;
    cartTotal.textContent = money(0);
    return;
  }

  cartItems.innerHTML = cart.map((entry) => {
    const item = menuItems.find((item) => item.id === entry.id);
    if (!item) return "";

    const name = currentLanguage === "ar" ? item.name : item.en;

    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <img src="${item.image}" alt="${escapeHTML(name)}">
          <div>
            <h4>${escapeHTML(name)}</h4>
            <small>${money(item.price * entry.qty)}</small>
          </div>
        </div>

        <div class="quantity-controls">
          <button onclick="changeQty(${item.id},-1)">−</button>
          <span>${entry.qty}</span>
          <button onclick="changeQty(${item.id},1)">+</button>
        </div>
      </div>
    `;
  }).join("");

  cartTotal.textContent = money(cartSubtotal());
}

if ($("cartOpen")) {
  $("cartOpen").onclick = () => {
    renderCart();
    openModal("cartModal");
  };
}

if ($("cartClose")) {
  $("cartClose").onclick = () => closeModal("cartModal");
}

/* ==========================================
   CHECKOUT
========================================== */

if ($("checkoutOpen")) {
  $("checkoutOpen").onclick = () => {
    if (!cart.length) {
      showToast(t("checkoutEmpty"));
      return;
    }

    if (!currentUser) {
      closeModal("cartModal");
      openAuth("login");
      return;
    }

    if ($("checkoutSummary")) {
      $("checkoutSummary").textContent =
        t("subtotal") + ": " + money(cartSubtotal());
    }

    closeModal("cartModal");
    openModal("checkoutModal");
  };
}

if ($("checkoutClose")) {
  $("checkoutClose").onclick = () => closeModal("checkoutModal");
}

if ($("checkoutForm")) {
  $("checkoutForm").addEventListener("submit", (event) => {
    event.preventDefault();

    if (!cart.length) return;

    const order = {
      id: Date.now(),
      customer: $("customerName").value.trim(),
      phone: $("customerPhone").value.trim(),
      address: $("customerAddress").value.trim(),
      payment: $("paymentMethod").value,
      items: cart.map((entry) => {
        const item = menuItems.find((item) => item.id === entry.id);

        return {
          id: entry.id,
          name: item.name,
          price: item.price,
          qty: entry.qty
        };
      }),
      total: cartSubtotal(),
      status: "pending",
      date: new Date().toISOString()
    };

    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    orders.push(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

    cart = [];
    saveCart();
    renderCart();

    $("checkoutForm").reset();
    closeModal("checkoutModal");

    showToast(t("orderSuccess"));
  });
}

/* ==========================================
   SPECIAL OFFER
========================================== */

if ($("offerOrder")) {
  $("offerOrder").onclick = () => {
    addToCart(2);
    addToCart(8);
    addToCart(12);

    document.querySelector("#menu")?.scrollIntoView({
      behavior: "smooth"
    });
  };
}

/* ==========================================
   DELIVERY
========================================== */

if ($("deliveryOrder")) {
  $("deliveryOrder").onclick = () => {
    if (!currentUser) {
      openAuth("login");
      return;
    }

    if (!cart.length) {
      document.querySelector("#menu")?.scrollIntoView({
        behavior: "smooth"
      });
      showToast(t("checkoutEmpty"));
      return;
    }

    renderCart();
    openModal("cartModal");
  };
}

/* ==========================================
   AUTHENTICATION
========================================== */

function openAuth(mode) {
  authMode = mode;
  updateAuthUI();

  if ($("authError")) {
    $("authError").textContent = "";
  }

  openModal("authModal");
}

function updateAuthUI() {
  const isRegister = authMode === "register";

  if (!$("authTitle")) return;

  $("authTitle").textContent = isRegister ? t("signup") : t("login");
  $("authSubtitle").textContent = isRegister
    ? t("registerSubtitle")
    : t("loginSubtitle");

  $("authSubmit").textContent = isRegister ? t("signup") : t("login");

  $("authNameWrap").hidden = !isRegister;
  $("authName").required = isRegister;

  $("loginTab").classList.toggle("active", !isRegister);
  $("registerTab").classList.toggle("active", isRegister);

  $("loginTab").textContent = t("loginTab");
  $("registerTab").textContent = t("registerTab");

  $("authSwitch").innerHTML = isRegister
    ? `${t("haveAccount")} <button type="button" id="switchAuth">${t("switchLogin")}</button>`
    : `${t("noAccount")} <button type="button" id="switchAuth">${t("switchRegister")}</button>`;

  $("switchAuth").onclick = () => {
    openAuth(isRegister ? "login" : "register");
  };
}

function login(email, password) {
  const user = getUsers().find(
    (user) => user.email === email && user.password === password
  );

  if (!user) throw new Error(t("invalidLogin"));
  return user;
}

function register(name, email, password) {
  const users = getUsers();

  if (users.some((user) => user.email === email)) {
    throw new Error(t("exists"));
  }

  if (!name || !email || !password) {
    throw new Error("Please fill in all fields.");
  }

  if (password.length < 6) {
    throw new Error(
      currentLanguage === "ar"
        ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل."
        : "Password must be at least 6 characters."
    );
  }

  const user = {
    name,
    email,
    password,
    createdAt: new Date().toISOString()
  };

  users.push(user);
  saveUsers(users);
  return user;
}

function setUser(user) {
  currentUser = user;
  localStorage.setItem(SESSION_KEY, user.email);

  closeModal("authModal");
  renderUser();

  showToast(
    authMode === "register"
      ? t("accountCreated")
      : t("loginSuccess")
  );
}

if ($("loginOpen")) {
  $("loginOpen").onclick = () => openAuth("login");
}

if ($("signupOpen")) {
  $("signupOpen").onclick = () => openAuth("register");
}

if ($("loginTab")) {
  $("loginTab").onclick = () => openAuth("login");
}

if ($("registerTab")) {
  $("registerTab").onclick = () => openAuth("register");
}

if ($("authClose")) {
  $("authClose").onclick = () => closeModal("authModal");
}

if ($("authForm")) {
  $("authForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const email = $("authEmail").value.trim().toLowerCase();
    const password = $("authPassword").value;

    try {
      const user =
        authMode === "register"
          ? register($("authName").value.trim(), email, password)
          : login(email, password);

      setUser(user);
      $("authForm").reset();
    } catch (error) {
      $("authError").textContent = error.message;
    }
  });
}

if ($("logoutBtn")) {
  $("logoutBtn").onclick = () => {
    currentUser = null;
    localStorage.removeItem(SESSION_KEY);
    renderUser();
    showToast(currentLanguage === "ar" ? "تم تسجيل الخروج" : "Logged out");
  };
}

function renderUser() {
  if (!currentUser) {
    $("loginOpen").hidden = false;
    $("signupOpen").hidden = false;
    $("userBox").hidden = true;
    return;
  }

  $("loginOpen").hidden = true;
  $("signupOpen").hidden = true;
  $("userBox").hidden = false;
  $("userName").textContent = currentUser.name;

  if ($("reviewName")) {
    $("reviewName").value = currentUser.name;
  }
}

/* ==========================================
   REVIEWS
========================================== */

function getReviews() {
  try {
    return JSON.parse(localStorage.getItem(REVIEWS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveReviews(reviews) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

function renderReviews() {
  const reviewsGrid = $("reviewsGrid");
  if (!reviewsGrid) return;

  const userReviews = getReviews();

  const demoReviews = [
    {
      name: "محمود",
      rating: 5,
      text: "البرجر طعمه رهيب والصوص مميز جدًا. أكيد هطلب تاني!",
      avatar: "👨"
    },
    {
      name: "سارة",
      rating: 5,
      text: "الفرايد تشيكن مقرمش جدًا والتوصيل كان ممتاز.",
      avatar: "👩"
    },
    {
      name: "عمر",
      rating: 4,
      text: "الوجبة حلوة والكمية كويسة مقابل السعر.",
      avatar: "🧑"
    }
  ];

  const allReviews = [...userReviews, ...demoReviews];

  reviewsGrid.innerHTML = allReviews.slice(0, 12).map((review) => `
    <article class="review-card">
      <div class="review-stars">
        ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
      </div>

      <p>${escapeHTML(review.text)}</p>

      <div class="review-author">
        <div class="review-avatar">${review.avatar || "👤"}</div>
        <div>
          <strong>${escapeHTML(review.name)}</strong>
          <small>${t("reviewVerified")}</small>
        </div>
      </div>
    </article>
  `).join("");
}

if ($("reviewOpen")) {
  $("reviewOpen").onclick = () => {
    if (!currentUser) {
      openAuth("login");
      showToast(t("loginFirst"));
      return;
    }

    $("reviewName").value = currentUser.name;
    selectedRating = 5;
    updateStars();
    openModal("reviewModal");
  };
}

if ($("reviewClose")) {
  $("reviewClose").onclick = () => closeModal("reviewModal");
}

if ($("starPicker")) {
  $("starPicker").addEventListener("click", (event) => {
    const button = event.target.closest("[data-star]");
    if (!button) return;

    selectedRating = Number(button.dataset.star);
    updateStars();
  });
}

function updateStars() {
  document.querySelectorAll("#starPicker button").forEach((button) => {
    button.classList.toggle(
      "active",
      Number(button.dataset.star) <= selectedRating
    );
  });
}

if ($("reviewForm")) {
  $("reviewForm").addEventListener("submit", (event) => {
    event.preventDefault();

    if (!currentUser) {
      closeModal("reviewModal");
      openAuth("login");
      return;
    }

    const text = $("reviewText").value.trim();
    if (!text) return;

    const reviews = getReviews();

    reviews.unshift({
      name: $("reviewName").value.trim(),
      rating: selectedRating,
      text,
      avatar: "👤",
      date: new Date().toISOString()
    });

    saveReviews(reviews);
    renderReviews();

    closeModal("reviewModal");
    $("reviewForm").reset();

    selectedRating = 5;
    updateStars();

    showToast(t("reviewSuccess"));
  });
}

/* ==========================================
   DARK / LIGHT MODE
========================================== */

function updateThemeButton() {
  if (!$("themeToggle")) return;

  $("themeToggle").textContent =
    document.body.classList.contains("light") ? "🌙" : "☀️";
}

if ($("themeToggle")) {
  $("themeToggle").onclick = () => {
    document.body.classList.toggle("light");

    const theme = document.body.classList.contains("light")
      ? "light"
      : "dark";

    localStorage.setItem(THEME_KEY, theme);
    updateThemeButton();
  };
}

if (localStorage.getItem(THEME_KEY) === "light") {
  document.body.classList.add("light");
}

updateThemeButton();

/* ==========================================
   LANGUAGE
========================================== */

if ($("languageToggle")) {
  $("languageToggle").onclick = () => {
    currentLanguage = currentLanguage === "ar" ? "en" : "ar";

    localStorage.setItem(LANGUAGE_KEY, currentLanguage);
    applyLanguage();
  };
}

function applyLanguage() {
  const isEnglish = currentLanguage === "en";

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = isEnglish ? "ltr" : "rtl";

  if ($("languageToggle")) {
    $("languageToggle").textContent = isEnglish ? "AR" : "EN";
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = translations[currentLanguage][key];

    if (value !== undefined) {
      element.innerHTML = value;
    }
  });

  if ($("authEmail")) $("authEmail").placeholder = t("emailPlaceholder");
  if ($("authPassword")) $("authPassword").placeholder = t("passwordPlaceholder");
  if ($("authName")) $("authName").placeholder = t("namePlaceholder");
  if ($("reviewText")) $("reviewText").placeholder = t("reviewPlaceholder");

  if ($("paymentMethod")) {
    $("paymentMethod").innerHTML = `
      <option value="cash">${t("cashOption")}</option>
      <option value="card">${t("cardDemo")}</option>
    `;
  }

  renderMenu();
  renderCart();
  renderReviews();
  updateAuthUI();
  updateThemeButton();
}

/* ==========================================
   INITIALIZATION
========================================== */

function init() {
  const savedEmail = localStorage.getItem(SESSION_KEY);

  if (savedEmail) {
    currentUser = getUsers().find((user) => user.email === savedEmail) || null;
  }

  renderMenu();
  renderCart();
  renderReviews();
  renderUser();
  applyLanguage();
}

init();
