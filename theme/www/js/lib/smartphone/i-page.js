// can be removed after updating to next version of Manipulator
u.bug_console_only = true;

Util.Objects["page"] = new function() {
	this.init = function(page) {

		window.page = page;

		// show parentnode comment in console
		u.bug_force = true;
		u.bug("This site is built using the combined powers of body, mind and spirit. Well, and also Manipulator, Janitor and Detector");
		u.bug("Visit https://parentnode.dk for more information");
//		u.bug("Free lunch for new contributers ;-)");
		u.bug_force = false;


		// header reference
		page.hN = u.qs("#header");
		page.hN.service = u.qs(".servicenavigation", page.hN);
		u.e.drag(page.hN, page.hN);


		// add logo to navigation
		page.logo = u.ie(page.hN, "a", {"class":"logo", "html":u.eitherOr(u.site_name, "Frontpage")});
		page.logo.url = '/';


		// content reference
		page.cN = u.qs("#content", page);


		// navigation reference
		page.nN = u.qs("#navigation", page);
		page.nN = u.ie(page.hN, page.nN);
		page.nN.nav = u.qs("ul.navigation", page.nN)


		// footer reference
		page.fN = u.qs("#footer");
		page.fN.service = u.qs(".servicenavigation", page.fN);


		// global resize handler
		page.resized = function() {
//			u.bug("page resized");

			this.browser_h = u.browserH();
			this.browser_w = u.browserW();

			// adjust content height
			this.available_height = this.browser_h - this.hN.offsetHeight - this.fN.offsetHeight;
			u.as(this.cN, "min-height", "auto", false);
			if(this.available_height >= this.cN.offsetHeight) {
				u.as(this.cN, "min-height", this.available_height+"px", false);
			}

			// forward resize event to current scene
			if(this.cN && this.cN.scene && typeof(this.cN.scene.resized) == "function") {
				this.cN.scene.resized();
			}


			// Fill screen
			if (cookie.visible) {
				u.ass(cookie, {
					"width":page.browser_w + "px",
					"height":page.browser_h + "px"
				});

				u.e.setDragBoundaries(cookie, cookie);
			}

			

		}

		// global scroll handler
		page.scrolled = function() {
			
			// forward scroll event to current scene
			if(this.cN && this.cN.scene && typeof(this.cN.scene.scrolled) == "function") {
				this.cN.scene.scrolled();
			}

		}

		// global orientationchange handler
		page.orientationchanged = function() {

			// forward scroll event to current scene
			if(page.cN && page.cN.scene && typeof(page.cN.scene.orientationchanged) == "function") {
				page.cN.scene.orientationchanged();
			}
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


				cookie.addEventListener("touchmove", function(event) {
					u.e.kill(event);
				});

				u.e.drag(cookie, cookie);
				cookie.moved = function(event) {
					u.e.kill(event);
				}
			}
			else {
				cookie.visible = false;
				u.ass(cookie, {"display":"none"});
			}
		}

		// Page is ready - called from several places, evaluates when page is ready to be shown
		page.ready = function() {
//			u.bug("page ready");

			// page is ready to be shown - only initalize if not already shown
			if(!this.is_ready) {

				// page is ready
				this.is_ready = true;

				// set resize handler
				u.e.addWindowEvent(this, "resize", this.resized);
				// set scroll handler
				u.e.addWindowEvent(this, "scroll", this.scrolled);
				// set orientation change handler
				u.e.addWindowEvent(this, "orientationchange", this.orientationchanged);


				if(typeof(u.notifier) == "function") {
					u.notifier(this);
				}
				if(u.getCookie("smartphoneSwitch") == "on") {
					console.log("Back to desktop")
					var bn_switch = u.ae(document.body, "div", {id:"desktop_switch", html:"Back to desktop"});
					u.ce(bn_switch);
					bn_switch.clicked = function() {
						u.saveCookie("smartphoneSwitch", "off");
						location.href = location.href.replace(/[&]segment\=smartphone|segment\=smartphone[&]?/, "") + (location.href.match(/\?/) ? "&" : "?") + "segment=desktop";
					}
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
