import run from 'aocrunner'
import _ from 'lodash'

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput)
	return input.split('\n').reduce((acc, line) => {
		const numbers = line.match(/\d+/g).join('')
		const lineValue = numbers[0] + _.last(numbers)
		return acc + parseInt(lineValue)
	}, 0)
}

const replaceMap = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
}

const pattern = new RegExp(
	`(?=(${Object.keys(replaceMap).join('|')}|\\d))`,
	'g',
)

const getValue = strOrNum => replaceMap[strOrNum] || strOrNum

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput)
	return input.split('\n').reduce((acc, line) => {
		const lineMatches = Array.from(line.matchAll(pattern), x => x[1])
		const firstMatch = lineMatches[0]
		const lastMatch = lineMatches.slice(-1)[0]
		return acc + parseInt(`${getValue(firstMatch)}${getValue(lastMatch)}`)
	}, 0)
}

run({
	part1: {
		tests: [
			{
				input: `1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet`,
				expected: 142,
			},
		],
		solution: part1,
	},
	part2: {
		tests: [
			{
				input: `two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen
				eighthree`,
				expected: 281 + 83,
			},
		],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: false,
})
