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
  def indicesMap() do
    Enum.reduce(parseData(), %{}, fn line, acc ->
      MapSet.new(findAllIndex(line, "^"))
    end)
  end
  def recursiveFind(pos, [], memo) do
    {1, memo}
  end
  def recursiveFind(pos, [current_indices | remaining], memo) do

    case Map.fetch(memo, {pos, length(remaining)}) do
      {:ok, value} -> {value, memo}
      :error ->
        if(pos in current_indices) do
          {val1, memo1} = recursiveFind(pos + 1, remaining, memo)
          {val2, memo2} = recursiveFind(pos - 1, remaining, memo1)
          result = val1 + val2
          final_memo = Map.put(memo2, {pos, length(remaining)}, result)
          {result, final_memo}
        else
          {val1, memo1} = recursiveFind(pos, remaining, memo)
          result = val1
          final_memo = Map.put(memo1, {pos, length(remaining)}, result)
          {result, final_memo}
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
    final_count
  end
  def solvePart2() do
    all_lines = parseData()
    pre_parsed_indices = Enum.map(all_lines, fn line -> findAllIndex(line, "^") end)
    start_pos = Enum.at(findAllIndex(hd(all_lines), "S"), 0)
    [_first_row_indices | remaining_indices] = pre_parsed_indices
    recursiveFind(start_pos, remaining_indices, %{})
  end
end

IO.inspect(Solve.solvePart1())
{result, _memo} = Solve.solvePart2()
IO.inspect(result)
