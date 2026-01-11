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

        if(nums[-1]!="map:"):
            curmap.append([int(i) for i in nums])
    maps.append(curmap)

# print(seeds)
for map in maps:
    changed = [0 for i in seeds]
    for (destStart, sourceStart, rangeLen) in map:
        # print(f"destStart: {destStart}, sourceStart: {sourceStart}, range: {rangeLen}")
        for (idx, seed) in enumerate(seeds):
            if sourceStart + rangeLen > seed >= sourceStart and not changed[idx]:
                seeds[idx] = seed - sourceStart + destStart
                changed[idx] = 1
    # print(f"seeds: {seeds}")



print(f"Part 1: {min(seeds)}")


"""
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4

"""