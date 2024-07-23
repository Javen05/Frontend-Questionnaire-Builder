/**
 * Generate Question object on HTML element
 * @param {*} questionNumber 
 * @param {*} question 
 * @param {*} inputType 
 * @param {*} options 
 * @param {*} trigger 
 * @params hint
 * @returns 
 */
function generateQuestion(questionNumber, question, inputType, options, trigger, hint='') {
  const defaultOption =
    '<option value="" disabled selected>Please select an option</option>'; // placeholder for dropdown
  let html = `
        <div class="form-group question ${
          compulsoryQuestions.includes(questionNumber) ? "" : "d-none"
                }" data-question="${questionNumber}">
                    <label><strong>Question ${questionNumber}</strong>: ${
            inputType != "display" ? question : ""}
            ${hint ? `<small class="form-text text-muted">${hint}</small>` : ""}</label>
    `;

  inputType ? inputType.toLowerCase() : "dropdown"; // default to dropdown if no inputType is provided

  switch (inputType) {
    case "radio":
      if (Array.isArray(options)) {
        options.forEach((option) => {
          html += `
                    <div class="form-check">
                        <input class="form-check-input" type="${inputType}" name="question${questionNumber}" id="q${questionNumber}option${
            option.value
          }" value="${option.value}" data-trigger="${option.trigger || ""}">
                        <label class="form-check-label" for="q${questionNumber}option${
            option.value
          }">${option.label}</label>
                    </div>
                `;
        });
      } else {
        console.error(
          "generateQuestion: options is not an array for radio input type",
          { questionNumber, options }
        );
      }
      break;
    case "checkbox":
      if (Array.isArray(options)) {
        options.forEach(function (option) {
          html += '<div class="form-check">';
          html +=
            '<input class="form-check-input" type="checkbox" id="q' +
            questionNumber +
            "option" +
            option.value +
            '" value="' +
            option.value +
            '" data-trigger="' +
            (option.trigger ? option.trigger : "") +
            '">';
          html +=
            '<label class="form-check-label" for="q' +
            questionNumber +
            "option" +
            option.value +
            '">' +
            option.label +
            "</label>";
          html += "</div>";
        });
      } else {
        console.error(
          "generateQuestion: options is not an array for checkbox input type",
          { questionNumber, options }
        );
      }
      break;
      case "response":
        html += `
                  <div class="response-input">
                      <input class="form-control" type="text" id="q${questionNumber}response" name="question${questionNumber}response" placeholder="Your response" data-trigger="${
          trigger || ""
        }">
              `;
  
        if (Array.isArray(options) && options.length > 0) {
          options.forEach((option) => {
            html += `
                      <div class="form-check">
                          <input class="form-check-input" type="radio" name="question${questionNumber}" id="q${questionNumber}option${option.value}" value="${option.value}" data-trigger="${option.trigger || ""}">
                          <label class="form-check-label" for="q${questionNumber}option${option.value}">${option.label}</label>
                      </div>
                  `;
          });
        } 
  
        html += `
                  </div>
                  <br>
                  <button type="button" class="btn btn-secondary clear-radio">Clear</button> ${
                    trigger
                      ? `<button type="button" class="btn btn-primary proceed-btn" data-trigger="${trigger}">Proceed</button>`
                      : ""
                  }
              `;
        break;
    case "display":
      html += `
                <div class="display-text">${question}</div>
                ${
                  trigger
                    ? `<button type="button" class="btn btn-primary proceed-btn float-right" data-trigger="${trigger}">Proceed</button>`
                    : ""
                }
            `;
      break;

    case "sort":
      if (Array.isArray(options)) {
        html += `
              <ul id="sortable${questionNumber}" class="sortable-list" data-question="${questionNumber}">
          `;
        options.forEach((option, index) => {
          html += `
              <li class="sortable-item" draggable="true" data-value="${option.value}" data-trigger="${option.trigger || ""}">
                  ${option.label}
                  <span class="badge badge-pill float-right">${index + 1}</span>
              </li>
          `;
        });
        html += `
              </ul>
              ${
                trigger
                  ? `<button type="button" class="btn btn-primary proceed-btn float-right" data-trigger="${trigger}">Proceed</button>`
                  : ""
              }
          `;
      } else {
        console.error(
          "generateQuestion: options is not an array for sort input type",
          { questionNumber, options }
        );
      }
      break;

    default:
      html += `
                <select class="form-control" data-question="${questionNumber}">
                    ${defaultOption}
                    ${
                      Array.isArray(options)
                        ? options
                            .map(
                              (option) =>
                                `<option value="${
                                  option.value
                                }" data-trigger="${option.trigger || ""}">${
                                  option.label
                                }</option>`
                            )
                            .join("")
                        : console.error(
                            "generateQuestion: options is not an array for default input type",
                            { questionNumber, options }
                          )
                    }
                </select>
            `;
      break;
  }

  html += "</div>";
  return html;
}


/**
 * Stores selected option(s) value in questionValues array
 * @returns {Array} questionValues
 */
function storeQuestionValues() {
  var questionValues = [];
  document.querySelectorAll(".question").forEach(function (element) {
    if (!element.classList.contains("d-none")) {
      const select = element.querySelector("select");
      const responseInput = element.querySelector('input[type="text"]');
      const checkboxes = element.querySelectorAll(
        'input[type="checkbox"]:checked'
      );
      const radioButton = element.querySelector('input[type="radio"]:checked');
      const sortableList = element.querySelector(".sortable-list");
      const questionNumber = element.getAttribute("data-question"); // Get the question number
      var selectedOption;
      if (select) {
        selectedOption = select.options[select.selectedIndex];
      } else if (checkboxes.length > 0) {
        selectedOption = Array.from(checkboxes).map(
          (checkbox) => checkbox.value
        );
      } else if (sortableList) {
        console.log(sortableList)
        const listForOrder = [];
        sortableList.querySelectorAll('.sortable-item').forEach((item, index) => {
          const value = item.getAttribute('data-value');
          listForOrder.push([`${index+1}: ${value}`])
        });
        questionValues.push({ number: questionNumber, value: listForOrder });

      } else {
        selectedOption = radioButton;
      }
      var selectedValue = selectedOption
        ? Array.isArray(selectedOption)
          ? selectedOption
          : selectedOption.value
        : responseInput
        ? responseInput.value
        : ""; // Handle null responseInput
      // sanitise potential dirty input day for numeric fields
      if (/^\d/.test(selectedValue) && !selectedValue.includes(",") && selectedValue.includes(" ")) {
        selectedValue = selectedValue.split(" ")[0];
      }
      questionValues.push({ number: questionNumber, value: selectedValue });
    }
  });

  return questionValues;
}


/**
 * Get question value for the question number
 * @param {*} questionValues 
 * @param {*} questionNumber 
 * @returns question value
 */
function getQuestionValueByNumber(questionValues, questionNumber) {
  if (!Array.isArray(questionValues)) {
    questionValues = Object.values(questionValues); // Convert to array
  }
  let question = questionValues.find(q => q.number === questionNumber);
  return question ? question.value : null; // Returns null if not found
}


function updateQuestionPool(questionNumber, questionPool) {
  questionValues = storeQuestionValues();

  const questionElement = document.querySelector(
    `[data-question="${questionNumber}"]`
  );
  if (questionElement === null) {
    console.error("updateQuestionPool: questionElement is null", {
      questionNumber,
    });
    return;
  }

  const inputType = questionElement.querySelector("select")
    ? "select"
    : questionElement.querySelector('input[type="text"]')
    ? "response"
    : questionElement.querySelector('input[type="checkbox"]')
    ? "checkbox"
    : questionElement.querySelector(".display-text")
    ? "display"
    : questionElement.querySelector(".sortable-list")
    ? "sort"
    : "radio";

  let selectedOptions = [];
  if (inputType === "radio") {
    selectedOptions = Array.from(
      document.querySelectorAll(`[name="question${questionNumber}"]:checked`)
    ).map((option) => option.getAttribute("data-trigger"));

  } else if (inputType === "checkbox") {
    selectedOptions = Array.from(
      document.querySelectorAll(
        `[data-question="${questionNumber}"] input:checked`
      )
    ).map((option) => option.getAttribute("data-trigger"));

  } else if (inputType === "response") {
    const responseInput = document.querySelector(
      `[data-question="${questionNumber}"] input[type="text"]`
    );
    const radioInput = document.querySelector(
      `[data-question="${questionNumber}"] input[type="radio"]:checked`
    );

    if (responseInput.value !== '') {
        selectedOptions = [responseInput.getAttribute("data-trigger")];
    } else if (radioInput) {
        selectedOptions = [radioInput.getAttribute("data-trigger")];
    } else {
        selectedOptions = [];
    }
    // for default case where same trigger is specified for all options in the question
    if (selectedOptions[0] === null) {
      selectedOptions = [responseInput.getAttribute("data-trigger")];
    }

  } else if (inputType === "display") {
    selectedOptions = Array.from(
      document.querySelectorAll(
        `[data-question="${questionNumber}"] button.proceed-btn`
      )
    ).map((option) => option.getAttribute("data-trigger"));

  } else if (inputType === "sort") {
    const sortableItems = document.querySelectorAll(
      `[data-question="${questionNumber}"] .sortable-item`
    )
    const proceedButton = document.querySelector(
      `[data-question="${questionNumber}"] button.proceed-btn`
    );
    if (proceedButton) {
      selectedOptions = [proceedButton.getAttribute("data-trigger")];
    } if (sortableItems.length > 0 && sortableItems[0].dataset.trigger != "") {
      selectedOptions = [sortableItems[0].dataset.trigger];
      
    }
  } else { // select a.k.a dropdown
    selectedOptions = Array.from(
      document.querySelectorAll(
        `[data-question="${questionNumber}"] option:checked`
      )
    ).map((option) => option.getAttribute("data-trigger"));
  }

  if (inputType != "sort") {
    questionPool[questionNumber] = selectedOptions.filter((option) => option);
    for (const option of selectedOptions) {
      questionPool[option] = [];
    }
  }

  // Check if any conditional question should be added to the question pool
  for (const question in conditionalQuestions) {
    let conditionMet = true;
    if (conditionalQuestions[question].slice(-1)[0] == 'or') {
      conditionMet = false;
      for (const condition of conditionalQuestions[question]) {
        if (condition === 'or') { continue; } // skip tag as it's not a conditional question
        let [conditionQuestion, conditionValues, option] = condition;
        conditionValues = conditionValues.map((val) => val.toString()); // parse the condition values to string to match with query selectors string type
        // select from all question types
        const selectedRadio = questionContainer.querySelector(
          `[data-question="${conditionQuestion}"] input[type="radio"]:checked`
        );
        const selectedCheckbox = questionContainer.querySelectorAll(
          `[data-question="${conditionQuestion}"] input[type="checkbox"]:checked`
        );
        const selectedResponse = questionContainer.querySelector(
          `[data-question="${conditionQuestion}"] input[type="text"]`
        );
        const selectedDropdown = questionContainer.querySelector(
          `[data-question="${conditionQuestion}"] option:checked`
        );

        // combine all non-null values into array
        const selectedOptions = [
          selectedRadio && selectedRadio.value,
          ...(selectedCheckbox
            ? Array.from(selectedCheckbox).map((checkbox) => checkbox.value)
            : []),
          selectedResponse && selectedResponse.value,
          selectedDropdown && selectedDropdown.value,
        ].filter((option) => option !== undefined && option !== null);

        if (option === "or") {
          // any value in conditionValues is in selectedOptions
          conditionMet = conditionValues.some((val) =>
            selectedOptions.includes(val)
          );
          conditionMet = true;
          continue;
        } else if (
          conditionValues.some((val) => val.startsWith("~")) &&
          (!selectedOptions.includes("") || !selectedOptions.includes(''))
        ) {
          // slice out any '~' value in conditionValues
          conditionValues = conditionValues.map((val) => val.replace("~", ""));
          // any value in conditionValues is not in selectedOptions
          conditionMet = conditionValues.every(
            (val) => !selectedOptions.includes(val)
          );
        } else if (
          conditionValues.every((val) => selectedOptions.includes(val))
        ) {
          conditionMet = true;
        }
      }
      
    } else {
        for (const condition of conditionalQuestions[question]) {
          if (!conditionMet) { break; } // continue to next condition if condition is not met
          let [conditionQuestion, conditionValues, option] = condition;
          conditionValues = conditionValues.map((val) => val.toString()); // parse the condition values to string to match with query selectors string type
          // select from all question types
          const selectedRadio = questionContainer.querySelector(
            `[data-question="${conditionQuestion}"] input[type="radio"]:checked`
          );
          const selectedCheckbox = questionContainer.querySelectorAll(
            `[data-question="${conditionQuestion}"] input[type="checkbox"]:checked`
          );
          const selectedResponse = questionContainer.querySelector(
            `[data-question="${conditionQuestion}"] input[type="text"]`
          );
          const selectedDropdown = questionContainer.querySelector(
            `[data-question="${conditionQuestion}"] option:checked`
          );

          // combine all non-null values into array
          const selectedOptions = [
            selectedRadio && selectedRadio.value,
            ...(selectedCheckbox
              ? Array.from(selectedCheckbox).map((checkbox) => checkbox.value)
              : []),
            selectedResponse && selectedResponse.value,
            selectedDropdown && selectedDropdown.value,
          ].filter((option) => option !== undefined && option !== null);

          if (option === "or") {
            // any value in conditionValues is in selectedOptions
            conditionMet = conditionValues.some((val) =>
              selectedOptions.includes(val)
            );
          } else if (
            conditionValues.some((val) => val.startsWith("~")) &&
            (!selectedOptions.includes("") || !selectedOptions.includes(''))
          ) {
            // slice out any '~' value in conditionValues
            conditionValues = conditionValues.map((val) => val.replace("~", ""));
            // any value in conditionValues is not in selectedOptions
            conditionMet = conditionValues.every(
              (val) => !selectedOptions.includes(val)
            );
          } else if (
            !conditionValues.every((val) => selectedOptions.includes(val))
          ) {
            conditionMet = false;
          }
        }
    }

    if (conditionMet || Object.values(questionPool).flat().includes(question)) {
      // if question does not exist in questionPool, add it
      if (!questionPool[question]) {
        compulsoryQuestions.push(question); // utilize compulsoryQuestions mechanism to ensure question won't get removed.
        questionPool[question] = [];
      }
    } else {
      compulsoryQuestions = compulsoryQuestions.filter((q) => q !== question);
      delete questionPool[question];
    }
  }

  // if any key in questionPool not in compulsoryQuestions or value of questionPool, drop it
  for (const key in questionPool) {
    if (
      !compulsoryQuestions.includes(key) &&
      !Object.values(questionPool).flat().includes(key)
    ) {
      delete questionPool[key];
    }
  }

  // compare questionPool with lagQuestionPool to check what questions are removed or added
  const removedQuestions = Object.keys(lagQuestionPool)
    .flat()
    .filter((question) => !Object.keys(questionPool).includes(question));
  const addedQuestions = Object.keys(questionPool)
    .flat()
    .filter(
      (question) => !Object.keys(lagQuestionPool).flat().includes(question)
    );

  // edit the DOM to reflect the changes
  removedQuestions.forEach((question) => {
    // add d-none to the question and clear selection if any
    const questionElement = document.querySelector(
      `[data-question="${question}"]`
    );
    if (questionElement) {
      questionElement.classList.add("d-none");

      // Clear selection for removed question
      const select = questionElement.querySelector("select");
      const responseInput = questionElement.querySelector('input[type="text"]');
      const checkboxes = questionElement.querySelectorAll('input[type="checkbox"]');
      const radioButtons = questionElement.querySelectorAll('input[type="radio"]');

      // Reset select input
      if (select) {
        select.selectedIndex = 0; // Reset select to default option
      }

      // Reset text input
      if (responseInput) {
        responseInput.value = "";
      }

      // Reset checkbox inputs
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });

      // Reset radio button inputs
      radioButtons.forEach((radioButton) => {
        radioButton.checked = false;
      });

    } else {
      console.error(
        "updateQuestionPool: questionElement for removed question is null",
        { question }
      );
    }
  });
  addedQuestions.forEach((q) => {
    // remove d-none from the question
    const questionElement = document.querySelector(`[data-question="${q}"]`);
    if (questionElement) {
      questionElement.classList.remove("d-none");
    } else {
      console.error(
        "updateQuestionPool: questionElement for added question is null",
        { question: q }
      );
    }
  });

  updateLocalStorage(questionPool, questionValues);
  lagQuestionPool = { ...questionPool };
}


function updateLocalStorage(questionPool, questionValues) {
  localStorage.setItem("questionPool", JSON.stringify(questionPool));
  localStorage.setItem("questionValues", JSON.stringify(questionValues));
}


function handleQuestionChange(event, questionPool) {
  const target = event.target;
  const questionElement = target.closest(".question");
  if (questionElement === null) {
    console.error("handleQuestionChange: questionElement is null", { target });
    return;
  }
  const questionNumber = questionElement.getAttribute("data-question");
  updateQuestionPool(questionNumber, questionPool);
}


/**
 * Initialize variables
 */
const questionContainer = document.getElementById("questionContainer");
const questionForm = document.getElementById("questionForm");
const storedQuestionPool = localStorage.getItem("questionPool");
const storedQuestionValues = localStorage.getItem("questionValues");


/**
 * Loading of page
 */
// 1. Initialize questionPool
var questionPool = {};

// 2. Check if have unsubmitted data stored in local storage
let hasUnsubmittedData = (storedQuestionPool && storedQuestionValues && storedQuestionPool != 'undefined' && storedQuestionValues != 'undefined');

// 3. Generate questions
questions.forEach((q) => {
  questionContainer.innerHTML += generateQuestion(
    q.number,
    q.question,
    q.inputType,
    q.options,
    q.trigger,
    q.hint
  );
});

// 4. Unhide any existing questions
if (hasUnsubmittedData) {
  console.log("Stored questionPool:", storedQuestionPool);
  console.log("Stored questionValues:", storedQuestionValues);

  questionPool = JSON.parse(storedQuestionPool);
  questionValues = JSON.parse(storedQuestionValues);

  // Display questions in questionPool on HTML page
  Object.keys(questionPool).forEach((questionNumber) => {
    // ensure qn not deleted if it should be showing
    if (Object.keys(conditionalQuestions).flat().includes(questionNumber)) {
      compulsoryQuestions.push(questionNumber);
    }

    // display question on HTML
    const questionElement = document.querySelector(`.question[data-question="${questionNumber}"]`);
    if (questionElement) {
      questionElement.classList.remove("d-none");
    }
    // Also activate triggered questions that are not answered
    questionPool[questionNumber].forEach((subQuestionNumber) => {
      const subQuestionElement = document.querySelector(`.question[data-question="${subQuestionNumber}"]`);
      if (subQuestionElement) {
        subQuestionElement.classList.remove("d-none");
      }
    });
  });
}

// 5. Setup lagQuestionPool to store how it should look before changes.
lagQuestionPool = { ...questionPool };

//6. Select the option with the same value(s) in questionValues
if (hasUnsubmittedData) {
  questionValues.forEach((question) => {
    const questionNumber = question.number;
    const value = question.value;
    const questionObj = questions.find(q => q.number == questionNumber);

    if (questionObj) {
      const inputType = questionObj.inputType;

      if (inputType === "radio" || inputType === "checkbox") {
        const options = document.querySelectorAll(`input[name="question${questionNumber}"]`);
        options.forEach((option) => {
          if (Array.isArray(value)) {
            if (value.includes(option.value)) {
              option.checked = true;
            }
          } else {
            if (option.value == value) {
              option.checked = true;
            }
          }
        });
      } else if (inputType === "response") {
        document.getElementById(`q${questionNumber}response`).value = value;
      } else if (inputType === "sort") {
        const sortableList = document.querySelector(`.sortable-list[data-question="${questionNumber}"]`);
        if (sortableList) {
          const order = [];
          
          // Extract values without using map
          for (let i = 0; i < value.length; i++) {
            const val = value[i][0].split(": ")[1];
            if (val) {
              order.push(val);
            }
          }
          
          const items = sortableList.querySelectorAll('.sortable-item');
          for (let i = 0; i < order.length; i++) {
            const val = order[i];
            const item = Array.from(items).find((item) => item.getAttribute('data-value') === val);
            if (item) {
              sortableList.appendChild(item);
            }
          }
        }
      } else {
        const selectElement = document.querySelector(`select[data-question="${questionNumber}"]`);
        if (selectElement) {
          selectElement.value = value;
        }
      }
    } 
  });
}


/**
 * Event Listener to update HTML Accordingly
 */
// Event listener for radio box clear button in response type question
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("clear-radio")) {
    const questionElement = event.target.closest(".question");
    if (questionElement === null) {
      console.error("clear-radio click handler: questionElement is null", {
        target: event.target,
      });
      return;
    }
    const questionNumber = questionElement.getAttribute("data-question");
    document
      .querySelectorAll(`[name="question${questionNumber}"]`)
      .forEach((input) => {
        if (input.type === "radio") {
          input.checked = false;
        }
        // update question
        updateQuestionPool(questionNumber, questionPool);
      });
  }
  if (event.target.classList.contains("proceed-btn")) {
    const trigger = event.target.getAttribute("data-trigger");
    const questionElement = event.target.closest(".question");
    if (questionElement === null) {
      console.error("proceed-btn click handler: questionElement is null", {
        target: event.target,
      });
      return;
    }
    const questionNumber = questionElement.getAttribute("data-question");
    updateQuestionPool(questionNumber, questionPool);
  }
});

// Event listener for response input and radio box inputs
document.addEventListener("change", function (event) {
  handleQuestionChange(event, questionPool);
  const target = event.target;
  if (target && target.matches('.response-input input[type="text"]')) {
    const questionElement = target.closest(".question");
    if (questionElement === null) {
      console.error("response-input change handler: questionElement is null", {
        target,
      });
      return;
    }
    const questionNumber = questionElement.getAttribute("data-question");
    // Clear radio box inputs
    document
      .querySelectorAll(`[name="question${questionNumber}"]:checked`)
      .forEach((input) => {
        input.checked = false;
      });
  } else if (target && target.matches('.response-input input[type="radio"]')) {
    // Clear radio box for response-type
    const questionElement = target.closest(".question");
    if (questionElement === null) {
      console.error("radio input change handler: questionElement is null", {
        target,
      });
      return;
    }
    const questionNumber = questionElement.getAttribute("data-question");
    // Clear text input
    const responseInput = document.getElementById(`q${questionNumber}response`);
    if (responseInput) {
      responseInput.value = "";
    } else {
      console.error("radio input change handler: responseInput is null", {
        questionNumber,
      });
    }
  } else if (target && target.matches('.response-input input[type="checkbox"]')) {
    const questionElement = target.closest(".question");
    if (questionElement === null) {
      console.error("checkbox input change handler: questionElement is null", {
        target,
      });
      return;
    }
    const questionNumber = questionElement.getAttribute("data-question");
    // Clear text input
    const responseInput = document.getElementById(`q${questionNumber}response`);
    if (responseInput) {
      responseInput.value = "";
    } else {
      console.error("checkbox input change handler: responseInput is null", {
        questionNumber,
      });
    }
  }
});
document.getElementById("questionForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission
  var confirmationCheckbox = document.getElementById("confirmationCheckbox");
  if (!confirmationCheckbox.checked) {
    alert("Please confirm that your answers are correct before submitting.");
    return; // Prevent form submission if the checkbox is not checked
  }

  questionValues = storeQuestionValues();

  let openInNewTab = document.getElementById('newTabCheckbox').checked;
  if (openInNewTab) {
    let URL = "results.html?data="
    window.open(URL + encodeURIComponent(JSON.stringify(questionValues)));
    
  } else {
    var ID = prompt("Please enter ID:");
    if (ID === null) {
      return
    }
    if (ID == 'questionValues' || ID == 'questionPool') {
      alert("This ID is not allowed. Please enter a different ID.");
      return;
    }
    if (ID) {
      // strip any -_ characters from ID
      ID = ID.replace(/-_/g, "");
    }

    if (ID === undefined || ID === null || ID === "") {
      // randomly assign ID
      ID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    timestamp = new Date().toISOString();
    // Store the form data, name, and ID in localStorage
    var userData = {
      ID: ID,
      Timestamp: timestamp,
      FormData: questionValues,
      questionPool: questionPool,
      questionValues: questionValues
    };

    // clear questionPool and questionValues from localStorage
    localStorage.removeItem("questionPool");
    localStorage.removeItem("questionValues");

    localStorage.setItem(ID + "-_" + timestamp, JSON.stringify(userData));
    window.location.href = "results.html";
  }
});

// Sorting mechanism for 'sort' questionType
document.addEventListener('DOMContentLoaded', () => {
  let draggedItem = null;
  let originalContainer = null;

  document.querySelectorAll('.sortable-list').forEach(sortableList => {
    sortableList.addEventListener('dragstart', (event) => {
      if (event.target.classList.contains('sortable-item')) {
        draggedItem = event.target;
        originalContainer = draggedItem.closest('.sortable-list'); // Track the original container
        draggedItem.classList.add('dragging');
      }
    });

    sortableList.addEventListener('dragend', (event) => {
      if (draggedItem) {
        draggedItem.classList.remove('dragging');
        // Ensure item is only in the original container
        if (!originalContainer.contains(draggedItem)) {
          originalContainer.appendChild(draggedItem);
        }
        draggedItem = null;
        originalContainer = null;
      }
      updateIndices(sortableList);
    });

    sortableList.addEventListener('dragover', (event) => {
      event.preventDefault(); // Prevent default handling to allow dropping
      if (draggedItem && event.target.closest('.sortable-list') === originalContainer) {
        const afterElement = getDragAfterElement(sortableList, event.clientY);
        if (afterElement == null) {
          sortableList.appendChild(draggedItem);
        } else {
          sortableList.insertBefore(draggedItem, afterElement);
        }
      }
    });

    sortableList.addEventListener('drop', (event) => {
      event.preventDefault();
      // Ensure the item is only placed within the original container
      if (draggedItem && event.target.closest('.sortable-list') === originalContainer) {
        const afterElement = getDragAfterElement(originalContainer, event.clientY);
        if (afterElement == null) {
          originalContainer.appendChild(draggedItem);
        } else {
          originalContainer.insertBefore(draggedItem, afterElement);
        }
      } else {
        // If dropped outside the original container, revert it
        if (originalContainer) {
          originalContainer.appendChild(draggedItem);
        }
      }
      // Clean up
      if (draggedItem) {
        draggedItem.classList.remove('dragging');
        draggedItem = null;
        originalContainer = null;
      }
    });

    function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.sortable-item:not(.dragging)')];

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    }

    function updateIndices(list) {
      const questionNumber = list.getAttribute('data-question');
      const items = list.querySelectorAll('.sortable-item');
      listForOrder = []
      items.forEach((item, index) => {
        const badge = item.querySelector('.badge');
        if (badge) {
          badge.textContent = index + 1;
          badge.classList.add('badge-primary'); // Make badge blue (Bootstrap class)
        }
        const value = item.getAttribute('data-value');
        listForOrder.push([`${index+1}: ${value}`])
      });
      updateQuestionPool(questionNumber, questionPool);
      questionValues.push({question: questionNumber, value: listForOrder})
    }
  });
});


document.getElementById("loadingOverlay").style.display = "none"; // Hide the loading after page is loaded
