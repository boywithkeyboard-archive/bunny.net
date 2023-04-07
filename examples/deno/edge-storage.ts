import Client, { EdgeStorage } from 'https://deno.land/x/bunny@v0.1.0/mod.ts' // < please use the latest version

const bunny = new Client({ token: Deno.env.get('token') as string })
  .use(EdgeStorage)

// upload file
const file = await Deno.open('./test/image.png', { read: true })

await bunny.storage.upload({
  zone: 'example',
  key: 'custom.png',
  content: file.readable
})

// download file
const newFile = await Deno.open('./test/new.png', { create: true, write: true })

const stream = await bunny.storage.download({
  zone: 'example',
  key: 'custom.png'
})

if (stream)
  await stream.pipeTo(newFile.writable)
else
  newFile.close()

// list files
await bunny.storage.list({
  zone: 'example',
  directory: '/'
})

// delete file
await bunny.storage.delete({
  zone: 'example',
  key: 'custom.png'
})
