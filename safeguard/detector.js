function classifyText(text, { sensitivity = 0.5 } = {}) {
    const patterns = [
        /send\s+me\s+money/i,
        /i['’]ll\s+expose/i,
        /if\s+you\s+don['’]t/i,
        /threat/i,
        /blackmail/i
    ];

    let matches = patterns.filter(p => p.test(text));
    let score = matches.length / patterns.length;

    return {
        score,
        label: score >= sensitivity ? "warning" : "safe",
        reasons: matches.map(m => m.toString())
    };
}
