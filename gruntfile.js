module.exports = function(grunt){

    // 
      grunt.initConfig({
        // to change images sizes
        responsive_images: {
        dev: {
            options: {
            engine: 'im',
            sizes: [{
                width: 400,
                name: 'small'
            }, {
                width: 700,
                name: 'mediam'
            }, {
                width: 1000,
                name: 'large'
            }]
            },
            files: [{
            expand: true,
            src: ['men/*.{jpg,gif,png}'],
            cwd: 'images/',
            dest: 'E:/apps/mean stake/Black Purple/images'
            }]
        }
        },
        })
  
        grunt.loadNpmTasks('grunt-responsive-images');
  // to make default when type grunt 
        grunt.registerTask('default', ['responsive_images']);
  
  
  
  }