const parsePrice = (price: number) => {
  let formatPrice = [];
  while (price / 1000 >= 1) {
    let rem = String(price % 1000);
    if (rem.length === 2) rem = "0" + rem;
    if (rem.length === 1) rem = "00" + rem;
    formatPrice.push(rem);
    price = Math.floor(price / 1000);
  }
  formatPrice.push(String(price % 1000));
  return formatPrice.reverse().join(" ");
};

export default parsePrice;