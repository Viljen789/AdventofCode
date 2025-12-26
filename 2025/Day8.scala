import scala.io.Source
import scala.util.{Using, Failure, Success}

object Day7 {
  def main(args: Array[String]): Unit = {
    val filename = "Day7.txt"
    Using(Source.fromFile(filename)) { source =>
      for (line <- source.getLines()) {
        println(line)
      }
    } match {
      case Success(_) =>
      case Failure(e) => println(s"Error reading file: ${e.getMessage}")
    }
    val input = "9, 4, 34"

    input match {
      case s"$dx, $dy" =>
        println(s"X offset is $dx, Y is $dy")
      case _ =>
        println("No match found")
    }
  }

}
