"use client";
import SolverLayout from "../../components/SolverLayout";
import { useEffect, useState, useMemo, useRef } from "react";
import { Triangle } from "lucide-react";

type Step = {
  dir: string;
  value: number;
};

const DEFAULT_INPUT = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

export default function Day1Page() {
  const [rawInput, setRawInput] = useState(DEFAULT_INPUT);

  const liveParsedSteps = useMemo(() => {
    return rawInput
      .trim()
      .split("\n")
      .map((line) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return null;
        const dir = trimmedLine.charAt(0);
        const value = Number(trimmedLine.substring(1));
        return { dir, value };
      })
      .filter((item): item is Step => item !== null && !isNaN(item.value));
  }, [rawInput]);

  const [animationSteps, setAnimationSteps] = useState<Step[]>([]);
  const [num, setNum] = useState(50);
  const numRef = useRef(50);
  const [result, setResult] = useState<number | null>(null);

  const handleRun = (part: "part1" | "part2") => {
    setNum(50);
    numRef.current = 50;
    setAnimationSteps(liveParsedSteps);
  };
  const handleReset = () => {
    setNum(50);
    numRef.current = 50;
    setAnimationSteps([]);
  };

  useEffect(() => {
    setResult(null);
    if (animationSteps.length === 0) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index >= animationSteps.length) {
        clearInterval(interval);
        return;
      }
      const step = animationSteps[index];

      let nextNum = numRef.current;
      if (step.dir === "R") {
        nextNum = (nextNum + step.value + 100) % 100;
      } else {
        nextNum = (nextNum - step.value + 100) % 100;
      }

      numRef.current = nextNum;
      setNum(nextNum);

      if (nextNum === 0) {
        setResult((result) => (result ?? 0) + 1);
      }
      index++;
    }, 200);

    return () => clearInterval(interval);
  }, [animationSteps]);

  return (
    <SolverLayout
      dayTitle="Secret Entrance"
      day={1}
      inputValue={rawInput}
      onInputChange={setRawInput}
      onRun={handleRun}
      result={result}
      onReset={handleReset}
    >
      <div className="flex flex-col gap-2 items-center max-h-[calc(50vh-100px)] overflow-y-auto">
        {liveParsedSteps.map((step, i) => (
          <div key={i} className="flex gap-2 p-2 bg-gray-800 rounded text-sm">
            <span
              className={`font-bold ${
                step.dir === "R" ? "text-red-400" : "text-blue-400"
              }`}
            >
              {step.dir}
            </span>
            <span className="text-gray-200 font-mono">{step.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center mt-10">
        <div className="bg-gray-200 w-80 h-80 rounded-full flex items-center justify-center m-10 relative ">
          <div className="flex flex-col items-center justify-center z-10 ">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="w-0 h-0 border-l-10 border-l-transparent border-r-10 border-r-transparent border-t-15 border-t-red-500"></div>
            </div>
          </div>
          <div className="bg-black w-72 h-72 rounded-full relative overflow-hidden shadow-inner z-20">
            <div
              className="absolute top-0 left-0 w-full h-full transition-transform transition-duration-150 ease-in-out "
              style={{
                transform: `rotate(${-num * 3.6}deg)`,
              }}
            >
              {Array.from({ length: 100 }).map((_, i) => {
                const isZero = i === 0;
                return (
                  <div
                    key={i}
                    className={`left-1/2 top-1/2 absolute origin-center z-20 `}
                    style={{
                      transform: `translate(-50%, -50%) rotate(${
                        i * 3.6
                      }deg) translateY(-135px)`,
                    }}
                  >
                    <div
                      className={`${
                        isZero
                          ? "bg-red-600 w-1.5 h-6"
                          : "bg-gray-400 w-0.5 h-3"
                      } rounded-full shadow-[0_0_2px_rgba(0,0,0,0.5)]`}
                    />
                    {i % 10 === 0 && (
                      <span
                        className={`absolute top-6 left-1/2 -translate-x-1/2 text-sm font-bold ${
                          isZero ? "text-red-500" : "text-gray-500"
                        }`}
                      >
                        {i}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 rounded-full flex items-center justify-center backdrop-blur-sm border border-gray-700/50 bg-gray-800/30 shadow-2xl ">
                <div
                  className={`text-5xl font-bold font-mono tabular-nums ${
                    num === 0
                      ? "text-red-500 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]"
                      : "text-white drop-shadow-md"
                  }`}
                >
                  {num.toString().padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SolverLayout>
  );
}
