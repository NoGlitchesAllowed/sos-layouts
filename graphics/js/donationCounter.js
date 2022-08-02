nodecg.Replicant('total', 'nodecg-tiltify').on('change', (total) => {
  $('#donationTotal').text(Math.floor(total));
});