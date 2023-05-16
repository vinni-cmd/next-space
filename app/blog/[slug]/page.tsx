export const revalidate = 1200; // not necessary, just for ISR demonstration/ can also control caching at the fetch level with the cache option object

interface Post {
  title: string;
  slug: string;
  content: string;
}

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts: Post[] = await fetch(`http://localhost:3000/api/content`).then(
    (res) => res.json()
  );
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostpage({ params: { slug } }: Props) {
  let post: Post | undefined;

  try {
    const res = await fetch(`http://localhost:3000/api/content`);
    const posts: Post[] = await res.json();
    post = posts.find((post) => post.slug === slug);
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
    </div>
  );
}
