<template>
  <div class="filters-wrapper">
    <div class="filters">
        <select class="form-select" v-model="selectedCategory" @change="$emit('categoryChanged', selectedCategory)">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
        <div class="input-group mx-2">
          <input type="text" v-model="searchQuery" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" placeholder="search by name">
          <span class="input-group-text" @click="$emit('searchQueryChanged', searchQuery)">
            <img class="search-icon" src="https://static-00.iconduck.com/assets.00/search-icon-2048x2048-cmujl7en.png" alt="Search Icon - Search Icon Png Blue @clipartmax.com">
          </span>
        </div>
        <button @click="$emit('sortByPrice', !sortByPrice)" class="btn btn-success" title="sort by price">Sort</button>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: '',
      searchQuery: '',
      sortByPrice: false
    }
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  created() {
    // Ensure categories are available before rendering
    if (!this.categories || this.categories.length === 0) {
      console.warn('Categories data is not available in Filters component.');
    }
  }
}
</script>
<style scoped lang="scss">
.filters-wrapper {
  display: flex;
  margin: 16px;
  justify-content: flex-end;
  .filters {
    display: flex;
  }
}
.search-icon {
  width: 16px;
  height: 16px;
}
</style>