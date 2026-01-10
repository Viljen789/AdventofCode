import {readFileSync} from "fs";

interface Entries1 {
	lights: number[][];
	buttons: number[][];
	joltage: number[][];
}
interface Entries2 {
	lights: number[][];
	buttons: number[][][];
	joltage: number[][];
}

let entriesPart1: Entries1 = {
	lights: [],
	buttons: [],
	joltage: [],
};

let entriesPart2: Entries2 = {
	lights: [],
	buttons: [],
	joltage: [],
};
const memo = new Map<string, number>();

const readFilePart1Style = (): void => {
	const file = readFileSync("Day10.txt", "utf-8");
	const lines = file.split("\n").filter((line: string) => line.trim() !== "");

	const lights: number[][] = [];
	const buttons: number[][] = [];
	const joltage: number[][] = [];

	lines.forEach((line: string) => {
		const lightMatch = line.match(/^\[([.#]+)\]/);
		const lightChars = lightMatch ? lightMatch[1].split("") : [];
		let lightNum = 0;
		for (let pos = 0; pos < lightChars.length; pos++) {
			const idx = lightChars[pos];
			lightNum += idx === "#" ? 1 << pos : 0;
		}
		lights.push([lightNum, lightChars.length]);

		const lineButtonGroups: number[] = [];
		const buttonRegex = /\(([\d,]+)\)/g;
		let match;
		while ((match = buttonRegex.exec(line)) !== null) {
			let num: number = match[1].split(",").reduce((acc: number, n: string) => {
				// console.log(`n: ${n} 1<<n: ${1<<parseInt(n)}`);
				return acc + (1 << parseInt(n));
			}, 0);

			lineButtonGroups.push(num);
		}
		buttons.push(lineButtonGroups);
	});

	entriesPart1 = {lights, buttons, joltage};
};

const readFilePart2Style = (): void => {
	const file = readFileSync("Day10.txt", "utf-8");
	const lines = file.split("\n").filter((line: string) => line.trim() !== "");

	const lights: number[][] = [];
	const buttons: number[][][] = [];
	const joltage: number[][] = [];

	lines.forEach((line: string) => {
		const lineButtonGroups: number[][] = [];
		const buttonRegex = /\(([\d,]+)\)/g;
		let match;
		let buttonGroups = [];
		while ((match = buttonRegex.exec(line)) !== null) {
			buttonGroups.push(match[1].split(",").map((n: string) => parseInt(n)));
		}
		buttons.push(buttonGroups);

		const joltageMatch = line.match(/\{([\d,]+)\}$/);
		const lineJoltage = joltageMatch
			? joltageMatch[1].split(",").map((n: string) => parseInt(n))
			: [];
		joltage.push(lineJoltage);
	});

	entriesPart2 = {lights, buttons, joltage};
};

const countSetBits = (n: number): number => {
	let count = 0;
	while (n > 0) {
		n &= n - 1;
		count++;
	}
	return count;
};

const part1 = (): number => {
	readFilePart1Style();
	let tot = 0;
	for (let light = 0; light < entriesPart1.lights.length; light++) {
		const startLightConfig: number = entriesPart1.lights[light][0];
		const lightLength = entriesPart1.lights[light][1];
		// console.log(`Buttons length: ${entries.buttons[light].length}`);
		let currenntShortestCount = Infinity;
		for (
			let buttonIdx = 0;
			buttonIdx < 1 << entriesPart1.buttons[light].length;
			buttonIdx++
		) {
			let goalLightConfig = startLightConfig;
			let curLightConfig = 0;
			let clickedButtons = [];
			for (
				let button = 0;
				button < entriesPart1.buttons[light].length;
				button++
			) {
				curLightConfig ^=
					buttonIdx & (1 << button) ? entriesPart1.buttons[light][button] : 0;
				if (buttonIdx & (1 << button)) clickedButtons.push(button);
			}
			// console.log(
			// 	`Light: ${light} Light after button presses: ${clickedButtons}: ${Array.from(
			// 		{length: lightLength},
			// 		(_, i) => (curLightConfig & (1 << i) ? "#" : ".")
			// 	).join("")}`
			// );
			console.log("\n");
			if (curLightConfig === goalLightConfig) {
				// console.log(
				// 	`Match with buttons: ${clickedButtons}, which takes ${countSetBits(
				// 		buttonIdx
				// 	)} button presses\n`
				// );
				for (
					let button = 0;
					button < entriesPart1.buttons[light].length;
					button++
				) {
					if (buttonIdx & (1 << button))
						// console.log(
						// 	`Light: ${light} Button ${button}: ${
						// 		buttonIdx & (1 << button)
						// 	} current Buttons: ${entriesPart1.buttons[light][button]}`
						// );
				}
				const count = countSetBits(buttonIdx);
				if (count < currenntShortestCount) {
					currenntShortestCount = count;
				// 	console.log(
				// 		`New shortest: ${currenntShortestCount} with buttons: ${clickedButtons}`
				// 	);
				// }
			}
		}
		tot += currenntShortestCount;
		// console.log(`Shortest: ${currenntShortestCount}`);
	}
	return tot;
};
console.log(part1());

// const includeExclude = (joltage: number[], buttonIdx: number, buttonsList: number[][]): number => {
//     const key = `${joltage.join(",")}-${buttonIdx}`;
//     if(memo.has(key)) return memo.get(key)!;
//     if(joltage.every((jolt)=>jolt===0)) {
//         return 0;
//     }
//     if(buttonIdx >= buttonsList.length) {
//         return Infinity;
//     }
//     let minMoves:number = Infinity;
//     const skip = includeExclude(joltage, buttonIdx+1, buttonsList);
//     const currentButton: number[] = buttonsList[buttonIdx];
//     let nextJoltage = [...joltage];
//     let movesAdded = 0;
//     let breaked = false;
//     for (let i = 0; i < currentButton.length; i++) {
//         nextJoltage[currentButton[i]]--;
//         movesAdded++;
//         if (nextJoltage[currentButton[i]] < 0) {
//             breaked = true;
//             break;
//         }
//     }
//     let use = Infinity;
//     if(!breaked) {
//         const res = includeExclude(nextJoltage, buttonIdx, buttonsList);
//         if(res !== Infinity) use = res+1;
//     }
//     minMoves = Math.min(skip, use);
//     memo.set(key, minMoves);
//     return minMoves;
// }

const iterativeBottomUp = (
	joltageTarget: number[],
	buttonsList: number[][]
): number => {
	let lastButtonindex = new Map<number, number>();
	for (let i = buttonsList.length - 1; i >= 0; i--) {
		for (const btn of buttonsList[i]) {
			lastButtonindex.set(btn, i);
		}
	}
	let dp = new Map<string, number>();
	dp.set(Array.from({length: joltageTarget.length}, () => 0).join(","), 0);
	for (const buttons of buttonsList) {
		let nextDp = new Map<string, number>(dp);
		for (const [stateStr, moves] of dp.entries()) {
			let currentJoltage = stateStr.split(",").map((jolt) => parseInt(jolt));
			let tempJoltage = [...currentJoltage];
			let addedMoves = 0;
			while (true) {
				addedMoves += 1;
				let possible = true;
				for (const btn of buttons) {
					tempJoltage[btn]++;
					if (tempJoltage[btn] > joltageTarget[btn]) {
						possible = false;
						break;
					}
				}
				if (!possible) break;
				const nextKey = tempJoltage.join(",");
				const currentBest = nextDp.get(nextKey) ?? Infinity;

				if (moves + addedMoves < currentBest) {
					nextDp.set(nextKey, moves + addedMoves);
				}
			}
		}
		dp = nextDp;
	}
	// console.log(dp);
	return dp.get(joltageTarget.join(",")) ?? Infinity;
};
const getNumericKey = (joltage: number[]): bigint => {
	let key = 0n;
	for (let i = 0; i < joltage.length; i++) {
		key |= BigInt(joltage[i]) << BigInt(i * 8);
	}
	return key;
};
// const BFS = (
// 	joltageTarget: number[],
// 	buttons: number[][]
// ): number => {
// 	let dp = new Map<bigint, number>();
// 	const targetKey = getNumericKey(joltageTarget);
// 	let startJoltage = Array.from({length: joltageTarget.length}, () => 0);
// 	dp.set(getNumericKey(startJoltage), 0);
// 	let queue: [number[], number][] = [[startJoltage, 0]];
// 	let visited = new Map<bigint, number>();
// 	visited.set(getNumericKey(startJoltage), 0);
// 	let head = 0;
// 	while (queue.length > 0) {
// 		let [current, steps] = queue[head++];

// 		for (const btn of buttons) {
// 			let nextJoltage = [...current];
// 			let addedMoves = 0;
// 			let possible = true;
// 			for (const press of btn) {
// 				nextJoltage[press]++;
// 				if (nextJoltage[press] > joltageTarget[press]) {
// 					possible = false;
// 					break;
// 				}
// 			}
// 			if (possible) {
// 				addedMoves++;

// 				const nextKey = getNumericKey(nextJoltage);
// 				let currentBest = dp.get(nextKey) ?? Infinity;
// 				if (nextKey === targetKey) {
// 					return steps + 1;
// 				}
// 				if (!visited.has(nextKey) || steps + 1 < visited.get(nextKey)!) {
// 					visited.set(nextKey, steps + 1);
// 					queue.push([nextJoltage, steps + 1]);
// 				}
// 			}
// 		}
// 		if (head > 10_000) {
// 			queue.splice(0, head);
// 			head = 0;
// 		}
// 		if (visited.size > 10_000_000) {
// 			throw new Error("State space too large for memory");
// 		}
// 	}

// 	// console.log(dp);
// 	return Infinity;
// };

// const part2SolveLinearSystem = (
// 	buttons: number[][],
// 	target: number[]
// ): number => {
// 	const rows = target.length;
// 	const cols = buttons.length;

// 	const matrix = Array.from({length: rows}, () =>
// 		Array.from({length: cols + 1}, () => 0)
// 	);

// 	for (let col = 0; col < cols; col++) {
// 		const affectedIdx = buttons[col];
// 		for (const idx of affectedIdx) {
// 			matrix[idx][col] = 1;
// 		}
// 	}
// 	for (let row = 0; row < rows; row++) {
// 		matrix[row][cols] = target[row];
// 	}

// 	let pivotRow = 0;
// 	const colToRowMap = new Map<number, number>();

// 	for (let col = 0; col < cols && pivotRow < rows; col++) {
// 		let pivotCol = -1;

// 		for (let r = pivotRow; r < rows; r++) {
// 			if (matrix[r][col] !== 0) {
// 				pivotCol = r;
// 				break;
// 			}
// 		}

// 		if (pivotCol === -1) continue; // Col is all 0

// 		[matrix[pivotRow], matrix[pivotCol]] = [matrix[pivotCol], matrix[pivotRow]]; // swap rows

// 		const pivotVal = matrix[pivotRow][col];
// 		for (let c = col; c <= cols; c++) {
// 			matrix[pivotRow][c] /= pivotVal;
// 		}

// 		for (let row = 0; row < rows; row++) {
// 			if (row === pivotRow) continue;

// 			const factor = matrix[row][col];
// 			for (let c = col; c <= cols; c++) {
// 				matrix[row][c] -= matrix[pivotRow][c] * factor;
// 			}
// 		}
// 		colToRowMap.set(col, pivotRow);
// 		pivotRow++;
// 	}
// 	const solution = Array(cols).fill(0);
// 	for (let row = 0; row < rows; row++) {
// 		solution[row] = matrix[row][cols];
// 	}

// 	let totalPresses = 0;
// 	let verifyArray = Array.from({length: buttons.length}, () => 0);
// 	for (let i = 0; i < buttons.length; i++) {
// 		totalPresses += solution[i];
// 		const target = solution[i];
// 		const button = buttons[i];
// 		for (const btn of button) {
// 			verifyArray[btn] += target;
// 		}
// 	}
// 	if (verifyArray.every((_, idx) => verifyArray[idx] === target[idx])) {
// 		return totalPresses;
// 	}
// 	console.log(solution);
// 	console.log(target);
// 	console.log(verifyArray);

// 	return solution.reduce((a, b) => a + b, 0);
// };

// const Part2 = (): number => {
// 	readFilePart2Style();
// 	let tot = 0;
// 	for (
// 		let iteration = 0;
// 		iteration < entriesPart2.buttons.length;
// 		iteration++
// 	) {
// 		const min = part2SolveLinearSystem(
// 			entriesPart2.buttons[iteration],
// 			entriesPart2.joltage[iteration]
// 		);
// 		console.log(`Iter: ${iteration} Min: ${min}`);
// 		tot += min;
// 	}
// 	return tot;
// };
// // part1();
// // console.dir(entriesPart1, { depth: 3 });
// // console.log(`Part 1: ${part1()}`);
// console.log(`Part 2: ${Part2()}`);
// console.dir(entriesPart2, { depth: 3 });

/*

[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}

*/
