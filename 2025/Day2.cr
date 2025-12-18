def part1(parsed)
  total : Int64 = 0
  parsed.each do |pair|
    first = pair[0]
    second = pair[1]
    first.upto(second) do |j|
      str = j.to_s
      len = str.size
      if len.odd?
        next
      end
      if str[0..(len // 2 - 1)] == str[(len // 2)..len - 1]
        total += j
      end
    end
  end
  total
end

def part2(input)
  total : Int64 = 0
  input.each do |pair|
    first = pair[0]
    second = pair[1]
    first.upto(second) do |j|
      str = j.to_s
      len = str.size
      1.upto(len - 1) do |repSize|
        formatted = str.gsub(str[0..repSize - 1], "")
        if formatted == ""
          total += j
          # p! j
          break
        end
      end
    end
  end
  total
end

def parse(input)
  input.split(",").map { |i| i.split("-").map { |j| j.to_i64 } }
end

input = File.read("Day2.txt")
parsed = parse(input)
total1 : Int64 = part1(parsed)
total2 : Int64 = part2(parsed)
p! total1
p! total2
