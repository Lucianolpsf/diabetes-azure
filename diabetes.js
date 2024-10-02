// Request data goes here
// The example below assumes JSON formatting which may be updated
// depending on the format your endpoint expects.
// More information can be found here:
// https://docs.microsoft.com/azure/machine-learning/how-to-deploy-advanced-entry-script
const requestBody = `{
  "input_data": {
    "columns": [
      "Pregnancies",
      "Glucose",
      "BloodPressure",
      "SkinThickness",
      "Insulin",
      "BMI",
      "DiabetesPedigreeFunction",
      "Age"
    ],
    "index": [],
    "data": [[6,148,72,35,0,33.6,0.627,50]]
  }
}`;

const requestHeaders = new Headers({"Content-Type" : "application/json"});

// Replace this with the primary/secondary key, AMLToken, or Microsoft Entra ID token for the endpoint
const apiKey = "1ewrFAV3ctDdC0X3WZwf26RVmLh3OGku";
if (!apiKey)
{
	throw new Error("A key should be provided to invoke the endpoint");
}
requestHeaders.append("Authorization", "Bearer o5RosQeKR5uggeaMjKfQhpOTJoiajmeF")

// This header will force the request to go to a specific deployment.
// Remove this line to have the request observe the endpoint traffic rules
// // requestHeaders.append("azureml-model-deployment", "dreamyinsectsn80-1");

const url = "https://azure-ml-myudo.eastus2.inference.ml.azure.com/score";

fetch(url, {
  method: "POST",
  body: requestBody,
  headers: requestHeaders
})
	.then((response) => {
	if (response.ok) {
		return response.json();
	} else {
		// Print the headers - they include the request ID and the timestamp, which are useful for debugging the failure
		console.debug(...response.headers);
		console.debug(response.body)
		throw new Error("Request failed with status code" + response.status);
	}
	})
	.then((json) => console.log(json))
	.catch((error) => {
		console.error(error)
	});