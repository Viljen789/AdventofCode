def extrap(l, val):
    nl = [0]*(len(l)-1)
    for i in range(len(l)-1):
        nl[i] = l[i+1]-l[i]
    if(nl == [0]*(len(l)-1)): return (0, 0)
    front = extrap(nl, 0)[0]
    back = extrap(nl, 0)[1]
    return nl[0] - front, nl[-1] + back 

with open("input.txt") as f:
    l = f.readline()
    forwards = 0
    backwards = 0
    while(l):   
        l = [int(x) for x in l.split()]
        front, back = extrap(l, 0)
        forwards+=+l[-1] + back
        backwards+=l[0] - front
        l = f.readline()
    print(f"Part 1: {forwards}")
    print(f"Part 2: {backwards}")

# def rec2(l, val):
#     nl = [0]*(len(l)-1)
#     for i in range(len(l)-1):
#         nl[i] = l[i+1]-l[i]
#     if(nl == [0]*(len(l)-1)): return 0
#     val = rec2(nl, 0)
#     ret = nl[0]-val
#     return ret

# with open("input.txt") as f:
#     l = f.readline()
#     tot = 0
#     while(l):   
#         l = l.split()
#         l = [int(x) for x in l]
#         v = rec2(l, 0)
#         tot+=l[0]-v
#         l = f.readline()
#     print(tot)
