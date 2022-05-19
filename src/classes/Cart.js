import find from 'lodash/find'
import remove from 'lodash/remove'
import Dinero from 'dinero.js'
import { calculateDiscount } from '../lib/discount.utils'

const Money = Dinero

Money.defaultCurrency = 'BRL'
Money.defaultPrecision = 2

export default class Cart {
  items = []

  add(item) {
    const itemToFind = { product: item.product }

    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind)
    }

    this.items.push(item)
  }

  remove(product) {
    remove(this.items, { product })
  }

  getTotal() {
    return this.items.reduce((acc, { quantity, product, condition }) => {
      const amount = Money({ amount: quantity * product.price })
      let discount = Money({ amount: 0 })

      if (condition) {
        discount = calculateDiscount(amount, quantity, condition)
      }

      return acc.add(amount).subtract(discount)
    }, Money({ amount: 0 }))
  }

  summary() {
    return {
      total: this.getTotal(),
      formatted: this.getTotal().toFormat('$0,0.00'),
      items: this.items,
    }
  }

  checkout() {
    const summary = this.summary()

    this.items = []

    return summary
  }
}
