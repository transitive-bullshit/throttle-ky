import type { KyInstance, ThrottledFunction } from './types'

/**
 * Function that does nothing.
 */
const noop = () => undefined

/**
 * Throttles HTTP requests made by a ky instance.
 *
 * Very useful for enforcing rate limits.
 */
export function throttleKy(
  ky: KyInstance,
  throttleFn: <Arguments extends readonly unknown[], ReturnValue>(
    function_: (...args_: Arguments) => ReturnValue
  ) => ThrottledFunction<(...args_: Arguments) => ReturnValue>
) {
  return ky.extend({
    hooks: {
      beforeRequest: [throttleFn(noop)]
    }
  })
}
