Util.Objects["front"] = new function() {
	this.init = function(scene) {
		u.bug("scene init:", scene);


		scene.resized = function() {
//			u.bug("scene.resized:", this);
			this.browser_w = u.browserW();
			this.browser_h = u.browserH();

			// LANDING
			u.ass(this.landing, {
				"width":this.browser_w + "px",
				"height":this.browser_h + "px"
			});

			// GENERATOR
			if (this.generator.visible) {
				u.ass(this.generator, {
					"width":window.innerWidth + "px",
					"height":window.innerHeight + "px"
				});


				u.e.setDragPosition(this.generator.wrapper, 0, 0);
				u.e.setDragBoundaries(this.generator.wrapper, this.generator);
			}

			// Video overlay
			if (this.video_overlay) {
				u.ass(this.video_overlay, {
					"width":this.browser_w + "px",
					"height":this.browser_h + "px",
				});
			}

			// TERMS
			if (this.terms.visible) {
				u.ass(this.terms, {
					"width":window.innerWidth + "px",
					"height":window.innerHeight + "px"
				});

				u.e.setDragBoundaries(this.terms.wrapper, this.terms);
			}

			// Portrait
			if (this.browser_w < this.browser_h) {
				// console.log("portrait");
				
				// Show scroll down link on landing
				u.ass(this.scroll_down, {
					"display":"block"
				});

				this.meme_width = this.browser_w - 60;

				// memes
				for (var i = 0; i < this.memes.length; i++) {
					let meme = this.memes[i];

					// Resize ul
					u.ass(meme, {
						"width":this.meme_width + "px",
						"height":this.meme_width + "px",
					})
				}

				// div memes
				for (var i = 0; i < this.div_memes.length; i++) {
					let div = this.div_memes[i];

					u.ass(div, {
						"width":this.meme_width + "px",
						"height":this.meme_width + "px",
					});

					// Only update if div.ul has been defined in "ready"
					if (div.ul) {

						if(u.hc(div, "generator") && !this.generator.visible) {
							u.ass(this.generator, {"display":"block"});
							u.e.setDragBoundaries(div.ul, div);
							u.ass(this.generator, {"display":"none"});
						}
						else {
							u.e.setDragBoundaries(div.ul, div);
						}

					}
				}

				// Thumbnails
				for (var i = 0; i < this.thumbnails.length; i++) {
					let thumbnail = this.thumbnails[i];

					u.ass(thumbnail, {
						"width":this.browser_w - 60 + "px",
						"height":this.meme_width / 1.7805 + "px"
					});
				}

				// Div videos
				u.ass(this.div_videos, {
					"width":this.browser_w - 60 + "px",
					"height":this.meme_width / 1.7805 + "px",
				});
				u.e.setDragBoundaries(this.div_videos.ul, this.div_videos);

				// Make div.videos drag
				if (this.div_videos.ul) {
					u.e.drag(this.div_videos.ul, this.div_videos, {"horizontal_lock":true, "overflow":"scroll"});

					var videos_width = this.div_videos.clientWidth;

					this.div_videos.ul.picked = function(event) {
						// For checking in "ul.dropped()"
						this.last_x = this._x;
					}

					// Drag logic
					this.div_videos.ul.dropped = function(event) {
						// Get current li 
						var current_li = Math.abs(Math.ceil(this._x / (videos_width + 15)));

						// ul go right
						if (this._x < this.last_x) {

							// Make sure ul can't go outside drag bounds
							if (this._x > this.start_drag_x) {
								// Right
								var new_x = -((current_li + 1) * (videos_width + 15));
							}
							else {
								// Right-most point
								var new_x = this.start_drag_x;
							}

						}
						else {
								// Left
								var new_x = -(current_li * (videos_width + 15));
						}
						
						u.a.transition(this, "all 0.25s ease-out");
						u.a.translate(this, new_x, 0);
					}

				}

				if (this.video_overlay) {
					u.ass(this.video_overlay.iframe, {
						"width":this.browser_w + "px",
						"height":this.browser_w / 1.7805 + "px",
						"top":"50%",
						"transform":"translateY(-50%)"
					});

					u.ass(this.video_overlay.p, {
						"position":"relative",
						"top":"0",
					});
				}
			}
			// Landscape
			else {
				// console.log("landscape");

				// Hide scroll down link on landing
				u.ass(this.scroll_down, {
					"display":"none"
				});

				this.meme_width = this.browser_h - 60;

				// memes
				for (var i = 0; i < this.memes.length; i++) {
					let meme = this.memes[i];

					// Resize ul
					u.ass(meme, {
						"width":this.meme_width + "px",
						"height":this.meme_width + "px",
					})
				}

				// div memes
				for (var i = 0; i < this.div_memes.length; i++) {
					let div = this.div_memes[i];

					u.ass(div, {
						"width":this.meme_width + "px",
						"height":this.meme_width + "px",
					});

					// Only update if div.ul has been defined in "ready"
					if (div.ul) {
						if(u.hc(div, "generator") && !this.generator.visible) {
							u.ass(this.generator, {"display":"block"});
							u.e.setDragBoundaries(div.ul, div);
							u.ass(this.generator, {"display":"none"});
						}
						else {
							u.e.setDragBoundaries(div.ul, div);
					
						}
					}
				}

				// Thumbnails
				for (var i = 0; i < this.thumbnails.length; i++) {
					let thumbnail = this.thumbnails[i];

					u.ass(thumbnail, {
						"width":this.browser_w - 60 + "px",
						"height":this.browser_w / 1.8554913 + "px"
					});
				}

				// Div videos
				u.ass(this.div_videos, {
					"width":this.browser_w - 60 + "px",
					"height":this.browser_w / 1.8554913 + "px",
				});
				u.e.setDragBoundaries(this.div_videos.ul, this.div_videos);
				
				// Make div.videos drag
				if (this.div_videos.ul) {
					u.e.drag(this.div_videos.ul, this.div_videos, {"horizontal_lock":true, "overflow":"scroll"});

					var videos_width = this.div_videos.clientWidth;

					this.div_videos.ul.picked = function(event) {
						// For checking in "ul.dropped()"
						this.last_x = this._x;
					}

					// Drag logic
					this.div_videos.ul.dropped = function(event) {
						// Get current li 
						var current_li = Math.abs(Math.ceil(this._x / (videos_width + 15)));

						// ul go right
						if (this._x < this.last_x) {

							// Make sure ul can't go outside drag bounds
							if (this._x > this.start_drag_x) {
								// Right
								var new_x = -((current_li + 1) * (videos_width + 15));
							}
							else {
								// Right-most point
								var new_x = this.start_drag_x;
							}

						}
						else {
								// Left
								var new_x = -(current_li * (videos_width + 15));
						}
						
						u.a.transition(this, "all 0.25s ease-out");
						u.a.translate(this, new_x, 0);
					}

				}

				if (this.video_overlay) {
					u.ass(this.video_overlay.iframe, {
						"width":this.browser_w + "px",
						"height":this.browser_h + "px",
						"top":"0",
						"transform":"translateY(0)"
					});

					u.ass(this.video_overlay.p, {
						"position":"relative",
						"top":"100%",
					});
				}
			}

		}



		scene.scrolled = function() {
//			u.bug("scrolled:", this);
		}



		scene.ready = function() {
//			u.bug("scene.ready:", this);
			page.cN.scene = this;

			this.csrf_token = this.getAttribute("data-csrf-token");
			
			this.body = page.parentNode;

			this.landing = u.ge("landing", this);
			this.hits = u.ge("hits", this);
			this.new = u.ge("new", this);
			this.new.memes = u.qs("div.memes", this.new);

			// "scroll videre" scrollTo hits
			this.scroll_down = u.qs("#landing p", this.landing);
			this.scroll_down.hits = this.hits;
			u.ce(this.scroll_down)
			this.scroll_down.clicked = function() {
				u.scrollTo(window, {"node":this.hits});
			}

			// Get memes
			this.div_memes = u.qsa("div.memes", this);
			this.memes = u.qsa("div.memes ul li", this);

			// Get videos
			this.div_videos = u.qs("div.videos", this);
			this.div_videos.ul = this.div_videos.children[0];
			this.thumbnails = u.qsa("div.videos ul li", this.div_videos);

			// Get generator
			this.generator = u.ge("generator", this);

			// Get terms
			this.terms = u.ge("terms", this);

			// Init memes
			for (var i = 0; i < this.memes.length; i++) {
				let meme = this.memes[i];
				meme.scene = this;
				let path = meme.getAttribute("data-image-src");
				meme.div = meme.parentNode.parentNode;
				
				if (path) {
					meme.removeAttribute("data-image-src");
					u.ass(meme, {
						"background":"url(" + path + ") no-repeat center center",
						"background-size":"contain"
					});
				}

				// If it's a generator meme
				if( u.hc(meme, "generator") ) {
					u.ce(meme);
					meme.clicked = function() {
						this.scene.showOverlay(this.scene.generator);
						u.e.setDragPosition(this.scene.generator.wrapper, 0, 0);
					}

				}
				else {
					// Append text nodes
					meme.text_top = meme.children[0];
					meme.text_bottom = meme.children[1];

					// Add to div
					if (!meme.div.txt) {
						meme.div.txt = [];
						meme.div.txt.push(meme.text_top, meme.text_bottom);
					}
					else {
						meme.div.txt.push(meme.text_top, meme.text_bottom);
					}

					// Determine like functionality
					if ( !u.hc(meme.div, "generator") ) {
						if (u.hc(meme.parentNode, "submit")) {
							this.createHeart(meme, true);
						}
						else {
							this.createHeart(meme);
						}
					}
				}

			}

			// Init thumbnails
			for (var i = 0; i < this.thumbnails.length; i++) {
				let thumbnail = this.thumbnails[i];
				thumbnail.scene = this;
				let path = thumbnail.getAttribute("data-image-src");

				if (path) {
					thumbnail.removeAttribute("data-image-src");
					u.ass(thumbnail, {
						"background":"url(" + path + ") no-repeat center center",
						"background-size":"contain"
					});
				}

				u.ce(thumbnail);
				thumbnail.clicked = function(event) {
					//console.log("thumbnail", event)
					this.scene.createVideoOverlay(this, this.className);
				}

				this.createHeart(thumbnail);
			}

			// Make everything the right size
			this.resized();

			this.initTerms();

			this.initGenerator();

			// Make meme containers draggable
			for (var i = 0; i < this.div_memes.length; i++) {
				let div = this.div_memes[i];
				let ul = this.div_memes[i].children[0];
				ul.scene = this;

				// Create reference for outside scopes
				div.ul = ul;
				
				// div.memes.generator
				if(u.hc(div, "generator")) {
					// OPEN, get correct sizing
					u.ass(this.generator, {"display":"block"});

					// Default values
					ul._i = 0; 
					ul.selected = ul.firstElementChild; 

					ul.picked = function(event) {
						// For checking in "ul.dropped()"
						this.last_x = this._x;
					}

					// Drag logic
					ul.dropped = function(event) {
						// Get current li 
						var current_li = Math.abs(Math.ceil(this._x / (this.scene.meme_width + 15)));
						
						// if (Math.abs(this.current_xps) > 3000) {
						// 	var multiplier = 1;
						// }
						// else {
						// 	var multiplier = 0;
						// }


						// ul go right
						if (this._x < this.last_x) {

							// Make sure ul can't go outside drag bounds
							if (this._x > this.start_drag_x) {
								// Right
								var new_x = -((current_li + 1) * (this.scene.meme_width + 15));
							}
							else {
								// Right-most point
								var new_x = this.start_drag_x;
							}

						}
						else {
								// Left
								var new_x = -(current_li * (this.scene.meme_width + 15));
						}

						// Decide how many extra slides to scroll based on speed
						// if (this.current_xps >= 0) {
						// 	var new_x = -((current_li + 1) * (this.scene.meme_width + 15));
						// }
						// else {
						// 	var new_x = -((current_li + 1) * (this.scene.meme_width + 15));
						// }

	
						this.transitioned = function() {
							// Integer respresenting li in view
							this._i = Math.abs(Math.ceil(this._x / (this.scene.meme_width + 15)));

							// Reference to list element in view
							this.selected = this.children[this._i]; 

							// Update button
							if (this.selected.text_top.innerHTML != this.scene.generator.default_txt_top || this.selected.text_bottom.innerHTML != this.scene.generator.default_txt_bottom) {
								u.rc(this.scene.generator.button, "disabled");
							}
							else {
								u.ac(this.scene.generator.button, "disabled");
							}

							if (this.scene.generator.button.firstclick) {
								// Change state
								u.rc(this.scene.generator.button, "submit");
								u.ac(this.scene.generator.button, "ok");
								this.scene.generator.button.firstElementChild.innerHTML = "Ok";
								u.ass(this.scene.generator.paragraph, {"display":"none"});

								this.scene.generator.button.firstclick = false;
							}
						}
						
						u.a.transition(this, "all 0.25s ease-out");
						u.a.translate(this, new_x, 0);
						// console.log("last_x", this.last_x, "current_xps:", this.current_xps, "_x:", this._x, "new_x:", new_x, "current_li:", current_li);
					}
					
					// ul.moved = function() {
					// 	var current_li = Math.abs(Math.ceil(this._x / (this.scene.meme_width + 15)));
					// 	var new_x = -((current_li + 1) * (this.scene.meme_width + 15));
					// 	console.log("last_x", this.last_x, "_x", this._x, "new_x", new_x)
					// }

					// Enable drag
					u.e.drag(ul, div, {"horizontal_lock":true, "overflow":"scroll"});

					// CLOSE
					u.ass(this.generator, {"display":"none"});
				}
				// div.memes
				else {

					// Scale text
					if (div.txt) {
						for (var j = 0; j < div.txt.length; j++) {
							this.scaleText(div.txt[j]);
						}
					}

					ul.picked = function(event) {
						// For checking in "ul.dropped()"
						this.last_x = this._x;
					}

					// Drag logic
					ul.dropped = function(event) {
						// Get current li 
						var current_li = Math.abs(Math.ceil(this._x / (this.scene.meme_width + 15)));

						// ul go right
						if (this._x < this.last_x) {

							// Make sure ul can't go outside drag bounds
							if (this._x > this.start_drag_x) {
								// Right
								var new_x = -((current_li + 1) * (this.scene.meme_width + 15));
							}
							else {
								// Right-most point
								var new_x = this.start_drag_x;
							}

						}
						else {
								// Left
								var new_x = -(current_li * (this.scene.meme_width + 15));
						}
						
						u.a.transition(this, "all 0.25s ease-out");
						u.a.translate(this, new_x, 0);
					}

					// Enable drag
					u.e.drag(ul, div, {"horizontal_lock":true, "overflow":"scroll"});
				}

			}
			
		}


		scene.initGenerator = function() {
			// Default text for reset and comparison
			this.generator.default_txt_top = "Skriv din tekst her";
			this.generator.default_txt_bottom = "...Og scor med respekt";

			var wrapper =  u.qs("#generator div.wrapper", this.generator);
			this.generator.wrapper =  wrapper;
			this.generator.wrapper.moved = function(event)  {
				u.e.kill(event);
			}

			// Create reference to div.memes in generator
			var memes = u.qs("#generator div.memes", this.generator);
			this.generator.memes = memes;

			// Drag
			u.ass(this.generator, {"display":"block"});
			u.e.drag(this.generator.wrapper, this.generator, {"vertical_lock":true, "overflow":"scroll", "strict":false});
			u.ass(this.generator, {"display":"none"});

			var paragraph = u.qs("#generator p.confirm", this.generator);
			this.generator.paragraph = paragraph;

			// Update button state on text events
			for (var i = 0; i < memes.txt.length; i++) {
				let txt = memes.txt[i]
				txt.scene = this;

				if (u.hc(txt, "top")) {
					txt.is_top = true;
				}
				else {
					txt.is_top = false;
				}
				
				txt.focused = function(event) {
					if (this.is_top) {
						if (this.innerHTML == this.scene.generator.default_txt_top) {
							u.selectText(this);
							var selection = window.getSelection();
							if(!selection.isCollapsed) {
								selection.deleteFromDocument();
							}
						}
					}
					else {
						if (this.innerHTML == this.scene.generator.default_txt_bottom) {
							u.selectText(this);
							var selection = window.getSelection();
							if(!selection.isCollapsed) {
								selection.deleteFromDocument();
							}
						}
					}

				}

				txt.blurred = function() {
					if (!this.innerHTML) {
						if(this.is_top) {
							this.innerHTML = this.scene.generator.default_txt_top;
						}
						else {
							this.innerHTML = this.scene.generator.default_txt_bottom;
						}
					}
				}

				txt.pressed = function(event) {
					if (event.key == "Enter") {
						u.e.kill(event);

						if (this.innerHTML != "") {
							this.scene.generator.button.clicked();
						}
					}
				}

				txt.changed = function() {
					this.scene.scaleText(this);

					if (this.innerHTML != "") {
						u.rc(this.scene.generator.button, "disabled");
					}
				}

				txt.addEventListener("keydown", txt.pressed, false);
				txt.addEventListener("blur", txt.blurred, false);
				txt.addEventListener("focus", txt.focused, false);
				txt.addEventListener("keyup", txt.changed, false);
				txt.addEventListener("paste", txt.changed, false);
				txt.addEventListener("input", txt.changed, false);
			}

			// Button flow
			var button = u.qs("ul.actions > li", this.generator);
			this.generator.button = button;
			button.scene = this;
			u.ce(button);

			button.clicked = function() {
				if (!this.firstclick) {
					this.firstclick = true;

					// Change state
					u.tc(this, "ok", "submit");
					this.firstElementChild.innerHTML = "Tilføj til arkiv";
					u.ass(paragraph, {"display":"block"});

					this.t_confirm = u.t.setTimer(this, function() {
						this.firstclick = false;

						u.rc(this, "submit");
						u.ac(this, "ok");
						this.firstElementChild.innerHTML = "Ok";
						u.ass(this.scene.generator.paragraph, {"display":"none"});

						// Update drag position
						u.e.setDragPosition(this.scene.generator.wrapper, 0, 0);
						u.e.setDragBoundaries(this.scene.generator.wrapper, this.scene.generator);
					}, 2500);
				}
				else {
					this.firstclick = false;

					if (this.t_confirm) {
						u.t.resetTimer(this.t_confirm);
					}

					// Change state
					u.tc(this, "ok", "submit");
					u.ac(this, "disabled");
					
					// Update drag position
					u.e.setDragPosition(this.scene.generator.wrapper, 0, 0);

					// Get ul data from div_memes loop
					var image = this.scene.generator.memes.ul.selected.getAttribute("data-image");
					var text_1 = this.scene.generator.memes.ul.selected.text_top.innerHTML;
					if (text_1 == this.scene.generator.default_txt_top) {
						text_1 = "";
					}

					var text_2 = this.scene.generator.memes.ul.selected.text_bottom.innerHTML;
					if (text_2 == this.scene.generator.default_txt_bottom) {
						text_2 = "";
					}

					// Post response
					this.response = function(response) {
						// console.log(response);

						// Get meme json
						var meme = response["cms_object"];

						// Can access json object with named index (json["property"]) or property (json.property)
						meme.image = ("000" + meme.image).slice(-4);
	
						// Create new meme
						var new_meme = u.ie(this.scene.new.memes.ul, "li", {
							"class":"item_id:"+meme.id, 
							"style":"background:url(/img/memes/meme_"+meme.image+".png) center center / contain no-repeat;",
						});
						var top = u.ae(new_meme, "p", {"class":"top"});
						top.innerHTML = meme.text_1;
						var bottom = u.ae(new_meme, "p", {"class":"bottom"});
						bottom.innerHTML = meme.text_2;
						this.scene.createHeart(new_meme);
						
						// Refresh meme nodelist and set it's size
						this.scene.memes = u.qsa("div.memes ul li", this.scene);
						this.scene.resized();
						this.scene.scaleText(top);
						this.scene.scaleText(bottom);

						// Display new meme
						u.scrollTo(window, {"node":this.scene.new, "offset":window.innerHeight / 2});
						this.scene.new.memes.ul._x = 0;
						this.scene.new.memes.ul.dropped();

						// Hide and reset generator
						this.scene.hideOverlay(this.scene.generator);
						this.scene.resetGenerator();
					}

					// Post
					u.request(this, "/meme/saveMeme", {
						"data":"csrf-token=" + this.scene.csrf_token + "&image="+image + "&text_1="+text_1 + "&text_2="+text_2, 
						"method":"post"
					});
				}
				
				// Allow drag for small screens
				u.e.setDragBoundaries(this.scene.generator.wrapper, this.scene.generator);
			}


			// Back to memes link
			var p_hide = u.qs(".hide", this.generator);
			p_hide.scene = this;
			u.ce(p_hide);

			p_hide.clicked = function() {
				this.scene.hideOverlay(this.scene.generator);
				this.scene.resetGenerator();
			}

		}


		scene.resetGenerator = function() {
			this.generator.button.firstclick = false;
			
			// Change state
			u.rc(this.generator.button, "submit");
			u.ac(this.generator.button, "ok disabled");
			this.generator.button.firstElementChild.innerHTML = "Ok";
			u.ass(this.generator.paragraph, {"display":"none"});

			// Reset meme texts
			for(var i = 0; i < this.generator.memes.txt.length; i++) {
				let txt = this.generator.memes.txt[i];
				if (txt.is_top) {
					txt.innerHTML = this.generator.default_txt_top;
				}
				else {
					txt.innerHTML = this.generator.default_txt_bottom;
				}
				this.scaleText(txt);
			}

			// Reset drag position
			this.generator.memes.ul = u.qs("div.memes.generator ul", this.generator);
			u.e.setDragPosition(this.generator.memes.ul, 0, 0);

			// Reset ul values
			this.generator.memes.ul._i = 0; 
			this.generator.memes.ul.selected = this.generator.memes.ul.children[0]; 
		}


		scene.initTerms = function() {
			this.terms.wrapper = u.qs("#terms .wrapper", this.terms);

			u.ass(this.terms, {"display":"block"});
			u.e.drag(this.terms.wrapper, this.terms, {"vertical_lock":true, "overflow":"scroll", "strict":false});
			u.ass(this.terms, {"display":"none"});

			var button_show = u.qs("#footer ul li.terms", footer);
			button_show.scene = this;

			u.ce(button_show);
			button_show.clicked = function() {
				this.scene.showOverlay(this.scene.terms);

				u.e.setDragBoundaries(this.scene.terms.wrapper, this.scene.terms);
				u.e.setDragPosition(this.scene.terms.wrapper, 0 ,0);
			}

			var button_hide = u.qs("ul.actions li.close", this.terms);
			button_hide.scene = this;

			u.ce(button_hide);
			button_hide.clicked = function() {
				this.scene.hideOverlay(this.scene.terms);
			}

			this.terms.wrapper.moved = function(event) {
				u.e.kill(event);
			}
		}


		scene.createVideoOverlay = function(thumbnail, name) {
			var video_overlay = u.ae(scene, "div", {"id":"video"});
			scene.video_overlay = video_overlay;

			// Add name as class
			u.ac(video_overlay, name);

			// Close text
			var video_paragraph = u.ae(video_overlay, "p");
			video_paragraph.innerHTML = "luk";
			u.ce(video_paragraph);
			video_paragraph.clicked = function() {
				scene.hideOverlay(scene.video_overlay, true);
			}

			video_overlay.p = video_paragraph;

			// Video embed
			var source = thumbnail.getAttribute("data-video-src");
			var id = source.match(/watch\?v\=/) ? source.split("?v=")[1] : source.split("/")[source.split("/").length-1];

			video_overlay.iframe = u.ae(video_overlay, "iframe", {
				src: 'https://www.youtube.com/embed/'+id+'?autoplay=1&encrypted-media=1&loop=0&color=f0f0ee&modestbranding=1&rel=0&playsinline=1&rel=0',
				id: "ytplayer",
				type: "text/html",
				webkitallowfullscreen: true,
				mozallowfullscreen: true,
				allowfullscreen: true,
				frameborder: 0,
				allow: "autoplay",
				sandbox:"allow-same-origin allow-scripts allow-popups",
				width: video_overlay.offsetWidth,
				height: video_overlay.offsetHeight,
			});

			u.ass(video_overlay.iframe, {
				"width":window.innerWidth +"px",
				"height":window.innerWidth / 1.77725 + "px"
			});

			scene.showOverlay(video_overlay);

			// Prevent scrolling searchbar
			u.e.drag(video_overlay, video_overlay);
			video_overlay.moved = function(event) {
				u.e.kill(event);
			};

		}


		scene.createHeart = function(li, submit) {
			var clicks = 0;
			var heart = u.ae(li, "div", {"class":"heart"});
			heart.scene = this;
			heart.item_id = u.cv(li, "item_id");
			
			u.ce(heart);

			heart.inputStarted = function(event) {
				// Prevent bubbling
				u.e.kill(event);
			}

			heart.clicked = function() {
				// Animation
				var hearts = [
					u.ae(li, "div", {"class":"heart", "style":"opacity:0; pointer-events:none;"}),
					u.ae(li, "div", {"class":"heart", "style":"opacity:0; pointer-events:none;"}),
					u.ae(li, "div", {"class":"heart", "style":"opacity:0; pointer-events:none;"}),
					u.ae(li, "div", {"class":"heart", "style":"opacity:0; pointer-events:none;"}),
					u.ae(li, "div", {"class":"heart", "style":"opacity:0; pointer-events:none;"}),
				]

				for(var i = 0; i < hearts.length; i++) {

					hearts[i].animate = function() {
						let x = u.random(-50, 50) + "px";
						let y = u.random(-50, -200) + "px";
						let rotation = u.random(-45, 45) + "deg";

						u.ass(this, {
							"transform":"scale(0) translate3d(0, -50px, 0) rotate3d(0, 0, 0, 0deg)",
							"opacity":"1",
							"z-index":"9"
						})

						u.a.transition(this, "all 2s ease-out");
						u.ass(this, {
							"transform":"scale(2) translate3d(" + x + "," + y + ", 0) rotate3d(0, 0, 1, " + rotation + ")",
							"opacity":"0"
						});

						this.transitioned = function() {
							this.parentNode.removeChild(this);
						}
					}

					let diff = ("0000" + u.random(0, 15)).slice(-2);
					let timer = Number(i+diff);
					u.t.setTimer(hearts[i], hearts[i].animate, timer);
					
				}

				// Submit
				if (submit == true) {
					clicks++;
					// console.log(clicks)

					if (this.t_heart) {
						u.t.resetTimer(this.t_heart);
					}
					this.t_heart = u.t.setTimer(this, "submitClicks", 1000);

					this.submitClicks = function() {
						// console.log(clicks + " clicks submitted");
						this.response = function(response) {
							// console.log(response)
						}

						u.request(this, "/meme/addRating/" + this.item_id, {"data":"csrf-token=" + this.scene.csrf_token + "&item_rating=" + clicks, "method":"post"})

						u.t.resetTimer(this.t_heart);
						clicks = 0;
					}
				}
				
			}

		}


		scene.showOverlay = function(div) {
			div.visible = true;
			div.scene = this;

			div.moved = function(event) {
				u.e.kill(event);
			}

			u.e.addMoveEvent(div, div.moved);


			// Delete previously defined callback
			delete div.transitioned;

			// Disable scroll
			u.ass(this.body, {"overflow-y":"hidden"});

			// State before showing
			u.ass(div, {
				"display":"block",
				"opacity":"0",
				"transform":"translateY(50px)"
			});

			// Show
			u.a.transition(div, "all .35s ease");
			u.ass(div, {
				"opacity":"1",
				"transform":"translateY(0)"
			});

			this.resized();
		}


		scene.hideOverlay = function(div, destroy) {
			div.visible = false;
			div.scene = this;

			u.e.removeMoveEvent(div, div.moved);


			// Delete previously defined callback
			delete div.transitioned;
			
			// Allow scroll
			u.ass(this.body, {"overflow-y":"scroll"});

			// Hide
			u.a.transition(div, "all .35s ease");
			u.ass(div, {
				"opacity":"0",
				"transform":"translateY(50px)"
			});

			// After hiding
			div.transitioned = function() {
				u.ass(this, {
					"display":"none",
					"transform":"translateY(0)"
				});

				// Remove overlay
				if (destroy == true) {

					window.t_remove = u.t.setTimer(window, function() {
						div.parentNode.removeChild(div);
					}, 350);

				}
			}

		}


		scene.scaleText = function(node) {
			// Get fontsize to calculate on
			//node.fontsize = window.getComputedStyle(node).getPropertyValue('font-size').slice(0, -2);
			node.default = 30;
			// Average size of a font character
			node.avg = 18;
			// Get how many chars the node can fit
			node.chars = Math.floor(node.clientWidth / node.avg) * 2;

			// Update fontsize
			if (node.innerHTML.length > node.chars) {
				var excess = Math.sqrt((node.innerHTML.length - node.chars) * 3);

				u.ass(node, {
					"font-size":node.default - excess + "px"
				});
			}
			else {
				u.ass(node, {
					"font-size":node.default + "px"
				});
			}
		}
		

		// scene is ready
		scene.ready();
	}
}