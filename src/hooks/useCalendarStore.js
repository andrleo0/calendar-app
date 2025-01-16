import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";
import { convertEventToDateEvents } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events , activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );
    
    
    const setActiveEvent = ( calendarEvent ) => {
         dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async( calendarEvent ) => {

        try {
            if( calendarEvent.id ){
                //Actualizar
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
                dispatch( onUpdateEvent({ ...calendarEvent , user }) );
                return;
            }
            //Creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id , user }) );
            
        } catch ( error ) {

            Swal.fire('Error al guardar',error.response.data?.msg, 'error');
        }

    }

    const starDeletingEvent = async() => {
        //TODO: llegar al backend

        try {
            await calendarApi.delete(`/events/${ activeEvent.id }`);
            dispatch( onDeleteEvent() );
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar',error.response.data?.msg, 'error');
        }
    }

    const startLoadingEvents = async() => {
        try {

            const { data } = await calendarApi.get('/events');
            const eventos = convertEventToDateEvents( data.eventos );
            dispatch( onLoadEvents( eventos ) );

        } catch (error) {
            console.log('error cargando evento');
            console.log(error);
        }
    
    }
    return{
        //*Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //*Metodos
        setActiveEvent,
        starDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
    }

}
