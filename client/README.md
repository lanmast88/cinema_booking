# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
<div className="mt-5 flex flex-row items-center gap-3 flex-nowrap">
<button
type="button"
onClick={() => selectCinemaFilter(cinema.name)}
className="inline-flex max-w-full whitespace-normal rounded-xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-2 text-left text-sm font-semibold leading-snug text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/20" >
Добавить в фильтр расписания
</button>
</div>
