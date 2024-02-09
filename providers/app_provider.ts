import type { ApplicationService } from '@adonisjs/core/types'
import {Server} from "socket.io";
import server from "@adonisjs/core/services/server";

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {}

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {
    await this.app.ready((application) => {
      application.container.singleton('ws', () => {
        return new Server(server.getNodeServer())
      })
    })
  }

  /**
   * The process has been started
   */
  async ready() {


  }

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}
