async function getDrugInfo(query) {
    const apiKey = "AIzaSyAPmNodIa0dbMoNSsns9jIDLhaQjOjiH_M";  
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: { text: query }
            })
        });

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0) {
            document.getElementById("output").innerText = data.candidates[0].output;
        } else {
            document.getElementById("output").innerText = "No response from AI.";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("output").innerText = "Error retrieving drug info.";
    }
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("search").addEventListener("click", function () {
        const query = document.getElementById("query").value;
        if (query.trim() !== "") {
            getDrugInfo(query);
        } else {
            document.getElementById("output").innerText = "Please enter a drug name.";
        }
    });
});


document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    
    const symptoms = document.getElementById('symptoms').value.toLowerCase();
    const location = document.getElementById('location').value;

    const diseaseMapping = {
        fever: ["Flu", "Common Cold", "COVID-19"],
        cough: ["Flu", "Common Cold", "Bronchitis"],
        headache: ["Migraine", "Tension Headache", "Sinusitis"],
        fatigue: ["Anemia", "Chronic Fatigue Syndrome", "Depression"],
        nausea: ["Food Poisoning", "Migraine", "Pregnancy"],
        sore_throat: ["Strep Throat", "Common Cold", "Tonsillitis"],
        shortness_of_breath: ["Asthma", "Pneumonia", "COVID-19"],
        chest_pain: ["Angina", "Heart Attack", "Acid Reflux"]
    };

    const medicineMapping = {
        fever: ["Paracetamol", "Ibuprofen"],
        cough: ["Dextromethorphan", "Codeine"],
        headache: ["Aspirin", "Ibuprofen"],
        fatigue: ["Iron Supplements", "Vitamin B12"],
        nausea: ["Ondansetron", "Metoclopramide"],
        sore_throat: ["Lozenges", "Ibuprofen"],
        shortness_of_breath: ["Albuterol", "Prednisone"],
        chest_pain: ["Nitroglycerin", "Aspirin"]
    };

    const precautionsMapping = {
        fever: ["Drink plenty of water.", "Rest well.", "Avoid junk food.", "Take prescribed medications.", "Consult a doctor if symptoms persist."],
        cough: ["Stay hydrated.", "Use a humidifier.", "Avoid cold drinks.", "Take prescribed medications.", "Consult a doctor if symptoms persist."],
        headache: ["Avoid bright lights.", "Drink herbal tea.", "Take prescribed medications.", "Rest well.", "Consult a doctor if symptoms persist."],
        fatigue: ["Eat a balanced diet.", "Exercise regularly.", "Sleep well.", "Take prescribed medications.", "Consult a doctor if symptoms persist."],
        nausea: ["Avoid spicy food.", "Eat small meals.", "Stay hydrated.", "Take prescribed medications.", "Consult a doctor if symptoms persist."],
        sore_throat: ["Gargle with warm salt water.", "Avoid cold drinks.", "Rest your voice.", "Take prescribed medications.", "Consult a doctor if symptoms persist."],
        shortness_of_breath: ["Avoid allergens.", "Stay in a well-ventilated area.", "Use prescribed inhalers.", "Take prescribed medications.", "Consult a doctor if symptoms persist."],
        chest_pain: ["Avoid strenuous activities.", "Take prescribed medications.", "Seek immediate help if pain worsens.", "Rest well.", "Consult a doctor if symptoms persist."]
    };

    const doctorMapping = {
        "Panipat": ["Dr.Ramesh Chabbra, Contact: 9812051777, With 46 years of experience in Internal Medicine, Dr. Chhabra practices at Chhabra Hospital."],
        "Panipat": ["Dr.Varun Arya, Contact: 9896900191, An Internal Medicine Specialist based in Panipat, India, with 17 years of experience located at Ground Floor, Health Care, Department of Medicine and Critical Care Bougainvillea, Assandh Road."],
        "Delhi": ["Dr.Sanjay Kumar Gogia, Contact: 8512830995, A Senior Director in Internal Medicine at Fortis Shalimar Bagh, Dr. Gogia has 30 years of experience."],
        "Hisar": ["Dr.Sunil Agrawal, Contact: 8512830995, Ophthalmologist at Jindal Hospital, known for patient satisfaction."],
        "Chandigarh" : ["Dr.Geetika Garg, Contact: 9988076000, With 18 years of experience, Dr. Garg is a reputable general physician in Chandigarh."],
        "Hisar": ["Dr.Praveen Monga, Contact: 9896539128, Ophthalmologist at Jindal Hospital, highly recommended by patients"]
    };                       
    

    const possibleDiseases = diseaseMapping[symptoms] || ["Unknown Disease"];
    const suggestedMedicines = medicineMapping[symptoms] || ["Consult a doctor for medication."];
    const precautions = precautionsMapping[symptoms] || ["No specific precautions available."];
    const doctorSuggestions = doctorMapping[location] || ["No nearby doctors found. Please enter a valid location."];


    document.getElementById('possibleDiseases').textContent = possibleDiseases.join(", ");
    document.getElementById('suggestedMedicines').textContent = suggestedMedicines.join(", ");
    document.getElementById('precautions').innerHTML = precautions.map(precaution => `<li>${precaution}</li>`).join("");
    document.getElementById('doctorSuggestions').innerHTML = doctorSuggestions.map(doctor => `<li>${doctor}</li>`).join("");

    document.getElementById('results').classList.remove('hidden');
});

document.querySelectorAll('.symptom-btn').forEach(button => {
    button.addEventListener('click', function() {
        const symptom = this.getAttribute('data-symptom');
        const symptomsInput = document.getElementById('symptoms');
        symptomsInput.value = symptomsInput.value ? `${symptomsInput.value}, ${symptom}` : symptom;
    });
});