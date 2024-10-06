import Link from 'next/link';
import { getAllPostSlugs } from './lib/blogs';

const BlogsPage = () => {
  const posts = getAllPostSlugs();
  return (
    <section className="py-16 bg-gray-50 h-full">
      <h2 className="text-3xl font-bold text-center text-gray-800">Some of my projects</h2>
      <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
        {posts.map((post) => (
          <Link
            href={`/blogs/${post.params.slug}`}
            key={`/blogs/${post.params.slug}`}
            className="bg-white shadow-md rounded-lg p-6">
            <img
              src="/images/redux.svg"
              alt="Laget.se"
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">{post.params.slug}</h3>
            {/* <p className="text-gray-500 mt-2">{link.description}</p> */}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogsPage;
