import { getPostData } from '../lib/blogs';

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
    <main className="flex flex-col p-8 container mx-auto prose">
        <h1 className="font-extrabold text-3xl mb-1">{post.title}</h1>

        <div className="text-gray-500 font-medium mb-5">
          <time dateTime={post.date}>{post.date}</time>
        </div>

      <div
        className="text-gray-700"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}
