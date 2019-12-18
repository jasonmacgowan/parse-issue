import * as fs from 'fs'
import * as path from 'path'

export function loadFixture(filename: string): string {
  return fs.readFileSync(path.join(__dirname, 'fixtures', filename), 'utf8')
}

export function loadContext(filename: string): object {
  const raw = loadFixture(`contexts/${filename}`)
  return JSON.parse(raw)
}
