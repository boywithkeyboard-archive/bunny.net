import Client, { EdgeStorage } from '../mod.ts'
import { assertEquals } from 'https://deno.land/std@0.188.0/testing/asserts.ts'

const bunny = new Client({ token: Deno.env.get('token') as string })
  .use(EdgeStorage)

Deno.test('edge storage', async t => {
  await t.step('upload file', async () => {
    const file = await Deno.open('./test/doge.svg', { read: true })

    assertEquals(
      await bunny.storage.upload({
        zone: 'bunny-sdk',
        key: 'doge.svg',
        content: file.readable
      }),
      true
    )
  })

  await t.step('download file', async () => {
    const file = await Deno.open('./test/doge1.svg', { create: true, write: true })

    const stream = await bunny.storage.download({
      zone: 'bunny-sdk',
      key: 'doge.svg'
    })

    if (stream)
      await stream.pipeTo(file.writable)
    else
      file.close()
  })

  await t.step('list files', async () => {
    assertEquals(
      await bunny.storage.list({
        zone: 'bunny-sdk',
        directory: '/'
      }) instanceof Array,
      true
    )
  })

  await t.step('delete file', async () => {
    assertEquals(
      await bunny.storage.delete({
        zone: 'bunny-sdk',
        key: 'doge.svg'
      }),
      true
    )
  })

  await Deno.remove('./test/doge1.svg')
})
