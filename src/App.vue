<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Catelogue </a>
    <button class="navbar-toggler" type="button" @click="toggleNavbar" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" :class="{ 'show': isNavbarOpen }" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/products">Products</router-link>
        </li>
        
      </ul>
      <ul class="ms-auto navbar-nav">
      <li class="nav-item">
          <router-link class="nav-link position-relative float-right" to="/basket">
            <img class="cart-icon" src="https://cdn-icons-png.flaticon.com/512/1413/1413908.png" alt="">
            <span class="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-danger" v-if="basketItemCount > 0">
              {{ basketItemCount }}
              <span class="visually-hidden">unread messages</span>
            </span>          
          </router-link>
        </li>
    </ul>
    </div>
  </div>
</nav>
  <router-view />
</template>
<script>
import { mapGetters, mapState } from "vuex"

export default {
  data() {
    return {
      isNavbarOpen: false
    }
  },
  computed: {
    ...mapState(['totalBasketPrice']),
    ...mapGetters(['basketItemCount'])
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .nav-item {
    @media screen and (max-width: 991px) {
      text-align: left;
    }
  }
  .cart-icon {
    width: 20px;
  }
  .nav-link:hover, .nav-link:focus  {
    color: #42b983;
  }
}
</style>
