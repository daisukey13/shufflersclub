
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { playersAPI, matchesAPI, Player, Match } from '../../../lib/supabase'

interface ProfileDetailProps {
  playerId: string
}

export default function ProfileDetail({ playerId }: ProfileDetailProps) {
  const [player, setPlayer] = useState<Player | null>(null)
  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadPlayerData() {
      try {
        const [playerData, matchData] = await Promise.all([
          playersAPI.getById(playerId),
          matchesAPI.getByPlayerId(playerId)
        ])
        
        setPlayer(playerData)
        setMatches(matchData || [])
      } catch (error) {
        console.error('プレーヤーデータの取得に失敗しました:', error)
        // エラー時はモックデータを使用
        const mockPlayer = {
          id: playerId,
          name: "田中太郎",
          score: 2150,
          games: 45,
          wins: 32,
          losses: 13,
          profile_image: 'https://readdy.ai/api/search-image?query=professional%20male%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profile1&orientation=squarish',
          join_date: "2023年8月",
          created_at: new Date().toISOString()
        }
        setPlayer(mockPlayer)
        setMatches([
          { 
            id: '1',
            player1: { name: "佐藤花子" },
            player2: { name: "田中太郎" },
            player1_score: 12,
            player2_score: 15,
            match_date: "2024-01-15T14:20:00Z"
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadPlayerData()
  }, [playerId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">プロフィール読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">プレーヤーが見つかりません</p>
          <Link href="/ranking" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            ランキングに戻る
          </Link>
        </div>
      </div>
    )
  }

  const winRate = player.games > 0 ? Math.round((player.wins / player.games) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/ranking" className="text-blue-600 hover:text-blue-800">
            ← Ranking
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Profile</h1>
          <div className="w-16"></div>
        </div>

        {/* Player Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-4 border-indigo-100">
              <img 
                src={player.profile_image || 'https://readdy.ai/api/search-image?query=professional%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profiledefault&orientation=squarish'} 
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{player.name}</h2>
            <p className="text-gray-500">Joined {player.join_date}</p>
          </div>

          {/* Score Display */}
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-indigo-600 mb-1">{player.score}</div>
            <p className="text-gray-500">Current Points</p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{player.games}</div>
              <div className="text-sm text-gray-600">Total Games</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{winRate}%</div>
              <div className="text-sm text-gray-600">Win Rate</div>
            </div>
          </div>

          {/* Win/Loss Record */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-green-100 rounded-lg">
              <div className="text-lg font-bold text-green-700">{player.wins}</div>
              <div className="text-xs text-gray-600">Wins</div>
            </div>
            <div className="text-center p-3 bg-red-100 rounded-lg">
              <div className="text-lg font-bold text-red-700">{player.losses}</div>
              <div className="text-xs text-gray-600">Losses</div>
            </div>
          </div>
        </div>

        {/* Recent Match History */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Match History</h3>
          {matches.length > 0 ? (
            <div className="space-y-3">
              {matches.map((match, index) => {
                const isPlayer1 = match.player1_id === playerId
                const opponent = isPlayer1 ? match.player2 : match.player1
                const playerScore = isPlayer1 ? match.player1_score : match.player2_score
                const opponentScore = isPlayer1 ? match.player2_score : match.player1_score
                const won = playerScore > opponentScore
                
                return (
                  <div key={match.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">vs {opponent?.name || '不明'}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(match.match_date).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                    <div className="text-center mx-4">
                      <p className="font-bold text-gray-800">{playerScore}-{opponentScore}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      won 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {won ? 'Win' : 'Loss'}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">試合履歴がありません</p>
          )}
        </div>
      </div>
    </div>
  )
}
