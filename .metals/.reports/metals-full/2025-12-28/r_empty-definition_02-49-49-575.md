error id: file://<WORKSPACE>/2025/Day8.scala:scala/Tuple3#_2.
file://<WORKSPACE>/2025/Day8.scala
empty definition using pc, found symbol in pc: scala/Tuple3#_2.
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -point2/_2.
	 -point2/_2#
	 -point2/_2().
	 -scala/Predef.point2._2.
	 -scala/Predef.point2._2#
	 -scala/Predef.point2._2().
offset: 232
uri: file://<WORKSPACE>/2025/Day8.scala
text:
```scala
import scala.io.Source
import scala.util.{Using, Failure, Success}

object Day8 {
  def distance(point1: (Int, Int, Int), point2: (Int, Int, Int)): Int = {
    math.pow(point1._1 - point2._1, 2) +
      math.pow(point1._2 - point2._@@2, 2) +
      math.pow(point1._3 - point2._3, 2)
  }
  def sortDistances(
      distances: List[(Int, Int, Int)]
  ): List[(Int, Int, Int)] = {
    distances.sortBy(_._3)
  }
  def find(sets: Array[Int], i: Int): Int = {
    if (sets(i) == i) i
    else {
      sets(i) = find(sets, sets(i))
      sets(i)
    }
  }
  def mergeSets(sets: Array[Int], elem1: Int, elem2: Int): Unit = {
    val root1 = find(sets, elem1)
    val root2 = find(sets, elem2)
    if (root1 != root2) {
      sets(root1) = root2
    }
  }
  def findGroupSizes(parent: Array[Int]): Map[Int, Int] = {
    (1 until parent.length)
      .map(i => find(parent, i))
      .groupBy(identity)
      .mapValues(_.size)
      .toMap
  }
  def main(args: Array[String]): Unit = {
    val filename = "Day8.txt"
    var lineNumber = 0
    var lines = List.empty[(Int, Int, Int)]
    var distances = List.empty[(Int, Int, Int)]
    var strLines = List.empty[String]
    var lineNumberToLine = Map.empty[Int, String]
    var lineToNumber = Map.empty[String, Int]
    Using(Source.fromFile(filename)) { source =>
      for (line <- source.getLines()) {
        lineNumber += 1
        strLines = line :: strLines
        line match {
          case s"$dx,$dy,$dz" =>
            lines = (dx.toInt, dy.toInt, dz.toInt) :: lines
          case _ =>
            println("No match found")
        }
        lineNumberToLine = lineNumberToLine.updated(lineNumber, line)
        lineToNumber = lineToNumber.updated(line, lineNumber)
      }
    } match {
      case Success(_) =>
      case Failure(e) => println(s"Error reading file: ${e.getMessage}")
    }

    var parent = Array.tabulate[Int](lineNumber + 1)(i => i)
    val points = lines.reverse.toArray
    val distBuf = scala.collection.mutable.ListBuffer.empty[(Int, Int, Int)]

    for (i <- 0 until points.length) {
      for (j <- i + 1 until points.length) {

        distBuf += ((i, j, distance(points(i), points(j))))
      }
    }
    val sortedDistances = distBuf.toList.sortBy(_._3)
    var total = 1
    for (i <- 0 to 999) {
      val distance = sortedDistances(i)
      // println(
      //   "Distance between " + distance._1 + "(" + lineToNumber(
      //     distance._1
      //   ) + ")" + " and " + distance._2 + "(" + lineToNumber(
      //     distance._2
      //   ) + ")" + " is " + distance._3
      // )
      mergeSets(
        parent,
        distance._1,
        distance._2
      )
    }
    var topSizes = findGroupSizes(parent).toList.sortBy(_._2).takeRight(3)
    println(topSizes.map(_._2).product)
  }

}

```


#### Short summary: 

empty definition using pc, found symbol in pc: scala/Tuple3#_2.