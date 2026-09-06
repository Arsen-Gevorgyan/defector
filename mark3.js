export default function bot({ history, memory }) {
    if (history.length < 3) {
        return [Math.random() < 0.5 ? "C" : "D", memory];
    }

    const recent = history.slice(-6);

    let cooperations = 0;
    let defections = 0;

    for (const round of recent) {
        if (round.opponent === "C") {
            cooperations++;
        } else {
            defections++;
        }
    }

    if (defections >= 3) {
        return ["D", memory];
    }

    if (cooperations >= 5) {
        if (Math.random() < 0.25) {
            return ["D", memory];
        }

        return ["C", memory];
    }

    return [history.at(-1).opponent, memory];
}