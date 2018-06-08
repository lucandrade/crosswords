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
import data from './crossword';
import Words from './components/Words';
import Board from './components/Board';

export default {
    name: 'app',
    components: {Board, Words },
    computed: {
        across: function acrossWords() {
            return this.crossword.filter(w => w.direction === 'across');
        },
        down: function downWords() {
            return this.crossword.filter(w => w.direction === 'down');
        },
        words: function allWords() {
            return this.crossword.sort((a, b) => {
                const aStart = a.column + a.row;
                const bStart = b.column + b.row;

                if (aStart > bStart) {
                    return 1;
                } else if (bStart > aStart) {
                    return -1;
                }

                return 0;
            });
        },
        rows: function lines() {
            const number = this.crossword.reduce((carry, word) => {
                if (!word.hasOwnProperty('row')) {
                    return carry;
                }

                if (word.row > carry) {
                    return word.row;
                }

                return carry;
            }, 0);

            return number + 1;
        },
        columns: function lines() {
            const number = this.crossword.reduce((carry, word) => {
                if (!word.hasOwnProperty('row')) {
                    return carry;
                }

                if (word.column > carry) {
                    return word.column;
                }

                return carry;
            }, 0);
            return number + 1;
        },
        letters: {
            get: function letters() {
                const me = this;
                const letters = new Array(me.columns * me.rows);
                let start;
                let wholeWord;
                let i;
                let counterWords = 1;
                let counterLetters = 0;
                let pos;

                this.crossword.forEach((word, w) => {
                    start = (word.row * me.rows) + word.column;
                    wholeWord = word.words.join('');

                    for (i = 0; i < wholeWord.length; i += 1) {
                        if (word.direction === 'across') {
                            pos = start + i;
                        } else {
                            pos = start + (i * me.columns);
                        }

                        letters[pos] = letters[pos] || {
                            letter: wholeWord[i],
                            pos: counterLetters,
                            value: '',
                            wordNumber: [w]
                        };

                        if (letters[pos].wordNumber.indexOf(w) < 0) {
                            letters[pos].wordNumber.push(w);
                        }

                        if (i === 0 && !letters[pos].hasOwnProperty('number')) {
                            letters[pos]['number'] = counterWords;
                            counterWords++;
                        }

                        counterLetters++
                    }
                });

                return letters;
            },
            set: function setLetters(letter) {
                this.letters[letter.pos].value = letter.value;
            }
        },
    },
    data: () => ({
        crossword: data,
        wordFocused: null,
        letterFocused: null,
    }),
    methods: {
        lettersForRow: function letterForRow(row) {
            const start = this.columns * row;
            return this.letters.slice(start, start + this.columns);
        },
        handleLetterChanged: function (letter, value) {
            letter.value = value;
            this.letters = letter;
        },
        handleFocus: function (letter) {
            this.wordFocused = letter.wordNumber[0];
            this.letterFocused = letter.pos;
        },
    },
}
</script>

<style>

</style>
