"use client";
import SolverLayout from "../../components/SolverLayout";
import { useEffect, useState, useMemo } from "react";
import "@/app/globals.css";

const DEFAULT_INPUT = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

const Day2Page = () => {
  const [rawInput, setRawInput] = useState(DEFAULT_INPUT);
  const [part, setPart] = useState<"part1" | "part2">("part1");
  const [result, setResult] = useState<number | null>(null);

  const [curLeft, setCurLeft] = useState(0);
  const [curRight, setCurRight] = useState(0);
  const [curList, setCurList] = useState<number[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const [animationSteps, setAnimationSteps] = useState<string[][]>([]);

  const parseSteps = (rawInput: string) => {
    return rawInput
      .trim()
      .split("\n")
      .map((line) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return null;
        const commentsep = trimmedLine.split(",");
        const dashsep = commentsep.map((item) => item.split("-"));
        return dashsep;
      })
      .filter((item) => item !== null && item[0] !== null)
      .flat();
  };

  const liveParsedSteps = useMemo(() => parseSteps(rawInput), [rawInput]);

  useEffect(() => {
    setAnimationSteps(liveParsedSteps);
  }, [liveParsedSteps]);

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
    setCurList([]);
    setCurLeft(0);
    setCurRight(0);
    setIsExpanded(false);
    setAnimationSteps(liveParsedSteps);
  };

  const handleSetPart = (part: "part1" | "part2") => {
    handleReset();
    setPart(part);
  };

  const handleSpeedup = (part: "part1" | "part2") => {
    handleReset();
  };

  useEffect(() => {
    let isCancelled = false;

    const runAnimation = async () => {
      if (animationSteps.length === 0) {
        setIsExpanded(false);
        return;
      }

      if (part === "part1") {
        const currentStep = animationSteps[0];
        if (!currentStep || currentStep.length < 2) return;

        const leftVal = parseInt(currentStep[0]);
        const rightVal = parseInt(currentStep[1]);

        // 1. PREPARE (Start Collapsed)
        setIsExpanded(false);
        setCurLeft(leftVal);
        setCurRight(rightVal);

        const start = Math.min(leftVal, rightVal);
        const end = Math.max(leftVal, rightVal);
        const length = end - start + 1;

        if (length < 1000) {
          setCurList(Array.from({ length }, (_, i) => start + i));
        } else {
          setCurList([start, end]);
        }

        // Wait a tiny bit to let the "Collapsed" state render
        // This is crucial for the CSS transition to work (0 -> Auto)
        await new Promise((resolve) => setTimeout(resolve, 50));
        if (isCancelled) return;

        // 2. EXPAND (Trigger Animation)
        setIsExpanded(true);

        // 3. HOLD (Let user see the list)
        await new Promise((resolve) => setTimeout(resolve, 1200));
        if (isCancelled) return;

        // 4. COLLAPSE (Animate closing)
        setIsExpanded(false);

        // Wait for the closing animation to finish (approx 300-500ms)
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (isCancelled) return;

        // 5. NEXT (Remove step to trigger effect again)
        setAnimationSteps((prev) => prev.slice(1));
      }
    };

    runAnimation();

    return () => {
      isCancelled = true;
    };
  }, [animationSteps, part]);

  return (
    <SolverLayout
      dayTitle="Gift Shop"
      day={2}
      inputValue={rawInput}
      onInputChange={setRawInput}
      onRun={handleRun}
      result={result}
      onReset={handleReset}
      onSpeedup={handleSpeedup}
      onSetPart={handleSetPart}
      part={part}
    >
      <div className="flex flex-col gap-4 items-center justify-start h-full pt-4">
        <div className="text-gray-500 font-mono">Liste</div>

        <div className="flex flex-wrap gap-2 max-h-32 overflow-hidden w-full justify-center opacity-50">
          <div className="p-1 rounded-lg text-xs overflow-y-auto h-24 relative bg-slate-800 w-64 border border-gray-700">
            <ul className="space-y-1 p-2">
              {animationSteps.map((subItem, j) => (
                <li
                  key={j}
                  className="flex gap-2 justify-center bg-slate-700 p-1 rounded text-gray-400"
                >
                  {subItem[0]}-{subItem[1]}
                </li>
              ))}
              {animationSteps.length === 0 && (
                <li className="text-center text-gray-500 italic">
                  Queue Empty
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full mt-2 min-h-[300px]">
          <div className="bg-slate-800 border border-gray-600 rounded-lg shadow-xl overflow-hidden w-64 transition-all duration-300">
            <div className="bg-slate-700 p-4 flex justify-center items-center z-10 relative">
              <span className="text-blue-400 font-bold text-xl">{curLeft}</span>
            </div>
            <div
              className={`
                        transition-all duration-500 ease-in-out bg-slate-900
                        flex flex-col items-center
                        ${isExpanded ? "max-h-[400px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"}
                    `}
            >
              <div className="flex flex-col gap-1 w-full px-8 max-h-[300px] overflow-y-auto custom-scrollbar">
                {curList.map((item, i) => (
                  <div
                    key={i}
                    className="w-full text-center py-1 bg-slate-800 rounded text-sm text-yellow-100 border border-gray-700 animate-fadeIn"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-700 p-4 flex justify-center items-center z-10 relative">
              <span className="text-red-400 font-bold text-xl">{curRight}</span>
            </div>
          </div>
        </div>
      </div>
    </SolverLayout>
  );
};
export default Day2Page;
