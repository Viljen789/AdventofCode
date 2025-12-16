#!/bin/bash

# usage: ./run.sh [language]
# e.g. ./run.sh python

ARG=$1

if [ -z "$ARG" ]; then
    echo "Usage: ./run.sh [language]"
    echo "Available: python, javascript, typescript, c, cpp, rust, go, java, csharp, julia, cuda, zig, crystal"
    exit 1
fi

case $ARG in
  python)
    python3 template.py
    ;;
  javascript)
    node template.js
    ;;
  typescript)
    npx -y ts-node template.ts
    ;;
  c)
    gcc template.c -o template_c && ./template_c
    ;;
  cpp)
    g++ template.cpp -o template_cpp && ./template_cpp
    ;;
  rust)
    if command -v rustc &> /dev/null; then
        rustc template.rs && ./template
    else
        echo "Rust (rustc) not found. Try 'brew install rust'"
    fi
    ;;
  go)
    if command -v go &> /dev/null; then
        go run template.go
    else
        echo "Go not found. Try 'brew install go'"
    fi
    ;;
  java)
    javac Template.java && java Template
    ;;
  csharp)
    if command -v dotnet &> /dev/null; then
        # Ensure project exists
        if ! [ -f "template_cs_proj.csproj" ]; then
            dotnet new console -n template_cs_proj -o . --force > /dev/null
        fi
        # Copy template.cs to Program.cs so 'dotnet run' uses the template code
        if [ -f "template.cs" ]; then
            cp template.cs Program.cs
        fi
        dotnet run --no-launch-profile
    else
        echo "dotnet not found. Try 'brew install dotnet'"
    fi
    ;;
  julia)
    if command -v julia &> /dev/null; then
        julia template.jl
    else
        echo "Julia not found. Try 'brew install --cask julia'"
    fi
    ;;
  cuda)
    if command -v nvcc &> /dev/null; then
        nvcc template.cu -o template_cu && ./template_cu
    else
        echo "CUDA (nvcc) not found. This generally requires NVIDIA hardware."
    fi
    ;;
  zig)
    if command -v zig &> /dev/null; then
        zig run template.zig
    else
        echo "Zig not found. Try 'brew install zig'"
    fi
    ;;
  crystal)
    if command -v crystal &> /dev/null; then
        crystal run template.cr
    else
        echo "Crystal not found. Try 'brew install crystal'"
    fi
    ;;
  *)
    echo "Language '$ARG' not configured in run.sh."
    ;;
esac
