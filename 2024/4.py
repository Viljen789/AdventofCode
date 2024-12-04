with open("input.txt") as f:
    tot = 0
    lines = f.readlines()
    for y, line in enumerate(lines):
        for x, char in enumerate(line):
            hor = line[x:x+4]
            revhor = hor[::-1]
            vert = "".join([lines[y+l][x] for l in range(4) if y+4<len(line)])
            revvert = "".join(vert[::-1])
            upright = "".join([lines[y-l][x+l] for l in range(4) if (y-3>=0 and x+3<len(line))])
            downright = "".join([lines[y+l][x+l] for l in range(4) if (y+3<len(lines) and x+3<len(line))])
            upleft = "".join([lines[y-l][x-l] for l in range(4) if (y-3>=0 and x-3>=0)])
            downleft = "".join([lines[y+l][x-l] for l in range(4) if (y+3<len(lines) and x-3>=0)])
            l = [hor, revhor, vert, revvert, upright, downright, upleft, downleft]
            tot += sum([1 for word in l if word=="XMAS"])
    print(f"Part 1: {tot1}")
              

with open("input.txt") as f:
    tot2 = 0
    lines = f.readlines()
    for y, line in enumerate(lines):
        for x, char in enumerate(line):
            downright = "".join([lines[y-1+l][x-1+l] for l in range(3) if (x not in [0, len(line)-1] and y not in [0, len(lines)-1])])
            downleft = "".join([lines[y-1+l][x+1-l] for l in range(3) if (x not in [0, len(line)-1] and y not in [0, len(lines)-1])])
            tot2 += downright in ["SAM", "MAS"] and downleft in ["SAM", "MAS"]
    print(f"Part 2: {tot2}")

        
