export interface User {
  id: number
  username: string
  fullName: string
  profileImg: string
}

export interface Comment {
  id: number
  userId: number
  text: string
  username: string
}

export interface Post {
  id: number
  userId: number
  imageUrl: string
  description: string
  comments: Comment[]
  likes: number
  isLiked: boolean
}
