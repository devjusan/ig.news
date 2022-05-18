import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { RichText } from "prismic-dom";
import { formatDate } from "../../utils/formatter.utils";
import { createClient } from "../../../prismicio.config";
import { useCallback } from "react";
import Head from "next/head";
import DOMPurify from "isomorphic-dompurify";
import styles from "./post.module.scss";

interface IPost {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

const Post = ({ post: { content, slug, title, updatedAt } }: IPost) => {
  const sanitizedContent = useCallback(() => {
    return DOMPurify.sanitize(content);
  }, [content]);

  return (
    <>
      <Head>
        <title>{title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{title}</h1>
          <time>{updatedAt}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: sanitizedContent() }}
          ></div>
        </article>
      </main>
    </>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
  previewData,
}) => {
  const session = await getSession({ req });
  const { slug } = params;
  console.log(session);

  const prismicClient = createClient({ previewData });
  const prismicData = await prismicClient.getByUID("posts", slug.toString());
  const post = {
    slug: slug.toString(),
    title: RichText.asText(prismicData.data.title),
    content: RichText.asHtml(prismicData.data.content),
    updatedAt: formatDate(prismicData.last_publication_date),
  };

  return { props: { post } };
};
