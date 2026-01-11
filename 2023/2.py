
lines = []
with open("input.txt", "r") as f:
    l = f.readline()
    while l:
        parsed = l.strip().split(";")
        parsed[0] = parsed[0].split(":")[1]
        parsed = [game.strip().split(",") for game in parsed]
        lines.append(parsed)
        l = f.readline()

limits = {"red": 12, "green": 13, "blue": 14}

lineNum = 1
tot1 = 0
tot2 = 0
for line in lines:
    possible = True
    needed = {"red": 0 , "green": 0, "blue": 0}

    for game in line:
        for draw in game:
            amount, color = draw.strip().split(" ")
            if int(amount) > limits[color]:
                possible = False
            needed[color] = max(int(amount), needed[color])
    if possible:
        tot1+=lineNum
    prod = 1
    for i in needed:
        prod*= needed[i]

    tot2+=prod
    lineNum+=1

print(f"Part 1: {tot1}")
print(f"Part 2: {tot2}")

