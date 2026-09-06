export default function bot({ history, memory }) {
    if (history.length < 5) {
        return [Math.random() < 0.5 ? "C" : "D", memory];
    }

    const recent = history.slice(-8);

    let cor = 0;
    let def = 0;

    for (const round of recent) {
        if (round.opponent === "C") {
            ++cor;
        } else{
            ++def;
        }
    }

    if (def >= 6) {
        return ["D", memory];
    }

    if (cor >= 7) {
        if (Math.random() < 0.25) {
            return ["D", memory];
        }
        return ["C", memory];
    }

    let afterC = { C: 0, D: 0 };
    let afterD = { C: 0, D: 0 };

    for (let i = 1; i < history.length; ++i) {
        const prev = history[i - 1];
        const current = history[i];

        if (prev.me === "C") {
            ++afterC[current.opponent];
        }
        else {
            ++afterD[current.opponent];
        }
    }
    
    const counter = afterC.D > afterC.C && afterD.C > afterD.D;

    if (counter) {
        return [Math.random() < 0.5 ? "C" : "D", memory];
    }

    return [history.at(-1).opponent, memory];
}