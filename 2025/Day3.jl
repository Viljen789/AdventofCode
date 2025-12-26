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


# Part 2
@show sum([parse(Int, join(foldl((acc, x) -> (cand = [x; acc]; idx = findfirst(i -> cand[i] < cand[i+1], 1:12); isnothing(idx) ? cand[1:12] : deleteat!(cand, idx)), reverse(line[1:end-12]); init=collect(line[end-11:end])), "")) for line in readlines("Day3.txt")])

















# More readable version: 
# function part2(lines)
#     total = 0
#     for line in lines
#         chars = [i for i in line]
#         currentMax = chars[end-11:end]
#         inversedPrefix = reverse(chars[1:end-12])
#         for new in inversedPrefix
#             candidate = [new; currentMax]
#             removed = false
#             for i in 1:12
#                 if candidate[i] < candidate[i+1]
#                     deleteat!(candidate, i)
#                     removed = true
#                     break
#                 end
#             end
#             if !removed
#                 deleteat!(candidate, 13)
#             end
#             currentMax = candidate
#         end
#         localTot = parse(Int, join(currentMax, ""))
#         total += localTot
#     end
#     return total
# end



# @show part2(readlines("Day3.txt"))
