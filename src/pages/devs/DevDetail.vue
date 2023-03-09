<template>
  <div>
<section>
  <base-card>
    <h2> {{ fullName }} </h2>
    <h2>${{ rate }}/hour</h2>
  </base-card>
</section>
  <section>
    <base-card>
      <header>
      <h2>Interested? Reach out now!</h2>
      <base-button link :to="contactLink">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
      <p>{{ description }}</p>
    </base-card>

  </section>
  </div>
</template>

<script>
import BaseButton from "../components/ui/BaseButton";
export default {
  name: "DevDetail",
  components: {BaseButton},
  props: ['id'],
  data() {
    return {
      selectedDev: null
    }
  },
  created() {
    this.selectedDev = this.$store.getters['devModule/devs'].find((dev) => dev.id === this.id)
    console.log(this.selectedDev)
  },
  computed: {
    fullName() {
      return this.selectedDev.firstName + ' ' + this.selectedDev.lastName
    },
    contactLink() {
      return this.$route.path + '/' + this.id + '/contact'
    },
    areas() {
      return  this.selectedDev.areas
    },
    rate() {
     return  this.selectedDev.hourlyRate
    },
    description() {
      return this.selectedDev.description
    },
  },
}
</script>

<style scoped>

</style>