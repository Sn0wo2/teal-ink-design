import { appendFileSync } from "node:fs"
import { join } from "node:path"
import { $ } from "bun"

try {
  for (const name of ["GITHUB_OUTPUT", "VERSION", "GH_TOKEN", "DEFAULT_BRANCH"]) {
    if (!process.env[name]) throw new Error(`${name} is not set`)
  }

  const manifests = [process.env.PACKAGE_DIR ?? ".", process.env.ELEMENTS_PACKAGE_DIR]
    .filter(Boolean)
    .map((packageDir) => join(packageDir, "package.json"))
  await $`git config user.name 'github-actions[bot]'`.quiet()
  await $`git config user.email 'github-actions[bot]@users.noreply.github.com'`.quiet()
  await $`git add -u -- ${manifests} bun.lock`.quiet()

  const tagExists =
    (await $`git show-ref --verify --quiet ${`refs/tags/v${process.env.VERSION}`}`.quiet().nothrow()).exitCode === 0
  const staged = (await $`git diff --cached --quiet`.quiet().nothrow()).exitCode !== 0
  if (!staged && tagExists) {
    const releaseSha = (await $`git rev-parse HEAD`.text()).trim()
    if ((await $`git rev-parse ${`refs/tags/v${process.env.VERSION}^{commit}`}`.text()).trim() !== releaseSha) {
      throw new Error(`Tag v${process.env.VERSION} does not point to HEAD`)
    }
    const remoteTag = (
      await $`git -c 'credential.helper=!gh auth git-credential' ls-remote --refs origin ${`refs/tags/v${process.env.VERSION}`}`.text()
    ).trim()
    if (
      remoteTag &&
      remoteTag.split("\t")[0] !== (await $`git rev-parse ${`refs/tags/v${process.env.VERSION}`}`.text()).trim()
    ) {
      throw new Error(`Remote tag v${process.env.VERSION} differs from the local tag`)
    }
    await $`git -c 'credential.helper=!gh auth git-credential' fetch --no-tags origin ${process.env.DEFAULT_BRANCH}`.quiet()
    const ancestry = await $`git merge-base --is-ancestor ${releaseSha} FETCH_HEAD`.quiet().nothrow()
    if (ancestry.exitCode !== 0 && ancestry.exitCode !== 1) throw new Error("Could not check remote branch ancestry")
    if (ancestry.exitCode === 1 || !remoteTag) {
      await $`git -c 'credential.helper=!gh auth git-credential' push --atomic origin ${
        ancestry.exitCode === 1 ? [`HEAD:refs/heads/${process.env.DEFAULT_BRANCH}`] : []
      } ${!remoteTag ? [`refs/tags/v${process.env.VERSION}`] : []}`.quiet()
    }
    appendFileSync(process.env.GITHUB_OUTPUT, `sha=${releaseSha}\n`)
    console.log(`Tag v${process.env.VERSION} already points at the checked version; nothing to commit.`)
  } else {
    if (staged) await $`git commit -m ${`chore(release): bump version to ${process.env.VERSION}`}`.quiet()
    let releaseSha = (await $`git rev-parse HEAD`.text()).trim()

    if (tagExists) {
      await $`git fetch origin ${process.env.DEFAULT_BRANCH}`.quiet()
      await $`git checkout --detach FETCH_HEAD`.quiet()
      const picked = await $`git cherry-pick ${releaseSha}`.quiet().nothrow()
      if (picked.exitCode !== 0) {
        if ((await $`git diff --cached --quiet`.quiet().nothrow()).exitCode !== 0) {
          throw new Error(
            `\`git cherry-pick ${releaseSha}\` failed: ${picked.stderr.toString().trim() || picked.stdout.toString().trim()}`,
          )
        }
        await $`git cherry-pick --skip`.quiet()
        console.log(
          `Version bump for v${process.env.VERSION} is already on ${process.env.DEFAULT_BRANCH}; nothing to cherry-pick.`,
        )
      } else {
        await $`git -c 'credential.helper=!gh auth git-credential' push origin ${`HEAD:refs/heads/${process.env.DEFAULT_BRANCH}`}`.quiet()
        console.log(`Cherry-picked the version bump for v${process.env.VERSION} onto ${process.env.DEFAULT_BRANCH}.`)
      }
      releaseSha = (await $`git rev-parse HEAD`.text()).trim()
    } else {
      await $`git tag ${`v${process.env.VERSION}`}`.quiet()
      await $`git -c 'credential.helper=!gh auth git-credential' push --atomic origin ${`HEAD:refs/heads/${process.env.DEFAULT_BRANCH}`} ${`refs/tags/v${process.env.VERSION}`}`.quiet()
      console.log(`Tagged v${process.env.VERSION} and pushed it with ${process.env.DEFAULT_BRANCH}.`)
    }

    appendFileSync(process.env.GITHUB_OUTPUT, `sha=${releaseSha}\n`)
  }
} catch (error) {
  console.error(error.stderr?.toString().trim() || error.message)
  process.exitCode = 1
}
