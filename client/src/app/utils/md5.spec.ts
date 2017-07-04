import { md5 } from './md5';

describe('md5', () => {

  it('returns proper hash', () => {
    expect(md5('password'))
      .toBe('5f4dcc3b5aa765d61d8327deb882cf99');
  });
});
