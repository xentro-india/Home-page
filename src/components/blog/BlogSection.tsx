'use client';

import React, { useState } from 'react';
import { blogCategories, latestArticles, featuredArticle, BlogPost } from '@/data/blogs';
import styles from './Blog.module.css';

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  return (
    <>
      {/* 1. CATEGORY FILTER BAR (Positioned immediately after Hero, before Featured) */}
      <nav className={styles.blogFilter} aria-label="Blog categories">
        <div className={`${styles.wrap} ${styles.filterInner}`}>
          {blogCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.filterBtn} ${
                activeCategory === cat.id ? styles.activeFilter : ''
              }`}
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 2. FEATURED INSIGHT SECTION */}
      <section className={styles.featured}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.eyebrow}>Featured Insight</div>
              <h2>Start with the question that matters most.</h2>
            </div>
            <p>
              What should a founder do next? Xentro’s editorial direction is
              built around helping entrepreneurs understand their stage, identify
              what matters now, and avoid unnecessary ecosystem friction.
            </p>
          </div>

          <article
            className={styles.featuredCard}
            data-category={featuredArticle.category}
          >
            <div
              className={styles.featuredImage}
              style={{ backgroundImage: `url("${featuredArticle.image}")` }}
              role="img"
              aria-label={featuredArticle.title}
            />
            <div className={styles.featuredCopy}>
              <div className={styles.articleMeta}>
                <span>{featuredArticle.categoryLabel}</span>
                <span>{featuredArticle.tag}</span>
              </div>
              <h3>{featuredArticle.title}</h3>
              <p>{featuredArticle.excerpt}</p>
              <a
                href="#"
                className={styles.readLink}
                onClick={(e) => e.preventDefault()}
                aria-label={`Read featured article: ${featuredArticle.title} (Coming soon)`}
              >
                Read article <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* 3. LATEST ARTICLES GRID (Filtered by selected category) */}
      <section className={styles.latest}>
        <div className={styles.wrap}>
          <div className={`${styles.sectionHead} ${styles.compact}`}>
            <div>
              <div className={styles.eyebrow}>Latest</div>
              <h2>From the Xentro ecosystem.</h2>
            </div>
            <p>
              Editorial examples below can be replaced with your live CMS
              articles as the blog goes into production.
            </p>
          </div>

          <div className={styles.articleGrid} id="articleGrid">
            {latestArticles.map((article: BlogPost) => {
              const isVisible =
                activeCategory === 'all' || article.category === activeCategory;

              return (
                <article
                  key={article.id}
                  className={`${styles.articleCard} ${
                    !isVisible ? styles.hidden : ''
                  }`}
                  data-category={article.category}
                >
                  <div
                    className={styles.articleImage}
                    style={{ backgroundImage: `url("${article.image}")` }}
                    role="img"
                    aria-label={article.title}
                  />
                  <div className={styles.articleBody}>
                    <div className={styles.articleMeta}>
                      <span>{article.categoryLabel}</span>
                      <span>{article.tag}</span>
                    </div>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <a
                      href="#"
                      className={styles.readLink}
                      onClick={(e) => e.preventDefault()}
                      aria-label={`Read article: ${article.title} (Coming soon)`}
                    >
                      Read article <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
