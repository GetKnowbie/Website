<script>
    import * as Realm from "realm-web";
    import {app} from "$lib/stores"

    import { i18n } from '$lib/i18n';

    // A localized message injected in the script
    $: authenticationErrorMessage = $i18n('authenticationError')


    let email = ""

    async function loginAnonymous() {
        // Create an anonymous credential
        const credentials = Realm.Credentials.anonymous();
        try {
            await $app.logIn(credentials);
        } catch (err) {
            console.error("Failed to log in", err);
        }
    }

    async function saveEmail() {
        await loginAnonymous()
        let mongodb = $app.currentUser.mongoClient("mongodb-atlas");
        let emailsColl = mongodb.db("web").collection("Email");

        let emails =  await  emailsColl.find()



        // await operators.insertOne({
        //     email: email
        // });

        email = ""

        console.log(emails)

    }

</script>

<main>
    <div class="flex flex-col h-screen w-auto my-20 items-center space-y-3.5 w-auto mx1">
        <!--		<div class="h-screen"></div>-->
        <p class="fontp1 uppercase p-2 text-xs coming-soon-text tracking-widest pt-10">{$i18n("coming_soon")}</p>
        <p class="fontp0 font-extrabold px-5 purple-text text-3xl text-center w-auto">
            {$i18n("header_intro1")}
            <span class="font-bold red-text">
				{$i18n("header_intro2")}
			</span>
            {$i18n("header_intro3")}
        </p>

        <div class="h-6"></div>

        <p class="fontp1 mx-auto text-center w-11/12 purple-text-secondary">
            {$i18n("body_paragraph1")}
        </p>



        <p class="fontp1 mx-auto text-center w-11/12 purple-text-secondary pb-9">
            {$i18n("body_paragraph2")}
        </p>

        <form on:submit|preventDefault={saveEmail}
              class="flex flex-col space-y-3 md:space-y-0  md:flex-row  align-middle content-center justify-center text-center  p-2 mx-auto  space-x-3">
            <input id="email"
                   class="w-60 self-center appearance-none text-xs  border rounded-full py-3 px-3 text-grey-darkest mx-2"
                   type="email" required placeholder={$i18n("enter_email")}
                   bind:value={email}>
            <button type="submit" class="self-center text-xs px-4 py-3 rounded-full text-white red-button">
                {$i18n("tell_me_more")}
            </button>
        </form>
    </div>
</main>

<style style lang="postcss">

</style>
