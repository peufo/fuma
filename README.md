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

mkdir -p ./src/lib/server
source="https://raw.githubusercontent.com/peufo/fuma/main"
wget "$source/prisma/schema.prisma" -O ./prisma/schema.prisma
wget "$source/src/lib/server/prisma.ts" -O ./src/lib/server/prisma.ts

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
auth="src/routes/auth"
mkdir -p "./$auth"
wget "$source/src/app.d.ts" -O ./src/app.d.ts
wget "$source/src/hooks.server.ts" -O ./src/hooks.server.ts
wget "$source/src/lib/server/auth.ts" -O ./src/lib/server/auth.ts
wget "$source/$auth/+page.svelte" -O "./$auth/+page.svelte"
wget "$source/$auth/+layout.svelte" -O "./$auth/+layout.svelte"
wget "$source/$auth/+page.server.ts" -O "./$auth/+page.server.ts"


git init && git add -A && git commit -m "Initial commit"
```
