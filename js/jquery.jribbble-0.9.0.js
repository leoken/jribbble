/**
 * jQuery Plugin "jribbble" 0.9.0
 * Author: Tyler Gaw - http://tylergaw.com
 * 
 * A jQuery plugin to fetch data from the Dribbble API - http://dribbble.com/api
 *
 */

(function ($) {
	
	// @return OBJ
	$.fn.jribbble = function ()
	{				
		// Make a request to the API
		// @param STRING url
		// @param FUNCTION callback
		// @param OBJ OPTIONAL options
		this.makeRequest = function (url, callback, options)
		{
			var successHandler = function (data)
			{
				if ($.isFunction(callback))
				{
					callback(data);
				}
			};

			$.ajax(
				{
					data: options,
					dataType: 'jsonp',
					success: successHandler,
					type: 'GET',
					url: $.fn.jribbble.baseUrl + url
				}
			);
		};

        // Returning "this", allows this plugin to be chainable
		return this;
    };
	
	// Public Static Members
	// Can be set globally for all jquery.jribbble requests
	
	// @member baseUrl - Will be prepended to all API requests
	$.fn.jribbble.baseUrl = 'http://api.dribbble.com/';
	
	// Public Static Methods
	// These are available at any time, you do not have to
	// instantiate the jribbble plugin on an element to use
	
	// Retrieve the shot specified by shotId
	// @param INT id - The id of the shot you want.
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback
	$.fn.jribbble.getShotById = function (shotId, callback)
	{
		$.fn.jribbble().makeRequest('shots/' + shotId, callback);
	};
	
	// @param STRING listName - One of the following: 'debuts', 'everyone', 'popular'
	// @param FUNCTION callback  - Function that will be called once the
	//                             request has successfully completed. The data
	//                             from the request will be passed to the callback
	// @param OBJ OPTIONAL pagingOpts - { page: 1, per_page: 15 } 
	//                                  @see http://dribbble.com/api#pagination
	$.fn.jribbble.getShotsByList = function (listName, callback, pagingOpts)
	{			
		$.fn.jribbble().makeRequest('shots/' + listName, callback, pagingOpts);
	};
	
	// Retrieve the most recent shots for the player specified by playerId
	// @param STRING | INT playerId - Can be 'username' or 2318
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback.
	// @param OBJ OPTIONAL pagingOpts - { page: 1, per_page: 15 } 
	//                                  @see http://dribbble.com/api#pagination
	$.fn.jribbble.getShotsByPlayerId = function (playerId, callback, pagingOpts)
	{			
		$.fn.jribbble().makeRequest('players/' + playerId + '/shots', callback, pagingOpts);
	};
	
	// Retrieve the most recent shots published by those the player, specified by playerId, follows
	// @param STRING | INT playerId - Can be 'username' or 2318
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback.
	// @param OBJ OPTIONAL pagingOpts - { page: 1, per_page: 15 } 
	//                                  @see http://dribbble.com/api#pagination
	$.fn.jribbble.getShotsThatPlayerFollows = function (playerId, callback, pagingOpts)
	{		
		$.fn.jribbble().makeRequest('players/' + playerId + '/shots/following', callback, pagingOpts);
	};
	
	// Retrieve profile details for the player specified by playerId
	// @param STRING | INT playerId - Can be 'username' or 2318
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback.
	$.fn.jribbble.getPlayerById = function (playerId, callback)
	{			
		$.fn.jribbble().makeRequest('players/' + playerId, callback);
	};

}(jQuery));