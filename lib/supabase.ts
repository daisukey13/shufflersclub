
import { createClient } from '@supabase/supabase-js'

// 実際のSupabase設定に置き換えてください
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-url.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

// 設定が正しくない場合はnullクライアントを作成
let supabase: any = null

try {
  if (supabaseUrl.includes('your-project-url') || supabaseKey.includes('your-anon-key')) {
    console.warn('Supabase設定が未完了です。モックデータを使用します。')
    supabase = null
  } else {
    supabase = createClient(supabaseUrl, supabaseKey)
  }
} catch (error) {
  console.warn('Supabase接続に失敗しました。モックデータを使用します。')
  supabase = null
}

// モックデータ
const mockPlayers = [
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
  },
  { 
    id: '4', 
    name: "鈴木美咲", 
    score: 1980, 
    games: 35, 
    wins: 22, 
    losses: 13,
    profile_image: 'https://readdy.ai/api/search-image?query=professional%20female%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profile4&orientation=squarish',
    join_date: "2023年10月",
    created_at: new Date().toISOString()
  },
  { 
    id: '5', 
    name: "高橋健太", 
    score: 1950, 
    games: 40, 
    wins: 24, 
    losses: 16,
    profile_image: 'https://readdy.ai/api/search-image?query=professional%20male%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profile5&orientation=squarish',
    join_date: "2023年6月",
    created_at: new Date().toISOString()
  },
  { 
    id: '6', 
    name: "中村愛", 
    score: 1920, 
    games: 33, 
    wins: 20, 
    losses: 13,
    profile_image: 'https://readdy.ai/api/search-image?query=professional%20female%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profile6&orientation=squarish',
    join_date: "2023年11月",
    created_at: new Date().toISOString()
  }
]

const mockMatches = [
  { 
    id: '1',
    player1_id: '1',
    player2_id: '2',
    player1: { name: "田中太郎" },
    player2: { name: "佐藤花子" },
    player1_score: 15,
    player2_score: 12,
    match_date: "2024-01-15T14:20:00Z"
  },
  { 
    id: '2',
    player1_id: '2',
    player2_id: '3',
    player1: { name: "佐藤花子" },
    player2: { name: "山田次郎" },
    player1_score: 21,
    player2_score: 18,
    match_date: "2024-01-14T16:30:00Z"
  }
]

// プレーヤー関連の関数
export const playersAPI = {
  // 全プレーヤーを取得
  async getAll() {
    if (!supabase) {
      return mockPlayers
    }
    
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    } catch (error) {
      console.warn('Supabaseからのデータ取得に失敗しました。モックデータを使用します。')
      return mockPlayers
    }
  },

  // プレーヤーをIDで取得
  async getById(id: string) {
    if (!supabase) {
      return mockPlayers.find(p => p.id === id) || null
    }
    
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.warn('Supabaseからのデータ取得に失敗しました。モックデータを使用します。')
      return mockPlayers.find(p => p.id === id) || null
    }
  },

  // 新しいプレーヤーを作成
  async create(player: {
    name: string
    profile_image?: string
    join_date?: string
  }) {
    if (!supabase) {
      const newPlayer = {
        id: String(mockPlayers.length + 1),
        ...player,
        score: 1500,
        games: 0,
        wins: 0,
        losses: 0,
        created_at: new Date().toISOString()
      }
      mockPlayers.push(newPlayer)
      return newPlayer
    }
    
    try {
      const { data, error } = await supabase
        .from('players')
        .insert([{
          ...player,
          score: 1500,
          games: 0,
          wins: 0,
          losses: 0,
          created_at: new Date().toISOString()
        }])
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.warn('Supabaseへのデータ保存に失敗しました。')
      throw error
    }
  },

  // プレーヤー情報を更新
  async update(id: string, updates: {
    name?: string
    score?: number
    games?: number
    wins?: number
    losses?: number
    profile_image?: string
  }) {
    if (!supabase) {
      const playerIndex = mockPlayers.findIndex(p => p.id === id)
      if (playerIndex !== -1) {
        mockPlayers[playerIndex] = { ...mockPlayers[playerIndex], ...updates }
        return mockPlayers[playerIndex]
      }
      return null
    }
    
    try {
      const { data, error } = await supabase
        .from('players')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.warn('Supabaseへのデータ更新に失敗しました。')
      throw error
    }
  },

  // ランキング順でプレーヤーを取得
  async getRanking() {
    if (!supabase) {
      return [...mockPlayers].sort((a, b) => b.score - a.score)
    }
    
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('score', { ascending: false })
      
      if (error) throw error
      return data
    } catch (error) {
      console.warn('Supabaseからのデータ取得に失敗しました。モックデータを使用します。')
      return [...mockPlayers].sort((a, b) => b.score - a.score)
    }
  }
}

// 試合結果関連の関数
export const matchesAPI = {
  // 全試合結果を取得
  async getAll() {
    if (!supabase) {
      return mockMatches
    }
    
    try {
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          player1:players!matches_player1_id_fkey(name, profile_image),
          player2:players!matches_player2_id_fkey(name, profile_image)
        `)
        .order('match_date', { ascending: false })
      
      if (error) throw error
      return data
    } catch (error) {
      console.warn('Supabaseからのデータ取得に失敗しました。モックデータを使用します。')
      return mockMatches
    }
  },

  // プレーヤーの試合履歴を取得
  async getByPlayerId(playerId: string) {
    if (!supabase) {
      return mockMatches.filter(m => m.player1_id === playerId || m.player2_id === playerId)
    }
    
    try {
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          player1:players!matches_player1_id_fkey(name, profile_image),
          player2:players!matches_player2_id_fkey(name, profile_image)
        `)
        .or(`player1_id.eq.${playerId},player2_id.eq.${playerId}`)
        .order('match_date', { ascending: false })
        .limit(10)
      
      if (error) throw error
      return data
    } catch (error) {
      console.warn('Supabaseからのデータ取得に失敗しました。モックデータを使用します。')
      return mockMatches.filter(m => m.player1_id === playerId || m.player2_id === playerId)
    }
  },

  // 新しい試合結果を登録
  async create(match: {
    player1_id: string
    player2_id: string
    player1_score: number
    player2_score: number
    match_date?: string
  }) {
    if (!supabase) {
      const newMatch = {
        id: String(mockMatches.length + 1),
        ...match,
        match_date: match.match_date || new Date().toISOString()
      }
      mockMatches.push(newMatch)
      return newMatch
    }
    
    try {
      const { data, error } = await supabase
        .from('matches')
        .insert([{
          ...match,
          match_date: match.match_date || new Date().toISOString()
        }])
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.warn('Supabaseへのデータ保存に失敗しました。')
      throw error
    }
  }
}

export { supabase }

// データベース型定義
export interface Player {
  id: string
  name: string
  score: number
  games: number
  wins: number
  losses: number
  profile_image?: string
  join_date?: string
  created_at: string
}

export interface Match {
  id: string
  player1_id: string
  player2_id: string
  player1_score: number
  player2_score: number
  match_date: string
  created_at?: string
}
