
export function showHideTableStats (e) {
    const element = document.getElementById(e);
    if (element.style.display === "none") {
        element.style.display = "block";
    }
    else {
        element.style.display = "none";
    }
}
