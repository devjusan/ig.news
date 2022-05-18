import { GetStaticPaths, GetStaticProps } from "next";
import { RichText } from "prismic-dom";
import { formatDate } from "../../../utils/formatter.utils";
import { createClient } from "../../../../prismicio.config";
import { useCallback, useEffect } from "react";
import Head from "next/head";
import DOMPurify from "isomorphic-dompurify";
import styles from "../post.module.scss";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface IPostPreview {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

const PostPreview = ({
  post: { content, slug, title, updatedAt },
}: IPostPreview) => {
  const { data: session } = useSession();
  const { push } = useRouter();
  const sanitizedContent = useCallback(() => {
    return DOMPurify.sanitize(content);
  }, [content]);

  useEffect(() => {
    if (session?.activeSubscription) {
      push(`/posts/${slug}`);
    }
  }, [push, slug, session]);

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
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: sanitizedContent() }}
          ></div>
          <div className={styles.continueReading}>
            Wanna continue reading?{" "}
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
};

export default PostPreview;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  previewData,
}) => {
  const { slug } = params;

  const prismicClient = createClient({ previewData });
  const prismicData = await prismicClient.getByUID("posts", slug.toString());
  const post = {
    slug: slug.toString(),
    title: RichText.asText(prismicData.data.title),
    content: RichText.asHtml(prismicData.data.content.slice(0, 3)),
    updatedAt: formatDate(prismicData.last_publication_date),
  };
  const HALF_HOUR = 30 * 60;

  return { props: { post }, revalidate: HALF_HOUR };
};
