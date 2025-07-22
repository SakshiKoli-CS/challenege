import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

type Post = {
  userId: number
  id: number
  title: string
  body: string
  timestamp: string
}

type PostPageProps = {
  post: Post
}

const BASE_URL = 'https://challenege.devcontentstackapps.com'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [1, 2, 3, 4, 5].map((id) => ({
    params: { id: id.toString() },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<PostPageProps> = async (context) => {
  const { id } = context.params as { id: string }

  try {
    const res = await fetch(`${BASE_URL}/api/posts/${id}`)

    if (!res.ok) {
      return { notFound: true }
    }

    const post = await res.json()

    return {
      props: {
        post,
      },
      revalidate: 10,
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

export default function PostPage({ post }: PostPageProps) {
  const router = useRouter()

  if (router.isFallback) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Post #{post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>
        <strong>Timestamp:</strong> {post.timestamp}
      </p>
    </div>
  )
}
