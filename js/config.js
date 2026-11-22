/*
 * Sakura Nails — site settings.
 * Every value you are expected to edit lives in this file.
 * Only PUBLIC values belong here: no API keys or secrets, ever.
 */
window.SAKURA_CONFIG = {
  /*
   * Kit form endpoint, copied from the `action="..."` attribute of the
   * <form> in your Kit form's HTML embed code. Usually looks like:
   *   "https://app.kit.com/forms/1234567/subscriptions"
   * Leave as "" until Kit is set up: the form still shows, but submitting
   * just says "Signups open very soon" and sends nothing anywhere.
   * See README.md → "Wire up Kit" (also update the no-JS form in index.html).
   */
  KIT_FORM_ACTION_URL: "",

  /*
   * The `name` of the email <input> in Kit's embed code.
   * Kit's embeds have used "email_address"; check yours and change if needed.
   */
  KIT_EMAIL_FIELD_NAME: "email_address",

  /*
   * Full https:// profile URLs. Leave "" to show the item as "soon".
   * Adding a URL here is the only change needed to turn it into a link.
   */
  SOCIAL_LINKS: {
    tiktok: "",
    instagram: ""
  }
};
