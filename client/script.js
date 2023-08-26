const adviceId = document.getElementById('advice-number');
const adviceText = document.getElementById('advice');
const btn = document.getElementById('button');

btn.addEventListener('click', async () => {
    try {
        // fetch data from http://localhost:3000/api/advices/random
        // fetch data from https://advice-generator-tjk2.onrender.com/api/advices/random
        const response = await fetch(
            // 'http://localhost:3000/api/advices/random'
            'https://advice-generator-tjk2.onrender.com/api/advices/random'
        );

        // convert response to json
        const data = await response.json();

        // update the dom
        adviceId.children[0].innerHTML = data.randomAdvice.id;
        adviceText.innerHTML = data.randomAdvice.str;
    } catch (err) {
        alert(err.message);
    }
});
