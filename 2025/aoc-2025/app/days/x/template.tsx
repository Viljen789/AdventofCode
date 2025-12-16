"use client";
import SolverLayout from "../../components/SolverLayout";
import { useEffect, useState, useMemo, useRef } from "react";

const DEFAULT_INPUT = ``;

const DayxPage = () => {
  const [rawInput, setRawInput] = useState(DEFAULT_INPUT);
  const [part, setPart] = useState<"part1" | "part2">("part1");
  const [result, setResult] = useState<number | null>(null);

  const liveParsedSteps = useMemo(() => {
    return rawInput
      .trim()
      .split("\n")
      .map((line) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return null;
        // ADD CUSTOM PARSING LOGIC HERE!!!!!
        return trimmedLine;
      })
      .filter((item) => item !== null);
  }, [rawInput]);

  const handleRun = (part: "part1" | "part2") => {
    handleReset();
    setResult(0);

    if (part === "part1") {

    } else {
        setPart("part2");

    }
  };

  const handleReset = () => {
    setResult(null);

  };

  const handleSetPart = (part: "part1" | "part2") => {
    handleReset();
    setPart(part);
  };

  const handleSpeedup = (part: "part1" | "part2") => {
    handleReset();

    if (part === "part1") {

    } else {

    }
  };

  useEffect(() => {
    let isCancelled = false;

    const runAnimation = async () => {

    };

    runAnimation();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <SolverLayout
      dayTitle="Day x Title"
      day={x}
      inputValue={rawInput}
      onInputChange={setRawInput}
      onRun={handleRun}
      result={result}
      onReset={handleReset}
      onSpeedup={handleSpeedup}
      onSetPart={handleSetPart}
      part={part}
    >
      <div className="flex flex-col gap-2 items-center justify-center h-full">
        <div className="text-gray-500 font-mono">
           Del X
        </div>

        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
            {liveParsedSteps.map((item, i) => (
                <div key={i} className="bg-gray-800 p-1 rounded text-xs">
                    {JSON.stringify(item)}
                </div>
            ))}
        </div>
      </div>
    </SolverLayout>
  );
};
export default DayxPage;