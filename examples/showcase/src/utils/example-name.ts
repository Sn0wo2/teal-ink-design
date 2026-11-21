const examplePattern = /([^/\\]+)[.-]example\.vue$/

export function exampleName(path: string) {
  const name = examplePattern.exec(path)?.[1]
  if (!name) throw new Error(`Invalid component example path: ${path}`)
  return name
}
