import Head from "next/head";
import { GetStaticProps } from "next";
import { createClient } from "../../../prismicio.config";
import { RichText } from "prismic-dom";
import styles from "./styles.module.scss";
import { formatDate } from "../../utils/formatter.utils";

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
            <a key={slug} href="#">
              <time>{updatedAt}</time>
              <strong>{title}</strong>
              <p>{summary}</p>
            </a>
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
  const formattedPosts = posts.map((post) => ({
    slug: post.uid,
    title: RichText.asText(post.data.title),
    summary:
      post.data.content.find(
        (content: { type: string }) => content.type === "paragraph"
      ).text ?? "",
    updatedAt: formatDate(post.last_publication_date),
  }));

  return { props: { posts: formattedPosts }, revalidate: ONE_HOUR };
};
