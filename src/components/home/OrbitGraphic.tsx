import React from 'react';
import styles from './Home.module.css';

export default function OrbitGraphic() {
  return (
    <div className={styles.ecoMap}>
      <div className={styles.eyebrow}>One connected ecosystem</div>

      <div className={styles.ecoOrbit}>
        <div className={`${styles.orbitRing} ${styles.ring1}`} />
        <div className={`${styles.orbitRing} ${styles.ring2}`} />

        <svg
          className={styles.connectionLayer}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line className={styles.connectionLine} x1="50" y1="50" x2="50" y2="8" />
          <line className={`${styles.connectionLine} ${styles.alt}`} x1="50" y1="50" x2="88" y2="27" />
          <line className={styles.connectionLine} x1="50" y1="50" x2="85" y2="78" />
          <line className={`${styles.connectionLine} ${styles.alt}`} x1="50" y1="50" x2="50" y2="94" />
          <line className={styles.connectionLine} x1="50" y1="50" x2="14" y2="78" />
          <line className={`${styles.connectionLine} ${styles.alt}`} x1="50" y1="50" x2="11" y2="27" />
        </svg>

        <div className={styles.centerNode}>xentro</div>
        <div className={styles.nodeGlow} />

        <div className={`${styles.ecoNode} ${styles.n1}`}>Founders</div>
        <div className={`${styles.ecoNode} ${styles.n2}`}>Mentors</div>
        <div className={`${styles.ecoNode} ${styles.n3}`}>Investors</div>
        <div className={`${styles.ecoNode} ${styles.n4}`}>Institutions</div>
        <div className={`${styles.ecoNode} ${styles.n5}`}>Opportunities</div>
        <div className={`${styles.ecoNode} ${styles.n6}`}>Knowledge &amp; Resources</div>
      </div>
    </div>
  );
}
