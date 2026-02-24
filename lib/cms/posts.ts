import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/posts");

export async function getAllPosts() {
  const files = await fs.readdir(postsDir).catch(() => []);
  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(postsDir, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title ?? "Untitled"),
        excerpt: String(data.excerpt ?? ""),
        category: String(data.category ?? "General")
      };
    })
  );
  return posts;
}
