export default function bot({ history, memory }) {
    let move;
    if (history.length < 3) {
        move = Math.random() < 0.5 ?  "C" : "D";
    }
    let cor = 0;
    let def = 0;
    for (const round of history) {
        if (round.opponent === "C") {
            ++cor;
        }else{
            ++def;
        }
    }

    if (cor === history.length) {
        move = "C";
    }
    else if (def === history.length) {
        move = "D"
    }
    else {
        move = history.at(-1).opponent === "C" ? "D" : "C";
    }
    return [move, memory];
}