import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { RichText } from "prismic-dom";
import { formatDate } from "../../utils/formatter.utils";
import { createClient } from "../../../prismicio.config";
import Head from "next/head";
import DOMPurify from "dompurify";
import styles from "./post.module.scss";

interface IPost {
  prismicPost: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

const Post = ({ prismicPost: { content, slug, title, updatedAt } }: IPost) => {
  return (
    <>
      <Head>
        <title>{title} | Ignews</title>
      </Head>

      <main>
        <article>
          <h1>{title}</h1>
          <time>{updatedAt}</time>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
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
  const { slug } = params;
  const session = await getSession({ req });
  const prismicClient = createClient({ previewData });
  const prismicData = await prismicClient.getByUID("posts", slug.toString());

  const prismicPost = {
    slug,
    title: RichText.asText(prismicData.data.title),
    content: DOMPurify.sanitize(RichText.asHtml(prismicData.data.content)),
    updatedAt: formatDate(prismicData.last_publication_date),
  };

  return { props: prismicPost };
};
