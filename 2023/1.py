
lines = []
with open("input.txt", "r") as f:
    line = f.readline()
    while line:
        lines.append(line.strip())
        line = f.readline()
numbers = {"1", "2", "3", "4", "5", "6", "7", "8", "9"} # No need to include 0 since not in input
numberStrs = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9}

tot1 = 0
tot2 = 0

for line in lines:
    # print(line)
    found = [0, 0]
    foundp2 = [0, 0]
    for j in range(len(line)):

        for wordLen in range(3, 6):
            if line[j:j+wordLen] in numberStrs and not foundp2[0]:
                foundp2[0] = 10*numberStrs[line[j:j+wordLen]]
            # print(f"Front: {line[j:j+wordLen]}")
            idxBack = -j-1
            backStr = line[idxBack:idxBack+wordLen]
            if wordLen>j:
                backStr = line[idxBack:]
            if backStr in numberStrs and not foundp2[1]:
                foundp2[1] = numberStrs[backStr]

        if line[j] in numbers and not found[0]:
            found[0] = 10*int(line[j])
            if not foundp2[0]:
                foundp2[0] = 10*int(line[j])
        if line[-j-1] in numbers and not found[1]:
            found[1] = int(line[-j-1])
            if not foundp2[1]:
                foundp2[1] = int(line[-j-1])
    # print(f"line: {line}: found: {found}, foundp2: {foundp2}")
    tot1+=found[0]+found[1]
    tot2+=foundp2[0]+foundp2[1]



print(f"Part1: {tot1}")
print(f"Part2: {tot2}")

# for j in range(len(str)):
#     for wordLen in range(3, 6):
#         idxBack = -j-1
#
#         print(f"Back: {str[idxBack:idxBack+wordLen]}")

