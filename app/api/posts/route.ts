import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { getAllPosts } from "@/lib/posts"

export async function GET() {
  try {
    const posts = await getAllPosts()
    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, tags, language } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    // Create frontmatter
    const date = new Date().toISOString().split("T")[0]
    const frontmatter = `---
title: "${title}"
date: "${date}"
tags: ${JSON.stringify(tags || [])}
language: "${language || "en"}"
---

${content}`

    // Ensure directory exists
    const postsDirectory = path.join(process.cwd(), "content/posts")
    await fs.mkdir(postsDirectory, { recursive: true })

    // Write file
    await fs.writeFile(path.join(postsDirectory, `${slug}.md`), frontmatter)

    return NextResponse.json({ success: true, slug })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
