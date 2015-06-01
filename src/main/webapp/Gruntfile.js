module.exports= function(grunt) {

grunt.initConfig({

 distFolder: 'dist',

  pkg: grunt.file.readJSON('package.json'),


clean: ["dist"],

uglify:{

dist: {
        files: {
          'dist/app.min.js': [ 'app/*.js','app/*/*.js']
        },
        options: {
          mangle: false
        }


}
}


});






grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-uglify');

 grunt.registerTask('build', ["clean",'uglify']);

};