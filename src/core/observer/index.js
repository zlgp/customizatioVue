import { isObject, isArray } from "@/tool/index";
import { arrayMethods } from "./array";
/* 
对Vue实例里的data对象的数据进行劫持,数组单独处理,
对象,字符串,布尔值都是用 Object.defineProperty来劫持的
*/
export function observe(data) {
  if ((!isObject(data) && !isArray(data)) || data == null) {
    return data;
  }
  return new Observe(data);
}

export class Observe {
  constructor(value) {
    if (isArray(value)) {
      value.__proto__ = arrayMethods;
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
  walk(data) {
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = data[key];
      defineReactive(data, key, value);
    }
  }
  //   劫持数组
  observeArray(data) {
    for (let i = 0; i < data.length; i++) {
      observe(data[i]);
    }
  }
}

export function defineReactive(data, key, value) {
  observe(value);
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newVal) {
      if (value == newVal) {
        return;
      }
      observe(newVal);
      value = newVal;
    },
  });
}
