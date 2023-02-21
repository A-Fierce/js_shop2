class Good {
    constructor (id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable(available) {
        this.available = available
    }
}

class GoodsList {
    #goods
    constructor (filter, sortPrice, sortDir) {
        this.#goods = [];
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {
        const filtered = this.#goods.filter(good => this.filter.test(good.name) && good.available)

        if(!this.sortPrice) {
            return filtered;
        }

        if(this.sortDir) {
            return filtered.sort((el_1, el_2) => el_1.price - el_2.price);
        }
        return filtered.sort((el_1, el_2) => el_2.price - el_1.price);
    }  

    add(good) {
        this.#goods.push(good)
    }
    
    remove(id) {
        let delInd = this.#goods.findIndex(good => good.id == id)
        this.#goods.splice(delInd, 1)
    }

}

class BasketGood extends Good {
    constructor(id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available);
        this.amount = amount;
    }
}

class Basket {
    constructor () {
        this.goods = []
    }

    add(good, amount) {
        var index = this.goods.findIndex(value => value.id === good.id);
        if (index >= 0) {
            this.goods[index].amount += amount;
        } else {
            var addGood = new BasketGood(good.id, good.name, good.description, good.sizes, good.price, good.available, amount);
            this.goods.push(addGood);
        }
    }

    get totalAmount() {
        return this.goods.map(item => item.amount).reduce((a, b) => a + b, 0)
    }

    get totalSum() {
        return this.goods.reduce((a, b) => a + b.amount * b.price, 0);
    }

    remove(good, amount) {
        let index = this.goods.findIndex(value => value.id === good.id);
        if (index >= 0) {
            if (this.goods[index].amount - amount <= 0 || amount === 0) {
                this.goods.splice(index, 1);
            } else {
                this.goods[index].amount -= amount;
            }
        } 
    }

    clear() {
        this.goods.length = 0;
    }

    removeUnavailable() {
        this.goods.filter(item => item.available === false).forEach(value => this.remove(value));
    }
    
}

const good1 = new Good (1, 'Рубашка', 'Рубашка в клетку', [42, 44], 100, true)    
const good2 = new Good (2, 'Ботинки', 'Ботинки черные', [37, 38], 200, true)
const good3 = new Good (3, 'Свитшот', 'Свитшот синий', [42, 44, 46], 500, true)
const good4 = new Good (4, 'Футболка', 'Футболка с принтом', [42, 44, 46, 48], 400, true)
const good5 = new Good (5, 'Кроссовки', 'Кроссовки Nike', [38, 39], 800, true)

good1.setAvailable(false)

gl1 = new GoodsList(/Рубашка/iu, true, false)
gl1.add(good1)
gl1.add(good2)
// gl1.remove(1)

bs = new Basket
bs.add(good1, 10)
bs.add(good1, 10)
bs.remove(good1, 8)
// bs.removeUnavailable()
// bs.clear()

console.log(bs)