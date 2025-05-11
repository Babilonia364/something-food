export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatBRLNoSpace(value: number): string {
  return formatBRL(value).replace(/\s/, '');
}

export function formatFloatToString(value: number): string {
  return value.toFixed(1).replace('.', ',');
}