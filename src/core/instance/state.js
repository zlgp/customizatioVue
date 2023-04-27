import { observe } from "../observer/index";
export function initState(vm) {
  let data =
    typeof vm.$options.data == "object" ? vm.$options.data : vm.$options.data();
  // 数据劫持
  observe(data);
}
