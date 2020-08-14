const html = document.querySelector("html");
const checkbox = document.querySelector("input[name=theme]");

const getStyle = (element, style) =>
    window
        .getComputedStyle(element)
        .getPropertyValue(style)

//light mode using color default of elements html 
const initialColors = {
    colorPrimary: getStyle(html, "--color-primary"),
    //bgPanel: getStyle(html, "--bg-panel"),
    //colorHeadings: getStyle(html, "--color-headings"),
    //colorText: getStyle(html, "--color-text"),
};

//dark mode
const darkMode = {
    colorPrimary: "#333333",
    //bgPanel: "#434343",
    //colorHeadings: "#3664FF",
    //colorText: "#B5B5B5",
};

//turning the key int the variable
const transformKey = key =>
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

//changecolors  using key, map for setting new key color
const changeColors = (colors) => {
    Object.keys(colors).map(key =>
        html.style.setProperty(transformKey(key),colors[key])
        )
};

//event change color with target
checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
});