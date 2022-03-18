ThisBuild / version := "1.0.0"

ThisBuild / scalaVersion := "2.13.8"

enablePlugins(ScalaJSPlugin)

libraryDependencies ++= Seq(
  "org.scala-js" %% "scalajs-library" % "1.9.0",
  "org.scala-js" %%% "scalajs-dom" % "2.1.0"
)

scalaJSUseMainModuleInitializer := true

Compile / fullOptJS / artifactPath := baseDirectory.value / "index.js"

lazy val root = (project in file("."))
  .settings(
    name := "generate",
    idePackagePrefix := Some("com.kuba86.cloudflare.generate")
  )
