#Part 1
with open("input3.txt") as f:
    l = f.readline()
    tot = 0
    tot2 = 0
    active = 1
    while(l):
        l = l.split("mul")
        for line in l:
            linetocheck = line
            line = line.split(",")[:2]
            try:
                num1 = int(line[0][1:])
                num2 = int(line[1][:line[1].index(")")])
                if(not line[0][0]=="(" or num2>999 or " " in line[0][1:] + line[1][:line[1].index(")")]):raise RuntimeError
            except:
                num1 = num2 = 0
            tot+=num1*num2
            tot2+=num1*num2*active
            for i in range(len(linetocheck)):
                if(linetocheck[i:i+len("do()")]=="do()"):active = 1
                if(linetocheck[i:i+len("don't()")]=="don't()"):active = 0
        l = f.readline()
    print(tot)
    print(tot2)

