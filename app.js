const nav = document.querySelector('.nav')
window.addEventListener('scroll', fixNav)


function fixNav() {
    if(window.scrollY > nav.offsetHeight +150) {
        nav.classList.add('active')
    } else {
        nav.classList.remove('active')
    }
}

//career progress
const careerCards = document.querySelectorAll('.career-cards');

window.addEventListener('scroll', checkBoxes);

checkBoxes()

function checkBoxes() {
    const triggerBottom = window.innerHeight*0.8;
    console.log(triggerBottom)

    careerCards.forEach(card => {
        const boxTop = card.getBoundingClientRect().top;

        if(boxTop < triggerBottom) {
            card.classList.add('show')
        } else {
            card.classList.remove('show');
        }
    });
}

//get github info
const APIURL_github = 'https://api.github.com/users/'
const formGitHub = document.getElementById('form-github')
const searchGitHub = document.getElementById('search-github')
const githubCard = document.getElementById('github-card')

getUser('fernandajacques')
async function getUser(username) {
    try {
        const { data } = await axios.get(APIURL_github + username)
        createUserCard(data)
    } catch(err) {
        console.log(err)
    }
}

function createUserCard(user) {
    const cardHTML = `
        <div>
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>

        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul>
                <li>${user.followers} <strong>Followers</strong></li>
                <li>${user.following} <strong>Following</strong></li>
                <li>${user.public_repos} <strong>Repos</strong></li>
            </ul>


        </div>
    `
    githubCard.innerHTML = cardHTML
}

formGitHub.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = searchGitHub.value
    if (user) {
        getUser(user)
        searchGitHub.value = ''
    }
})

// {/* <div id="repos">
// <a href="#" class="repo">Repo 1</a>
// <a href="#" class="repo">Repo 2</a>
// <a href="#" class="repo">Repo 3</a>
// </div> */}