import { build, emptyDir } from 'https://deno.land/x/dnt@0.34.0/mod.ts'
import * as esbuild from 'https://deno.land/x/esbuild@v0.17.16/mod.js'

await emptyDir('./npm')

await build({
  entryPoints: ['./mod.ts'],
  outDir: './npm',
  shims: {
    deno: true,
    crypto: true,
    weakRef: true
  },
  compilerOptions: {
    target: 'ES2021',
    lib: [
      'dom',
      'dom.iterable',
      'es2022'
    ]
  },
  test: false,
  skipSourceOutput: true,
  package: {
    name: 'bunny.net',
    version: Deno.args[0],
    author: 'Samuel Kopp (https://samuelkopp.de)',
    description: '🐇 A JavaScript SDK for bunny.net',
    license: 'Apache-2.0',
    repository: 'azurystudio/bunny',
    bugs: 'https://github.com/azurystudio/bunny/issues',
    module: './index.js',
    main: './index.cjs',
    types: './types/mod.d.ts',
    exports: {
      '.': {
        import: {
          types: './types/mod.d.ts',
          default: './index.js'
        },
        require: {
          types: './types/mod.d.ts',
          default: './index.cjs'
        }
      }
    }
  }
})

await esbuild.build({
  entryPoints: ['./npm/esm/mod.js'],
  bundle: true,
  minify: true,
  legalComments: 'none',
  format: 'esm',
  outfile: 'npm/index.js'
})

await esbuild.build({
  entryPoints: ['./npm/script/mod.js'],
  bundle: true,
  minify: true,
  legalComments: 'none',
  format: 'cjs',
  outfile: 'npm/index.cjs'
})

esbuild.stop()

await Deno.remove('npm/esm', { recursive: true })
await Deno.remove('npm/script', { recursive: true })

await Deno.copyFile('license', 'npm/license')
await  Deno.copyFile('readme.md', 'npm/readme.md')

await Deno.readTextFile('npm/package.json')
