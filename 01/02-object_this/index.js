const arto = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
    greet: function() {
      console.log('hello, my name is ' + this.name)
    },
    doAdittion: function(a, b) {
      console.log(a + b)
    }
}

// arto.doAdittion(1, 5)

// const referenceToAddition = arto.doAdittion
// referenceToAddition(10, 15)

// arto.greet()
// const referenceToGreet = arto.greet
// referenceToGreet()

setTimeout(arto.greet.bind(arto), 1000)

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log('hello, my name is ' + this.name)
  }
}

const adam = new Person('Adam Ondra', 29)
adam.greet()
console.log(adam)

const janja = new Person('Janja Garnbret', 23)
janja.greet()