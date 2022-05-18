import Image from "next/image";
import Link from "next/link";
import { SignInButton } from "./sign-in-button";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src="/images/logo.svg"
          alt="Logo da ig.news"
          width={110}
          height={87}
          priority
        />
        <nav>
          <Link href="/" prefetch>
            <a className={styles.active}>Home</a>
          </Link>
          <Link href="/posts">
            <a>Posts</a>
          </Link>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
