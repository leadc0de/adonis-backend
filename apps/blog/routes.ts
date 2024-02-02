import router from '@adonisjs/core/services/router'
import CategoriesController from '#apps/blog/controllers/categories_controller'

router.group(() => {
  router.group(() => {
    router.post('', [CategoriesController, 'store'])
  }).prefix('category')
}).prefix('blog')
