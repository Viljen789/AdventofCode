import std/os
import std/strutils
import std/algorithm
import std/sugar

let filename = "Day5.txt"

var lines: seq[string] = @[]



if fileExists(filename):
    for line in readFile(filename).splitLines():
        lines.add(line.strip())

proc part1(range_seq: seq[tuple[range_start: int, range_end: int]], number_seq: seq[int]): int = 
    var tot = 0;
    for num in number_seq:
        for rng in range_seq:
            if(num>=rng[0] and num<=rng[1]):
                tot+=1
                break
    result = tot

proc part2(range_seq: seq[tuple[range_start: int, range_end: int]]): int = 
    let sorted_range = range_seq.sorted((a, b)=>cmp(a[0], b[0]))
    var prev_end = 0
    var tot = 0
    var size = 0
    var overlap = 0
    var overlapping = 0

    for (range_start, range_end) in sorted_range:
        
        size = range_end-range_start+1
        overlap = 0
        if(prev_end>range_end):
            continue
        elif(range_start<=prev_end and range_end>=prev_end):
            overlap = prev_end-range_start+1
            overlapping = 1
        
        prev_end = range_end 
        tot += size - overlapping*overlap
        # echo "[", range_start, ",", range_end, "] Size:", size, " Overlap: ", overlap 
    
    result = tot



    


proc getRangeAndNums(lines:seq[string] ): tuple[range_seq: seq[tuple[range_start: int, range_end: int]], number_seq: seq[int]] = 
    var ranges: seq[tuple[range_start:int, range_end:int]] = @[]
    var numbers: seq[int] = @[]
    var range_input = true
    for i, line in lines:
        if(line != ""):
            if(range_input):
                ranges.add((line.split("-")[0].parseInt, line.split("-")[1].parseInt))
            else:
                numbers.add(line.parseInt)
        else:
            range_input = false

    result = (range_seq:ranges, number_seq:numbers)


let (range_seq, number_seq) = getRangeAndNums(lines)
echo "Part1: ", part1(range_seq, number_seq)
echo "Part2: ", part2(range_seq)
