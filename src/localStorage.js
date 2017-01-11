const KEY = 'REACT_TODO_LS_KEY';

export function getState() {
	try {
		const state = localStorage.getItem(KEY);
		if (state) {
			return JSON.parse(state);
		} else {
			return undefined;
		}
	} catch(e) {
		return undefined;
	}
}

export function saveState(state) {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem(KEY, serializedState);
	} catch(e) {
		console.log('Failed to save application state', e);
	}
}