import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Day1 {
    public static void main(String[] args) {
        List<String> lines = new ArrayList<>();
        // Parse input
        try {
            File myObj = new File("Day1.txt");
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
                String data = myReader.nextLine();
                lines.add(data);
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
        // Start at 50
        int cur = 50;
        int prev = 50;
        int tot1 = 0;
        int tot2 = 0;
        for (String line : lines) {
            char dir = line.charAt(0);
            int steps = Integer.parseInt(line.substring(1));
            if (dir == 'R') {
                tot2 += Math.abs(Math.floorDiv((cur + steps), 100)); // Get the amount of rotations by floor division by 100
                cur = (cur + steps) % 100; // Next step
            } else {
                tot2 += Math.abs(Math.floorDiv((cur - steps - 1), 100)); // Amount of rotations when going to the left
                tot2 -= (prev == 0 ? 1 : 0); // Avoid overcounting
                cur = (cur - steps % 100 + 100) % 100; // Next step
            }
            if (cur == 0) {
                tot1++; // Incrementer for part 1 when it lands on 0
            }

            // System.out.println(line + " " + cur + " " + tot2);
            prev = cur;

        }
        System.out.println("Part 1: " + tot1);
        System.out.println("Part 2: " + tot2);
    }
}
