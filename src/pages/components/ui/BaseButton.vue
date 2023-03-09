<template>
<button v-if="!link" :class="mode">
  <slot>
  </slot>
</button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    mode: {
      type: String,
      required: false,
      default: null

    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #2CA5E0;
  border: 1px solid #2CA5E0;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #4F63DE;
  border-color: #4F63DE;
}

.flat {
  background-color: transparent;
  color: #2CA5E0;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #4F63DE;
  color: #4F63DE;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>