import fs from 'fs';
import path from 'path';
import Marp from '@marp-team/marp-core';

async function renderMarkdown(filePath: string): Promise<string> {
  try {
    const md = fs.readFileSync(filePath, 'utf-8');
    const marp = new Marp();
    const { html, css } = marp.render(md);
    return `
      <style>${css}</style>
      ${html}
    `;
  } catch (error) {
    console.error("Error rendering markdown:", error);
    return `<p>Error rendering markdown: ${error}</p>`;
  }
}

export default async function PresentationPage({ searchParams }: { searchParams: { slide: string } }) {
  const { slide } = searchParams;
  const filePath = path.join(process.cwd(), slide);

  console.log("Slide:", slide);
  console.log("File path:", filePath);

  try {
    const slidesHtml = await renderMarkdown(filePath);
    console.log("Slides HTML:", slidesHtml);

    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: slidesHtml }} />
      </div>
    );
  } catch (error: any) {
    console.error("Error loading slide:", error);
    return <div>Slide not found: {slide}</div>;
  }
}
