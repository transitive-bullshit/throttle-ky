import ky from 'ky'
import pThrottle from 'p-throttle'
import { expect, test } from 'vitest'

import { mockKyInstance } from './_utils'
import { throttleKy } from './throttle-ky'

test(
  'throttleKy should rate-limit HTTP requests to ky properly using p-throttle',
  async () => {
    const interval = 1000
    const throttle = pThrottle({
      limit: 1,
      interval,
      strict: true
    })

    const ky2 = mockKyInstance(throttleKy(ky, throttle))

    const url = 'https://httpbin.org/get'

    for (let i = 0; i < 10; i++) {
      const before = Date.now()
      const res = await ky2.get(url)
      const after = Date.now()

      const duration = after - before
      // console.log(duration, res.status)
      expect(res.status).toBe(200)

      // leave a bit of wiggle room for the interval
      if (i > 0) {
        expect(duration >= interval - interval / 5).toBeTruthy()
      }
    }
  },
  {
    timeout: 60_000
  }
)
