const { execSync, spawn } = require('child_process');
const path = require('path');

const cwd = path.resolve(__dirname);
const proc = spawn('npm', ['run', 'dev', '--', '--port', '4321'], {
  cwd,
  stdio: 'inherit',
  shell: true,
});

proc.on('error', (err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});

proc.on('exit', (code) => {
  process.exit(code ?? 0);
});
