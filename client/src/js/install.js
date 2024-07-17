const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

	window.deferredPrompt = event;
	// Show the button.
	butInstall.classList.toggle("hidden", false);
});

// Click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
	if (!promptEvent) {
		return;
	}

	// Show prompt.
	promptEvent.prompt();

	// Reset the deferred prompt variable so that it is used once.
	window.deferredPrompt = null;

	// Hide the button.
	butInstall.classList.toggle("hidden", true);
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
