import run from 'aocrunner'

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
	const lines = parseInput(rawInput).split('\n')
	let sum = 0
	lines.forEach((line, i) => {
		Array.from(line.matchAll(/(\d+)/g)).forEach(match => {
			const start = match.index
			const end = match.index + match[0].length - 1
			const test = /[^\w\d\.]/g.test(
				[
					lines[i - 1]?.substring(start - 1, end + 2),
					lines[i + 1]?.substring(start - 1, end + 2),
					line[start - 1],
					line[end + 1],
				].join(''),
			)
			if (test) sum += Number(match[0])
		})
	})
	return sum
}

const deltas = [
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, -1],
	[0, 1],
	[1, -1],
	[1, 0],
	[1, 1],
]

const part2 = (rawInput: string) => {
	const lines = parseInput(rawInput).split('\n')
	const locs = []
	lines.forEach((line, row) => {
		Array.from(line.matchAll(/\d+/g)).forEach(match => {
			const start = match.index
			const len = match[0].length
			for (let col = start; col < start + len; col++) {
				if (!locs[row]) locs[row] = []
				locs[row][col] = {
					id: `${row}.${start}`,
					val: Number(match[0]),
				}
			}
		})
	})
	let tot = 0
	lines.forEach((line, row) => {
		Array.from(line).forEach((char, col) => {
			if (char === '*') {
				const nums: Record<string, number> = deltas.reduce(
					(acc, [dRow, dCol]) => {
						const { id, val } = locs[row + dRow]?.[col + dCol] || {}
						if (id && !(id in acc)) acc[id] = val
						return acc
					},
					{},
				)
				if (Object.keys(nums).length === 2) {
					tot += Object.values(nums).reduce((a, b) => a * b, 1)
				}
			}
		})
	})
	return tot
}

run({
	part1: {
		tests: [
			{
				input: `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
				expected: 4361,
			},
		],
		solution: part1,
	},
	part2: {
		tests: [
			{
				input: `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
				expected: 467835,
			},
		],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: false,
})
