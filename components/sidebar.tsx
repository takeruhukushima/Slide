"use client"

import { useState } from "react"
import { Home, FolderOpen, Tag, Share2, Upload, Settings, ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// タグのサンプルデータ
const tags = [
  { name: "プレゼンテーション", count: 12 },
  { name: "会議資料", count: 8 },
  { name: "トレーニング", count: 5 },
  { name: "マーケティング", count: 7 },
  { name: "製品紹介", count: 4 },
]

// カテゴリのサンプルデータ
const categories = [
  { name: "ビジネス", count: 15 },
  { name: "技術", count: 10 },
  { name: "デザイン", count: 8 },
  { name: "教育", count: 6 },
]

export function MainSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [categoryOpen, setCategoryOpen] = useState(true)
  const [tagsOpen, setTagsOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

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
            {isOpen && <h1 className="text-lg font-semibold tracking-wide logo-text">slidocs</h1>}
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
              <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-50 text-blue-700 font-medium">
                <Home className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span>ホーム</span>}
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700">
                <Upload className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span>アップロード</span>}
              </a>
            </li>
          </ul>

          {/* カテゴリ */}
          <div className="mt-6">
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-600"
            >
              <div className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span>カテゴリ</span>}
              </div>
              {isOpen && (
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", categoryOpen ? "transform rotate-180" : "")}
                />
              )}
            </button>
            {isOpen && categoryOpen && (
              <ul className="mt-1 pl-8 space-y-1">
                {categories.map((category) => (
                  <li key={category.name}>
                    <a
                      href="#"
                      className="flex items-center justify-between px-3 py-1.5 rounded-md hover:bg-gray-100 text-sm text-gray-700"
                    >
                      <span>{category.name}</span>
                      <span className="text-xs text-gray-500">{category.count}</span>
                    </a>
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
                {tags.map((tag) => (
                  <li key={tag.name}>
                    <a
                      href="#"
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
function ChevronLeftIcon(props) {
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
function ChevronRightIcon(props) {
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
