export function checkToken() {
    const token = sessionStorage.getItem("token");
    if (token) {
        return true; // Token exists
    }
    return false; // Token does not exist
}