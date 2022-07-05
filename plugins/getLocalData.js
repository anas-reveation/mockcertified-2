import { Storage } from '@capacitor/storage';

export default async function ({ store }) {
  store.commit('SET_LOADER', true);
  const { value } = await Storage.get({ key: 'cartItems' });
  const cartItems = JSON.parse(value);
  if (cartItems && cartItems.length > 0) {
    cartItems.forEach((item) => {
      store.commit('buyer/addToCart', item);
    });
  }
  store.commit('SET_LOADER', false);
}
