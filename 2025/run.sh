#!/bin/bash

# usage: ./run.sh [language|filename]
# e.g. ./run.sh python
# e.g. ./run.sh Day1

INPUT=$1

if [ -z "$INPUT" ]; then
    echo "Usage: ./run.sh [language|filename]"
    echo "Available: python, javascript, typescript, c, cpp, rust, go, java, csharp, julia, cuda, zig, crystal, haskell, nim"
    exit 1
fi

TARGET_FILE=""
LANGUAGE=""

# 1. Determine the source file and language
if [ -f "$INPUT" ]; then
    # Input is a full filename (e.g. Day1.java)
    TARGET_FILE=$INPUT
    EXT="${TARGET_FILE##*.}"
    case $EXT in
        py) LANGUAGE="python" ;;
        js) LANGUAGE="javascript" ;;
        ts) LANGUAGE="typescript" ;;
        c) LANGUAGE="c" ;;
        cpp) LANGUAGE="cpp" ;;
        rs) LANGUAGE="rust" ;;
        go) LANGUAGE="go" ;;
        java) LANGUAGE="java" ;;
        cs) LANGUAGE="csharp" ;;
        jl) LANGUAGE="julia" ;;
        cu) LANGUAGE="cuda" ;;
        zig) LANGUAGE="zig" ;;
        cr) LANGUAGE="crystal" ;;
        hs) LANGUAGE="haskell" ;;
        nim) LANGUAGE="nim" ;;
    esac
elif [ -f "$INPUT.java" ]; then TARGET_FILE="$INPUT.java"; LANGUAGE="java"
elif [ -f "$INPUT.py" ]; then TARGET_FILE="$INPUT.py"; LANGUAGE="python"
elif [ -f "$INPUT.js" ]; then TARGET_FILE="$INPUT.js"; LANGUAGE="javascript"
elif [ -f "$INPUT.ts" ]; then TARGET_FILE="$INPUT.ts"; LANGUAGE="typescript"
elif [ -f "$INPUT.c" ]; then TARGET_FILE="$INPUT.c"; LANGUAGE="c"
elif [ -f "$INPUT.cpp" ]; then TARGET_FILE="$INPUT.cpp"; LANGUAGE="cpp"
elif [ -f "$INPUT.rs" ]; then TARGET_FILE="$INPUT.rs"; LANGUAGE="rust"
elif [ -f "$INPUT.go" ]; then TARGET_FILE="$INPUT.go"; LANGUAGE="go"
elif [ -f "$INPUT.cs" ]; then TARGET_FILE="$INPUT.cs"; LANGUAGE="csharp"
elif [ -f "$INPUT.jl" ]; then TARGET_FILE="$INPUT.jl"; LANGUAGE="julia"
elif [ -f "$INPUT.cu" ]; then TARGET_FILE="$INPUT.cu"; LANGUAGE="cuda"
elif [ -f "$INPUT.zig" ]; then TARGET_FILE="$INPUT.zig"; LANGUAGE="zig"
elif [ -f "$INPUT.cr" ]; then TARGET_FILE="$INPUT.cr"; LANGUAGE="crystal"
elif [ -f "$INPUT.hs" ]; then TARGET_FILE="$INPUT.hs"; LANGUAGE="haskell"
elif [ -f "$INPUT.nim" ]; then TARGET_FILE="$INPUT.nim"; LANGUAGE="nim"
else
    # Maybe it's just a language name for template files
    LANGUAGE=$INPUT
    case $LANGUAGE in
        python) TARGET_FILE="template.py" ;;
        javascript) TARGET_FILE="template.js" ;;
        typescript) TARGET_FILE="template.ts" ;;
        c) TARGET_FILE="template.c" ;;
        cpp) TARGET_FILE="template.cpp" ;;
        rust) TARGET_FILE="template.rs" ;;
        go) TARGET_FILE="Day4.go" ;;
        java) TARGET_FILE="Day1.java" ;;
        csharp) TARGET_FILE="template.cs" ;;
        julia) TARGET_FILE="template.jl" ;;
        cuda) TARGET_FILE="template.cu" ;;
        zig) TARGET_FILE="template.zig" ;;
        crystal) TARGET_FILE="Day2.cr" ;;
        haskell) TARGET_FILE="template.hs" ;;
        nim) TARGET_FILE="Day4.nim" ;;
        *) echo "Error: Could not find file or language '$INPUT'"; exit 1 ;;
    esac
fi

if [ ! -f "$TARGET_FILE" ] && [ "$LANGUAGE" != "csharp" ]; then
    echo "Error: Target file '$TARGET_FILE' not found."
    exit 1
fi

BASENAME="${TARGET_FILE%.*}"

case $LANGUAGE in
  python)
    python3 "$TARGET_FILE"
    ;;
  javascript)
    node "$TARGET_FILE"
    ;;
  typescript)
    npx -y ts-node "$TARGET_FILE"
    ;;
  c)
    gcc "$TARGET_FILE" -o "${BASENAME}_c" && "./${BASENAME}_c"
    ;;
  cpp)
    g++ "$TARGET_FILE" -o "${BASENAME}_cpp" && "./${BASENAME}_cpp"
    ;;
  rust)
    if command -v rustc &> /dev/null; then
        rustc "$TARGET_FILE" && ./"$BASENAME"
    else
        echo "Rust (rustc) not found. Try 'brew install rust'"
    fi
    ;;
  go)
    if command -v go &> /dev/null; then
        CGO_ENABLED=0 go run "$TARGET_FILE"
    else
        echo "Go not found. Try 'brew install go'"
    fi
    ;;
  java)
    javac *.java && java "$BASENAME"
    ;;
  csharp)
    if command -v dotnet &> /dev/null; then
        # Ensure project exists
        if ! [ -f "template_cs_proj.csproj" ]; then
            dotnet new console -n template_cs_proj -o . --force > /dev/null
        fi
        if [ -f "$TARGET_FILE" ]; then
            cp "$TARGET_FILE" Program.cs
        fi
        dotnet run --no-launch-profile
    else
        echo "dotnet not found. Try 'brew install dotnet'"
    fi
    ;;
  julia)
    if command -v julia &> /dev/null; then
        julia "$TARGET_FILE"
    else
        echo "Julia not found. Try 'brew install --cask julia'"
    fi
    ;;
  cuda)
    if command -v nvcc &> /dev/null; then
        nvcc "$TARGET_FILE" -o "${BASENAME}_cu" && "./${BASENAME}_cu"
    else
        echo "CUDA (nvcc) not found."
    fi
    ;;
  zig)
    if command -v zig &> /dev/null; then
        zig run "$TARGET_FILE"
    else
        echo "Zig not found. Try 'brew install zig'"
    fi
    ;;
  crystal)
    if command -v crystal &> /dev/null; then
        # If TARGET_FILE is template.cr but it doesn't exist, fallback to *.cr like before
        if [ "$TARGET_FILE" = "Day2.cr" ] && [ ! -f "Day2.cr" ]; then
            crystal run *.cr
        else
            crystal run "$TARGET_FILE"
        fi
    else
        echo "Crystal not found. Try 'brew install crystal'"
    fi
    ;;
  haskell)
    if command -v ghc &> /dev/null; then
        ghc "$TARGET_FILE" && ./"$BASENAME"
    else
        echo "Haskell (ghc) not found. Try 'brew install ghc'"
    fi
    ;;
  nim)
    if command -v nim &> /dev/null; then
        nim c -r "$TARGET_FILE"
    else
        echo "Nim not found. Try 'brew install nim'"
    fi
    ;;
  *)
    echo "Language '$LANGUAGE' not configured in run.sh."
    ;;
esac
