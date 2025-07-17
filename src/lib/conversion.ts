// Hacky rewrite of https://github.com/arutarimu/KrEnInput

type HangulToLatinMap = {
	[key: string]: string;
};

const FIRST_CHAR = [
	'ㄱ',
	'ㄲ',
	'ㄴ',
	'ㄷ',
	'ㄸ',
	'ㄹ',
	'ㅁ',
	'ㅂ',
	'ㅃ',
	'ㅅ',
	'ㅆ',
	'ㅇ',
	'ㅈ',
	'ㅉ',
	'ㅊ',
	'ㅋ',
	'ㅌ',
	'ㅍ',
	'ㅎ'
];
const MID_CHAR = [
	'ㅏ',
	'ㅐ',
	'ㅑ',
	'ㅒ',
	'ㅓ',
	'ㅔ',
	'ㅕ',
	'ㅖ',
	'ㅗ',
	'ㅘ',
	'ㅙ',
	'ㅚ',
	'ㅛ',
	'ㅜ',
	'ㅝ',
	'ㅞ',
	'ㅟ',
	'ㅠ',
	'ㅡ',
	'ㅢ',
	'ㅣ'
];
const FINAL_CHAR = [
	' ',
	'ㄱ',
	'ㄲ',
	'ㄳ',
	'ㄴ',
	'ㄵ',
	'ㄶ',
	'ㄷ',
	'ㄹ',
	'ㄺ',
	'ㄻ',
	'ㄼ',
	'ㄽ',
	'ㄾ',
	'ㄿ',
	'ㅀ',
	'ㅁ',
	'ㅂ',
	'ㅄ',
	'ㅅ',
	'ㅆ',
	'ㅇ',
	'ㅈ',
	'ㅊ',
	'ㅋ',
	'ㅌ',
	'ㅍ',
	'ㅎ'
];
const KR_EN_DICT: HangulToLatinMap = {
	ㅂ: 'q',
	ㅈ: 'w',
	ㄷ: 'e',
	ㄱ: 'r',
	ㅅ: 't',
	ㅛ: 'y',
	ㅕ: 'u',
	ㅑ: 'i',
	ㅐ: 'o',
	ㅔ: 'p',
	ㅁ: 'a',
	ㄴ: 's',
	ㅇ: 'd',
	ㄹ: 'f',
	ㅎ: 'g',
	ㅗ: 'h',
	ㅓ: 'j',
	ㅏ: 'k',
	ㅣ: 'l',
	ㅋ: 'z',
	ㅌ: 'x',
	ㅊ: 'c',
	ㅍ: 'v',
	ㅠ: 'b',
	ㅜ: 'n',
	ㅡ: 'm',
	ㅃ: 'Q',
	ㅉ: 'W',
	ㄸ: 'E',
	ㄲ: 'R',
	ㅆ: 'T',
	ㅒ: 'O',
	ㅖ: 'P',
	ㅘ: 'hk',
	ㅙ: 'ho',
	ㅚ: 'hl',
	ㅝ: 'nj',
	ㅞ: 'np',
	ㅟ: 'nl',
	ㅢ: 'ml',
	ㄳ: 'rt',
	ㄵ: 'sw',
	ㄶ: 'sg',
	ㄺ: 'fr',
	ㄻ: 'fa',
	ㄼ: 'fq',
	ㄽ: 'ft',
	ㄾ: 'fx',
	ㄿ: 'fv',
	ㅀ: 'fg',
	ㅄ: 'qt'
};

function decompose(korean: string) {
	const wordList = [...korean];
	const result = [];
	const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;

	for (const word of wordList) {
		if (koreanRegex.test(word)) {
			const char = word.charCodeAt(0) - 44032;
			const first = Math.floor(char / 588);
			result.push(FIRST_CHAR[first]);
			const mid = Math.floor((char - first * 588) / 28);
			result.push(MID_CHAR[mid]);
			const final = Math.floor(char - first * 588 - mid * 28);
			if (FINAL_CHAR[final] !== ' ') {
				result.push(FINAL_CHAR[final]);
			}
		} else {
			result.push(word);
		}
	}
	return result;
}

function convert(wordList: string[]) {
	let result = '';
	for (const char of wordList) {
		result += KR_EN_DICT[char] || char;
	}
	return result;
}

export function hangulToLatin(hangul: string) {
	return convert(decompose(hangul));
}
