// Split path into filepath and filename
const splitPath = (url) => {

  // Find last folder/file
  const lastIndex = url.lastIndexOf('/');

  // Get folders and filename
  const filepath = url.substring(0, lastIndex);
  const filename = url.substring(lastIndex + 1);

  // Return folder and filename
  return { filepath, filename };

}

// Manipulate array
const createArray = (value, fn) =>
  [...value].map(item => fn.call(this, item))

// Export
module.exports = { splitPath, createArray };
