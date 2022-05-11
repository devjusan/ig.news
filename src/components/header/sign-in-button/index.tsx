import { signIn, signOut, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";

export const SignInButton = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  console.log(session, status);

  return isAuthenticated ? (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX
        color="#737380"
        className={styles.closedIcon}
        onClick={signOut.bind(SignInButton)}
      ></FiX>
    </button>
  ) : (
    <button
      onClick={signIn.bind(SignInButton, "github")}
      type="button"
      className={styles.signInButton}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
};
