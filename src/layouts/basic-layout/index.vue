<template>
  <el-container direction="vertical" class="page-container">
    <page-header
      v-show="!isFullscreen && !isMicro"
      :user-name="userName"
      :page-name="pageName"
      @logout-click="handleLogoutClick"
    >
      <template v-slot:page-header>
        <slot name="page-header"></slot>
      </template>
    </page-header>
    <el-container class="page-container__content">
      <page-aside v-show="!isFullscreen && $scopedSlots['page-sidemenu']">
        <template v-slot:page-sidemenu>
          <slot name="page-sidemenu"></slot>
        </template>
      </page-aside>
      <el-main style="padding-top: 0;display:flex;flex-direction:column;">
        <slot></slot>
        <el-main class="page-container__main">
          <slot name="page-main"></slot>
        </el-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import PageHeader from './components/page-header'
import PageAside from './components/page-aside'
export default {
  data() {
    return {
      isFullscreen: false,
    }
  },
  props: {
    pageName: {
      type: String,
      default: '',
    },
    userName: {
      type: String,
      default: '用户名',
    },
    isMicro: {
      type: Boolean,
      default: false,
    }
  },
  components: { PageHeader, PageAside },
  methods: {
    handleLogoutClick() {
      this.$emit('logout-click')
    },
  },
}
</script>

<style lang="less" scoped>
.page-container {
  background-color: #f2f2f2;
  height: 100vh !important;
}

.page-container__content {
  overflow: auto;
}

.page-container__main {
  overflow: auto;
  padding: 0;
}
</style>
