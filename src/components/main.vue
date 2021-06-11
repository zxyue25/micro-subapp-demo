<template>
  <basic-layout :user-name="userName" @logout-click="handleLogoutClick">
    <bread-crumb :routes="routes"></bread-crumb>
    <template slot="page-sidemenu">
      <side-menu
        src="/market-common/js/side-menu-find.widgets.js"
        :routes="routes"
        :showAppName="showAppName"
      >
      </side-menu>
    </template>
    <template slot="page-main">
      <keep-alive>
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </keep-alive>
    </template>
  </basic-layout>
</template>

<script>
import BasicLayout from '@/layouts/basic-layout'
import BreadCrumb from '@/components/bread-crumb'
import SideMenu from '@/components/side-menu'
import { metaJSONTree as routes } from '@/router/temp.router'
export default {
  components: {
    BasicLayout,
    BreadCrumb,
    SideMenu
  },
  data() {
    return {
      menuAuths: '',
      userName: '',
      showAppName: "shbbb",
      routes: JSON.stringify(routes),
    }
  },
  async created() {
    // try {
    //   const res = await getUserInfo()
    //   if (res.success) {
    //     const { data } = res
    //     this.userName = data.username || data.erp || '用户名'
    //   }
    // } catch (e) {
    //   this.$message.error(e)
    // }
  },
  mounted() {},
  computed: {},
  methods: {
    async handleLogoutClick() {
      // try {
      //   const res = await logout()
      //   if (res.success) {
      //     localStorage.clear()
      //     location.href = ''
      //   } else {
      //     this.$message.error(res.desc)
      //   }
      // } catch (e) {
      //   this.$message.error(e)
      // }
    },
  },
}
</script>
