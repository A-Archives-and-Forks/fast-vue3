import type { RequestClient } from '@fast-vue3/request';

import type {
  ArticleItem,
  ArticleQuery,
  CategoryItem,
  CreateArticleParams,
  CreateCategoryParams,
  PageResult,
  UpdateArticleParams,
  UpdateCategoryParams,
} from '../types';

export function createContentApi(http: RequestClient) {
  const article = (id: number) =>
    http.get<ArticleItem>({
      url: `/content/articles/${id}`,
    });
  const articles = (params: ArticleQuery = {}) =>
    http.get<PageResult<ArticleItem>>({ params, url: '/content/articles' });
  const categories = () =>
    http.get<CategoryItem[]>({ url: '/content/categories' });

  return {
    article,
    articleDetail: article,

    articleCreate: (data: CreateArticleParams) =>
      http.post<ArticleItem>({ data, url: '/content/articles' }),

    articleDelete: (id: number) =>
      http.del<undefined>({ url: `/content/articles/${id}` }),

    articleUpdate: (id: number, data: UpdateArticleParams) =>
      http.put<ArticleItem>({ data, url: `/content/articles/${id}` }),

    articles,
    articleList: articles,

    categories,
    categoryList: categories,

    categoryCreate: (data: CreateCategoryParams) =>
      http.post<CategoryItem>({ data, url: '/content/categories' }),

    categoryDelete: (id: number) =>
      http.del<undefined>({ url: `/content/categories/${id}` }),

    categoryUpdate: (id: number, data: UpdateCategoryParams) =>
      http.put<CategoryItem>({ data, url: `/content/categories/${id}` }),
  };
}
