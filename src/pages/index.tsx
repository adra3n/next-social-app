import { NextPage } from 'next'

const posts = ['a', 'a', 'a', 'a']

const Home: NextPage = () => {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">Home</h1>
      {posts.map((post) => (
        <div>{post}</div>
      ))}
    </div>
  )
}

export default Home
