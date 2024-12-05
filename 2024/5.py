def topsort(l) -> int:
    global conditions
    global tot2
    for i, e in enumerate(l):
        for x in conditions.get(e, []):
            if x in l[i:]:
                l.remove(x)
                l.insert(i, x)
                topsort(l)
                return
    tot2+=int(l[len(l)//2])
    return 



with open("input.txt") as f:
    conditions = {}
    l = f.readline()
    while(l):
        l = l.strip().split("|")
        if(len(l) == 1):
            break
        conditions[l[1]] = conditions.get(l[1], []) + [l[0]]
        l = f.readline()
    tot1 = 0
    tot2 = 0
    l = f.readline()
    while(l):
        l = l.strip().split(",")
        good = 1
        for i, e in enumerate(l):
            if sum([x in l[i:] for x in conditions.get(e, [])]): good = 0                                                                                                                         
        if(not good): topsort(l)
        tot1+=good*int(l[len(l)//2])    
        l = f.readline()
    print(conditions)
    print(f"Part 1: {tot1}")
    print(f"Part 2: {tot2}")

        