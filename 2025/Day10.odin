package main

import "core:fmt"
import "core:os"

main :: proc() {
	lines := parseData()
	fmt.println(lines)
}

parseData() :: proc() -> []string {
	data, ok := os.read_entire_file("Day10.txt")
	if !ok {
		fmt.println("Error reading file")
		return []string{}
	}
	defer delete(data)

	content := string(data)
	fmt.println(content)
	return []string{}
}
