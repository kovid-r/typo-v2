import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"

export interface Post {
  slug: string
  title: string
  date: string
  content: string
  excerpt: string
  tags?: string[]
  language?: string
}

const postsDirectory = path.join(process.cwd(), "content/posts")

export async function getAllPosts(): Promise<Post[]> {
  try {
    const fileNames = await fs.readdir(postsDirectory)

    const allPostsData = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.mdx?$/, "")

          const fullPath = path.join(postsDirectory, fileName)
          const fileContents = await fs.readFile(fullPath, "utf8")

          const { data, content } = matter(fileContents)

          const excerpt = content.slice(0, 200).trim() + (content.length > 200 ? "..." : "")

          return {
            slug,
            title: data.title,
            date: data.date,
            content,
            excerpt,
            tags: data.tags || [],
            language: data.language || "en",
          }
        }),
    )

    // Sort posts by date
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error("Error getting posts:", error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = await fs.readFile(fullPath, "utf8")

    const { data, content } = matter(fileContents)

    const excerpt = content.slice(0, 200).trim() + (content.length > 200 ? "..." : "")

    return {
      slug,
      title: data.title,
      date: data.date,
      content,
      excerpt,
      tags: data.tags || [],
      language: data.language || "en",
    }
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error)
    return null
  }
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.tags?.includes(tag))
}

export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts()
  const tagsSet = new Set<string>()

  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagsSet.add(tag)
    })
  })

  return Array.from(tagsSet)
}
