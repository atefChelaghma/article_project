export const RoutesUrls = {
  // Optional table number path param so QR can be /12 or just /
  BASE_URL: '/',
} as const

export type RouteUrl = (typeof RoutesUrls)[keyof typeof RoutesUrls]
