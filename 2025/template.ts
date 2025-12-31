import {readFileSync} from "fs";
interface Entries {
    lights: string
    buttons: number[][]
    joltage: number[]
}

let entries: Entries = {
    lights: "",
    buttons: [],
    joltage: []
}

function readFile(): void {
    const file = readFileSync("Day10.txt", "utf-8");
    const lines = file.split("\n");
    const lights = lines.map((line) => line);
    const buttons = lines.map((line) => parseInt(line));
    const joltage = lines.map((line) => parseInt(line));
    entries = { lights, buttons, joltage };
}

readFile();
console.log(entries);
