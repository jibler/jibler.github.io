module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    uglify:
      options:
        banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd hh:mm:ss\") %> */\n"
      build:
        src: "<%= pkg.name %>.js"
        dest: "<%= pkg.name %>.min.js"

    coffee:
      options:
        bare: true
      app:
        src: "foxglove.coffee"
        dest: "foxglove.js"

    watch:
      scripts:
        files: ['foxglove.coffee']
        tasks: ['coffee', 'uglify']
      example:
        files: ['*.js', '*.html', '*.css', 'Gruntfile.coffee']
        options:
          livereload: true

  # Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks 'grunt-contrib-watch'

  # Default task(s).
  grunt.registerTask "default", ['watch']

  grunt.registerTask 'deploy', 'Deploy the code to jibler.github.io', ->
    shell = require 'shelljs'
    grunt.log.writeln 'Deploying to jibler.github.io'
    shell.exec './deploy'
