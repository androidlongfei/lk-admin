# 一、Vue相关

## 1.CSS中scoped的作用

scoped属性会自动添加一个唯一的属性（比如 data-v-21e5b78）为组件内CSS 指定作用域，编译的时候 .list-container:hover 会被编译成类似 .list-container[data-v-21e5b78]:hover

```javascript
<style scoped>
  @media (min-width: 250px) {
    .list-container:hover {
      background: orange;
    }
  }
</style>
```

> `scoped`:的作用是使CSS只在当前组件中起作用

## 2.webpack中css模块化

css-loader,less-loader,style-loader的配置顺序

```
1.先用less-loader将less转化为css

2.再用css-loader编译css，使得css文件能模块化。

3.最后用style-loader将css文件模块中的内容以style标签的形式插入到html模版中.
```

## 3.Vue执行DOM更新是异步的.

Vue观察到数据变化，将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会一次推入到队列中.

因为DOM更新是异步的,如果想在DOM更新之后做某些操作需要用到`Vue.nextTick(callback)`。

例如:

```javascript
data() {
  return {
    message: 'not updated'
  }
},
methods: {
  updateMessage() {
    this.message = 'updated'
    console.log(this.$el.textContent) // => 'not updated'
    this.$nextTick(() => {
      console.log(this.$el.textContent) // => 'updated' =>做某些操作
    })
  }
}
```

## 4.组件的生命周期及钩子函数的使用

```
beforecreate : 可以在这加个loading事件

created ：在这结束loading，还做一些初始化，实现函数自执行

mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情

beforeDestory： 你确认删除XX吗？

destoryed ：当前组件已被删除，清空相关内容
```

## 5.Vuex的使用场景

在vue里，组件之间的作用域是独立的，父组件跟子组件之间的通讯可以通过prop属性来传参，但是在兄弟组件之间通讯就比较麻烦了。比如A组件要告诉一件事给B组件，那么A就要先告诉他们的父组件，然后父组件再告诉B。当组件比较多，要互相通讯的事情很多的话，父组件要管他们那么多事，很累的。vuex正是为了解决这个问题，让多个子组件之间可以方便的通讯

## 6.v-show和v-if的区别

条件渲染指令,与v-if不同,无论v-show的值是false还是true，元素都会存在html中;而只有当v-if值为true时，元素才会存在html中;v-show只是设置了元素的display.

# 二、Javascript相关(面向对象，作用域，闭包，设计模式等)

## 1 常用js类定义的方法有哪些？

参考答案：主要有构造函数原型和对象创建两种方法。原型法是通用老方法，对象创建是ES5推荐使用的方法.目前来看，原型法更普遍.

**1.构造函数方法定义类**

```javascript
    function Person(){
        this.name = 'michaelqin';
    }
    Person.prototype.sayName = function(){
        alert(this.name);
    }

    var person = new Person();
    person.sayName();
```

**2.对象创建方法定义类**

```
    var Person = {
        name: 'michaelqin',
        sayName: function(){ alert(this.name); }
    };

    var person = Object.create(Person);
    person.sayName();
```

## 2.js类继承的方法有哪些

参考答案：原型链法，属性复制法和构造器应用法. 另外，由于每个对象可以是一个类，这些方法也可以用于对象类的继承．

**1.原型链法**

```javascript
    function Animal() {
        this.name = 'animal';
    }
    Animal.prototype.sayName = function(){
        alert(this.name);
    };

    function Person() {}
    Person.prototype = Animal.prototype; // 人继承自动物
    Person.prototype.constructor = 'Person'; // 更新构造函数为人
```

**2.属性复制法**

```javascript
    function Animal() {
        this.name = 'animal';
    }
    Animal.prototype.sayName = function() {
        alert(this.name);
    };

    function Person() {}

    for(prop in Animal.prototype) {
        Person.prototype[prop] = Animal.prototype[prop];
    } // 复制动物的所有属性到人量边
    Person.prototype.constructor = 'Person'; // 更新构造函数为人
```

**3.构造器应用法**

```javascript
    function Animal() {
        this.name = 'animal';
    }
    Animal.prototype.sayName = function() {
        alert(this.name);
    };

    function Person() {
        Animal.call(this); // apply, call, bind方法都可以．细微区别，后面会提到．
    }
```

## 3.js类多重继承的实现方法是怎么样的?

参考答案：就是类继承里边的属性复制法来实现．因为当所有父类的prototype属性被复制后，子类自然拥有类似行为和属性．

## 4.js里的作用域是什么样子的？

大多数语言里边都是块作作用域，以{}进行限定，js里边不是．js里边叫函数作用域，就是一个变量在全函数里有效．比如有个变量p1在函数最后一行定义，第一行也有效，但是值是undefined.

```javascript
    var globalVar = 'global var';

    function test() {
        alert(globalVar); // undefined, 因为globalVar在本函数内被重定义了，导致全局失效，这里使用函数内的变量值，可是此时还没定义
        var globalVar = 'overrided var'; //　globalVar在本函数内被重定义
        alert(globalVar);　// overrided var
    }
    alert(globalVar); // global var，使用全局变量
```

## 5.js里边的this指的是什么?

this指的是对象本身，而不是构造函数．

```javascript
    function Person() {
    }
    Person.prototype.sayName() { alert(this.name); }

    var person1 = new Person();
    person1.name = 'michaelqin';
    person1.sayName(); // michaelqin
```

## 6\. apply, call和bind有什么区别?

三者都可以把一个函数应用到其他对象上，注意不是自身对象．apply,call是直接执行函数调用，bind是绑定，执行需要再次调用．apply和call的区别是apply接受数组作为参数，而call是接受逗号分隔的无限多个参数列表，

```javascript
    function Person() {
    }
    Person.prototype.sayName() { alert(this.name); }

    var obj = {name: 'michaelqin'}; // 注意这是一个普通对象，它不是Person的实例
    1) apply
    Person.prototype.sayName.apply(obj, [param1, param2, param3]);

    2) call
    Person.prototype.sayName.call(obj, param1, param2, param3);

    3) bind
    var sn = Person.prototype.sayName.bind(obj);
    sn([param1, param2, param3]); // bind需要先绑定，再执行
    sn(param1, param2, param3); // bind需要先绑定，再执行
```

## 7\. caller, callee和arguments分别是什么?

caller,callee之间的关系就像是employer和employee之间的关系，就是调用与被调用的关系，二者返回的都是函数对象引用．arguments是函数的所有参数列表，它是一个类数组的变量．

代码演示

```javascript
    function parent(param1, param2, param3) {
        child(param1, param2, param3);
    }

    function child() {
        console.log(arguments); // { '0': 'mqin1', '1': 'mqin2', '2': 'mqin3' }
        console.log(arguments.callee); // [Function: child]
        console.log(child.caller); // [Function: parent]
    }

    parent('mqin1', 'mqin2', 'mqin3');
```

## 8\. 什么是闭包，闭包有哪些用处?

闭包这个术语，无论中文翻译还是英文解释都太２Ｂ了，我必须骂人，因为它什么其实都不是．非要讲它是什么的话，两个字函数，更多字嵌套函数的父子自我引用关系．所有函数都是闭包．通俗的说，闭包就是作用域范围，因为js是函数作用域，所以函数就是闭包．全局函数的作用域范围就是全局，所以无须讨论．更多的应用其实是在内嵌函数，这就会涉及到内嵌作用域，或者叫作用域链．说到内嵌，其实就是父子引用关系(父函数包含子函数，子函数因为函数作用域又引用父函数，这它妈不是死结吗？所以叫闭包），这就会带来另外一个问题，什么时候引用结束？如果不结束，就会一直占用内存，引起内存泄漏．好吧，不用的时候就引用设为空，死结就解开了．

## 9\. defineProperty, hasOwnProperty, propertyIsEnumerable都是做什么用的？

Object.defineProperty(obj, prop, descriptor)用来给对象定义属性,有value,writable,configurable,enumerable,set/get等.hasOwnProerty用于检查某一属性是不是存在于对象本身，继承来的父亲的属性不算．propertyIsEnumerable用来检测某一属性是否可遍历，也就是能不能用for..in循环来取到.

## 10\. js常用设计模式的实现思路，单例，工厂，代理，装饰，观察者模式等

```javascript
    单例：　任意对象都是单例，无须特别处理
    var obj = {name: 'michaelqin', age: 30};

    工厂: 就是同样形式参数返回不同的实例
    function Person() { this.name = 'Person1'; }
    function Animal() { this.name = 'Animal1'; }

    function Factory() {}
    Factory.prototype.getInstance = function(className) {
        return eval('new ' + className + '()');
    }

    var factory = new Factory();
    var obj1 = factory.getInstance('Person');
    var obj2 = factory.getInstance('Animal');
    console.log(obj1.name); // Person1
    console.log(obj2.name); // Animal1

    代理: 就是新建个类调用老类的接口,包一下
    function Person() { }
    Person.prototype.sayName = function() { console.log('michaelqin'); }
    Person.prototype.sayAge = function() { console.log(30); }

    function PersonProxy() {
        this.person = new Person();
        var that = this;
        this.callMethod = function(functionName) {
            console.log('before proxy:', functionName);
            that.person[functionName](); // 代理
            console.log('after proxy:', functionName);
        }
    }

    var pp = new PersonProxy();
    pp.callMethod('sayName'); // 代理调用Person的方法sayName()
    pp.callMethod('sayAge'); // 代理调用Person的方法sayAge()

    观察者: 就是事件模式，比如按钮的onclick这样的应用.
    function Publisher() {
        this.listeners = [];
    }
    Publisher.prototype = {
        'addListener': function(listener) {
            this.listeners.push(listener);
        },

        'removeListener': function(listener) {
            delete this.listeners[listener];
        },

        'notify': function(obj) {
            for(var i = 0; i < this.listeners.length; i++) {
                var listener = this.listeners[i];
                if (typeof listener !== 'undefined') {
                    listener.process(obj);
                }
            }
        }
    }; // 发布者

    function Subscriber() {

    }
    Subscriber.prototype = {
        'process': function(obj) {
            console.log(obj);
        }
    };　// 订阅者


    var publisher = new Publisher();
    publisher.addListener(new Subscriber());
    publisher.addListener(new Subscriber());
    publisher.notify({name: 'michaelqin', ageo: 30}); // 发布一个对象到所有订阅者
    publisher.notify('2 subscribers will both perform process'); // 发布一个字符串到所有订阅者
```

## 11\. 列举数组相关的常用方法

push/pop, shift/unshift, split/join, slice/splice/concat, sort/reverse, map/reduce, forEach, filter

## 12\. 列举字符串相关的常用方法

indexOf/lastIndexOf/charAt, split/match/test, slice/substring/substr, toLowerCase/toUpperCase
