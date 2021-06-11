<template>
  <el-breadcrumb class="breadcrumb-container" separator="/">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span
        v-if="item.redirect === 'noRedirect' || index === levelList.length - 1"
      >
        {{ item.name }}
      </span>
      <span v-else style="cursor: pointer;" @click.prevent="handleLink(item)">
        {{ item.name }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    routes: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      levelList: [],
      queryList: {},
      routesArr: JSON.parse(this.routes),
    };
  },
  watch: {
    $route: {
      handler: function() {
        this.getBreadcrumb();
      },
      // 深度观察监听
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getBreadcrumb() {
      const curPath = this.$route.matched[0].path;
      let path = this.$route.path;
      if(path.indexOf('/view') != -1) {
        path = path.slice(0, path.length - 5)
      }
      this.queryList[path] = this.$route.query;
      this.levelList = [];
      const curPathArr = this.routesArr.filter(
        (item) => item.path && item.path === curPath
      );
      if (curPathArr.length !== 0) {
        this.getBreadcrumbItem(curPathArr[0]);
      }
    },
    getBreadcrumbItem(item) {
      if (item) {
        const curPath = location.hash;
        if (
          item.meta &&
          item.meta.menu &&
          item.meta.menu.title &&
          !item.meta.hideOnBreadcrumb
        ) {
            this.levelList.push({
              name: item.meta.menu.title,
              path: item.path,
              redirect: item.redirect,
              query: this.queryList[item.path]
            });
        }
        if (item.children) {
          const curPathArr = item.children.filter(
            (item) => curPath.indexOf(item.path) !== -1
          );
          if (curPathArr.length !== 0) {
            this.getBreadcrumbItem(curPathArr[0]);
          }
        }
      }
    },
    handleLink(item) {
      const { redirect, path, query } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push({path, query});
    },
  },
};
</script>

<style lang="less" scoped>
.breadcrumb-container {
  display: inline-block;
  font-size: 14px;
  line-height: 48px;
  user-select: none;
  height: 40px;

  .el-breadcrumb__item {
    span {
      color: #a1a5af;
    }
    :hover {
      color: #2c68ff;
    }
  }

  .el-breadcrumb__item:last-child {
    span {
      color: #515a6e;
    }
  }
}
</style>
