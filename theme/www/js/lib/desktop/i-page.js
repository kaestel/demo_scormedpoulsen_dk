// can be removed after updating to next version of Manipulator
u.bug_console_only = true;

Util.Objects["page"] = new function() {
	this.init = function(page) {
		// u.bug("init page");

		window.page = page;

		// show parentnode comment in console
		u.bug_force = true;
		u.bug("This site is built using the combined powers of body, mind and spirit. Well, and also Manipulator, Janitor and Detector");
		u.bug("Visit https://parentnode.dk for more information");
//		u.bug("Free lunch for new contributers ;-)");
		u.bug_force = false;


		// create a generel style rule
		page.style_tag = document.createElement("style");
		page.style_tag.setAttribute("media", "all");
		page.style_tag.setAttribute("type", "text/css");
		page.style_tag = u.ae(document.head, page.style_tag);


		// header reference
		page.hN = u.qs("#header");
		page.hN.service = u.qs("ul.servicenavigation", page.hN);


		// content reference
		page.cN = u.qs("#content", page);


		// navigation reference
		page.nN = u.qs("#navigation", page);
		page.nN = u.ie(page.hN, page.nN);



		// footer reference
		page.fN = u.qs("#footer");
		page.fN.service = u.qs("ul.servicenavigation", page.fN);



		// global resize handler
		page.resized = function(event) {
//			u.bug("page resized");

			page.browser_h = u.browserH();
			page.browser_w = u.browserW();

			// adjust content height
			page.available_height = page.browser_h - page.hN.offsetHeight - page.fN.offsetHeight;

			u.as(page.cN, "min-height", "auto", false);
			if(page.available_height >= page.cN.offsetHeight) {
				u.as(page.cN, "min-height", page.available_height+"px", false);
			}

			if(page.browser_w > 1300) {
				u.ac(page, "fixed");
			}
			else {
				u.rc(page, "fixed");
			}

			// forward resize event to current scene
			if(page.cN && page.cN.scene && typeof(page.cN.scene.resized) == "function") {
				page.cN.scene.resized(event);
			}

			// refresh DOM
			page.offsetHeight;


			// Fill screen
			if (cookie.visible) {
				u.ass(cookie, {
					"width":page.browser_w + "px",
					"height":page.browser_h + "px"
				});
			}


		}

		// global scroll handler
		page.scrolled = function(event) {

		}



		page.initCookie = function() {
			var body = page.parentNode;
			var logos = u.qs("#header .logos", page);
			var cookie = u.ge("cookie", page);
			cookie.button = u.qs(".button", cookie);

			// Check if user has accepted cookie
			if((typeof(window.localStorage) != "object" || !window.localStorage.cookie_accept)) {
				cookie.visible = true;

				u.ass(body, {
					"overflow-y":"hidden"
				});
				u.ass(logos, {
					"position":"fixed"
				});

				cookie.button.addEventListener("click", function() {
					window.localStorage.cookie_accept = true;
					u.ass(cookie, {"display":"none"});
					u.ass(body, {
						"overflow-y":"scroll"
					});
					u.ass(logos, {
						"position":"absolute"
					});
				});
			}
			else {
				cookie.visible = false;
				u.ass(cookie, {"display":"none"});
			}

			u.e.drag(cookie, cookie);
			cookie.moved = function(event) {
				u.e.kill(event);
			}
		}


		// Page is ready - called from several places, evaluates when page is ready to be shown
		page.ready = function() {
//				u.bug("page ready");

			// page is ready to be shown - only initalize if not already shown
			if(!this.is_ready) {

				// page is ready
				this.is_ready = true;

				// set resize handler
				u.e.addEvent(window, "resize", page.resized);
				// set scroll handler
				u.e.addEvent(window, "scroll", page.scrolled);


				if(typeof(u.notifier) == "function") {
					u.notifier(this);
				}
				if(typeof(u.smartphoneSwitch) == "object") {
					u.smartphoneSwitch.init(this);
				}

				this.initCookie();

				this.resized();
			}
		}



		// ready to start page builing process
		page.ready();

	}
}

u.e.addDOMReadyEvent(u.init);
