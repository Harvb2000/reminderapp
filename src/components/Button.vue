<template>
    <button class="settinbutton">
        <slot></slot>
    </button>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.settinbutton {
  border-radius: 5px;
  border-style: none;
}

.settinbutton:hover {
  background-color: rgb(153, 153, 153);
}
</style>
