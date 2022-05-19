import { queryString, parse } from './query-string'

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Daniel',
      profession: 'Developer',
    }

    expect(queryString(obj)).toEqual('name=Daniel&profession=Developer')
  })

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Daniel',
      profession: 'Developer',
      abilities: ['JS', 'TDD'],
    }

    expect(queryString(obj)).toEqual(
      'name=Daniel&profession=Developer&abilities=JS,TDD',
    )
  })

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Daniel',
      profession: 'Developer',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    }

    expect(() => queryString(obj)).toThrowError()
  })
})

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const queryString = 'name=Daniel&profession=Developer'

    expect(parse(queryString)).toEqual({
      name: 'Daniel',
      profession: 'Developer',
    })
  })

  it('should convert a query string of a single key-value', () => {
    const queryString = 'name=Daniel'

    expect(parse(queryString)).toEqual({
      name: 'Daniel',
    })
  })

  it('should convert a query string to an object taking care of comma separated values', () => {
    const queryString = 'name=Daniel&profession=Developer&abilities=JS,TDD'

    expect(parse(queryString)).toEqual({
      name: 'Daniel',
      profession: 'Developer',
      abilities: ['JS', 'TDD'],
    })
  })
})
