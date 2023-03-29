import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Services = ({ posts }) => {
  const { products } = posts
  return (
    <div>
      {products.map((item) => {
        return (
          <div className='container' key={item._id}>
            <p>{item.category}</p>
            <p>{item.title}</p>

            <div className='image-box'>
              <Image
                src={item.uploadImage[0].secure_url}
                alt={item.title}
                fill
                priority
              />
            </div>
            <Link href={`/services/[id]`} as={`/services/${item._id}`}>
              <button className='btn view'>View</button>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Services

export async function getStaticProps() {
  const res = await fetch(
    'https://boltsign.herokuapp.com/api/v1/products/static'
  )
  const posts = await res.json()

  return {
    props: {
      posts,
    },
  }
}
