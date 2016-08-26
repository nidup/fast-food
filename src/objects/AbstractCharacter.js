class AbstractCharacter {
    play() {
        throw new TypeError("Do not call abstract method foo from child.");
    }
}

export default AbstractCharacter;