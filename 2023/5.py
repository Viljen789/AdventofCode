seeds = []
maps = []
with open("input.txt", "r") as f:
    seedString = f.readline().split(" ")[1:]
    seeds = [int(i.strip()) for i in seedString]
    l = f.readline()
    curmap = []
    mapLines = f.readlines()
    # print(mapLines)
    for l in mapLines:
        l = l.strip()
        if l == "":
            maps.append(curmap)
            curmap = []
            continue
        nums = l.split(" ")
        # print(f"Nums: {nums}")

        if (nums[-1] != "map:"):
            curmap.append([int(i) for i in nums])
    maps.append(curmap)

seedRanges = []
for groups in range(len(seeds) // 2):
    seedRanges.append((seeds[groups * 2], seeds[groups*2] + seeds[groups * 2 + 1]))

# print(seeds)
for diffMaps in maps:
    changed = [0 for i in seeds]
    for (destStart, sourceStart, rangeLen) in diffMaps:
        # print(f"destStart: {destStart}, sourceStart: {sourceStart}, range: {rangeLen}")
        for (idx, seed) in enumerate(seeds):
            if sourceStart + rangeLen > seed >= sourceStart and not changed[idx]:
                seeds[idx] = seed - sourceStart + destStart
                changed[idx] = 1
    # print(f"seeds: {seeds}")


for diffMaps in maps:
    next_layer_ranges = []
    while len(seedRanges) > 0:
        s_start, s_end = seedRanges.pop()
        found_match = False

        for destStart, sourceStart, rangeLen in diffMaps:
            sourceEnd = sourceStart + rangeLen - 1
            overlap_start = max(s_start, sourceStart)
            overlap_end = min(s_end, sourceEnd)

            if overlap_start <= overlap_end:
                offset = destStart - sourceStart
                next_layer_ranges.append((overlap_start + offset, overlap_end + offset))

                if overlap_start > s_start:
                    seedRanges.append((s_start, overlap_start - 1))
                if overlap_end < s_end:
                    seedRanges.append((overlap_end + 1, s_end))

                found_match = True
                break

        if not found_match:
            next_layer_ranges.append((s_start, s_end))

    seedRanges = next_layer_ranges

print(f"Part 1: {min(seeds)}")

print(f"Part 2: {min(seed[0] for seed in seedRanges)}")

