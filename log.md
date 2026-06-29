---
layout: base
title: "log"
permalink: /log/
---

<div class="container">

  <div class="page-header">
    <p class="hero-prompt"><span class="dim">root@null:~/log$</span> ls -lt</p>
    <h1 class="page-title">log<span class="blink">_</span></h1>
    <p class="page-desc">irregular transmissions.</p>
  </div>

  <div class="post-list post-list-full">
    {% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
    {% for year_group in posts_by_year %}
    <div class="year-group">
      <p class="year-label">{{ year_group.name }}</p>
      {% for post in year_group.items %}
      <a href="{{ post.url | relative_url }}" class="post-row post-row-full">
        <span class="post-date">{{ post.date | date: "%m.%d" }}</span>
        <span class="post-title">{{ post.title }}</span>
        <div class="post-row-meta">
          {% for tag in post.tags %}
          <span class="tag">{{ tag }}</span>
          {% endfor %}
        </div>
      </a>
      {% endfor %}
    </div>
    {% endfor %}

    {% if site.posts.size == 0 %}
    <p class="empty-state">// no entries yet. signal forthcoming.</p>
    {% endif %}
  </div>

</div>
