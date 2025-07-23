import Image from 'next/image'
import { GetStaticProps } from 'next'

type Movie = {
  Title: string
  Year: string
  Runtime: string
  Poster?: string
}

type HomeProps = {
  movie: Movie
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const res = await fetch('https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies')
  let movies: Movie[] = await res.json()

  const movie = movies[Math.floor(Math.random() * movies.length)]

  return {
    props: {
      movie,
    },
  }
}

export default function Home({ movie }: HomeProps) {
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

      <h2>Featured Movie</h2>
      <div>
        {movie.Poster ? (
          <img src={movie.Poster} alt={movie.Title} />
        ) : (
          <div>No Image</div>
        )}
        <h3>{movie.Title}</h3>
        <p>{movie.Year} • {movie.Runtime}</p>
      </div>
    </div>
  )
}
