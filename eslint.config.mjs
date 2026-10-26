import nextConfig from 'eslint-config-next';

const config = [
  ...nextConfig,
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'node_modules/**',
      '*.html',
      '*.css',
      'assets/**',
      'public/**',
    ],
  },
];

export default config;
