// utils.js

export const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const timeParts = timeString.split("T")[1].split("+")[0].split(":");
    return `${timeParts[0].padStart(2, "0")}:${timeParts[1].padStart(2, "0")}`; // HH:mm format
  };
  
  export const formatDepartureTime = (departureTime) => {
    if (!departureTime) return "N/A";
    const timeParts = departureTime.split(":");
    return `${timeParts[0].padStart(2, "0")}:${timeParts[1].padStart(2, "0")}`; // HH:mm format
  };
  
  export const calculateDuration = (departureTime, arrivalTime) => {
    if (!departureTime || !arrivalTime) return "N/A";
  
    const departureDate = new Date(`1970-01-01T${departureTime}`);
    const arrivalDate = new Date(`1970-01-01T${arrivalTime}`);
  
    if (isNaN(departureDate) || isNaN(arrivalDate)) return "N/A";
  
    const duration = arrivalDate - departureDate;
  
    if (duration < 0) return "N/A";
  
    const hours = Math.floor((duration % 86400000) / 3600000);
    const minutes = Math.round(((duration % 86400000) % 3600000) / 60000);
  
    return `${hours}h ${minutes}m`;
  };
  