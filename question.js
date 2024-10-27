htmlTitle = "Questionnaire";
title = "Feedback on Our Service";
compulsoryQuestions = ["QN0", "RATING"];

questions = [
  {
    number: "QN0",
    inputType: "display",
    question: "Welcome to our feedback form! Please share your thoughts about our service.",
    hint: "Your feedback is valuable to us!",
    trigger: "QN1"
  },
  {
    number: "QN1",
    inputType: "response",
    question: "What aspect of our service did you find most helpful?",
    options: [
      { label: "Customer Service", value: 0, trigger: "S1" },
      { label: "Product Quality", value: 1 },
      { label: "Timeliness", value: 2 },
      { label: "Pricing", value: 3 },
      { label: "Other", value: 4 },
    ],
    trigger: "QN2"
  },
  {
    number: "S1",
    inputType: "display",
    question: "Thank you for your feedback on Customer Service!",
    trigger: "QN2"
  },
  {
    number: "QN2",
    inputType: "sort",
    question: "Please rank the following attributes in order of importance:",
    options: [
      { label: "Customer Support", value: 1 },
      { label: "Value for Money", value: 2 },
      { label: "Quality of Service", value: 3, trigger: "S2" },
      { label: "Speed of Service", value: 4 },
    ],
    trigger: "QN3"
  },
  {
    number: "S2",
    inputType: "display",
    question: "You valued Quality of Service in your ranking.",
    trigger: "QN3"
  },
  {
    number: "QN3",
    inputType: "checkbox",
    question: "Which of the following features would you like to see in the future? (Select all that apply)",
    options: [
      { label: "More Payment Options (Trigger S3)", value: 1, trigger: "S3" },
      { label: "Expanded Product Range (Trigger S4)", value: 2, trigger: "S4" },
      { label: "Faster Delivery Times", value: 3 },
      { label: "Loyalty Program", value: 4 },
      { label: "Customer Referral Discounts", value: 5 },
    ],
    trigger: "QN3a"
  },
  {
    number: "S3",
    inputType: "display",
    question: "You are interested in more payment options.",
    trigger: "QN3a"
  },
  {
    number: "S4",
    inputType: "display",
    question: "You would like to see an expanded product range.",
    trigger: "QN3a"
  },
  {
    number: "QN3a",
    inputType: "sort",
    question: "Rank the following services based on your experience:",
    options: [
      { label: "Delivery Service", value: 1 },
      { label: "Customer Support", value: 2 },
      { label: "Product Range", value: 3 },
      { label: "Online Experience", value: 4 },
      { label: "Overall Satisfaction", value: 5 },
    ],
    trigger: "QN3b"
  },
  {
    number: "QN3b",
    inputType: "sort",
    question: "Rank the following aspects of our service from most to least satisfying:",
    options: [
      { label: "Speed", value: 3 },
      { label: "Quality", value: 2 },
      { label: "Affordability", value: 1 },
      { label: "Availability", value: 4 },
      { label: "Support", value: 5 },
      { label: "Variety", value: 6 }
    ],
    trigger: "QN3c"
  },
  {
    number: "QN3c",
    inputType: "sort",
    question: "Rank these options in terms of customer importance:",
    options: [
      { label: "Flexibility", value: 3 },
      { label: "Simplicity", value: 2 },
      { label: "Comprehensiveness", value: 1 },
    ],
    trigger: "QN4"
  },
  {
    number: "QN4",
    inputType: "radio",
    question: "Would you recommend our service to a friend?",
    options: [
      { label: "Definitely", value: 1, trigger: "S5" },
      { label: "Probably", value: 2 },
      { label: "Not Sure", value: 3 },
      { label: "Definitely Not", value: 4 },
    ],
    trigger: "QN5"
  },
  {
    number: "S5",
    inputType: "display",
    question: "Thank you for recommending our service!",
    trigger: "QN5"
  },
  {
    number: "QN5",
    inputType: "dropdown",
    question: "How would you rate our service?",
    options: [
      { label: "Excellent", value: 1, trigger: "S6" },
      { label: "Good", value: 2 },
      { label: "Average", value: 3 },
      { label: "Poor", value: 4 },
    ],
    trigger: "QN6"
  },
  {
    number: "S6",
    inputType: "display",
    question: "Thank you for your rating of Excellent!",
    trigger: "QN6"
  },
  {
    number: "QN6",
    inputType: "radio",
    question: "Would you visit us again?",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 2 },
      { label: "Maybe", value: 3 },
    ],
  },
  {
    number: "Conditional-1",
    inputType: "display",
    question: "We are glad that you are satisfied with our service!",
  },
  {
    number: "Conditional-2",
    inputType: "response",
    hint: "Share your experience and how you want us to improve",
    question: "Please let us know how we can improve.",
  },
  {
    number: "Conditional-3",
    inputType: "display",
    question: "You selected all options in the checkbox for QN3.",
  },
  {
    number: "RATING",
    inputType: "dropdown",
    question: "Rate this Questionnaire",
    options: [
      { label: "Excellent", value: 1 },
      { label: "Good", value: 2 },
      { label: "Neutral", value: 3 },
      { label: "Poor", value: 4 },
      { label: "Very Poor", value: 5 },
    ]
  }
];

conditionalQuestions = {
  /** 
   * Question-triggered-if-conditions-met: [Option, Option1, Option2, Option3]
   * Option = [questionNumber, value that should be selected for the question]
   * sorting questions cannot be used in Option
   */
  // by default, all conditions in array must be satisfied for a conditional question to trigger
  "Conditional-1": [["QN4", [1]], ["QN5", [1]], ["QN6", [1]]],
  // by placing 'or' as last item of list, any condition satisfied will trigger the conditional question
  "Conditional-2": [["QN4", [4]], ["QN5", [4]], ["QN6", [2]], "or"],
  // for checkbox qn, can have a list values to be selected to meet criteria.
  "Conditional-3": [["QN3", [1, 2, 3, 4, 5]]]
};
