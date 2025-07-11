
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { playersAPI, Player } from '../../lib/supabase'

export default function Ranking() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPlayers() {
      try {
        const data = await playersAPI.getRanking()
        setPlayers(data || [])
      } catch (error) {
        console.error('ランキングデータの取得に失敗しました:', error)
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
          },
          { 
            id: '2', 
            name: "佐藤花子", 
            score: 2080, 
            games: 38, 
            wins: 28, 
            losses: 10,
            profile_image: 'https://readdy.ai/api/search-image?query=professional%20female%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profile2&orientation=squarish',
            join_date: "2023年9月",
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
          <p className="text-gray-600">ランキング読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← ホーム
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">ランキング</h1>
          <Link href="/members" className="text-blue-600 hover:text-blue-800 text-sm">
            メンバー
          </Link>
        </div>

        {/* Ranking List */}
        <div className="space-y-3">
          {players.map((player, index) => (
            <Link key={player.id} href={`/profile/${player.id}`}>
              <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex items-center">
                  {/* Ranking Badge */}
                  <div className="relative mr-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-gray-200">
                      <img 
                        src={player.profile_image || 'https://readdy.ai/api/search-image?query=professional%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profiledefault&orientation=squarish'} 
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Player Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-bold text-gray-800">{player.name}</h3>
                      {new Date(player.created_at).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000 && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="font-semibold text-indigo-600">{player.score}pt</span>
                      <span>{player.games}試合</span>
                      <span className="text-green-600">{Math.round((player.wins / player.games || 0) * 100)}%勝率</span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span className="text-green-600">{player.wins}勝</span>
                      <span className="text-red-600">{player.losses}敗</span>
                      <span>参加: {player.join_date}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <i className="ri-arrow-right-line text-gray-400"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Floating Action Button */}
        <Link href="/register">
          <div className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
            <i className="ri-add-fill text-2xl text-white"></i>
          </div>
        </Link>
      </div>
    </div>
  )
}
