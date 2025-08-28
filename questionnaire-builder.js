// Questionnaire Builder Logic
// Handles interactive editing, localStorage, triggers, and download

const QUESTIONNAIRE_KEY = 'questionnaire_builder_data';
const DEFAULT_QUESTIONNAIRE = {
    htmlTitle: '',
    title: '',
    compulsoryQuestions: [],
    questions: [],
    conditionalQuestions: {}
};

// Load question.js if editing existing
async function loadExistingQuestions() {
    try {
        const res = await fetch('question.js');
        const text = await res.text();
        let htmlTitle, title, compulsoryQuestions, questions, conditionalQuestions;
        eval(text);
        return { htmlTitle, title, compulsoryQuestions, questions, conditionalQuestions };
    } catch (e) {
        alert('Failed to load question.js');
        return DEFAULT_QUESTIONNAIRE;
    }
}

function saveToLocal(data) {
    localStorage.setItem(QUESTIONNAIRE_KEY, JSON.stringify(data));
}
function loadFromLocal() {
    const raw = localStorage.getItem(QUESTIONNAIRE_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
}
function resetLocal() {
    localStorage.removeItem(QUESTIONNAIRE_KEY);
}

// UI rendering
function renderStartOptions() {
    document.getElementById('startOptions').style.display = '';
    document.getElementById('builderArea').style.display = 'none';
    document.getElementById('startScratchBtn').style.display = '';
    document.getElementById('editExistingBtn').style.display = '';
}
function renderBuilder(data) {
    document.getElementById('startOptions').style.display = 'none';
    document.getElementById('builderArea').style.display = '';
    document.getElementById('startScratchBtn').style.display = 'none';
    document.getElementById('editExistingBtn').style.display = 'none';
    // Render questionnaire editor
    const area = document.getElementById('builderArea');
    area.innerHTML = '';
    area.appendChild(renderTitleEditor(data));
    area.appendChild(renderQuestionsEditor(data));
    area.appendChild(renderCompulsoryEditor(data));
    area.appendChild(renderConditionalEditor(data));
    // Add extra space at bottom so Download bar doesn't block content
    area.appendChild(document.createElement('div')).style.height = '120px';
}

function renderTitleEditor(data) {
    const div = document.createElement('div');
    div.className = 'mb-3';
    div.innerHTML = `<label class="form-label">HTML Title</label>
        <input type="text" class="form-control" id="htmlTitleInput" value="${data.htmlTitle}">
        <label class="form-label mt-2">Questionnaire Title</label>
        <input type="text" class="form-control" id="titleInput" value="${data.title}">`;
    div.querySelector('#htmlTitleInput').oninput = e => {
        data.htmlTitle = e.target.value;
        saveToLocal(data);
    };
    div.querySelector('#titleInput').oninput = e => {
        data.title = e.target.value;
        saveToLocal(data);
    };
    return div;
}

function renderCompulsoryEditor(data) {
    const div = document.createElement('div');
    div.className = 'mb-3';
        div.innerHTML = `<h4 class="form-label">Compulsory Questions</h4><div id="compQnBadges" style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem; width:100%;"></div><div id="compQnWarning" class="alert alert-warning mt-2" style="display:none;">You must add at least one compulsory question. If none is specified, no questions will be shown to users.</div>`;
        // Add first question as compulsory button
        const firstQn = data.questions.length > 0 ? data.questions[0].number : null;
        const addFirstBtn = document.createElement('button');
        addFirstBtn.className = 'btn btn-outline-primary btn-sm mb-2';
        addFirstBtn.textContent = 'Make first question Compulsory';
        addFirstBtn.style.width = '100%';
        addFirstBtn.style.display = (firstQn && !data.compulsoryQuestions.includes(firstQn) && !data.conditionalQuestions[firstQn]) ? '' : 'none';
        addFirstBtn.onclick = () => {
            if (firstQn && !data.compulsoryQuestions.includes(firstQn)) {
                data.compulsoryQuestions.push(firstQn);
                saveToLocal(data);
                renderBuilder(data);
            }
        };
        div.insertBefore(addFirstBtn, div.querySelector('#compQnBadges'));
        // Show/hide button on badge update
        function updateAddFirstBtn() {
            addFirstBtn.style.display = (firstQn && !data.compulsoryQuestions.includes(firstQn) && !data.conditionalQuestions[firstQn]) ? '' : 'none';
        }
    // Show warning if no compulsory questions
    const warningDiv = div.querySelector('#compQnWarning');
    function updateCompQnWarning() {
        warningDiv.style.display = (data.compulsoryQuestions.length === 0) ? '' : 'none';
    }
    updateCompQnWarning();
    // Badge list
    const badgeDiv = div.querySelector('#compQnBadges');
    // Exclude conditional questions from compulsory
    badgeDiv.innerHTML = data.compulsoryQuestions.filter(qn => !data.conditionalQuestions[qn]).map(qn => {
        const qObj = data.questions.find(q => q.number === qn);
        const label = `${qn}${qObj ? ' - ' + qObj.question : ''}`;
        return `<span class="badge bg-primary me-1 compQnBadge d-inline-flex align-items-center" title="${label}" style="max-width:calc(100% - 1rem); cursor:pointer;" data-bs-toggle="tooltip">
            <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; flex:1 1 auto; min-width:0;">${label}</span>
            <button type="button" class="btn-close btn-close-white btn-sm ms-1 flex-shrink-0" data-qn="${qn}" style="margin-left:6px;"></button>
        </span>`;
    }).join('');
    // Enable Bootstrap tooltips
    setTimeout(() => {
        if (window.bootstrap && typeof window.bootstrap.Tooltip === 'function') {
            badgeDiv.querySelectorAll('.compQnBadge').forEach(el => {
                new window.bootstrap.Tooltip(el);
            });
        } else {
            // Fallback: show native tooltip on hover
            badgeDiv.querySelectorAll('.compQnBadge').forEach(el => {
                el.onmouseover = () => { el.setAttribute('title', el.getAttribute('title')); };
            });
        }
    }, 0);
    // Remove badge
    badgeDiv.querySelectorAll('.btn-close').forEach(btn => {
        btn.onclick = () => {
            data.compulsoryQuestions = data.compulsoryQuestions.filter(qn => qn !== btn.getAttribute('data-qn'));
            saveToLocal(data);
            renderBuilder(data);
            updateAddFirstBtn();
        };
    });
    updateAddFirstBtn();
    // Add dropdown search (matching conditional UI)
    // Only allow non-conditional questions to be added as compulsory, and not already in conditionalQuestions
    const allNumbers = data.questions.map(q => q.number)
        .filter(n => !data.compulsoryQuestions.includes(n) && !data.conditionalQuestions[n]);
    const searchDiv = document.createElement('div');
    searchDiv.className = 'mt-2';
    searchDiv.innerHTML = `
        <div style="width:100%; display:flex; flex-direction:row; gap:0.5rem; align-items:stretch;">
            <div style="position:relative; width:100%;">
                <input type="text" class="form-control comp-qn-search" placeholder="Search question number..." style="width:100%; height:40px;">
                <div class="dropdown-menu show" style="max-height:300px;overflow:auto; position:absolute; left:0; right:0; bottom:100%; z-index:99999; width:100%; min-width:unset;"></div>
            </div>
            <button class="btn btn-primary add-comp-btn" style="height:40px;">Add</button>
        </div>
    `;
    const input = searchDiv.querySelector('.comp-qn-search');
    const menu = searchDiv.querySelector('.dropdown-menu');
    const addBtn = searchDiv.querySelector('.add-comp-btn');
    function updateMenu() {
    // Ensure dropdown matches input width
    function positionCompQnDropdown() {
        menu.style.width = input.offsetWidth + 'px';
    }
    input.addEventListener('focus', positionCompQnDropdown);
    input.addEventListener('input', positionCompQnDropdown);
    window.addEventListener('resize', positionCompQnDropdown);
        const val = input.value.toLowerCase();
        menu.innerHTML = allNumbers.filter(n => n.toLowerCase().includes(val)).map(n => {
            const qObj = data.questions.find(q => q.number === n);
            return `<button class="dropdown-item" type="button" data-qn="${n}">${n} - ${qObj ? qObj.question : ''}</button>`;
        }).join('');
        menu.querySelectorAll('button').forEach(btn => {
            btn.onclick = () => {
                input.value = btn.getAttribute('data-qn');
                updateMenu();
            };
        });
    }
    input.oninput = updateMenu;
    input.onfocus = () => { menu.style.display = 'block'; updateMenu(); };
    input.onblur = () => { setTimeout(() => { menu.style.display = 'none'; }, 150); };
    menu.style.display = 'none';
    updateMenu();
    // Error message element
    const errorMsg = document.createElement('div');
    errorMsg.className = 'text-danger small mt-1 mb-1 comp-add-error';
    errorMsg.style.display = 'none';
    searchDiv.appendChild(errorMsg);
    addBtn.onclick = () => {
        const qn = input.value.trim();
        errorMsg.style.display = 'none';
        if (!qn || !allNumbers.includes(qn)) {
            errorMsg.textContent = 'Invalid or unavailable question number.';
            errorMsg.style.display = 'block';
            return;
        }
        if (data.compulsoryQuestions.includes(qn)) {
            errorMsg.textContent = 'This question is already marked as compulsory.';
            errorMsg.style.display = 'block';
            return;
        }
        if (data.conditionalQuestions[qn]) {
            errorMsg.textContent = 'This question is already a conditional question.';
            errorMsg.style.display = 'block';
            return;
        }
        data.compulsoryQuestions.push(qn);
        saveToLocal(data);
        renderBuilder(data);
    };
    div.appendChild(searchDiv);
    return div;
}

function renderQuestionsEditor(data) {
    const div = document.createElement('div');
    div.className = 'mb-3';
    div.innerHTML = `<h4>Questions</h4>`;
    const list = document.createElement('div');
    function getSummary(q) {
            let triggerSummary = '';
            if (q.trigger) {
                triggerSummary += `<span class="badge bg-warning text-dark ms-2">Trigger: ${q.trigger}</span>`;
            }
            // Option triggers summary (table style, styled to fit card)
            if (q.options && q.options.length) {
                const optTriggers = q.options.filter(opt => opt.trigger).map(opt => {
                    const label = opt.label || opt.value;
                    return `<tr><td class="px-2 py-1 text-truncate" style="max-width:120px;">${label}</td><td class="px-2 py-1"><span class='badge bg-info text-dark'>${opt.trigger}</span></td></tr>`;
                });
                if (optTriggers.length) {
                    triggerSummary += `
                    <div class="ms-2 d-flex justify-content-center" style="width:100%; margin-top: 1rem;">
                        <table class="table table-sm table-bordered mb-0" style="width:90%; background:#f8f9fa; border-radius:6px; overflow:hidden; margin:0 auto;">
                            <thead>
                                <tr style="background:#e9ecef;">
                                    <th class="px-2 py-1" style="width:50%; text-align:center;">Option</th>
                                    <th class="px-2 py-1" style="width:50%; text-align:center;">Trigger</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${optTriggers.join('')}
                            </tbody>
                        </table>
                    </div>`;
                }
            }
            return `<div style="display:flex; align-items:center; justify-content:space-between; width:100%;">
                <span><strong>${q.number}</strong> - ${q.question || '<em>No question text</em>'}</span>
                <span style="display:flex; gap:0.5rem; align-items:center;">
                    <span class="badge bg-secondary">${q.inputType}</span>
                </span>
            </div>
            ${triggerSummary ? `<div style='width:100%;'>${triggerSummary}</div>` : ''}
            <div style="width:100%; display:flex; justify-content:center; align-items:center;"><span class="text-primary">&#x25BC;</span></div>`;
    }
    // Track expanded state for each question
    // Use persistent expandedState so it survives rerenders
    if (!window._questionnaireExpandedState) window._questionnaireExpandedState = {};
    let expandedState = window._questionnaireExpandedState;
    data.questions.forEach((q, idx) => {
        const qKey = q.number || idx;
        // Collapsible card
        const wrapper = document.createElement('div');
        wrapper.className = 'mb-2';
        // Summary bar
        const summary = document.createElement('div');
        summary.className = 'card card-header d-flex justify-content-between align-items-center';
        summary.style.cursor = 'pointer';
        summary.innerHTML = getSummary(q);
        // Details (collapsed by default, animated)
        const details = document.createElement('div'); 
        details.className = 'collapse-anim';
        details.appendChild(renderQuestionCard(q, idx, data));
        // Refresh button at bottom of expanded card
        const refreshBtn = document.createElement('button');
        refreshBtn.className = 'btn btn-primary w-100';
        refreshBtn.textContent = 'Save';
        refreshBtn.style.display = 'none';
        refreshBtn.style.borderRadius = '0 0 8px 8px';
        refreshBtn.style.fontWeight = '400';
        refreshBtn.style.fontSize = '1rem';
        refreshBtn.style.marginTop = '-2.2rem';        // remove gap ontop

        refreshBtn.onclick = () => {
            summary.innerHTML = getSummary(q);
            details.innerHTML = '';
            details.appendChild(renderQuestionCard(q, idx, data));
            details.appendChild(refreshBtn);
            // Collapse ONLY after save
            setExpanded(false);
        };
            details.appendChild(refreshBtn);
        // Toggle expand/collapse with animation
        if (typeof expandedState[qKey] === 'undefined') expandedState[qKey] = false;
        function setExpanded(expanded) {
            expandedState[qKey] = expanded;
            if (expanded) {
                details.classList.add('open');
                summary.querySelector('span.text-primary').innerHTML = '&#x25B2;';
                refreshBtn.style.display = '';
                if (!details.contains(refreshBtn)) details.appendChild(refreshBtn);
            } else {
                details.classList.remove('open');
                summary.querySelector('span.text-primary').innerHTML = '&#x25BC;';
                refreshBtn.style.display = 'none';
            }
        }
        summary.onclick = () => {
            setExpanded(!expandedState[qKey]);
        };
        // Update summary after editing
        details.addEventListener('change', () => {
            refreshBtn.style.display = '';
            if (!details.contains(refreshBtn)) details.appendChild(refreshBtn);
        }, true);
    // Restore expanded state after rerender
    setExpanded(expandedState[qKey]);
        wrapper.appendChild(summary);
        wrapper.appendChild(details);
        list.appendChild(wrapper);
    });
    div.appendChild(list);
    const addBtn = document.createElement('button');
    addBtn.className = 'btn btn-outline-primary mt-2';
    addBtn.textContent = 'Add Question';
    addBtn.onclick = () => {
        data.questions.push({ number: `QN${data.questions.length}`, inputType: 'response', question: '', options: [] });
        saveToLocal(data);
        renderBuilder(data);
    };
    div.appendChild(addBtn);
    return div;
}

function renderQuestionCard(q, idx, data) {
    const card = document.createElement('div');
    card.className = 'card question-card';
    // Get all question numbers except current
    const allNumbers = data.questions.map(qq => qq.number).filter(n => n !== q.number);
    card.innerHTML = `<div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <label class="form-label mb-0">Question Number</label>
                <input type="text" class="form-control form-control-sm" value="${q.number || `QN${idx}`}">
                <small class="text-muted">No special chars, must be unique</small>
            </div>
            <button class="btn btn-sm btn-danger">Delete</button>
        </div>
        <label>Type</label>
        <select class="form-select mb-2">
            <option value="display">Display</option>
            <option value="response">Response</option>
            <option value="sort">Sort</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
            <option value="dropdown">Dropdown</option>
        </select>
        <div class="question-type-info alert alert-info py-2 px-3 mb-2" style="font-size:0.95em;"></div>
        <label>Question</label>
        <input type="text" class="form-control mb-2" value="${q.question || ''}">
        <label>Hint (optional)</label>
        <input type="text" class="form-control mb-2" value="${q.hint || ''}">
        <div class="mb-2">Trigger:
            <div class="dropdown">
                <input type="text" class="form-control trigger-search" placeholder="Search trigger..." value="${q.trigger || ''}">
                <div class="dropdown-menu show" style="max-height:150px;overflow:auto;"></div>
            </div>
        </div>
        <div class="options-block">
            <div class="options-list"></div>
            <button class="btn btn-sm btn-outline-secondary mt-1">Add Option</button>
        </div>
    </div>`;
    // Info text for each type
    const infoTexts = {
        display: 'Display static information or instructions; no user input allowed for this question type.',
        response: 'Accepts free text input which will be used as the value. You may also choose to include predefined options with fixed values for users to choose from.',
        sort: 'User can rank the provided options, with top option being the most important/first. For trigger conditions, the trigger question will activate if the user ranks that option as the top choice.',
        checkbox: 'User can select multiple options - and all selected options\' triggers will activate.',
        radio: 'User can only select one option.',
        dropdown: 'User can only select one option.'
    };
    const infoDiv = card.querySelector('.question-type-info');
    const typeSel = card.querySelector('select');
    function updateInfo() {
        infoDiv.textContent = infoTexts[q.inputType] || '';
    }
    updateInfo();
    typeSel.value = q.inputType;
    typeSel.onchange = e => {
        q.inputType = e.target.value;
        saveToLocal(data);
        updateInfo();
        renderBuilder(data);
    };
    // Delete
    card.querySelector('.btn-danger').onclick = () => {
        data.questions.splice(idx, 1);
        saveToLocal(data);
        renderBuilder(data);
    };
    // Question Number (validate unique, no special chars)
    const numberInput = card.querySelector('input.form-control-sm');
    numberInput.oninput = e => {
        let val = e.target.value.replace(/[^a-zA-Z0-9_-]/g, '');
        if (val !== e.target.value) e.target.value = val;
        // Must be unique
        if (data.questions.some((qq, i) => qq.number === val && i !== idx)) {
            numberInput.classList.add('is-invalid');
        } else {
            numberInput.classList.remove('is-invalid');
        }
    };
    numberInput.onblur = e => {
        let val = e.target.value.replace(/[^a-zA-Z0-9_-]/g, '');
        if (val && !data.questions.some((qq, i) => qq.number === val && i !== idx)) {
            const oldNumber = q.number;
            q.number = val;
            // Update compulsoryQuestions
            data.compulsoryQuestions = data.compulsoryQuestions.map(n => n === oldNumber ? val : n);
            // Update triggers in questions
            data.questions.forEach(qq => {
                if (qq.trigger === oldNumber) qq.trigger = val;
                // Update triggers in options
                if (qq.options && qq.options.length) {
                    qq.options.forEach(opt => {
                        if (opt.trigger === oldNumber) opt.trigger = val;
                    });
                }
            });
            // Update conditionalQuestions
            Object.entries(data.conditionalQuestions).forEach(([cqKey, conditions]) => {
                // Update conditional question key
                if (cqKey === oldNumber) {
                    data.conditionalQuestions[val] = conditions;
                    delete data.conditionalQuestions[oldNumber];
                }
                // Update conditions inside
                (data.conditionalQuestions[cqKey] || []).forEach((cond, cidx) => {
                    if (Array.isArray(cond) && cond[0] === oldNumber) {
                        cond[0] = val;
                    }
                });
            });
            saveToLocal(data);
            // Preserve scroll position
            const scrollY = window.scrollY;
            renderBuilder(data);
            window.scrollTo({ top: scrollY });
        }
    };
    // Type (already declared above)
    // Question
    card.querySelectorAll('input[type="text"]')[1].oninput = e => {
        q.question = e.target.value;
        saveToLocal(data);
    };
    // Hint
    card.querySelectorAll('input[type="text"]')[2].oninput = e => {
        q.hint = e.target.value;
        saveToLocal(data);
    };
    // Trigger dropdown search with validation
    const triggerInput = card.querySelector('.trigger-search');
    const triggerMenu = card.querySelector('.dropdown-menu');
    const triggerWarning = document.createElement('div');
    triggerWarning.className = 'text-danger small mt-1';
    triggerWarning.style.display = 'none';
    triggerInput.parentNode.appendChild(triggerWarning);
    function updateTriggerMenu() {
        const val = triggerInput.value.toLowerCase();
        triggerMenu.innerHTML = allNumbers.filter(n => n.toLowerCase().includes(val)).map(n => {
            const qObj = data.questions.find(q => q.number === n);
            return `<button class="dropdown-item" type="button" data-qn="${n}">${n} - ${qObj ? qObj.question : ''}</button>`;
        }).join('');
        triggerMenu.querySelectorAll('button').forEach(btn => {
            btn.onclick = () => {
                q.trigger = btn.getAttribute('data-qn');
                triggerInput.value = q.trigger;
                triggerWarning.style.display = 'none';
                saveToLocal(data);
                updateTriggerMenu();
                // Fire change event for summary refresh
                triggerInput.dispatchEvent(new Event('change', { bubbles: true }));
            };
        });
        // Manual entry validation
        if (triggerInput.value && !allNumbers.includes(triggerInput.value)) {
            triggerWarning.textContent = 'Invalid trigger: question number does not exist.';
            triggerWarning.style.display = '';
        } else {
            triggerWarning.style.display = 'none';
        }
    }
    triggerInput.oninput = () => {
        updateTriggerMenu();
        // If invalid, reject assignment
        if (triggerInput.value && !allNumbers.includes(triggerInput.value)) {
            q.trigger = '';
        } else {
            q.trigger = triggerInput.value;
            saveToLocal(data);
        }
        // Fire change event for summary refresh
        triggerInput.dispatchEvent(new Event('change', { bubbles: true }));
    };
    triggerInput.onfocus = () => { triggerMenu.style.display = 'block'; updateTriggerMenu(); };
    triggerInput.onblur = () => { setTimeout(() => { triggerMenu.style.display = 'none'; }, 150); };
    triggerMenu.style.display = 'none';
    updateTriggerMenu();
    // Options
    const optionsDiv = card.querySelector('.options-list');
    const optionsBlock = card.querySelector('.options-block');
    if (["response","sort","checkbox","radio","dropdown"].includes(q.inputType)) {
        q.options = q.options || [];
        q.options.forEach((opt, oidx) => {
            const optDiv = document.createElement('div');
            optDiv.className = 'input-group mb-1';
            optDiv.innerHTML = `<input type="text" class="form-control" value="${typeof opt.label === 'undefined' ? '' : opt.label}" placeholder="Label">
                <input type="text" class="form-control" value="${typeof opt.value === 'undefined' ? '' : opt.value}" placeholder="Value">
                <div class="dropdown">
                    <input type="text" class="form-control option-trigger-search" placeholder="Search trigger..." value="${opt.trigger || ''}">
                    <div class="dropdown-menu show" style="max-height:150px;overflow:auto;"></div>
                </div>
                <button class="btn btn-outline-danger">Delete</button>`;
            // Label
            optDiv.querySelector('input[type="text"]').oninput = e => {
                let val = e.target.value.trim();
                opt.label = val;
                if (!val) {
                    optDiv.querySelector('input[type="text"]').classList.add('is-invalid');
                } else {
                    optDiv.querySelector('input[type="text"]').classList.remove('is-invalid');
                }
                saveToLocal(data);
                optDiv.dispatchEvent(new Event('change', { bubbles: true }));
            };
            // Value (string, cannot be empty)
            optDiv.querySelectorAll('input[type="text"]')[1].oninput = e => {
                let val = e.target.value.trim();
                opt.value = val;
                if (!val) {
                    optDiv.querySelectorAll('input[type="text"]')[1].classList.add('is-invalid');
                } else {
                    optDiv.querySelectorAll('input[type="text"]')[1].classList.remove('is-invalid');
                }
                saveToLocal(data);
                optDiv.dispatchEvent(new Event('change', { bubbles: true }));
            };
            // Option trigger dropdown search with validation
            const optTriggerInput = optDiv.querySelector('.option-trigger-search');
            const optTriggerMenu = optDiv.querySelector('.dropdown-menu');
            const optTriggerWarning = document.createElement('div');
            optTriggerWarning.className = 'text-danger small mt-1';
            optTriggerWarning.style.display = 'none';
            optTriggerInput.parentNode.appendChild(optTriggerWarning);
            function updateOptTriggerMenu() {
                const val = optTriggerInput.value.toLowerCase();
                optTriggerMenu.innerHTML = allNumbers.filter(n => n.toLowerCase().includes(val)).map(n => {
                    const qObj = data.questions.find(q => q.number === n);
                    return `<button class="dropdown-item" type="button" data-qn="${n}">${n} - ${qObj ? qObj.question : ''}</button>`;
                }).join('');
                optTriggerMenu.querySelectorAll('button').forEach(btn => {
                    btn.onclick = () => {
                        opt.trigger = btn.getAttribute('data-qn');
                        optTriggerInput.value = opt.trigger;
                        optTriggerWarning.style.display = 'none';
                        saveToLocal(data);
                        updateOptTriggerMenu();
                    };
                });
                // Manual entry validation
                if (optTriggerInput.value && !allNumbers.includes(optTriggerInput.value)) {
                    optTriggerWarning.textContent = 'Invalid trigger: question number does not exist.';
                    optTriggerWarning.style.display = '';
                } else {
                    optTriggerWarning.style.display = 'none';
                }
            }
            optTriggerInput.oninput = () => {
                updateOptTriggerMenu();
                // If invalid, reject assignment
                if (optTriggerInput.value && !allNumbers.includes(optTriggerInput.value)) {
                    opt.trigger = '';
                } else {
                    opt.trigger = optTriggerInput.value;
                    saveToLocal(data);
                }
            };
            optTriggerInput.onfocus = () => { optTriggerMenu.style.display = 'block'; updateOptTriggerMenu(); };
            optTriggerInput.onblur = () => { setTimeout(() => { optTriggerMenu.style.display = 'none'; }, 150); };
            optTriggerMenu.style.display = 'none';
            updateOptTriggerMenu();
            // Delete
            optDiv.querySelector('button.btn-outline-danger').onclick = () => {
                q.options.splice(oidx, 1);
                saveToLocal(data);
                renderBuilder(data);
            };
            optionsDiv.appendChild(optDiv);
        });
        // Add Option
        card.querySelector('.btn-outline-secondary').onclick = () => {
            // Preserve expanded state for this card
            if (window._questionnaireExpandedState) {
                window._questionnaireExpandedState[q.number || idx] = true;
            }
            q.options.push({ label: '', value: '', trigger: '' });
            saveToLocal(data);
            renderBuilder(data);
        };
        // Type change
        card.querySelector('select').onchange = e => {
            if (window._questionnaireExpandedState) {
                window._questionnaireExpandedState[q.number || idx] = true;
            }
            q.inputType = e.target.value;
            saveToLocal(data);
            renderBuilder(data);
        };
        optionsBlock.style.display = '';
    } else {
        optionsBlock.style.display = 'none';
    }
    return card;
}

function renderConditionalEditor(data) {
    const div = document.createElement('div');
    div.className = 'mb-3';
    div.innerHTML = `<h4>Conditional Questions</h4><div id="conditionalList"></div>`;
    const condDiv = div.querySelector('#conditionalList');
    condDiv.innerHTML = '';
    // List existing conditional questions
    Object.entries(data.conditionalQuestions).forEach(([cqKey, conditions], idx) => {
        // Card UI for conditional question
        const wrapper = document.createElement('div');
        wrapper.className = 'mb-2';
        const summary = document.createElement('div');
        summary.className = 'card card-header';
        summary.style.cursor = 'pointer';
        summary.innerHTML = `<div class="d-flex flex-wrap align-items-center" style="gap:0.5rem;">
            <div style="display:flex; align-items:center; justify-content:space-between; width:100%;">
                <span><strong>${cqKey}</strong></span>
                <span style="display:flex; gap:0.5rem; align-items:center;">
                    <span class="badge bg-secondary">Conditional</span>
                </span>
            </div>
            <div style="width:100%; display:flex; justify-content:center; align-items:center;">
                <span class="text-primary">&#x25BC;</span>
            </div>`;
        const details = document.createElement('div');
    details.className = 'collapse-anim';
    // Make badges and table horizontally scrollable if overflow
    details.style.overflowX = 'auto';
    details.style.maxWidth = '100%';
        // AND/OR toggle with info inside button
        let logicType = conditions.logicType || 'AND';
        const logicToggle = document.createElement('button');
        logicToggle.className = 'btn btn-secondary btn-sm mb-2';
        logicToggle.style.width = '100%';
        logicToggle.innerHTML = `<span>${logicType}</span> <small style="font-weight:normal;">${logicType === 'AND' ? ': All conditions must be met.' : ': Any question\'s condition can be met.'}</small>`;
        logicToggle.onclick = () => {
            logicType = logicType === 'AND' ? 'OR' : 'AND';
            logicToggle.innerHTML = `<span>${logicType}</span> <small style="font-weight:normal;">${logicType === 'AND' ? ': All conditions must be met.' : ': Any question\'s condition can be met.'}</small>`;
            data.conditionalQuestions[cqKey].logicType = logicType;
            saveToLocal(data);
        };
        details.appendChild(logicToggle);
        // Table of conditions
    const condTable = document.createElement('table');
    condTable.className = 'table table-sm table-bordered mb-2';
    condTable.style.width = '100%';
    condTable.style.tableLayout = 'fixed';
    condTable.style.display = 'table';
    condTable.style.overflowX = 'unset';
    condTable.innerHTML = `<thead><tr style="background:#e9ecef;"><th style="width:40%; word-break:break-word;">Question</th><th style="width:40%;">Values</th><th style="width:20%;">Actions</th></tr></thead><tbody></tbody>`;
        const tbody = condTable.querySelector('tbody');
        (conditions.filter ? conditions.filter(c => c !== 'AND' && c !== 'OR') : conditions).forEach((cond, cidx) => {
            if (!Array.isArray(cond)) return;
            const [qn, vals] = cond;
            const qObj = data.questions.find(q => q.number === qn);
            // Show labels for values
            let valueLabels = '';
            if (qObj && Array.isArray(vals)) {
                valueLabels = vals.map(v => {
                    const opt = (qObj.options || []).find(o => o.value == v);
                    return opt ? `<span class='badge bg-light text-dark me-1'>${v} <span class='text-muted'>${opt.label}</span></span>` : `<span class='badge bg-light text-dark me-1'>${v}</span>`;
                }).join('');
            } else {
                valueLabels = Array.isArray(vals) ? vals.join(', ') : vals;
            }
            const tr = document.createElement('tr');
            tr.innerHTML = `<td style="word-break:break-word; white-space:normal;"><span class="badge bg-secondary" style="white-space:normal;">${qn}${qObj ? ' - ' + qObj.question : ''}</span></td>
                <td>${valueLabels}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                    <button class="btn btn-sm btn-outline-danger">Remove</button>
                </td>`;
            // Edit condition
            tr.querySelector('.btn-outline-primary').onclick = () => {
                // Show edit UI inline with dropdown search for question and value
                const allNumbers = data.questions.map(q => q.number);
                const qObjEdit = data.questions.find(q => q.number === qn);
                tr.innerHTML = `<td><div class='dropdown'>
                    <input type='text' class='form-control form-control-sm qn-search' value='${qn}' placeholder='Search question...'>
                    <div class='dropdown-menu show' style='max-height:150px;overflow:auto;'></div>
                </div></td>
                <td class='value-edit-cell'></td>
                <td>
                    <button class='btn btn-sm btn-success me-1'>Save</button>
                    <button class='btn btn-sm btn-secondary'>Cancel</button>
                </td>`;
                // Question dropdown
                const qnInput = tr.querySelector('.qn-search');
                const qnMenu = tr.querySelector('.dropdown-menu');
                function updateQnMenu() {
                    const val = qnInput.value.toLowerCase();
                    qnMenu.innerHTML = allNumbers.filter(n => n.toLowerCase().includes(val)).map(n => {
                        const qObj = data.questions.find(q => q.number === n);
                        return `<button class='dropdown-item' type='button' data-qn='${n}'>${n} - ${qObj ? qObj.question : ''}</button>`;
                    }).join('');
                    qnMenu.querySelectorAll('button').forEach(btn => {
                        btn.onclick = () => {
                            qnInput.value = btn.getAttribute('data-qn');
                            updateQnMenu();
                            updateValueEdit();
                        };
                    });
                }
                qnInput.oninput = updateQnMenu;
                qnInput.onfocus = () => { qnMenu.style.display = 'block'; updateQnMenu(); };
                qnInput.onblur = () => { setTimeout(() => { qnMenu.style.display = 'none'; }, 150); };
                qnMenu.style.display = 'none';
                updateQnMenu();
                // Value field logic
                const valueCell = tr.querySelector('.value-edit-cell');
                function updateValueEdit() {
                    const selectedQn = qnInput.value.trim();
                    const selectedQObj = data.questions.find(q => q.number === selectedQn);
                    if (!selectedQObj) {
                        valueCell.innerHTML = `<input type='text' class='form-control form-control-sm' value='' disabled>`;
                        return;
                    }
                    if (selectedQObj.inputType === 'display') {
                        valueCell.innerHTML = `<span class='text-muted'>No value required for display type.</span>`;
                        return;
                    }
                    if (selectedQObj.inputType === 'response') {
                        valueCell.innerHTML = `<input type='text' class='form-control form-control-sm' value='${Array.isArray(vals) ? vals.join(',') : vals}' placeholder='Enter response value(s)'>`;
                        return;
                    }
                    // For checkbox and sort, allow multiple values selection
                    if (selectedQObj.inputType === 'checkbox') {
                        // Multi-select checkboxes for each option
                        const options = selectedQObj.options || [];
                        valueCell.innerHTML = `<div class='d-flex flex-wrap gap-2'>${options.map(opt => {
                            const checked = Array.isArray(vals) && vals.includes(opt.value) ? 'checked' : '';
                            return `<label class='form-check-label'><input type='checkbox' class='form-check-input' value='${opt.value}' ${checked}> ${opt.value} <span class='text-muted'>${opt.label}</span></label>`;
                        }).join('')}</div>`;
                        return;
                    }
                    if (selectedQObj.inputType === 'sort') {
                        // Treat sort like dropdown for condition editing
                        const options = selectedQObj.options || [];
                        valueCell.innerHTML = `<div class='dropdown'>
                            <input type='text' class='form-control form-control-sm value-search' value='${Array.isArray(vals) ? vals.join(',') : vals}' placeholder='Search value...'>
                            <div class='dropdown-menu show' style='max-height:150px;overflow:auto;'></div>
                        </div>`;
                        const valueInput = valueCell.querySelector('.value-search');
                        const valueMenu = valueCell.querySelector('.dropdown-menu');
                        function updateValueMenu() {
                            const val = valueInput.value.toLowerCase();
                            valueMenu.innerHTML = options.filter(opt => (String(opt.value || '')).toLowerCase().includes(val) || (opt.label || '').toLowerCase().includes(val)).map(opt => {
                                return `<button class='dropdown-item' type='button' data-val='${opt.value}'>${opt.value} - ${opt.label}</button>`;
                            }).join('');
                            valueMenu.querySelectorAll('button').forEach(btn => {
                                btn.onclick = () => {
                                    valueInput.value = btn.getAttribute('data-val');
                                    updateValueMenu();
                                };
                            });
                        }
                        valueInput.oninput = updateValueMenu;
                        valueInput.onfocus = () => { valueMenu.style.display = 'block'; updateValueMenu(); };
                        valueInput.onblur = () => { setTimeout(() => { valueMenu.style.display = 'none'; }, 150); };
                        valueMenu.style.display = 'none';
                        updateValueMenu();
                        return;
                    }
                    // For other types, dropdown search for valid values
                    const options = selectedQObj.options || [];
                    valueCell.innerHTML = `<div class='dropdown'>
                        <input type='text' class='form-control form-control-sm value-search' value='${Array.isArray(vals) ? vals.join(',') : vals}' placeholder='Search value...'>
                        <div class='dropdown-menu show' style='max-height:150px;overflow:auto;'></div>
                    </div>`;
                    const valueInput = valueCell.querySelector('.value-search');
                    const valueMenu = valueCell.querySelector('.dropdown-menu');
                    function updateValueMenu() {
                        const val = valueInput.value.toLowerCase();
                        valueMenu.innerHTML = options.filter(opt => (String(opt.value || '')).toLowerCase().includes(val)).map(opt => {
                            return `<button class='dropdown-item' type='button' data-val='${opt.value}'>${opt.value} - ${opt.label}</button>`;
                        }).join('');
                        valueMenu.querySelectorAll('button').forEach(btn => {
                            btn.onclick = () => {
                                valueInput.value = btn.getAttribute('data-val');
                                updateValueMenu();
                            };
                        });
                    }
                    valueInput.oninput = updateValueMenu;
                    valueInput.onfocus = () => { valueMenu.style.display = 'block'; updateValueMenu(); };
                    valueInput.onblur = () => { setTimeout(() => { valueMenu.style.display = 'none'; }, 150); };
                    valueMenu.style.display = 'none';
                    updateValueMenu();
                }
                updateValueEdit();
                // Save/cancel
                tr.querySelector('.btn-success').onclick = () => {
                    const newQn = qnInput.value.trim();
                    const selectedQObj = data.questions.find(q => q.number === newQn);
                    let newVals = [];
                    if (!selectedQObj) return;
                    if (selectedQObj.inputType === 'display') {
                        newVals = [];
                    } else if (selectedQObj.inputType === 'response') {
                        const valInput = tr.querySelector('.value-edit-cell input');
                        newVals = valInput.value.split(',').map(v => v.trim()).filter(Boolean);
                    } else if (selectedQObj.inputType === 'checkbox') {
                        // Collect checked values (edit UI uses form-check-input, not cond-checkbox)
                        newVals = Array.from(tr.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
                    } else if (selectedQObj.inputType === 'sort') {
                        // Collect value from dropdown search input (single value)
                        const valInput = tr.querySelector('.value-search');
                        newVals = valInput.value ? [valInput.value.trim()] : [];
                        // Only allow valid values
                        newVals = newVals.filter(v => (selectedQObj.options || []).some(opt => opt.value == v));
                    } else {
                        const valInput = tr.querySelector('.value-search');
                        newVals = valInput.value.split(',').map(v => v.trim()).filter(Boolean);
                        // Only allow valid values
                        newVals = newVals.filter(v => (selectedQObj.options || []).some(opt => opt.value == v));
                    }
                    data.conditionalQuestions[cqKey][cidx] = [newQn, newVals];
                    saveToLocal(data);
                    renderBuilder(data);
                };
                tr.querySelector('.btn-secondary').onclick = () => {
                    renderBuilder(data);
                };
            };
            // Remove condition
            tr.querySelector('.btn-outline-danger').onclick = () => {
                data.conditionalQuestions[cqKey].splice(cidx, 1);
                saveToLocal(data);
                renderBuilder(data);
            };
            tbody.appendChild(tr);
        });
        details.appendChild(condTable);
        // Add condition UI
        const addCondDiv = document.createElement('div');
        addCondDiv.className = 'mt-2';
        addCondDiv.innerHTML = `
            <div style="position:relative; display:inline-block; width:100%;">
                <input type="text" class="form-control mb-1 cond-qn-search" placeholder="Search question number..." style="padding-right:2.2em;">
                <button type="button" class="btn btn-light btn-sm cond-qn-clear-btn" style="position:absolute; right:6px; top:50%; transform:translateY(-50%); z-index:10000; display:none; border-radius:50%; width:28px; height:28px; padding:0;">
                    <span style="font-size:1.2em;">&times;</span>
                </button>
                <div class="dropdown-menu show" style="max-height:100px;overflow:auto; position:absolute; left:0; right:0; top:100%; z-index:99999;"></div>
            </div>
            <div style="width:100%; display:flex; flex-direction:row; gap:0.5rem; align-items:stretch; padding-bottom:12px;">
                <div class="cond-value-field" style="flex:1 1 auto; min-height:40px;"></div>
                <button class="btn btn-sm btn-success" style="min-height:40px; padding-top:8px; padding-bottom:8px;">Add Condition</button>
            </div>`;
        const qnInputClear = addCondDiv.querySelector('.cond-qn-search');
        const clearQnBtn = addCondDiv.querySelector('.cond-qn-clear-btn');
        function updateQnClearBtn() {
            clearQnBtn.style.display = qnInputClear.value ? '' : 'none';
        }
        qnInputClear.addEventListener('input', updateQnClearBtn);
        qnInputClear.addEventListener('focus', updateQnClearBtn);
        clearQnBtn.onclick = function() {
            qnInputClear.value = '';
            qnInputClear.dispatchEvent(new Event('input'));
            setTimeout(() => {
                qnInputClear.focus();
                menu.style.display = 'block';
            }, 10);
            updateQnClearBtn();
        };
        updateQnClearBtn();
        const qnInput = addCondDiv.querySelector('.cond-qn-search');
        const menu = addCondDiv.querySelector('.dropdown-menu');
        const valueField = addCondDiv.querySelector('.cond-value-field');
        // Allow all other questions except itself
        const allNumbers = data.questions.map(q => q.number)
            .filter(n => n !== cqKey);
        function updateMenu() {
            const val = qnInput.value.toLowerCase();
            menu.innerHTML = allNumbers.filter(n => n.toLowerCase().includes(val)).map(n => {
                const qObj = data.questions.find(q => q.number === n);
                return `<button class="dropdown-item" type="button" data-qn="${n}">${n} - ${qObj ? qObj.question : ''}</button>`;
            }).join('');
            menu.querySelectorAll('button').forEach(btn => {
                btn.onclick = () => {
                    qnInput.value = btn.getAttribute('data-qn');
                    updateMenu();
                    updateValueField();
                };
            });
        }
        function updateValueField() {
            const qn = qnInput.value.trim();
            const qObj = data.questions.find(q => q.number === qn);
            valueField.innerHTML = '';
            if (!qObj) {
                valueField.innerHTML = `<input type="text" class="form-control mb-1" placeholder="Values (comma separated)" disabled>`;
                return;
            }
            if (qObj.inputType === 'display') {
                valueField.innerHTML = `<span class='text-muted'>No value required for display type.</span>`;
                return;
            }
            if (qObj.inputType === 'response') {
                valueField.innerHTML = `<input type="text" class="form-control mb-1 cond-value-input" placeholder="Enter response value(s)">`;
                return;
            }
            if (qObj.inputType === 'checkbox') {
                const options = qObj.options || [];
                valueField.innerHTML = `<div class='d-flex flex-wrap gap-2 mb-1'>${options.map(opt => {
                    return `<label class='form-check-label'><input type='checkbox' class='form-check-input cond-checkbox' value='${opt.value}'> ${opt.value} <span class='text-muted'>${opt.label}</span></label>`;
                }).join('')}</div>`;
                return;
            }
            // Other types: dropdown search for valid values
            const options = qObj.options || [];
            valueField.innerHTML = `<div class='dropdown' style='width:100%; position:relative; display:flex; align-items:center;'>
                <input type='text' class='form-control cond-value-input' placeholder='Search value...' style='width:100%; padding-right:2.2em;'>
                <button type='button' class='btn btn-light btn-sm cond-clear-btn' style='position:absolute; right:6px; top:50%; transform:translateY(-50%); z-index:10000; display:none; border-radius:50%; width:28px; height:28px; padding:0;'><span style='font-size:1.2em;'>&times;</span></button>
                <div class='dropdown-menu show cond-value-dropdown' style='max-height:180px; min-height:48px; overflow:auto; width:100%; min-width:unset; left:0; right:0; position:absolute; bottom:100%; z-index:2147483647; box-shadow:0 -4px 16px rgba(0,0,0,0.12); border-radius:0.5rem; padding:6px 0;'></div>
            </div>`;
            const valueInputClear = valueField.querySelector('.cond-value-input');
            const valueMenuClear = valueField.querySelector('.cond-value-dropdown');
            const clearBtn = valueField.querySelector('.cond-clear-btn');
            function positionDropdownMenu() {
                if (!valueMenuClear || !valueInputClear) return;
                // Always position dropdown above input
                valueMenuClear.style.top = '';
                valueMenuClear.style.bottom = '100%';
                valueMenuClear.style.boxShadow = '0 -4px 16px rgba(0,0,0,0.12)';
                valueMenuClear.style.width = valueInputClear.offsetWidth + 'px';
            }
            valueInputClear.addEventListener('focus', positionDropdownMenu);
            valueInputClear.addEventListener('input', positionDropdownMenu);
            window.addEventListener('resize', positionDropdownMenu);
            // Show/hide clear button
            function updateClearBtn() {
                clearBtn.style.display = valueInputClear.value ? '' : 'none';
            }
            valueInputClear.addEventListener('input', updateClearBtn);
            valueInputClear.addEventListener('focus', updateClearBtn);
            clearBtn.onclick = function() {
                valueInputClear.value = '';
                valueInputClear.dispatchEvent(new Event('input'));
                valueMenuClear.style.display = 'block';
                valueInputClear.focus();
                updateClearBtn();
            };
            // Popup positioning logic
            const valueInputPos = valueField.querySelector('.cond-value-input');
            const valueMenuPos = valueField.querySelector('.dropdown-menu');
            function positionDropdownMenu() {
                if (!valueMenuPos || !valueInputPos) return;
                // Always position dropdown above input
                valueMenuPos.style.top = '';
                valueMenuPos.style.bottom = '100%';
                valueMenuPos.style.boxShadow = '0 -4px 16px rgba(0,0,0,0.12)';
                valueMenuPos.style.width = valueInputPos.offsetWidth + 'px';
            }
            valueInputPos.addEventListener('focus', positionDropdownMenu);
            valueInputPos.addEventListener('input', positionDropdownMenu);
            window.addEventListener('resize', positionDropdownMenu);
            const valueInput = valueField.querySelector('.cond-value-input');
            const valueMenu = valueField.querySelector('.dropdown-menu');
            function updateValueMenu() {
                const val = valueInput.value.toLowerCase();
                valueMenu.innerHTML = options.filter(opt => (String(opt.value || '')).toLowerCase().includes(val)).map(opt => {
                    return `<button class='dropdown-item' type='button' data-val='${opt.value}'>${opt.value} - ${opt.label}</button>`;
                }).join('');
                valueMenu.querySelectorAll('button').forEach(btn => {
                    btn.onclick = () => {
                        valueInput.value = btn.getAttribute('data-val');
                        updateValueMenu();
                    };
                });
            }
            valueInput.oninput = updateValueMenu;
            valueInput.onfocus = () => { valueMenu.style.display = 'block'; updateValueMenu(); };
            valueInput.onblur = () => { setTimeout(() => { valueMenu.style.display = 'none'; }, 150); };
            valueMenu.style.display = 'none';
            updateValueMenu();
        }
        qnInput.oninput = () => { updateMenu(); updateValueField(); };
        qnInput.onfocus = () => { menu.style.display = 'block'; updateMenu(); };
        qnInput.onblur = () => { setTimeout(() => { menu.style.display = 'none'; }, 150); };
        menu.style.display = 'none';
        updateMenu();
        updateValueField();
        // Add condition
        addCondDiv.querySelector('.btn-success').onclick = () => {
            const qn = qnInput.value.trim();
            const qObj = data.questions.find(q => q.number === qn);
            let vals = [];
            let errorMsg = addCondDiv.querySelector('.cond-add-error');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'text-danger small cond-add-error mb-1';
                addCondDiv.appendChild(errorMsg);
            }
            if (!allNumbers.includes(qn)) {
                errorMsg.textContent = 'Invalid question number.';
                return;
            }
            if (!qObj) {
                errorMsg.textContent = 'Please select a valid question.';
                return;
            }
            if (qObj.inputType === 'display') {
                vals = [];
            } else if (qObj.inputType === 'response') {
                const valInput = addCondDiv.querySelector('.cond-value-input');
                vals = valInput.value.split(',').map(v => v.trim()).filter(Boolean);
            } else if (qObj.inputType === 'checkbox') {
                vals = Array.from(addCondDiv.querySelectorAll('.cond-checkbox:checked')).map(cb => cb.value);
            } else {
                const valInput = addCondDiv.querySelector('.cond-value-input');
                vals = valInput.value.split(',').map(v => v.trim()).filter(Boolean);
                vals = vals.filter(v => (qObj.options || []).some(opt => opt.value == v));
            }
            if (!vals.length && qObj.inputType !== 'display') {
                errorMsg.textContent = 'Please enter at least one value.';
                return;
            }
            errorMsg.textContent = '';
            if (!data.conditionalQuestions[cqKey].filter) {
                data.conditionalQuestions[cqKey] = data.conditionalQuestions[cqKey].filter(c => c !== 'AND' && c !== 'OR');
            }
            data.conditionalQuestions[cqKey].push([qn, vals]);
            saveToLocal(data);
            renderBuilder(data);
        };
        details.appendChild(addCondDiv);
        // Delete conditional question
        const delBtn = document.createElement('button');
        delBtn.className = 'btn btn-sm btn-danger mt-2';
        delBtn.style.minHeight = '40px';
        delBtn.style.width = '100%';
        delBtn.style.paddingTop = '8px';
        delBtn.style.paddingBottom = '8px';
        delBtn.textContent = 'Delete Conditional Question';
        delBtn.onclick = () => {
            // add a confirmation dialog
            if (confirm('Are you sure you want to delete this conditional question?')) {
                delete data.conditionalQuestions[cqKey];
                saveToLocal(data);
                renderBuilder(data);
            }
        };
        details.appendChild(delBtn);
        // Collapsible logic
        let expandedState = window._conditionalExpandedState || (window._conditionalExpandedState = {});
        if (typeof expandedState[cqKey] === 'undefined') expandedState[cqKey] = false;
        function setExpanded(expanded) {
            expandedState[cqKey] = expanded;
            if (expanded) {
                details.classList.add('open');
                summary.querySelector('span.text-primary').innerHTML = '&#x25B2;';
            } else {
                details.classList.remove('open');
                summary.querySelector('span.text-primary').innerHTML = '&#x25BC;';
            }
        }
        summary.onclick = () => {
            setExpanded(!expandedState[cqKey]);
        };
        setExpanded(expandedState[cqKey]);
        wrapper.appendChild(summary);
        wrapper.appendChild(details);
        condDiv.appendChild(wrapper);
    });
    // Add new conditional question UI
    const addNewDiv = document.createElement('div');
    addNewDiv.className = 'mt-3';
    addNewDiv.innerHTML = `
        <div style="width:100%; display:flex; flex-direction:row; gap:0.5rem; align-items:stretch;">
            <div style="position:relative; width:100%;">
                <input type="text" class="form-control new-qn-search" placeholder="Search conditional question number..." style="width:100%; min-height:40px;">
                <div class="dropdown-menu show" style="max-height:300px;overflow:auto; position:absolute; left:0; right:0; bottom:100%; z-index:99999;"></div>
            </div>
            <button class="btn btn-secondary add-cond-btn" style="min-height:40px;">Add</button>
        </div>
        <div class="text-danger small mb-1" style="display:none;" id="newQnError"></div>
    `;
    const newQnInput = addNewDiv.querySelector('.new-qn-search');
    const newQnMenu = addNewDiv.querySelector('.dropdown-menu');
    const addCondBtn = addNewDiv.querySelector('.add-cond-btn');
    const errorDiv = addNewDiv.querySelector('#newQnError');
    // Only allow non-compulsory questions to be conditional
    const allNumbers = data.questions.map(q => q.number).filter(n => !data.compulsoryQuestions.includes(n));
    function updateNewQnMenu() {
        const val = newQnInput.value.toLowerCase();
        newQnMenu.innerHTML = allNumbers.filter(n => n.toLowerCase().includes(val)).map(n => {
            const qObj = data.questions.find(q => q.number === n);
            return `<button class='dropdown-item' type='button' data-qn='${n}'>${n} - ${qObj ? qObj.question : ''}</button>`;
        }).join('');
        newQnMenu.querySelectorAll('button').forEach(btn => {
            btn.onclick = () => {
                newQnInput.value = btn.getAttribute('data-qn');
                newQnMenu.style.display = 'none';
            };
        });
    }
    newQnInput.oninput = updateNewQnMenu;
    newQnInput.onfocus = () => { newQnMenu.style.display = 'block'; updateNewQnMenu(); };
    newQnInput.onblur = () => { setTimeout(() => { newQnMenu.style.display = 'none'; }, 150); };
    newQnMenu.style.display = 'none';
    updateNewQnMenu();
    addCondBtn.onclick = () => {
        const qn = newQnInput.value.trim();
        if (!qn) {
            errorDiv.textContent = 'Please enter a valid question number.';
            errorDiv.style.display = '';
            return;
        }
        if (!allNumbers.includes(qn)) {
            errorDiv.textContent = 'Invalid question number or it is already compulsory.';
            errorDiv.style.display = '';
            return;
        }
        if (data.conditionalQuestions[qn]) {
            errorDiv.textContent = 'Conditional question already exists for this number.';
            errorDiv.style.display = '';
            return;
        }
        errorDiv.style.display = 'none';
        // Default to empty array, not {logicType: 'AND'}
        data.conditionalQuestions[qn] = [];
        saveToLocal(data);
        renderBuilder(data);
    };
    condDiv.appendChild(addNewDiv);
    return div;
}

// Download logic
function downloadQuestionJS(data) {
    // Triggers: move triggers from options to parent question
    data.questions.forEach(q => {
        if (q.options && q.options.length) {
            q.options.forEach(opt => {
                if (opt.trigger) {
                    // Store trigger in parent if not already
                    if (!q.trigger) q.trigger = opt.trigger;
                }
                // Ensure label and value are always present as string (including empty)
                if (typeof opt.label === 'undefined') opt.label = '';
                if (typeof opt.value === 'undefined') opt.value = '';
            });
        }
    });
    // Format as question.js
    let js = '';
    js += `htmlTitle = ${JSON.stringify(data.htmlTitle)};\n`;
    js += `title = ${JSON.stringify(data.title)};\n`;
    js += `compulsoryQuestions = ${JSON.stringify(data.compulsoryQuestions)};\n`;
    js += `questions = ${JSON.stringify(data.questions, null, 2)};\n`;
    js += `conditionalQuestions = ${JSON.stringify(data.conditionalQuestions, null, 2)};\n`;
    // Download
    const blob = new Blob([js], { type: 'text/javascript' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'question.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Reset
    resetLocal();
    renderStartOptions();
}

// Main
window.onload = async function() {
    let data = loadFromLocal();
    if (!data) renderStartOptions();
    else renderBuilder(data);

    document.getElementById('startScratchBtn').onclick = () => {
        document.getElementById('startScratchBtn').style.display = 'none';
        document.getElementById('editExistingBtn').style.display = 'none';
        data = JSON.parse(JSON.stringify(DEFAULT_QUESTIONNAIRE));
        saveToLocal(data);
        renderBuilder(data);
    };
    document.getElementById('editExistingBtn').onclick = async () => {
        document.getElementById('startScratchBtn').style.display = 'none';
        document.getElementById('editExistingBtn').style.display = 'none';
        data = await loadExistingQuestions();
        saveToLocal(data);
        renderBuilder(data);
    };
    document.getElementById('downloadBtn').onclick = () => {
        if (data.compulsoryQuestions.length === 0) {
            alert('You must add at least one compulsory question before downloading. No questions will be shown if none is specified.');
            return;
        }
        if (!data.htmlTitle || !data.htmlTitle.trim()) {
            alert('HTML Title is required before downloading.');
            return;
        }
        if (!data.title || !data.title.trim()) {
            alert('Questionnaire Title is required before downloading.');
            return;
        }
        if (!confirm('Are you sure you want to download your questionnaire?')) return;
        downloadQuestionJS(data);
        document.getElementById('startScratchBtn').style.display = '';
        document.getElementById('editExistingBtn').style.display = '';
    };
    document.getElementById('resetBtn').onclick = () => {
        if (confirm('Are you sure you want to reset and clear all your progress? This cannot be undone.')) {
            resetLocal();
            renderStartOptions();
            document.getElementById('startScratchBtn').style.display = '';
            document.getElementById('editExistingBtn').style.display = '';
        }
    };
};
