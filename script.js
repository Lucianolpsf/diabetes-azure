document.getElementById('dataForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const apiKey = document.getElementById('apikey').value;
    const url = document.getElementById('endpoint').value;

    const pregnancies = document.getElementById('pregnancies').value;
    const glucose = document.getElementById('glucose').value;
    const bloodPressure = document.getElementById('bloodPressure').value;
    const insulin = document.getElementById('insulin').value;
    const bmi = document.getElementById('bmi').value;
    const diabetesPedigree = document.getElementById('diabetesPedigree').value;
    const skinThickness = document.getElementById('skinThickness').value;
    const age = document.getElementById('age').value;

    const requestBody = JSON.stringify({
        input_data: {
            columns: [
                "Pregnancies",
                "Glucose",
                "BloodPressure",
                "SkinThickness",
                "Insulin",
                "BMI",
                "DiabetesPedigreeFunction",
                "Age"
            ],
            index: [0],
            data: [[
                pregnancies,
                glucose,
                bloodPressure,
                skinThickness,
                insulin,
                bmi,
                diabetesPedigree,
                age
            ]]
        }
    });

    const requestHeaders = new Headers({"Content-Type": "application/json"});
    requestHeaders.append("Authorization", "Bearer " + apiKey);
    // requestHeaders.append("azureml-model-deployment", "dreamyinsectsn80-1");

    try {
        fetch(url, {
            method: "POST",
            body: requestBody,
            headers: requestHeaders
        }).then((response) => {

        if (response.ok) {
            const json = response.json();
            document.getElementById('response').innerText = JSON.stringify(json, null, 2);
        } else {
            console.debug(...response.headers);
            console.debug(response.body)
            throw new Error("Requisição falhou: " + response.status);
        }})
        .then((json) => console.log(json))
        .catch((error) => {
            console.error(error)
        });
    } catch (error) {
        document.getElementById('response').innerText = 'Erro ao enviar dados: ' + error.message;
    }
});
