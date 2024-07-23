questions = [
  {
    number: "SC1",
    inputType: "response",
    question:
      "The first few questions are for background purposes. How old are you?",
  },
  {
    number: "SC21",
    inputType: "checkbox",
    question:
      `Havesdsdsdsddddddddddddme lasting several days or longer when most of the day you felt sad, empty or depressed?`,
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 5 },
      { label: "Don't Know", value: 8 },
      { label: "Refused", value: 9 },
      { label: "sdsd", value: 1 },
      { label: "No", value: 5 },
      { label: "dsdsdsd't Know", value: 8 },
      { label: "dsdsdsdsdsdsd", value: 9 },
    ],
  },
  {
    number: "SC22",
    inputType: "sort",
    question:
      "Have you ever had a period of time lasting several days or longer when most of the day you were very discouraged about how things were going in your life?",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 5 },
      { label: "Don't Know", value: 8, trigger: "D87" },
      { label: "Refused", value: 9 },
    ],
    trigger: "D50"
  },
  {
    number: "SC23",
    inputType: "radio",
    question:
      "Have you ever had a period of time lasting several days or longer when you lost interest in most things you usually enjoy like work, hobbies, and personal relationships?",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 5 },
      { label: "Don't Know", value: 8 },
      { label: "Refused", value: 9 },
    ],
  },
  {
    number: "SC24",
    inputType: "sort",
    question: `Some people have periods of time lasting four days or
        longer when they feel much more excited and full of energy
        than usual. Their minds go too fast. They talk a lot. They
        are very restless or unable to sit still and they sometimes do
        things that are unusual for them, such as driving too fast or
        spending too much money. Have you ever had a period like
        this lasting several days or longer?`,
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 5 },
      { label: "Don't Know", value: 8 },
      { label: "Refused", value: 9 },
    ],
  },
  {
    number: "SC25",
    inputType: "radio",
    question: `Have you ever had a period of time lasting four days or
        longer when most of the time you were very irritable,
        grumpy, or in a bad mood? `,
    options: [
      { label: "Yes", value: 1, trigger: "SC25a" }, // Trigger "SC25a" if value is "Yes"
      { label: "No", value: 5 },
      { label: "Don't Know", value: 8 },
      { label: "Refused", value: 9 },
    ],
  },
  {
    number: "SC25a",
    inputType: "radio",
    question: `Have you ever had a period of time lasting four
        days or longer when most of the time you were so
        irritable that you either started arguments, shouted
        at people, or hit people?`,
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 5 },
      { label: "Don't Know", value: 8 },
      { label: "Refused", value: 9 },
    ],
  },
  {
    number: "D1",
    inputType: "radio",
    question: `Earlier in the interview, you mentioned having periods that lasted several days or longer when you felt sad, empty,
        or depressed most of the day. During episodes of this sort, did you ever feel discouraged about how things were
        going in your life?`,
    options: [
      { label: "Yes", value: 1, trigger: "D1a" }, // Trigger "D1a" if value is "Yes"
      { label: "No", value: 5, trigger: "D1b" },
      { label: "Don't Know", value: 8, trigger: "D1b" },
      { label: "Refused", value: 9, trigger: "D1b" },
    ],
  },
  {
    number: "D1a",
    question: `During the episodes of being sad, empty, or depressed, did you ever lose interest in most things like work,
        hobbies, and other things you usually enjoy?`,
    options: [
      { label: "Yes", value: 1, trigger: "D3" },
      { label: "No", value: 5, trigger: "D4" },
      { label: "Don't Know", value: 8, trigger: "D4" },
      { label: "Refused", value: 9, trigger: "D4" },
    ],
  },
  {
    number: "D1b",
    question: `During the episodes of being sad, empty, or depressed, did you ever lose interest in most things like work,
        hobbies, and other things you usually enjoy?`,
    options: [
      { label: "Yes", value: 1, trigger: "D5" },
      { label: "No", value: 5, trigger: "D6" },
      { label: "Don't Know", value: 8, trigger: "D6" },
      { label: "Refused", value: 9, trigger: "D6" },
    ],
  },
  {
    number: "D2",
    inputType: "sort",
    question: `Earlier in the interview you mentioned having periods that lasted several days or longer when you felt discouraged
        about how things were going in your life. During episodes of this sort, did you ever lose interest in most things like
        work, hobbies, and other things you usually enjoy?`,
    options: [
      { label: "Yes", value: 1, trigger: "D7" },
      { label: "No", value: 5, trigger: "D8" },
      { label: "Don't Know", value: 8, trigger: "D8" },
      { label: "Refused", value: 9, trigger: "D8" },
    ],
    trigger: "D50"
  },
  {
    number: "D3",
    inputType: "radio",
    question: `INTERVIEWER INSTRUCTION: FOR D1a, <br>
        USE KEY PHRASE “SAD, DISCOURAGED, OR UNINTERESTED” THROUGHOUT THE SECTION`,
    options: [
      { label: "Yes", value: "Yes", trigger: "D12" },
    ],
  },
  {
    number: "D4",
    inputType: "radio",
    question: `INTERVIEWER INSTRUCTION: FOR D1a, <br>
        USE KEY PHRASE “SAD OR DISCOURAGED" THROUGHOUT THE SECTION`,
    options: [
      { label: "Yes", value: "Yes", trigger: "D12" },
    ],
  },
  {
    number: "D5",
    inputType: "radio",
    question: `INTERVIEWER INSTRUCTION: FOR D1b, <br>
        USE KEY PHRASE “SAD OR UNINTERESTED" THROUGHOUT THE SECTION`,
    options: [
      { label: "Yes", value: "Yes", trigger: "D12" },
    ],
  },
  {
    number: "D6",
    inputType: "radio",
    question: `INTERVIEWER INSTRUCTION: FOR D1b, <br>
        USE KEY PHRASE “SAD" THROUGHOUT THE SECTION`,
    options: [
      { label: "Yes", value: "Yes", trigger: "D12" },
    ],
  },
  {
    number: "D7",
    inputType: "radio",
    question: `INTERVIEWER INSTRUCTION: FOR D2, <br>
        USE KEY PHRASE “DISCOURAGED OR UNINTERESTED" THROUGHOUT THE SECTION`,
    options: [
      { label: "Yes", value: "Yes", trigger: "D12" },
    ],
  },
  {
    number: "D8",
    inputType: "radio",
    question: `INTERVIEWER INSTRUCTION: FOR D2, <br>
        USE KEY PHRASE “DISCOURAGED" THROUGHOUT THE SECTION`,
    options: [
      { label: "Yes", value: "Yes", trigger: "D12" },
    ],
  },
  {
    number: "D9",
    question: `Earlier in the interview, you mentioned having periods that lasted several days or longer when you lost interest in
        most things like work, hobbies, and other things you usually enjoy. Did you ever have a period of this sort that
        lasted most of the day nearly every day for two weeks or longer?`,
    inputType: "sort",
    options: [
      { label: "Yes", value: 1, trigger: "D11" },
      { label: "No", value: 5, trigger: "D9a" },
      { label: "Don't Know", value: 8, trigger: "D9a" },
      { label: "Refused", value: 9, trigger: "D9a" },
    ],
  },
  {
    number: "D9",
    question: `Earlier in the interview, you mentioned having periods that lasted several days or longer when you lost interest in
        most things like work, hobbies, and other things you usually enjoy. Did you ever have a period of this sort that
        lasted most of the day nearly every day for two weeks or longer?`,
    options: [
      { label: "Yes", value: 1, trigger: "D11" },
      { label: "No", value: 5, trigger: "D9a" },
      { label: "Don't Know", value: 8, trigger: "D9a" },
      { label: "Refused", value: 9, trigger: "D9a" },
    ],
  },
  {
    number: "D9a",
    question: `What is the longest period of days you ever had when you lost interest in most things you usually enjoy?
        INTERVIEWER: “LESS THAN ONE DAY” CODE 0`,
    inputType: "response",
    trigger: "D10",
  },
  {
    number: "D9a_1",
    question: `UNIT OF TIME:`,
    options: [
      { label: "DAYS", value: 1 },
      { label: "WEEKS", value: 2 },
      { label: "MONTHS", value: 3 },
      { label: "YEARS", value: 4 },
    ],
  },
  {
    number: "D9a_2",
    question: `PROBE DK: Was it three days or longer?`,
    options: [
      { label: "YES", value: 1 },
      { label: "NO", value: 2 },
    ],
  },
  {
    number: "D10",
    question: `INTERVIEWER CHECKPOINT: (SEE *D9a)`,
    options: [
      { label: "DURATION OF 3 DAYS OR LONGER", value: 1, trigger: "D14" },
      { label: "ALL OTHERS", value: 2, trigger: "D87_1" },
    ],
  },
  {
    number: "D11",
    question: `INTERVIEWER INSTRUCTION: USE KEY PHRASE “UNINTERESTED” THROUGHOUT THE SECTION`,
    options: [
      { label: "YES", value: 1, trigger: "D16" },
    ],
  },
  {
    number: "D12",
    question: `Did you ever have a period of being {D12feeling} in things that lasted most of the day,
        nearly every day, for two weeks or longer?`,
    options: [
      { label: "Yes", value: 1, trigger: "D16" },
      { label: "No", value: 5, trigger: "D12a" },
      { label: "Don't Know", value: 8, trigger: "D12a" },
      { label: "Refused", value: 9, trigger: "D12a" },
    ],
  },
  {
    number: "D12a",
    question: `How long was the longest period of days you ever had when you were
        {D12feeling} most of the day?
        INTERVIEWER: “LESS THAN ONE DAY” CODE 0`,
    inputType: "response",
    trigger: "D13",
  },
  {
    number: "D13",
    question: `INTERVIEWER CHECKPOINT: (SEE *D12a)`,
    options: [
      { label: "DURATION OF 3 DAYS OR LONGER", value: 1, trigger: "D14" },
      { label: "ALL OTHERS", value: 2, trigger: "D87_1" },
    ],
  },
  {
    number: "D14",
    question: `Did you ever have a year or more in your life when you had several different episodes of being
        {D12feeling} each of which lasted several days or longer?`,
    options: [
      { label: "Yes", value: 1, trigger: "D14a" },
      { label: "No", value: 5, trigger: "D87_1" },
      { label: "Don't Know", value: 8, trigger: "D87_1" },
      { label: "Refused", value: 9, trigger: "D87_1" },
    ],
  },
  {
    number: "D14a",
    question: `Did you ever have a year or more in your life when just about every month you had an episode of this sort?`,
    options: [
      { label: "Yes", value: 1, trigger: "D15" },
      { label: "No", value: 5, trigger: "D87_1" },
      { label: "Don't Know", value: 8, trigger: "D87_1" },
      { label: "Refused", value: 9, trigger: "D87_1" },
    ],
  },
  {
    number: "D15",
    question: `Think of times lasting several days or longer when (this problem/these problems) with your mood (was/were)
        most severe and frequent. During those times, did your feelings of {D12feelingv2}
        usually last less than 1 hour, between 1 and 3 hours, between 3 and 5 hours, or more than 5 hours?`,
    options: [
      { label: "Less than 1 hour", value: 1, trigger: "D87_1" },
      { label: "1 to 3 hours", value: 2, trigger: "D17" },
      { label: "3 to 5 hours", value: 3, trigger: "D17" },
      { label: "More than 5 hours", value: 4, trigger: "D17" },
      { label: "Don't Know", value: 8, trigger: "D17" },
      { label: "Refused", value: 9, trigger: "D17" },
    ],
  },
  {
    number: "D16",
    question: `Think of times lasting two weeks or longer when (this problem/these problems) with your mood (was/were)
        most severe and frequent. During those times, did your feelings of {D12feelingv2} usually last less than 1 hour, between 1 and 3 hours, between 3 and 5 hours, or more than 5 hours?`,
    options: [
      { label: "Less than 1 hour", value: 1, trigger: "D87_1" },
      { label: "1 to 3 hours", value: 2, trigger: "D17" },
      { label: "3 to 5 hours", value: 3, trigger: "D17" },
      { label: "More than 5 hours", value: 4, trigger: "D17" },
      { label: "Don't Know", value: 8, trigger: "D17" },
      { label: "Refused", value: 9, trigger: "D17" },
    ],
  },
  {
    number: "D17",
    question: `How severe was your emotional distress during those times -- mild, moderate, severe, or very severe?`,
    options: [
      { label: "MILD", value: 1, trigger: "D18" },
      { label: "MODERATE", value: 2, trigger: "D18" },
      { label: "SEVERE", value: 3, trigger: "D18" },
      { label: "VERY SEVERE", value: 4, trigger: "D18" },
      { label: "Don't Know", value: 8, trigger: "D18" },
      { label: "Refused", value: 9, trigger: "D18" },
    ],
  },
  {
    number: "D18",
    question: `How often, during those times, was your emotional distress so severe that nothing could cheer you up -- often,
        sometimes, rarely, or never?`,
    options: [
      { label: "OFTEN", value: 1, trigger: "D19" },
      { label: "SOMETIMES", value: 2, trigger: "D19" },
      { label: "RARELY", value: 3, trigger: "D19" },
      { label: "NEVER", value: 4, trigger: "D19" },
      { label: "Don't Know", value: 8, trigger: "D19" },
      { label: "Refused", value: 9, trigger: "D19" },
    ],
  },
  {
    number: "D19",
    question: `How often, during those times, was your emotional distress so severe that you could not carry out your daily
        activities -- often, sometimes, rarely, or never?`,
    options: [
      { label: "OFTEN", value: 1, trigger: "D20" },
      { label: "SOMETIMES", value: 2, trigger: "D20" },
      { label: "RARELY", value: 3, trigger: "D20" },
      { label: "NEVER", value: 4, trigger: "D20" },
      { label: "Don't Know", value: 8, trigger: "D20" },
      { label: "Refused", value: 9, trigger: "D20" },
    ],
  },
  {
    number: "D20",
    question: `<b style='color:red;'>Please select {D20Instruction}</b>`,
    options: [
      { value: 1, label: "1", trigger: "D87_1" },
      { value: 2, label: "All others", trigger: "D21" },
    ],
  },
  {
    number: "D21",
    question: `People with episodes of being {D12feeling} often have other problems at the
        same time. These include things like changes in sleep, appetite, energy, the
        ability to concentrate and remember, feelings of low self-worth, and other problems. Did you ever have any of
        these problems during one of your episodes of being {D12feeling}?`,
    options: [
      { label: "Yes", value: 1, trigger: "D22" },
      { label: "No", value: 5, trigger: "D87_1" },
      { label: "Don't Know", value: 8, trigger: "D87_1" },
      { label: "Refused", value: 9, trigger: "D87_1" },
    ],
  },
  {
    number: "D22",
    question: `(READ SLOWLY) Please think of an episode of being {D12feeling} lasting (several days/two weeks)
            or longer when you also had the largest number of these other problems at the same time. Is there
            one particular episode of this sort that stands out in your mind as the worst one you ever had?`,
    options: [
      { label: "Yes", value: 1, trigger: "D22a" },
      { label: "No", value: 5, trigger: "D22c" },
      { label: "Don't Know", value: 8, trigger: "D22c" },
      { label: "Refused", value: 9, trigger: "D22c" },
    ],
  },
  {
    number: "D22a",
    question: `How old were you when that worst episode started?`,
    inputType: "response",
    trigger: "D22b",
  },
  {
    number: "D22b",
    question: `How long did that worst episode last?`,
    inputType: "response",
    trigger: "D23",
  },
  {
    number: "D22b1",
    question: `UNIT OF TIME:`,
    options: [
      { label: "DAYS", value: 1 },
      { label: "WEEKS", value: 2 },
      { label: "MONTHS", value: 3 },
      { label: "YEARS", value: 4 },
    ],
  },
  {
    number: "D22c",
    question: `Then think of the last time you had a bad episode of being {D12feeling} like
        this. How old were you when that last episode occurred? `,
    inputType: "response",
    trigger: "D22d",
  },
  {
    number: "D22d",
    question: `How long did that episode last?`,
    inputType: "response",
    trigger: "D23",
  },
  {
    number: "D22d1",
    question: `UNIT OF TIME:`,
    options: [
      { label: "DAYS", value: 1 },
      { label: "WEEKS", value: 2 },
      { label: "MONTHS", value: 3 },
      { label: "YEARS", value: 4 },
    ],
  },
  {
    number: "D23",
    question: `Was there something going on in your life shortly before that episode started that caused it to occur?`,
    options: [
      { label: "Yes", value: 1, trigger: "D23a" },
      { label: "No", value: 5, trigger: "D24" },
      { label: "Don't Know", value: 8, trigger: "D24" },
      { label: "Refused", value: 9, trigger: "D24" },
    ],
  },
  {
    number: "D23a",
    question: `(RB, PG 3) (IF NEC: [Look at page 3 in your booklet.] Briefly, what was going on that caused the
            episode to occur?)`,
    inputType: "checkbox",
    options: [
      { label: "STRESS: OVERWORK", value: 1, trigger: "D24" },
      { label: "STRESS: TENSION", value: 2, trigger: "D24" },
      { label: "STRESS: DEATH OF LOVED ONE", value: 3, trigger: "D24" },
      { label: "STRESS: MARITAL SEPARATION/DIVORCE", value: 4, trigger: "D24" },
      { label: "STRESS: JOB LOSS", value: 5, trigger: "D24" },
      { label: "STRESS: STRESS", value: 6, trigger: "D24" },
      { label: "STRESS: OTHER STRESSFUL EXPERIENCE (SPECIFY BELOW)", value: 7, trigger: "D23a.specify" },
      { label: "PHYSICAL ILLNESS/INJURY/CONDITION: EXHAUSTION", value: 10, trigger: "D24" },
      {
        label: "PHYSICAL ILLNESS/INJURY/CONDITION: MENSTRUAL CYCLE", value: 11, trigger: "D24" },
      {
        label: "PHYSICAL ILLNESS/INJURY/CONDITION: PREGNANCY/POSTPARTUM", value: 12, trigger: "D24"},
      { label: "PHYSICAL ILLNESS/INJURY/CONDITION: HEART DISEASE", value: 13, trigger: "D24" },
      {
        label: "PHYSICAL ILLNESS/INJURY/CONDITION: THYROID DISEASE",
        value: 14, trigger: "D24"
      },
      { label: "PHYSICAL ILLNESS/INJURY/CONDITION: CANCER", value: 15, trigger: "D24" },
      { label: "PHYSICAL ILLNESS/INJURY/CONDITION: OVERWEIGHT", value: 16, trigger: "D24" },
      {
        label:
          "PHYSICAL ILLNESS/INJURY/CONDITION: OTHER PHYSICAL ILLNESS OR INJURY (SPECIFY BELOW)",
        value: 17, trigger: "D23a.specify"
      },
      { label: "OTHER: OTHER (SPECIFY BELOW)", value: 82, trigger: "D23a.specify" },
      { label: "DON'T KNOW", value: 98, trigger: "D24" },
      { label: "REFUSED", value: 99, trigger: "D24" },
    ],
  },
  {
    number: "D23a.specify",
    question: `Specify below`,
    inputType: "response",
    trigger: "D24",
  },
  {
    number: "D24",
    question: `Press click on proceed to continue`,
    inputType: "display",
    trigger: "D24a",
  },
  {
    number: "D24a",
    question: `Did you feel sad, empty, or depressed most of the day nearly every day during that period of {D22dtime}?`,
    options: [
      { label: "Yes", value: 1, trigger: "D24b" },
      { label: "No", value: 5, trigger: "D24c" },
      { label: "Don't Know", value: 8, trigger: "D24c" },
      { label: "Refused", value: 9, trigger: "D24c" },
    ],
  },
  {
    number: "D24b",
    question:
      "Did you feel so sad that nothing could cheer you up nearly every day?",
    options: [
      { label: "Yes", value: 1, trigger: "D24c" },
      { label: "No", value: 5, trigger: "D24c" },
      { label: "Don't Know", value: 8, trigger: "D24c" },
      { label: "Refused", value: 9, trigger: "D24c" },
    ],
  },
  {
    number: "D24c",
    question:
      "During that period of {D22dtime}, did you feel discouraged about how things were going in your life most of the day nearly every day?",
    options: [
      { label: "Yes", value: 1, trigger: "D24d" },
      { label: "No", value: 5, trigger: "D24e" },
      { label: "Don't Know", value: 8, trigger: "D24e" },
      { label: "Refused", value: 9, trigger: "D24e" },
    ],
  },
  {
    number: "D24d",
    question: "Did you feel hopeless about the future nearly every day?",
    options: [
      { label: "Yes", value: 1, trigger: "D24e" },
      { label: "No", value: 5, trigger: "D24e" },
      { label: "Don't Know", value: 8, trigger: "D24e" },
      { label: "Refused", value: 9, trigger: "D24e" },
    ],
  },
  {
    number: "D24e",
    question:
      "During that period of {D22dtime}, did you lose interest in almost all things like work and hobbies and things you like to do for fun?",
    options: [
      { label: "Yes", value: 1, trigger: "D24f" },
      { label: "No", value: 5, trigger: "D24f" },
      { label: "Don't Know", value: 8, trigger: "D24f" },
      { label: "Refused", value: 9, trigger: "D24f" },
    ],
  },
  {
    number: "D24f",
    question:
      "Did you lose the ability to take pleasure in having good things happen to you, like winning something or being praised or complimented?",
    options: [
      { label: "Yes", value: 1, trigger: "D25" },
      { label: "No", value: 5, trigger: "D25" },
      { label: "Don't Know", value: 8, trigger: "D25" },
      { label: "Refused", value: 9, trigger: "D25" },
    ],
  },
  {
    number: "D25",
    question: "INTERVIEWER CHECKPOINT: (SEE *D24a-*D24f)",
    options: [
      { label: "One or more responses were Yes", value: 1, trigger: "D26a" },
      { label: "All others", value: 5, trigger: "D87_1" },
    ],
  },
  {
    number: "D26a",
    question:
      "Did you have a much smaller appetite than usual nearly every day during that period of {D22dtime}?",
    options: [
      { label: "Yes", value: 1, trigger: "D26e" },
      { label: "No", value: 5, trigger: "D26b" },
      { label: "Don't Know", value: 8, trigger: "D26b" },
      { label: "Refused", value: 9, trigger: "D26b" },
    ],
  },
  {
    number: "D26b",
    question:
      "Did you have a much larger appetite than usual nearly every day?",
    options: [
      { label: "Yes", value: 1, trigger: "D26c" },
      { label: "No", value: 5, trigger: "D26c" },
      { label: "Don't Know", value: 8, trigger: "D26c" },
      { label: "Refused", value: 9, trigger: "D26c" },
    ],
  },
  {
    number: "D26c",
    question:
      "Did you gain weight without trying to during that period of {D22dtime}? IF R REPORTS BEING PREGNANT OR GROWING, CODE '7' AND GO TO *D26g",
    options: [
      { label: "Yes", value: 1, trigger: "D26d" },
      { label: "No", value: 5, trigger: "D26e" },
      { label: "Don't Know", value: 8, trigger: "D26e" },
      { label: "Refused", value: 9, trigger: "D26e" },
      { label: "Pregnant or Growing", value: 7, trigger: "D26g" },
    ],
  },
  {
    number: "D26d",
    question: "How much did you gain?",
    inputType: "response",
    trigger: "D26g",
  },
  {
    number: "D26c_1",
    question: "UNIT OF MASS:",
    options: [
      { label: "POUNDS", value: 1 },
      { label: "KILOGRAMS", value: 2 },
    ],
  },
  {
    number: "D26e",
    question: "Did you lose weight without trying to?",
    options: [
      { label: "Yes", value: 1, trigger: "D26f" },
      { label: "No", value: 5, trigger: "D26g" },
      { label: "Don't Know", value: 8, trigger: "D26g" },
      { label: "Refused", value: 9, trigger: "D26g" },
    ],
  },
  {
    number: "D26f",
    question: "How much did you lose?",
    inputType: "response",
    trigger: "D26g",
  },
  {
    number: "D26e_1",
    question: "UNIT OF MASS:",
    options: [
      { label: "POUNDS", value: 1 },
      { label: "KILOGRAMS", value: 2 },
    ],
  },
  {
    number: "D26g",
    question: ` Did you have a lot more trouble than usual either falling asleep,
        staying asleep, or waking too early nearly every night during
        that period of {D22dtime}?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26i" },
      { label: "No", value: 5, trigger: "D26h" },
      { label: "Don't Know", value: 8, trigger: "D26h" },
      { label: "Refused", value: 9, trigger: "D26h" },
    ],
  },
  {
    number: "D26h",
    question: `Did you sleep a lot more than usual nearly every night during that
        period of {D22dtime}? `,
    options: [
      { label: "Yes", value: 1, trigger: "D26j" },
      { label: "No", value: 5, trigger: "D26i" },
      { label: "Don't Know", value: 8, trigger: "D26i" },
      { label: "Refused", value: 9, trigger: "D26i" },
    ],
  },
  {
    number: "D26i",
    question: ` Did you sleep much less than usual and still not feel tired or sleepy?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26j" },
      { label: "No", value: 5, trigger: "D26j" },
      { label: "Don't Know", value: 8, trigger: "D26j" },
      { label: "Refused", value: 9, trigger: "D26j" },
    ],
  },
  {
    number: "D26j",
    question: `Did you feel tired or low in energy nearly every day during that
        period of {D22dtime} even when you had not been
        working very hard? `,
    options: [
      { label: "Yes", value: 1, trigger: "D26l" },
      { label: "No", value: 5, trigger: "D26k" },
      { label: "Don't Know", value: 8, trigger: "D26k" },
      { label: "Refused", value: 9, trigger: "D26k" },
    ],
  },
  {
    number: "D26k",
    question: `Did you have a lot more energy than usual nearly every day during
        that period of {D22dtime}?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26l" },
      { label: "No", value: 5, trigger: "D26l" },
      { label: "Don't Know", value: 8, trigger: "D26l" },
      { label: "Refused", value: 9, trigger: "D26l" },
    ],
  },
  {
    number: "D26l",
    question: `Did you talk or move more slowly than is normal for you nearly
        every day?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26m" },
      { label: "No", value: 5, trigger: "D26n" },
      { label: "Don't Know", value: 8, trigger: "D26n" },
      { label: "Refused", value: 9, trigger: "D26n" },
    ],
  },
  {
    number: "D26m",
    question: `Did anyone else notice that you were talking or moving slowly?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26p" },
      { label: "No", value: 5, trigger: "D26p" },
      { label: "Don't Know", value: 8, trigger: "D26p" },
      { label: "Refused", value: 9, trigger: "D26p" },
    ],
  },
  {
    number: "D26n",
    question: `Were you so restless or jittery nearly every day that you paced up
        and down or couldn't sit still? `,
    options: [
      { label: "Yes", value: 1, trigger: "D26o" },
      { label: "No", value: 5, trigger: "D26p" },
      { label: "Don't Know", value: 8, trigger: "D26p" },
      { label: "Refused", value: 9, trigger: "D26p" },
    ],
  },
  {
    number: "D26o",
    question: ` Did anyone else notice that you were restless?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26p" },
      { label: "No", value: 5, trigger: "D26p" },
      { label: "Don't Know", value: 8, trigger: "D26p" },
      { label: "Refused", value: 9, trigger: "D26p" },
    ],
  },
  {
    number: "D26p",
    question: ` Did your thoughts come much more slowly than usual or seem
        mixed up nearly every day during that period of {D22dtime}?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26r" },
      { label: "No", value: 5, trigger: "D26q" },
      { label: "Don't Know", value: 8, trigger: "D26q" },
      { label: "Refused", value: 9, trigger: "D26q" },
    ],
  },
  {
    number: "D26q",
    question: `Did your thoughts seem to jump from one thing to another or race
        through your head so fast you couldn't keep track of them? `,
    options: [
      { label: "Yes", value: 1, trigger: "D26r" },
      { label: "No", value: 5, trigger: "D26r" },
      { label: "Don't Know", value: 8, trigger: "D26r" },
      { label: "Refused", value: 9, trigger: "D26r" },
    ],
  },
  {
    number: "D26r",
    question: `Did you have a lot more trouble concentrating than is normal for
        you nearly every day?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26s" },
      { label: "No", value: 5, trigger: "D26s" },
      { label: "Don't Know", value: 8, trigger: "D26s" },
      { label: "Refused", value: 9, trigger: "D26s" },
    ],
  },
  {
    number: "D26s",
    question: `Were you unable to make up your mind about things you ordinarily
        have no trouble deciding about?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26t" },
      { label: "No", value: 5, trigger: "D26t" },
      { label: "Don't Know", value: 8, trigger: "D26t" },
      { label: "Refused", value: 9, trigger: "D26t" },
    ],
  },
  {
    number: "D26t",
    question: `Did you lose your self-confidence?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26u" },
      { label: "No", value: 5, trigger: "D26u" },
      { label: "Don't Know", value: 8, trigger: "D26u" },
      { label: "Refused", value: 9, trigger: "D26u" },
    ],
  },
  {
    number: "D26u",
    question: `Did you feel that you were not as good as other people nearly every
        day? `,
    options: [
      { label: "Yes", value: 1, trigger: "D26v" },
      { label: "No", value: 5, trigger: "D26w" },
      { label: "Don't Know", value: 8, trigger: "D26w" },
      { label: "Refused", value: 9, trigger: "D26w" },
    ],
  },
  {
    number: "D26v",
    question: `Did you feel totally worthless nearly every day?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26w" },
      { label: "No", value: 5, trigger: "D26w" },
      { label: "Don't Know", value: 8, trigger: "D26w" },
      { label: "Refused", value: 9, trigger: "D26w" },
    ],
  },
  {
    number: "D26w",
    question: `Did you have feelings of extreme guilt nearly every day?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26x" },
      { label: "No", value: 5, trigger: "D26w_1" },
      { label: "Don't Know", value: 8, trigger: "D26w_1" },
      { label: "Refused", value: 9, trigger: "D26w_1" },
    ],
  },
  {
    number: "D26w_1",
    question: ` Did you feel a lot more guilty than you should have nearly every
        day?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26x" },
      { label: "No", value: 5, trigger: "D26x" },
      { label: "Don't Know", value: 8, trigger: "D26x" },
      { label: "Refused", value: 9, trigger: "D26x" },
    ],
  },
  {
    number: "D26x",
    question: `Did you feel irritable, grouchy, or in a bad mood nearly every day?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26y" },
      { label: "No", value: 5, trigger: "D26y" },
      { label: "Don't Know", value: 8, trigger: "D26y" },
      { label: "Refused", value: 9, trigger: "D26y" },
    ],
  },
  {
    number: "D26y",
    question: `Did you feel nervous or anxious most days?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26z" },
      { label: "No", value: 5, trigger: "D26z" },
      { label: "Don't Know", value: 8, trigger: "D26z" },
      { label: "Refused", value: 9, trigger: "D26z" },
    ],
  },
  {
    number: "D26z",
    question: `During that time, did you have any sudden attacks of intense fear or
        panic?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26aa" },
      { label: "No", value: 5, trigger: "D26aa" },
      { label: "Don't Know", value: 8, trigger: "D26aa" },
      { label: "Refused", value: 9, trigger: "D26aa" },
    ],
  },
  {
    number: "D26aa",
    question: `Did you often think a lot about death, either your own, someone
        else's, or death in general?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26bb" },
      { label: "No", value: 5, trigger: "D26bb" },
      { label: "Don't Know", value: 8, trigger: "D26bb" },
      { label: "Refused", value: 9, trigger: "D26bb" },
    ],
  },
  {
    number: "D26bb",
    question: `During that period, did you ever think that it would be better if you
        were dead?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26cc" },
      { label: "No", value: 5, trigger: "D26cc" },
      { label: "Don't Know", value: 8, trigger: "D26cc" },
      { label: "Refused", value: 9, trigger: "D26cc" },
    ],
  },
  {
    number: "D26cc",
    question: `Did you think about committing suicide?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26dd" },
      { label: "No", value: 5, trigger: "D26ff" },
      { label: "Don't Know", value: 8, trigger: "D26ff" },
      { label: "Refused", value: 9, trigger: "D26ff" },
    ],
  },
  {
    number: "D26dd",
    question: `Did you make a suicide plan?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26ee" },
      { label: "No", value: 5, trigger: "D26ee" },
      { label: "Don't Know", value: 8, trigger: "D26ee" },
      { label: "Refused", value: 9, trigger: "D26ee" },
    ],
  },
  {
    number: "D26ee",
    question: `Did you make a suicide attempt?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26ff" },
      { label: "No", value: 5, trigger: "D26ff" },
      { label: "Don't Know", value: 8, trigger: "D26ff" },
      { label: "Refused", value: 9, trigger: "D26ff" },
    ],
  },
  {
    number: "D26ff",
    question: `Did you feel that you could not cope with your everyday
        responsibilities?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26gg" },
      { label: "No", value: 5, trigger: "D26gg" },
      { label: "Don't Know", value: 8, trigger: "D26gg" },
      { label: "Refused", value: 9, trigger: "D26gg" },
    ],
  },
  {
    number: "D26gg",
    question: `Did you feel like you wanted to be alone rather than spend time with
        friends or relatives?`,
    options: [
      { label: "Yes", value: 1, trigger: "D26hh" },
      { label: "No", value: 5, trigger: "D26hh" },
      { label: "Don't Know", value: 8, trigger: "D26hh" },
      { label: "Refused", value: 9, trigger: "D26hh" },
    ],
  },
  {
    number: "D26hh",
    question: `Did you feel less talkative than usual? `,
    options: [
      { label: "Yes", value: 1, trigger: "D26ii" },
      { label: "No", value: 5, trigger: "D26ii" },
      { label: "Don't Know", value: 8, trigger: "D26ii" },
      { label: "Refused", value: 9, trigger: "D26ii" },
    ],
  },
  {
    number: "D26ii",
    question: `Were you often in tears? `,
    options: [
      { label: "Yes", value: 1, trigger: "D27" },
      { label: "No", value: 5, trigger: "D27" },
      { label: "Don't Know", value: 8, trigger: "D27" },
      { label: "Refused", value: 9, trigger: "D27" },
    ],
  },
  {
    number: "D27",
    question: `<b style="color:red;">{D27instructions}</b>`,
    options: [
      { label: "COUNT EQUALS TWO OR MORE", value: 1, trigger: "D28" },
      { label: "ALL OTHERS", value: 5, trigger: "D87_1" },
    ],
  },
  {
    number: "D28",
    question: `You mentioned having (two of the/a number of the) problems I just asked you about. How much did your
        {D12feelingv2} and these other problems interfere with either your work, your social
         life, or your personal relationships during that episode- not at all, a little, some, a lot, or extremely?`,
    options: [
      { label: "Not at all", value: 1, trigger: "D29" },
      { label: "A little", value: 2, trigger: "D29" },
      { label: "Some", value: 3, trigger: "D28a" },
      { label: "A lot", value: 4, trigger: "D28a" },
      { label: "Extremely", value: 5, trigger: "D28a" },
      { label: "Don't Know", value: 8, trigger: "D28a" },
      { label: "Refused", value: 9, trigger: "D29" },
    ],
  },
  {
    number: "D28a",
    question: `How often during that episode were you unable to carry out your daily activities because of your
        {D12feeling} - often, sometimes, rarely, or never? 
        `,
    options: [
      { label: "OFTEN", value: 1, trigger: "D29" },
      { label: "SOMETIMES", value: 2, trigger: "D29" },
      { label: "RARELY", value: 3, trigger: "D29" },
      { label: "NEVER", value: 4, trigger: "D29" },
      { label: "Don't Know", value: 8, trigger: "D29" },
      { label: "Refused", value: 9, trigger: "D29" },
    ],
  },
  {
    number: "D29",
    question: `When I use the word “episode” in the next questions, I mean a time lasting (several days/two weeks) or longer
        when nearly every day you were {D29feeling} and also had some of the other problems
        we talked about. The episode ends when you no longer have the problems for two weeks in a row. With this
        definition in mind, about how many different episodes did you ever have in your entire life? 
        `,
    inputType: "response",
    trigger: "D29a",
  },
  {
    number: "D29a_detail_1",
    question: `sadness`,
    inputType: "display",
  },
  {
    number: "D29a_detail_2",
    question: `discouragement`,
    inputType: "display",
  },
  {
    number: "D29a_detail_3",
    question: `lack of interest`,
    inputType: "display",
  },
  {
    number: "D29a",
    question: `Episodes of this sort sometimes occur as a result of physical causes such as physical illness or injury or the
        use of medication, drugs, or alcohol. Do you think your episode(s) of {D29feeling} ever occurred as the result of such physical causes?`,
    options: [
      { label: "Yes", value: 1, trigger: "D29b" },
      { label: "No", value: 5, trigger: "D29d" },
      { label: "Don't Know", value: 8, trigger: "D29d" },
      { label: "Refused", value: 9, trigger: "D29d" },
    ],
  },
  {
    number: "D29b",
    question: `Do you think your episode(s) always the result of physical
        causes? 
        `,
    options: [
      { label: "Yes", value: 1, trigger: "D29c" },
      { label: "No", value: 5, trigger: "D29d" },
      { label: "Don't Know", value: 8, trigger: "D29d" },
      { label: "Refused", value: 9, trigger: "D29d" },
    ],
  },
  {
    number: "D29c",
    question: `Briefly, what do you think the physical cause was? (USE ',' to seperate causes. Do not use ',' for anything else as it will interfere with the algorithm)`,
    inputType: "response",
    trigger: "D29d",
  },
  {
    number: "D29d",
    question: `<b style="color:red;">INTERVIEWER CHECKPOINT {D29dInstruction}</b>`,
    options: [
      {
        label: "SELECT if D29 EQUALS 1",
        value: 1,
        trigger: "D37d",
      },
      { label: "All others", value: 2, trigger: "D37" },
    ],
  },
  {
    number: "D37",
    question: `Think of the very first time in your life you had an episode lasting {D22dtime}
        when most of the day nearly every day you felt {D12feeling} and also had some of the other
        problems we just reviewed. Can you remember your exact age?`,
    options: [
      { label: "Yes", value: 1, trigger: "D37a" },
      { label: "No", value: 5, trigger: "D37b" },
      { label: "Don't Know", value: 8, trigger: "D37b" },
      { label: "Refused", value: 9, trigger: "D37b" },
    ],
  },
  {
    number: "D37a",
    question: `(IF NEC: How old were you?)`,
    inputType: "response",
    trigger: "D37c1",
  },
  {
    number: "D37b",
    question: `About how old were you (the first time you had an episode of this sort)? `,
    inputType: "response",
    trigger: "D37b1",
  },
  {
    number: "D37b1",
    question: `“ALL MY LIFE” OR “AS LONG AS I CAN REMEMBER, PROBE: Was it before you first started school?”`,
    options: [
      { label: "Yes", value: 1, trigger: "D37b234" },
      { label: "No", value: 5, trigger: "D37b234" },
      { label: "Don't Know", value: 998, trigger: "D37b234" },
      { label: "Refused", value: 999, trigger: "D37b234" },
    ],
  },
  {
    number: "D37b234",
    question: `PROBE: Was it before you were a teenager? `,
    inputType: "checkbox",
    options: [
      { label: "BEFORE STARTED SCHOOL", value: 4, trigger: "D37c1" },
      { label: "BEFORE TEENAGER", value: 12, trigger: "D37c1" },
      { label: "NOT BEFORE TEENAGER", value: 13, trigger: "D37c1" },
      { label: "DON'T KNOW", value: 998, trigger: "D37c1" },
      { label: "REFUSED", value: 999, trigger: "D37c1" },
    ],
  },
  {
    number: "D37c1",
    question: `About how long did that episode go on?`,
    inputType: "response",
    trigger: "D37d",
  },
  {
    number: "D37c2",
    question: `UNIT OF TIME`,
    options: [
      { label: "DAYS", value: 1 },
      { label: "WEEKS", value: 2 },
      { label: "MONTHS", value: 3 },
      { label: "YEARS", value: 4 },
    ],
  },
  {
    number: "D37d",
    question: `Episodes of feeling {D12feeling} sometimes occur “out of the blue”, other times they
        occur after the death of someone close to you, and other times they occur in response to some stressful
        experience. What about (your/the very first time you had an) episode of this sort - did it start out of the blue,
        after the death of someone close to you, or did it start in response to some stressful experience that occurred to
        you?`,
    options: [
      { label: "OUT OF THE BLUE", value: 1, trigger: "D37e" },
      { label: "DEATH OF SOMEONE CLOSE", value: 2, trigger: "D37e" },
      { label: "RESPONSE TO STRESS", value: 3, trigger: "D37e" },
      { label: "DON'T KNOW", value: 8, trigger: "D37e" },
      { label: "REFUSED", value: 9, trigger: "D37e" },
    ],
  },
  {
    number: "D37e_instructions",
    question: `Select Yes for D37e`,
    inputType: "display",
  },
  {
    number: "D37e",
    question: `<b style="color:red;">INTERVIEWER CHECKPOINT: {D37eInstruction}</b>`,
    options: [
      { label: "Yes", value: 1, trigger: "D37g" },
      { label: "All others", value: 2, trigger: "D37f" },
    ],
  },
  {
    number: "D37f",
    question: ` As we just mentioned, episodes of feeling {D12feeling} sometimes occur “out of the
        blue” and other times they occur in response to some stressful experience and sometimes after the death of
        someone close to you. Including your first episode, about how many of your lifetime episodes started out of the
        blue, about how many episodes started in response to some stressful experience, and about how many episodes
        started after the death of someone close to you? `,
    inputType: "response",
    trigger: "D37f_1",
  },
  {
    number: "D37f_1",
    question: ` _____________NUMBER OUT OF THE BLUE`,
    inputType: "response",
    trigger: "D37f_2",
  },
  {
    number: "D37f_2",
    question: ` _____________NUMBER IN RESPONSE TO STRESS`,
    inputType: "response",
    trigger: "D37f_3",
  },
  {
    number: "D37f_3",
    question: `_____________NUMBER AFTER THE DEATH OF SOMEONE CLOSE TO YOU`,
    inputType: "response",
    trigger: "D37g",
  },
  {
    number: "D37g_instructions",
    question: `Select Yes for D37g`,
    inputType: "display",
  },
  {
    number: "D37g",
    question: `<b style="color:red;">INTERVIEWER CHECKPOINT {D37gInstruction}</b>`,
    options: [
      { label: "Yes", value: 1, trigger: "D38" },
      { label: "All others", value: 2, trigger: "D37h1" },
    ],
  },
  {
    number: "D37h1",
    question: `You already told me about your first episode. About how much time went on between **(READ SLOWLY)** the
        end of your first episode and the beginning of your second episode? `,
    inputType: "response",
    trigger: "D37i1",
  },
  {
    number: "D37h2",
    question: `UNIT OF TIME:`,
    options: [
      { label: "DAYS", value: 1 },
      { label: "WEEKS", value: 2 },
      { label: "MONTHS", value: 3 },
      { label: "YEARS", value: 4 },
    ],
  },
  {
    number: "D37i1",
    question: `About how long did the second episode go on?`,
    inputType: "response",
    trigger: "D37k",
  },
  {
    number: "D37i2",
    question: `UNIT OF TIME:`,
    options: [
      { label: "DAYS", value: 1 },
      { label: "WEEKS", value: 2 },
      { label: "MONTHS", value: 3 },
      { label: "YEARS", value: 4 },
    ],
  },
  {
    number: "D37k",
    question: `Did that second episode start out of the blue, after the death of someone close to you, or did it start in response to
        some stressful experience that occurred to you? `,
    options: [
      { label: "OUT OF THE BLUE", value: 1, trigger: "D37l" },
      { label: "DEATH OF SOMEONE CLOSE", value: 2, trigger: "D37l" },
      { label: "RESPONSE TO STRESS", value: 3, trigger: "D37l" },
      { label: "DON'T KNOW", value: 8, trigger: "D37l" },
      { label: "REFUSED", value: 9, trigger: "D37l" },
    ],
  },
  {
    number: "D37l_instructions",
    question: `Select Yes for D37l`,
    inputType: "display",
  },
  {
    number: "D37l",
    question: `<b style="color:red;">INTERVIEWER CHECKPOINT {D37lInstruction}</b>`,
    options: [
      { label: "Yes", value: 1, trigger: "D38" },
      { label: "All others", value: 2, trigger: "D37m1" },
    ],
  },
  {
    number: "D37m1",
    question: `About how much time went on between (READ SLOWLY) the end of your second episode and the beginning of
        your third episode?`,
    inputType: "response",
    trigger: "D37n1",
  },
  {
    number: "D37m2",
    question: `UNIT OF TIME:`,
    options: [
      { label: "DAYS", value: 1 },
      { label: "WEEKS", value: 2 },
      { label: "MONTHS", value: 3 },
      { label: "YEARS", value: 4 },
    ],
  },
  {
    number: "D37n1",
    question: `About how long did the third episode go on?`,
    inputType: "response",
    trigger: "D37p",
  },
  {
    number: "D37n2",
    question: `UNIT OF TIME:`,
    options: [
      { label: "DAYS", value: 1 },
      { label: "WEEKS", value: 2 },
      { label: "MONTHS", value: 3 },
      { label: "YEARS", value: 4 },
    ],
  },
  {
    number: "D37p",
    question: `Did your third episode start out of the blue, after the death of someone close to you, or did it start in response to
        some stressful experience that occurred to you?`,
    options: [
      { label: "OUT OF THE BLUE", value: 1, trigger: "D38" },
      { label: "DEATH OF SOMEONE CLOSE", value: 2, trigger: "D38" },
      { label: "RESPONSE TO STRESS", value: 3, trigger: "D38" },
      { label: "DON'T KNOW", value: 8, trigger: "D38" },
      { label: "REFUSED", value: 9, trigger: "D38" },
    ],
  },
  {
    number: "D38",
    question: `Think of the past 12 months. During this time, did you have an episode of being
        {D12feeling} that lasted {D22dtime} and included some of the
        problems listed on pages 4_5 in your booklet? `,
    options: [
      { label: "Yes", value: 1, trigger: "D38a" },
      { label: "No", value: 5, trigger: "D38_1" },
      { label: "Don't Know", value: 8, trigger: "D38_1" },
      { label: "Refused", value: 9, trigger: "D38_1" },
    ],
  },
  {
    number: "D38_1_instructions",
    question: `Select Yes for D38_1`,
    inputType: "display",
  },
  {
    number: "D38_1",
    question: `<b style="color:red;">INTERVIEWER CHECKPOINT: {D37eInstruction}</b> `,
    options: [
      { label: "Yes", value: 1, trigger: "D72" },
      { label: "ALL OTHER", value: 2, trigger: "D38c" },
    ],
  },
  {
    number: "D38a",
    question: `How recently - in the past month, two to six months ago, or more than six months ago?`,
    options: [
      { label: "PAST MONTH", value: 1, trigger: "D38a_1" },
      { label: "2-6 MONTHS AGO", value: 2, trigger: "D38a_1" },
      { label: "MORE THAN 6 MONTHS AGO", value: 3, trigger: "D38a_1" },
      { label: "DON'T KNOW", value: 8, trigger: "D38a_1" },
      { label: "REFUSED", value: 9, trigger: "D38a_1" },
    ],
  },
  {
    number: "D38a_1",
    question: `When I use the word “episode” in the next questions, I mean a time lasting {D22dtime} or
        longer when nearly every day you were {D12feeling} and also had some of the
        other problems. The episode ends when you no longer have the problems for two weeks in a row. With
        this definition in mind, how many different episodes did you have in the past 12 months? `,
    inputType: "response",
    trigger: "D38a_2",
  },
  {
    number: "D38a_2",
    question: `INTERVIEWER CHECKPOINT: (SEE *D38a_1)`,
    options: [
      { label: "D38a_1 EQUALS '1'", value: 1, trigger: "D38a_3_5" },
      { label: "All others", value: 2, trigger: "D38a_7a" },
    ],
  },
  {
    number: "D38a_3_5",
    question: `In what month did that episode start? (Enter as Numeric value, for example Jan is 1)`,
    inputType: "response",
    trigger: "D38a_3a_5",
  },
  {
    number: "D38a_3a_5",
    question: `In what year did that episode start?`,
    inputType: "response",
    trigger: "D38a_5",
  },
  {
    number: "D38a_5",
    question: `D38a EQUALS 'PAST MONTH'`,
    options: [
      { label: "Yes", value: 1, trigger: "D38a_6" },
      { label: "All others", value: 2, trigger: "D38b" },
    ],
  },
  {
    number: "D38a_6",
    question: `Has this episode ended or is it still going on?`,
    options: [
      { label: "ENDED", value: 1, trigger: "D38b" },
      { label: "STILL GOING ON", value: 5, trigger: "D38b" },
      { label: "DON'T KNOW", value: 8, trigger: "D38b" },
      { label: "REFUSED", value: 9, trigger: "D38b" },
    ],
  },
  {
    number: "D38a_7a",
    question: `How long did the first of these [NUMBER FROM *D38a_1] episodes last?`,
    inputType: "response",
    trigger: "D38a_8",
  },
  {
    number: "D38a_7b",
    question: `How long did the first of these [NUMBER FROM *D38a_1] episodes last?`,
    options: [
      { label: "DAYS", value: 1 },
      { label: "WEEKS", value: 2 },
      { label: "MONTHS", value: 3 },
      { label: "YEARS", value: 4 },
    ],
  },
  {
    number: "D38a_8",
    question: `INTERVIEWER CHECKPOINT: (SEE *D38a)`,
    options: [
      { label: "D38a = PAST MONTH", value: 1, trigger: "D38a_9" },
      { label: "All others", value: 2, trigger: "D38b" },
    ],
  },
  {
    number: "D38a_9",
    question: `Has the most recent episode ended or is it still going on?`,
    options: [
      { label: "ENDED", value: 1, trigger: "D38b" },
      { label: "STILL GOING ON", value: 5, trigger: "D38b" },
      { label: "DON'T KNOW", value: 8, trigger: "D38b" },
      { label: "REFUSED", value: 9, trigger: "D38b" },
    ],
  },
  {
    number: "D38b",
    question: `About how many days out of the last 365 were you in an episode?`,
    inputType: "response",
    trigger: "D38b_1",
  },
  {
    number: "D38b_1_instructions_1",
    question: `<b style="color:red;">Select 1 for D38b_1</b>`,
    inputType: "display",
  },
  {
    number: "D38b_1_instructions_2",
    question: `<b style="color:red;">Select 2 for D38b_1</b>`,
    inputType: "display",
  },
  {
    number: "D38b_1_instructions_3",
    question: `<b style="color:red;">Select 3 for D38b_1</b>`,
    inputType: "display",
  },
  {
    number: "D38b_1",
    question: `INTERVIEWER CHECKPOINT: (SEE *D38b_1_instructions)`,
    options: [
      { label: "1 [D29 EQUALS '1']", value: 1, trigger: "D62_2" },
      { label: "2 [D29 EQUALS '2' or '3']", value: 2, trigger: "D54" },
      { label: "3 [ALL OTHERS]", value: 3, trigger: "D39" },
    ],
  },
  {
    number: "D38c",
    question: `How old were you the last time you had one of these episodes?`,
    inputType: "response",
    trigger: "D39",
  },
  {
    number: "D39",
    question: `What is the longest episode you ever had when you were {D12feeling} and also had
        some of the other problems we reviewed most of the day nearly every day? (USE LARGEST UNIT. E.G. 365 DAYS => 1 YEAR)`,
    inputType: "response",
    trigger: "D40",
  },
  {
    number: "D39a",
    question: `UNIT OF TIME`,
    options: [
      { label: "DAYS", value: 1 },
      { label: "WEEKS", value: 2 },
      { label: "MONTHS", value: 3 },
      { label: "YEARS", value: 4 },
    ],
  },
  {
    number: "D40_instructions_1",
    question: `<b style="color:red;">Select Yes for D40</b>`,
    inputType: "display",
  },
  {
    number: "D40_instructions_2",
    question: `<b style="color:red;">Select Yes for D40</b>`,
    inputType: "display",
  },
  {
    number: "D40_instructions_3",
    question: `<b style="color:red;">Select All others for D40</b>`,
    inputType: "display",
  },
  {
    number: "D40_instructions_4",
    question: `<b style="color:red;">Select All others for D40</b>`,
    inputType: "display",
  },
  {
    number: "D40_instructions_5",
    question: `<b style="color:red;">Select All others for D40</b>`,
    inputType: "display",
  },
  {
    number: "D40",
    question: `INTERVIEWER CHECKPOINT: (SEE D40_instructions)`,
    options: [
      {
        label: "Yes (LONGEST EPISODE WAS LESS THAN 14 DAYS for D39)",
        value: 1,
        trigger: "D41",
      },
      { label: "All others", value: 2, trigger: "D54" },
    ],
  },
  {
    number: "D41",
    question: `Did you ever have at least one full year with episodes lasting several days or more just about every month?`,
    options: [
      { label: "Yes", value: 1, trigger: "D42" },
      { label: "No", value: 5, trigger: "D54" },
      { label: "Don't Know", value: 8, trigger: "D54" },
      { label: "Refused", value: 9, trigger: "D54" },
    ],
  },
  {
    number: "D42",
    question: `How old were you the first time you had a year of this sort (when you had an episode just about every month)?`,
    inputType: "response",
    trigger: "D42_1",
  },
  {
    number: "D42_1",
    question: `Did you ever have at least one full year with episodes lasting several days or more just about every month?`,
    options: [
      { label: "ALL", value: 1, trigger: "D43" },
      { label: "MOST", value: 2, trigger: "D43" },
      { label: "SOME", value: 3, trigger: "D43" },
      { label: "NONE", value: 4, trigger: "D43" },
      { label: "DON'T KNOW", value: 8, trigger: "D43" },
      { label: "REFUSED", value: 9, trigger: "D43" },
    ],
  },
  {
    number: "D43",
    question: `About how many different years in your life did you have an episode [of being {D12feeling}]
        just about every month? `,
    inputType: "response",
    trigger: "D44",
  },
  {
    number: "D44",
    question: `Is D43 = 1 YEAR?`,
    options: [
      { label: "Yes", value: 1, trigger: "D46" },
      { label: "All others", value: 2, trigger: "D45" },
    ],
  },
  {
    number: "D45",
    question: `What is the longest continuous number of years in a row in which you had an episode [of being
            {D12feeling}] just about every month?`,
    inputType: "response",
    trigger: "D46",
  },
  {
    number: "D46",
    question: `Did you ever have a full year or longer when you were in an episode most days?`,
    options: [
      { label: "Yes", value: 1, trigger: "D47" },
      { label: "No", value: 5, trigger: "D54" },
      { label: "Don't Know", value: 8, trigger: "D54" },
      { label: "Refused", value: 9, trigger: "D54" },
    ],
  },
  {
    number: "D47",
    question: ` And how old were you the first time you had a year of this sort (when you were in an episode most days)?`,
    inputType: "response",
    trigger: "D48",
  },
  {
    number: "D48",
    question: `About how many different years in your life were you in an episode [of being {D12feeling}]
        most days? `,
    inputType: "response",
    trigger: "D49",
  },
  {
    number: "D49",
    question: `Is D48 = 1 YEAR?`,
    options: [
      { label: "Yes", value: 1, trigger: "D54" },
      { label: "All others", value: 2, trigger: "D50" },
    ],
  },
  {
    number: "D50",
    question: `What is the longest continuous number of years in a row in which you were in an episode most days?`,
    inputType: "response",
    trigger: "D62_1",
  },
  {
    number: "D54",
    question: `How many different years in your life did you have at least one episode? `,
    inputType: "response",
    trigger: "D55",
  },
  {
    number: "D55",
    question: `Is D54 = 1 YEAR?`,
    options: [
      { label: "Yes", value: 1, trigger: "D62_1" },
      { label: "All others", value: 2, trigger: "D56" },
    ],
  },
  {
    number: "D56",
    question: `What is the longest continuous number of years in a row in which you had at least one episode per year?`,
    inputType: "response",
    trigger: "D57",
  },
  {
    number: "D57_instructions_1",
    question: `<b style="color:red;">Select Yes for D57</b>`,
    inputType: "display",
  },
  {
    number: "D57_instructions_2",
    question: `<b style="color:red;">Select Yes for D57</b>`,
    inputType: "display",
  },
  {
    number: "D57_instructions_3",
    question: `<b style="color:red;">Select All others for D57</b>`,
    inputType: "display",
  },
  {
    number: "D57_instructions_4",
    question: `<b style="color:red;">Select All others for D57</b>`,
    inputType: "display",
  },
  {
    number: "D57",
    question: `INTERVIEWER CHECKPOINT: (Check if D39 is 12 months or longer)`,
    options: [
      { label: "Yes (D39 is 12 months or longer)", value: 1, trigger: "D59" },
      { label: "All others", value: 2, trigger: "D58" },
    ],
  },
  {
    number: "D58",
    question: `Did you ever have a period lasting a full year or longer when you were in an episode most days?`,
    options: [
      { label: "Yes", value: 1, trigger: "D59" },
      { label: "No", value: 5, trigger: "D62_1" },
      { label: "Don't Know", value: 8, trigger: "D62_1" },
      { label: "Refused", value: 9, trigger: "D62_1" },
    ],
  },
  {
    number: "D59",
    question: `About how many years in your life were you in an episode most days? `,
    inputType: "response",
    trigger: "D59a",
  },
  {
    number: "D59a",
    question: `And how old were you the first time you had a year of this sort (when you were in an episode most days)?`,
    inputType: "response",
    trigger: "D60",
  },
  {
    number: "D60",
    question: `INTERVIEWER CHECKPOINT: (SEE *D59)`,
    options: [
      { label: "D59 EQUALS '1'", value: 1, trigger: "D62_1" },
      { label: "All others", value: 2, trigger: "D61" },
    ],
  },
  {
    number: "D61",
    question: `What is the longest continuous number of years in a row in which you were in an episode most days?`,
    inputType: "response",
    trigger: "D62_1",
  },
  {
    number: "D62_1",
    question: ` INTERVIEWER CHECKPOINT: (SEE D38)`,
    options: [
      { label: "D38 EQUALS 'Yes (1)'", value: 1, trigger: "D62_2" },
      { label: "All others", value: 2, trigger: "D72" },
    ],
  },
  {
    number: "D62_2",
    question: `INTERVIEWER CHECKPOINT`,
    options: [
      { label: "R CAN READ", value: 1, trigger: "D62_3" },
      { label: "All others", value: 2, trigger: "D64" },
    ],
  },
  {
    number: "D62_3",
    question: `(RB, PG 6-8) For the next questions I need you to think about the period of {D22dtime} or more
    during the past 12 months when your {D12feelingv2} was most severe and
    frequent. Please read each of the fourteen sets of statements on page 6-8 in your booklet and circle the one
    response for each of the fourteen that best describes how you were during those {D22dtime}. As
    you finish each set, please tell me the number of the statement you have circled.`,
    inputType: "display",
    trigger: "D64a.info",
  },
  {
    number: "D64",
    question: `(RB, PG 6_8) For the next questions I need you to think about the period of (several days/two weeks) or more
    during the past 12 months when your {D12feelingv2} was most severe and
    frequent. I'm going to read fourteen series of statements. Please pick the one statement in each series that
    comes closest to your experience during that worst (several days/two weeks). `,
    inputType: "display",
    trigger: "D64a.info",
  },
  {
    number: "D64a.info",
    question: `Here's the first series, which deals with problems falling asleep:
    <br>One: You never took longer than 30 minutes to fall asleep.
    <br>Two: You took at least 30 minutes to fall asleep, less than half the time.
    <br>Three: You took at least 30 minutes to fall asleep, more than half the time.
    <br>Four: You took more than 60 minutes to fall asleep, more than half the time`,
    inputType: "display",
    trigger: "D64a",
  },
  {
    number: "D64a",
    question: `(IF NEC: Which of these four statements was most true of you during your worst (several days/two weeks) of
    being {D12feeling} in the past 12 months?) <br>Put the selected number in numeric form. (One => 1)`,
    inputType: "response",
    trigger: "D64b.info",
  },
  {
    number: "D64b.info",
    question: ` Here's the next series, which deals with waking up at night:
    <br>One: You did not wake up at night.
    <br>Two: You had a restless, light sleep with few brief awakenings each night.
    <br>Three: You woke up at least once a night, but you got back to sleep easily.
    <br>Four: You woke up more than once a night and stayed awake for 20 minutes or more, more than half the time.`,
    inputType: "display",
    trigger: "D64b",
  },
  {
    number: "D64b",
    question: `(IF NEC: Which of these four statements was most true of you during your worst (several days/two weeks) of
    being {D12feeling} in the past 12 months?) <br>Put the selected number in numeric form. (One => 1)`,
    inputType: "response",
    trigger: "D64c.info",
  },
    {
    number: "D64c.info",
    question: ` Here’s the next series, which deals with waking up too early in the morning:
 <br>One: Most of the time, you woke up no more than 30 minutes before you needed to get up.
 <br>Two: More than half the time, you woke up more than 30 minutes before you needed to get up.
 <br>Three: You almost always woke up at least one hour or so before you needed to, but you went back to sleep
 eventually.
 <br>Four: You woke up at least one hour before you needed to and couldn’t get back to sleep. `,
    inputType: "display",
    trigger: "D64c",
  },
  {
    number: "D64c",
    question: `(IF NEC: Which of these four statements was most true of you during your worst (several days/two weeks) of
being {D12feeling} in the past 12 months?) <br>Put the selected number in numeric form. (One => 1)`,
    inputType: "response",
    trigger: "D64d.info",
  },
  {
    number: "D64d.info",
    question: `Here's the next series, which deals with the amount of sleep you got each night:
    <br>One: You slept no longer than 7_8 hours/night, without napping during the day.
    <br>Two: You slept no longer than 10 hours in a 24_hour period including naps.
    <br>Three: You slept no longer than 12 hours in a 24_hour period including naps.
    <br>Four: You slept longer than 12 hours in a 24_hour period including naps. `,
    inputType: "display",
    trigger: "D64d",
  },
  {
    number: "D64d",
    question: `(IF NEC: Which of these four statements was most true of you during your worst (several days/two weeks) of
    being {D12feeling} in the past 12 months?) <br>Put the selected number in numeric form. (One => 1)`,
    inputType: "response",
    trigger: "D64e.info",
  },
  {
    number: "D64e.info",
    question: `Here's the next series, which deals with feeling sad:
    <br>One: You did not feel sad.
    <br>Two: You felt sad less than half the time.
    <br>Three: You felt sad more than half the time.
    <br>Four: You felt sad nearly all the time. `,
    inputType: "display",
    trigger: "D64e",
  },
  {
    number: "D64e",
    question: `(IF NEC: Which of these four statements was most true of you during your worst (several days/two weeks) of
    being {D12feeling} in the past 12 months?) <br>Put the selected number in numeric form. (One => 1)`,
    inputType: "response",
    trigger: "D64f.info",
  },
  {
    number: "D64f.info",
    question: `Here's the next series, which deals with your ability to concentrate and make decisions:
    <br>One: There was no change in your usual capacity to concentrate or make decisions.
    <br>Two: You occasionally felt indecisive or found that your attention wandered.
    <br>Three: Most of the time, you struggled to focus your attention or to make decisions.
    <br>Four: You couldn't concentrate well enough to read or you couldn't make even minor decisions.`,
    inputType: "display",
    trigger: "D64f",
  },
  {
    number: "D64f",
    question: `(IF NEC: Which of these four statements was most true of you during your worst (several days/two weeks) of
    being {D12feeling} in the past 12 months?) <br>Put the selected number in numeric form. (One => 1)`,
    inputType: "response",
    trigger: "D64g.info",
  },
  {
    number: "D64g.info",
    question: `Here's the next series, which deals with feeling down on yourself:
    <br>One: You saw yourself as equally worthwhile and deserving as other people.
    <br>Two: You were more self_blaming than usual.
    <br>Three: You largely believed that you caused problems for others.
    <br>Four: You thought almost constantly about major and minor defects in yourself. `,
    inputType: "display",
    trigger: "D64g",
  },
  {
    number: "D64g",
    question: `(IF NEC: Which of these four statements was most true of you during your worst (several days/two weeks) of
    being {D12feeling} in the past 12 months?) <br>Put the selected number in numeric form. (One => 1)`,
    inputType: "response",
    trigger: "D64h.info",
  },
  {
    number: "D64h.info",
    question: `Here's the next series, which deals with your interest in daily activities:
    <br>One: There was no change from usual in how interested you were in other people or activities.
    <br>Two: You noticed that you were less interested in people or activities.
    <br>Three: You found you had interest in only one or two of your formerly pursued activities.
    <br>Four: You had virtually no interest in formerly pursued activities. `,
    inputType: "display",
    trigger: "D64h",
  },
  {
    number: "D64h",
    question: `(IF NEC: Which of these four statements was most true of you during your worst (several days/two weeks)) of
    being {D12feeling} in the past 12 months?) <br>Put the selected number in numeric form. (One => 1)`,
    inputType: "response",
    trigger: "D64i.info",
  },
  {
    number: "D64i.info",
    question: `Here's the next series, which deals with your energy:
    <br>One: There was no change in your usual level of activity.
    <br>Two: You got tired more easily than usual.
    <br>Three: You had to make a big effort to start or finish your usual daily activities (for example, shopping, homework, cooking, or going to work).
    <br>Four: You really couldn't carry out most of your usual daily activities because you just didn't have the energy.`,
    inputType: "display",
    trigger: "D64i",
  },
  {
    number: "D64i",
    question: `(IF NEC: Which of these four statements was most true of you during your worst (several days/two weeks) of
    being {D12feeling} in the past 12 months?) <br>Put the selected number in numeric form. (One => 1)`,
    inputType: "response",
    trigger: "D64j.info",
  },
  {
    number: "D64j.info",
    question: `Here's the next series, which deals with a change in your appetite:
    <br>One: There was no change in your usual appetite.
    <br>Two: You ate somewhat less often or lesser amounts of food than usual.
    <br>Three: You ate much less than usual and only with personal effort.
    <br>Four: You rarely ate within a 24_hr period, and only with extreme personal effort or when others persuaded you
   to eat.
   <br>Five: You felt a need to eat more frequently than usual.
   <br>Six: You regularly ate more often and/or greater amounts of food than usual
   <br>Seven: You felt driven to overeat both at mealtime and between meals. `,
    inputType: "display",
    trigger: "D64j",
  },
  {
    number: "D64j",
    question: `(IF NEC: Which of these seven statements was most true of you during your worst (several days/two weeks) of
    being {D12feeling} in the past 12 months?) <br>Put the selected number in numeric form. (One => 1)`,
    inputType: "response",
    trigger: "D64k.info",
  },
  {
    number: "D64k.info",
    question: `Here's the next series, which deals with changes in your weight:
    <br>One: You did not have a change in your weight.
    <br>Two: You felt as if you had a slight weight loss.
    <br>Three: You lost 2 pounds or more.
    <br>Four: You lost 5 pounds or more.
    <br>Five: You felt as if you had a slight weight gain.
    <br>Six: You gained 2 pounds or more.
    <br>Seven: You gained 5 pounds or more. `,
    inputType: "display",
    trigger: "D64k",
  },
  {
    number: "D64k",
    question: `(IF NEC: Which of these seven statements was most true of you during your worst (several days/two weeks) of
    being {D12feeling} in the past 12 months?) <br>Put the selected number in numeric form. (One => 1)`,
    inputType: "response",
    trigger: "D64l.info",
  },

  {
    number: "D64l.info",
    question: `Here's the next series, which deals with thoughts of death or suicide:
    <br>One: You did not think of suicide or death.
    <br>Two: You felt that life was empty or wondered if it was worth living.
    <br>Three: You thought of suicide or death several times a week for several minutes.
    <br>Four: You thought of suicide or death several times a day in some detail, or you made specific
    plans for suicide or actually tried to take your own life. `,
    inputType: "display",
    trigger: "D64l",
  },
  {
    number: "D64l",
    question: `(IF NEC: Which of these four statements was most true of you during your worst (several days/two weeks) of
    being {D12feeling} in the past 12 months?) <br>Put the selected number in numeric form. (One => 1)`,
    inputType: "response",
    trigger: "D64m.info",
  },
  {
    number: "D64m.info",
    question: `Here's the next series, which deals with feeling slowed down:
    <br>One: You thought, spoke, and moved at your usual rate of speed.
    <br>Two: You found that your thinking was slowed down or your voice sounded dull or flat.
    <br>Three: It took you several seconds to respond to most questions, and you're sure your thinking
     was slowed.
    <br>Four: You were often unable to respond to questions without extreme effort`,
    inputType: "display",
    trigger: "D64m",
  },
  {
    number: "D64m",
    question: `(IF NEC: Which of these four statements was most true of you during your worst (several days/two weeks) of
    being {D12feeling} in the past 12 months?) <br>Put the selected number in numeric form. (One => 1)`,
    inputType: "response",
    trigger: "D64n.info",
  },
  {
    number: "D64n.info",
    question: `Here's the last series, which deals with feeling restless:
    <br>One: You did not feel restless.
    <br>Two: You were often fidgety, wringing your hands, or needing to shift how you were sitting.
    <br>Three: You had impulses to move about and were quite restless.
    <br>Four: At times, you were unable to stay seated and needed to pace around.`,
    inputType: "display",
    trigger: "D64n",
  },
  {
    number: "D64n",
    question: `(IF NEC: Which of these four statements was most true of you during your worst (several days/two weeks) of
    being {D12feeling} in the past 12 months?) <br>Put the selected number in numeric form. (One => 1)`,
    inputType: "response",
    trigger: "D66",
  },
  {
    number: "D66",
    question: `(RB, PG 9) Think about the period lasting one month or longer in the past 12 months when your
    {D12feeling} was most severe. Using the 0 to 10 scale on page 9 of your
    booklet, where 0 means no interference and 10 means very severe interference, what number describes how
    much your {D12feelingv2} interfered with each of the following activities during
    that period?
    <br>(IF NEC: How much did your {D12feelingv2} interfere with (ACTIVITY)
    during that period?)`,
    inputType: "display",
    trigger: "D66.scale",
  },
  {
    number: "D66.scale",
    question: `No Interference: 0
    <br>Mild: 0 - 3
    <br> Moderate: 4 - 6
    <br> Severe: 7 - 9
    <br> Very Severe Interference: 10
    <br>(IF NEC: You can use any number between 0 and 10 to answer.) `,
    inputType: "display",
    trigger: "D66a",
  },
  {
    number: "D66a",
    question: `Your home management, like cleaning,
    shopping, and working around the (house/ apartment)
    (or yard)? `,
    inputType: "response",
    options: [
      { label: "DOES NOT APPLY", value: 97, trigger: "D66b" },
      { label: "DON'T KNOW", value: 98, trigger: "D66b" },
      { label: "REFUSED", value: 99, trigger: "D66b" },
    ],
    trigger: "D66b",
  },
  {
    number: "D66b",
    question: `Your ability to work? `,
    inputType: "response",
    options: [
      { label: "DOES NOT APPLY", value: 97, trigger: "D66c" },
      { label: "DON'T KNOW", value: 98, trigger: "D66c" },
      { label: "REFUSED", value: 99, trigger: "D66c" },
    ],
    trigger: "D66c",
  },
  {
    number: "D66c",
    question: `Your ability to form and maintain close
    relationships with other people? `,
    inputType: "response",
    options: [
      { label: "DOES NOT APPLY", value: 97, trigger: "D66d" },
      { label: "DON'T KNOW", value: 98, trigger: "D66d" },
      { label: "REFUSED", value: 99, trigger: "D66d" },
    ],
    trigger: "D66d",
  },
  {
    number: "D66d",
    question: `Your social life? `,
    inputType: "response",
    options: [
      { label: "DOES NOT APPLY", value: 97, trigger: "D67" },
      { label: "DON'T KNOW", value: 98, trigger: "D67" },
      { label: "REFUSED", value: 99, trigger: "D67" },
    ],
    trigger: "D67",
  },
  {
    number: "D67_instruction",
    question: `<b style="color:red;">Select ALL RESPONSES EQUAL '0' OR '97' for D67</b>`,
    inputType: "display",
  },
  {
    number: "D67",
    question: `INTERVIEWER CHECKPOINT: (SEE *D67_instruction, if D67_instruction does not appear, choose 'All others')`,
    options: [
      { label: "All responses equal '0' or '97' for D66a to D66d", value: 1, trigger: "D72" },
      { label: "All others", value: 2, trigger: "D68" },
    ],
  },
  {
    number: "D68",
    question: `About how many days out of 365 in the past 12 months were you totally unable to work or carry out your normal
    activities because of your {D12feelingv2}? (IF NEC: You can use any number between 0 and 365 to answer.)`,
    inputType: "response",
    trigger: "D72",
  },
  {
    "number": "D72",
    "question": `Did you ever in your life talk to a medical doctor or other professional about your {D12feelingv2}?<br>(By professional we mean psychologists, counselors, spiritual
    advisors, herbalists, acupuncturists, and other healing professionals.)`,
    "options": [
      { "label": "Yes", "value": 1, "trigger": "D72a" },
      { "label": "No", "value": 5, "trigger": "D87_1" },
      { "label": "Don't Know", "value": 8, "trigger": "D87_1" },
      { "label": "Refused", "value": 9, "trigger": "D87_1" }
    ]
  },
  {
    "number": "D72a",
    "question": `How old were you the first time [you talked to a professional about your {D12feelingv2}]?`,
    "inputType": "response",
    "trigger": "D84",
  },
  {
    number: "D84",
    question: `Did you ever get treatment for your {D12feelingv2} that you considered helpful
    or effective?`,
    options: [
      { label: "Yes", value: 1, trigger: "D84a" },
      { label: "No", value: 5, trigger: "D84c" },
      { label: "Don't Know", value: 8, trigger: "D84c" },
      { label: "Refused", value: 9, trigger: "D84c" },
    ],
  },
  {
    "number": "D84a",
    "question": `How old were you the first time [you got helpful treatment for your {D12feelingv2}]? `,
    "inputType": "response",
    "trigger": "D84b",
  },
  {
    "number": "D84b",
    "question": `How many professionals did you ever talk to about your {D12feelingv2},
    up to and including the first time you got helpful treatment? `,
    "inputType": "response",
    options: [
      { label: "Don't know", value: 98, "trigger": "D86" },
      { label: "Refused", value: 99, "trigger": "D86" },
    ],
    "trigger": "D86",
  },
  {
    "number": "D84c",
    "question": `How many professionals did you ever talk to about your {D12feelingv2}?`,
    "inputType": "response",
    options: [
      { label: "Don't know", value: 98, "trigger": "D86" },
      { label: "Refused", value: 99, "trigger": "D86" },
    ],
    "trigger": "D86"
  },
  {
    "number": "D86",
    "question": `Did you receive professional treatment for your {D12feelingv2} at any time in the
    past 12 months? `,
    "options": [
      { label: "Yes", value: 1, trigger: "D87" },
      { label: "No", value: 5, trigger: "D87" },
      { label: "Don't Know", value: 8, trigger: "D87" },
      { label: "Refused", value: 9, trigger: "D87" },
    ],
  },
  {
    "number": "D87",
    "question": `Were you ever hospitalized overnight for your {D12feelingv2}? 
    `,
    "options": [
      { label: "Yes", value: 1, trigger: "D87a" },
      { label: "No", value: 5, trigger: "D87_1" },
      { label: "Don't Know", value: 8, trigger: "D87_1" },
      { label: "Refused", value: 9, trigger: "D87_1" },
    ],
  },
  {
    "number": "D87a",
    "question": `How old were you the first time [you were hospitalized overnight because of your {D12feelingv2}]? 
    `,
    "inputType": "response",
    "options": [
      { label: "Don't Know", value: 8, trigger: "D87_1" },
      { label: "Refused", value: 9, trigger: "D87_1" },
    ],
    "trigger": "D87_1"
  },
  {
    "number": "D87_1",
    "question": ` How many of your close relatives – including your biological parents, brothers, sisters, and children – ever had
    episodes of being {D12feeling} that either caused them a lot of distress or that
    interfered with their lives? 
    `,
    "inputType": "response",
    "trigger": "D88",
  },
  {
    "number": "D88",
    "question": "You have reached the end of the questionnaire.<br>Please check that all fields above are answered correctly before submitting.",
    "inputType": "display"
  },
];

compulsoryQuestions = ["SC1", "SC21", "SC22", "SC23", "SC24", "SC25"];
questionPool = {};
conditionalQuestions = {
  D1: [["SC21", [1]]],
  D2: [["SC22", [1]], ["SC21", ['~1', '~""']]],
  D9: [["SC23", [1]], ["SC21", ['~1']], ["SC22", ['~1']]],
  D9a_1: [["D9a", ["~999", "~998"]]], // '~' means not equal to, all conditions in array must be satisfied
  D9a_2: [["D9a", [999, 998], "or"]], // 'or' means any value in D9a will satisfy the condition
  "D20_instructions_1": [
    ["D17", [1]],
    ["D18", [4]],
    ["D19", [4]],
  ],
  D22b1: [["D22b", ["~999", "~998"]]], // only ask for units if a valid age/time is given (NOT don't know or refuse)
  D22d1: [["D22d", ["~999", "~998"]]],
  D26c_1: [["D26d", ["~999", "~999"]]],
  D26e_1: [["D26f", ["~999", "~999"]]],
  D29a_detail_1: [
    ["D24a", [1]],
    ["D29", ['~""']]
  ],
  D29a_detail_2: [
    ["D24c", [1]],
    ["D29", ['~""']]
  ],
  D29a_detail_3: [
    ["D24e", [1]],
    ["D29", ['~""']]
  ],
  D37c2: [["D37c1", ["~998", "~999"]]],
  D37e_instructions: [
    ["D29", [1, 2, 3], "or"],
    ["D37d", ['~""']]
  ],
  D37g_instructions: [
    ["D29", [1]],
    ["D37e", ['~""']]
  ],
  D37h2: [["D37h1", ["~999", "~998"]]],
  D37i2: [["D37i1", ["~999", "~998"]]],
  D37l_instructions: [
    ["D29", [2]],
    ["D37k", ['~""']]
  ],
  D37m2: [["D37m1", ["~999", "~998"]]],
  D37n2: [["D37n1", ["~999", "~998"]]],
  D38_1_instructions: [["D38", ['~1']], ["D29", [1, 2, 3], "or"]],
  D38a_7b: [["D38a_7a", ["~999", "~998"]]],
  D38b_1_instructions_1: [["D38b", ['~""']],["D29", [1]]],
  D38b_1_instructions_2: [
    ["D38b", ['~""']], ["D29", [2, 3], "or"]
  ],
  D38b_1_instructions_3: [
    ["D38b", ['~""']], ["D29", ["~1", "~2", "~3"]]
  ],
  D39a: [["D39", ["~999", "~998"]]],
  D40_instructions_1: [
    ["D39", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], "or"],
    ["D39a", [1]]
  ],
  D40_instructions_2: [
    ["D39", [0, 1], "or"],
    ["D39a", [2]]
  ],
  D40_instructions_3: [
    [
      "D39",
      [
        "~0",
        "~1",
        "~2",
        "~3",
        "~4",
        "~5",
        "~6",
        "~7",
        "~8",
        "~9",
        "~10",
        "~11",
        "~12",
        "~13",
      ],
      "or",
    ],
    ["D39a", [1]]
  ],
  D40_instructions_4: [
    ["D39", ["~0", "~1"]],
    ["D39a", [2]]
  ],
  D40_instructions_5: [
    ["D39", ['~""']],
    ["D29", [1, 2, 3], "or"]
  ],
  D57_instructions_1: [
    [
      "D39",
      [
        "~0",
        "~1",
        "~2",
        "~3",
        "~4",
        "~5",
        "~6",
        "~7",
        "~8",
        "~9",
        "~10",
        "~11",
      ],
      "or"
    ],
    ["D39a", [3]],
    ["D56", ['~""']]
  ],
  D57_instructions_2: [
    ["D39a", [4]],
    ["D56", ['~""']]
  ],
  D57_instructions_3: [
    ["D39", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], "or"],
    ["D39a", [3]],
    ["D56", ['~""']]
  ],
  D57_instructions_4: [
    ["D39a", [1, 2], "or"],
    ["D56", ['~""']]
  ],
  D67_instruction: [
    ["D66a", [97, 0], 'or'],
    ["D66b", [97, 0], 'or'],
    ["D66c", [97, 0], 'or'],
    ["D66d", [97, 0], 'or']
  ],
  D88: [
    ["SC21", ['~1']],
    ["SC22", ['~1']],
    ["SC23", ['~1']]
  ]
};
