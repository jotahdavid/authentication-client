export default function capitalize(text: string) {
  return text.replace(/\w/, (letter) => letter.toUpperCase());
}
