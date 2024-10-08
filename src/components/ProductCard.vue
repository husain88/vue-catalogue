<template>
    <div class="card mb-3">
        <img :src="product?.thumbnail" class="card-img-top img-size" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{product?.title}}</h5>
            <p class="card-text">{{ product?.description }}</p>
            <p><b>Price: </b>{{ product?.price }}</p>
            <button class="basket-btn btn btn-warning" @click="$emit('addToBasket', product)">Add to Basket</button>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    },
  }
}
</script>
<style scoped lang="scss">
.card {
    .card-body {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        
    }
    .img-size {
        max-width: 200px;
        margin: 0 auto;
    }
}

</style>