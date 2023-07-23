async function onSetBreed(event) {
    event.preventDefault()

    let selectEl = document.getElementById("breeds-dropdown")

    let breedId = selectEl.options[selectEl.selectedIndex].value
    let breedName = selectEl.options[selectEl.selectedIndex].text
    
    let response = await fetch('https://api.thedogapi.com/v1/images/search?limit=1&breed_ids=' + breedId + '&api_key=live_jUqEowweWfFIvaB0rm6lWOpnfsdvsP1ZUUx1AbIyYo3CwZ2yjYeSFI1LfsnjqboK')
    let body = await response.json()

    let imgUrl = body[0].url

    let breedImgEl = document.getElementById("breed-img")
    breedImgEl.style.backgroundImage = 'url(' + imgUrl + ')'
}

async function onBodyLoad() {
    let response = await fetch('https://api.thedogapi.com/v1/breeds')
    let body = await response.json()

    let selectEl = document.getElementById("breeds-dropdown")

    let optsContent = ""
    for (let breed of body) {
        let opt = '<option value="' + breed.id + '">' + breed.name + '</option>'
        optsContent += opt
    }

    selectEl.innerHTML = optsContent


    document.getElementById("set-breed-btn").addEventListener("click", onSetBreed)
}

document.addEventListener("DOMContentLoaded", onBodyLoad)
