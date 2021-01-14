

function getParameter(theParameter) {
	var params = window.location.search.substr(1).split('&');

	for (var i = 0; i < params.length; i++) {
		var p = params[i].split('=');
		if (p[0] == theParameter) {
			return decodeURIComponent(p[1]);
		}
	}
	return false;
}

function removeParams(){
	var url = window.location.href
	let params = url.searchParams;           
	if (params.has('page')) params.delete('page')

	return url
}


function insertParam(key, value) {
	key = encodeURIComponent(key);
	value = encodeURIComponent(value);

    // kvp looks like ['key1=value1', 'key2=value2', ...]
    var kvp = document.location.search.substr(1).split('&');
    let i=0;

    for(; i<kvp.length; i++){
    	if (kvp[i].startsWith(key + '=')) {
    		let pair = kvp[i].split('=');
    		pair[1] = value;
    		kvp[i] = pair.join('=');
    		break;
    	}
    }

    if(i >= kvp.length){
    	kvp[kvp.length] = [key,value].join('=');
    }

    // can return this or...
    let params = kvp.join('&');

    // reload page with new params
    document.location.search = params;

}
