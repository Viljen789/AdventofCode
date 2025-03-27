l = []
with open("input.txt") as f:
    rl = f.readlines()
    for i in range(len(rl)//4 + 1):
        first = rl[i*4].split("+")
        second = rl[i*4+1].split("+")
        prize = rl[i*4+2].split("=")
        this = [[int(first[1][:first[1].index(",")]), int(first[2].strip())],
                [int(second[1][:second[1].index(",")]), int(second[2].strip())],
                [int(prize[1][:prize[1].index(",")]), int(prize[2].strip())]]

        l.append(this)



tot = 0
for i in l:
    xtarget = i[2][0]
    ytarget = i[2][1]
    xa = i[0][0]
    ya = i[0][1]
    xb = i[1][0]
    yb = i[1][1]
    curmin = 100000000
    for amult in range(101):
        if(xtarget - xa*amult)%xb != 0 or (ytarget - ya*amult)%yb != 0:
            continue
        bmult = (xtarget - xa*amult)//xb
        if amult * xa + bmult * xb == xtarget and amult * ya + bmult * yb == ytarget:
            if bmult < 0 or bmult > 100:
                continue
            curmin=min(curmin, amult*3 + bmult)
            # print(f"amult: {amult}, bmult: {bmult}, xa: {xa}, ya: {ya}, xb: {xb}, yb: {yb}")
            # print(f"Target: {xtarget}, {ytarget}, Actual: {xa*amult + xb*bmult}, {ya*amult + yb*bmult}")

    if curmin != 100000000:
        tot += curmin
print(f"Part 1: {tot}")