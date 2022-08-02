(async function setupCameraControl() {
  let checkboxes = () => Array.from(document.getElementsByClassName('camera'));

  let replicant = nodecg.Replicant('cameraControl');
  await NodeCG.waitForReplicants(replicant);
  checkboxes().forEach(registerUpdateListener);
  replicant.on('change', receiveUpdate);

  function sendUpdate() {
    replicant.value = checkboxes().map(e => e.checked);
  }

  function receiveUpdate(value) {
    for (let i = 0; i < value.length; i++) {
      checkboxes()[i].checked = value[i];
    }
  }

  function registerUpdateListener(checkbox) {
    checkbox.addEventListener('change', sendUpdate);
  }
})();

(async function setupCommentaryControl() {
  let replicant = nodecg.Replicant('commentary');
  await NodeCG.waitForReplicants(replicant);
  $('#submit-comms').click(sendUpdate);
  replicant.on('change', receiveUpdate);
  
  
  function getCommsObj(id) {
    let name = $(id).val();
    let pronouns = $(`${id}Pronouns`).val();
    if (!name) return null;
    if (!pronouns) pronouns = null;
    return {name, pronouns};
  }
  
  function sendUpdate() {
    let host = getCommsObj('#host');
    let commentators = [];
    for (let i = 0; i < 2; i++) {
      let commentator = getCommsObj(`#comm${i}`);
      if (commentator) commentators.push(commentator);
    }
    
    let value = { host, commentators };
    console.log(value);
    replicant.value = value;
  }

  function receiveUpdate(value) {
    receiveUpdateSingle(value.host, '#host');
    
    for (let i = 0; i < value.commentators.length; i++) {
      receiveUpdateSingle(value.commentators[i], `#comm${i}`);
    }
  }
  
  function receiveUpdateSingle(commsObj, id) {
    if (!commsObj) commsObj = {};
    let name = commsObj.name;
    let pronouns = commsObj.pronouns;
    if (!name) name = '';
    if (!pronouns) pronouns = '';
    $(id).val(name);
    $(`${id}Pronouns`).val(pronouns);
  }
})();




