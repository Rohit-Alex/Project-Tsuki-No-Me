// closure

for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i) // 0 1 2
    }, i * 1000)
}

for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i) // 3 3 3
    }, i * 1000)
}


for (var i = 0; i < 3; i++) {
    const print = (x) => {
        setTimeout(() => {
            console.log(x) // 0 1 2
        }, x * 1000)
    }
    print(i)
}



// PROTOTYPE 

const arr1 = ['one', 'two', 'three', 'four']
//adding prototype to the Array prototype
Array.prototype.myFun = function () {
    const ar = this.map(e => e.toUpperCase())
    return ar
}
console.log(arr1.myFun())

// adding prototype to the arr1 array only
arr1.__proto__.myFun = function () {
    return this.includes(3)
}
console.log(arr1.myFun())

// currying

const add = a => b => c => a + b + c

console.log(add(5)(6)(8))

// sum(1)(2)(3)(4)...()

// function sum(a) {
//     return function (b) {
//         if (b) return sum(a+b)
//         return a
//     }
// }


// or using ES6 Arrow functions.

const sum = a => b => b ? sum(a+b) : a
sum(1)(2)(3)(4)()


// data hiding and encapsulation 

function Counter() {
    let count = 0
    this.increment = function () {
        count++
    }
    this.decrement = function () {
        count--
    }
    this.print = function () {
        return count
    }
}

const counter1 = new Counter()
console.log(counter1.increment())
console.log(counter1.increment())
console.log(counter1.increment())
console.log(counter1.print())
console.log(counter1.decrement())
console.log(counter1.decrement())
console.log(counter1.print())

const counter2 = new Counter()
console.log(counter2.increment())
console.log(counter2.increment())
console.log(counter2.print())
console.log(counter2.decrement())
console.log(counter2.decrement())
console.log(counter2.print())