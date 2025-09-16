export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits
    return `${day}/${month}/${year}`;
};

export const formatDate1 = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    // const year = date.getFullYear();

    return `${day} ${month}`;

    // return `${day} ${month} ${year}`;
};
