'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import styles from './Join.module.css';

// Target from source join.html: 30 September 2026, 5:00 PM IST (UTC+05:30)
const TARGET_TIMESTAMP = new Date('2026-09-30T17:00:00+05:30').getTime();

const emptySubscribe = () => () => {};

function pad(value: number) {
  return String(Math.max(0, value)).padStart(2, '0');
}

export default function CountdownTimer() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    isFinished: false,
  });

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const calculateTime = () => {
      const now = Date.now();
      const diff = TARGET_TIMESTAMP - now;

      if (diff <= 0) {
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
          isFinished: true,
        });
        if (intervalId !== null) {
          clearInterval(intervalId);
          intervalId = null;
        }
        return false;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({
        days: pad(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
        isFinished: false,
      });

      return true;
    };

    const shouldContinue = calculateTime();
    if (shouldContinue) {
      intervalId = setInterval(calculateTime, 1000);
    }

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const isFinished = isClient && timeLeft.isFinished;

  return (
    <>
      {!isFinished && (
        <>
          <div className={styles.timer} aria-label="Launch countdown timer">
            <div className={styles.timeBlock}>
              <div className={styles.timeValue}>{timeLeft.days}</div>
              <div className={styles.timeLabel}>Days</div>
            </div>

            <div className={styles.timeSeparator} aria-hidden="true">
              :
            </div>

            <div className={styles.timeBlock}>
              <div className={styles.timeValue}>{timeLeft.hours}</div>
              <div className={styles.timeLabel}>Hours</div>
            </div>

            <div className={styles.timeSeparator} aria-hidden="true">
              :
            </div>

            <div className={styles.timeBlock}>
              <div className={styles.timeValue}>{timeLeft.minutes}</div>
              <div className={styles.timeLabel}>Minutes</div>
            </div>

            <div className={styles.timeSeparator} aria-hidden="true">
              :
            </div>

            <div className={styles.timeBlock}>
              <div className={styles.timeValue}>{timeLeft.seconds}</div>
              <div className={styles.timeLabel}>Seconds</div>
            </div>
          </div>

          <div className={styles.launchNote} id="launchNote">
            <span>Build</span>
            <span>Network</span>
            <span>Navigate</span>
          </div>
        </>
      )}

      {/* Finished State when target time has arrived / elapsed */}
      <div
        className={`${styles.finishedState} ${isFinished ? styles.show : ''}`}
        id="finishedState"
        role={isFinished ? 'status' : undefined}
      >
        <div className={styles.finishedKicker}>We’re live.</div>
        <h2>The wait is over.</h2>
        <p>Xentro is now open.</p>
        <Link href="/" className={styles.launchBtn}>
          Enter Xentro
        </Link>
      </div>
    </>
  );
}
