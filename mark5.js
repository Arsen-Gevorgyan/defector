const NODE_TYPES = {
    LEAF: -1,
    TEST_YOUR_MOVE: 0,
    TEST_OPPONENT: 1
}

const MOVE = {
    COOPERATE: 'C',
    DEFECT: 'D'
};

function getPolicy(policyId, history, startIdx) {
    const n = history.length;
    if (n === 0) return 'C';
    
    const last = history[n - 1];
    const prev = n >= 2 ? history[n - 2] : null;
    
    if (policyId === 0) {
        return adaptiveStrategy(history);
    }
    
    if (policyId === 1) return 'C';
    
    if (policyId === 2) return 'D';
    
    if (policyId === 3) {
        return last?.opponent || 'C';
    }
    
    if (policyId === 4) {
        if (n >= 2 && prev?.opponent === 'D' && last?.opponent === 'D') {
            return 'D';
        }
        return 'C';
    }
    
    if (policyId === 5) {
        if (last?.opponent === 'D' && Math.random() < 0.3) {
            return 'C';
        }
        return last?.opponent || 'C';
    }
    
    if (policyId === 6) {
        if (n >= 3 && history.slice(-3).every(r => r.opponent === 'D')) {
            return 'D';
        }
        return 'C';
    }
    
    if (policyId === 7) {
        if (IUP(history)) {
            return 'D';
        }
        return last?.opponent || 'C';
    }
    
    if (policyId === 8) {
        if (Math.random() < 0.3) return 'D';
        return 'C';
    }
    
    if (policyId === 9) {
        const hasOppDefected = history.some(r => r.opponent === 'D');
        return hasOppDefected ? 'D' : 'C';
    }
    
    if (policyId === 10) {
        const recent = history.slice(-10);
        const defections = recent.filter(r => r.opponent === 'D').length;
        if (defections / recent.length > 0.3) {
            return 'D';
        }
        return 'C';
    }
    
    return last?.opponent || 'C';
}

function adaptiveStrategy(history) {
    const n = history.length;
    if (n === 0) return 'C';
    
    const last = history[n - 1];
    const defRate = history.filter(r => r.opponent === 'D').length / n;
    
    if (n >= 5 && history.slice(-5).every(r => r.opponent === 'D')) {
        return 'D';
    }
    if (defRate > 0.8) {
        return 'D';
    }
    if (defRate === 0) {
        return Math.random() < 0.2 ? 'D' : 'C';
    }
    if (IUP(history)) {
        return 'D';
    }
    if (last.opponent === 'D' && Math.random() < 0.2) {
        return 'C';
    }
    return last.opponent || 'C';
}

function createNode(type, trueIdx, falseIdx, policy) {
    return { type, trueIdx, falseIdx, policy };
}

function buildTree() {
    return [
        createNode(NODE_TYPES.LEAF, 0, 0, 0),
        createNode(NODE_TYPES.TEST_OPPONENT, 2, 7, -1),
        createNode(NODE_TYPES.LEAF, 0, 0, 1),
        createNode(NODE_TYPES.LEAF, 0, 0, 5),
        createNode(NODE_TYPES.LEAF, 0, 0, 8),
        createNode(NODE_TYPES.LEAF, 0, 0, 3),
        createNode(NODE_TYPES.LEAF, 0, 0, 7),
        createNode(NODE_TYPES.TEST_OPPONENT, 8, 9, -1),
        createNode(NODE_TYPES.LEAF, 0, 0, 5),
        createNode(NODE_TYPES.LEAF, 0, 0, 2), 
        createNode(NODE_TYPES.LEAF, 0, 0, 10),       
        createNode(NODE_TYPES.LEAF, 0, 0, 2),        
        createNode(NODE_TYPES.TEST_OPPONENT, 13, 14, -1), 
        createNode(NODE_TYPES.LEAF, 0, 0, 2), 
        createNode(NODE_TYPES.LEAF, 0, 0, 1), 
    ]
}

function treeMove(history, tree) {
    if (history.length === 0) {
        return 'C';
    }
    let nodeIndex = 0;
    let currentNode = tree[nodeIndex];

    for (let i = 0; i < history.length; ++i) {
        const round = history[i];
        const [testType, trueIdx, falseIdx, leafPolicy] = currentNode;
        if (testType === -1) {
            return getPolicy(leafPolicy, history, i);
        }
        let conditionPass = false;
        if (testType === 0) {
            conditionPass = (round.you === 'C');
        }
        else if (testType === 1) {
            conditionPass = (round.opponent === 'C');
        }

        const nextIndex = conditionPass ? trueIdx : falseIdx;
        if (nextIndex === -1) {
            return getPolicy(leafPolicy, history, i);
        }
        nodeIndex = nextIndex;
        currentNode = tree[nodeIndex];
    }
    const [testType, trueIdx, falseIdx, leafPolicy] = currentNode;
    if (testType === -1) {
        return getPolicy(leafPolicy, history, history.length);
    }
    return getPolicy(0, history, history.length);
}

function IUP (history) { // Chechk is Unconditional Periodic for move tree
    const n = history.length;
    if (n < 8) return false;
    
    const start = Math.max(0, n - 20);
    let sawC = false, sawD = false;
    
    for (let i = start; i < n; i++) {
        if (history[i].opponent === 'C') sawC = true;
        else sawD = true;
    }
    if (!sawC || !sawD) return false;
    
    for (let period = 2; period <= 5; period++) {
        let matches = true;
        let comparisons = 0;
        
        for (let i = start + period; i < n; i++) {
            comparisons++;
            if (history[i].opponent !== history[i - period].opponent) {
                matches = false;
                break;
            }
        }
        
        if (matches && comparisons >= 6) {
            let isTFT = true;
            for (let i = Math.max(1, start); i < n; i++) {
                if (history[i].opponent !== history[i - 1].you) {
                    isTFT = false;
                    break;
                }
            }
            if (!isTFT) return true;
        }
    }
    
    return false;
}

export default function treeBot({ history, memory }) {
    try {
        const h = Array.isArray(history) ? history : [];
        
        if (h.length >= 5 && h.slice(-5).every(r => r.opponent === 'D')) {
            return ['D', null];
        }
        
        if (IUP(h)) {
            return ['D', null];
        }
        
        const tree = buildTree();
        const move = treeMove(h, tree);
        
        return [move, null];
    } catch (error) {
        return ['D', null];
    }
}