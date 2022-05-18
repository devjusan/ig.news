class StripeUtils {
  constructor() {}

  static CHECKOUT = {
    SESSION_COMPLETED: "checkout.session.completed",
  };

  static CUSTOMER = {
    UPDATED: "customer.subscription.updated",
    DELETED: "customer.subscription.deleted",
  };

  static PAYMENT = {
    SUCCESS: "payment_intent.succeeded",
  };

  static has = (type: string) => this.relevantEvents.has(type);

  static relevantEvents = new Set([
    this.CHECKOUT.SESSION_COMPLETED,
    this.CUSTOMER.DELETED,
    this.CUSTOMER.UPDATED,
    this.PAYMENT,
  ]);
}

export default StripeUtils;
