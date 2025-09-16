// export const getGuestId = () => {
//     let guestId = localStorage.getItem('guest_id');

//     if (!guestId) {
//         // Generate a random 5-digit number between 10000 and 99999
//         const randomId = Math.floor(10000 + Math.random() * 90000);
//         guestId = `guest-${randomId}`;
//         localStorage.setItem('guest_id', guestId);
//     }

//     // Extract numeric part and convert to integer
//     const guestIntId = parseInt(guestId.split('-')[1], 10);

//     return {
//         full: guestId,
//         int: guestIntId,
//     };
// };

// export const clearGuestId = () => {
//     localStorage.removeItem('guest_id');
// };

export const getGuestId = async () => {
    let guestId = localStorage.getItem("guest_id");

    if (!guestId) {
        try {
            // Get public IP
            const res = await fetch("https://api.ipify.org?format=json");
            const data = await res.json();
            const ip = data?.ip || "unknown";

            guestId = ip; // keep IP as-is, like "192.168.0.1"
            localStorage.setItem("guest_id", guestId);
        } catch (err) {
            console.error("Failed to fetch IP:", err);

            // fallback random id
            const randomId = Math.floor(10000 + Math.random() * 90000);
            guestId = `${randomId}`;
            localStorage.setItem("guest_id", guestId);
        }
    }

    return {
        full: guestId, // example: "192.168.0.1"
        int: guestId
            .split(".")
            .map((part) => part.padStart(3, "0")) // ensure fixed width
            .join(""), // "192168001001" → numeric-like string
    };
};

export const clearGuestId = () => {
    localStorage.removeItem("guest_id");
};

