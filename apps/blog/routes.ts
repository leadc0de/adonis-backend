import router from '@adonisjs/core/services/router'
import CategoriesController from '#apps/blog/controllers/categories_controller'
import ArticlesController from '#apps/blog/controllers/articles_controller'
import { middleware } from '#start/kernel'

router.group(() => {
  router.group(() => {
    router.post('', [CategoriesController, 'store'])
  }).prefix('category')

  router.group(() => {
    router.get('', [ArticlesController, 'index'])
    router.post('', [ArticlesController, 'store'])
  }).prefix('articles')
}).prefix('blog')
  .use(middleware.auth({
    guards: ['jwt']
  }))
