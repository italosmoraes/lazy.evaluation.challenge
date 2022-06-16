import { Lazy } from '../Lazy'

describe('Lazy', () => {
  it('executes one arg function, with one arg evaluation', () => {
    const computation = new Lazy()

    expect(
      computation
        .add(function timesTwo(a) {
          return a * 2
        })
        .evaluate([1])
    ).toEqual([2])
  })
  it('executes two args function, with one arg evaluation', () => {
    const computation = new Lazy()

    expect(
      computation
        .add(function sum(a, b) {
          return a + b
        }, 2)
        .evaluate([1])
    ).toEqual([3])
  })
  it('executes two arg function, with three args evaluation', () => {
    const computation = new Lazy()

    const result = computation
      .add(function sum(a, b) {
        return a + b
      }, 1)
      .evaluate([1, 2, 3])

    expect(result).toEqual([2, 3, 4])
  })
  it('executes two piped functions, with three args evaluation', () => {
    const computation = new Lazy()

    const result = computation
      .add(function timesTwo(a) {
        return a * 2
      })
      .add(function sum(a, b) {
        return a + b
      }, 1)
      .evaluate([1, 2, 3])

    expect(result).toEqual([3, 5, 7])
  })
  it('executes three piped functions', () => {
    const computation = new Lazy()

    const result = computation
      .add(function timesTwo(a) {
        return a * 2
      })
      .add(function sum(a, b) {
        return a + b
      }, 1)
      .add(function sub(a, b) {
        return a - b < 0 ? (a - b) * -1 : a - b
      }, 1)
      .evaluate([1, 5])

    expect(result).toEqual([2, 10])
  })
  it('executes three piped functions on text', () => {
    const computation = new Lazy()

    const result = computation
      .add(function greet(a, b) {
        return a + ' ' + b
      }, 'Hello')
      .evaluate(['there', 'Alice'])

    expect(result).toEqual(['Hello there', 'Hello Alice'])
  })

  it('can not perform operation', () => {
    const computation = new Lazy()

    const result = computation
      .add(function timesTwo(a) {
        return a * 2
      })
      .evaluate(['text'])

    expect(result).toEqual([NaN])
  })
})
