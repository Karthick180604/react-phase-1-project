const updateStorageQuantity = (id, quantity) => {
  const storageString = localStorage.getItem("cart");
  const cartArray = JSON.parse(storageString);
  const updatedCartArray = cartArray.map((cartItem) => {
    if (cartItem.id === id) {
      cartItem.quantity = quantity;
    }
    return cartItem;
  });
  localStorage.setItem("cart", JSON.stringify(updatedCartArray));
};
const removeStorageProduct = (id) => {
  const storageString = localStorage.getItem("cart");
  const cartArray = JSON.parse(storageString);
  const updatedCartArray = cartArray.filter((cartItem) => {
    return cartItem.id !== id;
  });
  localStorage.setItem("cart", JSON.stringify(updatedCartArray));
};
const getCartItemsLength = () => {
  const storageString = localStorage.getItem("cart");
  const cartArray = storageString === null ? [] : JSON.parse(storageString);
  return cartArray.length;
};

export { updateStorageQuantity, removeStorageProduct, getCartItemsLength };
