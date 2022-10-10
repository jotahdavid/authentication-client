export default function safeString(value: any) {
  return (
    typeof value === 'string' ? value : ''
  );
}
