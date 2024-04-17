import { getAllPostSlugs } from "./lib/blogs";

const BlogsPage = () => {
  const posts = getAllPostSlugs();
  return (
    <main className="flex min-h-screen flex-col items-center p-4 text-center">
      <h1 className="text-4xl font-bold mb-8">Check out some of my blogs</h1>
      <ul className="flex flex-col items-center">
        {posts.map((post) => (
          <li key={post.params.slug} className="mb-4">
            <a href={`/blog/${post.params.slug}`} className="text-blue-500 hover:underline">
              {post.params.slug}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default BlogsPage;