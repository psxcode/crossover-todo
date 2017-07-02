export function nameToTag(name: string): string {
  return 'xo-' + name.split('_').join('-');
}

export function opposite(direction: string): string {
  switch (direction) {
    case 'left':
      return 'right';
    case 'right':
      return 'left';
    case 'top':
      return 'bottom';
    case 'bottom':
      return 'top';
  }
}

export function urlStripQueryParams(url: string): string {
  if (!url) return '';
  return url.split('?')[0];
}

export function splitUrl(url: string): string[] {
  if (!url) return [];

  const urlChunks = urlStripQueryParams(url).split('/');
  if (!urlChunks[0]) urlChunks.shift();
  if (!urlChunks[urlChunks.length - 1]) urlChunks.pop();
  return urlChunks;
}

export function urlLastChunk(url: string): string {
  if (!url) return '';
  const chunks = splitUrl(url);
  return chunks[chunks.length - 1];
}

export function forward(val: any) {
  return val;
}
