import '@testing-library/jest-dom'

// Polyfill for fetch if needed in tests
import 'whatwg-fetch'

// Polyfill TextEncoder/Decoder for libraries (react-router) expecting them in JSDOM env
import { TextEncoder, TextDecoder } from 'util'
// Polyfill only if missing; cast to globalThis with proper types
declare global {
  interface Global {
    TextEncoder?: typeof TextEncoder
    TextDecoder?: typeof TextDecoder
  }
}
if (!global.TextEncoder) {
  // @ts-expect-error assigning runtime polyfill
  global.TextEncoder = TextEncoder
}
if (!global.TextDecoder) {
  // @ts-expect-error assigning runtime polyfill
  global.TextDecoder = TextDecoder as typeof TextDecoder
}
