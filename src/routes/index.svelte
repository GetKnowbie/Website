<script>
	let email = ""
</script>

<main>
    <div class="flex  flex-col h-screen justify-center content-center items-center space-y-3.5 w-auto mx-36">
		<p class="uppercase p-2 text-xs coming-soon-text tracking-widest">Coming soon!</p>
        <p class="font-bold purple-text text-3xl text-center w-auto">
            Innovative tools designed to help restaurants
            <span class="font-bold red-text">
				optimize
			</span>
            their #1 profit generator.
        </p>

		<div class="h-6"></div>

		<p class="mx-auto text-center w-6/12 purple-text-secondary">
			Restaurants face unique challenges that require creative solutions. Meet knowbie, a virtual training solution designed specifically for restaurants to increase staff training participation and impact by bringing the trainings to your staff.
		</p>

		<div class="flex flex-row justify-center items-center p-3">
			<input id="email" class="text-sm bg-white border rounded-full py-2.5 px-3 text-grey-darkest mx-2" type="email" required placeholder="Enter your email"
				   bind:value={email}>
			<button class="text-sm px-4 py-2.5 rounded-full text-white red-button">Tell me more</button>
		</div>
    </div>
</main>

<style style lang="postcss">

</style>
