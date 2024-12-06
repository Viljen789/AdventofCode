with open("input.txt") as f:
    l = f.readlines()
    l = [list(l[i].strip()) for i in range(len(l))]
    visited = [[0 for _ in range(len(l[0]))] for _ in range(len(l))]
    dir = [[-1, 0], [0, 1], [1, 0], [0, -1]]
    pos = []
    for y in range(len(l)):
        for x in range(len(l[0])):
            if(l[y][x]=="^"): pos = [y, x]
    curdir = 0
    visited[pos[0]][pos[1]] = 1
    while(1):
        x = pos[1]
        y = pos[0]
        change = curdir
        while(l[y+dir[curdir][0]][x+dir[curdir][1]]=="#"): 
            curdir=(curdir+1)%4
        pos = [y+dir[curdir][0], x+dir[curdir][1]]
        l[y+dir[curdir][0]][x+dir[curdir][1]] = "*"
        visited[pos[0]][pos[1]] = 1
        if(pos[0]+dir[curdir][0] in [-1, len(l)] or pos[1]+dir[curdir][1] in [-1, len(l[0])]):
            break
     
        
    for line in l:
        print(" ".join([str(x).rjust(3) for x in line]))
    for line in visited:
        print(" ".join([str(x).rjust(3) for x in line]))
    print(f"Part 1: {sum([sum(x) for x in visited])}")





    