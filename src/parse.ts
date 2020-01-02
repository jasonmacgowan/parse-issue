const regex = /\s*(?<key>[\w]+)\s*:\s*(?<value>[\w\t ]+)\s*/gm

export function parse(body: string): Map<string, string> {
  const params: Map<string, string> = new Map()

  let match: RegExpExecArray | null
  do {
    match = regex.exec(body)

    if (match && match.groups) {
      const key = match.groups.key
      const value = match.groups.value
      params.set(key, value)
    }
  } while (match !== null)

  return params
}
