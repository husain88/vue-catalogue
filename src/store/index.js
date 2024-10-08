import { createStore } from 'vuex';

export default createStore({
  state: {
    products: [],
    basketItems: [],
    categories: [],
    filters: {
      category: '',
      searchQuery: '',
      sortByPrice: false
    }
  },
  getters: {
    filteredProducts(state) {
      let filteredProducts = state.products.filter(product => {
        if (state.filters.category && product.category !== state.filters.category) {
          return false;
        }
        if (state.filters.searchQuery && !product.title.toLowerCase().includes(state.filters.searchQuery.toLowerCase())) {
          return false;
        }
        return true;
      });
  
      if (state.filters.sortByPrice) {
        filteredProducts.sort((a, b) => a.price - b.price);
      }
      console.log('filtered getter: ' + filteredProducts)
      return filteredProducts;
    },
    totalBasketPrice(state) {
      return state.basketItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    basketItemCount(state) {
      return state.basketItems.reduce((total, item) => total + item.quantity, 0);
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
      const uniqueCategories = new Set(products.map(product => product.category));
      state.categories = Array.from(uniqueCategories);
    },
    addToBasket(state, product) {
      const existingItem = state.basketItems.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.basketItems.push({ ...product, quantity: 1 });
      }
    },
    removeFromBasket(state, productId) {
      state.basketItems = state.basketItems.filter(item => item.id !== productId);
    },
    updateQuantity(state, { productId, quantity }) {
      const item = state.basketItems.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        console.log(data.products)
        commit('setProducts', data.products);
      } catch (error) {
        alert('Error fetching products:', error)
        console.error('Error fetching products:', error);
      }
    },
    applyFilters({ state }) {
      const filteredProducts = state.products.filter(product => {
        if (state.filters.category && product.category.id !== state.filters.category) {
          return false;
        }
        if (state.filters.searchQuery && !product.title.toLowerCase().includes(state.filters.searchQuery.toLowerCase())) {
          return false;
        }
        return true;
      });
  
      if (state.filters.sortByPrice) {
        filteredProducts.sort((a, b) => a.price - b.price);
      }
      console.log(filteredProducts)
      return filteredProducts;
    },
    updateSelectedCategory({state}, categoryId) {
      state.filters['category'] = categoryId;
    },
    updateSearchQuery({state}, query) {
      state.filters['searchQuery'] = query;
    },
    updateSortByPrice({state}, sortByPrice) {
      state.filters['sortByPrice'] = sortByPrice;
    }
  },
  modules: {}
});