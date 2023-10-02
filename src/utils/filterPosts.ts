import { Post } from '@/types'

//helper func for filtering posts.
//as type: im getting "user","des","all" for filtering user, description or both
export const filterPostsHelper = (
  posts: Post[],
  searchQuery: string,
  type: string
) =>
  posts.filter((post) => {
    const usernameMatch = post.username
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const descriptionMatch = post.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase())

    if (usernameMatch && (type === 'user' || type === 'all')) {
      return usernameMatch
    }
    if (descriptionMatch && (type === 'desc' || type === 'all')) {
      return descriptionMatch
    }
  })
