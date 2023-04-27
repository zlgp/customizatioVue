import { initMixin } from "./core/instance/init";
function Vue(options) {
  //   初始化Vue
  this._init(options);
}
// 初始化data
initMixin(Vue);
export default Vue;
