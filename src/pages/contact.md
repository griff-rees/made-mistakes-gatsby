---
title: "Contact"
path: /contact/
date: 2020-09-24
last_modified_at: 2020-09-24T22:20:25
excerpt: "Preferred methods of sending your questions, inquires, messages, and love letters to me."
---

Want to get in touch? Try [Twitter](https://twitter.com/griff_rees) or use the form below:

<form name="contact"
      method="POST"
      netlify
      netlify-honeypot="bot-field"
      data-netlify-recaptcha="true"
      action="/contact/thanks">
  <input type="hidden" name="bot-field" aria-hidden="true" />
  <input type="hidden" name="form-name" value="contact" />
  <div class="form-group">
    <label for="name">Name
      <input
       required
       name="name"
       type="text"
       spellcheck="false"
       maxlength="255"
       placeholder="Your name"
       title="How you'd like to be addressed (maximum 255 characters)?"
       />
    </label>
  </div>
  <div class="form-group">
    <label for="email">Email address
      <input
       required
       name="email"
       type="email"
       placeholder="Your email address"
       id="email"
       maxlenght="255"
       spellcheck="false"
       title="Which email address to reply to (maximum 255 characters)?"
       />
    </label>
  </div>
  <div class="form-group">
    <label for="message">Message (plain text)
      <textarea
       required
       name="message"
       spellcheck="true"
       rows="10"
       placeholder="Your message"
       /></textarea>
    </label>
  </div>
  <div class="form-group">
    <label for="referral">How&rsquo;d you find this site?
      <input
       name="referral"
       type="text"
       maxlength="255"
       placeholder="E.g. searching the web"
       title="How did you find this site? Search? Link? Details appreciated (maximum 255 characters)."
       />
    </label>
  </div>
  <div data-netlify-recaptcha="true" class="form-group"></div>
  <div class="form-group">
    <button
      class="btn submit"
      type="submit"
      >Send message</button>
  </div>
</form>
