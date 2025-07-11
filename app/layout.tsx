
import './globals.css'

export const metadata = {
  title: 'シャッフルボードランキング',
  description: 'シャッフルボードの競技ランキングアプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="antialiased" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
