import { writable } from 'svelte/store';

import * as Realm from "realm-web";

export const app = writable(new Realm.App({id: "kwebsite-dfvrm"}));
