
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { playersAPI, Player } from '../lib/supabase'

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPlayers() {
      try {
        const data = await playersAPI.getRanking()
        setPlayers(data || [])
      } catch (error) {
        console.error('プレーヤーデータの取得に失敗しました:', error)
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
          },
          { 
            id: '3', 
            name: "山田次郎", 
            score: 2020, 
            games: 42, 
            wins: 26, 
            losses: 16,
            profile_image: 'https://readdy.ai/api/search-image?query=professional%20male%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profile3&orientation=squarish',
            join_date: "2023年7月",
            created_at: new Date().toISOString()
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadPlayers()
  }, [])

  const topPlayers = players.slice(0, 3)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2" style={{fontFamily: "Pacifico, serif"}}>
            logo
          </h1>
          <p className="text-gray-600">卓球ランキングシステム</p>
        </div>

        {/* Top 3 Players */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">🏆 Top Ranking</h2>
          
          <div className="space-y-4">
            {topPlayers.map((player, index) => (
              <Link key={player.id} href={`/profile/${player.id}`}>
                <div className="flex items-center p-4 bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-lg transition-all cursor-pointer">
                  {/* Ranking Badge */}
                  <div className="relative mr-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                      <img 
                        src={player.profile_image || 'https://readdy.ai/api/search-image?query=professional%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profiledefault&orientation=squarish'} 
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Player Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{player.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="font-semibold text-indigo-600">{player.score}pt</span>
                      <span>{player.games}試合</span>
                      <span className="text-green-600">{Math.round((player.wins / player.games) * 100)}%勝率</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <i className="ri-arrow-right-line text-gray-400"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/register" className="block bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-add-line text-2xl text-blue-600"></i>
            </div>
            <h3 className="font-bold text-gray-800 mb-1">試合登録</h3>
            <p className="text-sm text-gray-600">新しい試合結果を登録</p>
          </Link>
          
          <Link href="/ranking" className="block bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-trophy-line text-2xl text-green-600"></i>
            </div>
            <h3 className="font-bold text-gray-800 mb-1">ランキング</h3>
            <p className="text-sm text-gray-600">全体のランキングを確認</p>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">システム統計</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{players.length}</div>
              <div className="text-sm text-gray-600">参加者数</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{players.reduce((sum, p) => sum + p.games, 0)}</div>
              <div className="text-sm text-gray-600">総試合数</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
