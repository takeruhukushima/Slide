import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface SlideItem {
  name: string;
  path: string; // Navigation path (e.g., /slide/folder/file)
  type: 'file' | 'folder';
  children?: SlideItem[];
  filePath?: string; // Actual file system path relative to 'slide' dir, including extension
}

interface TagInfo {
  name: string;
  count: number;
}

// Helper function to recursively read directory structure
function getDirectoryStructure(dirPath: string, basePath: string = ''): SlideItem[] {
  const items: SlideItem[] = [];
  try {
    const filesAndDirs = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const dirent of filesAndDirs) {
      const itemName = dirent.name;
      if (itemName.startsWith('.')) {
        continue;
      }

      const relativeItemPath = path.join(basePath, itemName).replace(/\\/g, '/');
      const fullItemPath = path.join(dirPath, itemName);

      if (dirent.isDirectory()) {
        items.push({
          name: itemName,
          path: `/slide/${relativeItemPath}`,
          type: 'folder',
          children: getDirectoryStructure(fullItemPath, relativeItemPath),
        });
      } else if (dirent.isFile() && (itemName.endsWith('.md') || itemName.endsWith('.mdx'))) {
        const nameWithoutExtension = itemName.replace(/\.(mdx|md)$/, '');
        const pathWithoutExtension = `/slide/${relativeItemPath.replace(/\.(mdx|md)$/, '')}`;
        items.push({
          name: nameWithoutExtension,
          path: pathWithoutExtension,
          type: 'file',
          filePath: relativeItemPath, // Store relative path with extension for reading
        });
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
  return items.sort((a, b) => {
    if (a.type === 'folder' && b.type === 'file') return -1;
    if (a.type === 'file' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name);
  });
}

function extractTagsFromStructure(items: SlideItem[], slideDirBase: string, tagCounts: Map<string, number>) {
  for (const item of items) {
    if (item.type === 'file' && item.filePath) {
      const fullFilePath = path.join(slideDirBase, item.filePath);
      try {
        const fileContent = fs.readFileSync(fullFilePath, 'utf-8');
        const { data } = matter(fileContent);
        if (data && Array.isArray(data.tags)) {
          data.tags.forEach((tag: any) => {
            if (typeof tag === 'string') {
              tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
            }
          });
        }
      } catch (e) {
        console.error(`Error reading or parsing front matter for ${fullFilePath}:`, e);
      }
    } else if (item.type === 'folder' && item.children) {
      extractTagsFromStructure(item.children, slideDirBase, tagCounts);
    }
  }
}

export async function GET() {
  try {
    const slideDirectoryBase = path.join(process.cwd(), 'slide');
    const structure = getDirectoryStructure(slideDirectoryBase);

    const tagCounts = new Map<string, number>();
    extractTagsFromStructure(structure, slideDirectoryBase, tagCounts);

    const tagsData: TagInfo[] = [];
    for (const [name, count] of tagCounts) {
      tagsData.push({ name, count });
    }
    tagsData.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)); // Sort by count desc, then name asc

    return NextResponse.json({ structure, tags: tagsData });
  } catch (error) {
    console.error('Failed to get slide structure or tags:', error);
    return NextResponse.json({ error: 'Failed to load slide structure or tags' }, { status: 500 });
  }
}
