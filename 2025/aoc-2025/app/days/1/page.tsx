"use client";
import SolverLayout from "../../components/SolverLayout";
import {useEffect, useState, useMemo, useRef} from "react";
import {RedoDot} from "lucide-react";

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

const Day1Page = () => {
    const [rawInput, setRawInput] = useState(DEFAULT_INPUT);
    const [part, setPart] = useState<"part1" | "part2">("part1");
    const [dir, setDir] = useState<"R" | "L">("R");
    const [stepSize, setStepSize] = useState(0);
    const [curdist, setCurdist] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const liveParsedSteps = useMemo(() => {
        return rawInput
            .trim()
            .split("\n")
            .map((line) => {
                const trimmedLine = line.trim();
                if (!trimmedLine) return null;
                const dir = trimmedLine.charAt(0);
                const value = Number(trimmedLine.substring(1));
                return {dir, value};
            })
            .filter((item): item is Step => item !== null && !isNaN(item.value));
    }, [rawInput]);

    const [animationSteps, setAnimationSteps] = useState<Step[]>([]);

    const numRef = useRef(50);
    const [speedup, setSpeedup] = useState(false);
    const [result, setResult] = useState<number | null>(null);
    const [rotationSpeed, setRotationSpeed] = useState(500);
    const [num, setNum] = useState(50);
    const [displayNum, setDisplayNum] = useState(50);
    const [rotationNum, setRotationNum] = useState(50);

    const handleRun = (part: "part1" | "part2") => {
        handleReset();
        setResult(0);
        setAnimationSteps(liveParsedSteps);
        if (part === "part1") {
        } else {
            setPart("part2");
        }
    };

    const handleReset = () => {
        setResult(null);
        setNum(50);
        setDisplayNum(50);
        numRef.current = 50;
        setAnimationSteps([]);
        setRotationNum(50);
        setSpeedup(() => false);
    };

    const handleSetPart = (part: "part1" | "part2") => {
        handleReset();
        setPart(part);
        if (part === "part1") {
            setRotationSpeed(5);
        } else {
            setRotationSpeed(100);
        }
    };

    const handleSpeedup = (part: "part1" | "part2") => {
        handleReset();
        setSpeedup(true);

        if (part === "part1") {
            let currentNum = numRef.current;
            for (let i = 0; i < liveParsedSteps.length; i++) {
                const step = liveParsedSteps[i];
                setStepSize(step.value);
                if (step.dir === "R") {
                    currentNum = (currentNum + step.value + 100) % 100;
                } else {
                    currentNum = (currentNum - step.value + 100) % 100;
                }
                if (currentNum === 0) {
                    setResult((result) => (result ?? 0) + 1);
                }
                setRotationNum(currentNum);
                setDisplayNum((currentNum + 100) % 100);
            }
        } else {
            let currentNum = numRef.current;
            let total = 0;

            for (let i = 0; i < liveParsedSteps.length; i++) {
                const step = liveParsedSteps[i];
                setCurdist(i);
                setDir(step.dir);
                setStepSize(step.value);

                if (step.dir === "R") {
                    total += Math.floor((currentNum + step.value) / 100);
                    currentNum = (currentNum + step.value) % 100;
                } else {
                    const distToZero = currentNum === 0 ? 100 : currentNum;
                    if (step.value >= distToZero) {
                        total += 1;

                        const remainingMovement = step.value - distToZero;

                        total += Math.floor(remainingMovement / 100);
                    }

                    currentNum = (((currentNum - step.value) % 100) + 100) % 100;
                }
            }
            setRotationNum(currentNum);
            setDisplayNum(currentNum);
            setResult(total);
        }
    };

    useEffect(() => {
        if (animationSteps.length === 0) return;

        let isCancelled = false;

        const runAnimation = async () => {
            let currentLogNum = numRef.current;
            let currentVisNum = rotationNum;

            const tickSpeed = Math.max(10, rotationSpeed / 20);

            for (let i = 0; i < animationSteps.length; i++) {
                if (isCancelled) break;
                const step = animationSteps[i];
                setDir(step.dir);
                setStepSize(step.value);
                const isRight = step.dir === "R";

                for (let j = 0; j < step.value; j++) {
                    setCurdist(j);
                    if (isCancelled) break;
                    if (isRight) {
                        currentVisNum += 1;
                        currentLogNum = (currentLogNum + 1) % 100;
                    } else {
                        currentVisNum -= 1;
                        currentLogNum = (currentLogNum - 1 + 100) % 100;
                    }
                    setRotationNum(currentVisNum);
                    setDisplayNum(currentLogNum);
                    numRef.current = currentLogNum;

                    if (part === "part2") {
                        if (currentLogNum === 0) {
                            setResult((prev) => (prev ?? 0) + 1);
                            setIsAnimating(true);
                        }
                    }

                    await new Promise((resolve) => setTimeout(resolve, tickSpeed));
                }
                if (currentLogNum === 0 && part === "part1")
                    setResult((prev) => (prev ?? 0) + 1);
                await new Promise((resolve) => setTimeout(resolve, 200));
            }
        };
        runAnimation();

        return () => {
            isCancelled = true;
        };
    }, [rotationSpeed, animationSteps]);

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    return (
        <SolverLayout
            dayTitle="Secret Entrance"
            day={1}
            inputValue={rawInput}
            onInputChange={setRawInput}
            onRun={handleRun}
            result={result}
            onReset={handleReset}
            onSpeedup={handleSpeedup}
            onSetPart={handleSetPart}
            part={part}
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
                <div className=" w-80 h-80 rounded-full flex items-center justify-center m-10 relative ">
                    <div className="absolute inset-0 z-30 pointer-events-none">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 perspective-midrange">
                            <div
                                className={`w-0 h-0 border-l-10 border-l-transparent border-r-10 border-r-transparent border-t-15 border-t-red-500 flex items-center justify-center transition-colors duration-500 ${
                                    isAnimating && part === "part2" ? "animate-ping" : ""
                                }`}
                            />
                            {result !== null && (
                                <div
                                    className="absolute"
                                    style={{
                                        transformStyle: "preserve-3d",
                                        transition: "transform 420ms cubic-bezier(.22,.9,.33,1)",
                                        top: "15px",
                                        left: "50%",
                                        transform: `translateX(-50%) ${
                                            dir === "R" ? "rotateY(0deg)" : "rotateY(180deg)"
                                        }`,
                                    }}
                                >
                                    {!speedup && (
                                        <div className="flex items-center gap-4 font-mono font-bold">
                                            <RedoDot size={24}/>{" "}
                                            <span
                                                style={{
                                                    transform: `translateX(-50%)
                                    ${
                                                        dir === "R"
                                                            ? "rotateY(0deg)"
                                                            : "rotateY(180deg)"
                                                    }`,
                                                }}
                                            >
                        {stepSize - curdist - 1}
                      </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="bg-black w-72 h-72 rounded-full relative overflow-hidden shadow-inner z-20">
                        <div
                            className="absolute top-0 left-0 w-full h-full transition-transform ease-in-out duration-0"
                            style={{
                                transform: `rotate(${rotationNum * 3.6}deg)`,
                            }}
                        >
                            {Array.from({length: 100}).map((_, i) => {
                                const isZero = i === 0;
                                return (
                                    <div
                                        key={i}
                                        className={`left-1/2 top-1/2 absolute origin-center z-20`}
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
                                    </div>
                                );
                            })}
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                            {Array.from({length: 100}).map((_, i) => {
                                const isZero = i === 0;
                                if (i % 10 !== 0) return null;
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
                    <span
                        className={`absolute top-6 left-1/2 -translate-x-1/2 text-sm font-bold ${
                            isZero ? "text-red-500" : "text-gray-500"
                        }`}
                    >
                      {i}
                    </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div
                                className={`
    w-48 h-48 rounded-full flex items-center justify-center 
    transition-all duration-300 ease-out
    border-2 
    ${
                                    displayNum === 0
                                        ? "bg-red-950/30 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.6),inset_0_0_20px_rgba(239,68,68,0.4)] scale-110"
                                        : "bg-gray-900/80 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15),inset_0_0_20px_rgba(6,182,212,0.1)] scale-100"
                                }
    backdrop-blur-md
`}
                            >
                                <div
                                    className={`text-6xl font-bold font-mono tracking-tighter ${
                                        displayNum === 0
                                            ? "text-red-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                                            : "text-cyan-100 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]"
                                    }`}
                                >
                                    {displayNum.toString().padStart(2, "0")}
                                </div>

                                <div
                                    className={`absolute w-40 h-40 rounded-full border-3 border-double opacity-30 
      ${displayNum === 0 ? "border-red-400" : "border-cyan-400"}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SolverLayout>
    );
};
export default Day1Page;
