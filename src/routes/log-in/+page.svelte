<script lang="ts">
	import { ethers } from 'ethers';
	import { goto } from '$app/navigation';
	import { v4 as uuidv4 } from 'uuid';
	import { ROUTES } from '$lib/routes';

	async function getOrCreateUser(address: string) {
		const userReq = await fetch(`/api/auth?id=${address}`);

		if (userReq.ok) {
			const user = await userReq.json();

			return user?.[0].key as string;
		}

		const key = uuidv4();

		await fetch(`/api/user`, {
			method: 'post',
			body: JSON.stringify({
				address,
				key
			})
		});

		return key;
	}

	async function connect() {
		if (!window.ethereum) return;

		const provider = new ethers.providers.Web3Provider(window.ethereum);

		await provider.send('eth_requestAccounts', []);
		const signer = provider.getSigner();
		const address = await provider.getSigner().getAddress();

		const userKey = await getOrCreateUser(address);

		const signedKey = await signer.signMessage(
			`This signature will be your encryption key:\n ${userKey}`
		);

		await fetch(`/api/auth`, {
			method: 'post',
			body: JSON.stringify({
				address,
				key: signedKey
			})
		});

		goto(ROUTES.home, {
			invalidateAll: true
		});
	}
</script>

<div>
	<button type="button" on:click={connect}>Connect</button>
</div>
