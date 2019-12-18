/* globals describe expect test */

import * as fs from 'fs'
import {parse} from '../src/parse'
import {loadFixture} from './utils'

describe('parser', () => {
  test('parses issue body', () => {
    const body = loadFixture('issues/parses.md')
    const params = new Map<string, string>([['name', 'Mona']])
    expect(parse(body)).toEqual(params)
  })

  test('parses multiple lines', () => {
    const body = loadFixture('issues/multi.md')
    const params = new Map<string, string>([
      ['name', 'Mona'],
      ['snack', 'cookies']
    ])
    expect(parse(body)).toEqual(params)
  })
})

describe('default regex', () => {
  test('does not extract lines with leading whitespace', () => {
    const body = loadFixture('issues/leading-whitespace.md')
    const params = new Map<string, string>([['name', 'Mona']])
    expect(parse(body)).toEqual(params)
  })
})
