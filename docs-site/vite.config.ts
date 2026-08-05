// vite.config.ts
import { defineConfig } from 'vite'
import path from 'node:path'
import { mdToPagePlugin } from './vite-plugin-md/index'

const projectRoot = process.cwd()

export default defineConfig({
  plugins: [mdToPagePlugin()],
  resolve: {
    alias: {
      '@docs': path.resolve(projectRoot, 'docs-site'),
      '@lib': path.resolve(projectRoot, 'lib'),
      // 与真实包名一致，demo 代码可直接复制到项目中使用
      'wok-ui-ext': path.resolve(projectRoot, 'lib'),
    },
  },

})
