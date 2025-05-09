import { Calendar, Eye, Tag } from "lucide-react"
import fs from 'fs';
import path from 'path';
import Marp from '@marp-team/marp-core';
import Link from 'next/link';
// import { MainSidebar } from "@/components/sidebar"; // Sidebar component import - REMOVED

const slideDirectory = path.join(process.cwd(), 'slide');

function getAllMarkdownFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllMarkdownFiles(fullPath, arrayOfFiles);
    } else {
      if (path.extname(file) === '.md') {
        // Store path relative to the 'slide' directory
        arrayOfFiles.push(path.relative(slideDirectory, fullPath));
      }
    }
  });
  return arrayOfFiles;
}
  
const markdownFiles = getAllMarkdownFiles(slideDirectory).sort();

export default function Home() {
  return (
    // <div className="flex h-screen"> {/* Flex container for sidebar and content */} - REMOVED WRAPPER
      // {/* <MainSidebar /> */} {/* Sidebar component */} - REMOVED
      <main className="flex-1 p-6 overflow-y-auto"> {/* Main content area */}
        <h2 className="text-2xl font-medium mb-6 tracking-wide">最近のスライド</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mincho">
        {markdownFiles.map((filePath, index) => {
          const fileName = path.basename(filePath, '.md');
          // Construct the correct link href by prepending "slide/"
          const hrefPath = `slide/${filePath.replace(/\.md$/, '')}`;
          const slide = {
            id: index,
            title: fileName,
            thumbnail: "/placeholder.svg?height=160&width=280",
            // Use the directory of the file within the 'slide' folder as a tag
            tags: [path.dirname(filePath) === '.' ? 'slide' : `slide/${path.dirname(filePath)}`],
            views: 0,
          };

          return (
            <Link key={slide.id} href={`/${hrefPath}`} className="block">
              <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={slide.thumbnail || "/placeholder.svg"}
                    alt={`${slide.title}のサムネイル`}
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2 line-clamp-2 tracking-wide">{slide.title}</h3>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {slide.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-4 py-2 border-t text-sm text-gray-500 flex justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-3.5 w-3.5 mr-1" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        </div>
      </main>
    // </div> - REMOVED WRAPPER
  )
}
