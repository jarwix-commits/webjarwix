const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('app');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const borderRegex = /border:\s*['"]1px\s*solid\s*rgba\(255,90,31,0\.[0-9]+\)['"],?\s*/g;
  
  // We only want to remove it if it's right after color: "#FFF5F0" and inside a style tag for the gradient buttons
  // Actually, wait, let's just use the previous regex but support any decimal
  const fullRegex = /(background:\s*['"]linear-gradient\(120deg,\s*#0E0E0E,\s*#FF5A1F\)['"],\s*color:\s*['"]#FFF5F0['"],\s*)border:\s*['"]1px\s*solid\s*rgba\(255,90,31,0\.[0-9]+\)['"],?/g;
  
  if (fullRegex.test(content)) {
    content = content.replace(fullRegex, '$1');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
