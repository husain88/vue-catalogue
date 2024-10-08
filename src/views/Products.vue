<template>
  <div>
    <Filters :categories="categories" @categoryChanged="updateCategory" @searchQueryChanged="updateQuery" @sortByPrice="updateSort"></Filters>
    <div v-if="isLoadingProducts">loading</div>
    <div v-else-if="!filteredProducts?.length">No Items Found.</div>
    <div class="product-list" v-else>
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" @addToBasket="addToBasket"></ProductCard>
    </div>
  </div>
</template>

<script>
import Filters from './../components/Filters.vue'
import ProductCard from './../components/ProductCard.vue'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    Filters,
    ProductCard
  },
  computed: {
    ...mapGetters(['filteredProducts']),
    ...mapState(['categories', 'basketItems']),

    isLoadingProducts() {
      return !this.$store.state.products.length;
    },
    isItemInBasket(productId) {
      return this.basketItems.some(item => item.id === productId);
    }
  },
  methods: {
    ...mapMutations(['addToBasket']),
    ...mapActions(['fetchProducts', 'applyFilters', 'updateSelectedCategory', 'updateSearchQuery', 'updateSortByPrice']),
    updateCategory(data) {
      this.updateSelectedCategory(data);
      this.applyFilters();
    },
    updateQuery(data) {
      this.updateSearchQuery(data);
      this.applyFilters();
    },
    updateSort(data) {
      this.updateSortByPrice(data)
      this.applyFilters();
    },
  },
  async mounted() {
    await this.fetchProducts()
  }
}
</script>

<style scoped land="scss">
  .product-list {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    display: grid;
    grid-column-gap : 8px;
    margin: 16px;
    @media (min-width: 768px) { /* For tablets */
      grid-template-columns: repeat(2, minmax(250px, 1fr)); /* 2 columns on tablets */
    }

    @media (min-width: 1024px) { /* For desktops */
      grid-template-columns: repeat(4, minmax(250px, 1fr)); /* 4 columns on desktops */
    }
  }

  
</style>