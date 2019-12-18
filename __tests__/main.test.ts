/* globals expect jest test */

import * as core from '@actions/core'

import {loadContext} from './utils'
import {run} from '../src/main'

jest.mock('@actions/core')
jest.mock('@actions/github', () => loadContext('default.json'))

describe('action', () => {
  test('parses a GitHub Issue', () => {
    run()

    // @ts-ignore
    expect(core.setOutput.mock.calls.length).toEqual(3)
    // @ts-ignore
    expect(core.setOutput.mock.calls[0][0]).toEqual('name')
    // @ts-ignore
    expect(core.setOutput.mock.calls[0][1]).toEqual('Mona')
    // @ts-ignore
    expect(core.setOutput.mock.calls[1][0]).toEqual('snack')
    // @ts-ignore
    expect(core.setOutput.mock.calls[1][1]).toEqual('cookies')
    // @ts-ignore
    expect(core.setOutput.mock.calls[2][0]).toEqual('color')
    // @ts-ignore
    expect(core.setOutput.mock.calls[2][1]).toEqual('blue')
  })
})
