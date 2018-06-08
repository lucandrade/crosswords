<template>
    <div>
        <h4>{{ title }}</h4>
        <ul>
            <li v-for="(word, pos) in words" v-bind:key="pos">
                <span>
                    {{ word.description }}
                    (<span
                        v-for="(w, k) in word.words"
                        v-bind:key="w">{{ w.length }}<span v-if="k < word.words.length-1">, </span></span>)
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Words",
    props: ['title', 'words'],
    computed: {
        wordsLengthComputed: words => words.length,
    },
    methods: {
        wordsLength: words => words.reduce((carry, word) => {
            if (typeof word === 'string') {
                return carry + word.length;
            }

            return carry;
        }, 0),
    },
}
</script>

<style lang="scss" scoped>
ul {
    padding: 0;
    li {
        list-style-type: none;
    }
}
</style>