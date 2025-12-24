import Data.Char (isDigit, isSpace)
import Data.List (dropWhileEnd, transpose)
import Debug.Trace (trace)
import System.IO

trim :: String -> String
trim = f . f
  where
    f = reverse . dropWhile isSpace

padToMax :: [String] -> [String]
padToMax lines =
  let maxLen = maximum (map length lines)
   in map (\s -> s ++ replicate (maxLen - length s) ' ') lines

isSeparatorCol :: String -> Bool
isSeparatorCol col = all isSpace col

splitBlocks :: [String] -> [[String]]
splitBlocks [] = []
splitBlocks cols =
  let (block, rest) = break isSeparatorCol cols
      rest' = dropWhile isSeparatorCol rest
   in if null block then splitBlocks rest' else block : splitBlocks rest'

getOpFromBlock :: [String] -> String
getOpFromBlock block =
  let lastRowChars = map last block
      opChar = head $ filter (not . isSpace) lastRowChars
   in [opChar]

parseColumnToNum :: String -> Int
parseColumnToNum col =
  let numPart = init col
      trimmed = trim numPart
   in if null trimmed then 0 else read trimmed

multiMap :: [Int] -> Int
multiMap [] = 1
multiMap list = head list * (multiMap $ drop 1 list)

solvePart2 :: [String] -> Int
solvePart2 block =
  let op = getOpFromBlock block
      nums = filter (> 0) $ map parseColumnToNum block
   in if op == "+" then sum nums else multiMap nums

solvePart1 :: [String] -> Int
solvePart1 block =
  let op = getOpFromBlock block
      -- Transpose block to get horizontal rows
      rows = transpose block
      -- Exclude the last row (operator row)
      numberRows = init rows
      -- Parse non-empty rows
      parseRow r = let t = trim r in if null t then 0 else read t
      nums = filter (> 0) $ map parseRow numberRows
   in if op == "+" then sum nums else multiMap nums

main :: IO ()
main = do
  content <- readFile "Day6.txt"
  let linesList = lines content
  -- Pad lines to ensure valid transpose
  let paddedLines = padToMax linesList
  -- Transpose to get columns
  let columns = transpose paddedLines
  -- Split into problem blocks (separated by empty columns)
  let blocks = splitBlocks columns

  let result1 = sum $ map solvePart1 blocks
  putStrLn ("Part 1: " ++ show result1)

  let result2 = sum $ map solvePart2 blocks
  putStrLn ("Part 2: " ++ show result2)
