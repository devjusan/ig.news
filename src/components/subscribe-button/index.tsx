import { signIn, useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import styles from "./styles.module.scss";
import axios from "../../services/axios";
import getStripeJs from "../../services/browser-stripe";
import { Toast } from "../toast";

interface ISubscribeButtonProps {
  priceId: string;
}

export const SubscribeButton = ({ priceId }: ISubscribeButtonProps) => {
  const [error, setError] = useState(false);
  const { data: session, status } = useSession();

  const handleSubscribe = useCallback(async () => {
    if (!session) {
      signIn("github");
      return;
    }

    try {
      const response = await axios.post("/checkout");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout(sessionId);
    } catch (error) {
      setError(true);
    }
  }, [session]);

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      {" "}
      subscribe now
      {error && <Toast message="Ocorreu um erro na requisição" error />}
    </button>
  );
};
