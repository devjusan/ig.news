class StripeUtils {
  constructor() {}

  static CHECKOUT = {
    SESSION_COMPLETED: "checkout.session.completed",
  };

  static CUSTOMER = {
    UPDATED: "customer.subscription.updated",
    DELETED: "customer.subscription.deleted",
    CREATED: "customer.subscription.created",
  };

  static has = (type: string) => this.relevantEvents.has(type);

  static relevantEvents = new Set([
    this.CHECKOUT.SESSION_COMPLETED,
    this.CUSTOMER.DELETED,
    this.CUSTOMER.UPDATED,
    this.CUSTOMER.CREATED,
  ]);
}

export default StripeUtils;
