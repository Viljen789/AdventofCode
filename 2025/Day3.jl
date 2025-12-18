#Part 1 (one liner cause i could, better formatting underneath (but the same function))
@show sum([maximum([parse(Int, tensDigit)*10 + maximum([parse(Int, onesDigit) for onesDigit in numberStr[index+1:end]]) for (index, tensDigit) in enumerate(numberStr[1:end-1])]) for numberStr in readlines("Day3.txt")])
# @show sum([
#     maximum([
#         parse(Int, tensDigit)*10 + maximum([parse(Int, onesDigit) 
#         for onesDigit in numberStr[index+1:end]]) 
#         for (index, tensDigit) in enumerate(numberStr[1:end-1])
#         ]) 
#         for numberStr in readlines("Day3.txt")
#     ])

# Begynn på slutten og jobb framm. 

# Part 2


function part2(lines)
    total = 0
    for line in lines
        chars = [i for i in line]
        currentMax = chars[end-11:end]
        inversedPrefix = reverse(chars[1:end-12])
        for new in inversedPrefix
            candidate = [new; currentMax]
            removed = false
            for i in 1:12
                if candidate[i] < candidate[i+1]
                    deleteat!(candidate, i)
                    removed = true
                    break
                end
            end
            if !removed
                deleteat!(candidate, 13)
            end
            currentMax = candidate
        end
        localTot = parse(Int, join(currentMax, ""))
        total += localTot
    end
    return total
end



# lines = readlines("Day3.txt")
# 1772021727146110 too high
# 176527348415611 too low 
# 176527348415611
@show part2(readlines("Day3.txt"))
#