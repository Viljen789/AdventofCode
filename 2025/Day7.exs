defmodule Solve do
  def parseData() do
    "Day7.txt"
    |> File.read!()
    |> String.split("\n")
  end
  def findAllIndex(line, target) do
    for {char, idx} <- Enum.with_index(String.graphemes(line)), char==target, do: idx
  end
  def findOverlap(prev_indices, current_indices) do
    MapSet.union(MapSet.new(prev_indices), MapSet.new(current_indices))
  end
  def findNeighbors(indices, length) do
    Enum.reduce(indices, MapSet.new(), fn idx, acc ->
      neighbors = [idx-1, idx+1]
      |>Enum.filter(fn x -> x>=0 and x<length end)
      MapSet.union(acc, MapSet.new(neighbors))
    end)
  end
  def recursiveFind(pos, []) do
    1
  end
  def recursiveFind(pos, [cur | remaining], memo) do
    if Map.has_key?(memo, pos) do
      memo[pos]
    else
      indices = findAllIndex(cur, "^")
      if pos in indices do
        memo = Map.put(memo, pos, recursiveFind(pos + 1, remaining, memo) + recursiveFind(pos - 1, remaining, memo))
        memo[pos]
      else
        memo = Map.put(memo, pos, recursiveFind(pos, remaining, memo))
        memo[pos]
      end
    end
  end
  def solvePart1() do
    [head | tail ] = parseData()
    initial_state = {0, MapSet.new(findAllIndex(head, "S"))}

    {final_count, _last_indices} = Enum.reduce(tail, initial_state, fn line, {acc_count, prev_indices} ->
      current_set = MapSet.new(findAllIndex(line, "^"))
      if(MapSet.size(current_set) != 0) do
        overlap = MapSet.intersection(prev_indices, current_set)
        # IO.inspect({acc_count + MapSet.size(overlap), overlap}, charlists: :as_lists)
        {acc_count + MapSet.size(overlap), MapSet.union(MapSet.difference(prev_indices, current_set), findNeighbors(current_set, String.length(line)))}
      else
        {acc_count, prev_indices}
      end
    end)
    IO.inspect(final_count)
  end
  def solvePart2() do
    [head | tail ] = parseData()
    total = recursiveFind(Enum.at(findAllIndex(head, "S"), 0), tail, %{})
    IO.inspect(total)
  end
end

Solve.solvePart1()
Solve.solvePart2()
