import styles from "./styles.module.scss";
import Head from "next/head";
const Posts = () => {
  return (
    <>
      <Head>
        <title>Posts / Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.postsList}>
          <a href="#">
            <time>12 de marco de 2021</time>
            <strong>Creating a monorepo with Lerna Yrn Workspaces</strong>
            <p>
              in this guide kaskdkak a ksdklaoi wi owei owi how to create
              jdaisjhd h wh uabduabsd b uw uw wu uuwu{" "}
            </p>
          </a>
          <a href="#">
            <time>12 de marco de 2021</time>
            <strong>Creating a monorepo with Lerna Yrn Workspaces</strong>
            <p>
              in this guide kaskdkak a ksdklaoi wi owei owi how to create
              jdaisjhd h wh uabduabsd b uw uw wu uuwu{" "}
            </p>
          </a>
          <a href="#">
            <time>12 de marco de 2021</time>
            <strong>Creating a monorepo with Lerna Yrn Workspaces</strong>
            <p>
              in this guide kaskdkak a ksdklaoi wi owei owi how to create
              jdaisjhd h wh uabduabsd b uw uw wu uuwu{" "}
            </p>
          </a>
        </div>
      </main>
    </>
  );
};

export default Posts;
