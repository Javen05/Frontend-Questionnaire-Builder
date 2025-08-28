# Frontend-Questionnaire-Builder
![image](https://github.com/user-attachments/assets/3d7d59fc-aa35-4048-b657-38a0fe5514a4)

![image](https://github.com/user-attachments/assets/7e547853-432d-450f-8d96-dd2cf7036188)


## Background
During my internship, I built a questionnaire where your unique response for each question leads you to a different follow-up question. Decided to share this questionnaire wrapper for individuals who need a questionnaire beyond the capabilities of basic questionnaire forms.

### Updates:
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


### 6. Edtior interface to build Questionnaire (NEW)
  - User friendly GUI to build your complex questionnaires.

## Usage
0. Download all files and store in a folder
1. Open editor.html to build your questionnaire.
2. Export to question.js (download questions) after completing your questionnaire in editor.html.
3. Replace the question.js file with the newly downloaded one.
4. Open index.html to use questionnaire.

## Notes for usage:
  - If you are hosting the website, exclude questionnaire-builder.js and questionnaire-builder.html to hide the answers and logic of questions' trigger from user.
  - As the questionnaire engine runs on the frontend, tech-savvy users can reverse engineer question.js on their browser; therefore, this questionnaire should not be used for any formal or graded tests etc.
