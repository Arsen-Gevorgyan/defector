export default function bot({ history, memory }) {
    if (history.length < 5) {
        return [Math.random() < 0.5 ? "C" : "D", memory];
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

    if (afterC.C >= afterC.D) {
        return ["C", memory];
    }

    return ["D", memory];
}