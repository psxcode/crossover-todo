export function matches(element: any, selectorName: string): boolean {

  const proto: any = Element.prototype,
    func =
      proto['matches'] ||
      proto['matchesSelector'] ||
      proto['mozMatchesSelector'] ||
      proto['msMatchesSelector'] ||
      proto['oMatchesSelector'] ||
      proto['webkitMatchesSelector'] ||
      function (s: any): boolean {
        const matches = (this.document || this.ownerDocument).querySelectorAll(s);
        let i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {
        }
        return i > -1;
      };

  return func.call(element, selectorName);
}
