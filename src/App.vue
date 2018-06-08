<template>
    <b-container fluid id="app" class="mt-5">
        <b-row>
            <b-col>
                <Board
                        v-bind:words="words"
                        v-bind:rows="rows"
                        v-bind:columns="columns"
                        v-bind:wordFocused="wordFocused"
                        v-bind:letterFocused="letterFocused"
                        v-bind:letters="letters"
                        v-on:letterChanged="handleLetterChanged"
                        v-on:letterFocused="handleFocus"/>
            </b-col>
            <b-col cols="4">
                <b-row>
                    <b-col>
                        <Words title="Across" v-bind:key="1" v-bind:words="across" />
                    </b-col>
                    <b-col>
                        <Words title="Down" v-bind:key="2" v-bind:words="down" />
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Words from './components/Words';
import Board from './components/Board';
import store from './store';

export default {
    name: 'app',
    components: { Board, Words },
    data: () => ({
        words: store.state.words,
        across: store.state.words.filter(w => w.direction === 'across'),
        down: store.state.words.filter(w => w.direction === 'down'),
        wordFocused: store.state.focus.word,
        letterFocused: store.state.focus.letter,
        rows: store.state.rows,
        columns: store.state.columns,
        letters: store.state.letters,
    }),
    methods: {
        lettersForRow: function letterForRow(row) {
            const start = this.columns * row;
            return this.letters.slice(start, start + this.columns);
        },
        handleLetterChanged: function (letter, value) {
            // letter.value = value;
            // this.letters = letter;
        },
        handleFocus: function (letter) {
            // this.wordFocused = letter.wordNumber[0];
            // this.letterFocused = letter.pos;
        },
    },
}
</script>

<style>

</style>
