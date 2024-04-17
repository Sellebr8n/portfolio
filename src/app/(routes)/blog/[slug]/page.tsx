import { getAllPostSlugs, getPostData } from '../lib/blogs';

type Params = {
  slug: string;
};

type Props = {
  params: Params;
};

type PostData = {
  title: string;
  date: string;
  content: string;
};

export async function generateMetadata({ params }: Props) {
  const post = await getPostData(params.slug);
  return {
    title: post.title,
  };
}

export default async function Blog({ params }: Props) {
  const post: PostData = await getPostData(params.slug);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="font-extrabold text-3xl mb-1">{post.title}</h1>

      <div className="text-gray-500 font-medium mb-5">
        <time dateTime={post.date}>{post.date}</time>
      </div>

      <div className="text-gray-600 prose" dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
}
