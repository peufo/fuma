<script lang="ts">
	import { faker } from '@faker-js/faker';
	import { Spans, useSearch } from '$lib/next/search/index.ts';

	function createRandomUser() {
		return {
			userId: faker.string.uuid(),
			name: faker.person.fullName(),
			job: faker.person.jobTitle(),
			email: faker.internet.email(),
			avatar: faker.image.avatar(),
			birthdate: faker.date.birthdate(),
			registeredAt: faker.date.past()
		};
	}

	const users = faker.helpers.multiple(createRandomUser, {
		count: 40
	});

	const search = useSearch({
		items: users,
		keys: {
			name: {},
			job: {}
		},
		minMatchCharLength: 2,
		ignoreLocation: true,
		includeScore: true
	});
</script>

<div class="p-4">
	<label class="floating-label">
		<span>Search</span>
		<input
			type="text"
			class="input"
			placeholder="Search"
			oninput={(event) => {
				const { value } = event.currentTarget;
				search.query(value);
			}}
		/>
	</label>

	<div class="mt-4 flex flex-col gap-1">
		{#each search.results as { spans, score }}
			<div class="rounded border px-4 py-2">
				<h3 class="text-lg">
					<Spans spans={spans.name} />
				</h3>
				<p><Spans spans={spans.job} /></p>
				<p>score: {score}</p>
			</div>
		{/each}
	</div>
</div>
