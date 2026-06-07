import { db } from './db'

const PREFIX = 'text:'

export async function getAllTextBlocks(): Promise<Record<string, string>> {
  try {
    const rows = await db.setting.findMany({ where: { key: { startsWith: PREFIX } } })
    return Object.fromEntries(rows.map(r => [r.key.slice(PREFIX.length), r.value]))
  } catch {
    return {}
  }
}
