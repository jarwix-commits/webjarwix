const fs = require('fs');
const content = fs.readFileSync('./public/logo.svg', 'utf8');
const match = content.match(/base64,([^"']+)/);
if (match) {
  fs.writeFileSync('./public/logo.png', Buffer.from(match[1], 'base64'));
  console.log('Saved logo.png');
} else {
  console.error('No base64 found');
}
