"use client"

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
}
