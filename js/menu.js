const MENU = [

    {
        categoria: "Para compartir",
    
        platos: [
            {
                nombre: "Jamón D.O. Guijuelo",
                descripcion: "",
                precio: "29,95 €"
            },
            {
                nombre: "Burrata D.O. Puglia",
                descripcion: "Zanahoria asada con miel, tomates de huerta semisecos, pistachos",
                precio: "24,95 €"
            },
            {
                nombre: "Tacos de pescado",
                descripcion: "Pico de gallo, aguacate, jalapeño rojo, lima, cilantro y queso feta.",
                precio: "24,00 €"
            },
            {
                nombre: "Langostinos con especias dukkah",
                descripcion: "Relish de menta y yogur.",
                precio: "26,95 €"
            },
            {
                nombre: "Mezze mediterránea",
                descripcion: "Muhamara de zanahoria, queso feta al horno, dalh de lentejas, sardinas braseadas, olivas especiadas y pan naan.",
                precio: "26,95 €"
            }
        ]
    },
    
    {
        categoria:"Entrantes",
    
        platos:[
            {
                nombre:"Sopa de temporada",
                descripcion:"",
                precio:"16,00 €"
            },
            {
                nombre:"Ensalada de sandía",
                descripcion:"Tomate, menta, ricotta salata, cebolla roja y vinagreta de sumac.",
                precio:"18,50 €"
            },
            {
                nombre:"Ensalada de lentejas de Puy",
                descripcion:"Calabaza asada, granada, piñones, rúcula, vinagreta y queso feta.",
                precio:"18,50 €"
            },
            {
                nombre:"Ceviche de corvina",
                descripcion:"Chile rocoto, cebolla, almendra laminada, leche de tigre y chips de banana.",
                precio:"23,95 €"
            },
            {
                nombre:"Koftas de alcachofas",
                descripcion:"Crema de zanahoria y cardamomo, chips de zanahoria y kale.",
                precio:"16,95 €"
            },
            {
                nombre:"Arroz cremoso de langostinos",
                descripcion:"",
                precio:"26,50 €"
            },
            {
                nombre:"Vieiras frescas",
                descripcion:"Plancha con salsa vierge, ralladura de lima, tomate y chile.",
                precio:"27,50 €"
            },
            {
                nombre:"Pata de pulpo a la brasa",
                descripcion:"Papas arrugadas y mojo verde.",
                precio:"26,80 €"
            },
            {
                nombre:"Verduras al horno",
                descripcion:"Con pasta tahini y za'atar.",
                precio:"18,50 €"
            }
        ]
    },
    
    {
        categoria:"Currys y Pasta",
    
        platos:[
            {
                nombre:"Curry Massaman de ternera",
                descripcion:"Patatas confitadas y arroz jazmín.",
                precio:"25,00 €"
            },
            {
                nombre:"Curry rojo vegano",
                descripcion:"Lentejas, verduras y arroz jazmín.",
                precio:"24,80 €"
            },
            {
                nombre:"Pasta fresca Delizia al limone",
                descripcion:"Mantequilla de salvia.",
                precio:"24,95 €"
            }
        ]
    },
    
    {
        categoria:"Pescados",
    
        platos:[
            {
                nombre:"Brocheta de salmón",
                descripcion:"Lima, cilantro, chili y arroz jazmín.",
                precio:"28,95 €"
            },
            {
                nombre:"Pescado del día",
                descripcion:"Hierbas mediterráneas, tomate, ajo, cebolla tierna y cremoso de patata. Mínimo dos personas.",
                precio:"68,00 €"
            },
            {
                nombre:"Sashimi de atún Balfegó",
                descripcion:"Putanesca y confitura de hinojo fresco.",
                precio:"31,95 €"
            },
            {
                nombre:"Suprema de bacalao",
                descripcion:"Tomates confitados, azafrán y tomillo.",
                precio:"30,00 €"
            }
        ]
    },
    
    {
        categoria:"Carnes",
    
        platos:[
            {
                nombre:"Filete de Angus con foie",
                descripcion:"Tagliata, rosti de patata y jugo de carne.",
                precio:"36,00 €"
            },
            {
                nombre:"Pechuga de pollo a baja temperatura",
                descripcion:"Judías salteadas en chermoula, pan crujiente y mayonesa cítrica.",
                precio:"27,50 €"
            },
            {
                nombre:"Tagliata de ternera blanca",
                descripcion:"Habas frescas, tomates semisecos, hierbas y labneh.",
                precio:"30,50 €"
            },
            {
                nombre:"Rack de cordero Agnei de Aragón",
                descripcion:"Costra de mostaza y aceituna negra con cremoso de patata.",
                precio:"34,00 €"
            }
        ]
    },
    
    {
        categoria:"Guarniciones",
    
        platos:[
            {nombre:"Pan de coca con tomate",descripcion:"",precio:"6,50 €"},
            {nombre:"Ensalada de hojas verdes",descripcion:"Con vinagreta.",precio:"8,95 €"},
            {nombre:"Patatas horneadas",descripcion:"",precio:"8,50 €"},
            {nombre:"Verduras salteadas",descripcion:"",precio:"9,50 €"},
            {nombre:"Pan rústico",descripcion:"Servido con aceite Alzina.",precio:"2,50 €"},
            {nombre:"Pan sin gluten",descripcion:"Servido con aceite Alzina.",precio:"3,25 €"},
            {nombre:"Botella Aceite Alzina 500 ml",descripcion:"Arbequina · Canyelles.",precio:"11,50 €"}
        ]
    },
    
    {
        categoria:"Postres",
    
        platos:[
            {nombre:"Pastel de chocolate Valrhona",descripcion:"Mousse de mascarpone y frutos rojos.",precio:"9,00 €"},
            {nombre:"Xuixo",descripcion:"Pastelería catalana con mousse de chocolate.",precio:"9,00 €"},
            {nombre:"Panna cotta de mango",descripcion:"Maracuyá y frutos rojos.",precio:"9,00 €"},
            {nombre:"Fruta al horno",descripcion:"Con crema helada de requesón.",precio:"9,50 €"},
            {nombre:"Tiramisú",descripcion:"Receta de Mario Dadda.",precio:"9,50 €"},
            {nombre:"Helados y sorbetes",descripcion:"Artesanales.",precio:"8,80 €"},
            {nombre:"Sgroppino",descripcion:"Sorbete de limón, cava y vodka.",precio:"9,50 €"},
            {nombre:"Affogato",descripcion:"Vainilla con café, Amaretto o Baileys.",precio:"10,70 €"},
            {nombre:"Catanias y carquiñolis",descripcion:"Dulces catalanes.",precio:"9,00 €"},
            {nombre:"Mini Retorta de Finca Pascualete",descripcion:"Queso de oveja.",precio:"13,00 €"}
        ]
    }
    
    ];