import {
  nameToTag,
  opposite,
  urlStripQueryParams,
  splitUrl,
  urlLastChunk,
  stripHtmlTags
} from './helper';

describe('nameToTag', () => {

  it('converts element name to tag', () => {
    expect(nameToTag('widget'))
      .toBe('xo-widget');
  });

  it('replaces underscores with dash', () => {
    expect(nameToTag('my_widget'))
      .toBe('xo-my-widget');
  });
});

describe('opposite', () => {

  it('returns right when provided left', () => {
    expect(opposite('left')).toBe('right');
  });

  it('returns left when provided right', () => {
    expect(opposite('right')).toBe('left');
  });

  it('returns bottom when provided top', () => {
    expect(opposite('top')).toBe('bottom');
  });

  it('returns top when provided bottom', () => {
    expect(opposite('bottom')).toBe('top');
  });
});

describe('urlStripQueryParams', () => {

  it('should strip query params', () => {
    expect(urlStripQueryParams('test-string?query=params&value=true'))
      .toBe('test-string');
  });

});

describe('splitUrl', () => {

  it('should split Url', () => {
    expect(splitUrl('test/route/path'))
      .toEqual(['test', 'route', 'path']);
  });

  it('should remove query params', () => {
    expect(splitUrl('test/route/path?query=params'))
      .toEqual(['test', 'route', 'path']);
  });
});

describe('urlLastChunk', () => {

  it('should return url last chunk', () => {
    expect(urlLastChunk('test/route/path'))
      .toBe('path');
  });

  it('should remove query params', () => {
    expect(urlLastChunk('test/route/path?query=params'))
      .toBe('path');
  });
});

describe('stripHtmlTags', () => {

  it('should strip HTML tags', () => {
    expect(stripHtmlTags('<p>test</p>'))
      .toBe('test');
  });
});
