# Oráculo Site
[Demo](https://oraculodev.com)


## About
[About](https://oraculodev.com/about)

## License
This project is licensed under the MIT [LICENSE](License) – see the LICENSE file for details.

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

### Env vars

Copy `deploy/env.example` to `.env`

```
VUE_APP_ORACULO_API_URL=
VUE_APP_ORACULO_ADMIN_URL=
VUE_APP_CICD_URL=
VUE_APP_GTM=
```
