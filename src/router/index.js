import { createRouter, createWebHistory } from 'vue-router';
import Home from './../views/Home.vue';
import Products from './../views/Products.vue';
import Basket from './../views/Basket.vue';   


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/basket',
    name: 'Basket',
    component: Basket

  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
