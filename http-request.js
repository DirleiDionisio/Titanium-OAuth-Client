var httpRequest = function(params) {
	// params:
	// method
	// url
	// onload
	// onerror
	// async (optional, default true) -> only for iOS
	
	params.async = (params.async!==null && params.async!==undefined) ? params.async : true;
	
	var httpClient = Ti.Network.createHTTPClient({
		timeout: 200000
	});
	
	httpClient.onload = function() {
		Ti.API.info('#response: ' + this.statusText + ' | ' + this.responseText);
		params.success(this.responseText);
	};
	
	httpClient.onerror = function(e) {
		Ti.API.error('#errorObj: ' + JSON.stringify(e));
		Ti.API.info('#response: ' + this.statusText + ' | ' + this.responseText);
		params.error({
			error: e.error,
			response: this.responseText
		});
	};

	httpClient.open(params.method, params.url, params.async);
	
	Ti.API.info('#httpRequest: ' + params.method + ' | ' + params.url);
	httpClient.send();
};