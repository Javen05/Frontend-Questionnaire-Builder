# Frontend-Questionnaire-Builder
## Background
In a previous project, I needed a customizable questionnaire where the unique combination of each response determines the follow-up question(s). Since no free form builders supported this level of flexibility, I developed a questionnaire rendering engine to handle the complex logic required. To keep it lightweight and accessible as per my organization's requirements, I did not use heavy frameworks or external UI libraries—relying only on Bootstrap. This makes the questionnaire wrapper simple to set up and use as it requires no Node.js or complex configurations, while still offering capabilities beyond standard form builders for informal quizzes and survey that can be conducted using your device.


## Preview of Software
### Questionnaire Page

<p align="center">
  <img src="https://github.com/user-attachments/assets/1cede426-e047-422a-8f4a-7acdb69b3774" width="500" />
  <img src="https://github.com/user-attachments/assets/d75c8090-8d57-4203-b88c-e7933579e32a" width="500" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/396a49df-f92d-478e-a06c-2fa3fe2b5ee2" width="1000" />
</p>

---

### Dashboard Page

<p align="center">
  <img src="https://github.com/user-attachments/assets/457bbec6-ac87-4ff5-b23b-356bd7f41198" width="1000" />
</p>

* View all saved submissions from this device (stored in local storage), with the option to open and review each submission individually in the form
* Download data as file
* Search bar to find specific records (filter by **ID** and **Timestamp** column)
* Left/Right toggle buttons to scroll horizontally for large questionnaires

---

### Questionnaire Builder Page

<p align="center">
  <img src="https://github.com/user-attachments/assets/285c0f25-d225-4ff8-b26b-2d2cde972800" width="500" />
  <img src="https://github.com/user-attachments/assets/149d9a83-f5cc-46bc-8263-af20cadb27c5" width="500" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/14b814f8-996a-452b-afcd-c60719325556" width="1000" />
</p>

> *Note: Questionnaire Builder is still under testing — generated templates may contain bugs when used with the questionnaire page.*

---

### Latest Update:
1. Added a questionnaire builder interface for ease of building question.js that adhere to template format.
2. UI update.

## Features
### 1. Multiple question types for all question needs:
  - Display (For stating instructions)
  - MCQ: Radio
  - MCQ: Dropdown
  - Short answer
  - Sorting


### 2. Highly customizable experience
  - Configure follow-up questions for certain selected responses
  - Create logical statements to make special question appear for specific selections


### 3. Dashboard that shows historical form submissions
  - Can download to CSV
  - Can view submitted responses in the form itself

  
### 4. Autosave selection
  - Progress from previous session is saved until submitted

  
### 5. Web and Mobile Responsive


### 6. User Interface to build Questionnaire (NEW)
  - User friendly GUI to build your complex questionnaires.
  - [Test out Builder](https://javen05.github.io/Frontend-Questionnaire-Builder/questionnaire-builder.html)

## Usage
0. Download all files and store in a folder
1. Open questionnaire-builder.html to: build a new questionnaire | edit your existing questionnaire.
2. Download questions (question.js) after completing your questionnaire in questionnaire-builder.html.
3. Replace the question.js file within the project folder with the newly downloaded one.
4. Open index.html to use the new questionnaire!

Here’s a polished version of your **NOTICE** section with clearer wording and structure:

---

## ⚠️ Notice for Usage
* This questionnaire engine runs entirely on the **frontend**. Any logic defined within it can be accessed and reverse-engineered by users, so it **should not** be used for formal assessments, graded tests, or any use case where secrecy and security is required.
* If you plan to integrate this questionnaire engine with your **own backend** for secure grading or evaluation:

  * **Do not** assign scores directly in the `value` field, as these can be easily inspected by users.
  * Instead, assign each option a unique **ID** as its value and let your backend handle the mapping of IDs to scores.

## Recommended use-cases
- Informal quizzes for learning, self-checks, or entertainment.
- Data collection surveys/tests conducted on your own device where you can directly monitor participants’ usage and prevent them from inspecting the source code.
- Surveys (just hook submission action with your database endpoint to capture responses from different devices).
