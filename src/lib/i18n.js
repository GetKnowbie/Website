// import i18next from 'i18next';

// export const i18n = function() {return ""}
// export const changeLocale = {}
//

import { derived, writable } from 'svelte/store';

import enLabels from './en.json';
import frLabels from './fr.json';


const labelsStore = writable(enLabels);

export const EN_LOCALE = "en";
export const FR_LOCALE = "fr";
export let currentLocale = writable(EN_LOCALE);

export const changeLocale = (newLocale) => {
    if (newLocale === EN_LOCALE) {
        labelsStore.set(enLabels)
        currentLocale.set(newLocale)
    } else if (newLocale === FR_LOCALE) {
        labelsStore.set(frLabels)
        currentLocale.set(newLocale)
    }
}


const OBJECT_PROPERTY_SEPARATOR = "."

const crawlLabelsToFindRequestedTranslation = (currentLabels, translationKey) => {
    const pathToFollowInLabels = translationKey.split(OBJECT_PROPERTY_SEPARATOR)
    let currentPositionInLabels = currentLabels
    for (let i = 0; i < pathToFollowInLabels.length; i++) {
        currentPositionInLabels = currentPositionInLabels[pathToFollowInLabels[i]]
        if (!currentPositionInLabels) {
            return translationKey
        }
    }
    return currentPositionInLabels
}

export const i18n = derived(labelsStore, (labelsForCurrentLocale) => {
    return (translationKey) => {
        if (!translationKey.includes(OBJECT_PROPERTY_SEPARATOR)) {
            return labelsForCurrentLocale[translationKey] || translationKey
        }
        return crawlLabelsToFindRequestedTranslation(labelsForCurrentLocale, translationKey)
    }
})








