const  REG = {
  vue: /<!--\s*#ifdef\s+((?:[A-Z-]+(?:\s*\|\|\s*)?)+)\s*-->([\s\S]+?)<!--\s*#endif\s*-->/g,
  js: /\/\/\s*#ifdef\s+((?:[A-Z-]+(?:\s*\|\|\s*)?)+)\s*\b([\s\S]+?)\/\/\s*#endif/g,
  less: /\/\*\s*#ifdef\s+((?:[A-Z-]+(?:\s*\|\|\s*)?)+)(?:\s*\*\/)?([\s\S]+?)(?:\/\*\s*)?#endif\s*\*\//g
}

module.exports = REG