module.exports = function check(str, bracketsConfig) {
 
  const bracketMap = {};
  const closingBrackets = new Set();
  const sameBracketSet = new Set();

  
  bracketsConfig.forEach(([open, close]) => {
    bracketMap[close] = open;
    closingBrackets.add(close);
    if (open === close) {
      sameBracketSet.add(open); 
    }
  });

  const stack = [];

  for (let i = 0; i < str.length; i++) {
    const currentChar = str[i];

    if (sameBracketSet.has(currentChar)) {
      if (stack.length && stack[stack.length - 1] === currentChar) {
        stack.pop(); 
      } else {
        stack.push(currentChar); 
      }
    }
    else if (!closingBrackets.has(currentChar)) {
      stack.push(currentChar);
    }
    else {
      if (stack.length === 0 || stack[stack.length - 1] !== bracketMap[currentChar]) {
        return false; 
      }
      stack.pop(); 
    }
  }

  return stack.length === 0;
}