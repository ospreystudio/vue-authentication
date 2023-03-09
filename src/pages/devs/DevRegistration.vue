<template>
  <base-card>
    <h2>Register as a developer Now!</h2>
    <dev-form @save-data="saveData"></dev-form>
  </base-card>

</template>

<script>
import DevForm from "../components/devs/DevForm";
export default {
  components: {
    DevForm
  },

  methods: {
    saveData(data) {
      this.$store.dispatch('devModule/registerDevs', data)
    }
  }
}
</script>

<style scoped>

</style>