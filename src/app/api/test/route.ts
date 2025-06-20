import { NextRequest, NextResponse } from "next/server"

// GET Method Example
// URL: /api/test?name=John
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get("name") || "World"
  
  return NextResponse.json({
    message: `Hello, ${name}!`
  })
}

// POST Method Example
// URL: /api/test
// Body: { "name": "John" }
// Content-Type: application/json
// Headers: { "Content-Type": "application/json" }
export async function POST(request: NextRequest) {
  const data = await request.json()
  const name = data.name || "World"
  
  return NextResponse.json({
    message: `Hello, ${name}!`
  })
}