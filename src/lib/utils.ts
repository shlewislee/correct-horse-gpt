export function getRandomWords(words: string[], count: number) {
	if (count > words.length) {
		throw new Error('why would you do that?');
	}

	const selected: string[] = [];
	const usedIndices = new Set<number>();

	while (selected.length < count) {
		const randomBuffer = new Uint32Array(1);
		crypto.getRandomValues(randomBuffer);
		const randomIndex = randomBuffer[0] % words.length;

		if (!usedIndices.has(randomIndex)) {
			selected.push(words[randomIndex]);
			usedIndices.add(randomIndex);
		}
	}

	return selected;
}
