import env from "#start/env";

export default {
  realm: env.get('OIDC_REALM'),
  url: env.get('OIDC_URL'),
  clientId: env.get('OIDC_CLIENT_ID'),
  clientSecret: env.get('OIDC_CLIENT_SECRET'),
  admin: {
    clientId: env.get('OIDC_ADMIN_CLIENT_ID'),
    clientSecret: env.get('OIDC_ADMIN_CLIENT_SECRET')
  }
}
