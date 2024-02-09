import {Server} from "socket.io"

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    ws: Server
  }
}
