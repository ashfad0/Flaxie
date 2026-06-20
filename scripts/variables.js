let data;
let employees;
let projects;
let allStatus = ['All Projects']
let allSubStatus = ['Total']
let propjectsOverdue = [];
let projectsAtRisk = [];
let projectsOnTrack = [];

const overdueCards = document.getElementById('overdueCards')
const atRiskCards = document.getElementById('atRiskCards')
const onTrackCards = document.getElementById('onTrackCards')


const projectInfo = document.getElementById('projectInfo')
const closeDetails = document.getElementById('closeDetails')
// const projectCards = document.querySelectorAll('.pcard')


// project sidebar 
const selectedProjectName = document.getElementById('selectedProjectName')
const selectedProjectClientName = document.getElementById('selectedProjectClientName')
const projectPriority = document.getElementById('priority')
const projectRadialProgress = document.getElementById('radialProgress')
const milestones = document.getElementById('milestones')
const milestonesDone = document.getElementById('milestonesDone')
const projectStarted = document.getElementById('projectStarted')
const projectDeadline = document.getElementById('projectDeadline')
const deadlineIcon = document.getElementById('deadlineIcon')
const timeElapsed = document.getElementById('timeElapsed')
const sidebarSubStatus = document.getElementById('sidebarSubStatus')
const remainingDay = document.getElementById('remainingDay')
const remainingDayIcon = document.getElementById('remainingDayIcon')
const budgetUsed = document.getElementById('budgetUsed')
const totalBudget = document.getElementById('totalBudget')
const projectTeamList = document.getElementById('teamList')
const sidebarMilestoneList = document.getElementById('milestoneList')
const activityList = document.getElementById('activityList')


// filterbar 
const filterBar = document.getElementById('filterBar')
const summaryRow = document.getElementById('summaryRow')