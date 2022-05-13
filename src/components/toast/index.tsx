import { useState } from "react";
import styles from "./styles.module.scss";

interface IToast {
    message: string
    error: boolean
}

export function Toast({message, error}: IToast) {
    const [timer, setTimer] = useState(0)

    setTimeout(() => {
        setTimer((state) => state = 1)
    }, 1000);

    if (timer === 5) {
        clearTimeout()
    }

  return (
    timer < 6 ? error ? <aside id={styles.container} className={styles.error}><p>{message}</p></aside> : <aside id={styles.container} className={styles.success}><p>{message}</p></aside> : null
  );
}
