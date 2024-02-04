import keycloak from "#config/keycloak";
import axios from "axios";
import logger from "@adonisjs/core/services/logger";


type WellKnownKeyResponse = {
  keys: {
    kid: string
    kty: string
    alg: string
    use: string
    n: string
    e: string
    x5c: string[]
    x5t: string
    'x5t#S256': string
  }[]
}

type KeycloakConfig = {
  realm?: string
  url?: string
  admin: {
    clientId?: string
    clientSecret?: string
  }
}

export default class KeycloakService {
  private readonly config: KeycloakConfig
  private publicCert?: string

  constructor() {
    this.config = keycloak
  }

  public async getPublicCert(): Promise<string> {
    return this.publicCert ?? (await this.fetchOidcCert())
  }

  private async fetchOidcCert(): Promise<string> {
    const url = `${this.config.url}/realms/${this.config.realm}/protocol/openid-connect/certs`
    const { data } = await axios.get<WellKnownKeyResponse>(url)
    const rs256key = data.keys.filter((key) => key.alg === 'RS256')

    if (!rs256key) {
      throw new Error("RS256 key not found")
    }

    this.publicCert = rs256key[0].x5c[0]

    return this.publicCert
  }

  public async loginWithPassword(username: string, password: string) {
    logger.info(`User login: ${username}`)

    try {
      const resp = await axios.post(
        `${this.config.url}/realms/${this.config.realm}/protocol/openid-connect/token`,
        {
          grant_type: 'password',
          client_id: this.config.admin.clientId,
          client_secret: this.config.admin.clientSecret,
          password: password,
          username: username,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
          method: 'POST',
        }
      )

      return resp.data
    } catch (err) {
      throw new Error("Invalid Credentials")
    }
  }
}
