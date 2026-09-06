export default function bot({ history, memory }) {
    if (history.length === 0) {
        return ["C", memory];
    }

    const move = history.at(-1).opponent === "C" ? "C" : "D";

    return [move, memory];
}