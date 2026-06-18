
// for assigned employees id in any project
const assignedIds = projectId => {
    const ids = employees.filter(employee => employee.projects.includes(projectId))
    return ids
}


// make clicked project card selected and open sidebar 
const showDetails = projectId => {
    const cards = document.querySelectorAll('.pcard.selected')
    const inactive = cards.forEach(card => card.classList.remove('selected'))
    const selector = `project${projectId}`
    document.getElementById(selector).classList.add('selected')

    // find the clicked project 
    const project = findProject(projectId)

    // render details in html  
    renderProjectDetails(project)

    // render assigned 
    renderAssigned(project.id, projectTeamList)

    // render milestones 
    renderMilestones(project)

    // open sidebar 
    projectInfo.classList.add('active')
}


// find project with its id 
const findProject = projectId => {
    const theProject = projects.find(project => project.id === projectId)
    return theProject
}


// set Project priority emoji 
const setEmoji = project => {
    if (project.priority === 'Low') {
        return '🟢'
    }
    else if (project.priority === 'Medium') {
        return '🟡'
    }
    else if (project.priority === 'High') {
        return '🟠'
    }
    else {
        return '🔥'
    }
}


// render project details in sidebar 
const renderProjectDetails = project => {
    selectedProjectName.innerText = project.title
    selectedProjectClientName.innerText = project.client
    projectPriority.innerText = setEmoji(project) + project.priority
    milestones.innerText = project.milestones.length
    milestonesDone.innerText = project.milestones.length - 2
    projectStarted.innerText = project.startDate
    projectDeadline.innerText = project.deadline
    budgetUsed.innerText = project.expence
    totalBudget.innerText = project.budget
}

// const renderAssigned
const renderAssigned = (projectId, wrapper) => {
    assignedArray = assignedIds(projectId)

    wrapper.innerHTML = ''

    assignedArray.forEach(employee => {
        renderElement = `<div class="team-row">
                            <div class="team-av" style="background:#4f63d2">AK</div>
                            <div>
                                <div class="team-name">${employee.name}</div>
                                <div class="team-role">${employee.name}</div>
                            </div>
                            <div class="team-badge tb-pm">${employee.id}</div>
                        </div>`


        wrapper.insertAdjacentHTML('beforeend', renderElement)

    })
}


// render milestones 

const renderMilestones = project => {

    sidebarMilestoneList.innerHTML = ''
    project.milestones.forEach(milestone => {
        const element = `<div id="ms${milestone.mIs}" class="ms-row">
                            <div class="ms-check ms-pending"></div>
                            <div class="ms-text">${milestone.label}</div>
                            <div class="ms-date">Jun 15</div>
                        </div>`
        sidebarMilestoneList.insertAdjacentHTML('beforeend', element)

    })

}