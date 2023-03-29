import React from 'react'
// folder name must be [id].js
const SingleService = () => {
  return <div>SingleService</div>
}

export default SingleService

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    'https://boltsign.herokuapp.com/api/v1/products/static'
  )
  const posts = await res.json()
  const paths = posts.products.map((post) => ({
    params: { id: post._id },
  }))

  return { paths, fallback: true }
}
// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://boltsign.herokuapp.com/api/v1/products/static/${params.id}`
  )
  const post = await res.json()

  // Pass post data to the page via props
  return { props: { post } }
}
