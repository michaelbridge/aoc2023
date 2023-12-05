import run from 'aocrunner'
import _ from 'lodash'

const parseInput = (rawInput: string) => rawInput
const getVals = (str: string) => str.match(/(\d+)/g).map(Number)
const getMatches = (line: string) => {
	const [winners, numbers] = line.match(/(?<=:).*/)[0].split('|')
	return _.intersection(getVals(winners), getVals(numbers))
}

const part1 = (rawInput: string) => {
	const lines = parseInput(rawInput).split('\n')
	return lines.reduce((acc, line) => {
		const matchCount = getMatches(line).length
		if (matchCount === 0) return acc
		return acc + 2 ** (matchCount - 1)
	}, 0)
}

const part2 = (rawInput: string) => {
	const lines = parseInput(rawInput).split('\n')
	const countByCard = lines.reduce((acc, line, i) => {
		const matches = getMatches(line)
		acc[i] = (acc[i] ?? 0) + 1
		matches.forEach(
			(match, j) => (acc[i + j + 1] = (acc[i + j + 1] ?? 0) + acc[i]),
		)
		return acc
	}, [])
	return _.sum(Object.values(countByCard))
}

run({
	part1: {
		tests: [
			{
				input: `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
        `,
				expected: 13,
			},
		],
		solution: part1,
	},
	part2: {
		tests: [
			{
				input: `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
				`,
				expected: 30,
			},
		],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: false,
})
