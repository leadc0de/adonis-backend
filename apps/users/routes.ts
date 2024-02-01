import router from '@adonisjs/core/services/router'
import {middleware} from "#start/kernel";

const UsersController = () => import("#apps/users/controllers/users_controller")
const RolesController = () => import("#apps/users/controllers/roles_controller")
const PermissionsController = () => import('#apps/users/controllers/permissions_controller')

router.group(() => {
  router.group(() => {
    router.get('/', [UsersController, 'index'])
    router.get('/:id', [UsersController, 'show'])
    router.post('/', [UsersController, 'store'])
  }).prefix('users')

  router.group(() => {
    router.get('/', [RolesController, 'index'])
    router.get('/:id', [RolesController, 'show'])
    router.post('/', [RolesController, 'store'])
    router.post('/:id', [RolesController, 'update'])
    router.delete('/:id', [RolesController, 'destroy'])
  }).prefix('roles')

  router.group(() => {
    router.get('/', [PermissionsController, 'index'])
  }).prefix('/permissions')
}).use(middleware.auth())
