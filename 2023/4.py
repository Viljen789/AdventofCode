cards = []
with open("input.txt", "r") as f:
    line = f.readline()
    while line:
        lines = (line.split(":")[1].strip().split("|"))
        lines = [l.strip().split(" ") for l in lines]
        intLines = [{int(i) for i in l if i} for l in lines ]
        cards.append(intLines)
        line = f.readline()
# print(cards)
winnings = {}


tot1 = 0
tot2 = 0
lineNr = 0
for card in cards:
    exp = 0
    matches = 0
    for i in card[0]:
        if i in card[1]:
            if exp:exp <<= 1
            else: exp = 1
            matches += 1
    tot1+= exp

flippedCards = cards[::-1]

for card in flippedCards:
    matches = 0
    for i in card[0]:
        if i in card[1]:
            matches += 1
    points = matches
    for i in range(1, matches+1):
        print(lineNr)
        points+=winnings[lineNr-i]
    winnings[lineNr] = points
    tot2 += points
    lineNr += 1

print()

print(f"Part 1: {tot1}")
print(f"Part 2:{tot2 + len(cards)}")