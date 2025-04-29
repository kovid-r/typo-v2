import Link from "next/link"
import { Github, Rss, Twitter, AtSign } from "lucide-react"
import { getPostBySlug, getAllPosts } from "@/lib/posts"
import MarkdownDisplay from "@/components/markdown-display"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white bg-[linear-gradient(#e5e5e5_1px,transparent_1px),linear-gradient(90deg,#e5e5e5_1px,transparent_1px)] bg-[size:20px_20px]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <main className="flex-1 md:pr-8">
            <article className="mb-16">
              <h1 className="text-2xl font-medium mb-1">{post.title}</h1>
              <div className="text-sm text-gray-600 mb-6">
                发布于 {post.date}{" "}
                <Link href="/articles" className="text-blue-600 hover:underline">
                  # Articles
                </Link>
              </div>

              <MarkdownDisplay content={post.content} />
            </article>
          </main>

          <aside className="w-full md:w-64 border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pt-0 md:pl-8 mt-8 md:mt-0">
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-800 hover:text-gray-600">
                    文章
                  </Link>
                </li>
                <li>
                  <Link href="/archive" className="text-gray-800 hover:text-gray-600">
                    归档
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-gray-800 hover:text-gray-600">
                    分类
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-800 hover:text-gray-600">
                    关于
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-8 flex space-x-3">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Github size={18} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Rss size={18} />
                <span className="sr-only">RSS</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <AtSign size={18} />
                <span className="sr-only">Mastodon</span>
              </Link>
            </div>

            <div className="mt-12 text-xs text-gray-500">
              <p>
                © 2025{" "}
                <Link href="#" className="hover:underline">
                  Moeyua
                </Link>
              </p>
              <p>
                Theme{" "}
                <Link href="#" className="hover:underline">
                  Typography
                </Link>{" "}
                by{" "}
                <Link href="#" className="hover:underline">
                  Moeyua
                </Link>
              </p>
              <p>
                Proudly published with{" "}
                <Link href="#" className="hover:underline">
                  Next.js
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
