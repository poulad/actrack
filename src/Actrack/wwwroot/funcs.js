function invokeDotNetStaticMethod(method, arg) {
  if (arg) {
    if (typeof arg !== 'string') {
      arg = JSON.stringify(arg)
    }
    DotNet.invokeMethodAsync('Actrack', method, arg)
      .catch(reason => console.warn('Failed to invoke a static .NET method: ' + method, '.', reason))
  } else {
    DotNet.invokeMethodAsync('Actrack', method)
      .catch(reason => console.warn('Failed to invoke a static .NET method: ' + method, '.', reason))
  }
}

function invokeDotNetInstanceMethod(dotnetObjRef, method, error, ...args) {
  const errJson = error ? JSON.stringify(error) : null;
  dotnetObjRef.invokeMethodAsync(method, errJson, ...args)
    .catch(reason => console.warn('Failed to invoke an instance .NET method: ' + method, '.', reason))
}

window.actrack = {}

window.actrack.sw = {
  register: (script, dotnetObjRef, callback) => {
    navigator.serviceWorker.register(script)
      .then(registration => invokeDotNetInstanceMethod(dotnetObjRef, callback, null, JSON.stringify(registration)))
      .catch(err => invokeDotNetInstanceMethod(dotnetObjRef, callback, err));
  }
}

window.actrack.storage = {
  askForPersistencePermission: (dotnetObjRef, callback) => {
    navigator.storage.persist()
      .then(isGranted => invokeDotNetInstanceMethod(dotnetObjRef, callback, null, isGranted))
      .catch(err => invokeDotNetInstanceMethod(dotnetObjRef, callback, err));
  },

  checkPersistencePermission: (dotnetObjRef, callback) => {
    navigator.storage.persisted()
      .then(isGranted => invokeDotNetInstanceMethod(dotnetObjRef, callback, null, isGranted))
      .catch(err => invokeDotNetInstanceMethod(dotnetObjRef, callback, err));
  }
}

window.actrack.installation = {
  isPromptConfigured: false,

  configurePrompt: (dotnetObjRef, callback) => {
    window.addEventListener('beforeinstallprompt', e => {
      // e.preventDefault();
      window.actrack.installation.deferredPrompt = e;
      invokeDotNetInstanceMethod(dotnetObjRef, callback);
    });
    window.actrack.installation.isPromptConfigured = true;
  }
}