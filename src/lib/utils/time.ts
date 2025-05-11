export function getCurrentServerTime(timezone: string = 'America/Sao_Paulo') {
  return new Date().toLocaleTimeString('pt-BR', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

export function isRestaurantOpen(openingHours: {
  is24h: boolean;
  opensAt?: string;
  closesAt?: string;
  timezone: string;
}): boolean {
  if (openingHours.is24h) return true;

  const currentTime = getCurrentServerTime(openingHours.timezone);
  const [currentHour, currentMinute] = currentTime.split(':').map(Number);
  const [opensHour, opensMinute] = openingHours.opensAt!.split(':').map(Number);
  const [closesHour, closesMinute] = openingHours.closesAt!.split(':').map(Number);

  const currentTotal = currentHour * 60 + currentMinute;
  const opensTotal = opensHour * 60 + opensMinute;
  const closesTotal = closesHour * 60 + closesMinute;

  return currentTotal >= opensTotal && currentTotal <= closesTotal;
}