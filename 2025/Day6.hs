import System.IO
import Prelude hiding (replicate)

mapToInt :: [[String]] -> [[Int]]
mapToInt list =
  map (map read) list :: [[Int]]

getNums :: [String] -> [[Int]]
getNums xs =
  let lines = tail (reverse (xs))
      numStr = map words lines
   in mapToInt numStr

operation :: [Int] -> String -> Int
operation nums op =
  if op == "+" then sum (nums) else multiMap nums

getOperations :: [String] -> [String]
getOperations input = words (last input)

multiMap :: [Int] -> Int
multiMap [] = 1
multiMap list = head list * (multiMap $ drop 1 list)

transpose :: [[Int]] -> [[Int]]
transpose ([] : _) = []
transpose xss = map head xss : transpose (map tail xss)

listTest :: [Int] -> [Int]
listTest ([]) = []
listTest xs = head xs + sum (tail xs) : listTest (tail xs)

mergeNumsOps :: [[Int]] -> [String] -> [Int]
mergeNumsOps nums ops =
  zipWith operation nums ops

rightColumn :: [[Int]] -> [Int]
rightColumn [] = []
rightColumn xss = map last xss

stringify :: [[Int]] -> [[String]]
stringify [] = []
stringify xss = map show (head xss) : stringify (tail xss)

replicate :: Int -> String -> String
replicate 0 _ = ""
replicate n xs = xs ++ replicate (n - 1) xs

longestInt :: [[Int]] -> Int
longestInt [] = 0
longestInt xss =
  let stringified = stringify xss
   in maximum (map (maximum . map length) stringified)

main :: IO ()
main = do
  content <- readFile "Day6.txt"
  let linesList = lines content
  let numbers = getNums linesList
  let operations = getOperations linesList
  let transposedNums = transpose numbers
  let mergedNumsOps = mergeNumsOps transposedNums operations
  putStrLn ("Part 1: " ++ show (sum mergedNumsOps))
  print transposedNums
  print (stringify transposedNums)
  print (replicate 5 "0")
  print (longestInt transposedNums)
