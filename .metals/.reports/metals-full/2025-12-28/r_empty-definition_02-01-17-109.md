error id: file://<WORKSPACE>/2025/Day8.scala:scala/Predef.String#
file://<WORKSPACE>/2025/Day8.scala
empty definition using pc, found symbol in pc: scala/Predef.String#
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -String#
	 -scala/Predef.String#
offset: 866
uri: file://<WORKSPACE>/2025/Day8.scala
text:
```scala
import scala.io.Source
import scala.util.{Using, Failure, Success}

object Day8 {
  def distance(point1: (Int, Int, Int), point2: (Int, Int, Int)): Double = {
    math.sqrt(
      math.pow(point1._1 - point2._1, 2) +
        math.pow(point1._2 - point2._2, 2) +
        math.pow(point1._3 - point2._3, 2)
    )
  }
  def sortDistances(
      distances: List[(String, String, Double)]
  ): List[(String, String, Double)] = {
    distances.sortBy(_._3)
  }
  def mergeSets(
      sets: List[Set[String]],
      elem1: String,
      elem2: String
  ): Set[String] = {
    sets.reduce(_ union _)
  }
  def main(args: Array[String]): Unit = {
    val filename = "Day8.txt"
    var lineNumber = 0
    var listOfSet = List.empty[Set[Int]]
    var lines = List.empty[(Int, Int, Int)]
    var distances = List.empty[(String, String, Double)]
    var strLines = List.empty[Str@@ing]
    var lineNumberToLine = Map.empty[Int, String]
    Using(Source.fromFile(filename)) { source =>
      for (line <- source.getLines()) {
        lineNumber += 1
        strLines = strLines :+ line
        line match {
          case s"$dx,$dy,$dz" =>
            lines = lines :+ (dx.toInt, dy.toInt, dz.toInt)
          case _ =>
            println("No match found")
        }
        listOfSet = listOfSet :+ Set(lineNumber)
        lineNumberToLine = lineNumberToLine.updated(lineNumber, line)
      }
    } match {
      case Success(_) =>
      case Failure(e) => println(s"Error reading file: ${e.getMessage}")
    }
    for (i <- 0 to lineNumber - 1) {
      for (j <- i + 1 to lineNumber - 1) {
        distances = distances :+ (
          strLines(i),
          strLines(j),
          distance(lines(i), lines(j))
        )
      }
    }
    var sortedDistances = sortDistances(distances)
    var total = 0.0
    for (line <- sortedDistances) {
      println(
        "Distance between " + line._1 + " and " + line._2 + " is " + line._3
      )
      listOfSet = mergeSets(
        listOfSet,
        lineNumberToLine(line._1),
        lineNumberToLine(line._2)
      )
    }
    println(total)
    println(listOfSet)
    println(lineNumberToLine)
  }

}

```


#### Short summary: 

empty definition using pc, found symbol in pc: scala/Predef.String#