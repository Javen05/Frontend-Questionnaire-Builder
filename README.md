# Frontend-Questionnaire-Builder

## Demo
### Questionnaire Page
#### Prevent empty form submission; user must answer at least 1 question to enable submit button
<img width="1919" height="996" alt="image" src="https://github.com/user-attachments/assets/1cede426-e047-422a-8f4a-7acdb69b3774" />

#### Prevent user from submitting empty form; can be bypassed by clicking 'Skip Check'
<img width="1919" height="994" alt="image" src="https://github.com/user-attachments/assets/d75c8090-8d57-4203-b88c-e7933579e32a" />

#### Record each submission with an Identifier/Name
<img width="1919" height="997" alt="image" src="https://github.com/user-attachments/assets/396a49df-f92d-478e-a06c-2fa3fe2b5ee2" />

### Dashboard Page
<img width="1919" height="992" alt="image" src="https://github.com/user-attachments/assets/457bbec6-ac87-4ff5-b23b-356bd7f41198" />

- View all submissions on this device (stored in local storage)
- Able to download data
- Searchbar to find specific record
- Left/Right toggle buttons to scroll horizontally for huge questionnaires with many questions/columns

### Questionnaire Builder Page
<img width="1919" height="995" alt="image" src="https://github.com/user-attachments/assets/285c0f25-d225-4ff8-b26b-2d2cde972800" />
<img width="1919" height="998" alt="image" src="https://github.com/user-attachments/assets/149d9a83-f5cc-46bc-8263-af20cadb27c5" />
<img width="1919" height="995" alt="image" src="https://github.com/user-attachments/assets/14b814f8-996a-452b-afcd-c60719325556" />

> Have yet to test Questionnaire Builder, so there might be bugs when using the generated template with questionnaire page.

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
