import { RoutesUrls, type RouteUrl } from '../../src/utils/enums/routes-url'

describe('RoutesUrls enum', () => {
  test('contains BASE_URL mapping to /', () => {
    expect(RoutesUrls.BASE_URL).toBe('/')
  })

  test('RouteUrl type accepts BASE_URL value', () => {
    const value: RouteUrl = RoutesUrls.BASE_URL
    expect(value).toBe('/')
  })

  test('RouteUrl union only includes provided keys', () => {
    // Intentional compile-time check: uncommenting next line should fail type checking
    // const invalid: RouteUrl = '/other' // should be a TS error
    expect(Object.keys(RoutesUrls)).toEqual(['BASE_URL'])
  })
})
