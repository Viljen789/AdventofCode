error id: file://<WORKSPACE>/2025/Day8.scala:`<none>`.
file://<WORKSPACE>/2025/Day8.scala
empty definition using pc, found symbol in pc: `<none>`.
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -scala/io/Source.fromFile.
	 -scala/io/Source.fromFile#
	 -scala/io/Source.fromFile().
	 -Source.fromFile.
	 -Source.fromFile#
	 -Source.fromFile().
	 -scala/Predef.Source.fromFile.
	 -scala/Predef.Source.fromFile#
	 -scala/Predef.Source.fromFile().
offset: 190
uri: file://<WORKSPACE>/2025/Day8.scala
text:
```scala
import scala.io.Source
import scala.util.{Using, Failure, Success}

object Day8 {
  def main(args: Array[String]): Unit = {
    val filename = "Day8.txt"
    var line = 0
    Using(Source.fr@@omFile(filename)) { source =>
      for (line <- source.getLines()) {
        line = line + 1
        line match {
          case s"$dx,$dy,$dz" =>
            println(s"Line $line: X offset is $dx, Y is $dy, Z is $dz")
          case _ =>
            println("No match found")
        }
      }
    } match {
      case Success(_) =>
      case Failure(e) => println(s"Error reading file: ${e.getMessage}")
    }
  }

}

```


#### Short summary: 

empty definition using pc, found symbol in pc: `<none>`.