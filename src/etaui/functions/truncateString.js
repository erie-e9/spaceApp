export default function truncateString(string, limit) {
  // console.log('ewe truncatestringing', {string, limit});

  if (string.length <= limit) {
    return string;
  }

  return string.slice(0, limit) + '...';
}
