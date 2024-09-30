## Getting Started

To start the dev server simply run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

To see the production version run:

```bash
npm run prod
# or
yarn prod
# or
pnpm prod
# or
bun prod
```

This command generates build and runs app in production mode.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## P.S.

I'm storing steps data seperately from flow data for a reason. In my opinion, it gives an additional flexibility in case we need to reuse the same screen for different flows. Let's say we want to know gender in each of 10 flows. Data for this page already exists in json file, we will just need to include it in our flow steps array to achieve desired result.

Also, I didn't try to make AdvBox and ContentBox into one component with type prop, because as from my experience, at any point some small features on each variant can change due to new requerements and it will cause a lot of checks (shitch/if) and grow a huge component.
