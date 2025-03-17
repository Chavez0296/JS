import axios from 'axios';

const BASE_URL = 'https://api.cdnjs.com/libraries/';
//https://api.cdnjs.com/libraries/react?fields=name,version,description



const parseArguments = async () => {
    try{
    const hold = process.argv.slice(2);
    
    if(hold.length < 2){
        throw new Error("Error: (Usage) node getLibrary <libraryName> '<[fields]>'");
    }

    const lib = hold[0];
    const desc = JSON.parse(hold[1]);

    const value = await getLibrary(lib,desc)
    console.log(value);
    
    } catch (error){
        console.error(error.message);
    }

};
const getLibrary = async(li , de) => {
    try{
        const buildUrl = `${BASE_URL}${li}?fields=${de}`
        const response = await axios.get(buildUrl);
        return response.data;
    } catch(error){
        throw new Error(error.message);
    }
};

parseArguments();

