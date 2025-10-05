"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Send } from "lucide-react"
import Link from "next/link"

interface Post {
  id: string
  author: string
  content: string
  timestamp: string
  likes: number
  comments: number
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "John Doe",
      content: "Just had a wonderful family dinner! Missing those who couldn't make it.",
      timestamp: "2 hours ago",
      likes: 5,
      comments: 2,
    },
  ])
  const [newPost, setNewPost] = useState("")

  const handlePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: "You",
        content: newPost,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
      }
      setPosts([post, ...posts])
      setNewPost("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <h1 className="text-2xl font-bold text-indigo-600">New Family Tree</h1>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Family Wall</h2>
          <p className="text-gray-600">Share updates with your family</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What's on your mind?</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Share something with your family..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="mb-4"
              rows={4}
            />
            <Button onClick={handlePost} disabled={!newPost.trim()}>
              <Send className="w-4 h-4 mr-2" />
              Post
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-base">{post.author}</CardTitle>
                      <p className="text-sm text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex items-center gap-4 pt-2 border-t">
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    {post.likes} Likes
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {post.comments} Comments
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
