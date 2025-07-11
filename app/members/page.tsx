
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { playersAPI, Player } from '../../lib/supabase'

export default function Members() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPlayers() {
      try {
        const data = await playersAPI.getAll()
        setPlayers(data || [])
      } catch (error) {
        console.error('メンバーデータの取得に失敗しました:', error)
        // エラー時はモックデータを使用
        setPlayers([
          { 
            id: '1', 
            name: "田中太郎", 
            score: 2150, 
            games: 45, 
            wins: 32, 
            losses: 13,
            profile_image: 'https://readdy.ai/api/search-image?query=professional%20male%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profile1&orientation=squarish',
            join_date: "2023年8月",
            created_at: new Date().toISOString()
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadPlayers()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">メンバー読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/ranking" className="text-blue-600 hover:text-blue-800">
            ← ランキング
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">メンバー一覧</h1>
          <div className="w-16"></div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-2 gap-4">
          {players.map((player) => (
            <Link key={player.id} href={`/profile/${player.id}`}>
              <div className="bg-white rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition-shadow cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-gray-200">
                  <img 
                    src={player.profile_image || 'https://readdy.ai/api/search-image?query=professional%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profiledefault&orientation=squarish'} 
                    alt={player.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-gray-800 mb-1 text-sm">{player.name}</h3>
                <div className="space-y-1">
                  <div className="text-xs text-indigo-600 font-semibold">{player.score}pt</div>
                  <div className="text-xs text-gray-500">{player.games}試合</div>
                  <div className="text-xs text-green-600">{Math.round((player.wins / player.games || 0) * 100)}%勝率</div>
                </div>
                {new Date(player.created_at).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000 && (
                  <div className="mt-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                      NEW
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Add New Member Button */}
        <div className="mt-8 text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors !rounded-button">
            新メンバー追加
          </button>
        </div>
      </div>
    </div>
  )
}
