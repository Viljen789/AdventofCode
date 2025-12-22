package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

const path = "Day4.txt"

func readFile(path string) ([][]rune, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	var grid [][]rune

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		row := []rune(line)
		grid = append(grid, row)
	}
	return grid, nil
}
func testDirections(grid [][]rune, row int, col int) int {

	maxRow := len(grid)
	maxCol := len(grid[row])
	left := col - 1
	top := row - 1
	right := col + 1
	bottom := row + 1
	totNeighbours := 0
	if top >= 0 && grid[top][col] == '@' { // top
		totNeighbours++
	}
	if bottom < maxRow && grid[bottom][col] == '@' { // bottom
		totNeighbours++
	}
	if left >= 0 && grid[row][left] == '@' { // left
		totNeighbours++
	}
	if right < maxCol && grid[row][right] == '@' { // right
		totNeighbours++
	}
	if top >= 0 && left >= 0 && grid[top][left] == '@' { // top left
		totNeighbours++
	}
	if top >= 0 && right < maxCol && grid[top][right] == '@' { // top right
		totNeighbours++
	}
	if bottom < maxRow && left >= 0 && grid[bottom][left] == '@' { // bottom left
		totNeighbours++
	}
	if bottom < maxRow && right < maxCol && grid[bottom][right] == '@' { // bottom right
		totNeighbours++
	}
	return totNeighbours
}

func fillNeighbourGrid(neighbourGrid [][]int, grid [][]rune) {
	for i := range grid {
		for j := range grid[i] {
			neighbourGrid[i][j] = testDirections(grid, i, j)
		}
	}
}

func main() {
	grid, err := readFile(path)
	if err != nil {
		log.Fatalf("Failed to read file: %v", err)
	}
	rows := len(grid)
	cols := len(grid[0])
	neighbourGrid := make([][]int, rows)
	for i := range neighbourGrid {
		neighbourGrid[i] = make([]int, cols)
	}
	fillNeighbourGrid(neighbourGrid, grid)
	p1 := 0

	for i := range neighbourGrid {
		for j := range neighbourGrid[i] {
			if neighbourGrid[i][j] < 4 && grid[i][j] == '@' {
				p1++
			}
		}
	}
	changed := 1
	p2 := 0
	for changed > 0 {
		changed = 0
		for i := range neighbourGrid {
			for j := range neighbourGrid[i] {
				if neighbourGrid[i][j] < 4 && grid[i][j] == '@' {
					p2++
					grid[i][j] = '.'
					changed++
				}
			}
		}
		fillNeighbourGrid(neighbourGrid, grid)
	}
	fmt.Println(p2)

}
