from functools import lru_cache

colors = {}
combos = []
longest = 0
colorsList = []

with (open("input.txt", "r") as f):
    colorsList = [s.strip() for s in f.readline().split(", ")]
    for i in colorsList:
        if( not len(i) in colors):
            colors[len(i)] = set()
        colors[len(i)].add(i)
        if len(i) > longest:
            longest = len(i)
    line = f.readline()
    while line:
        if line.strip():
            combos.append(line.strip())
        line = f.readline()

# print(f"Colors: {colors}")
# print(f"Combos: {combos}")

def buildUp(remaining):
    # print(remaining)
    completed = False
    #DIct instead
    for color in colorsList:
        if(remaining[:len(color)] == color):
            if len(remaining) == len(color):
                return True
            completed = buildUp(remaining[len(color):])
            if completed:
                return True
    return completed

@lru_cache(maxsize=None)
def buildUpTotal(remaining):
    # print(remaining)
    total = 0
    for lenght in range (1, max(longest+1, len(remaining)+1)):
        if remaining[:lenght] in colors.get(lenght, set()):
            color = remaining[:lenght]
            # print(f"Found: {color}")
            if len(remaining) == len(color):
                total += 1
            total += buildUpTotal(remaining[len(color):])
    return total

    return False

tot1 = 0
tot2 = 0
for combo in combos:
    if buildUp(combo):
        tot1 += 1
    tot2 += buildUpTotal(combo)
    print(combo)

print(f"Part 1:", tot1)
print(f"Part 2:", tot2)



