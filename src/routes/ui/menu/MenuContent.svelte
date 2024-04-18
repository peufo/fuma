<script lang="ts">
	import { mdiGoogle, mdiFacebook, mdiInstagram } from '@mdi/js'

	import { Icon } from '$lib/index.js'
</script>

<ul>
	<li>
		<a class="menu-item" href="#facebook">
			<Icon path={mdiFacebook} />
			<span>Facebook</span>
		</a>
	</li>
	<li>
		<a class="menu-item" href="#insta">
			<Icon path={mdiInstagram} />
			<span>Instagram</span>
		</a>
	</li>
	<li>
		<a class="menu-item" href="#google">
			<Icon path={mdiGoogle} />
			<span>Google</span>
		</a>
	</li>
</ul>
