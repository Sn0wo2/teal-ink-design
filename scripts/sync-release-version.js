import { appendFileSync } from "node:fs"
import { join } from "node:path"
import { $ } from "bun"

try {
  for (const name of ["GITHUB_OUTPUT", "VERSION"]) {
    if (!process.env[name]) throw new Error(`${name} is not set`)
  }

  const packageDirs = [process.env.PACKAGE_DIR ?? ".", process.env.ELEMENTS_PACKAGE_DIR].filter(Boolean)
  const manifests = packageDirs.map((packageDir) => join(packageDir, "package.json"))
  for (const packageDir of packageDirs) {
    await $`npm pkg set ${`version=${process.env.VERSION}`}`.cwd(packageDir).quiet()
  }
  if (process.env.ELEMENTS_PACKAGE_DIR) {
    await $`npm pkg set ${`dependencies.@teal-ink/vue=${process.env.VERSION}`}`
      .cwd(process.env.ELEMENTS_PACKAGE_DIR)
      .quiet()
  }
  await $`bun install`.quiet()

  const changed = (await $`git diff --quiet -- ${manifests} bun.lock`.quiet().nothrow()).exitCode !== 0
  if (changed) appendFileSync(process.env.GITHUB_OUTPUT, "changed=true\n")
  console.log(
    changed ? `Package version synced to ${process.env.VERSION}.` : `Package version already ${process.env.VERSION}.`,
  )
} catch (error) {
  console.error(error.stderr?.toString().trim() || error.message)
  process.exitCode = 1
}
