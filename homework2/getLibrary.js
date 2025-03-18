import axios from 'axios';

const BASE_URL = 'https://api.cdnjs.com/libraries/';
//https://api.cdnjs.com/libraries/react?fields=name,version,description



const parseArguments = async () => {
    try{
    const hold = process.argv.slice(2); // cut off first two commands 'node getLibrary'
    
    if(hold.length < 2){
        throw new Error("Error: (Usage) node getLibrary <libraryName> '<[fields]>'"); // show CLI usage
    }

    const lib = hold[0]; //holds library 

    try {
        desc = JSON.parse(hold[1]); //holds fields
    } catch (error) {
        throw new Error("Fields argument must be a valid JSON array such as '[\"name\",\"version\"]'"); // error for a string input for error handling purposes
    }

    if(!Array.isArray(desc)){ 
        throw new Error("Fields arguments must be a valid array such as ex: '[\"name\",\"version\"]'") //if fields aren't in a valid array throw error
    }

    const value = await getLibrary(lib,desc)
    console.log(JSON.stringify(value,null,2)); //to print out formatted JSON output
    
    } catch (error){
        console.error(error.message);
    }

};
const getLibrary = async(li , de) => {
    try{
        const buildUrl = `${BASE_URL}${li}?fields=${de}`
        const response = await axios.get(buildUrl);
        
        let data = response.data;
        let warnings = [];
        let filtered = {};
       
        de.forEach(element => { //block will check which fields did not return null and add them to the filtered object
            if(data[element] !== null){
                filtered[element] = data[element];
            } else{ 
                warnings.push(element); // all null responses will be stored here
            }
        });

        if(warnings.length > 0){ //if there were null responses
            const fieldLabel = warnings.length === 1 ? "Field" : "Fields";
            filtered.warning = `${fieldLabel} '${warnings.join("', '")}' not found in the response.`; //print them on a single line of the warning.
        }

        return filtered;
    } catch(error){
        if(error.response && error.response.status === 404){
            return { error: `(404 error) ${li} not found.`}; // 404 error handling 
        }
        return {error: `An unexpected error has occurred: ${error.message}`};
    }
};

parseArguments();

