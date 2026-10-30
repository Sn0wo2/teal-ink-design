import { spawnSync } from 'node:child_process'
import { readdirSync } from 'node:fs'

function gh(command) {
  const result = spawnSync('gh', command, { encoding: 'utf8' })
  if (result.status !== 0) {
    throw new Error(`\`gh ${command.join(' ')}\` failed: ${result.stderr?.trim() || result.stdout?.trim()}`)
  }
  return result.stdout?.trim()
}

function ghSucceeds(command) {
  return spawnSync('gh', command, { encoding: 'utf8' }).status === 0
}

function main() {
  for (const name of ['VERSION', 'GH_TOKEN', 'GITHUB_REPOSITORY']) {
    if (!process.env[name]) throw new Error(`${name} is not set`)
  }

  const version = process.env.VERSION
  const tag = `v${version}`
  const prerelease = version.split('+')[0].includes('-')
  const notes = `Teal Ink Vue library and showcase assets for ${tag}.`
  const assets = readdirSync('dist').filter(
    (name) => name.endsWith('.tgz') || name === 'teal-ink-showcase.tar.gz' || name === 'SHA256SUMS',
  )
  if (!assets.length) throw new Error('No release assets found in dist')

  if (ghSucceeds(['release', 'view', tag])) {
    gh(['release', 'edit', tag, '--title', tag, '--notes', notes])
  } else {
    gh(['release', 'create', tag, '--verify-tag', '--draft', '--title', tag, '--notes', notes])
  }

  gh(['release', 'upload', tag, ...assets.map((asset) => `dist/${asset}`), '--clobber'])
  const releaseId = gh(['api', `repos/${process.env.GITHUB_REPOSITORY}/releases/tags/${tag}`, '--jq', '.id'])
  gh([
    'api',
    '--method',
    'PATCH',
    `repos/${process.env.GITHUB_REPOSITORY}/releases/${releaseId}`,
    '-F',
    'draft=false',
    '-F',
    `prerelease=${prerelease}`,
  ])
  console.log(`Published GitHub release ${tag} with ${assets.length} asset(s).`)
}

try {
  main()
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
