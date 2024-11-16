// Poll server for liveness and reload if it comes back up
(function () {
  let disconnected = false;

  function checkLiveness() {
    fetch("/__poll_for_liveness")
      .then((response) => {
        if (disconnected) {
          // Server is back up, reload the page
          window.location.reload();
        }
        disconnected = false;
      })
      .catch((err) => {
        // Server is down, enter disconnected state
        disconnected = true;
        console.log(
          "Lost connection to development server, waiting for reconnect..."
        );
      });
  }

  // Poll every 500ms
  setInterval(checkLiveness, 500);
})();
