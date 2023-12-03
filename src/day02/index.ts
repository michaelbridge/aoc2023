import run from 'aocrunner'

const parseInput = (rawInput: string) => rawInput

const maxByColor = {
	red: 12,
	green: 13,
	blue: 14,
}

const getPattern = color => new RegExp(`(\\d+)(?= ${color})`, 'g')

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput)
	return input.split('\n').reduce((acc, line) => {
		const id = line.match(/(\d+)/)[0]
		const test = Object.keys(maxByColor).reduce((acc, color) => {
			const counts = Array.from(line.match(getPattern(color))).map(Number)
			return acc && Math.max(...counts) <= maxByColor[color]
		}, true)
		return acc + (test ? Number(id) : 0)
	}, 0)
}

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput)
	return input.split('\n').reduce((acc, line) => {
		return (
			acc +
			Object.keys(maxByColor).reduce((acc, color) => {
				const counts = Array.from(line.match(getPattern(color))).map(Number)
				return acc * Math.max(...counts)
			}, 1)
		)
	}, 0)
}

run({
	part1: {
		tests: [
			{
				input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
				expected: 8,
			},
		],
		solution: part1,
	},
	part2: {
		tests: [
			{
				input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
				expected: 2286,
			},
		],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: false,
})
