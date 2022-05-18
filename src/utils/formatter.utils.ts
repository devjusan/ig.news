import { RichText } from "prismic-dom";
import * as prismicT from "@prismicio/types";

export const formatDate = (date: string) => {
  const _date = new Date(date);

  return _date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const formatPrismicPosts = (
  posts: prismicT.PrismicDocument<Record<string, any>, string, string>[]
) =>
  posts.map((post) => ({
    slug: post.uid,
    title: RichText.asText(post.data.title),
    summary:
      post.data.content.find(
        (content: { type: string }) => content.type === "paragraph"
      ).text ?? "",
    updatedAt: formatDate(post.last_publication_date),
  }));
