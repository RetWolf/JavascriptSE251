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