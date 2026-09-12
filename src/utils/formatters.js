export function formatNaira(n) {
  if (typeof n !== "number") n = Number(n) || 0;
  return "₦" + n.toLocaleString();
}
