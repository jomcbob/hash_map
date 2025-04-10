class HashMap {
    constructor(size = 16) {
      this.table = new Array(size).fill(null)
      this.count = 0
      this.loadFactorThreshold = 0.75
      this.size = size
    }
  
    hash(key) {
      let hash = 0
      const prime = 17
      for (let i = 0; i < key.length; i++) {
        hash = (hash * prime + key.charCodeAt(i)) % this.size
      }
      return hash
    }
  
    _probe(index, key) {
      let start = index
      while (this.table[index] !== null && this.table[index][0] !== key) {
        index = (index + 1) % this.size
        if (index === start) throw new Error("HashMap is full")
      }
      return index
    }
  
    set(key, value) {
      let index = this.hash(key)
      index = this._probe(index, key)
  
      if (this.table[index] === null) this.count++
      this.table[index] = [key, value]
  
      if (this.count / this.size >= this.loadFactorThreshold) {
        this._resize()
      }
    }
  
    get(key) {
      let index = this.hash(key)
      let start = index
      while (this.table[index] !== null) {
        if (this.table[index][0] === key) return this.table[index][1]
        index = (index + 1) % this.size
        if (index === start) break
      }
      return null
    }
  
    has(key) {
      return this.get(key) !== null
    }
  
    remove(key) {
      let index = this.hash(key)
      let start = index
      while (this.table[index] !== null) {
        if (this.table[index][0] === key) {
          this.table[index] = null
          this.count--
          return
        }
        index = (index + 1) % this.size
        if (index === start) break
      }
    }
  
    length() {
      console.log(this.count)
    }
  
    clear() {
      this.table = new Array(16).fill(null)
      this.count = 0
      this.size = 16
    }
  
    keys() {
      const arr = []
      for (let entry of this.table) {
        if (entry !== null) arr.push(entry[0])
      }
      console.log(arr)
    }
  
    values() {
      const arr = []
      for (let entry of this.table) {
        if (entry !== null) arr.push(entry[1])
      }
      console.log(arr)
    }
  
    entries() {
      const arr = []
      for (let entry of this.table) {
        if (entry !== null) arr.push([entry[0], entry[1]])
      }
      console.log(arr)
    }
  
    _resize() {
      const oldTable = this.table
      this.size *= 2
      this.table = new Array(this.size).fill(null)
      this.count = 0
  
      for (const entry of oldTable) {
        if (entry !== null) {
          this.set(entry[0], entry[1])
        }
      }
      console.log("HashMap resized. New size:", this.size)
    }
  }
  

let test = new HashMap()

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.table(test.table)