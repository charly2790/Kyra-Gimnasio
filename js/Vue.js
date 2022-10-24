
const Key = "b3f7d55767msh22eae565dbda9f9p12bc2djsn01616e918bfa"

const climaApp = Vue.createApp({
    data() {
        return {
            Clima_HTML: "",
        }
    },
    methods: {
        getClima() {
            
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': Key,
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            }
            try {
                //fetch("https://www.fakerestapi.com/datasets/api/v1/clean-recipes-dataset.json")
                fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=-34.61381066489454%2C%20-58.368821944160835', options)
                .then(response => response.json())
                .then(response => {
                    this.Clima_HTML +=
                    `<img src = "${response.current.condition.icon}">
                    <div>${response.current.temp_c}°</div>
                    <div>
                        <p>${response.current.condition.text}<br></p>
                        <p>Humedad: ${response.current.humidity}°<br></p>
                        <p>${response.location.name}</p>
                    </div>
                    `
                })
            }
            catch(exception_error){
                this.Clima_HTML += "Error<br>"
                this.Clima_HTML += exception_error
            }

            finally{
                this.Clima_HTML = this.Clima_HTML
            }
        },
    },
    mounted(){
        this.getClima()
    }
}).mount("#appClima")

const recetasApp = Vue.createApp({
    data() {
        return {
            Recetas_HTML: ""
        }
    },
    methods: {
        async getRecetas() {
            
            let indexInicial = Math.trunc(Math.random()*95);
            let indexFinal = indexInicial + 5

            const options = {
                method: 'GET',
                url: 'https://edamam-recipe-search.p.rapidapi.com/search?q=chicken&diet=high-protein&diet=low-carb&cuisineType=South%20American&from='+indexInicial+'&to='+indexFinal,
                headers: {
                    'X-RapidAPI-Key': Key,
                    'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
                }
            }

            try {
                const response = await axios(options)
                    
                for(resp of response.data.hits)
                {
                    this.Recetas_HTML +=
                    `<div>
                        <p><a href="${resp.recipe.shareAs}">${resp.recipe.label}</a></p>
                        <img src="${resp.recipe.image}" alt="Foto de receta de ${resp.recipe.label}">
                     </div>
                    `
                }
            }
            catch(exception_error){
                this.Recetas_HTML += "Error<br>"
                this.Recetas_HTML += exception_error
            }

            finally{
                this.Recetas_HTML = this.Recetas_HTML
            }
        }
    },
    mounted(){
        this.getRecetas()
    }
}).mount("#appRecetas")

const formValidation = Vue.createApp({

    data() {
        return {
            nombre: "",
            apellido: "",
            email:"",
            tel:"",
            consulta:"",
            estadoApellido:"default",
            estadoNombre:"default",
            estadoEmail:"default",
            estadoTel:"default",
            estadoConsulta:"default",              
        }
    },
    watch:{
        apellido(valor){                    
            if (this.apellido.length == 0){
                this.estadoApellido = "default"
            } else if (this.apellido.length > 3){
                this.estadoApellido = "correct"
            } else{
                this.estadoApellido = "error"
            }
        },
        nombre(valor){
            if (this.nombre.length == 0){
                this.estadoNombre = "default"
            } else if (this.nombre.length > 3){
                this.estadoNombre = "correct"
            } else{
                this.estadoNombre = "error"
            }
        },
        email(valor){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var rdo = re.test(this.email)
            if (this.email.length == 0){
                this.estadoEmail = "default"
            } else if (rdo){
                this.estadoEmail = "correct"
            } else{
                this.estadoEmail = "error"
            }
        },
        tel(valor){
            var re = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
            var rdo = re.test(this.tel)
            if (this.tel.length == 0){
                this.estadoTel = "default"
            } else if (rdo){
                this.estadoTel = "correct"
            } else{
                this.estadoTel = "error"
            }
        },
        consulta(valor){
            if (this.consulta.length == 0){
                this.estadoConsulta = "default"
            } else if (this.consulta.length > 11){
                this.estadoConsulta = "correct"
            } else{
                this.estadoConsulta = "error"
            }
        }
    },                   
    computed: {                   
        validarCampos: function(){
            val = true;
            
            if (this.estadoApellido == "correct" && this.estadoNombre == "correct" && this.estadoTel == "correct" && this.estadoEmail == "correct" && this.estadoConsulta == "correct"){
                val = false;
            }

            return val;
        }
    },

}).mount("#formValidations")