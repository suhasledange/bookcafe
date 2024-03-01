import Link from 'next/link'

const page = () => {
  return (
    <div>
      <Link href="/book/b1">b1</Link>
      <Link href="/book/b2">b2</Link>
      <Link href="/book/b3">b3</Link>
    </div>
  )
}

export default page
