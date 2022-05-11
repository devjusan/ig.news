import styles from "./styles.module.scss";

interface ISubscribeButtonProps {
  priceId: string;
}

export const SubscribeButton = ({ priceId }: ISubscribeButtonProps) => (
  <button type="button" className={styles.subscribeButton}>
    {" "}
    subscribe
  </button>
);
