import { getAllPosts } from "@/lib/cms/posts";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="container-shell py-24">
      <h1 className="text-4xl font-bold">Research & Writeups</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="glass rounded-2xl p-6">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-slate-400">{post.category}</p>
            <p className="mt-3 text-slate-300">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
