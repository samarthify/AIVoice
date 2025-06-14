// create-client-src-folders.js
const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'client', 'src');

const folders = [
  'components',
  'hooks',
  'context',
  'services',
  'utils',
  'types',
  'styles',
  'store',      // for Redux or state management
  'lib',        // for shared libraries
  'assets',     // for images/fonts
  // Add more as needed
];

folders.forEach(folder => {
  const dir = path.join(srcPath, folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('Created:', dir);
  } else {
    console.log('Already exists:', dir);
  }
});
