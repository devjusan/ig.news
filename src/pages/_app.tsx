import { Header } from "../components/header";
import { SessionProvider } from "next-auth/react";
import "../styles/global.scss";
import { PrismicProvider } from "@prismicio/react";
import { linkResolver, repositoryName } from "../../prismicio.config";
import Link from "next/link";
import { PrismicPreview } from "@prismicio/next";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, ...props }) => (
        <Link href={href}>
          <a {...props}>{children}</a>
        </Link>
      )}
    >
      <SessionProvider session={session}>
        <PrismicPreview repositoryName={repositoryName}>
          <Header />
          <Component {...pageProps} />
        </PrismicPreview>
      </SessionProvider>
    </PrismicProvider>
  );
}

export default MyApp;
