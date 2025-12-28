error id: file://<WORKSPACE>/2025/Day8.scala:scala/Unit#
file://<WORKSPACE>/2025/Day8.scala
empty definition using pc, found symbol in pc: scala/Unit#
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -Unit#
	 -scala/Predef.Unit#
offset: 567
uri: file://<WORKSPACE>/2025/Day8.scala
text:
```scala
import scala.io.Source
import scala.util.{Using, Failure, Success}

object Day8 {
  def distance(point1: (Int, Int, Int), point2: (Int, Int, Int)) = {
    math.sqrt(
      math.pow(point1._1 - point2._1, 2) +
        math.pow(point1._2 - point2._2, 2) +
        math.pow(point1._3 - point2._3, 2)
    )
  }
  def sortDistances(
      distances: List[(Int, Int, Double)]
  ): List[(String, String, Double)] = {
    distances
      .sortBy(_._3)
      .map { case (i, j, d) =>
        (map(i).toString, map(j).toString, d)
      }
  }
  def main(args: Array[String]): U@@nit = {
    val filename = "Day8.txt"
    var lineNumber = 0
    var map = Map.empty[Int, (Int, Int, Int)]
    var listOfSet = List.empty[Set[(Int, Int, Int)]]
    var lines = List.empty[(Int, Int, Int)]
    var distances = List.empty[(Int, Int, Double)]
    Using(Source.fromFile(filename)) { source =>
      for (line <- source.getLines()) {
        lineNumber += 1
        line match {
          case s"$dx,$dy,$dz" =>
            map = map.updated(lineNumber, (dx.toInt, dy.toInt, dz.toInt))
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
          i,
          j,
          distance(lines(i), lines(j))
        )
      }
    }
    println(distances)
    println(map(1))
    println(listOfSet(0))
  }

}

```


#### Short summary: 

empty definition using pc, found symbol in pc: scala/Unit#