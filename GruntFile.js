module.exports = function(grunt) {

    var gruntBuild = grunt.file.readJSON('package.json')["grunt-build"];

    const cmd = {
        ng: {
            baseHref: "--base-href ",
            build: "ng build --configuration production ",
            configuration: "--configuration "
        },
        maven: {
            package: "mvn clean package ",
            settings: "--settings",
            prepare: "mvn release:prepare",
            perform: "mvn release:perform",
            update: "mvn release:update-versions",
            deploy: "mvn deploy"
        }
    }
    const tasks = {
        ngBuild: "exec:generate_ngbuild",
        generateWar: "exec:generate_war",
        release_prepare: "exec:release_prepare",
        release_perform: "exec:release_perform",
        deploy: "exec:deploy",
        update: "exec:update",
        copy: "copy"
    }
    const targets = gruntBuild["target"];


    grunt.initConfig({
        exec: {
            generate_ngbuild: {
                cmd: function() {
                    var target = grunt.option('target') || 'dllo';
                    var config = targets[target];
                    let cmdNgBuild = cmd.ng.build;
                    if (!!config && !!config.pathBase) {
                        cmdNgBuild = cmdNgBuild + cmd.ng.baseHref + config.pathBase;
                    } else {
                        cmdNgBuild = cmdNgBuild + cmd.ng.baseHref + './ ';
                    }
                    if (!!config && !!config.configuration) {
                        cmdNgBuild = cmdNgBuild + cmd.ng.configuration + config.configuration;
                    }
                    grunt.log.writeln(cmdNgBuild);
                    return cmdNgBuild;
                }
            },
           generate_war: {
                cmd: function() {
                    var target = grunt.option('target') || 'dllo';
                    cmdGenerateWar = cmd.maven.package + ' -f ' + gruntBuild["path-project-pom"];
                    cmdGenerateWar = cmdGenerateWar + ' -P ' + target;
                    grunt.log.writeln(cmdGenerateWar);
                    return cmdGenerateWar;
                }
            },
            release_prepare: {
                cmd: function() {
                    var target = grunt.option('target') || 'dllo';
                    cmdGenerateWar = cmd.maven.prepare + ' -f ' + gruntBuild["path-project-pom"];
                    cmdGenerateWar = cmdGenerateWar + ' -P ' + target;
                    grunt.log.writeln(cmdGenerateWar);
                    return cmdGenerateWar;
                }
            },
            release_perform: {
                cmd: function() {
                    var target = grunt.option('target') || 'dllo';
                    cmdGenerateWar = cmd.maven.perform + ' -f ' + gruntBuild["path-project-pom"];
                    cmdGenerateWar = cmdGenerateWar + ' -P ' + target;
                    grunt.log.writeln(cmdGenerateWar);
                    return cmdGenerateWar;
                }
            },
            deploy: {
                cmd: function() {
                    var target = grunt.option('target') || 'dllo';
                    cmdGenerateWar = cmd.maven.deploy + ' -f ' + gruntBuild["path-project-pom"];
                    cmdGenerateWar = cmdGenerateWar + ' -P ' + target;
                    grunt.log.writeln(cmdGenerateWar);
                    return cmdGenerateWar;
                }
            },
            update: {
                cmd: function() {
                    var target = grunt.option('target') || 'dllo';
                    var version = grunt.option('ver') || undefined;
                    cmdGenerateWar = cmd.maven.update + ' -f ' + gruntBuild["path-project-pom"];
                    cmdGenerateWar = cmdGenerateWar + ' -P ' + target;
                    if (!!version) {
                        cmdGenerateWar = cmdGenerateWar + ' -DdevelopmentVersion=' + version;
                    }
                    grunt.log.writeln(cmdGenerateWar);
                    return cmdGenerateWar;
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'dist/' + (gruntBuild["projectName"] || '') +'/browser',
                src: '**',
                dest: gruntBuild["path-dest"],
                filter: 'isFile'
            },
        },
        clean: {
            dist: {
                src: [gruntBuild["path-dest"]],
                options: {
                    force: true
                },
            }
        }
    });
    grunt.registerTask('build', function() {
        grunt.task.run(tasks.ngBuild);
        //Ejecuta el task para generar los archivos de angular
        grunt.task.run('clean');
        //Copiar archivos de la ruta Dist a una ruta destino
        grunt.task.run(tasks.copy);
        //Genera el WAR de la aplicación
        grunt.task.run(tasks.generateWar);


    });

    grunt.registerTask('deploy', function() {
        //Ejecuta el task para generar los archivos de angular
        grunt.task.run(tasks.ngBuild);

        grunt.task.run('clean');
        //Copiar archivos de la ruta Dist a una ruta destino
        grunt.task.run(tasks.copy);
        //Depliega el WAR en nexus
        grunt.task.run(tasks.deploy);

    });
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
};