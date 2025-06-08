
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    // Анализатор размера бундла
    process.env.ANALYZE && BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-report.html'
    })
  ].filter(Boolean),
  
  build: {
    // Оптимизация для production
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    
    // Разделение кода
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          ui: ['react-toastify', 'react-helmet-async']
        }
      }
    },
    
    // Отчет о размере бандла
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500
  }
});
