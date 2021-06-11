<template>
  <div class="side-menu-wrapper">
    <div class="side-menu-wrapper__name" v-if="appName">
      {{ appName }}
    </div>
    <el-menu
      :default-active="activePath"
      :default-openeds="openMenu"
      :unique-opened="true"
      menu-trigger="click"
      text-color="rgba(255, 255, 255, 0.5)"
      active-text-color="#fff"
      background-color="#212121"
      width="200"
      router
      :style="appName ? 'margin-top:50px' : ''"
    >
      <div
        v-for="(item, index) in menuList"
        :key="`menuItem${index}`"
        style="width: 200px"
      >
        <el-menu-item
          v-if="!item.meta.hasSubMenu"
          :route="item.path"
          :index="item.path"
          class="menu-item"
        >
          <i :class="item.meta.menu.icon" style="width: 16px"></i>
          <el-badge
            is-dot
            :hidden="
              item.path == '/user' ? (noReadCount > 0 ? false : true) : true
            "
          >
            <!-- 消息 -->
            {{
              item.meta.menu && item.meta.menu.title ? item.meta.menu.title : ''
            }}
          </el-badge>
        </el-menu-item>
        <el-submenu
          v-else
          :index="item.path"
          class="menu-item"
          style="height: 100%"
        >
          <template slot="title">
            <i :class="item.meta.menu.icon" style="width: 16px"></i>
            <el-badge
              is-dot
              :hidden="
                item.path == '/user' ? (noReadCount > 0 ? false : true) : true
              "
            >
              {{
                item.meta.menu && item.meta.menu.title
                  ? item.meta.menu.title
                  : ''
              }}
            </el-badge>
          </template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.children"
            :key="`subMenuItem${index}${subIndex}`"
            :route="`${subItem.path}`"
            :index="`${subItem.path}`"
            class="submenu-item"
          >
            <el-badge
              :value="noReadCount"
              :max="99"
              class="badge"
              :hidden="
                subItem.path == '/user/message-list'
                  ? noReadCount > 0
                    ? false
                    : true
                  : true
              "
              style="user-select: none"
            >
              <span class="circle"></span>
              {{
                subItem.meta.menu && subItem.meta.menu.title
                  ? subItem.meta.menu.title
                  : ''
              }}
            </el-badge>
          </el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'SideMenu',
  props: {
    noRead: {
      type: Number,
    },
    routes: {
      type: String,
      default() {
        return ''
      },
    },
    theme: {
      type: String,
      default: 'light',
    },
    appName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      openMenu: ['/'],
    }
  },
  computed: {
    noReadCount() {
      return this.noRead || 0
    },
    menuList() {
      // console.log(this.getMenuList(this.menu))
      // return this.getMenuList(this.menu)
      return this.getMenuList(JSON.parse(this.routes))
    },
    activePath() {
      return (
        (this.$route.meta &&
          this.$route.meta.menu &&
          this.$route.meta.menu.activeMenu) ||
        this.$route.path
      )
    },
  },
  methods: {
    getMenuList(arr) {
      if (!arr) {
        return
      }
      const visibleMenus = arr.filter(
        (item) =>
          item.meta &&
          item.meta.menu &&
          item.meta.menu.title &&
          item.meta.showOnMenu
      )
      visibleMenus.forEach((menu) => {
        menu.children = this.getMenuList(menu.children)
        if (menu.children && menu.children.length > 0) {
          menu.meta.hasSubMenu = true
        }
      })
      return visibleMenus
    },
  },
}
</script>
<style lang="less">
.side-menu-wrapper {
  height: 100%;
  width: 200px;
}

.side-menu-wrapper__name {
  ine-height: 28px;
  font-family: PingFangSC-Semibold;
  font-size: 20px;
  color: rgba(255, 255, 255, 1);
  padding: 10px 20px;
  position: fixed;
  z-index: 99;
  background: #212121;
  width: 200px;
  box-sizing: border-box;
}

.menu-item {
  height: 100%;
  width: 100%;
}

.menu-item /deep/ .el-submenu__title {
  padding-left: 10px;
}

.menu-item /deep/ .el-submenu {
  width: auto;
}

.submenu-item {
  padding-left: 45px !important;
  padding-right: 0 !important;
  // padding: 10px 0 10px 49px!important;

  &.is-active {
    background-color: #2c68ff !important;
  }

  &:hover {
    background: transparent;
  }
}

.el-submenu.is-active > .el-submenu__title {
  // color: #333 !important;
}

.el-menu-item.is-active {
  background-color: #2c68ff !important;
}

.el-menu-item {
  font-size: 13px;
}

.el-submenu__title:hover:not(.is-disabled),
.el-menu-item:hover:not(.is-disabled) {
  color: #fff !important;
}
.el-badge__content.is-fixed {
  position: absolute !important;
  top: 14px !important;
  right: -4px !important;
}
.el-badge__content {
  border: none;
}

.circle {
  width: 6px;
  height: 6px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  display: inline-block;
  border-radius: 50%;

  &:hover {
    border: 1px solid #fff;
  }
}

.el-menu-item.submenu-item.is-active .circle {
  background-color: #fff;
  border: 1px solid #fff;
}
</style>
