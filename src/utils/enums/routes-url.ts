export const RoutesUrls = {
  // Optional table number path param so QR can be /12 or just /
  BASE_URL: '/',
  PAYMENT: '/payment',
  CHECKOUT: '/checkout/:tableNumber',
  ADMIN: '/admin',
  ADMINDEMO: '/client-orders',
} as const

export type RouteUrl = (typeof RoutesUrls)[keyof typeof RoutesUrls]
