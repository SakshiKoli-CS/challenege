import { GetServerSideProps } from 'next'

type Product = {
  id: number
  title: string
  description: string
  price: number
  images: string[]
  category: {
    id: number
    name: string
    image: string
  }
  randomNum: number
}

type Props = {
  product: Product
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch('https://api.escuelajs.co/api/v1/products')
  const allProducts = await res.json()

  const randomIndex = Math.floor(Math.random() * allProducts.length)
  const selectedProduct = allProducts[randomIndex]

  const product: Product = {
    ...selectedProduct,
    randomNum: Math.floor(Math.random() * 1000) + 1,
  }

  return {
    props: {
      product,
    },
  }
}

export default function ShuffleProducts({ product }: Props) {
  return (
    <div>
      <h1>Random Product</h1>

      <img
        src={product.images[0]}
        alt={product.title}
        width="150"
        height="150"
      />

      <h2>{product.title}</h2>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category.name}</p>
      <p>Description: {product.description}</p>
      <p>Random Number: {product.randomNum}</p>
    </div>
  )
}
