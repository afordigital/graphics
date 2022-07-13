import PostData from './data/json1.json'

export default function createPointsArray () {
  const points = PostData.map(postDetail => {
    const { id } = postDetail
    return { id }
  })
  console.log(points)
  return points
}
