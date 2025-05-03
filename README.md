# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/docs/reference/configuration)
- [CLI Usage](https://turbo.build/docs/reference/command-line-reference)
### 📚 LERNEN.IO

**LERNEN.IO** es una aplicación web diseñada para facilitar el aprendizaje de temas clave como **matemáticas** y **física**. A través de herramientas interactivas, explicaciones claras y ejercicios dinámicos, buscamos hacer que el conocimiento sea accesible, entretenido y eficaz.

---

## 🚀 Características principales

- 🎯 **Temas centrados en física y matemáticas**
- 🧠 **Ejercicios interactivos** para practicar y reforzar conceptos
- 📊 **Visualización de gráficos** para una mejor comprensión
- 🧩 **Generación automática de problemas** con IA (próximamente)
- 🌙 **Modo oscuro/claro** para una experiencia personalizada
- 🔒 **Control de accesos** y gestión de usuarios
- ⚙️ **Interfaz intuitiva y responsive**

---

## 🛠️ Tecnologías utilizadas

### Frontend
- Vue 3 + Nuxt 3
- TypeScript
- SCSS + BEM
  
### Backend
- Strapi v5 (Headless CMS)
- Node.js
- APIs personalizadas REST

### DevOps / CI
- ESLint + Prettier + Husky
- GitHub Flow

---

## 📐 Arquitectura

- **Modular y escalable**, con separación de responsabilidades.
- Uso de **composables** y **stores con Pinia**.
- Estilo organizado siguiendo **BEM** y principios **SOLID**.
- Control de errores centralizado y gestión de rutas protegidas.

---

## 🧪 Próximas funcionalidades

- 🧠 Integración con IA para ayudar a resolver problemas paso a paso
- ✍️ Panel de administración para profesores y creadores de contenido
- 🏆 Sistema de progreso y logros
- 🌐 Multilenguaje (i18n)

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Puedes usarlo libremente siempre que menciones la fuente.

---

## ✨ Demo

🚧 *Próximamente disponible una demo interactiva en línea.*