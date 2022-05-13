import { useEffect, useState } from "react";
import { unmountComponentAtNode } from "react-dom";

import styles from "./styles.module.scss";

interface IToast {
  message: string;
  error: boolean;
}

export function Toast({ message, error }: IToast) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);

    return () => clearTimeout(interval);
  }, [counter]);

  return counter < 6 ? (
    error ? (
      <aside id={styles.container} className={styles.error}>
        <p>{message}</p>
      </aside>
    ) : (
      <aside id={styles.container} className={styles.success}>
        <p>{message}</p>
      </aside>
    )
  ) : (
    <></>
  );
}
