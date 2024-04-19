# fuma

My fullstack material build with sveltekit, daisyui, zod and more ...

## Fast setup

```sh
echo "Enter project's name : " && read project_name
echo "Enter mysql username : " && read mysql_username

pn create svelte@latest $project_name
cd $project_name
pn i fuma
px svelte-add@latest tailwindcss --tailwindcss-daisyui
sed -i "s|\}'\],|\}', './node_modules/**/fuma/dist/**/*.svelte'\],|g" tailwind.config.cjs
sed -i 's|"singleQuote": true,|"singleQuote": true,\n\t"semi": false,|g' .prettierrc

# Prisma
pn i prisma
px prisma init --datasource-provider mysql

# TODO: copy prisma/schema.prisma src/server/prisma.ts
echo "DATABASE_URL=\"mysql://$mysql_username@localhost:3306/$project_name\"" > .env
cp .env .env.example
px prisma migrate dev --name init
node -e "\
  const pkg = require('./package.json'); \
  pkg.scripts.migrate = 'prisma migrate dev'; \
  pkg.scripts.generate = 'prisma generate'; \
  pkg.scripts.studio = 'prisma studio'; \
  pkg.scripts.postinstall = 'prisma migrate deploy && prisma generate'; \
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, '	')); \
"

# Authentication
pn i lucia oslo @lucia-auth/adapter-prisma
# TODO: Copy src/app.d.ts src/hooks.server.ts src/lib/server/auth.ts src/routes/auth








git init && git add -A && git commit -m "Initial commit"
```
