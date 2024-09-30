export type { KyInstance } from 'ky'

export type AnyFunction = (...arguments_: readonly any[]) => unknown

export type ThrottledFunction<F extends AnyFunction> = F
