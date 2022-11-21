const ITEMS_PER_PAGE = 12;

export default class CatalogPageInfo {
  constructor({
    itemsCount,
    currentPage,
    categories,
    query,
    filters = {},
    itemsPerPageLimit = ITEMS_PER_PAGE,
  }) {
    this.itemsCount = itemsCount;
    this.currentPage = currentPage;
    this.categories = categories;
    this.query = query;
    this.filters = filters;
    this.itemsPerPageLimit = itemsPerPageLimit;

    this.pagesCount = Math.floor(this.itemsCount / this.itemsPerPageLimit);
    this.pagesCount += this.itemsCount % this.itemsPerPageLimit === 0 ? 0 : 1;

    this.limit = this.itemsPerPageLimit;
    this.offset = (this.currentPage - 1) * this.itemsPerPageLimit;
  }

  updatePageInfo(data) {
    return new CatalogPageInfo({
      ...this,
      ...data,
    });
  }

  otherPage(number) {
    return new CatalogPageInfo({
      ...this,
      currentPage: number,
    });
  }

  shiftedPage(shift) {
    return new CatalogPageInfo({
      ...this,
      currentPage: this.currentPage + shift,
    });
  }

  makeCommonUrlParams() {
    const params = new URLSearchParams();

    for (const category of this.categories) {
      params.append('category', category);
    }

    if (this.query) {
      params.append('q', this.query);
    }

    for (const [p, v] of Object.entries(this.filters)) {
      if (!v) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (Array.isArray(v)) {
        for (const val of v) {
          params.append(p, val);
        }
      } else {
        params.append(p, v);
      }
    }

    return params;
  }

  toBackendUrlParams() {
    const params = this.makeCommonUrlParams();
    params.append('limit', this.limit);
    params.append('offset', this.offset);
    return params;
  }

  toFrontendUrlParams() {
    const params = this.makeCommonUrlParams();
    params.append('page', this.currentPage);
    return params;
  }
}
