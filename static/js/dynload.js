function loadHTML(elementId, file) {
    fetch(file)
        .then(r => r.text())
        .then(d => document.getElementById(elementId).innerHTML = d);
}

document.addEventListener("DOMContentLoaded", () => {
    // Find all elements with a data-include attribute
    const includeTargets = document.querySelectorAll("[dynload-replace]");

    includeTargets.forEach(el => {
        const file = el.getAttribute("dynload-replace");
        if (!file) return;

        fetch(file)
            .then(response => {
                if (!response.ok) 
                    throw new Error(`Failed to load ${file}`);
                console.log(`Failed to load ${file}`)
                return response.text();
            })
            .then(data => {
                el.innerHTML = data;
            })
            .catch(err => {
                console.error(err);
                el.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
            });
    });
});