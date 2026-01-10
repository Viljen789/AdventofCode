import time
lines = []
modulo = 16777216 # = 2^24
# mix -> xor
# prune -> mod 16777216
d = {}

with open("22.txt", "r") as f:
    l = f.readline()
    while(l):
        lines.append(int(l.strip()))
        l = f.readline()


# *64, mix, prune, //32, mix, prune, *2048, mix, prune

def process(processed):
    step1 = ((processed*64)^processed)%modulo
    step2 = ((step1//32)^step1)%modulo
    step3 = ((step2*2048)^step2)%modulo
    return step3

def speed_up_process(processed):
    # print(f"Original:{bin(processed):>{30}}")
    step1 = ((processed<<6)^processed)&(modulo-1)
    # print(f"Step 1:  {bin(step1):>{30}}")
    step2 = ((step1>>5)^step1)&(modulo-1)
    # print(f"Step 2:  {bin(step2):>{30}}")
    step3 = ((step2<<11)^step2)&(modulo-1)
    # print(f"Step 3:  {bin(step3):>{30}}")
    # print(f"totalXor:{bin(processed^step2^step3):>{30}}")
    # print(f"Reverse: {bin(processed^2^(1<<6)):>{30}}")
    return step3
#HUGE WASTE OF TIME, NO NEED TO FIND CLOSE FORM FORMULA
# """
# Original:                          0b11
#
# Step 1:                      0b11000011
# Step 2:                      0b11000101
# Step 3:           0b1100010100011000101
#
# """
# # Netto: +2, +orig<<6 + orig << 17 + (2+orig) << 11
# """
# Original:                           0b1
# Step 1:                       0b1000001
# Step 2:                       0b1000011
# Step 3:            0b100001100001000011
# totalXor:          0b100001100000000001
# """
def instant(orig):
    # return (orig+2 + (orig << 6) + (orig << 17) + ((2+orig) << 11))&(modulo-1)
    return (orig^((orig<<1)^(orig << 6))^((orig^(orig<<1)) << 11)^(orig << 12)^(orig >> 12))&(modulo-1)
# vals = [1, 2, 137283]
# for i in vals:
#     # print(f"{i} -> {bin(i)}")
#     # print(f"{i} -> {bin(instant(i))}")
#     # print(f"{i} -> {bin(speed_up_process(i))}")
#     print(f"{i} -> {i:0{24}b} (origial in binary)")
#     print(f"{i} -> {instant(i):0{24}b} (instant)")
#     print(f"{i} -> {speed_up_process(i):0{24}b} (actual answer)")
#     print()

tot1 = 0
# for i in lines:
#     cur = i
#     for processes in range(2000):
#         cur = process(cur)
#     # print(f"{i} -> {cur}")
#     tot1+=cur
tot2 = 0
num = 123
for i in lines:
    cur = i
    curSpeed = i
    prevPrice = 0
    remainder = (-10, -10, -10, -10)
    for i in range(4):
        price = cur%10
        change = price - prevPrice
        # print(f"{cur}: {price} ({change})")
        cur = speed_up_process(cur)
        remainder = (remainder[1], remainder[2], remainder[3], change)
        prevPrice = price
        # print(f"i: {i} Remainder: {remainder}")

    found = set()

    for processes in range(2000-4):
        price = cur%10
        change = (price - prevPrice)
        # print(f"{cur}: {price} ({change})")
        cur = speed_up_process(cur)
        remainder = (remainder[1], remainder[2], remainder[3], change)
        if remainder not in found:
            d[remainder] = d.get(remainder, 0) + price
        found.add(remainder)
        prevPrice = price

        # print(f"i: {i} Remainder: {remainder}")

    # print(f"{i} -> {cur}")
    tot1+=cur
print(f"Part1: {tot1}")
# print(neighboursMap)
# for key, value in neighboursMap.items():
#     print(f"{key} -> {value}")
# print(f"neighboursMap of max: {neighboursMap[(0, 2, 1, 0)]}")
print(f"Part2: {max([value for value in d.values()])}")
# 2431 too high
#(0, 2, 1, 0)
# 8 + 7 + 10
# (-2, 1, -1, 3)