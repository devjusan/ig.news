import Image from "next/image";
import { SignInButton } from "./sign-in-button";
import ActiveLink from "../active-link";
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
          <ActiveLink activeClassName={styles.active} href="/" prefetch>
            <a className={styles.active}>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
