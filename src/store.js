import Vue from 'vue';
import Vuex from 'vuex';
import data from './crossword';

Vue.use(Vuex);

const sort = (words) => words.sort((a, b) => {
    if (a.row > b.row) {
        return 1;
    } else if (b.row > a.row) {
        return -1;
    } else if (a.column > b.column) {
        return 1;
    } else if (b.column > a.column) {
        return -1;
    }

    return 0;
});

const processData = (words) => {
    const ordered = sort(words);
    const positioned = ordered.map((word, i) => {
        word.pos = i;
        return word;
    });

    return positioned;
};

const rows = (words) => {
    const number = words.reduce((carry, word) => {
        if (!word.hasOwnProperty('row')) {
            return carry;
        }

        if (word.row > carry) {
            return word.row;
        }

        return carry;
    }, 0);

    return number + 1;
};

const columns = (words) => {
    const number = words.reduce((carry, word) => {
        if (!word.hasOwnProperty('column')) {
            return carry;
        }

        if (word.column > carry) {
            return word.column;
        }

        return carry;
    }, 0);

    return number + 1;
};

const letters = (words) => {
    const letters = new Array(columns(words) * rows(words));
    let start;
    let wholeWord;
    let i;
    let counterWords = 1;
    let counterLetters = 0;
    let pos;

    words.forEach((word, w) => {
        start = (word.row * rows(words)) + word.column;
        wholeWord = word.words.join('');

        for (i = 0; i < wholeWord.length; i += 1) {
            if (word.direction === 'across') {
                pos = start + i;
            } else {
                pos = start + (i * columns(words));
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
};

const store = new Vuex.Store({
    state: {
        words: processData(data),
        columns: columns(data),
        rows: rows(data),
        letters: letters(data),
        focus: {
            word: null,
            letter: null,
        },
    },
    mutations: {
        focus (state, payload) {
            console.log(payload);
        }
    }
});

export default store;
