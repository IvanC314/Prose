"use client";

import React from 'react';
import styles from './GenrePage.module.css';

export default function GenrePage({ params }: { params: { genre: string } }) {
  const { genre } = params;

  const formattedGenre = genre.charAt(0).toUpperCase() + genre.slice(1);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 className={styles.genreTitle}>{formattedGenre}</h1>
      <p className={styles.genreDescription}>
        Book reviews in the "{formattedGenre}" category.
      </p>
    </div>
  );
}
