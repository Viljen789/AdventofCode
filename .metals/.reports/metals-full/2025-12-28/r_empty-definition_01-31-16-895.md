error id: file://<WORKSPACE>/2025/Day8.scala:scala/Predef.Set.
file://<WORKSPACE>/2025/Day8.scala
empty definition using pc, found symbol in pc: scala/Predef.Set.
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -Set.
	 -Set#
	 -Set().
	 -scala/Predef.Set.
	 -scala/Predef.Set#
	 -scala/Predef.Set().
offset: 589
uri: file://<WORKSPACE>/2025/Day8.scala
text:
```scala
import scala.io.Source
import scala.util.{Using, Failure, Success}

object Day8 {
  def main(args: Array[String]): Unit = {
    val filename = "Day8.txt"
    var lineNumber = 0
    var map = Map.empty[Int, (Int, Int, Int)]
    var listOfSet = List.empty[Set[(Int, Int, Int)]]
    var lines = List.empty[String]
    Using(Source.fromFile(filename)) { source =>
      for (line <- source.getLines()) {
        lineNumber += 1
        line match {
          case s"$dx,$dy,$dz" =>
            map = map.updated(lineNumber, (dx.toInt, dy.toInt, dz.toInt))
            listOfSet = listOfSet :+ @@Set((dx.toInt, dy.toInt, dz.toInt))
          case _ =>
            println("No match found")
        }
      }
    } match {
      case Success(_) =>
      case Failure(e) => println(s"Error reading file: ${e.getMessage}")
    }
    println(map(1))
    println(listOfSet(0))
  }

}

```


#### Short summary: 

empty definition using pc, found symbol in pc: scala/Predef.Set.