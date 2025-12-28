error id: file://<WORKSPACE>/2025/Day8.scala:scala/collection/immutable/List.empty().
file://<WORKSPACE>/2025/Day8.scala
empty definition using pc, found symbol in pc: scala/collection/immutable/List.empty().
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -List.empty.
	 -List.empty#
	 -List.empty().
	 -scala/Predef.List.empty.
	 -scala/Predef.List.empty#
	 -scala/Predef.List.empty().
offset: 863
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
      map: Map[Int, (String, Int, Int, Int)],
      distances: List[(String, String, Double)]
  ): List[(String, String, Double)] = {
    distances
      .sortBy(_._3)
      .map { case (i, j, d) =>
        (map(i)._2, map(j)._2, d)
      }
  }
  def main(args: Array[String]): Unit = {
    val filename = "Day8.txt"
    var lineNumber = 0
    var DistanceMap = Map.empty[Int, (String, Int, Int, Int)]
    var listOfSet = List.empty[Set[(Int, Int, Int)]]
    var lines = List.empty[(Int, Int, Int)]
    var distances = List.emp@@ty[(String, String, Double)]
    Using(Source.fromFile(filename)) { source =>
      for (line <- source.getLines()) {
        lineNumber += 1
        line match {
          case s"$dx,$dy,$dz" =>
            DistanceMap =
              DistanceMap.updated(lineNumber, (lineNumber.toString(), dx.toInt, dy.toInt, dz.toInt))
            listOfSet = listOfSet :+ Set((dx.toInt, dy.toInt, dz.toInt))
            lines = lines :+ (dx.toInt, dy.toInt, dz.toInt)
          case _ =>
            println("No match found")
        }
      }
    } match {
      case Success(_) =>
      case Failure(e) => println(s"Error reading file: ${e.getMessage}")
    }
    for (i <- 0 to lineNumber - 1) {
      for (j <- i + 1 to lineNumber - 1) {
        distances = distances :+ (
          DistanceMap(i)._2,
          DistanceMap(j)._2,
          distance(lines(i), lines(j))
        )
      }
    }
    println(sortDistances(DistanceMap, distances))
    println(DistanceMap(1))
    println(listOfSet(0))
  }

}

```


#### Short summary: 

empty definition using pc, found symbol in pc: scala/collection/immutable/List.empty().