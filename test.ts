import {createHistory, createHashHistory, createLocation, useBeforeUnload, useQueries, useBasename} from "./history";

/** Getting Started */
() => {
	let history = createHistory()

	// Listen for changes to the current location. The
	// listener is called once immediately.
	let unlisten = history.listen(function(location) {
		console.log(location.pathname)
	});

	// When you're finished, stop the listener.
	unlisten();
}

/** Navigation */
() => {
	let history = createHistory();
	// Push a new entry onto the history stack.
	history.push('/home');

	// Replace the current entry on the history stack.
	history.replace('/profile');

	// Push a new entry with state onto the history stack.
	history.push({
		pathname: '/about',
		search: '?the=search',
		state: { some: 'state' }
	});

	// Go back to the previous history entry. The following
	// two lines are synonymous.
	history.go(-1)
	history.goBack()
}

/** Creating Urls */
() => {
	let history = createHistory();
	let href = history.createHref('/the/path');
}

/** Location */
() => {
	let history = createHistory();
	const location = createLocation('/a/path?a=query', { the: 'state' })
	// Alternatively, you can use a history object's createLocation method:
	const historyLocation = history.createLocation('/a/path?a=query', { the: 'state' })
}

/** Navigation */
() => {
	let history = createHistory();
	history.listenBefore(function(location) {
		if (location) {
			return 'Are you sure you want to leave this page?'
		}
	});

	history.listenBefore(function(location, callback) {
		setTimeout(callback);
	});

	let otherHistory = createHistory({
		getUserConfirmation(message, callback) {
			callback(window.confirm(message)) // The default behavior
		}
	});
}

() => {
	let history = useBeforeUnload(createHistory)()

	history.listenBeforeUnload(function() {
		return 'Are you sure you want to leave this page?'
	});
}

/** Use Queries */
() => {
	const history = useQueries(createHistory)({
		parseQueryString: s => JSON.parse(s),
		stringifyQuery: o => JSON.stringify(o)
	});

	history.createPath({ pathname: '/the/path', query: { the: 'query' } });
	history.push({ pathname: '/the/path', query: { the: 'query' } });
}

/** Use Base */
() => {
	let history = useBasename(createHistory)({
		basename: '/base'
	});
}

/** Hash History */
() => {
	createHashHistory({ queryKey: '_some' })
}
