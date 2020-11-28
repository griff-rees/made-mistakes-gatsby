---
title: "Contact"
path: /contact/
date: 2020-09-24
last_modified_at: 2020-09-24T22:20:25
excerpt: "Preferred methods of sending your questions, inquires, messages, and love letters to me."
---

Want to get in touch? Try [Twitter](https://twitter.com/griff_rees) or use the form below:

<!-- 
<form class="form-group"
      name="contact"
      method="POST"
      netlify
      netlify-honeypot="bot-field"
      action="/contact/thanks"> -->
<form class="form-group"
      name="contact"
      method="POST"
      netlify
      action="/contact/thanks"> -->
  <div hidden aria-hidden="true">
    <label>
      Don’t fill this out if you're a person: 
      <input name="bot-field" />
    </label>
  </div>
  <div>
    <label for="name">Name
      <input
       required
       name="name"
       type="text"
       spellcheck="false"
       maxlength="255"
       placeholder="Your name"
       />
    </label>
  </div>
<!--  <div>
    <label for="email">Email address
      <input
       required
       name="email"
       type="email"
       placeholder="Your email address"
       id="email"
       maxlenght="255"
       spellcheck="false"
       title="An email address to reply to, maximum 255 characters."
       />
    </label>
  </div>
  <div>
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
  <div>
    <label for="referral">How&rsquo;d you find this site?
      <input
       name="referral"
       type="text"
       maxlength="255"
       placeholder="e.g. Searching the web"
       />
    </label>
  </div> -->
  <button
   id="saveForm"
   name="saveForm"
   class="btn submit"
   type="submit"
   >Send message</button>
</form>
