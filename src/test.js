var show = require('./test1.js');
console.log('11111111',require.main === module)

show();

process.stdin.resume();

process.on('SIGINT', () => {
  console.log('Received SIGINT.  Press Control-D to exit.');
});

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

console.log('process.argv0',process.argv0);