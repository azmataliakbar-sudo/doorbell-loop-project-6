const { execSync } = require('child_process');
const fs = require('fs');

let body;
try {
  execSync('npm test', { cwd: __dirname, stdio: 'pipe' });
  body = 'PASS: no bug found';
  console.log('PASS');
} catch (err) {
  const out = (err.stdout || '').toString();
  const lines = out.split(/\r?\n/).filter(l => l.includes('actual') || l.includes('expected') || l.includes('AssertionError'));
  body = 'FAIL: planted bug detected\n' + lines.slice(0, 3).join('\n');
  console.log(body);
}

fs.writeFileSync('review.txt', body);
