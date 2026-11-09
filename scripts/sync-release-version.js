import { spawnSync } from "node:child_process"
import { appendFileSync } from "node:fs"

function run(command, options = {}) {
  const result = spawnSync(command[0], command.slice(1), { encoding: "utf8", ...options })
  if (result.status !== 0) {
    throw new Error(`\`${command.join(" ")}\` failed: ${result.stderr?.trim() || result.stdout?.trim()}`)
  }
}

function main() {
  for (const name of ["GITHUB_OUTPUT", "VERSION"]) {
    if (!process.env[name]) throw new Error(`${name} is not set`)
  }

  const packageDirs = [process.env.PACKAGE_DIR ?? ".", process.env.ELEMENTS_PACKAGE_DIR].filter(Boolean)
  const manifests = packageDirs.map((packageDir) =>
    packageDir === "." ? "package.json" : `${packageDir}/package.json`,
  )

  for (const packageDir of packageDirs) {
    run(["npm", "pkg", "set", `version=${process.env.VERSION}`], { cwd: packageDir })
  }
  if (process.env.ELEMENTS_PACKAGE_DIR) {
    run(["npm", "pkg", "set", `dependencies.@teal-ink/vue=${process.env.VERSION}`], {
      cwd: process.env.ELEMENTS_PACKAGE_DIR,
    })
  }
  run(["bun", "install"])

  const changed = spawnSync("git", ["diff", "--quiet", "--", ...manifests, "bun.lock"]).status !== 0
  if (changed) appendFileSync(process.env.GITHUB_OUTPUT, "changed=true\n")
  console.log(
    changed ? `Package version synced to ${process.env.VERSION}.` : `Package version already ${process.env.VERSION}.`,
  )
}

try {
  main()
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
