import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { Marp } from '@marp-team/marp-core';
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    slug: string[]
  }
}

async function getMarkdownContent(slug: string[]) {
  const decodedSlug = slug.map(segment => decodeURIComponent(segment));
  // Adjusted path to look inside "slide" directory, as params.slug will not contain "slide"
  const filePath = path.join(process.cwd(), "slide", ...decodedSlug) + '.md';
  console.log(`[getMarkdownContent in app/slide/[...slug]/page.tsx] Decoded slug: ${JSON.stringify(decodedSlug)}`);
  console.log(`[getMarkdownContent in app/slide/[...slug]/page.tsx] Attempting to read file from path: ${filePath}`);
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    console.log(`[getMarkdownContent in app/slide/[...slug]/page.tsx] Successfully read and parsed: ${filePath}`);
    return { frontmatter: data, content };
  } catch (error) {
    console.error(`[getMarkdownContent in app/slide/[...slug]/page.tsx] Failed to read or parse file at ${filePath}:`, error);
    return null;
  }
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;
  // The slug from app/slide/[...slug]/page.tsx will not include "slide" itself.
  // For example, /slide/foo/bar -> params.slug = ['foo', 'bar']
  const content = await getMarkdownContent(slug);
  
  if (!content) {
    notFound()
  }

  const { frontmatter, content: markdownContent } = content;

  // Ensure markdownContent is a string before parsing
  let slideHtml = '';
  let slideCss = '';

  if (typeof markdownContent === 'string') {
    const marp = new Marp();
    const { html, css } = marp.render(markdownContent);
    slideHtml = html;
    slideCss = css;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: slideCss }} />
      <article className="prose prose-slate dark:prose-invert max-w-none">
        {/* Frontmatter display can be kept or removed depending on whether Marp slides include it */}
        <div className="mb-8 sr-only"> {/* Hiding frontmatter display as Marp might handle it */}
          <h1 className="mb-2 text-4xl font-bold">{frontmatter.title}</h1>
          <div className="flex gap-4 text-sm text-muted-foreground">
            {frontmatter.creator && <div>作成者: {frontmatter.creator}</div>}
            {frontmatter.year && <div>年: {frontmatter.year}</div>}
            {frontmatter.created_at && <div>日付: {new Date(frontmatter.created_at).toLocaleDateString()}</div>}
          </div>
          {frontmatter.imageUrl && (
            <img
              src={frontmatter.imageUrl || "/placeholder.svg"}
              alt={frontmatter.title}
              className="my-4 rounded-lg"
            />
          )}
          {frontmatter.tags && (
            <div className="flex gap-2 mt-4">
              {frontmatter.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div dangerouslySetInnerHTML={{ __html: slideHtml }} />
      </article>
    </>
  )
}
