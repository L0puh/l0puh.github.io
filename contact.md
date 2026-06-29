---
layout: base
title: "contact"
permalink: /contact/
---

<div class="container container-narrow">

  <div class="page-header">
    <p class="hero-prompt"><span class="dim">root@null:~$</span> cat ./contact.txt</p>
    <h1 class="page-title">contact<span class="blink">_</span></h1>
    <p class="page-desc">reach me through these channels. response times vary.</p>
  </div>

  <div class="contact-grid">

    <div class="contact-block">
      <p class="block-label">// primary</p>
      <div class="contact-list">
        <div class="contact-item">
          <span class="contact-label">email</span>
          <a href="mailto:{{ site.email }}" class="contact-value">{{ site.email }}</a>
        </div>
        <div class="contact-item">
          <span class="contact-label">github</span>
          <a href="https://github.com/{{ site.github }}" target="_blank" rel="noopener" class="contact-value">github.com/{{ site.github }}</a>
        </div>
        <div class="contact-item">
          <span class="contact-label">telegram</span>
          <a href="https://t.me/{{ site.telegram}}" target="_blank" rel="noopener" class="contact-value">t.me/@{{ site.telegram}} </a>
        </div>
      </div>
    </div>

    <div class="contact-block">
      <p class="block-label">// pgp</p>
      <div class="pgp-block">
        <p class="pgp-fingerprint">BF4D 1306 36CE 98D7 9FEB<br>F022 7F2F 5D58 35EA 0FF5</p>
        <a href="{{ '/assets/lopuh.asc' | relative_url }}" download="lopuh.asc" class="btn btn-ghost btn-sm">download public key</a>
      </div>
    </div>

    <div class="contact-block">
      <p class="block-label">// note</p>
      <p class="contact-note">
        for security disclosures use pgp. 
      </p>
    </div>

  </div>

</div>
