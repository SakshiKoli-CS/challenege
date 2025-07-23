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

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function Home({ movies }: HomeProps) {
  const [shuffledMovies, setShuffledMovies] = useState<Movie[]>([])

  useEffect(() => {
    setShuffledMovies(shuffleArray(movies))
  }, [movies])

  return (
    <div>
      <h1>Oswald</h1>

      <div>
        <Image
          src="/OswaldCartoon.webp"
          alt="Oswald"
          width={300}
          height={450}
        />
      </div>

      <p>My Favorite Childhood Cartoon ❤️</p>

      <h2>Movie List</h2>
      <div>
        {shuffledMovies.map((movie, index) => (
          <div key={index}>
            {movie.Poster ? (
              <img src={movie.Poster} alt={movie.Title} />
            ) : (
              <div>No Image</div>
            )}
            <h3>{movie.Title}</h3>
            <p>{movie.Year} • {movie.Runtime}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
