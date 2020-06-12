
const { square, MyClass } = require('./module');

console.log(square(5));
var cred = {
  name: 'Юрий Кучма',
  enrollmentNo: 11115078
};
var x = new MyClass(cred);
console.log(x.getName());
