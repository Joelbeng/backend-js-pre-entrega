const API_url= "https://fakestoreapi.com"

const input_args = process.argv.slice(2)
const input_method = input_args[0].toUpperCase();

const valid_args = ["GET", "POST", "PUT", "DELETE"]

const main = async (method, args) => {
    
    if (!valid_args.includes(method)) {
        console.log("Por favor, ingrese un comando válido");
        return;
    } 

     switch(method) {
        case "GET":            
            var input_value = args[1];
            if (!input_value.includes("products/")) {
                try{
                    const response = await fetch(`${API_url}/products`, {
                        method: "GET"
                    })
                    if (response.status !== 200){
                        throw new Error("Falla en la solicitud")
                        break
                    }
                    const data = await response.json()
                    data.forEach(element => {
                        console.log(element)
                    });
                }
                catch(error) {
                    console.log(error)
                    break
                }
                break;
            } else if (input_value.includes("products/")){
                try {
                    const id = parseInt(input_value.split("/")[1])
                    if (id < 0 || id > 20) {
                        console.log("ingrese un número de producto del 0 al 20")
                        break
                    }
                    const reponse = await fetch(`${API_url}/products/${id}`,{
                        method: "GET"
                    })
                    if (reponse.status != 200){
                        throw new Error ("Error en la solicitud")
                        break;
                    }
                    const data = await reponse.json()
                    console.log(data)
                    
                } catch(error){
                    console.log(error)
                    break;
                }
                break;
            }
        case "POST":
            if(args.length == 5 && args[1] == "products"){
                const [ , , nombre, precio, categoria] = args
                const response = await fetch(`${API_url}/products`,{
                    method : "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            nombre, 
                            precio,
                            categoria
                        }
                    )
                })
                if(!response.ok){
                    throw new Error("Error en la solicitud")
                }
                const data = await response.json()
                console.log(data)
                break
            }else {
                console.log("Faltan argumentar para poder realizar la solicitud POST")
                break
            }   
        case "DELETE":

            input_value = args[1];
            if (input_value.includes("products/")){
                const id = parseInt(input_value.split("/")[1])
                try{
                    const reponse = await fetch(`${API_url}/products/${id}`,{
                        method: "DELETE"
                    })
                    if (!reponse.ok){
                        throw new Error ("Error en la solicitud")
                        break;
                    }
                    const data = await reponse.json()
                    console.log(`el siguiente producto con ID "${id}" fue eliminado`)
                    console.log(data)
                    break;
                }catch(error){
                    console.log(error)
                    break;
                }
            }else{
                console.log("Solicitud incorrecta")
            }  
    }
}

main(input_method, input_args);
