export function generateGuestName() {
  return `Guest_${Math.floor(Math.random() * 9000000) + 1000000}`;
}
