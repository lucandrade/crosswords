<template>
<div class="game">
    <div class="board">
        <BoardSquare
                v-for="(n, i) in (rows * columns)"
                v-bind:key="i"
                v-bind:letter="letters[i]"
                v-bind:wordFocused="wordFocused"
                v-bind:letterFocused="letterFocused"
                v-on:letterChanged="handleLetterChanged"
                v-on:letterFocused="handleFocus" />
    </div>
</div>
</template>

<script>
import BoardSquare from './BoardSquare';

export default {
    name: "Board",
    components: { BoardSquare },
    props: ['words', 'rows', 'columns', 'letters', 'wordFocused', 'letterFocused'],
    methods: {
        handleLetterChanged: function (letter, value) {
            this.$emit('letterChanged', letter, value);
        },
        handleFocus: function (letter) {
            this.$emit('letterFocused', letter);
        },
    }
}
</script>

<style lang="scss" scoped>
.game {
    width: 100%;

    .board {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(13, auto [col-start]);
        grid-template-rows: repeat(13, auto [col-start]);
    }
}
</style>