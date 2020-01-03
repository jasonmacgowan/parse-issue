import {getExtractions, getFirstMatch} from './utils'

const regex = /\s*(?<key>[\w\t ]+)\s*:\s*(?<value>[\w\t ]+)\s*/gm

export function parseExtractions(body: string): Map<string, string> {
  const params = new Map<string, string>()
  const extractions = getExtractions()

  for (const [key, matcher] of extractions.entries()) {
    const value = getFirstMatch(matcher, body)

    if (value) {
      params.set(key, value)
    }
  }

  return params
}

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

  const extractions = parseExtractions(body)

  return new Map(
    (function*() {
      yield* params
      yield* extractions
    })()
  )
}
