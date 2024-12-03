def check(line, ifail, dfail):
	inc = 1
	dec = 1
	ans = 0
	cont = 0
	for i in range(len(line) - 1):
		if cont:
			cont = 0
			continue
		if not (line[i + 1] > line[i] and (line[i + 1] - line[i]) <= 3):
			if ifail and (i==len(line)-2 or (line[i] < line[i+2] and abs(line[i + 2] - line[i]) <= 3)):
				ifail = 0
				cont = 1
			else:
				inc = 0
		if not (line[i + 1] < line[i] and (line[i] - line[i + 1]) <= 3 ):
			if dfail and (i==len(line)-2 or (line[i + 2] < line[i] and abs(line[i] - line[i + 2]) <= 3)):
				dfail = 0
				cont = 1
			else:
				dec = 0
	if inc or dec or ans:
		return 1
	return 0



with open("input.txt", "r") as f:
	lines = f.readlines()
	tot1 = 0
	tot2 = 0
	for line in lines:
		line = line.strip().split()
		inc = 1
		dec = 1
		fail = 1
		line = [int(x) for x in line]
		l = line
		tot1 += check(line, 0, 0)
		tot2 += check(line, 1, 1)

	print(tot1)
	print(tot2)