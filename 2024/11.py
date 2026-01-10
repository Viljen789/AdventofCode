with open("input.txt") as f:
    l = f.readline().split()
    l = [int(x) for x in l]
print(l)
l2 = l
def blinking(d, n, pt2 = False):
    for i in l:
        d[i] = 1
    for blink in range(n):
        nd = {}
        for i in d:
            if i == 0:
                nd[1] = nd.get(1, 0) + d[i]
            elif not len(str(i))&1:
                nd[int(str(i)[:len(str(i))//2])] = nd.get(int(str(i)[:len(str(i))//2]), 0) + d[i]
                nd[int(str(i)[len(str(i))//2:])] = nd.get(int(str(i)[len(str(i))//2:]), 0) + d[i]
            else:
                nd[i*2024] = nd.get(i*2024, 0) + d[i]
        d = nd
        #print(neighboursMap)
    return d

d = {}
d = blinking(d, 75)
tot = 0
for i in d:
    tot += d[i]
print(d)
print(tot)
