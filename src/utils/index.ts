export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatYear(dateString: string): string {
  return new Date(dateString).getFullYear().toString()
}

export function getAlbumTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    album: 'Альбом',
    single: 'Сингл',
    compilation: 'EP'
  }
  return labels[type] || type
}