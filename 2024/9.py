with open("./input.txt") as f:
    l = f.readline().strip()

disk = []
diskp2 = []
file = []
free = []
filep2 = []
file_id = 0
pos = 0

for i, char in enumerate(l):
    length = int(char)
    if not i & 1:
        disk.extend([file_id] * length)
        file.extend((j, file_id) for j in range(pos, pos + length))
        diskp2.append([file_id, length])
        file_id += 1
        filep2.append([file_id, length])
    else:
        disk.extend(['.'] * length)
        free.extend(range(pos, pos + length))
        diskp2.append(['.', length])
    pos += length

file.reverse()
filep2.reverse()

i = 0
j = 0
while i < len(file) and j < len(free):
    fileIndex, fid = file[i]
    freeIndex = free[j]
    if freeIndex >= fileIndex:
        j += 1
    else:
        disk[freeIndex] = fid
        disk[fileIndex] = '.'
        i += 1
        j += 1
liststr = "".join(str(x) for x in disk)
checksum = sum([int(liststr[x])*x for x in range(len(liststr)-1) if liststr[x] != '.'])
# print("Part 1:", checksum)

# print("".join(str(x[0])*x[1] for x in diskp2 ))
# print(diskp2)
i = len(diskp2) - 1
for i in range(len(diskp2) - 1, 0, -1):
    if(diskp2[i][0] == '.'):
        continue
    # print("".join(str(x[0])*x[1] for x in diskp2 ))
    for j in range(i):
        if(diskp2[j][1] == diskp2[i][1] and diskp2[j][0]=='.'):
            diskp2[j][0] = diskp2[i][0]
            diskp2[i][0] = '.'
            break
        elif(diskp2[j][1] > diskp2[i][1] and diskp2[j][0]=='.'):
            diskp2[j][1] -= diskp2[i][1]
            diskp2.insert(j, [diskp2[i][0], diskp2[i][1]])
            diskp2[i+1][0] = '.'
            break
    k = 0
    new_diskp2 = []
    for block in diskp2:
        if new_diskp2 and new_diskp2[-1][0] == '.' and block[0] == '.':
            new_diskp2[-1][1] += block[1]
        else:
            new_diskp2.append(block)
    diskp2[:] = new_diskp2

checksum2 = 0
print(diskp2)
index = 0
for e in diskp2:
    for j in range(e[1]):
        if e[0] == '.':
            index += 1
            continue   
        checksum2 += e[0]*index
        # print(f"{e[0]} * {index} = {e[0]*index}")
        index += 1

print("Part 2:", checksum2)

