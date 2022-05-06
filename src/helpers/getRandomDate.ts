export default function getRamdomDateInBetween(start: string, end?: string) {
  const _start = Date.parse(start);
  const _end = end ? Date.parse(end) : Date.now();

  return new Date(Math.floor(Math.random() * (_end - _start + 1) + _start));
}
