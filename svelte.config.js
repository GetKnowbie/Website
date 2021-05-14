/** @type {import('@sveltejs/kit').Config} */

import sveltePreprocess from "svelte-preprocess"
import adapter_vercel from '@sveltejs/adapter-vercel';
// import node from '@sveltejs/adapter-node'
// import pkg from './package.json'


const config = {
	preprocess: [
		sveltePreprocess({
			defaults: {
				style: "postcss",
			},
			postcss: true
		}),
	],
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: adapter_vercel(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			build: {
				target: "esnext"
			}
			// ssr: {
			// 	noExternal: ["realm-web"]
			// }
		}
	}

};

export default config;
