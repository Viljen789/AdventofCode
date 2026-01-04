boxes = []
sizes = []
boxesToFit = []

with open("Day12.txt", "r") as file:
    line = file.readline()
    while line:
        line = line.strip()
        if len(line) == 2:
            box = [file.readline().strip() for _ in range(3)]
            boxes.append(box)
            sizes.append(sum([b.count("#") for b in box]))
        if len(line) > 3:
            line = line.split(" ")
            boxesToFit.append([line[0][:-1],[int(i) for i in line[1:]]])
        line = file.readline()

print(boxes)
print(sizes)
print(boxesToFit)
tot = 0
for [dimentions, boxes] in boxesToFit:
    dimsList = dimentions.split("x")
    dims = int(dimsList[0])*int(dimsList[1])
    filled = 0
    for (idx, val) in enumerate(boxes):
        filled += sizes[idx]*val
    if(filled<=dims):tot+=1
        
print(tot)
    