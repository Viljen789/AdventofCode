def rec(factors, l, i, concat = False):
    if(i==len(factors)):
        return l
    nl = []
    cur = factors[i]
    for element in l:
        nl.append(element*cur)
        nl.append(element+cur)
        if(concat):nl.append(int(str(element)+str(cur)))
    return rec(factors, nl, i+1, concat)



with open("input.txt") as f:
    line = f.readline()
    tot1 = 0
    tot2 = 0
    while(line):
        line = line.split()
        target = int(line[0][:-1])
        factors = [int(x) for x in line[1:]]
        l1 = rec(factors, [factors[0]], 1)
        l2 = rec(factors, [factors[0]], 1, True)
        tot1+=target if target in l1 else 0
        tot2+=target if target in l2 else 0
        line = f.readline()
    print(f"Part 1: {tot1}")
    print(f"Part 2: {tot2}")
