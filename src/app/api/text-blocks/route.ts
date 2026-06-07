import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

const PREFIX = 'text:'

export async function GET() {
  const rows = await db.setting.findMany({ where: { key: { startsWith: PREFIX } } })
  return NextResponse.json(Object.fromEntries(rows.map(r => [r.key.slice(PREFIX.length), r.value])))
}

export async function POST(req: NextRequest) {
  const { id, text } = await req.json()
  if (!id || typeof text !== 'string') return NextResponse.json({ error: 'invalid' }, { status: 400 })
  await db.setting.upsert({
    where:  { key: `${PREFIX}${id}` },
    create: { key: `${PREFIX}${id}`, value: text },
    update: { value: text },
  })
  revalidatePath('/', 'layout')
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  await db.setting.deleteMany({ where: { key: `${PREFIX}${id}` } })
  revalidatePath('/', 'layout')
  return NextResponse.json({ ok: true })
}
