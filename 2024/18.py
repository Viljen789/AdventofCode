from time import sleep
walls = []
currentWalls = []
exampleInput = 0
realInput = 1^exampleInput
iters = exampleInput*12 + realInput*1024
dims = [7, 7] * exampleInput + realInput*[71, 71]
print(f"dims: {dims}, iters: {iters}")
with open("input.txt") as f:
    line = f.readline()
    while(line):
        walls.append([int(line.split(",")[0]), int(line.split(",")[1])])
        line = f.readline()

visited = set()

def check_neighbour(x, y):
    neighbours = []
    if x>0 and [x-1, y] not in currentWalls:
        neighbours.append([x-1, y])
    if(y>0 and [x, y-1] not in currentWalls):
        neighbours.append([x, y-1])
    if(x<dims[0]-1 and [x+1, y] not in currentWalls):
        neighbours.append([x+1, y])
    if(y<dims[1]-1 and [x, y+1] not in currentWalls):
        neighbours.append([x, y+1])
    return neighbours

def dfs(currentWalls):
    queue = [[0,0]]
    while len(queue) > 0:
        # print(f"queue: {queue}")
        x,y = queue.pop()
        if((x,y) in visited):
            continue
        visited.add((x,y))
        # print(f"dist: {curDist}, x: {x}, y: {y}")
        # sleep(0.5)
        next = check_neighbour(x,y)
        if not next:
            continue
        # print(f"next: {next}")

        for a, b in next:
            if((a,b) in visited):
                continue
            queue.append([a,b])
            # print(f"a: {a}, b: {b}, dist: {curDist+1}")
        if(x==dims[0]-1 and y==dims[1]-1):
            return True
    return False

def bfs():
    queue = [[0,0,0]]
    while len(queue) > 0:
        # print(f"queue: {queue}")
        x,y,curDist = queue.pop(0)
        if((x,y) in visited):
            continue
        visited.add((x,y))
        # print(f"dist: {curDist}, x: {x}, y: {y}")
        # sleep(0.5)
        next = check_neighbour(x,y)
        if not next:
            continue
        # print(f"next: {next}")

        for a, b in next:
            if((a,b) in visited):
                continue
            queue.append([a,b,curDist+1])
            # print(f"a: {a}, b: {b}, dist: {curDist+1}")
        if(x==dims[0]-1 and y==dims[1]-1):
            return curDist
            break


currentWalls = walls[:iters]

print(f"Part 1:", bfs())
l = iters
r = len(walls)
m = 0
while l<r:
    m = (r+l)//2
    # print(f"l: {l} m: {m} r: {r}")
    currentWalls = walls[:m]
    visited = set()
    if(dfs(currentWalls)):
        l = m+1
    else:
        r = m-1
#     sleep(0.5)
print(f"Part 2:", walls[m])


#
# graph = [["." for i in range(dims[0])] for j in range(dims[1])]
# for x, y in visited:
#     graph[x][y] = "O"
#
# for x,y in currentWalls:
#     graph[x][y] = "X"
#
# for row in graph:
#     for col in row:
#         print(col, end=" ")
#     print()


