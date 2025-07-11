
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { playersAPI, matchesAPI, Player } from '../../lib/supabase'

export default function Register() {
  const [players, setPlayers] = useState<Player[]>([])
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')
  const [score1, setScore1] = useState('')
  const [score2, setScore2] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function loadPlayers() {
      setLoading(true)
      try {
        const data = await playersAPI.getAll()
        setPlayers(data || [])
      } catch (error) {
        console.error('プレーヤーデータの取得に失敗しました:', error)
        setPlayers([
          { 
            id: '1', name: "田中太郎", score: 2150, games: 45, wins: 32, losses: 13,
            profile_image: '', join_date: '', created_at: ''
          },
          { 
            id: '2', name: "佐藤花子", score: 2080, games: 38, wins: 28, losses: 10,
            profile_image: '', join_date: '', created_at: ''
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadPlayers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (player1 && player2 && score1 && score2) {
      setSubmitting(true)
      try {
        await matchesAPI.create({
          player1_id: player1,
          player2_id: player2,
          player1_score: parseInt(score1),
          player2_score: parseInt(score2)
        })
        
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
          setPlayer1('')
          setPlayer2('')
          setScore1('')
          setScore2('')
        }, 2000)
      } catch (error) {
        console.error('試合登録に失敗しました:', error)
        alert('試合登録に失敗しました。もう一度お試しください。')
      } finally {
        setSubmitting(false)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">プレーヤー読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← 戻る
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">試合登録</h1>
          <div className="w-12"></div>
        </div>

        {/* 登録フォーム */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-6">
            {/* プレイヤー1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">プレイヤー1</label>
              <select
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={submitting}
              >
                <option value="">選択してください</option>
                {players.map((player) => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </select>
            </div>

            {/* プレイヤー1のスコア */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">プレイヤー1のスコア</label>
              <input
                type="number"
                value={score1}
                onChange={(e) => setScore1(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="スコアを入力"
                min="0"
                required
                disabled={submitting}
              />
            </div>

            {/* VS */}
            <div className="text-center py-2">
              <span className="text-2xl font-bold text-gray-400">VS</span>
            </div>

            {/* プレイヤー2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">プレイヤー2</label>
              <select
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={submitting}
              >
                <option value="">選択してください</option>
                {players.filter(player => player.id !== player1).map((player) => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </select>
            </div>

            {/* プレイヤー2のスコア */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">プレイヤー2のスコア</label>
              <input
                type="number"
                value={score2}
                onChange={(e) => setScore2(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="スコアを入力"
                min="0"
                required
                disabled={submitting}
              />
            </div>

            {/* 登録ボタン */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                submitting 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {submitting ? '登録中...' : '試合結果を登録'}
            </button>
          </div>
        </form>

        {/* 成功メッセージ */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-green-600 mb-2">登録完了</h3>
              <p className="text-gray-600">試合結果が正常に登録されました</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
