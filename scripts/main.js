require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        //bootstrap: '../bower_components/bk-bootstrap/dist/js/bootstrap',
        bootstrap: '../libs/bootstrap/dist/js/bootstrap',
        hbs: '../bower_components/require-handlebars-plugin/hbs',
        text: '../bower_components/requirejs-plugins/lib/text',
        json: '../bower_components/requirejs-plugins/src/json',
        d3: '../bower_components/d3/d3',
        d3pie: '../libs/d3pie/d3pie/d3pie',
        Snap: '../bower_components/Snap.svg/dist/snap.svg',
        Handlebars: '../bower_components/handlebars/handlebars'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    hbs: {
        helpers: false,
        i18n: false,
        templateExtension: 'html'
    }

});

require([
        'app',
        'jquery',
        'bootstrap',
        'text',
        'json',
        'd3',
        'd3pie',
        'Snap',
        'Handlebars',
        //tpls
        'hbs!../tpl/base',
        'json!../list.json'
    ],
    function(app, $, bootstrap, text, json, d3, d3pie, Snap, Handlebars, base, steps) {

        'use strict';
        // use app here
        console.log(app);
        console.log('Running jQuery %s', $().jquery);


        $('#presentacion').carousel({
            interval: false,
            keyboard: true
        });

        //load templates async !!
        steps.forEach(function(step, index) {

            //console.log("step: " + JSON.stringify(step));


            /*
            require(config: ['hbs!../steps/' + step.uri], function(data, base, step, index) {
                console.log();
                $('.carousel-inner').append(base({
                    file: data,
                    class: step.uri,
                    id: step.uri
                }));
            });
            */

            $.ajax({
                url: 'steps/' + step.uri + ".html",
                indexval: index,
                success: function(data) {
                    console.log(this.indexval);
                    if (this.indexval === 0) {
                        $('.carousel-inner').append(base({
                            file: data,
                            class: step.uri + " active",
                            id: step.uri
                        }));
                    } else {
                        $('.carousel-inner').append(base({
                            file: data,
                            class: step.uri,
                            id: step.uri,
                            title: step.title
                        }));
                    }
                },

                async: false
            });
        });

        console.log('loaded');


        var titles = [
            'Portada',
            'Sistema de trabajo',
            'Sistema y subsistemas en la Universidad',
            'Clasificación de Peligros',
            'Secuencia conducente al daño',
            'Sistema General de Riesgos Laborales',
            'Responsabilidades y obligaciones - SGRL',
            'Estructura SG-SST Universidad',
            'Niveles de documentación',
            'Procedimientos (Gestión por peligros)',
            'Medidas de prevención y control',
            'Documentos institucionales de consulta',
            'Contacto',
            'Créditos'
        ]

        var slidecount = 0;

        function xmul(a, x) {
            var y = (a * x) / 1;
            return y;
        }

        function xmul2(a, x) {
            var y = (a * x) / 100;
            return y;
        }



        /* aspect ratio : 1 x 0.6481481481*/

        //First title 
        $('.navbar-text').html(titles[0])

        $('#presentacion').on('slide.bs.carousel', function(e) {

            // do something…
            var target = $(e.relatedTarget);
            var title = target.attr('data-title');
            $('.navbar-text').html(title);
            console.log("title:" + title);

            var margin = {
                left: 10,
                top: 10,
                right: 10,
                bottom: 10
            };


            ////    SISTEMA-SUBSISTEMA //////////

            if (target.hasClass('sistema-subsistema')) {

                $('.subsis-list a').click(function(e){
                  console.log(e);
                  e.preventDefault();
                  var id = $(e.currentTarget).attr('id');

                  console.log(id);
                  switch(id){
                    case 'labs':
                      $('#subsistema-img').attr('src', '../images/macrosistema_laboratorios.png');
                      $("#subsis-tit").html('LABORATORIOS');
                      break;
                    case 'ofis':
                      $('#subsistema-img').attr('src', '../images/macrosistema_oficinas.png');
                      $("#subsis-tit").html('OFICINAS');
                      break;
                    case 'aulas':
                      $('#subsistema-img').attr('src', '../images/macrosistema_aulas.png');
                      $("#subsis-tit").html('AULAS');                      
                      break;
                    case 'talleres':
                      $('#subsistema-img').attr('src', '../images/macrosistema_talleres.png');
                      $("#subsis-tit").html('TALLERES');                      
                      break;                      
                  }
                });

                /* CLASIFICACION DE LOS PELIGROS */

            } else if (target.hasClass('clasificacion-peligros')) {

                var menuitems = [{
                        'link': 'Biológico',
                        'img': 'images/c_biologico.png',
                        'texto': [
                            'Virus',
                            'Bacterias',
                            'Hongos',
                            'Ricktesias',
                            'Parásitos',
                            'Picaduras',
                            'Mordeduras',
                            'Fluídos o excrementos'
                        ]
                    },

                    {
                        'link': 'Físico',
                        'img': 'images/c_fisico.png',
                        'texto': [
                            'Ruido (de impacto, intermitente, contínuo)',
                            'Iluminación (liz visible por exceso o deficiencia)',
                            'Vibración (cuerpo entero, segmentaria)',
                            'Temperaturas extremas (calor y frio)',
                            'Presión atmosférica (normal y ajustada)',
                            'Radiaciones Ionizantes (rayos x, gama, beta y alfa)',
                            'Radiaciones no ionizantes (laser, ultravioleta, infraroja, radiofrecuencia, microondas)'

                        ]
                    }, {
                        'link': 'Químico',
                        'img': 'images/c_quimico.png',
                        'texto': [
                            'Polvos orgánicos e inorgánicos',
                            'Fibras',
                            'Líquidos (nieblas y rocíos)',
                            'Gases y vapores',
                            'Humos metálicos y no metálicos',
                            'Material particulado'
                        ]
                    }, {
                        'link': 'Psicosocial',
                        'img': 'images/c_psicosocial.png',
                        'texto': [
                            'Gestión organizacional (estilo de mando, pago, contratación, participación, bienestar social, evaluación de desempaño y maejo de cambios)',
                            'Características de la organización del trabajo (comunicación, tecnología, organización del trabajo, demandas cualitativas y cuantitativas de la labor).',
                            'Características del grupo social del trabajo (relaciones, cohesión, calidad de interacciones, trabajo en equipo)',
                            'Condiciones de la tarea (carga mental, contenido de la tarea, demandas emocionales, sistemas de control, definición de roles, monotonía, etc).',
                            'Jornada del trabajo (pausas, trabajo nocturno, rotación, horas extras, descansos)'
                        ]
                    }, {
                        'link': 'Biomecanicos',
                        'img': 'images/c_fisico.png',
                        'texto': [
                            'Postura ( prolongada, mantenida, forzada, antigravitacional).',
                            'Esfuerzo',
                            'Movimiento repetitivo',
                            'Manipulación manual de cargas'
                        ]
                    }, {
                        'link': 'Condiciones de Seguridad',
                        'img': 'images/c_cseguridad.png',
                        'texto': [
                            'Mecánico (elementos o partes de máquinas, herramientas, equipos, piezas a trabajar, materiales proyectados sólidos o fluídos).',
                            'Eléctrico (alta y baja tensión, estática).',
                            'Locativo (sistemas y medios de almacenamiento), superficies de trabajo (irregulares, deslizantes con diferencia de nivel), condiciones de orden y aseo, (caídas de objetos).',
                            'Tecnolígico (explosión, fuga, derrame, incendio)',
                            'Accidentes de tránsito',
                            'Públicos (robos, atracos, asaltos, atentados de orden público, etc).',
                            'Trabajo en alturas',
                            'Espacios confinados'
                        ]
                    }, {
                        'link': 'Fenómenos Naturales',
                        'img': 'images/c_fenomenos.png',
                        'texto': [
                            'Sismo',
                            'Terremoto',
                            'Vendaval',
                            'Inundación',
                            'Derrumbe',
                            'Precipitaciones ( lluvias, granizadas, heladas ).',
                        ]
                    }
                ];

                //var width = $(window).width();

                var wwidth = $(window).width();
                var wheight = $(window).height();
                var width, height;
                if (wwidth > wheight) {
                    width = (wwidth / 12) * 8;
                    height = wheight;
                } else {
                    width = wwidth;
                    height = wwidth;
                }
                var unit = width / 12
                    //var width = target.width();
                    //var width = parseInt(d3.select(".gr-cont").style("width"));
                    //var wsc_factor = width/1080;
                console.log(width);
                var gratio = 1;
                //var height = width * gratio - margin.top * 2;
                var padh = height - margin.top * 2;
                //height = height + margin.top + margin.bottom;

                var s = Snap('#clasificacion-viz').attr({
                    width: width,
                    height: height,
                });

                s.clear();

                var dial_scfactor = 0.75;
                var new_scale = dial_scfactor * width;
                var new_factor = new_scale / width;
                var dx, dy, dw, dh;
                var dialr = 0,
                  dialcx = 0,
                  dialcy = 0;


                // BEGIN -- EXT SVG TEST
                
                var menu = s.g();
                var menusize = 0;
                var img;
                //var dial = s.g();
                //var lab = s.image('data:image/png;base64,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',-(unit*2), (height/4) - 10, unit*4, unit*4);

                var dialfile = Snap.load('images/dial.svg', function(draw) {
                  img = s.image('images/circ-lab.png', 0, 0, unit*4, unit*4);

                  s.add(draw);
                  var dcenter = s.select('#dialc');
                  var dtip = s.select('#dial-tip');
                  var dial = s.select('#dial');
                  dialr = dcenter.getBBox().w/2;
                  dialcx = dcenter.getBBox().cx;
                  dialcy = dcenter.getBBox().cy;
                  dw = dcenter.getBBox().w;
                  dh = dcenter.getBBox().h;
                  if(width < dw){
                    console.log('small dial');
                    console.log(dial);
                    dial.transform('scale(0.5)');
                  }
                  console.log('dialcx: ' + dialcx);
                 menuitems.forEach(function(item, index) {
                      var angle = (index * 20) - 45;
                      var rangle = (index * 10) - 30;
                      //var x = Math.cos(Snap.rad(angle)) * dialr;
                      //var y = Math.sin(Snap.rad(angle)) * dialr;

                      var x = dialr ;
                      var y = index * 40;
                      menusize += 40;

                      var label = s.rect(x - unit, y - unit/4, unit * 4, unit/4 )
                        .attr('class', 'dmenu-label')
                        .attr('id', 'label-' + index)
                          .mouseup(function() {
                            console.log('id: ' + this.attr('id'));
                            loadTxt(this.attr('id'));
                            loadImage( img, this.attr('id'), (dcenter.getBBox().cx - (unit * 1.9) ), (dcenter.getBBox().cy - (unit*1.9)), unit*3.8, unit*3.8 );
                            img.transform('t' + (dcenter.getBBox().cx - (unit * 2) ) + ',' + (dcenter.getBBox().cy - (unit * 2)));
                            console.log('angle: ' + rangle);
                            dtip.animate({
                              transform: 'R' + rangle + ',' + dialcx + ',' + (dialcy + unit * .40)
                            }, 500, mina.easein);
                          });

                      var t = s.text(x, y, item.link)
                          .attr('id', 'title-' + index)
                          .attr('class', 'dmenu-item');

                      menu.add(label);
                      menu.add(t);
                    

                  });
                  menu.transform('T' + dialcx  + ',' + ( dialcy - (menusize/2)));
                  img.transform('t' + (dcenter.getBBox().cx - (unit * 2) ) + ',' + (dcenter.getBBox().cy - (unit * 2)));
                }, this);


                //var lab = s.image(img ,-(unit*2), (height/4) - 10, unit*4, unit*4);
                //s.add(lab);

                //console.log("widht" + width);
                //var dial_scfactor = dial.getBBox().width/1080;

                //console.log('scale ' + new_factor);


                //pont to debug positioning
                /*
                var guide = s.g();
                var point = s.circle(dy, dy, 10)
                    .attr('fill', '#000');
                guide.add(point);
                */

                //dial.transform('r70,' + 0 + ',' +padh/2);

                var loadTxt = function(id) {
                    var index = id.substr(-1);
                    console.log('click index: ' + menuitems[index].texto);
                    var txt = menuitems[index].texto;

                    $('#clasif-txt').empty();
                    txt.forEach(function(data, i) {
                        $('#clasif-txt').append('<li>' + data + '</li>');
                    });
                }

                var loadImage = function(img, id, x, y, w, h){
                    var index = id.substr(-1);
                    //console.log('click index: ' + menuitems[index].texto);
                    img = s.image(menuitems[index].img, x, y, w, h);
                    //img.transform('t' + x - (unit * 2) + ',' + y - (unit * 2));
                }


                //END -- EXT SVG TEST




                //  SISTEMA DE RIESGOS LABORALES 

            } else if (target.hasClass('sistema-riesgos-laborales')) {

                var ley = {
                    'name': 'LEY 100 DE 1993',
                    'file': 'Ley_100_1993.pdf',
                    'children': [{
                            'name': 'LEY 1562 DE 2012',
                            'file': 'Ley_1562_2012.pdf',
                            'children': [{
                                'name': 'DECRETO 0723 DE 2013',
                                'file': 'Decreto_723_2013.pdf'
                            }, {
                                'name': 'DECRETO 1443 DE 2014',
                                'file': 'Decreto_1443_2014.pdf'
                            }]
                        }, {
                            'name': ' OTRAS NORMAS DEL SISTEMA DE RIESGOS LABORALES'
                        },

                    ]
                };

                var wwidth = $(window).width();
                var wheight = $(window).height();
                var width, height;
                if (wwidth > wheight) {
                    width = wheight;
                } else {
                    width = wwidth
                }
                //var width = target.width();
                //var width = parseInt(d3.select(".gr-cont").style("width"));
                var wsc_factor = width / 1080;
                var gratio = 1.5;
                height = width;
                height = height - margin.top - margin.bottom;
                height = height + margin.top + margin.bottom;
                width = width * 1.5 - margin.left - margin.right;
                var unit = height / 12;

                $('#sgrl-viz').empty();

                console.log('dimensions: ' + width + ',' + height);
                //var viz = d3.selectAll('#leyes-g');

                //viz.selectAll('*').remove();
                var i = 0;
                var tree = d3.layout.tree()
                    .size([width, height]);
                //.separation(function(a,b){return (a.parent === b.parent ? 10:20) /a.depht; });

                var diagonal = d3.svg.diagonal()
                    .projection(function(d) {
                        return [d.x, d.y];
                    });


                var viz = d3.select('#sgrl-viz').attr('width', width).attr('height', height)
                    .append('g').attr('transform', 'translate(' + 0 + ',' + unit * 3 + ')');

                var nodes = tree.nodes(ley).reverse(),
                    links = tree.links(nodes);

                nodes.forEach(function(d) {
                    d.y = d.depth * unit * 3;
                });

                var node = viz.selectAll("g.node")
                    .data(nodes, function(d) {
                        return d.id || (d.id = ++i);
                    });

                var nodeEnter = node.enter().append('g')
                    .attr('class', 'node')
                    .attr('transform', function(d) {
                        return 'translate(' + d.x + ',' + d.y + ')';
                    });
                /*
                           nodeEnter.append('circle')
                               .attr('r', function(d){return !d.parent ? unit*2 : unit })
                               .attr('class', function(d){ return !d.parent ? 'root': 'child'; });
                 */

                var l = nodeEnter.append('a')
                    .attr('xlink:href', function(d) {
                        return '../files/' + d.file
                    }).attr('target', '_blank');


                l.append('circle')
                    .attr('r', function(d) {
                        return !d.parent ? unit * 2 : unit
                    })
                    .attr('class', function(d) {
                        return !d.parent ? 'root' : 'child';
                    });

                /*
                nodes.foeach( function(d){
                    //var d = d3.select(this);
                    var words = d.name.split(' ');
                    var count = 0;
                    l = [];
                    for(var i = 0; i < words.length; i+=3){
                        var line = '';
                        count++;
                        for(var j = 0; j<3; j++){
                            if( typeof words[i+j] !== 'undefined'){
                                console.log('blah' + words[i+j]);
                                line  = line +  words[i+j] + ' ' ;
                            }

                        }
                        l.push(line);
                        console.log(line);
                        //d.append('text').attr('x', 0).attr('y', count * unit/4 ).text(line);

                    }

                d.lines = l;

                });
                */

                l.append('text')
                    //.attr("x", function(d) { return d.x; })
                    //.attr("y", function(d) { return d.y; })
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("dy", ".35em")
                    .attr("text-anchor", "middle")
                    .text(function(d) {
                        return d.name
                    });
                /*
                  .append('text')
                  .attr("x", function(d) { return d.x; })
                  .attr("y", function(d) { return d.y; })
                  .attr("dy", ".70em")
                  .attr("text-anchor", "middle")
                  .text(function(d) { return d.lines[1]})
                  .append('text')
                  .attr("x", function(d) { return d.x; })
                  .attr("y", function(d) { return d.y; })
                  .attr("dy", ".35em")
                  .attr("text-anchor", "middle")
                  .text(function(d) { return d.lines[2]})
            */

                /*
            nodeEnter.append("text")
               .attr("x", function(d) { 
                return d.children || d._children ? -13 : 13; })
               .attr("dy", ".35em")
               .attr("text-anchor", function(d) { 
                return d.children || d._children ? "end" : "start"; })
               .style("fill-opacity", 1);
          
              var ltext = nodeEnter.append("text")
                  .attr("x", function(d) { return d.x; })
                  .attr("y", function(d) { return d.y; })
                  .attr("dy", ".35em")
                  .attr("text-anchor", "middle")
                  .text(function(d) { return d.name });
                  
                   var temp_text = ltext.text();
                   ltext.text('');
                   var words = temp_text.split(' ');
                  
                  for (var i = 0; i < words.length; i += 3) {
                    
                        ltext.append('tspan').text(function(d) { 
                            return words[i] + ' ' + words[i+1] + ' ' + words[1+2]; 
                        })
                        .attr('x', function(d) { return 0 ; }).attr('y', function(d) { return  i * 25 ; });
                    }
                */
                /*
                    if (i == 0) {
                        ltext.append('tspan').text(function(d) { return d.name.split(' ')[i]; } ).attr('x', function(d) { return d.x; });
                    } else {
                        ltext.append('tspan').text(function(d) { 
                            return d.name.split(' ')[i]; } 
                        ).attr('x', function(d) { return d.x ; }).attr('y', function(d) { return (d.y + (i * 25) ); });
                    }
                  */


                var link = viz.selectAll('path.link')
                    .data(links, function(d) {
                        return d.target.id;
                    });

                link.enter().insert('path', 'g')
                    .attr('class', 'link')
                    .attr('d', diagonal);


            } else if (target.hasClass('estructura-sgrl')) {

                var wwidth = $(window).width();
                var wheight = $(window).height();
                var width, height;

                if (wwidth > wheight) {
                    width = wwidth;
                    height = wheight
                } else {
                    width = wwidth;
                    height = wwidth;
                }


                //var width = target.width();
                //var width = parseInt(d3.select("#struct-cont").style("width"));
                var width = width - margin.left - margin.right;
                var wsc_factor = width / 1080;
                var gratio = 0.6;

                var padh = height - margin.top - margin.bottom;
                height = height + margin.top + margin.bottom;

                var fontsize = height * 0.020;
                $('#pie-container').empty();

                var proc = [{
                    'content': 'Procedimiento para la gestión del peligro biomecánico',
                    'label': 'Peligro Biomecánico'
                }, {
                    'content': 'Procedimiento para la gestión del peligro biológico',
                    'label': 'Peligro Biológico'
                }, {
                    'content': 'Procedimiento para la gestión del riesgo radiológico',
                    'label': 'Riesgo Radiológico'
                }, {
                    'content': 'Procedimiento para la gestión del peligro químico',
                    'label': 'Peligro Químico'
                }, {
                    'content': 'Procedimiento para la gestión del peligro psicosocial',
                    'label': 'Peligro psicosocial'
                }, {
                    'content': 'Procedimiento para la prevención de enfermedad cardiovascular desde el ambito laboral',
                    'label': 'Enfermedad Cardiovascular'
                }, {
                    'content': 'Procedimiento de reintegro laboral y reubicación laboral',
                    'label': 'Reintegro y reubicación'
                }, {
                    'content': 'Procedimiento para la investigación de enfermedad laboral',
                    'label': 'Enfermedad laboral'
                }, {
                    'content': 'Procedimiento para la investigación de accidentes e incidentes de trabajo',
                    'label': 'Accidentes de trabajo'
                }, {
                    'content': 'Procedimiento para la identificación de peligros valoración de riesgos y determinación de controles',
                    'label': 'Otros'
                }, {
                    'content': 'Procedimiento para la gestión de elementos de protección personal',
                    'label': 'Protección personal'
                }, {
                    'content': 'Procedimiento para la atención de emergencias y contingencias',
                    'label': 'Emergencias y contingencias'
                }, {
                    'content': 'Procedimiento del soporte técnico para el diseño, construcción y mantenimiento de la infraestructura.',
                    'label': 'Infraestructura'
                }];

                var diameter = padh;

                //var str_startcolor = {'hex': '#FF1C00', 'rgb': '255,28,0'};
                var start_color = d3.rgb(255, 28, 0);

                var colors = [];

                proc.forEach(function(d, i) {
                    console.log(d);
                    d.value = 10;
                    d.color = start_color.darker(i * 0.3).toString();
                    //colors.push(start_color.darker(i*0.3).toString());
                    //d.index = i;
                });

                console.log('colors: ' + colors);

                var addLayers = function(pie) {
                    console.log(pie);

                    var tag_sep = 3000 / pie.outerRadius;

                    var rightmargin = pie.outerRadius + (width / 5);
                    var innerad = pie.outerRadius + 20;
                    var middlerad = pie.outerRadius + 40;
                    var outerad = pie.outerRadius + 60;

                    var deg2rad = d3.scale.linear()
                        .domain([0, 360])
                        .range([0, 2 * Math.PI]);

                    var innerang = 300;
                    var middleang = 300 + tag_sep * 1.5;
                    var outerang = 300 + tag_sep * 2.5;

                    var points = [{
                        'x': innerad * Math.cos(deg2rad(innerang)),
                        'y': innerad * Math.sin(deg2rad(innerang)),
                        'w': rightmargin - (innerad * Math.cos(deg2rad(innerang)))
                    }, {
                        'x': middlerad * Math.cos(deg2rad(middleang)),
                        'y': middlerad * Math.sin(deg2rad(middleang)),
                        'w': rightmargin - (middlerad * Math.cos(deg2rad(middleang)))
                    }, {
                        'x': outerad * Math.cos(deg2rad(outerang)),
                        'y': outerad * Math.sin(deg2rad(outerang)),
                        'w': rightmargin - (outerad * Math.cos(deg2rad(outerang)))
                    }];


                    //INNER
                    var innerLayer = d3.select(pie.svg[0][0])
                        .insert('g', '.p0_pieChart')
                        .attr('class', 'innerlayer')
                        .attr('transform', 'translate(' + pie.pieCenter.x + ',' + pie.pieCenter.y + ')');


                    var innerc = innerLayer.append('circle')
                        .attr('r', innerad)
                        .attr('class', 'inner-c');

                    var innertag = innerLayer.insert('rect', '.inner-c')
                        .attr('class', 'innertag')
                        .attr('x', points[0].x)
                        .attr('y', points[0].y)
                        .attr('height', '2em')
                        .attr('width', 0)
                        .transition()
                        .duration(500)
                        .attr('width', points[0].w);

                    var innertext = d3.select('.innerlayer').append('text')
                        .attr('text-anchor', 'end')
                        .attr('dx', '-1em')
                        .attr('dy', '1.1em')
                        .attr('x', points[0].x + points[0].w)
                        .attr('y', points[0].y)
                        .attr('class', 'inner-text')
                        .text('IDENTIFICACIO´N DE PELIGROS');




                    //MIDDLE
                    var middleLayer = d3.select(pie.svg[0][0])
                        .insert('g', '.innerlayer')
                        .attr('class', 'middlelayer')
                        .attr('transform', 'translate(' + pie.pieCenter.x + ',' + pie.pieCenter.y + ')')


                    var middlec = middleLayer.append('circle')
                        .attr('r', middlerad)
                        .attr('class', 'middle-c');

                    var middletag = middleLayer.insert('rect', '.middle-c')
                        .attr('class', 'middletag')
                        .attr('x', points[1].x)
                        .attr('y', points[1].y)
                        .attr('height', '2em')
                        .attr('width', 0)
                        .transition()
                        .delay(500)
                        .duration(500)
                        .attr('width', points[1].w);

                    var middletext = d3.select('.middlelayer').append('text')
                        .attr('dx', '-1em')
                        .attr('dy', '1.1em')
                        .attr('text-anchor', 'end')
                        .attr('x', points[1].x + points[1].w)
                        .attr('y', points[1].y)
                        .attr('class', 'middle-text')
                        .text('CONDICIONES DE SALUD');


                    //OUTER
                    var outerLayer = d3.select(pie.svg[0][0])
                        .insert('g', '.middlelayer')
                        .attr('class', 'outerlayer')
                        .attr('transform', 'translate(' + pie.pieCenter.x + ',' + pie.pieCenter.y + ')')


                    var outerc = outerLayer.append('circle')
                        .attr('r', outerad)
                        .attr('class', 'outer-c');

                    var outertag = outerLayer.insert('rect', '.outer-c')
                        .attr('class', 'outertag')
                        .attr('x', points[2].x)
                        .attr('y', points[2].y)
                        .attr('height', '2em')
                        .attr('width', 0)
                        .transition()
                        .delay(1000)
                        .duration(500)
                        .attr('width', points[2].w);

                    var outertext = d3.select('.middlelayer').append('text')
                        .attr('text-anchor', 'end')
                        .attr('dx', '-1em')
                        .attr('dy', '1.1em')
                        .attr('x', points[2].x + points[2].w)
                        .attr('y', points[2].y)
                        .attr('class', 'outer-text')
                        .text('CONDICIONES DE TRABAJO');

                }

                var modPie = function(pie) {
                    console.log(pie);

                    var innerc = d3.select(pie.svg[0][0])
                        .append('g')
                        .attr('transform', 'translate(' + pie.pieCenter.x + ',' + pie.pieCenter.y + ')')
                        .append('circle')
                        .attr('r', pie.outerRadius + 30)
                        .attr('class', 'inner-c');


                }

                var pie = new d3pie("pie-container", {
                    "header": {
                        "title": {
                            "text": "PROCEDIMIENTOS PARA LA GESTION",
                            "fontSize": 24,
                            "color": "#0F3942",
                            "font": "aleo-bold",
                            "location": "pie-center"
                        },
                        "subtitle": {
                            "color": "#999999",
                            "fontSize": 12,
                            "font": "open sans"
                        },
                        "location": "pie-center",
                        "titleSubtitlePadding": 10
                    },
                    "footer": {
                        "color": "#999999",
                        "fontSize": 10,
                        "font": "open sans",
                        "location": "bottom-left"
                    },
                    "size": {
                        "canvasWidth": width,
                        "canvasHeight": height,
                        "pieInnerRadius": "49%",
                        "pieOuterRadius": "85%"
                    },
                    "data": {
                        "content": proc
                    },
                    "labels": {
                        "outer": {
                            "format": "none",
                            "pieDistance": 15
                        },
                        "inner": {
                            "format": "label"
                        },
                        "mainLabel": {
                            "fontSize": fontsize,
                            "color": "#fff",
                            "font": "aleo-reg"
                        },
                        "percentage": {
                            "color": "#ffffff",
                            "decimalPlaces": 0
                        },
                        "value": {
                            "color": "#adadad",
                            "fontSize": 11
                        },
                        "lines": {
                            "enabled": true,
                            "style": "straight"
                        }
                    },
                    "tooltips": {
                        "enabled": true,
                        "type": "placeholder",
                        "string": "{label}",
                        "styles": {
                            "fontSize": 24
                        }
                    },
                    "effects": {
                        "pullOutSegmentOnClick": {
                            "effect": "elastic",
                            "speed": 400,
                            "size": 15
                        }
                    },
                    "misc": {
                        "canvasPadding": {
                            top: 20,
                            right: 100,
                            bottom: 20,
                            left: 20
                        },

                        "gradient": {
                            "enabled": true,
                            "percentage": 95,
                            "color": "#FF1C00"
                        }
                    },
                    "callbacks": {
                        "onload": addLayers
                    }
                });




            } else if (target.hasClass('medidas-prevencion-control')) {



                var medidasitems = [{
                        'link': 'Eliminación del peligro/riesgo',
                        'texto': 'Medida que se toma para suprimir (hacer desaparecer) el peligro/riesgo',
                        'img': 'images/01_eliminacion.png'
                    },

                    {
                        'link': 'Sustitucón',
                        'texto': 'Medida que se toma con el fin de remplazar un peligro por otro que no genere riesgo o que genere menos riesgo.',
                        'img': 'images/02_sustitucion.png'
                    }, {
                        'link': 'Controles de Ingeniería',
                        'texto': 'Medidas técnicas para el control del peligro/riesgo en su origen (fuente) o en el medio.',
                        'img':'images/03_controles_ingenieria.png'
                    }, {
                        'link': 'Controles Administrativos',
                        'texto': 'Medidas que tienen como fin reducir el tiempo de exposición al peligro, tales como la rotación de personal, cambios en la duración o tipo de jornada de trabajo. Incluyen tambien la señalización, advertencia, demarcación de zonas de riesgo, implementación de sistemas de alarma, diseño e implementación de procedimientos y trabajo seguro, controles de acceso a áreas de riesgo, permisos de trabajo, entre otros.',
                        'img':'images/04_controles_administrativos.png'
                    }, {
                        'link': 'Equipos y Elementos de protección personal y colectivo (EPP)',
                        'texto': 'Medidas basadas en el uso de dispositivos, accesorios y vestimentas por parte de los trabajadores, con el fin de protegerlos contra posibles daños a su salud o su integridad física derivados de la exposición a los peligros en el lugar de trabajo.',
                        'img': 'images/05_equipos.png'
                    }
                ];
           

                var wwidth = $(window).width();
                var wheight = $(window).height();
                var width, height;
                if (wwidth > wheight) {
                    width = (wwidth / 12) * 8;
                    height = wheight;
                } else {
                    width = wwidth;
                    height = wwidth;
                }
                var unit = width / 12
                    //var width = target.width();
                    //var width = parseInt(d3.select(".gr-cont").style("width"));
                    //var wsc_factor = width/1080;
                console.log(width);
                var gratio = 1;
                //var height = width * gratio - margin.top * 2;
                var padh = height - margin.top * 2;
                //height = height + margin.top + margin.bottom;

                var s = Snap('#medidas-viz').attr({
                    width: width,
                    height: height,
                });

                s.clear();

                var dial_scfactor = 0.75;
                var new_scale = dial_scfactor * width;
                var new_factor = new_scale / width;
                var dx, dy, dw, dh;
                var dialr = 0,
                  dialcx = 0,
                  dialcy = 0;


                // BEGIN -- EXT SVG TEST
                
                var menu = s.g();
                var menusize = 0;
                var img;
                //var dial = s.g();
                //var lab = s.image('data:image/png;base64,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',-(unit*2), (height/4) - 10, unit*4, unit*4);

                var dialfile = Snap.load('images/dial.svg', function(draw) {
                  img = s.image('images/circ-lab.png', 0, 0, unit*4, unit*4);

                  s.add(draw);
                  var dcenter = s.select('#dialc');
                  var dtip = s.select('#dial-tip');
                  var dial = s.select('#dial');
                  dialr = dcenter.getBBox().w/2;
                  dialcx = dcenter.getBBox().cx;
                  dialcy = dcenter.getBBox().cy;
                  dw = dcenter.getBBox().w;
                  dh = dcenter.getBBox().h;
                  if(width < dw){
                    console.log('small dial');
                    console.log(dial);
                    dial.transform('scale(0.5)');
                  }
                  console.log('dialcx: ' + dialcx);
                 medidasitems.forEach(function(item, index) {
                      var angle = (index * 20) - 45;
                      var rangle = (index * 10) - 30;
                      //var x = Math.cos(Snap.rad(angle)) * dialr;
                      //var y = Math.sin(Snap.rad(angle)) * dialr;

                      var x = dialr ;
                      var y = index * 40;
                      menusize += 40;

                      var label = s.rect(x - unit, y - unit/4, unit * 4, unit/4 )
                        .attr('class', 'dmenu-label')
                        .attr('id', 'label-' + index)
                          .mouseup(function() {
                            console.log('id: ' + this.attr('id'));
                            loadTxt(this.attr('id'));
                            loadImage( img, this.attr('id'), (dcenter.getBBox().cx - (unit * 1.9) ), (dcenter.getBBox().cy - (unit*1.9)), unit*3.8, unit*3.8 );
                            img.transform('t' + (dcenter.getBBox().cx - (unit * 2) ) + ',' + (dcenter.getBBox().cy - (unit * 2)));
                            console.log('angle: ' + rangle);
                            dtip.animate({
                              transform: 'R' + rangle + ',' + dialcx + ',' + (dialcy + unit * .40)
                            }, 500, mina.easein);
                          });

                      var t = s.text(x, y, item.link)
                          .attr('id', 'title-' + index)
                          .attr('class', 'dmenu-item');

                      menu.add(label);
                      menu.add(t);
                    

                  });
                  menu.transform('T' + dialcx  + ',' + ( dialcy - (menusize/2)));
                  img.transform('t' + (dcenter.getBBox().cx - (unit * 2) ) + ',' + (dcenter.getBBox().cy - (unit * 2)));
                }, this);


                //var lab = s.image(img ,-(unit*2), (height/4) - 10, unit*4, unit*4);
                //s.add(lab);

                //console.log("widht" + width);
                //var dial_scfactor = dial.getBBox().width/1080;

                //console.log('scale ' + new_factor);


                //pont to debug positioning
                /*
                var guide = s.g();
                var point = s.circle(dy, dy, 10)
                    .attr('fill', '#000');
                guide.add(point);
                */

                //dial.transform('r70,' + 0 + ',' +padh/2);

                var loadTxt = function(id) {
                    var index = id.substr(-1);
                    console.log('click index: ' + medidasitems[index].texto);
                    var txt = medidasitems[index].texto;

                    $('#medidas-txt').empty();
                    
                    $('#medidas-txt').append('<li>' + txt + '</li>');
          
                }

                var loadImage = function(img, id, x, y, w, h){
                    var index = id.substr(-1);
                    //console.log('click index: ' + menuitems[index].texto);
                    img = s.image(medidasitems[index].img, x, y, w, h);
                    //img.transform('t' + x - (unit * 2) + ',' + y - (unit * 2));
                }


                //END -- EXT SVG TEST



            }

        });
    });
