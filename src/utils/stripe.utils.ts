class StripeUtils {
  constructor() {}

  static CHECKOUT = {
    SESSION_COMPLETED: "checkout.session.completed",
  };

  static CUSTOMER = {
    CREATED: "customer.subscriptions.created",
    UPDATED: "customer.subscriptions.updated",
    DELETED: "customer.subscriptions.deleted",
  };

  static has = (type: string) => this.relevantEvents.has(type);

  static relevantEvents = new Set([
    this.CHECKOUT.SESSION_COMPLETED,
    this.CUSTOMER.CREATED,
    this.CUSTOMER.DELETED,
    this.CUSTOMER.UPDATED,
  ]);
}

export default StripeUtils;
