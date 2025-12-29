import Foundation

let filename = "Day9.txt"
let fileManager = FileManager.default
let currentPath = fileManager.currentDirectoryPath
let fileURL = URL(fileURLWithPath: currentPath).appendingPathComponent(filename)
func readFile() -> [String] {
    do {
        let content = try String(contentsOf: fileURL, encoding: .utf8)
        let parsedLines = content.split(separator: "\n")
        return parsedLines.map { String($0) }
    } catch {
        print("Error reading file: \(error)")
    }
    return []
}
func potentialCorners(points: [[Int]]) -> [[Int]] {
    var topRight = [Int]()
    var bottomLeft = [Int]()
    var topLeft = [Int]()
    var bottomRight = [Int]()
    for point in points {
        if point[0] > topRight[0] {
            topRight = point
        }
        if point[1] < bottomLeft[1] {
            bottomLeft = point
        }
        if point[0] < topLeft[0] {
            topLeft = point
        }
        if point[1] > bottomRight[1] {
            bottomRight = point
        }
    }
    return [topRight, bottomLeft, topLeft, bottomRight]
}

func area(firstCorner: [Int], secondCorner: [Int]) -> Int {
    return (firstCorner[0] - secondCorner[0] + 1) * (firstCorner[1] - secondCorner[1] + 1)
}

let lines: [String] = readFile()
let numLines: [[Int]] = lines.map { line in
    line.split(separator: ",").map { Int($0)! }
}

var maxArea: Int = 0
for line: [Int] in numLines {
    for secondLine: [Int] in numLines {
        if line != secondLine {
            let area: Int = area(firstCorner: line, secondCorner: secondLine)
            if area > maxArea {
                maxArea = area
            }
        }
    }
}
print(maxArea)
