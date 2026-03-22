# jpglabs-portfolio-frontend

Public Vite frontend for the portfolio surface.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run build:stage
npm run build:prod
```

## Environment modes

- local development uses `.env.development`
- the `release` lane uses the staging-oriented values from `.env.staging`
- the `master` lane uses `.env.production`

## Promotion lanes

- Canonical flow: `develop -> release -> master`
- This is a lightweight GitFlow-compatible flow, not full classic GitFlow.
- `release` is a short-lived stabilization lane, not a second integration branch.
- Pull requests into `release` must come from `develop`.
- Pull requests into `master` must come from `release`.
- `stage` is treated as a temporary compatibility alias for `release`.
- `main` is treated as a temporary compatibility alias for `master`.

## Validation

- `npm run lint`
- `npm run build`
- `npm run build:stage`
- `npm run build:prod`

## Notes

- This repo only covers the public frontend surface.
- Private operator flows belong in the authenticated AI-oriented app/backend split.
