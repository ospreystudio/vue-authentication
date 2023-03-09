<template>
  <div>
  <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p> {{ error }}</p>
  </base-dialog>
  <section>
    <dev-filter @change-filter="setFilters"></dev-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadDevs(true)">Refresh</base-button>
        <base-button link to="auth?redirect=register" v-if="!isLoggedIn">Login</base-button>
        <base-button link to="/register" v-if="!isDev && !isLoading && isLoggedIn">Register as a Developer</base-button>
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasDev">
        <dev-item v-for="dev in filteredList" :key="dev.id" :id="dev.id"
                  :first-name="dev.firstName"
                  :last-name="dev.lastName"
                  :rate="dev.hourlyRate"
                  :areas="dev.areas"></dev-item>
      </ul>
      <p v-else>No developers Found</p>
    </base-card>
  </section>
  </div>
</template>

<script>

import DevItem from "../components/devs/DevItem";
import DevFilter from "../components/devs/DevFilter";
import BaseButton from "../components/ui/BaseButton";
export default {
  name: "DevList",
  components: {
    BaseButton,
    DevFilter,
    DevItem
  },
  created() {
    this.loadDevs()
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        fullstack: true
      }
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    },
    filteredList() {
      const devs = this.$store.getters['devModule/devs']
      return devs.filter(dev => {
        if (this.activeFilters.frontend && dev.areas.includes('frontend')) {
          return true
        }
        if (this.activeFilters.backend && dev.areas.includes('backend')) {
          return true
        }
        if (this.activeFilters.fullstack && dev.areas.includes('fullstack')) {
          return true
        }
        return false
      })
    },
    hasDev() {
      return !this.isLoading && this.$store.getters['devModule/hasDevs']
    },
    isDev() {
      return this.$store.getters['devModule/isDevs']
    }
  },

  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters
    },
   async loadDevs(refresh = false) {
      this.isLoading = true
     try {
       await this.$store.dispatch('devModule/loadDevs', {forceRefresh: refresh})
     } catch (error) {
        this.error = error.message || 'Something went wrong'
     }
     this.isLoading = false
    },
    handleError() {
      this.error = null
    },
  },


}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}

</style>