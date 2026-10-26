'use client';

import React, { useState } from 'react';
import { blogCategories, latestArticles, BlogPost } from '@/data/blogs';
import styles from './Blog.module.css';

export default function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredArticles =
    activeCategory === 'all'
      ? latestArticles
      : latestArticles.filter((article) => article.category === activeCategory);

  return (
    <>
      {/* CATEGORY FILTER BAR */}
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

      {/* LATEST ARTICLES GRID */}
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
                      onClick={(e) => {
                        e.preventDefault();
                      }}
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
