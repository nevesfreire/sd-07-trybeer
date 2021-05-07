export default function (price, quantity) {
  return Math
    .round((Number(price) * 100) * quantity) / 100;
}
