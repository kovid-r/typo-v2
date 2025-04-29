"use client"

import { useEffect, useState } from "react"
import { marked } from "marked"

interface MarkdownDisplayProps {
  content: string
}

export default function MarkdownDisplay({ content }: MarkdownDisplayProps) {
  const [html, setHtml] = useState("")

  useEffect(() => {
    // Configure marked options
    marked.setOptions({
      gfm: true,
      breaks: true,
      sanitize: false,
    })

    // Convert markdown to HTML
    const renderedHtml = marked.parse(content)
    setHtml(renderedHtml)
  }, [content])

  return <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
}
