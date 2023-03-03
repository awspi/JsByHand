import { computed, inject, reactive } from "vue";
const STORE_KEY = "__store__";

function useStore() {
  return inject(STORE_KEY);
}

function createStore(options) {
  return new Store(options);
}

// commit - mutations
// dispatch - actions

class Store {
  constructor(options) {
    this.$options = options;
    this._state = reactive({
      data: options.state()
    });
    this._mutations = options.mutations;
    this._actions = options.actions;
    // 处理getters->
    // 1.传入this.state
    // 2.使用computed包裹
    this.getters = {};
    Object.keys(options.getters).forEach((name) => {
      const fn = options.getters[name];
      this.getters[name] = computed(() => fn(this.state));
    });
  }
  get state() {
    return this._state.data;
  }
  /**
   * 执行mutation 传入state和payload
   * @param {*} type mutation
   * @param {*} payload 参数
   */
  commit = (type, payload) => {
    const entry = this._mutations[type];
    // 箭头函数获取this.state 使用上面的getter方法
    entry && entry(this.state, payload);
  };
  /**
   * 调用action 传入store实例和payload
   * @param {*} type
   * @param {*} payload
   */
  dispatch(type, payload) {
    const entry = this._actions[type];
    return entry && entry(this, payload);
  }
  // vue注册插件
  install(app) {
    // 在整个应用层面提供依赖
    app.provide(STORE_KEY, this);
  }
}

export { useStore, createStore };
