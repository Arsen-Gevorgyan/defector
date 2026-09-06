export default function bot({ history, memory }) {
    let move;
    if (history.length < 3) {
        move = Math.random() < 0.5 ?  "C" : "D";
    }
    const recent = history.slice(-5);

    let def = 0;
    for (const round of recent) {
        if (round.opponent === "D") {
            ++def;
        }
    }

    if (def >= 3) {
        move = "D";
    }
    else {
        move = history.at(-1).opponent === "D" ? "D" : "C";
    }
    return [move, memory];
}