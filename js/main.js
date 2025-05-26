window.addEventListener("load", function(){
	let intro=document.querySelector(".intro");
	let cursor=document.querySelector(".cursor");
	let header=document.querySelector("header");
	let nav=document.querySelector("nav");
	let menuLi=nav.querySelectorAll(".ctrl > li");
	let sectionLi=document.querySelectorAll("section > div");
	let pageLi=[header];
	let menuBtn=document.querySelector("nav .gnb .menu_btn");
	let btnTop=document.getElementById("topbtn");

	function scrolN() {
		document.body.style.overflow = 'hidden';
	}
	function scrolY() {
		document.body.style.overflow = '';
	}

	scrolN();
	gsap.fromTo(".loading_bar .progress .bar", { width: 0 }, {
		width: "100%",
		duration: 1,
		ease: "none",
		onComplete: function(){
			gsap.to(intro, {
				opacity: 0,
				duration: .8,
				onComplete: function(){
					intro.remove();
        	scrolY();
				}
			});
		}
	});

	let isMobile="";
	let resizeTimeout;

	function resize(){
		let resolution;

		if(window.innerWidth > 800){
			resolution = "desktop";

			gsap.to(nav, { right: 0 });

			if(menuBtn.classList.contains("open")){
				menuBtn.classList.remove("open");
				menuBtn.classList.remove("active");
			}
		} else {
			resolution = "mobile";

			if(window.innerWidth < 360){
				gsap.to(nav, { right: "-100%"});

				if(menuBtn.classList.contains("open")){
					menuBtn.classList.remove("open");
					menuBtn.classList.remove("active");
				}
			}else{
				gsap.to(nav, { right: "-40%"});

				if(menuBtn.classList.contains("open")){
					menuBtn.classList.remove("open");
					menuBtn.classList.remove("active");
				}
			}
		}
		
		if (resolution !== isMobile) {
			isMobile = resolution;
		}
	}

	resize();

	window.addEventListener("resize", function(){
		clearTimeout(resizeTimeout);
		resizeTimeout=setTimeout(resize, 200);
		resize();
	});

	document.body.addEventListener("mousemove", function(e){
		gsap.to(cursor, { x: e.pageX-5, y: e.pageY-5, duration: .6, ease: Power3.easeOut });
	});

	let headerIn = document.querySelector(".header_inter");
	let lastUpdateTime=0;
	const updateInterval=50;

	headerIn.addEventListener("mousemove", function(e){
		const now=Date.now();

		if (now - lastUpdateTime > updateInterval) {
			lastUpdateTime = now;

			const xRelativeToHeader = e.clientX / headerIn.clientWidth
			const yRelativeToHeader = e.clientY / headerIn.clientHeight

			document.querySelector(".poligon1").style.transform = `translate(${xRelativeToHeader * 8}px, ${yRelativeToHeader * 8}px)`
			document.querySelector(".poligon2").style.transform = `translate(${xRelativeToHeader * -12}px, ${yRelativeToHeader * 12}px)`

			document.querySelector(".star1").style.transform = `translate(${xRelativeToHeader * -50}px, ${yRelativeToHeader * -50}px)`
			document.querySelector(".star2").style.transform = `translate(${xRelativeToHeader * 18}px, ${yRelativeToHeader * 18}px)`
			document.querySelector(".star3").style.transform = `translate(${xRelativeToHeader * 15}px, ${yRelativeToHeader * 15}px)`
			document.querySelector(".star4").style.transform = `translate(${xRelativeToHeader * 55}px, ${yRelativeToHeader * 55}px)`
		};
	});

	// menu
	sectionLi.forEach(function(item){
		if(item.getAttribute("id")){
			pageLi.push(item);
		}
	});
	
	// console.log(pageLi);
	pageLi.forEach(function(item, i){
		gsap.timeline({
			scrollTrigger: {
				trigger: item,
				start: "top center",
				end: "bottom center",
				onEnter: function(){
					controlMenu(i);
				},
				onEnterBack: function(){
					controlMenu(i);
				}
			}
		});
	});

	let n=0;
	let winh;
	function init(){
		winh=window.innerHeight;
		controlMenu(n);
	}

	init();

	function controlMenu(n){	
		menuLi.forEach(function(item, i){
			 if(i == n){
				menuLi[i].style.opacity=1;
			 }
			 else{
				menuLi[i].style.opacity=.5;
			 }
		});

		if(isMobile == "desktop"){
			if(n != 0){
				nav.style.position="fixed";
				nav.style.background="linear-gradient(#101010, #10101002)";
				gsap.to(btnTop, { opacity: 1, duration: .5 });
			}
			else{
				nav.style.position="";
				nav.style.background="";
				gsap.to(btnTop, { opacity: 0, duration: .5 });
			}
		} else {
			nav.style.position="fixed";
			nav.style.background="";
			gsap.to(btnTop, { opacity: 1, duration: .5 });
		}
	}

	menuBtn.addEventListener("click", function(e){
		e.preventDefault();

		if(isMobile == "mobile"){
			if(!menuBtn.classList.contains("open")){
				gsap.to(nav, { right: 0, duration: .3, onComplete: function(){
					menuBtn.classList.add("open");
				}});
				menuBtn.classList.add("active");
			} else {
				menuBtn.classList.remove("open");
				menuBtn.classList.remove("active");
				
				if(window.innerWidth < 360){
					gsap.to(nav, { right: "-100%", duration: .3  });
				} else {
					gsap.to(nav, { right: "-40%", duration: .3 });
				}
			}
		}
	});

	let topPos=0;
	menuLi.forEach(function(item, i){
		menuLi[i].addEventListener("click", function(e){
			 e.preventDefault();
	
			topPos=pageLi[i].offsetTop;
			gsap.to(window, { scrollTo: topPos, duration: .4});
			
			if(isMobile == "mobile"){
				gsap.to(window, { scrollTo: topPos, duration: .4, onComplete: function(){
					menuBtn.classList.remove("open");
					if(window.innerWidth < 360){
						gsap.to(nav, { right: "-100%", duration: .3 });
					}else{
						gsap.to(nav, { right: "-40%", duration: .3 });
					}
					menuBtn.classList.remove("active");
				}});
			}
		});
	});

	let mainSwiper=new Swiper(".mainSwiper", {
		loop: true,
		speed: 2000,
		slidesPerView: 1,
		centeredSlides: true,
		autoplay: {
			delay: 2000
		},
		breakpoints: {
			460: {
				slidesPerView: 1.2
			},
			580: {
				slidesPerView: 1.5
			},
			940: {
				slidesPerView: 2.4
			},
			1080: {
				slidesPerView: 3.5
			},
			1440: {
				slidesPerView: 4.5
			}
		}
	});

	window.addEventListener("resize", function(){
		mainSwiper.update();
	});

	let careerLi=document.querySelectorAll("#career li > *");
	const careerTl=gsap.timeline({
		scrollTrigger: {
			trigger: "#career",
			start: "top center",
			end: "bottom center"
		}
	});
	careerLi.forEach(function(item, i){
		careerTl.from(item, { x: -10, opacity: 0, duration: 1.4 }, i*.3);
	});
	let summary=document.querySelectorAll("#career li .subtxt summary");
	summary.forEach(function(item, i){
		item.addEventListener("mouseover", function(){
			cursor.classList.add("active");
		});
		item.addEventListener("mouseleave", function(){
			cursor.classList.remove("active");
		});
	});

	let mm=gsap.matchMedia();
	mm.add("(min-width: 767px)", function(){
		gsap.utils.toArray(".img-inner .img").forEach(function(item, e){
			decorationTl=gsap.timeline({
				scrollTrigger: {
					trigger: item,
					start: "top 70%",
					end: "150% 70%",
					scrub: 0
				}
			});

			decorationTl
			.to(item, { opacity: 1 })
			.to(item, { opacity: 0 });
		});
	});

	let codeRe = document.querySelectorAll("#project .content .flex-wrap .img-inner .subtext");
	codeRe.forEach(function(item) {
			item.addEventListener("mouseover", function() {
					cursor.classList.add("active");
					if (isMobile === "desktop") {
							Object.assign(item.style, {
									backgroundColor: "#FEF8F2",
									color: "#101010",
									fontWeight: "600"
							});
					}
			});
			item.addEventListener("mouseleave", function() {
					cursor.classList.remove("active");
					Object.assign(item.style, {
							backgroundColor: "",
							color: "",
							fontWeight: ""
					});
			});
	});
	
	let skillDiv=document.querySelectorAll("#skill .mainSwiper .swiper-wrapper");
	const skillTl=gsap.timeline({
		scrollTrigger: {
			trigger: "#skill",
			start: "top center",
			end: "bottom center"
		}
	});
	skillDiv.forEach(function(item, i){
			skillTl.from(item, {y: -10, opacity: 0, duration: 2 }, i*.3);
	});

	let openSourceLi=document.querySelectorAll("#openSource li");
	const openSourceTl=gsap.timeline({
		scrollTrigger: {
			trigger: "#openSource",
			start: "top center",
			end: "bottom center"
		}
	});
	openSourceLi.forEach(function(item, i){
			openSourceTl.from(item, {y: -10, opacity: 0, duration: 1.5 }, i*.2);

			item.addEventListener("mouseover", function(){
				cursor.classList.add("active");
			});
			item.addEventListener("mouseleave", function(){
				cursor.classList.remove("active");
			});
	});

	let contactLi=document.querySelectorAll("#contact li");
	const contactTl=gsap.timeline({
		scrollTrigger: {
			trigger: "#contact",
			start: "top center",
			end: "bottom center"
		}
	});
	contactLi.forEach(function(item, i){
			contactTl.from(item, {y: -10, opacity: 0, duration: 1 }, i*.2);

			item.addEventListener("mouseover", function(){
				cursor.classList.add("active");
			});
			item.addEventListener("mouseleave", function(){
				cursor.classList.remove("active");
			});
	});

	const thisYear = document.querySelector('.this-year');
	thisYear.textContent = new Date().getFullYear();

	btnTop.addEventListener("click", e => {
    e.preventDefault();
    gsap.to(window, { scrollTo: 0, duration: 0.4 });
	});

	btnTop.addEventListener("mouseover", () => cursor.classList.add("active"));
	btnTop.addEventListener("mouseleave", () => cursor.classList.remove("active"));
});