import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import api from "../../services/api";
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

    await handleRequest();
  }, [session]);

  const handleRequest = async () => {
    try {
      const response = await api.post("/checkout");
      const stripe = await getStripeJs();

      const { sessionId } = response.data;

      await stripe.redirectToCheckout({ sessionId });
      setError(false);
    } catch (error) {
      console.log(error.message);

      setError(true);
    }
  };

  useEffect(() => {
    return () => setError(false);
  }, []);

  return (
    <>
      <button
        type="button"
        className={styles.subscribeButton}
        onClick={handleSubscribe}
      >
        {" "}
        subscribe now
      </button>
      {error && <Toast message="Ocorreu um erro na requisição" error />}
    </>
  );
};
