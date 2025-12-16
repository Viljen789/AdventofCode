"use client";
import { Play, RotateCcw } from "lucide-react";
import { ReactNode, useState } from "react";

type SolverProps = {
  dayTitle: string;
  day: number;
  onRun: (part: "part1" | "part2") => void;
  onReset: () => void;
  onSpeedup: (part: "part1" | "part2") => void;
  children: ReactNode;
  part: "part1" | "part2";
  onSetPart: (part: "part1" | "part2") => void;
  inputValue: string;
  onInputChange: (input: string) => void;

  result: string | number | null;
};

const SolverLayout = ({
  dayTitle,
  onRun,
  onReset,
  onSpeedup,
  children,
  day,
  part,
  onSetPart,
  inputValue,
  onInputChange,
  result,
}: SolverProps) => {
  const handleRun = () => {
    onRun(part);
  };

  const handleReset = () => {
    onReset();
  };
  const handleSpeedup = () => {
    onSpeedup(part);
  };
  const handleSetPart = (part: "part1" | "part2") => {
    onSetPart(part);
  };

  return (
    <div className="flex h-full w-full">
      <div className="flex-1">
        <div className="concave-bl p-6 border-b border-r border-gray-800 border-b-transparent bg-gray-900 w-fit text-center text-2xl font-bold  font-mono rounded-br-2xl relative flex flex-col">
          <a
            href={`https://adventofcode.com/2025/day/${day}`}
            className={"underline text-blue-400"}
          >
            {dayTitle}
          </a>
          <div
            className={part === "part1" ? "text-gray-500" : "text-yellow-500" }
          >
            Day {day} part {part === "part1" ? "1" : "2"}
          </div>
        </div>
        <div className="bg-gray-900 flex justify-left w-10 h-4 rounded-tr-4xl">
          <div className="bg-background h-10 rounded-tl-2xl rounded-bl-4xlflex items-center justify-center w-full "></div>
        </div>

        <div>{children}</div>
      </div>

      <div className="w-80 flex flex-col gap-4 shrink-0 bg-gray-900 p-6   ">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 w-full bg-black rounded-xl">
            <button
              onClick={() => handleSetPart("part1")}
              className="w-full rounded-xl hover:bg-gray-800 text-sm transition-colors text-gray-300 hover:text-white cursor-pointer"
              style={{
                backgroundColor:
                  part === "part1" ? "oklch(37.2% 0.044 257.287)" : "",
                transition: "background-color 0.2s ease-in-out",
              }}
            >
              Part 1
            </button>
            <button
              onClick={() => handleSetPart("part2")}
              className="w-full rounded-xl hover:bg-gray-800 text-sm transition-colors text-gray-300 hover:text-white cursor-pointer"
              style={{
                backgroundColor:
                  part === "part2" ? "oklch(37.2% 0.044 257.287)" : "",
                transition: "background-color 0.2s ease-in-out",
              }}
            >
              Part 2
            </button>
          </div>
        </div>

        <div className="flex flex-col h-full gap-2">
          <label className=" font-bold text-xl">Puzzle Input</label>
          <textarea
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Paste your AoC input here..."
            spellCheck={false}
            className="rounded-xl h-full font-mono bg-black text-white p-2 overflow-scroll"
          />
        </div>
        <div className="flex gap-2 w-full justify-around">
          <button
            onClick={handleRun}
            className="p-2 rounded-md hover:bg-gray-800 text-sm transition-colors text-gray-300 hover:text-white cursor-pointer"
          >
            Run
          </button>
          <button
            onClick={handleSpeedup}
            className="p-2 rounded-md hover:bg-gray-800 text-sm transition-colors text-gray-300 hover:text-white cursor-pointer"
          >
            Speedup
          </button>
          <button
            title="Reset"
            onClick={handleReset}
            className="p-2 rounded-md flex hover:bg-gray-800 text-sm transition-colors text-gray-300 hover:text-white cursor-pointer"
          >
            Reset
          </button>
        </div>

        <div className="flex flex-col h-full gap-2">
          <div className="mt-2 p-3 bg-blue-900/50 border border-blue-500 rounded text-center">
            <span className="text-gray-400 text-xs uppercase block">
              Result
            </span>
            <span className="text-2xl font-bold">
              {result !== null ? result : "Waiting..."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolverLayout;
