# Frontend-Questionnaire-Builder
## Background
In a previous project, I needed a customizable questionnaire where each response could dynamically determine the next follow-up question. Since no free form builders supported this level of flexibility, I developed a questionnaire rendering engine. To keep it lightweight and accessible, I avoided heavy frameworks or external UI libraries—relying only on Bootstrap. This makes the questionnaire wrapper simple to set up and use, requiring no Node.js or complex configurations, while still offering capabilities beyond standard form builders for informal quizzes and survey that can be conducted using your device.


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


### 6. Editor interface to build Questionnaire (NEW)
  - User friendly GUI to build your complex questionnaires.
  - [Test out Builder](https://javen05.github.io/Frontend-Questionnaire-Builder/questionnaire-builder.html)

## Usage
0. Download all files and store in a folder
1. Open editor.html to build your questionnaire.
2. Export to question.js (download questions) after completing your questionnaire in editor.html.
3. Replace the question.js file with the newly downloaded one.
4. Open index.html to use questionnaire.

## Notes for usage:
  - If you are hosting the website, exclude questionnaire-builder.js and questionnaire-builder.html to hide the answers and logic of questions' trigger from user.
  - As the questionnaire engine runs on the frontend, tech-savvy users can reverse engineer question.js on their browser; therefore, this questionnaire should not be used for any formal or graded tests etc.
