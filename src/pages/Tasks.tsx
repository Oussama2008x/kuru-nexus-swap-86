import React from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send } from 'lucide-react';

const Tasks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Tasks & Rewards</h1>
          <p className="text-muted-foreground">
            Complete these tasks to support Kerdium and earn rewards
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {/* Telegram Follower Task */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#0088cc] rounded-full flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Follow us on Telegram</h3>
                  <p className="text-muted-foreground mb-4">
                    Join our Telegram channel for the latest updates and announcements
                  </p>
                  <a
                    href="https://t.me/kerdium"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-[#0088cc] text-white rounded-lg hover:bg-[#0077bb] transition-colors gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Follow on Telegram
                  </a>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-500">+100</div>
                  <div className="text-sm text-muted-foreground">Points</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Twitter Follower Task */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Follow us on X (Twitter)</h3>
                  <p className="text-muted-foreground mb-4">
                    Follow our official X account for real-time updates and community engagement
                  </p>
                  <a
                    href="https://x.com/kerdium?t=HVZunzChvjWb9FFqf0gZZw&s=09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Follow on X
                  </a>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-500">+150</div>
                  <div className="text-sm text-muted-foreground">Points</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Twitter Like Task */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Like our X Post</h3>
                  <p className="text-muted-foreground mb-4">
                    Show your support by liking our announcement post on X
                  </p>
                  <a
                    href="https://x.com/kerdium/status/1951331130197549410?t=HVZunzChvjWb9FFqf0gZZw&s=19"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    Like Post
                  </a>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-500">+50</div>
                  <div className="text-sm text-muted-foreground">Points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Tasks;