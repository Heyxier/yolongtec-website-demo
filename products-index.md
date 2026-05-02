---
layout: default
title: Products
permalink: /products/
---

<section class="section products-section" style="padding-top: 120px;">
    <div class="section-bg">
        <img src="{{ "images/workshop-bg.jpg" | relative_url }}" alt="Workshop Background">
        <div class="section-overlay"></div>
    </div>
    <div class="container">
        <div class="section-header">
            <div class="section-badge">
                <span class="badge-accent"></span>
                PRODUCTS
            </div>
            <h2 class="section-title">OUR PRODUCT RANGE</h2>
            <p class="section-desc">Professional power tools for every trade — 500+ models across 8 categories</p>
        </div>

        <div class="products-categories-grid">
            {% assign slugs = "drill,fastening,grinder-cutter,hammer,saw,sander-polisher,cleanning,lighting" | split: "," %}
            {% for slug in slugs %}
            {% assign cat = site.data.categories[slug] %}
            <a href="{{ slug | relative_url }}/" class="category-card">
                <div class="category-image">
                    <img src="{{ cat.image | relative_url }}" alt="{{ cat.name }}">
                    <div class="category-overlay">
                        <span class="category-count">{{ cat.count }} Models</span>
                    </div>
                </div>
                <div class="category-info">
                    <h3 class="category-name">{{ cat.name }}</h3>
                    <p class="category-desc">{{ cat.desc }}</p>
                    <span class="category-link">EXPLORE →</span>
                </div>
            </a>
            {% endfor %}
        </div>

        <div class="section-cta">
            <a href="{{ "contact/index.html" | relative_url }}" class="btn btn-accent btn-large">REQUEST A CATALOG</a>
        </div>
    </div>
</section>
