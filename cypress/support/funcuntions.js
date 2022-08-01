export const functions = {
    generateUsername() {
        const names = [
            "Zeus",
            "Hera",
            "Poseidon",
            "Artemis",
            "Hades",
        ];
        const randomNum = Math.floor(Math.random() * 1000);
        const pickedNameIndex = Math.floor(Math.random() * names.length);
        return `${names[pickedNameIndex]}${randomNum}`;
}
}