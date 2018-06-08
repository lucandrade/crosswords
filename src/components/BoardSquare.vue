<template>
    <div class="square" v-bind:class="{ black: !letter, focus: isFocused, highlighted: isHighlighted }">
        <input
                type="text"
                v-if="letter"
                placeholder="A"
                v-bind:value="letter.value"
                @focus="handleFocus"
                @keydown="validateChange"
                @keyup="handleChange" />
        <span v-if="letter && letter.number" class="number">{{ letter.number }}</span>
    </div>
</template>

<script>
export default {
    name: "BoardSquare",
    props: ['letter', 'value', 'wordFocused', 'letterFocused'],
    computed: {
        isFocused: function () {
            if (!this.letter) {
                return false;
            }

            return this.letter.wordNumber.indexOf(this.wordFocused) >= 0;
        },
        isHighlighted: function () {
            if (!this.letter) {
                return false;
            }

            return this.letterFocused == this.letter.pos;
        },
    },
    methods: {
        validateChange: function (e) {
            if (this.$el.querySelector('input').value.length > 0) {
                e.preventDefault();
                e.stopPropagation();

                if (e.key !== this.previousValue && e.key.length === 1) {
                    this.$el.querySelector('input').value = e.key;
                }
            }
        },
        handleChange: function (e) {
            if (this.$el.querySelector('input').value !== this.previousValue) {
                this.$emit('letterChanged', this.letter, this.$el.querySelector('input').value);
            }

            this.previousValue = this.$el.querySelector('input').value;
        },
        handleFocus: function (e) {
            this.$emit('letterFocused', this.letter);
        }
    }
}
</script>

<style lang="scss" scoped>
.square {
    grid-auto-columns: auto;
    position: relative;
    margin: 0px;
    font-weight: bold;
    font-size: 1.5em;
    text-align: center;
    color: black;
    border-left: solid 1px black;
    border-bottom: solid 1px black;
    display: flex;

    &:before {
        content:'';
        float:left;
        padding-top:100%;
    }

    &.black {
        background-color: black;
    }

    &.focus {
        background-color: #ffffad;
    }

    &.highlighted {
        background-color: yellow;
    }

    .number {
        position: absolute;
        top: 0;
        left: 2px;
        font-size: 50%;
        font-weight: 200;
    }

    input {
        border: none;
        width: 100%;
        text-align: center;
        vertical-align: middle;
        text-transform: uppercase;
        background-color: transparent;
        flex: 1;

        &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
            opacity: 0;
        }
        &::-moz-placeholder { /* Firefox 19+ */
            opacity: 0;
        }
        &:-ms-input-placeholder { /* IE 10+ */
            opacity: 0;
        }
        &:-moz-placeholder { /* Firefox 18- */
            opacity: 0;
        }
        &::placeholder {
            opacity: 0;
        }

        &:focus {
            &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
                opacity: 1;
            }
            &::-moz-placeholder { /* Firefox 19+ */
                opacity: 1;
            }
            &:-ms-input-placeholder { /* IE 10+ */
                opacity: 1;
            }
            &:-moz-placeholder { /* Firefox 18- */
                opacity: 1;
            }
            &::placeholder {
                opacity: 1;
            }
            outline: none;
        }
    }
}

.game {
    .board {
        .square {
            &:nth-child(13n) {
                border-right: solid 1px black;
            }
            &:nth-child(-n+13) {
                border-top: solid 1px black;
            }
        }
    }
}
</style>