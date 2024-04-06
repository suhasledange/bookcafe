export default function formatDate(dateString) {

    const dateObject = new Date(dateString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    return formattedDate;
}