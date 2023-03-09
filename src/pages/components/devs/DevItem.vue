<template>
<li>
  <h3>{{ fullName }}</h3>
  <h4>${{ rate }}/hour</h4>
</li>
  <base-badge v-for="area in areas" :key="area" :type="area" :title="area">  </base-badge>
  <div class="actions">
    <base-button mode="outline" link :to="devContactLink">Contact</base-button>
    <base-button link :to="devDetailsLink">View Details</base-button>
  </div>
</template>

<script>
import BaseButton from "../ui/BaseButton";
export default {
  name: "DevItem",
  components: {BaseButton},
  props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    devContactLink() {
      return '/devs/' + this.id + '/contact'
    },
    devDetailsLink() {
      return '/devs/' + this.id
    }
  }
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>