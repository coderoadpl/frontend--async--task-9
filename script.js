const Beer = class {
    constructor(type) {
        this.type = type
        this.fill = 100
    }

    drink(volume = 10) {
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    if (this.fill === 0) {
                        console.warn('Try to drink from empty glass!')
                        reject('Try to drink from empty glass!')
                    }
                    const fillBeforeDrink = this.fill
                    const newFill = this.fill - volume
                    this.fill = newFill <= 0 ? 0 : newFill
                    console.log(`You drank ${fillBeforeDrink - this.fill} %`)
                    resolve(this)
                },
                1000
            )
        })
    }

    drinkWhole() {
        return this.drink(100)
    }
}

const beerOrder = new Promise((resolve, reject) => {
    setTimeout(
        () => {
            if (Math.random() < 0.5) {
                console.log('Ordered beer came!')
                resolve(new Beer('Perła'))
            } else {
                console.log('Ordered beer did not come!')
                reject()
            }
        },
        1000
    )
})

beerOrder
    .then((beer) => beer.drink())
    .then((beer) => beer.drink())
    .then((beer) => beer.drinkWhole())
    .then(() => console.log('Hurrra!'))
    .catch(() => console.log('Cry!'))
    .then(() => console.log('Going out!'))