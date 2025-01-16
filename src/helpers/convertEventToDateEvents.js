// import { parseISO } from "date-fns"


// export const convertEventToDateEvents = ( events = [] ) => {

//     return events.map(event => {
//         event.end = parseISO(event.end); // Modifica directamente el objeto original
//         event.start = parseISO(event.start); // Modifica directamente el objeto original
//         return event; // Retorna el objeto modificado
//     });
// }



import { parseISO } from "date-fns"


export const convertEventToDateEvents = ( events = [] ) => {

    return events.map(event => {
        return {
            ...event, // Copia todas las propiedades del objeto original
            end: parseISO(event.end), // Sobrescribe `end` con un objeto Date
            start: parseISO(event.start), // Sobrescribe `start` con un objeto Date
        };
    });
}