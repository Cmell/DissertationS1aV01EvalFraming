// This script provides convenience functions that rely on JATOS. It must
// be loaded after JATOS is, and it relies on certain objects being present in
// the task control object.
var somethingFailed = function () {
  // TODO: test failure functionality
  console.log('Current index:' +
    jatos.studySessionData.curIndex
  );
  alert('something went wrong in advancing the task!');
};

var advanceTask = function (resultData) {
  var task1 = function () {
    // saves study session data
    jatos.setStudySessionData(
      jatos.studySessionData,
      onSuccess = task2,
      onFail = somethingFailed
      );
  };
  var task2 = function () {
    var componentToStart = jatos.studySessionData.idDict[
      jatos.studySessionData.taskControl[
        jatos.studySessionData.curIndex
      ].id
    ];
    if (typeof resultData !== 'undefined') {
      jatos.addJatosIds(resultData);
      jatos.startComponent(
        componentToStart,
        resultData,
        somethingFailed
      );
    } else {
      jatos.startComponent(
        componentToStart
      )
    }
  };

  jatos.studySessionData.curIndex = jatos.studySessionData.curIndex + 1;
  jatos.studySessionData.curTaskCtrl = jatos.studySessionData.taskControl[
    jatos.studySessionData.curIndex
  ];
  task1();
};
