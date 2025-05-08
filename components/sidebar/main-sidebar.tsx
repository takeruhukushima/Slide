"use client"
import { Home, FolderOpen, Tag, Share2, Upload, Settings, Clock, ChevronDown, Plus } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

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
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <FolderOpen className="h-6 w-6 text-blue-600" />
          <h1 className="text-lg font-semibold">スライド管理</h1>
        </div>
        <div className="px-2 pb-2">
          <SidebarInput placeholder="スライドを検索..." />
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {/* メインナビゲーション */}
        <SidebarGroup>
          <SidebarGroupLabel>メインメニュー</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <a href="#">
                    <Home />
                    <span>ホーム</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Upload />
                    <span>アップロード</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Clock />
                    <span>最近表示したスライド</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* カテゴリ */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full justify-between">
                カテゴリ
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <SidebarGroupAction>
              <Plus />
              <span className="sr-only">カテゴリを追加</span>
            </SidebarGroupAction>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {categories.map((category) => (
                    <SidebarMenuItem key={category.name}>
                      <SidebarMenuButton asChild>
                        <a href="#">
                          <FolderOpen className="h-4 w-4" />
                          <span>{category.name}</span>
                          <span className="ml-auto text-xs text-muted-foreground">{category.count}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* タグ */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full justify-between">
                タグ
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <SidebarGroupAction>
              <Plus />
              <span className="sr-only">タグを追加</span>
            </SidebarGroupAction>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {tags.map((tag) => (
                    <SidebarMenuItem key={tag.name}>
                      <SidebarMenuButton asChild>
                        <a href="#">
                          <Tag className="h-4 w-4" />
                          <span>{tag.name}</span>
                          <span className="ml-auto text-xs text-muted-foreground">{tag.count}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* 共有 */}
        <SidebarGroup>
          <SidebarGroupLabel>共有</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Share2 />
                    <span>共有設定</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <Settings />
                <span>設定</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
