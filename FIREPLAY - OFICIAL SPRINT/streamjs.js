// https://static-cdn.jtvnw.net/ttv-boxart/Super%20Smash%20Bros.%20Ultimate-188x250.jpg


let videoIds = ["sG3BomZqem4", "V0TyHhXkjsE", "nUVRTWWb-8I", "6xz_dbmYc1g", "s3fdI6dw1Tk"];

Vue.component('video-carousel', {
	data: function() {
		return {
			currentVideo: 0, //refers to tertiary video on leftmost; main video with be currentVideo+2
			totalVideos: 8,
			videos: [],
			videoPositions: {
				0 : "tertiary tertiary-left",
				1 : "secondary secondary-left",
				2 : "main",
				3 : "secondary secondary-right",
				4 : "tertiary tertiary-right"
			}
		}
	},
	computed: {
		
	},
	methods: {
		changeVideo: function(direction, position) {
			if(direction == "left") {
				this.currentVideo--;
				if(this.currentVideo < 0) {
					this.currentVideo = 4;
				}
				
			} else if (direction == "right") {
				this.currentVideo++;
				if(this.currentVideo > 4) {
					this.currentVideo = 0;
				}
			} else {
				switch(position) {
					case 'secondary secondary-right':
						this.changeVideo('left');
						break;
					case 'secondary secondary-left':
						this.changeVideo('right');
						break;
					case 'tertiary tertiary-right':
						this.changeVideo('left');
						this.changeVideo('left');
						break;
					case 'tertiary tertiary-left':
						this.changeVideo('right');
						this.changeVideo('right');
						break;
				}
			}
			
			this.videos.forEach((video, i)=>{
				video.active = false;
				let newIndex = i+this.currentVideo;
				if(newIndex > 4) {
					newIndex %= 5;
				}
				video.position = this.videoPositions[newIndex];
			});
			
		}
	},
	mounted: function() {
		//Generate array of fake carousel videos
		for (i=0; i<5; i++) {
			let videoId = videoIds[i];
			let videoEmbed = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
			let videoImage = "https://i.ytimg.com/vi/m7E_A2ATtyo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBzfLwVyzsFi_djuDG6Ubhbso6wuA" + videoId + "";
			let channelImage = "https://yt3.googleusercontent.com/ytc/AGIKgqMcLFqcH7aZuBRihSbFmUk3pCkAulLv7SEgJPzq=s176-c-k-c0x00ffffff-no-rj";
			let video = {
				thumbnail: videoImage,
				embed: videoEmbed,
				position: this.videoPositions[i],
				videoId: videoId,
				active: false,
				channelImage: channelImage,
				channelName: "Alanzoka",
				channelTitle: "alanzoka jogando Five Nights at Freddy's 4",
				channelViews: 20000
			}
			
			this.videos.push(video);
		}
	}
});

let app = new Vue({
	el: '#container',
	data: {
		users: []
	},
	methods: {
		
	},
	mounted: function() {
		let self = this;
		
		// Generate array of fake users
		for(let i=0;i<15; i++) {
			//generate random user
			let user = {
				imageLink: faker.internet.avatar(),
				username: faker.internet.userName(),
				playing: faker.company.companyName(),
				playingDisplay: null,
				viewers: chance.integer({min: 0, max: 999}),
				id: null
			}
			user.id = user.username;
			if(user.playing.length > 20) {
				user.playingDisplay = user.playing.slice(0,20) + "...";
			} else {
				user.playingDisplay = user.playing;
			}
			self.users.push(user);
		}
	}
});