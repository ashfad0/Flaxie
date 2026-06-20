
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
    projectRadialProgress.setAttribute('style', `--value:0`)
    selectedProjectName.innerText = project.title
    selectedProjectClientName.innerText = project.client
    projectPriority.innerText = setEmoji(project) + project.priority
    milestones.innerText = project.milestones.length
    milestonesDone.innerText = project.milestones.length - 2
    projectStarted.innerText = project.startDate
    projectDeadline.innerText = project.deadline
    timeElapsed.innerText = calculateDays(project.startDate, project.deadline) + 'days'

    let daysRemaining = calculateDays(new Date(), project.deadline)
    remainingDay.style.color = 'unset'
    remainingDayIcon.style.color = 'var(--sb-active)'
    if (daysRemaining <= 0) {
        daysRemaining *= (-1)
        remainingDay.style.color = 'var(--danger)'
        remainingDayIcon.style.color = 'var(--danger)'
    }
    remainingDay.innerText = daysRemaining
    sidebarSubStatus.innerText = getSubStatus(project) + ' by'
    projectDeadline.style.color = 'unset'
    deadlineIcon.style.color = 'var(--sb-active)'
    if (new Date(project.deadline).getTime() < new Date().getTime()) {
        projectDeadline.style.color = 'var(--danger)'
        deadlineIcon.style.color = 'var(--danger)'
    }

    budgetUsed.innerText = project.expence
    totalBudget.innerText = project.budget
    projectRadialProgress.setAttribute('style', `--value:${project.progress}`)
    projectRadialProgress.setAttribute('aria-valuenow', project.progress)
    projectRadialProgress.style.color = `var(--${setProjectBadge(project)})`
    projectRadialProgress.innerText = project.progress + '%'
}

// const renderAssigned
const renderAssigned = (projectId, wrapper) => {
    assignedArray = assignedIds(projectId)

    wrapper.innerHTML = ''

    assignedArray.forEach(employee => {
        renderElement = `<div class="team-row">
                            <img class="team-av" src="${employee.profileImage}" alt="">
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

// date calculating 
const calculateDays = (start, end) => {
    let startDate = new Date(start);
    let endDate = new Date(end);
    const result = endDate.getTime() - startDate.getTime()
    const calculate = result / (1000 * 60 * 60 * 24)
    const calculayeDays = Math.floor(calculate)
    return calculayeDays
}


// calculate subStatus 
const getSubStatus = project => {
    const days = calculateDays(new Date(), project.deadline)
    const duration = calculateDays(project.startDate, project.deadline)
    const daysOneFourth = duration / 4;
    if (days < 0) {
        return 'overdue'
    }
    else if (days <= daysOneFourth || days == 0) {
        return 'At risk'
    }

    return 'On track'
}

// classify projects 
const classityProjects = allProjects => {
    allProjects.forEach(project => {
        const days = calculateDays(new Date(), project.deadline)
        const duration = calculateDays(project.startDate, project.deadline)
        const daysOneFourth = duration / 4;

        if (days < 0) {
            propjectsOverdue.push(project)
        }
        else if (days <= daysOneFourth) {
            projectsAtRisk.push(project)

        }
        else {
            projectsOnTrack.push(project)
        }
    })
}

// set badge type 
const setProjectBadge = theProject => {
    const projectSubstatus = getSubStatus(theProject)
    let badgeType;

    if (projectSubstatus === 'overdue') {
        badgeType = 'danger'
    }
    else if (projectSubstatus === 'At risk') {
        badgeType = 'warn'
    }
    else {
        badgeType = 'ok'
    }
    return badgeType
}

const insertProject = (allProjects, wrapper) => {
    wrapper.innerHTML = '';
    allProjects.forEach(project => {

        // get substatus 
        const cardSubstatus = getSubStatus(project)
        // set badge type 
        let badgeType = setProjectBadge(project)

        // remaining days or overdue logic 
        let daysRemaining = calculateDays(new Date(), project.deadline)
        if (daysRemaining < 0) {
            daysRemaining *= (-1)
            daysRemaining += ' d late'
        }
        else {
            daysRemaining += ' d left'
        }
        // card component 
        const projectCard =
            `<div id="project${project.id}" onClick="showDetails(${project.id})" class="pcard">
                            <div class="pcard-bar" style="background:var(--danger)"></div>
                            <div class="pcard-body">
                                <div class="pcard-top">
                                    <div class="pcard-name">${project.title}</div>
                                    <div class="badge badge-${badgeType}">
                                        <div class="badge-dot"></div>${cardSubstatus}
                                    </div>
                                </div>
                                <div class="pcard-client">Client: ${project.client}</div>
                                <div class="pcard-meta">
                                    <div class="meta-item"><ion-icon name="play-circle-outline"></ion-icon><span>Started
                                            <strong>${project.startDate}</strong></span></div>
                                    <div class="meta-item"><ion-icon name="flag-outline"></ion-icon><span>Due <strong
                                                style="color:var(--${badgeType})">${project.deadline}</strong></span></div>
                                    <div class="meta-item"><ion-icon
                                            name="people-outline"></ion-icon><span><strong>${assignedIds(project.id).length}</strong>
                                            members</span></div>
                                </div>
                                <div class="pcard-progress">
                                    <div class="prog-row">
                                        <span class="prog-label">Overall progress</span>
                                        <span class="prog-pct" style="color:var(--${badgeType})">${project.progress}%</span>
                                    </div>
                                    <div class="prog-track">
                                        <div class="prog-fill ${badgeType}" style="width:${project.progress}%"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="pcard-right">
                                <div class="time-remaining tr-${badgeType}">${daysRemaining}</div>
                                <div class="av-stack">
                                    <div class="av" style="background:#ef4444">+2</div>
                                    <div class="av" style="background:#8b63d2">SR</div>
                                    <div class="av" style="background:#4f63d2">AK</div>
                                </div>
                                <div class="priority-tag">${setEmoji(project)} ${project.priority}</div>
                            </div>
                        </div>`

        wrapper.insertAdjacentHTML('beforeend', projectCard)
    })
}

// render top status filter 
const renderStatus = projects => {

    projects.forEach(project => {
        if (allStatus.includes(project.status) !== true) {
            allStatus.push(project.status)
        }
    })
    filterBar.innerHTML = ''
    allStatus.forEach(status => {
        const statusBtn = `<div class="ftab">${status}</div>`
        filterBar.insertAdjacentHTML('beforeend', statusBtn)
    })
}

// render subStatus filter

// const renderSubStatus = projects=>{

//     projects.forEach(project=>{
//        const status = getSubStatus(project)
//        if(allStatus.includes(status) !== true){
//         allStatus.push(status)
//        }
//     })

//         summaryRow.innerHTML = ''
//     allStatus.forEach(status => {
//         const summaryBtn = `<div class="sum-pill">
//                     <div class="sum-dot" style="background:var(--accent)"></div><strong>12</strong> Total
//                 </div>`
//         summaryRow.insertAdjacentHTML('beforeend', statusBtn)
//     })
// }




const renderSubStatus = projects => {

    summaryRow.innerHTML = ''
    projects.forEach(project => {
        const status = getSubStatus(project)
        const statusBadge = setProjectBadge(project)

        if (allStatus.includes(status) !== true) {
            allStatus.push(status)
            const summaryBtn = `<div class="sum-pill">
                    <div class="sum-dot" style="background:var(--${statusBadge})"></div><strong>12</strong> ${status}
                </div>`
            summaryRow.insertAdjacentHTML('beforeend', statusBtn)
        }
    })
}

