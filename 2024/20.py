#44
import time
from curses import *

start = (0, 0)
end = (0, 0)
locations = {}
with open('input.txt') as f:
    lines = [line.strip() for line in f.readlines()]


for (y, line) in enumerate(lines):
    for (x,loc) in enumerate(line):
        if loc == "E":
            end = (x, y)
        if loc == "S":
            start = (x, y)


save = {}
def findCheats(current, boundary=0):
    x, y = current
    tot = 0
    for i in (-1, 1):
        if(x+i < 0 or x+i >= len(lines[0])):
            continue
        else:
            if(lines[y][x+i] == "#") and (x+2*i, y) in locations and lines[y][x+2*i] != "#" and locations[(x+2*i, y)] - locations[(x, y)]-2 >= boundary:
                print(f"Jump from {current} to {(x+2*i, y)} to save {locations[(x+2*i, y)] - locations[(x, y)]-2}")
                if(locations[(x+2*i, y)] - locations[(x, y)]-2 in save):
                    save[locations[(x+2*i, y)] - locations[(x, y)]-2] += 1
                else:
                    save[locations[(x+2*i, y)] - locations[(x, y)]-2] = 1
                tot += 1
        if(y+i < 0 or y+i >= len(lines)):
            continue
        else:
            if(lines[y+i][x] == "#") and (x, y+2*i) in locations and lines[y+2*i][x] != "#" and locations[(x, y+2*i)] - locations[(x, y)]-2 >= boundary:
                print(f"Jump from {current} to {(x, y+2*i)} to save {locations[(x, y+2*i)] - locations[(x, y)]-2}")
                if(locations[(x, y+2*i)] - locations[(x, y)]-2 in save):
                    save[locations[(x, y+2*i)] - locations[(x, y)]-2] += 1
                else:
                    save[locations[(x, y+2*i)] - locations[(x, y)]-2] = 1
                tot += 1
    return tot



def findNext(prev, current):
    x, y = current
    px, py = prev
    if x > 0 and (x-1, y) != (px, py) and lines[y][x-1] != "#":
        return (x-1, y)
    if y > 0 and (x, y-1) != (px, py) and lines[y-1][x] != "#":
        return (x, y-1)
    if x < len(lines[0])-1 and (x+1, y) != (px, py) and lines[y][x+1] != "#":
        return (x+1, y)
    if y < len(lines)-1 and (x, y+1) != (px, py) and lines[y+1][x] != "#":
        return (x, y+1)
    return None
# 6943 too high
def findSymbol(prev, current):
    x, y = current
    px, py = prev
    if(x>px):
        return "❯"
    if(x<px):
        return "❮"
    if(y<py):
        return "⌃"
    if(y>py):
        return "⌄"



cur = findNext(start, start)
distance = 0
prev = start
while cur != end:
    locations[prev] = distance
    distance += 1
    next = findNext(prev, cur)
    if not next:
        break
    prev = cur
    cur = next
locations[prev] = distance
distance += 1
locations[end] = distance
# print(locations)

cur = findNext(start, start)
prev = start
tot1 = 0
while cur != end:
    tot1 += findCheats(prev, 100)
    next = findNext(prev, cur)
    if not next:
        break
    prev = cur
    cur = next
print(tot1)


#1522 too high

# def main(stdscr):
#     global start
#     global cur
#     global distance
#     stdscr.clear()
#     for i in range(len(lines)):
#         stdscr.addstr(i, 0, lines[i])
#     while cur != end:
#         locations[cur] = distance
#         distance += 1
#         # stdscr.addstr(0, 0, f"Current: {cur}, End: {end}")
#         stdscr.refresh()
#         next = findNext(start, cur)
#         if not next:
#             time.sleep(10)
#         symbol = findSymbol(start, cur)
#         stdscr.addstr(cur[1], cur[0], symbol)
#         if(symbol == "❯" or symbol == "❮"):
#             stdscr.addstr(start[1], start[0], "-")
#         else:
#             stdscr.addstr(start[1], start[0], "|")
#         start = cur
#         cur = next
#         time.sleep(0.02)
#         stdscr.refresh()
#         stdscr.addstr(len(lines)+1, 0, "Current distance: {}".format(distance))
#     time.sleep(10)
# wrapper(main)
# # print(lines[start[1]][start[0]])
sortedKeys = sorted(save.keys())
for key in sortedKeys:
    print(save[key], key)