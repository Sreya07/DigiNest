# DigiNest Frontend

The frontend uses Vite 8, React 19, and Tailwind.

## Node Requirement

Use Node `20.19.0` or newer.

If `nvm use 20.19.0` fails on Windows with `Access is denied`, use the fallback scripts below. They call the Node 20 binary from `nvm-windows` directly and do not rely on the shared `C:\Program Files\nodejs` symlink.

## Commands

```bash
npm run dev:node20
npm run build:node20
npm run lint:node20
```

If your shell can switch versions normally, these also work:

```bash
nvm use 20.19.0
npm run dev
```
