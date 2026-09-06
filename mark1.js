export default function bot({history}) {
    if (history.length === 0) {
        return "C";
    }
    let move = history.at(-1).opponent === "C" ? "C" : "D";
    return move;
}