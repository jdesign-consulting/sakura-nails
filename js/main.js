/*
 * Sakura Nails — coming-soon page behaviour.
 * Progressive enhancement only: the page and form work without this file.
 * Never stores, logs or sends email addresses anywhere except the Kit endpoint.
 */
(function () {
  "use strict";

  var config = window.SAKURA_CONFIG || {};

  var MESSAGES = {
    empty: "Please enter your email address.",
    invalid: "Please enter a valid email address, like name@example.com.",
    notOpen: "Signups open very soon. Please check back in a few days.",
    sending: "Joining the list…",
    success: "Thanks! Check your inbox to confirm your email.",
    error: "Sorry, something went wrong and you’re not signed up yet. Please try again in a moment.",
    offline: "You seem to be offline. Please check your connection and try again.",
    redirecting: "Taking you to confirm your signup…"
  };

  /* ---------- helpers ---------- */

  function isHttpsUrl(value) {
    if (typeof value !== "string" || value.trim() === "") return false;
    try {
      var url = new URL(value.trim());
      return url.protocol === "https:";
    } catch (e) {
      return false;
    }
  }

  // Deliberately simple: one @, something before it, a dot in the domain, no spaces.
  // The browser's type="email" check and Kit's own validation back this up.
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(value) && value.length <= 254;
  }

  /* ---------- footer year ---------- */

  var yearEls = document.querySelectorAll("[data-year]");
  for (var y = 0; y < yearEls.length; y++) {
    yearEls[y].textContent = String(new Date().getFullYear());
  }

  /* ---------- social links ---------- */

  var socialLinks = config.SOCIAL_LINKS || {};
  var socialItems = document.querySelectorAll("[data-social]");

  for (var s = 0; s < socialItems.length; s++) {
    var item = socialItems[s];
    var key = item.getAttribute("data-social");
    var href = socialLinks[key];

    if (!isHttpsUrl(href)) {
      if (href) console.warn("[Sakura Nails] SOCIAL_LINKS." + key + " must be a full https:// URL.");
      continue; // keep the non-interactive "soon" placeholder from the HTML
    }

    var link = document.createElement("a");
    link.className = item.className;
    link.setAttribute("data-social", key);
    link.href = href.trim();
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    // Copy icon + label, drop the "soon" badge.
    var children = item.childNodes;
    for (var c = 0; c < children.length; c++) {
      var node = children[c];
      if (node.nodeType === 1 && node.classList.contains("social__soon")) continue;
      link.appendChild(node.cloneNode(true));
    }
    var newTab = document.createElement("span");
    newTab.className = "visually-hidden";
    newTab.textContent = " (opens in a new tab)";
    link.appendChild(newTab);

    item.parentNode.replaceChild(link, item);
  }

  /* ---------- signup form ---------- */

  var form = document.getElementById("signup-form");
  if (!form) return;

  var input = form.querySelector("[data-email-input]");
  var honeypot = form.querySelector("[data-honeypot]");
  var button = form.querySelector("button[type='submit']");
  var buttonText = button.querySelector(".button__text");
  var status = document.getElementById("form-status");
  var defaultButtonText = buttonText.textContent;

  var endpoint = isHttpsUrl(config.KIT_FORM_ACTION_URL) ? config.KIT_FORM_ACTION_URL.trim() : "";
  var fieldName = (config.KIT_EMAIL_FIELD_NAME || "email_address").trim();
  var busy = false;

  if (config.KIT_FORM_ACTION_URL && !endpoint) {
    console.warn("[Sakura Nails] KIT_FORM_ACTION_URL must be a full https:// URL; treating signups as not open yet.");
  }

  // We validate ourselves so messages are consistent and announced.
  form.noValidate = true;

  // When Kit is configured, make the real form point at it, so the
  // non-fetch fallback (and anything else) posts to the right place.
  if (endpoint) {
    form.action = endpoint;
    form.method = "post";
    input.name = fieldName;
  }

  function setStatus(state, message) {
    status.setAttribute("data-state", state);
    status.textContent = message;
  }

  function clearStatus() {
    status.removeAttribute("data-state");
    status.textContent = "";
  }

  function markInvalid(message) {
    input.setAttribute("aria-invalid", "true");
    setStatus("error", message);
    input.focus();
  }

  function setBusy(isBusy) {
    busy = isBusy;
    form.classList.toggle("is-busy", isBusy);
    form.setAttribute("aria-busy", isBusy ? "true" : "false");
    button.setAttribute("aria-disabled", isBusy ? "true" : "false");
    input.readOnly = isBusy;
    buttonText.textContent = isBusy ? "Joining…" : defaultButtonText;
  }

  // Fallback when fetch can't be used (e.g. blocked by CORS):
  // a normal form POST that opens Kit's confirmation page in this tab.
  function nativeSubmit() {
    form.action = endpoint;
    form.method = "post";
    input.name = fieldName;
    setStatus("info", MESSAGES.redirecting);
    HTMLFormElement.prototype.submit.call(form);
  }

  input.addEventListener("input", function () {
    if (input.getAttribute("aria-invalid") === "true") {
      input.removeAttribute("aria-invalid");
      clearStatus();
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (busy) return;

    clearStatus();
    var email = input.value.trim();
    input.value = email;

    if (!email) return markInvalid(MESSAGES.empty);
    if (!isValidEmail(email)) return markInvalid(MESSAGES.invalid);
    input.removeAttribute("aria-invalid");

    // Honeypot filled in: almost certainly a bot. Send nothing, claim nothing.
    if (honeypot && honeypot.value) return;

    // Kit not wired up yet: say so, make no network request.
    if (!endpoint) {
      setStatus("info", MESSAGES.notOpen);
      return;
    }

    if (!window.fetch || !window.FormData) {
      nativeSubmit();
      return;
    }

    setBusy(true);
    setStatus("info", MESSAGES.sending);

    var body = new FormData();
    body.append(fieldName, email);

    fetch(endpoint, {
      method: "POST",
      body: body,
      headers: { Accept: "application/json" },
      mode: "cors",
      credentials: "omit"
    })
      .then(
        function (response) {
          if (!response.ok) {
            setBusy(false);
            setStatus("error", MESSAGES.error);
            return;
          }
          return response.json().then(
            function (data) {
              setBusy(false);
              var result = data && typeof data.status === "string" ? data.status.toLowerCase() : "";
              if (result === "success") {
                form.reset();
                setStatus("success", MESSAGES.success);
              } else if (result === "failed" || result === "error" || (data && data.errors)) {
                setStatus("error", MESSAGES.error);
              } else {
                // Unrecognised reply (e.g. Kit wants a captcha): let Kit's own page handle it.
                nativeSubmit();
              }
            },
            function () {
              // 2xx but not JSON: we can't confirm success, so hand over to Kit's page.
              setBusy(false);
              nativeSubmit();
            }
          );
        },
        function () {
          // Network error or CORS block.
          setBusy(false);
          if (navigator.onLine === false) {
            setStatus("error", MESSAGES.offline);
          } else {
            nativeSubmit();
          }
        }
      );
  });
})();
