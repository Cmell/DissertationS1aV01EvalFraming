The basic idea here is that the StudySetUp.html file generates a `taskControl` variable which is saved in the `jatos.studySessionData` variable (i.e., accessed via `jatos.studySessionData.taskControl`). `jatos.studySessionData` has a `curIndex` attribute as well, which allows the control file, StudyFlow.html to know where it is.

`taskControl` items include only the info needed by the module that they are intended for (in true JSON tradition). That is, instruction objects basically only include an id and the category labels plus stimuli needed to construct the page. GNAT block objects include all the info listed in the section below.

# Batch Data

These were generated via the file `GeneratConditionJSON.html`. This can be run when a new file is needed, the result exported, and then copied into the batch data field in the JATOS GUI. At the moment, the idea here is randomly assign participants but in a constrained way. The design will be random but still relatively balanced using this method.

# Study Flow

This file is simply responsible for updating `jatos.studySessionData.curIndex`, setting the `jatos.studySessionData.curTaskCtrl` variable accordingly, and syncing that data to the server. Because of the asynchronous nature of javascript server communication, the next component is started only after the data sync is completed (via the callback specified in the `jatos.setStudySessionData(...)` call).

# Instruction Components

The informed consent and study introduction pages are unique and get their own components, named accordingly.

The instructions for each block set and each individual block are relatively standard. I built separate HTML files for each that automagically generate the instructions when category labels and stimuli are supplied: `GNATSetInstructions.html`, `GNATSetCategoryTables.html`, and `GNATBlockInstructions.html`.

The practice blocks are more individualized, so they have their own pages: `PracIntro1a.html`, `PracIntro1b.html`, and `PracIntro2.html`.

# GNAT block objects must have:

- id: Component ID of the jatos component that runs a GNAT block. In this study, the GNAT block is assigned to ID 45. This is required.
- stims: a list of two-item lists. The first is the word, the second is either "go" or "nogo". Defaults to the set: [["dog", "go"],["cat", "go"],["tree", "nogo"],["flower", "nogo"]].
- rightLab, leftLab: the labels to show on screen. Defaults to "".
- isi: inter-stimulus interval in ms. Defaults to 150.
- stimdur: Duration of each stimulus in ms. Defaults to 1000.
- fbtime: feedback time in ms. Defaults to 150.
- blockType: a string designating the blocktype to save in the data. Defaults to "none."
- blockNum: an integer (probably) that represents the block number within the task. Defaults to 0.

Note that the defaults are intended as relatively absurd values that indicate that something is missing. For example, if the data show a blockNum of 0, then it was not supplied in the code.

# GNAT Data Output

GNAT data is stored as an array of objects. When exported from the GNAT Block component in JATOS, this yeilds a text file with a JSON array on each line. This can be parsed in R via the example script `SampleDataParsing.R`.

- blockNum: defaults to zero.
- trialNum: trial number relative to the block.
- blockType:
- stimulusCategory: a string representing the category of the stimulus
- trialType: equivalent to the correct answer for the trial. Either "go" or "nogo"
- stimulus: the string representing the stimulus
- keyPressed: Either "Y" if a key was pressed or "N" if not.
- rt: in ms. Note that this currently records an RT even when the participant does not respond. This is so that the performance of the code can be assessed. If this value is very different from the response window (600ms on critical blocks) then something might be going wrong.
- sdtRespCode: response type in SDT terminology. "HIT" for hit, "CR" for correct rejection, "FA" for false alarm, and "MISS" for timeout (miss)
- Finally, all jatosIds are added to each trial.

# Context Data

The name field of each item is constructed:

`rating_[order shown]_[first behavior index]_[second behavior index]`

The response is saved as the item index the participant chose.

# Show Accuracy and Store Accuracy Files

These both may filter the trials to use by block type. This is done via a variable called `pracTypes` in each. This should be updated if the block type of the practice blocks ever changes.

# Computer Links

Each computer gets its own "worker" link, and `studyResultId` differentiates participant runs like in the previous task.

Links:
- 1: https://psych-srv2.colorado.edu/publix/6/start?batchId=21&personalMultipleWorkerId=349
- 2: https://psych-srv2.colorado.edu/publix/6/start?batchId=21&personalMultipleWorkerId=350
- 3: https://psych-srv2.colorado.edu/publix/6/start?batchId=21&personalMultipleWorkerId=351
- 4: https://psych-srv2.colorado.edu/publix/6/start?batchId=21&personalMultipleWorkerId=352

The computers are numbered starting from closest to the bookshelf (1) and going around the room from there.

# Miscellaneous Notes

When exchanging data with the batch session data object, JSON pointers are used. For this purpose, it is important to start the `path` variable with a `/`. Without the `/`, an error will be logged in the JATOS log files, but it will not show up as an error in javascript. The request will simply fail. Maybe there is a better way to set up the callback function for failure so that the error is relayed to console, but at the moment that doesn't happen in this task. So note this for the future.
