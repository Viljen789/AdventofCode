package main

import "core:fmt"
import "core:os"

main :: proc() {
	data, ok := os.read_entire_file("DayX.txt")
	if !ok {
		fmt.println("Error reading file")
		return
	}
	defer delete(data)

	content := string(data)
	fmt.println(content)
}
