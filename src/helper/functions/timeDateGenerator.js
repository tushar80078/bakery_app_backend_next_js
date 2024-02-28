
// ----------------------- Generate Current Time Date --------------------------------

const generateCurrentTiimeDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
    const day = String(currentDate.getDate()).padStart(2, '0'); // Ensure two digits for day
    const hours = String(currentDate.getHours()).padStart(2, '0'); // Ensure two digits for hours
    const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Ensure two digits for minutes
    const seconds = String(currentDate.getSeconds()).padStart(2, '0'); // Ensure two digits for seconds
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0'); // Ensure three digits for milliseconds

    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    return formattedDateTime;    
}

module.exports = {
    generateCurrentTiimeDate
}