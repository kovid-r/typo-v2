import { remark } from "remark"
import html from "remark-html"
import remarkGfm from "remark-gfm"
import remarkPrism from "remark-prism"

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html, { sanitize: false }).use(remarkGfm).use(remarkPrism).process(markdown)

  return result.toString()
}
