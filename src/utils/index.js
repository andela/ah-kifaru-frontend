const calculateReadTime = content => {
  const wordsPerMinute = 200;

  const textLength = content.split(' ').length;
  if (textLength > wordsPerMinute) {
    const value = Math.ceil(textLength / wordsPerMinute);
    return `~${value} min read`;
  }
  return 'less than a min read';
};
export default calculateReadTime;
