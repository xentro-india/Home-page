'use client';

import React, { useState } from 'react';
import { departments, departmentNames } from '@/data/careers';
import styles from './Careers.module.css';

export default function RoleDirectory() {
  const [department, setDepartment] = useState('All');
  const [query, setQuery] = useState('');

  const matches = departmentNames.flatMap((name) =>
    department === 'All' || department === name
      ? departments[name]
          .filter((role) => role.toLowerCase().includes(query.trim().toLowerCase()))
          .map((role) => ({ department: name, role }))
      : []
  );

  return (
    <div className={styles.jdBrowser}>
      <div className={styles.jdToolbar}>
        <label htmlFor="jdDepartment">Department</label>
        <select
          id="jdDepartment"
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
        >
          <option value="All">All departments</option>
          {departmentNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <label htmlFor="jdSearch">Search roles</label>
        <input
          id="jdSearch"
          type="search"
          placeholder="Search a specialization…"
          autoComplete="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <span className={styles.jdTotal} role="status">
          {matches.length} {matches.length === 1 ? 'role' : 'roles'}
        </span>
      </div>

      <div className={styles.jdList}>
        {matches.map((item) => (
          <article key={item.department + item.role} className={styles.jdItem}>
            <div className={styles.jdItemCopy}>
              <span className={styles.jdDept}>{item.department}</span>
              <h3>{item.role}</h3>
            </div>
            <span className={styles.jdStatus}>JD coming soon</span>
          </article>
        ))}
      </div>

      {matches.length === 0 && (
        <p className={styles.jdEmpty}>No matching roles. Try another search or department.</p>
      )}
    </div>
  );
}
