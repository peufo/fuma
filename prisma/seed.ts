import { PrismaClient } from '@prisma/client'
import { mdiFountainPen, mdiPaletteOutline, mdiRulerSquare } from '@mdi/js'

const prisma = new PrismaClient()
async function main() {
	function upsertPostType(name: string, icon: string) {
		return prisma.postType.upsert({
			where: { name, icon },
			update: {},
			create: { name, icon }
		})
	}

	await upsertPostType('think', mdiPaletteOutline)
	await upsertPostType('writing', mdiFountainPen)
	await upsertPostType('plan', mdiRulerSquare)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
