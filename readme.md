# throttle-ky <!-- omit from toc -->

> Throttles HTTP requests made by a ky instance.

<p>
  <a href="https://github.com/transitive-bullshit/throttle-ky/actions/workflows/main.yml"><img alt="Build Status" src="https://github.com/transitive-bullshit/throttle-ky/actions/workflows/main.yml/badge.svg" /></a>
  <a href="https://www.npmjs.com/package/throttle-ky"><img alt="NPM" src="https://img.shields.io/npm/v/throttle-ky.svg" /></a>
  <a href="https://github.com/transitive-bullshit/throttle-ky/blob/main/license"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-blue" /></a>
  <a href="https://prettier.io"><img alt="Prettier Code Formatting" src="https://img.shields.io/badge/code_style-prettier-brightgreen.svg" /></a>
</p>

- [Intro](#intro)
- [Install](#install)
- [Usage](#usage)
- [License](#license)

## Intro

Very useful for enforcing rate-limits. Intended to be used with [ky](https://github.com/sindresorhus/ky) (an excellent [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) wrapper) and [p-throttle](https://github.com/sindresorhus/p-throttle), though `p-throttle` can be swapped for any rate-limiting implementation.

This package is very simple, but I find myself using it all the time for making more robust HTTP requests, especially when used alongside other [async primitives](https://github.com/sindresorhus/promise-fun) like [p-map](https://github.com/sindresorhus/p-map) or when creating HTTP API clients which are configurable via `ky.extend` and also respect server-side rate limits.

## Install

```bash
npm install throttle-ky ky
```

## Usage

```ts
import throttleKy from 'throttle-ky'
import pThrottle from 'p-throttle'
import ky from 'ky'

// Allow up to 600 requests per minute.
export const throttle = pThrottle({
  limit: 600,
  interval: 60 * 1000
})

const rateLimitedKy = throttleKy(ky, throttle)

// `rateLimitedKy` is just a normal `ky` instance that is guaranteed to respect
// the given throttle before making new HTTP requests.
const result = await rateLimitedKy.get('https://example.com').text()
```

## License

MIT © [Travis Fischer](https://x.com/transitive_bs)
