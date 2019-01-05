<template>
  <div>
    <v-ons-tabbar>
      <template slot="pages">
        <counter-page />
        <setting-page />
      </template>
      <v-ons-tab icon="fa-home" label="home" />
      <v-ons-tab icon="fa-cog" label="setting" />
    </v-ons-tabbar>
  </div>
</template>

<script>
import CounterPage from '~/components/pages/counter-page'
import SettingPage from '~/components/pages/setting-page'

export default {
  components: {
    CounterPage,
    SettingPage
  },
  data () {
    return {
    }
  }
}
</script>
