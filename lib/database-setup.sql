
-- プレーヤーテーブル
CREATE TABLE players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  score INTEGER DEFAULT 1500,
  games INTEGER DEFAULT 0,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  profile_image TEXT,
  join_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 試合結果テーブル
CREATE TABLE matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player1_id UUID REFERENCES players(id) ON DELETE CASCADE,
  player2_id UUID REFERENCES players(id) ON DELETE CASCADE,
  player1_score INTEGER NOT NULL,
  player2_score INTEGER NOT NULL,
  match_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス作成
CREATE INDEX idx_players_score ON players(score DESC);
CREATE INDEX idx_matches_date ON matches(match_date DESC);
CREATE INDEX idx_matches_player1 ON matches(player1_id);
CREATE INDEX idx_matches_player2 ON matches(player2_id);

-- updated_at の自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_players_updated_at 
  BEFORE UPDATE ON players 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- サンプルデータの挿入
INSERT INTO players (name, score, games, wins, losses, profile_image, join_date) VALUES
('田中太郎', 2150, 45, 32, 13, 'https://readdy.ai/api/search-image?query=professional%20male%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profile1&orientation=squarish', '2023-08-01'),
('佐藤花子', 2080, 38, 28, 10, 'https://readdy.ai/api/search-image?query=professional%20female%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profile2&orientation=squarish', '2023-09-01'),
('山田次郎', 2020, 42, 26, 16, 'https://readdy.ai/api/search-image?query=professional%20male%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profile3&orientation=squarish', '2023-07-01'),
('鈴木一郎', 1980, 35, 22, 13, 'https://readdy.ai/api/search-image?query=professional%20male%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profile4&orientation=squarish', '2023-10-01'),
('高橋美咲', 1950, 40, 24, 16, 'https://readdy.ai/api/search-image?query=professional%20female%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profile5&orientation=squarish', '2023-06-01'),
('伊藤健太', 1920, 33, 20, 13, 'https://readdy.ai/api/search-image?query=professional%20male%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profile6&orientation=squarish', '2023-11-01'),
('渡辺由美', 1890, 37, 21, 16, 'https://readdy.ai/api/search-image?query=professional%20female%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profile7&orientation=squarish', '2023-05-01'),
('中村大輔', 1860, 29, 17, 12, 'https://readdy.ai/api/search-image?query=professional%20male%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profile8&orientation=squarish', '2023-12-01'),
('小林達也', 1780, 15, 10, 5, 'https://readdy.ai/api/search-image?query=professional%20male%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profile18&orientation=squarish', '2023-12-01'),
('松本真理', 1720, 12, 8, 4, 'https://readdy.ai/api/search-image?query=professional%20female%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profile19&orientation=squarish', '2024-01-01'),
('新田雅人', 1650, 8, 5, 3, 'https://readdy.ai/api/search-image?query=professional%20male%20athlete%20portrait%2C%20confident%20expression%2C%20sport%20uniform%2C%20high%20quality%20headshot%2C%20clean%20background%2C%20realistic%20photography%20style&width=120&height=120&seq=profile20&orientation=squarish', '2024-01-01');

-- サンプル試合データの挿入
INSERT INTO matches (player1_id, player2_id, player1_score, player2_score, match_date) VALUES
((SELECT id FROM players WHERE name = '田中太郎'), (SELECT id FROM players WHERE name = '佐藤花子'), 15, 12, '2024-01-15 14:30:00'),
((SELECT id FROM players WHERE name = '山田次郎'), (SELECT id FROM players WHERE name = '鈴木一郎'), 21, 18, '2024-01-15 13:45:00'),
((SELECT id FROM players WHERE name = '高橋美咲'), (SELECT id FROM players WHERE name = '伊藤健太'), 17, 14, '2024-01-15 12:20:00'),
((SELECT id FROM players WHERE name = '渡辺由美'), (SELECT id FROM players WHERE name = '中村大輔'), 16, 13, '2024-01-15 11:30:00'),
((SELECT id FROM players WHERE name = '佐藤花子'), (SELECT id FROM players WHERE name = '高橋美咲'), 19, 16, '2024-01-14 15:00:00');
