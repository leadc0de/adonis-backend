import app from "@adonisjs/core/services/app"

app.ready(async () => {
  const wss = await app.container.make('ws')

  wss.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on('test', (data) => {
      console.log(data, socket);
    });
  })
})
