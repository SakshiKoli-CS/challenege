import { useEffect, useState } from 'react'
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
  const movies: Movie[] = await res.json()

  return {
    props: {
      movies,
    },
  }
}

export default function Home({ movies }: HomeProps) {
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    const randomMovie = movies[Math.floor(Math.random() * movies.length)]
    setMovie(randomMovie)
  }, [movies])

  if (!movie) return <p>Loading...</p>

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Oswaldddddd !!!!</h1>

      <div>
        <Image
          src="/OswaldCartoon.webp"
          alt="Oswald"
          width={300}
          height={450}
        />
      </div>

      <p>My Favorite Childhood Cartoon </p>

      <h2>Random Movie (client-only)</h2>
      <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem' }}>
        {movie.Poster ? (
          <img src={movie.Poster} alt={movie.Title} width={200} />
        ) : (
          <div>No Image Available</div>
        )}
        <h3>{movie.Title}</h3>
        <p>{movie.Year} • {movie.Runtime}</p>
      </div>
    </div>
  )
}
