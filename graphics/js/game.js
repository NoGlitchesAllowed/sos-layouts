$('.twitchNameplate').hide();

function cycleNameplates() {
  let nameplates = $('.nameplate').toArray();
  for (const nameplate of nameplates) {
    let twitchNameplate = $(nameplate).children('.twitchNameplate').first();
    let runnerNameplate = $(nameplate).children('.runnerNameplate').first();
    let runnerShown = runnerNameplate.is(":visible");
    if (runnerShown) {
      let twitch = $(twitchNameplate).children('.twitchText').first().text();
      if (!twitch) {
        continue;
      }
      twitchNameplate.fadeIn(1000);
      runnerNameplate.fadeOut(1000);
      continue;
    } else {
      twitchNameplate.fadeOut(1000);
      runnerNameplate.fadeIn(1000);
      continue;
    }
  }
}

setInterval(cycleNameplates, 20000);

const runDataActiveRun = nodecg.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
runDataActiveRun.on('change', (run) => {
const players = run.teams.flatMap((t) => t.players);
  const nameplateCount = $('.nameplate').toArray().length;
  for (let i = 0; i < players.length && i < nameplateCount; i++) {
    const player = players[i];
    $(`#twitch${i}`).text(player.social.twitch ?? '');
    $(`#runner${i}`).text(player.name);
    if (player.pronouns) {
      $(`.pronouns${i}`).text(player.pronouns ?? '');
      $(`.pronouns${i}`).show();
    } else {
      $(`.pronouns${i}`).hide();
    }
  }
  $('#game').text(run.game);
  textFitDelayed($('#game'), {
    multiLine: true,
    alignHoriz: true,
    alignVert: true,
    maxFontSize: 160
  });
  $('#category').text(run.category);
  textFitDelayed($('#category'), {
    multiLine: false,
    alignHoriz: true,
    alignVert: true,
    maxFontSize: 80
  });
  let systemAndYear = [];
  if (run.system) systemAndYear.push(run.system);
  if (run.release) systemAndYear.push(run.release);
  $('#systemAndYear').text(systemAndYear.join(', '));
  $('#estimate').text(`EST ${run.estimate.substring(1)}`);
});

const timer = nodecg.Replicant('timer', 'nodecg-speedcontrol');
timer.on('change', (timer) => {
  let time = timer.time.substring(1);
  $('#timer').text(time);
});

function textFitDelayed(element, options) {
  for (let i = 0; i <= 1000; i += 500) {
    setInterval(() => {
      textFit(element, options);
    }, 500)
  }
}

nodecg.Replicant('cameraControl').on('change', (cameras) => {
  for (let i = 0; i < cameras.length; i++) {
    let element = $(`#cameraFill${i}`);
    if (cameras[i]) {
      element.hide();
    } else {
      element.show();
    }
  }
});