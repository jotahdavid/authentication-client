export default function safeString(value: any, defaultValue = '') {
  return (
    typeof value === 'string' ? value : defaultValue
  );
}
