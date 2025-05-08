import { Calendar, Eye, Tag } from "lucide-react"

// サンプルスライドデータ
const slides = [
  {
    id: 1,
    title: "2023年度 第1四半期レポート",
    thumbnail: "/placeholder.svg?height=160&width=280",
    tags: ["ビジネス", "レポート"],
    views: 124,
    createdAt: "2023-04-15",
  },
  {
    id: 2,
    title: "新製品発表会プレゼンテーション",
    thumbnail: "/placeholder.svg?height=160&width=280",
    tags: ["マーケティング", "製品紹介"],
    views: 89,
    createdAt: "2023-05-22",
  },
  {
    id: 3,
    title: "社内トレーニング資料",
    thumbnail: "/placeholder.svg?height=160&width=280",
    tags: ["トレーニング", "教育"],
    views: 56,
    createdAt: "2023-06-10",
  },
  {
    id: 4,
    title: "デザインガイドライン 2023",
    thumbnail: "/placeholder.svg?height=160&width=280",
    tags: ["デザイン", "ガイドライン"],
    views: 78,
    createdAt: "2023-03-05",
  },
  {
    id: 5,
    title: "技術スタック概要",
    thumbnail: "/placeholder.svg?height=160&width=280",
    tags: ["技術", "開発"],
    views: 112,
    createdAt: "2023-02-18",
  },
  {
    id: 6,
    title: "年間マーケティング戦略",
    thumbnail: "/placeholder.svg?height=160&width=280",
    tags: ["マーケティング", "戦略"],
    views: 95,
    createdAt: "2023-01-30",
  },
]

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl font-medium mb-6 tracking-wide">最近のスライド</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mincho">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
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
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="px-4 py-2 border-t text-sm text-gray-500 flex justify-between">
              <div className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {slide.createdAt}
              </div>
              <div className="flex items-center">
                <Eye className="h-3.5 w-3.5 mr-1" />
                {slide.views}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
