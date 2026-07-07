export default {
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        main: './assets/main.js',
        style: './assets/style.scss',
      },
    },
  },
};
