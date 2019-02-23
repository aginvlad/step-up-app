import Score from './modules/Score';
import * as scoreView from './views/scoreView';
import { elements } from './views/base';

var state = {};

const initScore = () => {
    state.score = new Score();
    state.score.initSteps();
};

initScore();

/* ---- Listeners for Score Panel ---- */
elements.ctrlPanelExtra.style.display = 'none';

elements.ctrlPanel.addEventListener('click', e => {
    let target = e.target.id;

    if(target === 'btn-edit') {
        let panel = elements.ctrlPanelExtra;
        console.log(panel.style.display === 'none');
        panel.style.display === 'none' ? panel.style.display = 'flex' :  panel.style.display = 'none';
    }
    else if(target === 'btn-add') {
        if(state.score.getScore() < 9999) {
            state.score.addStep();
            state.score.initSteps();
            scoreView.enableBtn(elements.removeBtn);
        }
        else {
            scoreView.disableBtn(elements.addBtn);
        }
    }
});

elements.ctrlPanelExtra.addEventListener('click', e => {
    let target = e.target.id;
    
    if(target === 'btn-remove') {
        if(state.score.getScore() > 0) {
            state.score.removeStep();
            scoreView.enableBtn(elements.addBtn);
        }
        else {
            scoreView.disableBtn(elements.removeBtn);
        }
    }
    else if(target === 'btn-clear') {
        state.score.resetSteps();
        scoreView.disableBtn(elements.removeBtn);
        scoreView.enableBtn(elements.addBtn);
    }
    
    state.score.initSteps(); 
});

// ---- Menu Listeners ----
elements.sidebar.addEventListener('click', e => {
    let target = e.target.id;
    console.log(e.target);
    if(target === 'menu-btn')
        elements.sidebarMenu.classList.add('sidebar-menu--active');
    else if(target === 'sidebar-menu-close')
        elements.sidebarMenu.classList.remove('sidebar-menu--active');
});