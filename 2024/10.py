def updateList(num: int):
    height = len(lst1) - 1
    width = len(lst1[0]) - 1
    for x in range(len(lst1)):
        for y in range(len(lst1[x])):
            if lst1[x][y][0] == num:
                if x<height and lst1[x + 1][y][0] == num-1:
                    lst1[x + 1][y][1] = lst1[x + 1][y][1] | lst1[x][y][1]
                    lst2[x + 1][y][1] += lst2[x][y][1]
                if x>0 and lst1[x - 1][y][0] == num-1:
                    lst1[x - 1][y][1] = lst1[x - 1][y][1] | lst1[x][y][1]
                    lst2[x - 1][y][1] += lst2[x][y][1]
                if y<width and lst1[x][y + 1][0] == num-1:
                    lst1[x][y + 1][1] = lst1[x][y + 1][1] | lst1[x][y][1]
                    lst2[x][y + 1][1] += lst2[x][y][1]
                if y>0 and lst1[x][y - 1][0] == num-1:
                    lst1[x][y - 1][1] = lst1[x][y - 1][1] | lst1[x][y][1]
                    lst2[x][y - 1][1] += lst2[x][y][1]




lst1 = []
lst2 = []
with open("input.txt") as f:
    l = f.readlines()
    for x, i in enumerate(l):
        i = i.strip()
        temp1 = []
        temp2 = []
        for y, j in enumerate(i):
            temp1.append([int(j), set()]) if j != "9" else temp1.append([9, {(x, y)}])
            temp2.append([int(j), 0]) if j != "9" else temp2.append([9, 1])
        lst1.append(temp1)
        lst2.append(temp2)

for i in range(9, 0, -1):
    updateList(i)
tot1 = 0
tot2 = 0
for i in range(len(lst1)):
    for j in range(len(lst1[i])):
        if lst1[i][j][0] == 0:
            tot1 += len(lst1[i][j][1])
            tot2 += lst2[i][j][1]

print(f"Part 1: {tot1}")
print(f"Part 2: {tot2}")

