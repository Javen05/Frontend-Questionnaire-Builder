htmlTitle = "Questionnaire"
title = "Title for questionnaire"
compulsoryQuestions = ["QN0"];

questions = [
  {
    number: "QN0",
    inputType: "display",
    question: "Sample of a display question. If trigger is provided, click the Proceed button to activate trigger.",
    hint: "Text below question that serves as sub-header. It is available but optional for all inputTypes.",
    trigger: "QN1"
  },
  {
    number: "QN1",
    inputType: "response",
    question:
      "number of first question must always be in compulsoryQuestions",
    options: [
      { label: "Select me to trigger S1", value: 0, trigger: "S1" },
      { label: "Option 1", value: 1 },
      { label: "Option 2", value: 2 },
      { label: "Option 3", value: 3 },
      { label: "Option 4", value: 4 },
    ],
    trigger: "QN2"
  },
  {
    number: "QN2",
    inputType: "sort",
    question:
      "Sorting/Ordering question. If individual trigger is specified, only the first option's trigger will be used. Else, use default trigger",
    options: [
      { label: "Order 1", value: 1 },
      { label: "Order 2", value: 2 },
      { label: "Order 3 (Sort to top to trigger S2)", value: 3, trigger: "S2" },
      { label: "Order 4", value: 4 },
    ],
    trigger: "QN3"
  },
  {
    number: "QN3",
    inputType: "checkbox",
    question:
      `Multiple selection question. Trigger for all selected options will be triggered. If no individual trigger is triggered, the default trigger will be used`,
    options: [
      { label: "Option 1 (Trigger S3)", value: 1, trigger: "S3" },
      { label: "Option 2 (Trigger S4)", value: 2, trigger: "S4" },
      { label: "Option 3", value: 3 },
      { label: "Option 4", value: 4 },
      { label: "Option 5", value: 5 },
    ],
    trigger: "QN4"
  },
  {
    number: "QN4",
    inputType: "radio",
    question: "Radio question. If default trigger is provided, user can produced without selecting.",
    options: [
      { label: "Option 1", value: 1, trigger: "S5" },
      { label: "Option 2", value: 2 },
      { label: "Option 3", value: 3 },
      { label: "Option 4", value: 4 },
    ],
    trigger: "QN5"
  },
  {
    number: "QN5",
    inputType: "dropdown",
    question: "Dropdown question. Difference with radio is that dropdown REQUIRES selection for triggering default trigger.",
    options: [
      { label: "Option 1", value: 1, trigger: "S6" },
      { label: "Option 2", value: 2 },
      { label: "Option 3", value: 3 },
      { label: "Option 4", value: 4 },
    ],
    trigger: "QN6"
  },
  {
    number: "QN6",
    inputType: "radio",
    question: "Question without trigger",
    hint: "trigger is optional for ALL inputTypes",
    options: [
      { label: "Option 1", value: 1 },
      { label: "Option 2", value: 2 },
      { label: "Option 3", value: 3 },
      { label: "Option 4", value: 4 },
    ],
  },
  {
    number: "S1",
    inputType: "display",
    question: "This qn was triggered by QN 1.",
  },
  {
    number: "S2",
    inputType: "display",
    question: "This qn was triggered by sorting Order 3 to the top in QN2.",
  },
  {
    number: "S3",
    inputType: "display",
    question: "You selected Option 1 for QN3",
  },
  {
    number: "S4",
    inputType: "display",
    question: "You selected Option 2 for QN3",
  },
  {
    number: "S5",
    inputType: "display",
    question: "You selected Option 1 for QN4",
  },
  {
    number: "S6",
    inputType: "display",
    question: "You selected Option 1 for QN5",
  },
  {
    number: "Conditional-1",
    inputType: "display",
    question: "You selected Option 4 for ALL QNS",
  },
  {
    number: "Conditional-2",
    inputType: "display",
    question: "You selected at least one Option 3",
  },
  {
    number: "Conditional-3",
    inputType: "display",
    question: "Select all checkbox for QN3",
  }
];

conditionalQuestions = {
  /**
   * Question-triggered-if-conditions-met: [Option, Option1, Option2, Option3]
   * Option = [questionNumber, value that should be selected for the question]
   * sorting questions cannot be used in Option
   */
  // by default, all conditions in array must be satisfied for a conditional question to trigger  
  "Conditional-1": [["QN1", [4]], ["QN3", [4]], ["QN4", [4]], ["QN5", [4]], ["QN6", [4]]],
  // by placing 'or' as last item of list, any condition satisfied will trigger the conditional question 
  "Conditional-2": [["QN1", [3]], ["QN3", [3]], ["QN4", [3]], ["QN5", [3]], ["QN6", [3]], "or"],
  // for checkbox qn, can have a list values to be selected to meet criteria.
  "Conditional-3": [["QN3", [1,2,3,4,5]]]
};
