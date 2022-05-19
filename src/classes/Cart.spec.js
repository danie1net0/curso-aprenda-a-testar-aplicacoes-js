import Cart from './Cart'

describe('Cart', () => {
  let cart

  let productA = {
    title: 'Headset',
    price: 35388,
  }

  let productB = {
    title: 'Laptop',
    price: 125000,
  }

  beforeEach(() => {
    cart = new Cart()
  })

  describe('getTotal()', () => {
    it('should return 0 when getTotal() is executed in a newly created instance', () => {
      expect(cart.getTotal().getAmount()).toEqual(0)
    })

    it('should multiply quantity and price and receive the total amount', () => {
      const item = {
        product: productA,
        quantity: 2,
      }

      cart.add(item)

      expect(cart.getTotal().getAmount()).toEqual(70776)
    })

    it('should ensure no more than on product exists at a time', () => {
      cart.add({
        product: productA,
        quantity: 2,
      })

      cart.add({
        product: productA,
        quantity: 1,
      })

      expect(cart.getTotal().getAmount()).toEqual(35388)
    })

    it('should update total when a product gets included and then removed', () => {
      cart.add({
        product: productA,
        quantity: 2,
      })

      cart.add({
        product: productB,
        quantity: 1,
      })

      cart.remove(productA)

      expect(cart.getTotal().getAmount()).toEqual(125000)
    })
  })

  describe('checkout', () => {
    it('should return an object with the total and the list of items when summary() is called', () => {
      cart.add({
        product: productA,
        quantity: 2,
      })

      cart.add({
        product: productB,
        quantity: 3,
      })

      expect(cart.summary()).toMatchSnapshot()
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0)
    })

    it('should return an object with the total and the list of items', () => {
      cart.add({
        product: productA,
        quantity: 2,
      })

      cart.add({
        product: productB,
        quantity: 3,
      })

      expect(cart.checkout()).toMatchSnapshot()
    })

    it('should include formatted amount in the summary', () => {
      cart.add({
        product: productA,
        quantity: 2,
      })

      cart.add({
        product: productB,
        quantity: 3,
      })

      expect(cart.summary().formatted).toEqual('R$4,457.76')
    })

    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product: productA,
        quantity: 2,
      })

      cart.checkout()

      expect(cart.getTotal().getAmount()).toEqual(0)
    })
  })

  describe('special conditions', () => {
    it('should apply percentage discount quantity above minimum is passed', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      }

      cart.add({
        product: productA,
        quantity: 3,
        condition,
      })

      expect(cart.getTotal().getAmount()).toEqual(74315)
    })

    it('should NOT apply percentage discount quantity is below or equals minimum', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      }

      cart.add({
        product: productA,
        quantity: 2,
        condition,
      })

      expect(cart.getTotal().getAmount()).toEqual(70776)
    })

    it('should apply quantity discount for even quantities', () => {
      const condition = {
        quantity: 2,
      }

      cart.add({
        product: productA,
        quantity: 4,
        condition,
      })

      expect(cart.getTotal().getAmount()).toEqual(70776)
    })

    it('should NOT apply quantity discount for even quantities when condition is not met', () => {
      const condition = {
        quantity: 2,
      }

      cart.add({
        product: productA,
        quantity: 1,
        condition,
      })

      expect(cart.getTotal().getAmount()).toEqual(35388)
    })

    it('should apply quantity discount for odd quantities', () => {
      const condition = {
        quantity: 2,
      }

      cart.add({
        product: productA,
        quantity: 5,
        condition,
      })

      expect(cart.getTotal().getAmount()).toEqual(106164)
    })

    it('should receive two or more conditions and apply/determine the best discount. First case.', () => {
      const conditionA = {
        percentage: 30,
        minimum: 2,
      }

      const conditionB = {
        quantity: 2,
      }

      cart.add({
        product: productA,
        quantity: 5,
        condition: [conditionA, conditionB],
      })

      expect(cart.getTotal().getAmount()).toEqual(106164)
    })

    it('should receive two or more conditions and apply/determine the best discount. Second case.', () => {
      const conditionA = {
        percentage: 80,
        minimum: 2,
      }

      const conditionB = {
        quantity: 2,
      }

      cart.add({
        product: productA,
        condition: [conditionA, conditionB],
        quantity: 5,
      })

      expect(cart.getTotal().getAmount()).toEqual(35388)
    })
  })
})
