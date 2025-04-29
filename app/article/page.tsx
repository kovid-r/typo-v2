import Link from "next/link"
import { Github, Rss, Twitter, AtSign } from "lucide-react"

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-white bg-[linear-gradient(#e5e5e5_1px,transparent_1px),linear-gradient(90deg,#e5e5e5_1px,transparent_1px)] bg-[size:20px_20px]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex">
          <main className="flex-1 pr-8">
            <article className="mb-16">
              <h1 className="text-2xl font-medium mb-1">The Unbearable Lightness of Being</h1>
              <div className="text-sm text-gray-600 mb-6">
                发布于 1984-01-24{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  # Articles
                </Link>
              </div>

              <div className="prose prose-gray max-w-none">
                <p>
                  The idea of eternal return is a mysterious one, and Nietzsche has often perplexed other philosophers
                  with it: to think that everything recurs as we once experienced it, and that the recurrence itself
                  recurs ad infinitum! What does this mad myth signify?
                </p>

                <p>
                  Putting it negatively, the myth of eternal return states that a life which disappears once and for
                  all, which does not return, is like a shadow, without weight, dead in advance, and whether it was
                  horrible, beautiful, or sublime, its horror, sublimity, and beauty mean nothing. We need take no more
                  note of it than of a war between two African kingdoms in the fourteenth century, a war that altered
                  nothing in the destiny of the world, even if a hundred thousand blacks perished in excruciating
                  torment.
                </p>

                <p>
                  Will the war between two African kingdoms in the fourteenth century itself be altered if it recurs
                  again and again, in eternal return?
                </p>

                <p>It will: it will become a solid mass, permanently protuberant, its inanity irreparable.</p>

                <p>
                  If the French Revolution were to recur eternally, French historians would be less proud of
                  Robespierre. But because they deal with something that will not return, the bloody years of the
                  Revolution have turned into mere words, theories, and discussions, have become lighter than feathers,
                  frightening no one. There is an infinite difference between a Robespierre who occurs only once in
                  history and a Robespierre who eternally returns, chopping off French heads.
                </p>

                <p>
                  Let us therefore agree that the idea of eternal return implies a perspective from which things appear
                  other than as we know them: they appear without the mitigating circumstance of their transitory
                  nature. This mitigating circumstance prevents us from coming to a verdict. For how can we condemn
                  something that is ephemeral, in transit?
                </p>

                <p>
                  In the sunset of dissolution, everything is illuminated by the aura of nostalgia, even the guillotine.
                </p>
              </div>
            </article>
          </main>

          <aside className="w-64 border-l border-gray-200 pl-8">
            <nav className="mt-8">
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
                    文章
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
                    归档
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
                    分类
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-800 hover:text-gray-600">
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
                  Astro
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
