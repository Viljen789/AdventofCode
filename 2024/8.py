def accept(x, y, xsize, ysize):
    return 0 <= x < ysize and 0 <= y < xsize


with open("input.txt") as f:
    lines = f.readlines()
    tot1 = 0
    tot2 = 0
    d = {}
    s1 = set()
    s2 = set()
    ysize = len(lines)
    xsize = len(lines[0].strip())

    for i, line in enumerate(lines):
        for j, c in enumerate(line.strip()):
            if c != ".":
                d.setdefault(c, []).append([i, j])

    for k, v in d.items():
        for i in range(len(v)):
            for j in range(i + 1, len(v)):
                diff = [(v[i][0] - v[j][0]), (v[i][1] - v[j][1])]
                uptimes = downtimes = 0

                pos1 = (v[i][0] + diff[0], v[i][1] + diff[1])
                pos2 = (v[j][0] - diff[0], v[j][1] - diff[1])

                if accept(pos1[0], pos1[1], xsize, ysize) and pos1 not in s1:
                    tot1 += 1
                    s1.add(pos1)

                if accept(pos2[0], pos2[1], xsize, ysize) and pos2 not in s1:
                    tot1 += 1
                    s1.add(pos2)

                while accept(pos1[0], pos1[1], xsize, ysize):
                    uptimes += 1 if pos1 not in s2 else 0
                    s2.add(pos1)
                    pos1 = (pos1[0] + diff[0], pos1[1] + diff[1])

                while accept(pos2[0], pos2[1], xsize, ysize):
                    downtimes += 1 if pos2 not in s2 else 0
                    s2.add(pos2)
                    pos2 = (pos2[0] - diff[0], pos2[1] - diff[1])

                tot2 += uptimes + downtimes


    for k, v in d.items():
        for pos in v:
            tot2 += 1 if (pos[0], pos[1]) not in s2 else 0

    print(f"Part 1: {tot1}")
    print(f"Part 2: {tot2}")
