import { globSync } from 'node:fs'
import { basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as library from '@teal-ink/vue'

const componentName = /^(N[A-Z]|NxButton|Ti[A-Z])/
const names = globSync('*/*.example.vue', {
  cwd: fileURLToPath(new URL('../src/examples/', import.meta.url)),
}).map((path) => basename(path, '.example.vue'))
const components = Object.entries(library)
  .filter(
    ([name, value]) =>
      componentName.test(name) &&
      value &&
      (typeof value === 'function' || (typeof value === 'object' && ('setup' in value || 'render' in value))),
  )
  .map(([name]) => name)
const missing = components.filter((name) => !names.includes(name))
if (missing.length) throw new Error(`Missing live examples for exported components: ${missing.join(', ')}`)
const unknown = names.filter((name) => !components.includes(name))
if (unknown.length) throw new Error(`Examples without a public component export: ${unknown.join(', ')}`)
if (new Set(names).size !== names.length) throw new Error('Duplicate component example filenames')
console.log(`Verified ${components.length} Vue component examples`)
