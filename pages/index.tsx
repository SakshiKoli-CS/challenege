import Image from 'next/image'
import { GetStaticProps } from 'next'

type Movie = {
  Title: string
  Year: string
  Runtime: string
  Poster?: string
}

type HomeProps = {
  movies: Movie[]
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const res = await fetch('https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies')
  let movies: Movie[] = await res.json()

  movies = movies.sort(() => Math.random() - 0.5)

  return {
    props: {
      movies,
    },
  }
}

export default function Home({ movies }: HomeProps) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎥 Shuffled Movies (Static Site)</h1>
      <p>Refresh the page — the order won't change unless you rebuild.</p>

      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            {index + 1}. <strong>{movie.Title}</strong> ({movie.Year})
          </li>
        ))}
      </ul>
    </div>
  )
}
