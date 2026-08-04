---
layout: base
title: "projects"
permalink: /projects/
---

<div class="container">

  <div class="page-header">
    <p class="hero-prompt"><span class="dim">root@null:~/projects$</span> ls -la</p>
    <h1 class="page-title">projects<span class="blink">_</span></h1>
    <p class="page-desc">things i've built. some finished. some running. some quietly watching.</p>
  </div>

  <div class="project-grid">
    {% assign active = site.projects | where: "status", "active" %}
    {% assign wip = site.projects | where: "status", "wip" %}
    {% assign archived = site.projects | where: "status", "archived" %}

    {% assign all_projects = wip | concat: active | concat: archived | sort: "date" | reverse %}

    {% for project in all_projects %}
    <a href="{{ project.url | relative_url }}" class="project-card">
      <div class="project-card-header">
        <span class="project-card-title">{{ project.title }}</span>
        <span class="tag status-{{ project.status | downcase | replace: ' ', '-' }}">{{ project.status }}</span>
      </div>
      {% if project.description %}
      <p class="project-card-desc">{{ project.description }}</p>
      {% endif %}
      {% if project.tech %}
      <div class="skill-tags skill-tags-sm">
        {% assign tech_items = project.tech | limit: 4 %}
        {% for t in tech_items %}
        <span class="tag tag-sm">{{ t }}</span>
        {% endfor %}
      </div>
      {% endif %}
      <span class="project-card-date">{{ project.date | date: "%Y" }}</span>
    </a>
    {% endfor %}

    {% if site.projects.size == 0 %}
    <p class="empty-state">// projects loading...</p>
    {% endif %}
  </div>

</div>
