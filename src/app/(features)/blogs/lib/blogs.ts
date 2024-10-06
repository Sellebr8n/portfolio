import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(`${process.cwd()}/src/app/(features)/blogs/(posts)`);

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as { date: string; title: string }),
    };
  });

  return allPostsData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getAllPostSlugs() {
  const files = fs.readdirSync(postsDirectory);
  return files.map((file) => ({
    params: {
      slug: file.replace(/\.md$/, ''),
    },
  }));
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    content: contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
