var obj={};
var arr=[];
var msg=null;
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {

		if ( request.type === 'notification' ) 
		{	
			tId=setTimeout(() => {
				chrome.notifications.create('',
					{ 
						type: 'basic',
						title: request.message,
						message: 'your reminder' ,
						iconUrl: './assets/icons/64.png',
					}
					);
				arr.splice(arr.indexOf(msg),1);
				msg=null;
				
			}, request.time);
			console.log("settimeout id created:"+tId);
			Object.defineProperty(obj, request.message, {value:tId});
			arr.push(tId);
			console.log("id array now is:"+arr);
		}

	if ( request.type === 'clear' ) 
	{
		let id=Object.getOwnPropertyDescriptor(obj, request.message);
		// console.log("id value of msg:"+id.value);
		if (id !== undefined) 
		{
		msg=id.value;
		}
		if(arr.includes(msg))
		{
		clearTimeout(msg);
		}

	}
	return true;
}
);