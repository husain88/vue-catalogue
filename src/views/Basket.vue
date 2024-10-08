<template>
  <div class="basket">
    <h2>Your Basket</h2>
    <div class="basket-items" v-if="basketItems.length > 0">
      <div class="basket-item card" v-for="item in basketItems" :key="item.id">
        <img :src="item.thumbnail" alt="" v-if="item.thumbnail">
        <div class="product-info">
          <h3 class="product-name">{{ item.title }}</h3>
          <p class="product-price">{{ formatPrice(item.price) }}</p>
        </div>
        <div class="quantity-wrapper">
            <p><b>Quantity</b></p>
          <input type="number" class="form-control" min="1" v-model.number="item.quantity" @change="updateQuantity(item.id)">
        </div>
        <p class="subtotal">Subtotal: {{ formatPrice(item.price * item.quantity) }}</p>
        <button class="btn btn-danger" @click="removeFromBasket(item.id)">Remove</button>
      </div>
    </div>
    <p v-else>Your basket is empty.</p>
    <p v-if="basketItems.length > 0" class="mt-3"><b>Total Price:</b> {{ formatPrice(totalBasketPrice) }}</p>
    <button v-if="basketItems.length > 0" class="checkout-button">Proceed to Checkout</button>
  </div>
</template>


<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['basketItems']),
    ...mapGetters(['totalBasketPrice'])
  },
  methods: {
    ...mapMutations(['removeFromBasket', 'updateQuantity']),
    formatPrice(price) {
      // Implement your logic to format price with currency symbol
      return `$${price.toFixed(2)}`; // Example formatting
    },
  }
}
</script>

<style scoped>
.basket {
  padding: 20px;
}

.basket-items {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 16px;
}

.basket-item {
  display: flex;
  align-items: center;
  padding: 12px;
  justify-content: center;
}

.basket-item img {
  width: 80px;
  margin-right: 15px;
}

.product-info {
  flex-grow: 1;
}

.product-name {
  font-weight: bold;
}

.product-price {
  color: #666;
}
.quantity-wrapper button {
  padding: 5px;
  border: none;
  cursor: pointer;
}

.subtotal {
    margin-top: 8px;    
  font-weight: bold;
}

.checkout-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
</style>