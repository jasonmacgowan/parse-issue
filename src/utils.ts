export function getFirstMatch(regex: RegExp, str: string): string | null {
  const match = regex.exec(str)

  if (match) {
    let index = 0

    if (match.length > 1) {
      index = 1
    }

    return match[index]
  }

  return null
}

export function getExtractions(): Map<string, RegExp> {
  const out = new Map<string, RegExp>()
  const keys = Object.keys(process.env)

  let i
  for (i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = process.env[key]

    // INPUT_EXTRACT_USERNAME but not INPUT_EXTRACT_USERNAME_FLAGS
    if (key.startsWith('INPUT_EXTRACT_') && !key.endsWith('_FLAGS')) {
      if (value) {
        const flags = process.env[`${key}_FLAGS`] || ''
        out.set(key.replace('INPUT_EXTRACT_', '').toLowerCase(), new RegExp(value, flags))
      }
    }
  }

  return out
}
