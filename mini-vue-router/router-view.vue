<template>
  <!-- component :is 进行渲染 -->
  <component :is="component"></component>
</template>
<script setup>
import { computed } from "vue";
import { useRouter } from "./";
let router = useRouter();
const component = computed(() => {
  const route = router.routes.find(
    //? 路由匹配
    (route) => route.path === router.current.value
  );
  // 返回匹配成功的组件
  return route ? route.component : null;
});
</script>
