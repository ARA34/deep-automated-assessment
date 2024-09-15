window.buttonHandler = async function() {
    init();
    document.getElementById("wait_time").innerHTML = "Loading...";
    // IS_LOADING = true;
    let requestedURL = document.getElementById("inches_input").value;
    let itemID = parseInt(requestedURL.match(/\d+/));
    await crawlOrFetch(itemID);
}

async function crawlOrFetch(itemID) {
    return fetchProject(itemID);
}

async function fetchProject(projectID) {
    console.log("fetching project data");
    const metadataReponse = await fetch(`https://trampoline.turbowarp.org/api/projects/${projectID}`);
    if (metadataReponse.status === 404) {
        throw new Error("The project is unshared or does no exist");
    }
    if (!metadataReponse.ok) {
        throw new Error(`HTTP error ${metadataResponse.status} fetching project metadata`);
    }
    const metadata = await metadataReponse.json();
    console.log(metadata)
}

function init() {
    document.getElementById("process_button").blur();
    clearReport();
    noError();


    reports_list = [];
    project_count = 0;
    crawl_finsihed = false;
}

function clearReport() {
    let removables = document.getElementsByClassName("dynamic");
    while (removables[0]) {
        removables[0].remove();
    }
    removables = document.getElementsByClassName("lines");
    while (removables[0]) {
        removables[0].remove();
    }
}

function noError() {
    document.getElementById("process_error").innerHTML = "";
    document.getElementById("process_error").style.visibility = "hidden";
}


// const spawner = require("child_process").spawn;

// const data_to_pass_in = ["poop"];
// console.log("Data sent to python script:", data_to_pass_in);
// const python_process = spawner("python3", ["test.py", JSON.stringify(data_to_pass_in)]);
// python_process.stdout.on("data", (data) => {
//     console.log("Data received from python script: ", JSON.parse(data.toString()));
// });
