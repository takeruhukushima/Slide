"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Home, FolderOpen, Tag, Share2, Upload, Settings, ChevronDown, Menu, X, FileText, ListTree } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SlideItem {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: SlideItem[];
}

interface TagInfo {
  name: string;
  count: number;
}

export function MainSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [slideItems, setSlideItems] = useState<SlideItem[]>([]);
  const [dynamicTags, setDynamicTags] = useState<TagInfo[]>([]);
  const [slidesOpen, setSlidesOpen] = useState(true);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const [tagsOpen, setTagsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fetchSlideItems = async () => {
      try {
        const response = await fetch('/api/slides');
        if (!response.ok) {
          throw new Error('Failed to fetch slide data');
        }
        const data: { structure: SlideItem[], tags: TagInfo[] } = await response.json();
        setSlideItems(data.structure || []);
        setDynamicTags(data.tags || []);
        // Optionally, initialize openFolders based on fetched data if needed
        // For example, to open all top-level folders by default:
        // const initialOpenFolders: Record<string, boolean> = {};
        // data.forEach(item => {
        //   if (item.type === 'folder') {
        //     initialOpenFolders[item.name] = true;
        //   }
        // });
        // setOpenFolders(initialOpenFolders);
      } catch (error) {
        console.error("Error fetching slide data:", error);
        setSlideItems([]); 
        setDynamicTags([]);
      }
    };

    fetchSlideItems();
  }, []);

  const toggleFolder = (folderName: string) => {
    setOpenFolders(prev => ({ ...prev, [folderName]: !prev[folderName] }));
  };

  return (
    <>
      {/* モバイルトグルボタン */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* サイドバー */}
      <aside
        className={cn(
          "bg-white border-r w-64 flex-shrink-0 flex flex-col h-full transition-all duration-300 ease-in-out font-mincho",
          isOpen ? "w-64" : "w-20",
          mobileOpen ? "fixed inset-y-0 left-0 z-40" : "hidden md:flex",
        )}
      >
        {/* ヘッダー */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-6 w-6 text-blue-600 flex-shrink-0" />
            {isOpen && <h1 className="text-lg font-semibold tracking-wide logo-text">Slide</h1>}
          </div>
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ChevronLeftIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
          </Button>
        </div>

        {/* 検索ボックス */}
        {isOpen && (
          <div className="p-4 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="スライドを検索..."
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* メインメニュー */}
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            <li>
              <Link href="/" legacyBehavior>
                <a className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-50 text-blue-700 font-medium">
                  <Home className="h-5 w-5 flex-shrink-0" />
                  {isOpen && <span>ホーム</span>}
                </a>
              </Link>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700">
                <Upload className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span>アップロード</span>}
              </a>
            </li>
          </ul>

          {/* スライド */}
          <div className="mt-6">
            <button
              onClick={() => setSlidesOpen(!slidesOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-600"
            >
              <div className="flex items-center gap-2">
                <ListTree className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span>スライド</span>}
              </div>
              {isOpen && (
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", slidesOpen ? "transform rotate-180" : "")}
                />
              )}
            </button>
            {isOpen && slidesOpen && (
              <ul className="mt-1 pl-4 space-y-1">
                {slideItems.map((item) => (
                  <li key={item.name + (item.type === 'folder' ? '-folder' : '-file')}>
                    {item.type === "folder" ? (
                      <>
                        <button
                          onClick={() => toggleFolder(item.name)}
                          className="flex items-center justify-between w-full px-3 py-1.5 rounded-md hover:bg-gray-100 text-sm text-gray-700"
                        >
                          <div className="flex items-center gap-2">
                            <FolderOpen className="h-4 w-4 flex-shrink-0" />
                            <span>{item.name}</span>
                          </div>
                          <ChevronDown
                            className={cn("h-4 w-4 transition-transform", openFolders[item.name] ? "transform rotate-180" : "")}
                          />
                        </button>
                        {openFolders[item.name] && item.children && (
                          <ul className="mt-1 pl-6 space-y-1">
                            {item.children.map((child) => (
                              <li key={child.path}>
                                <Link href={child.path} legacyBehavior>
                                  <a className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 text-sm text-gray-700">
                                    <FileText className="h-4 w-4 flex-shrink-0" />
                                    <span>{child.name.replace('.md', '')}</span>
                                  </a>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link href={item.path} legacyBehavior>
                        <a className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 text-sm text-gray-700">
                          <FileText className="h-4 w-4 flex-shrink-0" />
                          <span>{item.name.replace('.md', '')}</span>
                        </a>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* タグ */}
          <div className="mt-4">
            <button
              onClick={() => setTagsOpen(!tagsOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-600"
            >
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span>タグ</span>}
              </div>
              {isOpen && (
                <ChevronDown className={cn("h-4 w-4 transition-transform", tagsOpen ? "transform rotate-180" : "")} />
              )}
            </button>
            {isOpen && tagsOpen && (
              <ul className="mt-1 pl-8 space-y-1">
                {dynamicTags.map((tag) => (
                  <li key={tag.name}>
                    <a
                      href={`/tags/${tag.name}`} // Example: link to a page that filters by tag
                      className="flex items-center justify-between px-3 py-1.5 rounded-md hover:bg-gray-100 text-sm text-gray-700"
                    >
                      <span>{tag.name}</span>
                      <span className="text-xs text-gray-500">{tag.count}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 共有 */}
          <div className="mt-4">
            <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700">
              <Share2 className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span>共有設定</span>}
            </a>
          </div>
        </nav>

        {/* フッター */}
        <div className="p-4 border-t">
          <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700">
            <Settings className="h-5 w-5 flex-shrink-0" />
            {isOpen && <span>設定</span>}
          </a>
        </div>
      </aside>
    </>
  )
}

// ChevronLeft コンポーネントの定義
function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

// ChevronRight コンポーネントの定義
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
