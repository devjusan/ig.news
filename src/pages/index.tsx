import Head from "next/head";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { SubscribeButton } from "../components/subscribe-button";
import styles from "./home.module.scss";
import { stripe } from "../services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home - ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get acess to all the publications <br />
            <span>for ${product.amount}</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <Image
          src="/images/avatar.svg"
          alt="Girl coding"
          width={800}
          height={800}
        />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const API_ID = "price_1Kv8RwLGr7l9YRYlgYnQYdX9";
  const price = await stripe.prices.retrieve(API_ID, { expand: ["product"] });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return { props: { product } };
};
