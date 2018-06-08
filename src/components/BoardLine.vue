<template>
    <div class="line">
        <BoardSquare
                v-for="(n, i) in parseInt(size)"
                v-bind:key="n"
                v-bind:letter="letters[i]"
                v-on:letterChanged="doSomething" />
    </div>
</template>

<script>
import BoardSquare from './BoardSquare';

export default {
    name: "BoardLine",
    components: { BoardSquare },
    props: ['size', 'disabled', 'letters'],
    methods: {
        doSomething: function (letter, value) {
            this.$emit('letterChanged', letter, value);
        },
    },
}
</script>

<style lang="scss" scoped>
.line {
    display: flex;

    .square {
        &:last-child {
            border-right: solid 1px black;
        }
    }
}
</style>