# fuma

My fullstack material build with sveltekit, daisyui, zod and more ...

## Fast setup

```sh
echo "Enter project's name : " && read project_name
echo "Enter mysql username : " && read mysql_username

pn create svelte@latest $project_name
cd $project_name
px svelte-add@latest tailwindcss --tailwindcss-daisyui --tailwindcss-typography
pn install
pn install fuma prisma lucia oslo @lucia-auth/adapter-prisma
sed -i "s|\}'\],|\}', './node_modules/**/fuma/dist/**/*.svelte'\],|g" tailwind.config.cjs
# TODO: tailwind.config {darkMode: 'class', }


sed -i 's|"singleQuote": true,|"singleQuote": true,\n\t"semi": false,|g' .prettierrc

# Prisma
px prisma init --datasource-provider mysql

mkdir -p ./src/lib/server
source="https://raw.githubusercontent.com/peufo/fuma/main"
curl "$source/prisma/schema.prisma" -o ./prisma/schema.prisma
curl "$source/src/lib/private/prisma.ts" -o ./src/lib/server/prisma.ts

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
auth="src/routes/auth"
mkdir -p "./$auth"
curl "$source/src/app.d.ts" -o ./src/app.d.ts
curl "$source/src/hooks.server.ts" -o ./src/hooks.server.ts
curl "$source/src/lib/server/auth.ts" -o ./src/lib/server/auth.ts
curl "$source/$auth/+page.svelte" -o "./$auth/+page.svelte"
curl "$source/$auth/+page.server.ts" -o "./$auth/+page.server.ts"

sed -i 's|import Login .*|import { Login } from "fuma"|g' "./$auth/+page.svelte"
sed -i 's|$lib/validation/zod.js|fuma|g' "./$auth/+page.server.ts"
sed -i 's|$lib/server/index.js|fuma/server|g' "./$auth/+page.server.ts"

git init && git add -A && git commit -m "Initial commit"
```
