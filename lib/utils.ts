export function normalizeName(name: string) {
  return name
    .trim()
    .replace(/\s+/g, " ") //nixon  lim -> nixon lim (remove excess space)
    .replace(/[^a-zA-Z0-9\s'-]/g, "") //nixon!29lim -> nixonlim (remove number special characters)
    .replace(/\b\w/g, (char) => char.toUpperCase()); //nixon  lim -> Nixon Lim (upper case first)
}
