import Foundation

let filename = "DayX.txt"
let fileManager = FileManager.default
let currentPath = fileManager.currentDirectoryPath
let fileURL = URL(fileURLWithPath: currentPath).appendingPathComponent(filename)

do {
    let content = try String(contentsOf: fileURL, encoding: .utf8)
    print(content)
} catch {
    print("Error reading file: \(error)")
}
