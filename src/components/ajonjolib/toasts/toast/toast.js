const eventBus = {
    listeners: {},

    subscribe: (eventName, callback) => {
        if (!eventBus.listeners[eventName]) {
            eventBus.listeners[eventName] = [];
        }
        eventBus.listeners[eventName].push(callback);
    },

    unsubscribe: (eventName, callback) => {
        if (eventBus.listeners[eventName]) {
            eventBus.listeners[eventName] = eventBus.listeners[eventName].filter(
                (listener) => listener !== callback
            );
        }
    },

    emit: (eventName, data) => {
        if (eventBus.listeners[eventName]) {
            eventBus.listeners[eventName].forEach((listener) => listener(data));
        }
    },
};

const ToastTypes = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    INFO: 'info',
    DARK_SUCCESS: 'dark_success',
    DARK_ERROR: 'dark_error',
};

function toast(message, type = ToastTypes.SUCCESS) {
    eventBus.emit('showToast', { message: message, type: type });
}

function openModal(modalName, data) {
    eventBus.emit(`${modalName}_open`, data);
}

function closeModal(modalName) {
    eventBus.emit(`${modalName}_close`);
}

function subscribeModal(modalName, setter, callback) {
    eventBus.subscribe(`${modalName}_open`, (data) => {
        setter(true);
        callback(data);
    });

    eventBus.subscribe(`${modalName}_close`, (data) => {
        setter(false)
    });
}

export {
    eventBus,
    ToastTypes,
    toast,
    openModal,
    closeModal,
    subscribeModal
}
