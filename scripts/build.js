const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const less = require('less')

const rootDir = path.resolve(__dirname, '..')
const libDir = path.join(rootDir, 'lib')
const distDir = path.join(rootDir, 'dist')
const typesDir = path.join(rootDir, 'types')

function rmDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true })
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function copyDir(src, dest) {
  ensureDir(dest)
  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item)
    const destPath = path.join(dest, item)
    const stat = fs.statSync(srcPath)
    if (stat.isDirectory()) {
      copyDir(srcPath, destPath)
    } else if (!item.endsWith('.less')) {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

async function compileLess(src, dest) {
  const content = fs.readFileSync(src, 'utf-8')
  const result = await less.render(content, {
    filename: src,
    paths: [path.dirname(src)]
  })
  fs.writeFileSync(dest, result.css)
}

async function compileLessFiles(srcDir, destDir) {
  ensureDir(destDir)
  for (const item of fs.readdirSync(srcDir)) {
    const srcPath = path.join(srcDir, item)
    const stat = fs.statSync(srcPath)
    if (stat.isDirectory()) {
      await compileLessFiles(srcPath, path.join(destDir, item))
    } else if (item.endsWith('.less')) {
      const cssFileName = item.replace(/\.less$/, '.css')
      const destPath = path.join(destDir, cssFileName)
      await compileLess(srcPath, destPath)
    }
  }
}

function replaceLessWithCss(dir) {
  for (const item of fs.readdirSync(dir)) {
    const itemPath = path.join(dir, item)
    const stat = fs.statSync(itemPath)
    if (stat.isDirectory()) {
      replaceLessWithCss(itemPath)
    } else if (item.endsWith('.js')) {
      let content = fs.readFileSync(itemPath, 'utf-8')
      content = content.replace(/\.less(['"])/g, '.css$1')
      fs.writeFileSync(itemPath, content)
    }
  }
}

async function main() {
  rmDir(distDir)
  rmDir(typesDir)
  ensureDir(distDir)

  execSync('tsc -p tsconfig.build.json', { cwd: rootDir, stdio: 'inherit' })

  replaceLessWithCss(distDir)
  await compileLessFiles(libDir, distDir)

  console.log('Build completed.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
