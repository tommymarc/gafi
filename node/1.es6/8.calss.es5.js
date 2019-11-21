"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

//类的调用检查  1 类的实例  2 构造函数
function _classCallCheck(instance, Constructor) {
    //如果这个实例不是这个构造函数的实例的话，就报错
    //can't call a class as a function
    //不能把一个类当成普通函数来调用
    if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


    //target目标  props是属性对象数组
function _defineProperties(target, props) {
    //循环每个元素
    for (var i = 0; i < props.length; i++) {
        //取出每个属性描述器
        var descriptor = props[i];
        //可枚举  for in 能循环出来
        descriptor.enumerable = descriptor.enumerable || false;
        //可配置 可以通过delete 删除此属性
        descriptor.configurable = true;
        //可修改值
        if ("value" in descriptor) descriptor.writable = true;
        //真正的向Parent类的原型对象上增加属性
        Object.defineProperty(target, descriptor.key, descriptor); } }

// 1 构造函数 2 原型上的属性 3 静态属性(类上的属性)
function _createClass(Constructor, protoProps, staticProps) {
    //如果有原型属性的话，
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    //如果有静态属性的话
    if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Parent =
    /*#__PURE__*/
    function () {
        function Parent() {
            //为了保证这个类只能用来new对象
            _classCallCheck(this, Parent);

            this.name = name; //实例的私有属性
        }

        //属于实例的共有属性，相当于原型上的属性
        _createClass(Parent, [{
            key: "getName",
            value: function getName() {
                console.log(this.name);
            }
        }]);

        return Parent;
    }();