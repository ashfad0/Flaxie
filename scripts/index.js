// async function init() {
//     const res = await fetch('https://gist.githubusercontent.com/ashfad0/e3178d7cee22d878bbf08ede2377223e/raw/project-company_data.json')
//     const data = await res.json()
//     renderProjects(data)
// }
// init()


fetch('https://gist.githubusercontent.com/ashfad0/e3178d7cee22d878bbf08ede2377223e/raw/project-company_data.json')
    .then(res => res.json())
    .then(json => renderData(json))


const renderData = data => {
    employees = data.employees
    projects = data.projects

    renderStatus(projects)

    classityProjects(projects)
    insertProject(propjectsOverdue, overdueCards)
    insertProject(projectsAtRisk, atRiskCards)
    insertProject(projectsOnTrack, onTrackCards)
}


// project card selected & sidebar close handeller 
closeDetails.addEventListener('click', () => {
    const cards = document.querySelectorAll('.pcard.selected')
    const inactive = cards.forEach(card => card.classList.remove('selected'))
    projectInfo.classList.remove('active')
})
