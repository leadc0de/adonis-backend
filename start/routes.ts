/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import app from "@adonisjs/core/services/app";

router.get('/', async ({ response }) => {

  const t = await app.container.make('ws')

  console.log(t)
  return response.send('Hello world')
})
