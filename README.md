# Oráculo Site

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### CI/CD

If push code to the release branch, it will trigger deploy on the dev env.
If push code to the main branch, it will trigger deploy on the prod env.

### Envs

* dev - https://dev-oraculo.pesoreal.xyz/
* prod - https://oraculo.remessaonline.com.br/

### Env vars

Copy `deploy/env.example` to `.env`

```
VUE_APP_ORACULO_API_URL=
VUE_APP_ORACULO_ADMIN_URL=
VUE_APP_JENKINS_URL=
VUE_APP_SEC_SCANNER_URL=
VUE_APP_ALGOLIA_APP_ID=
VUE_APP_ALGOLIA_API_KEY=
VUE_APP_GTM=
```
