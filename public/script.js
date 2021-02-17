async function start(){
    async function fetchDataOfAPI(){
        const animatronicsApi = await fetch('https://fnaf-web-git-main.davidlpc1.vercel.app/api/v1/all')
        const animatronicsJson = await animatronicsApi.json();
        return animatronicsJson;
    }

    function speak(message){
        if (!"speechSynthesis" in window) return;
        if(!message) return;
        window.speechSynthesis.cancel();
    
        const msg = new SpeechSynthesisUtterance();
        msg.text = message;
        msg.lang = "en-us";
        window.speechSynthesis.speak(msg);
    
        return;
    }

    function putOnlyOneAnimatronicAtTheListHtml({ name,image,game }){
        const list = document.querySelector('.list')

        const li = document.createElement("li")
        const src = image || "https://placehold.it/150x150";
        li.innerHTML = `
            <img src=${src} />
            <strong>${name}</strong> 
            <span>${game}</span>
        `;
        li.addEventListener('click',() => {
            speak(`${name} of ${game || ''}`)
        })

        list.appendChild(li)
    }

    function putAllAnimatronicsAtTheListHtml(animatronics){
        animatronics.forEach(animatronic => {
            console.log('Working')
            putOnlyOneAnimatronicAtTheListHtml(animatronic)
        });
    }

    const animatronics = await fetchDataOfAPI()
    putAllAnimatronicsAtTheListHtml(animatronics)
}

start()