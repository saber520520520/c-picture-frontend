<template>
  <div id="mySpacePage">
    <p>正在跳转请稍后。。。</p>
  </div>


</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { listSpaceVoByPageUsingPost } from '@/api/spaceController.ts'
import { message } from 'ant-design-vue'
import { onMounted } from 'vue'

const router = useRouter()
const loginUserStore = useLoginUserStore()

//检查用户是否有个人空间
const checkUserSpace = async () => {
  //用户未登录跳转登录页
  const user = loginUserStore.loginUser;
  if (!user?.id)
  {
    router.replace("/user/login");
    return;
  }
  //已经登录获取个人空间
  const res = await listSpaceVoByPageUsingPost({
      userId: user.id,
    current: 1,
    pageSize: 1,
  })
  if (res.data.code===0)
  {
    if (res.data.data?.records?.length>0)
    {
      const space = res.data.data.records[0]
      //跳转空间详细页
      router.push(`/space/${space.id}`)
    }else {
      router.push("/add_space")
      message.warn("请先创建空间")
    }
  }else {
    message.error("获取空间失败"+res.data.message)
  }
}

onMounted(()=>{
  checkUserSpace()
})
</script>


<style scoped>

</style>
