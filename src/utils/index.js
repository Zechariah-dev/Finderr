exports.generateSlug = (word, sku="") => {
  return (word + ' ' + sku).split(' ').join('-');
}
