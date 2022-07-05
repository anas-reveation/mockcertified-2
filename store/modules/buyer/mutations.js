import { Storage } from '@capacitor/storage';

export default {
  async addToCart(state, item) {
    state.cartItems.push(item);
    await Storage.set({
      key: 'cartItems',
      value: JSON.stringify(state.cartItems),
    });
  },

  async removeCartItem(state, itemId) {
    state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    await Storage.set({
      key: 'cartItems',
      value: JSON.stringify(state.cartItems),
    });
  },
};
