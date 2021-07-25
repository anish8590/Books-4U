//next() for call back
export const addItemToCart = (item, next) => {
  let cart = [];
  //if access to window object
  if (typeof window !== undefined) {
    //previous products in cart
    if (localStorage.getItem("cart")) {
      //temporary cart
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    //item added to cart
    cart.push({
      ...item,
      count: 1
    });

    //cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    //console.log(cart);
    next();
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const removeItemFromCart = productId => {
  let cart = [];
  //temporary cart loaded
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    //match id deleted
    cart.map((product, index) => {
      if (product._id === productId) {
        cart.splice(index, 1);//index and number of items
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};


export const cartEmpty = next => {
  //temporary cart loaded
  if (typeof window !== undefined) {
     (localStorage.removeItem("cart")) ;
     let cart=[];
     localStorage.setItem("cart", JSON.stringify(cart));
     next();
  }
};

