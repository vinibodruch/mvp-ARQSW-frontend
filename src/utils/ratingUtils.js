// Mapeamento de classificações da OMDb para o padrão ANCINE/brasileiro
const RATING_MAP = {
  'G':     { label: 'L',   color: '#00a651', title: 'Livre' },
  'PG':    { label: '10',  color: '#0066cc', title: '10 anos' },
  'PG-13': { label: '12',  color: '#f5d800', title: '12 anos' },
  'R':     { label: '16',  color: '#ed1c24', title: '16 anos' },
  'NC-17': { label: '18',  color: '#000000', title: '18 anos' },
  // classificações brasileiras diretas caso venham da API
  'Livre': { label: 'L',   color: '#00a651', title: 'Livre' },
  '10':    { label: '10',  color: '#0066cc', title: '10 anos' },
  '12':    { label: '12',  color: '#f5d800', title: '12 anos' },
  '14':    { label: '14',  color: '#f7941d', title: '14 anos' },
  '16':    { label: '16',  color: '#ed1c24', title: '16 anos' },
  '18':    { label: '18',  color: '#000000', title: '18 anos' },
}

export function getRatingInfo(rated) {
  if (!rated || rated === 'N/A' || rated === 'NOT RATED' || rated === 'UNRATED') return null
  return RATING_MAP[rated] ?? { label: rated, color: '#757575', title: rated }
}
