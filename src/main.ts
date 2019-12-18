import * as core from '@actions/core'
import * as github from '@actions/github'

import {parse} from './parse'

export function run(): void {
  try {
    const issueBody = github.context.payload.issue?.body

    if (issueBody) {
      const params: Map<string, string> = parse(issueBody)

      for (const entry of params.entries()) {
        const [key, value] = entry
        core.setOutput(key, value)
      }
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

if (require.main === module) {
  run()
}
