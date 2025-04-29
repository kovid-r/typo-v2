import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { getPostBySlug } from "@/lib/posts"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const post = await getPostBySlug(params.slug)

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error(`Error fetching post ${params.slug}:`, error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { title, content, tags, language } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // Get the existing post to check if it exists
    const existingPost = await getPostBySlug(params.slug)

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Create frontmatter
    const frontmatter = `---
title: "${title}"
date: "${existingPost.date}"
tags: ${JSON.stringify(tags || [])}
language: "${language || "en"}"
---

${content}`

    // Write file
    const postsDirectory = path.join(process.cwd(), "content/posts")
    await fs.writeFile(path.join(postsDirectory, `${params.slug}.md`), frontmatter)

    return NextResponse.json({ success: true, slug: params.slug })
  } catch (error) {
    console.error(`Error updating post ${params.slug}:`, error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const postsDirectory = path.join(process.cwd(), "content/posts")
    const filePath = path.join(postsDirectory, `${params.slug}.md`)

    // Check if file exists
    try {
      await fs.access(filePath)
    } catch {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Delete file
    await fs.unlink(filePath)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting post ${params.slug}:`, error)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
