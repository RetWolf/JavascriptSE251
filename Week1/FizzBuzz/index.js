let a = "a string";
let b = 12;
let c = false;

console.log(typeof(a));
console.log(typeof(b));
console.log(typeof(c));

function addNums(a, b) {
  if (typeof(a) === "number" && typeof(b) === "number") {
    return a + b;
  } else {
    return "Invalid Input";
  }
}

console.log("5 + 2 = " + addNums(5,2));

function fillArray() {
  let arr = [];
  for (let i = 0; i < 100; i++) {
    arr[i] = i+1;
  }
  return arr;
}

console.log(fillArray());

function fizzBuzz() {
  let arr = [];
  for (let i = 0; i < 100; i++) {
    if((i+1) % 2 === 0 && (i+1) % 3 === 0) {
      arr[i] = "fizz buzz";
    } else if ((i+1) % 2 === 0) {
      arr[i] = "fizz";
    } else if ((i+1) % 3 === 0) {
      arr[i] = "buzz";
    } else {
      arr[i] = i+1;
    }
  }
  return arr;
}

console.log(fizzBuzz());