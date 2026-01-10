connections = []
neighboursMap = {}
triples = set()

with open("23.txt", "r") as f:
    l = f.readline()
    while l:
        connections.append(l.strip().split("-"))
        l = f.readline()
        neighboursMap[connections[-1][0]] = set()

for [f, s] in connections:
    neighboursMap[f].add(s)
    neighboursMap[s].add(f)

# def unique(tup): #123, 102, 021, 210, 120, 201
#     variations = [tup, (tup[1], tup[0], tup[2]), (tup[0], tup[2], tup[1]), (tup[2], tup[1], tup[0]), (tup[1], tup[2], tup[0]), (tup[2], tup[0], tup[1])]
#     # print(variations)
#     for variation in variations:
#         if variation in triples:
#             return False
#     return True

# print(neighboursMap)
for source, neighbours in neighboursMap.items():
    for neighbour in neighbours: # 'qp'
        # print(neighbour)
        for secondRemoved in neighboursMap[neighbour]: # 'wh'
            # print(secondRemoved)
            if(source in neighboursMap[secondRemoved]):
                triples.add(tuple(sorted((source, neighbour, secondRemoved))))


tot1 = 0
print(triples)
triplesStr = set()
for triple in triples:
    triplesStr.add(",".join(triple))
    found = False
    for computer in triple:
        if(computer[0]=="t") and not found:
            found = True
            tot1+=1

print(triplesStr)
for tstr in triplesStr:





print(tot1)