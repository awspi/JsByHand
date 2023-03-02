import { inject, ref } from "vue";
import RouterLink from "./router-link.vue";
import RouterView from "./router-view.vue";

const ROUTER_KEY = "__router__";
// 创建实例
function createRouter(options) {
  return new Router(options);
}
//返回创建的Router实例
function useRouter() {
  return inject(ROUTER_KEY);
}
// history 两个模式 一个hash 一个history
// hash模式
function createWebHashHistory() {
  // 用于监听hash改变
  // 在Router类的构造函数中被调用 用于保持响应式的currentURL
  function bindEvents(fn) {
    window.addEventListener("hashchange", fn);
  }
  return {
    bindEvents,
    url: window.location.hash.slice(1) || "/"
  };
}

class Router {
  constructor(options) {
    this.history = options.history; //history模式
    this.routes = options.routes; //路由表
    this.current = ref(this.history.url); //当前url
    //绑定hash改变的回调 更新current
    this.history.bindEvents(() => {
      this.current.value = window.location.hash.slice(1);
    }); //绑定事件 响应式的current
  }
  // vue插件
  install(app) {
    app.provide(ROUTER_KEY, this);
    app.component("router-link", RouterLink);
    app.component("router-view", RouterView);
  }
}
export { createRouter, createWebHashHistory, useRouter };
