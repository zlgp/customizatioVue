//获取数组的原型
const arrayProto = Array.prototype;
//以Array.prototype为原型创建arrayMethods对象，并将该对象暴露出去
//之后数组调用这7个方法时，让数组调用arrayMethods对象上我们已经进行重写的这7个方法
export const arrayMethods = Object.create(arrayProto);
const methodName = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];
methodName.forEach((method) => {
  arrayMethods[method] = function (...args) {
    const result = arrayProto[method].apply(this, args);
    const ob = this.__ob__;
    //push，unshift，splice会向数组内增加元素，这个增加的元素我们需要调用数组身上的Observer类（即__ob__）上的observeArray方法，对新增的元素进行响应式处理
    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;

      case "splice":
        //splice格式是splice(下标，数量，插入的新项)
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    return result;
  };
});
