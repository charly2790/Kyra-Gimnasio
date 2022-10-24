
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
                    `<div><a href="${resp.recipe.shareAs}" target="_blank">
                        <div class="index-recetas-tarjeta">
                            <p>${resp.recipe.label}</p>
                        </div>
                        <img src="${resp.recipe.image}" alt="Foto de receta de ${resp.recipe.label}">
                        </a></div>
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