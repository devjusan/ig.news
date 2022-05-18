import { GetStaticProps } from "next";
import { formatPrismicPosts } from "../../utils/prismic.utils";
import { createClient } from "../../../prismicio.config";
import Head from "next/head";
import Link from "next/link";
import styles from "./styles.module.scss";

type Post = {
  slug: string;
  title: string;
  summary: string;
  updatedAt: string;
};

interface IProps {
  posts: Post[];
}

const Posts = ({ posts }: IProps) => {
  return (
    <>
      <Head>
        <title>Posts / Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.postsList}>
          {" "}
          {[...posts].map(({ slug, updatedAt, title, summary }) => (
            <Link key={slug} href={`/posts/${slug}`}>
              <a key={slug}>
                <time>{updatedAt}</time>
                <strong>{title}</strong>
                <p>{summary}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const ONE_HOUR = 60 * 30;
  const client = createClient({ previewData });
  const posts = await client.getAllByType("posts", {
    fetchLinks: ["posts.title", "posts.content", "posts.uid"],
    pageSize: 50,
  });
  const formattedPosts = formatPrismicPosts(posts);

  return { props: { posts: formattedPosts }, revalidate: ONE_HOUR };
};
