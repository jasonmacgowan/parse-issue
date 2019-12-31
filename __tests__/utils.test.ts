/* globals describe expect test */

import {getExtractions, getFirstMatch} from '../src/utils'

describe('utils#getExtractions', () => {
  test('parses environment variables', () => {
    process.env.INPUT_EXTRACT_USERNAME = '<p id="username">(?<username>[^<]+)</p>'
    process.env.INPUT_EXTRACT_USERNAME_FLAGS = 'gm'
    process.env.INPUT_EXTRACT_EMAIL = '<p id="email">(?<email>[^<]+)</p>'

    const expected = new Map<string, RegExp>([
      ['username', new RegExp(process.env.INPUT_EXTRACT_USERNAME, process.env.INPUT_EXTRACT_USERNAME_FLAGS)],
      ['email', new RegExp(process.env.INPUT_EXTRACT_EMAIL)]
    ])

    expect(getExtractions()).toEqual(expected)
  })
})

describe('utils#getFirstMatch', () => {
  test('gets a match', () => {
    const regex = /mona/
    const str = 'mona'

    expect(getFirstMatch(regex, str)).toBe('mona')
  })

  test('gets a match with capture groups', () => {
    const regex = /name: (mona)/
    const str = 'name: mona'

    expect(getFirstMatch(regex, str)).toBe('mona')
  })

  test('returns the first capture group when their are multiple', () => {
    const regex = /(name): (mona)/
    const str = 'name: mona'

    expect(getFirstMatch(regex, str)).toBe('name')
  })
})
