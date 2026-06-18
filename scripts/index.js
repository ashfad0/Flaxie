

fetch('https://gist.githubusercontent.com/ashfad0/e3178d7cee22d878bbf08ede2377223e/raw/project-company_data.json')
    .then(res => res.json())
    .then(json => renderProjects(json))

const renderProjects = input => {
    data = input
    employees = input.employees
    projects = data.projects
    console.log(projects)

    overdueCards.innerHTML = '';
    const cards = projects.forEach(project => {
        const projectCard = `<div id="project${project.id}" onClick="showDetails(${project.id})" class="pcard">
                            <div class="pcard-bar" style="background:var(--danger)"></div>
                            <div class="pcard-body">
                                <div class="pcard-top">
                                    <div class="pcard-name">${project.title}</div>
                                    <div class="badge badge-danger">
                                        <div class="badge-dot"></div>Overdue
                                    </div>
                                </div>
                                <div class="pcard-client">Client: ${project.client}</div>
                                <div class="pcard-meta">
                                    <div class="meta-item"><ion-icon name="play-circle-outline"></ion-icon><span>Started
                                            <strong>${project.startDate}</strong></span></div>
                                    <div class="meta-item"><ion-icon name="flag-outline"></ion-icon><span>Due <strong
                                                style="color:var(--danger)">${project.deadline}</strong></span></div>
                                    <div class="meta-item"><ion-icon
                                            name="people-outline"></ion-icon><span><strong>${assignedIds(project.id).length}</strong>
                                            members</span></div>
                                </div>
                                <div class="pcard-progress">
                                    <div class="prog-row">
                                        <span class="prog-label">Overall progress</span>
                                        <span class="prog-pct" style="color:var(--danger)">${project.progress}%</span>
                                    </div>
                                    <div class="prog-track">
                                        <div class="prog-fill danger" style="width:${project.progress}%"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="pcard-right">
                                <div class="time-remaining tr-danger">12d late</div>
                                <div class="av-stack">
                                    <div class="av" style="background:#ef4444">+2</div>
                                    <div class="av" style="background:#8b63d2">SR</div>
                                    <div class="av" style="background:#4f63d2">AK</div>
                                </div>
                                <div class="priority-tag">${setEmoji(project)} ${project.priority}</div>
                            </div>
                        </div>`

        overdueCards.insertAdjacentHTML('beforeend', projectCard)
    })
}


// project card selected & sidebar close handeller 
closeDetails.addEventListener('click', () => {
    const cards = document.querySelectorAll('.pcard.selected')
    const inactive = cards.forEach(card => card.classList.remove('selected'))
    projectInfo.classList.remove('active')
})