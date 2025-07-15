<template>
  <div id="globalSider">
      <a-layout-sider class="sider" v-if="loginUserStore.loginUser.id" width="200"
      breakpoint="lg"
      collapsed-width="0">
        <a-menu
          mode="inline"
          v-model:selectedKeys="current"
          :items="menuItems"
          @click="doMenuClick"
        />
      </a-layout-sider>
  </div>
</template>
<script lang="ts" setup>
import { computed, h, ref } from 'vue'
import { PictureOutlined,UserOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'

const loginUserStore = useLoginUserStore()
// 菜单列表
const menuItems = [
  {
    key: '/',
    icon: () => h(PictureOutlined),
    label: '公共图库'
  },
  {
    key: '/my_space',
    label: '我的空间',
    icon: () => h(UserOutlined),
  }
]
//路由跳转事件
const router = useRouter()
const doMenuClick = ({ key }: { key: string }) => {
  router.push({
    path: key,
  })
}
const current = ref<string[]>([])
// 监听路由变化，更新当前选中菜单
router.afterEach((to, from, next) => {
  current.value = [to.path]
})

</script>

<style scoped>
#globalSider .ant-layout-sider{
  background: none;
}
</style>
