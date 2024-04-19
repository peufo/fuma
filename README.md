# fuma

My fullstake material build with sveltekit, daisyui, zod and more ...

## Fast setup

```sh
export project="myproject"
pn create svelte@latest $project
cd $project
pn i fuma
px svelte-add@latest tailwindcss
pn i -D daisyui@latest
sed -i "s/plugins: \[\]/plugins: \[require('daisyui')\],\n\tdaisyui: {\n\t\tlogs: false\n\t}\n/g" tailwind.config.cjs


git init && git add -A && git commit -m "Initial commit"
```
