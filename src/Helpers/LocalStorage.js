
export const saveEvent = (formData) => {
    let currentEvents = getEvents();
    localStorage.setItem('events', JSON.stringify([...currentEvents, formData]));
}

export const getEvents = () => {
    if (!localStorage.getItem('events')) return [];

    return JSON.parse(localStorage.getItem('events'));
}