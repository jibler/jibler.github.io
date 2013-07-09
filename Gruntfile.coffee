module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    uglify:
      options:
        banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
      build:
        src: "<%= pkg.name %>.js"
        dest: "<%= pkg.name %>.min.js"

    coffee:
      options:
        bare: true
      app:
        src: "foxglove.coffee"
        dest: "foxglove.js"

  # Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks "grunt-contrib-uglify"

  # Default task(s).
  grunt.registerTask "default", ["coffee", "uglify"]