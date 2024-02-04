import env from "#start/env";

export default {
  realm: env.get('OIDC_REALM'),
  url: env.get('OIDC_URL'),
  admin: {
    clientId: env.get('OIDC_ADMIN_CLIENT_ID'),
    clientSecret: env.get('OIDC_ADMIN_CLIENT_SECRET')
  }
}
