positions = []
velocities = []
height = 103
width = 101

p2 = 0
with open("input.txt") as f:
    l = f.readlines()
    for i in l:
        if not i.strip():
            continue
        i = i.strip().split()
        positions.append([int(i[0][2:i[0].index(",")]), int(i[0].split(",")[-1])])
        velocities.append([int(i[1][2:i[1].index(",")]), int(i[1].split(",")[-1])])

for i in range(1, 10000):
    for j in range(len(positions)):
        positions[j][0] = (positions[j][0] + velocities[j][0]) % width
        positions[j][1] = (positions[j][1] + velocities[j][1]) % height

    grid = [[0 for _ in range(width)] for _ in range(height)]
    for pos in positions:
        grid[pos[1]][pos[0]] = 1

    found = False
    for k in range(height):
        streak = 0
        max_streak = 0
        for j in range(width):
            if grid[k][j] == 1:
                streak += 1
                max_streak = max(max_streak, streak)
            else:
                streak = 0

        if max_streak >= 10:
            p2 = i
            for row in grid:
                print(''.join('#' if cell == 1 else '.' for cell in row))
            found = True
            break

    if found:
        break

    # if i % 100 == 0:
    #     print(f"Step {i}")

quads = [0, 0, 0, 0]
for p in positions:
    if p[0] < width//2 and p[1] < height//2:
        quads[0] += 1
    elif p[0] >= width//2 and p[1] < height//2:
        quads[1] += 1
    elif p[0] < width//2 and p[1] >= height//2:
        quads[2] += 1
    elif p[0] >= width//2 and p[1] >= height//2:
        quads[3] += 1

tot = 1
for i in quads:
    tot *= i
print(f"Part 1: {tot}")
print(f"Part 2: {p2}")