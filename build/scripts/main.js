(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var DummyImportClass = function DummyImportClass() {
    classCallCheck(this, DummyImportClass);

    console.log('DummyImportClass!');
};

new DummyImportClass();

})));
